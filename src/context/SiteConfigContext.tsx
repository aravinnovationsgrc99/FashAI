"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MasterSiteConfig } from "@/lib/admin/config-schema";
import { DEFAULT_MASTER_CONFIG } from "@/lib/admin/default-config";

interface SiteConfigContextType {
  config: MasterSiteConfig;
  isLoaded: boolean;
  refreshConfig: () => Promise<void>;
  updateLocalDraftConfig: (updater: (prev: MasterSiteConfig) => MasterSiteConfig) => void;
  saveDraft: () => Promise<boolean>;
  publish: (note?: string) => Promise<boolean>;
  resetThemeDefaults: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<MasterSiteConfig>(DEFAULT_MASTER_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig(data.config);
        }
      }
    } catch (e) {
      console.warn("Could not fetch published config, using default constants:", e);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Inject CSS Variables for Theme & Typography dynamically into root
  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;

    // Apply font variables & scale
    root.style.setProperty("--admin-heading-scale", `${config.typographySettings?.headingScale || 1.0}`);
    root.style.setProperty("--admin-body-scale", `${config.typographySettings?.bodyScale || 1.0}`);

    // Set Theme colors dynamically
    const light = config.themeSettings?.light;
    const dark = config.themeSettings?.dark;

    if (light) {
      root.style.setProperty("--light-bg", light.background);
      root.style.setProperty("--light-text-primary", light.primaryText);
      root.style.setProperty("--light-text-secondary", light.secondaryText);
      root.style.setProperty("--light-accent-primary", light.primaryAccent);
      root.style.setProperty("--light-accent-secondary", light.secondaryAccent);
    }

    if (dark) {
      root.style.setProperty("--dark-bg", dark.background);
      root.style.setProperty("--dark-text-primary", dark.primaryText);
      root.style.setProperty("--dark-text-secondary", dark.secondaryText);
      root.style.setProperty("--dark-accent-primary", dark.primaryAccent);
      root.style.setProperty("--dark-accent-secondary", dark.secondaryAccent);
    }
  }, [config]);

  const updateLocalDraftConfig = (updater: (prev: MasterSiteConfig) => MasterSiteConfig) => {
    setConfig((prev) => updater(prev));
  };

  const saveDraft = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const publish = async (note?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, note }),
      });
      if (res.ok) {
        await fetchConfig();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetThemeDefaults = () => {
    setConfig((prev) => ({
      ...prev,
      themeSettings: DEFAULT_MASTER_CONFIG.themeSettings,
    }));
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isLoaded,
        refreshConfig: fetchConfig,
        updateLocalDraftConfig,
        saveDraft,
        publish,
        resetThemeDefaults,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    return {
      config: DEFAULT_MASTER_CONFIG,
      isLoaded: true,
      refreshConfig: async () => {},
      updateLocalDraftConfig: () => {},
      saveDraft: async () => false,
      publish: async () => false,
      resetThemeDefaults: () => {},
    };
  }
  return context;
}
