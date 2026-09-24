import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");

const COOKIE_NAME = "fashai_admin_session";
const DEFAULT_USER = process.env.ADMIN_USER || "admin";
const DEFAULT_PASS = process.env.ADMIN_PASS || "FashAI@Admin2026!";

interface AuthStore {
  username: string;
  passwordHash: string;
  salt: string;
  activeSessions: Record<string, { username: string; expiresAt: number; createdAt: string }>;
  loginAttempts: Record<string, { count: number; lockUntil: number }>;
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

async function getAuthStore(): Promise<AuthStore> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(DEFAULT_PASS, salt);
    const store: AuthStore = {
      username: DEFAULT_USER,
      passwordHash,
      salt,
      activeSessions: {},
      loginAttempts: {},
    };
    await fs.writeFile(AUTH_FILE, JSON.stringify(store, null, 2), "utf-8");
    return store;
  }
}

async function saveAuthStore(store: AuthStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(AUTH_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remainingMs?: number }> {
  const store = await getAuthStore();
  const attempt = store.loginAttempts[ip];
  const now = Date.now();

  if (attempt && attempt.lockUntil > now) {
    return { allowed: false, remainingMs: attempt.lockUntil - now };
  }
  return { allowed: true };
}

export async function recordLoginAttempt(ip: string, success: boolean) {
  const store = await getAuthStore();
  const now = Date.now();

  if (success) {
    delete store.loginAttempts[ip];
  } else {
    const current = store.loginAttempts[ip] || { count: 0, lockUntil: 0 };
    current.count += 1;
    if (current.count >= 5) {
      current.lockUntil = now + 15 * 60 * 1000; // 15 min lock out
    }
    store.loginAttempts[ip] = current;
  }
  await saveAuthStore(store);
}

export async function authenticateAdmin(usernameInput: string, passwordInput: string): Promise<{ success: boolean; sessionToken?: string; error?: string }> {
  const store = await getAuthStore();

  if (usernameInput.trim() !== store.username) {
    return { success: false, error: "Invalid admin credentials" };
  }

  const computed = hashPassword(passwordInput, store.salt);
  const isValid = crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(store.passwordHash));

  if (!isValid) {
    return { success: false, error: "Invalid admin credentials" };
  }

  // Create session
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours session
  store.activeSessions[sessionToken] = {
    username: store.username,
    expiresAt,
    createdAt: new Date().toISOString(),
  };

  await saveAuthStore(store);
  return { success: true, sessionToken };
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const store = await getAuthStore();
  const session = store.activeSessions[token];
  if (!session) return false;

  if (Date.now() > session.expiresAt) {
    delete store.activeSessions[token];
    await saveAuthStore(store);
    return false;
  }

  return true;
}

export async function invalidateSession(token: string | undefined) {
  if (!token) return;
  const store = await getAuthStore();
  delete store.activeSessions[token];
  await saveAuthStore(store);
}

export async function isRequestAuthenticated(request: NextRequest): Promise<boolean> {
  // Check cookie or Authorization header
  const tokenFromCookie = request.cookies.get(COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  const token = tokenFromCookie || tokenFromHeader;
  return verifyAdminSessionToken(token);
}

export { COOKIE_NAME };
