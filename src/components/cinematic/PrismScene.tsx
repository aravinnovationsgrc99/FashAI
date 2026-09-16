"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function PrismScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Root Group for floating cursor-responsive 3D gold elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Transparent Metallic Gold Monolithic Prism
    const prismGeometry = new THREE.CylinderGeometry(1.1, 1.1, 2.4, 3, 1, false);
    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E5C287"),
      transmission: 0.9,
      opacity: 0.65,
      transparent: true,
      roughness: 0.08,
      metalness: 0.4,
      ior: 1.65,
      reflectivity: 0.9,
      clearcoat: 0.6,
      side: THREE.DoubleSide,
    });
    const prismMesh = new THREE.Mesh(prismGeometry, prismMaterial);
    mainGroup.add(prismMesh);

    // Wireframe Overlay for Gold Prism
    const edgesGeometry = new THREE.EdgesGeometry(prismGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D4AF37"),
      linewidth: 1.5,
      transparent: true,
      opacity: 0.7,
    });
    const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial);
    prismMesh.add(wireframe);

    // 2. Orbital Thin Gold Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringMatGold1 = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D4AF37"),
      transparent: true,
      opacity: 0.45,
    });
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.31, isMobile ? 32 : 64);
    const ring1 = new THREE.LineLoop(ringGeo1, ringMatGold1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringMatGold2 = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E5C287"),
      transparent: true,
      opacity: 0.3,
    });
    const ringGeo2 = new THREE.RingGeometry(2.8, 2.81, isMobile ? 32 : 64);
    const ring2 = new THREE.LineLoop(ringGeo2, ringMatGold2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // 3. Floating Interactive Crystal Gold Nodes
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.22, 0);
    const nodeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAB60A"),
      transmission: 0.85,
      opacity: 0.75,
      transparent: true,
      roughness: 0.1,
      metalness: 0.4,
    });

    const nodePositions = [
      { x: -2.2, y: 1.4, z: 0.5 },
      { x: 2.4, y: -1.2, z: -0.5 },
      { x: 1.8, y: 1.8, z: 0.8 },
      { x: -2.0, y: -1.6, z: 0.2 },
    ];

    const nodes: THREE.Mesh[] = [];
    nodePositions.forEach((pos) => {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(pos.x, pos.y, pos.z);

      const nodeEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(nodeGeo),
        new THREE.LineBasicMaterial({ color: 0xe5c287, transparent: true, opacity: 0.6 })
      );
      nodeMesh.add(nodeEdge);

      nodesGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    });

    // 4. Gold Lighting & Spotlight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldCursorLight = new THREE.PointLight(new THREE.Color("#D4AF37"), 2.5, 12);
    goldCursorLight.position.set(0, 0, 3);
    scene.add(goldCursorLight);

    const warmLight = new THREE.PointLight(new THREE.Color("#E5C287"), 2, 10);
    warmLight.position.set(-2, -2, 2);
    scene.add(warmLight);

    // 5. Restrained Gold Particle Field
    const particleCount = isMobile ? 25 : 60;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#E5C287"),
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Smooth Cursor Coordinate Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      mainGroup.position.x = currentMouseX * 0.7;
      mainGroup.position.y = currentMouseY * 0.4;

      mainGroup.rotation.y = currentMouseX * 0.6 + Date.now() * 0.00035;
      mainGroup.rotation.x = currentMouseY * 0.5;

      camera.position.x = currentMouseX * 0.25;
      camera.position.y = currentMouseY * 0.15;

      ring1.rotation.z += 0.0012;
      ring2.rotation.z -= 0.0016;

      nodes.forEach((node, i) => {
        node.rotation.x += 0.008 * (i + 1);
        node.rotation.y += 0.012 * (i + 1);
        node.position.y += Math.sin(Date.now() * 0.0015 + i) * 0.0015;
      });

      goldCursorLight.position.x = currentMouseX * 3.5;
      goldCursorLight.position.y = currentMouseY * 3.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-64 h-64 border border-brand-gold/30 rotate-45" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

