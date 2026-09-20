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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // Root Group for floating cursor-responsive 3D gold elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Transparent Fashprism Refractive Monolithic Prism
    const prismGeometry = new THREE.CylinderGeometry(1.1, 1.1, 2.4, isMobile ? 3 : 3, 1, false);
    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F15E1C"),
      transmission: isMobile ? 0.4 : 0.82,
      opacity: 0.65,
      transparent: true,
      roughness: 0.08,
      metalness: 0.35,
      ior: 1.52,
      reflectivity: 0.85,
      clearcoat: isMobile ? 0 : 0.6,
      side: THREE.DoubleSide,
    });
    const prismMesh = new THREE.Mesh(prismGeometry, prismMaterial);
    mainGroup.add(prismMesh);

    // Wireframe Overlay for Fashprism Prism (Golden Yellow Highlight)
    const edgesGeometry = new THREE.EdgesGeometry(prismGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FAB60A"),
      linewidth: 1,
      transparent: true,
      opacity: 0.75,
    });
    const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial);
    prismMesh.add(wireframe);

    // 2. Multi-Spectral Orbital Rings (Orange, Green, Light Yellow)
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    // Ring 1: Signature Primary Orange
    const ringMatOrange = new THREE.LineBasicMaterial({
      color: new THREE.Color("#F15E1C"),
      transparent: true,
      opacity: 0.5,
    });
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.31, isMobile ? 24 : 48);
    const ring1 = new THREE.LineLoop(ringGeo1, ringMatOrange);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2: Fashprism Culture Green
    const ringMatGreen = new THREE.LineBasicMaterial({
      color: new THREE.Color("#2E936F"),
      transparent: true,
      opacity: 0.4,
    });
    const ringGeo2 = new THREE.RingGeometry(2.8, 2.81, isMobile ? 24 : 48);
    const ring2 = new THREE.LineLoop(ringGeo2, ringMatGreen);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // Ring 3: Light Yellow Highlight Ring
    const ringMatYellow = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FFEC69"),
      transparent: true,
      opacity: 0.35,
    });
    const ringGeo3 = new THREE.RingGeometry(3.3, 3.31, isMobile ? 24 : 48);
    const ring3 = new THREE.LineLoop(ringGeo3, ringMatYellow);
    ring3.rotation.z = Math.PI / 5;
    ringGroup.add(ring3);

    // 3. Floating Interactive Crystal Brand Nodes
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.2, 0);

    const nodePositions = isMobile
      ? [
          { x: -1.8, y: 1.2, z: 0.4, color: "#FAB60A", edge: "#F15E1C" },
          { x: 1.8, y: -1.0, z: -0.4, color: "#2E936F", edge: "#FFEC69" },
        ]
      : [
          { x: -2.2, y: 1.4, z: 0.5, color: "#FAB60A", edge: "#F15E1C" },
          { x: 2.4, y: -1.2, z: -0.5, color: "#2E936F", edge: "#FFEC69" },
          { x: 1.8, y: 1.8, z: 0.8, color: "#F15E1C", edge: "#FAB60A" },
          { x: -2.0, y: -1.6, z: 0.2, color: "#FFEC69", edge: "#2E936F" },
        ];

    const nodes: THREE.Mesh[] = [];
    nodePositions.forEach((pos) => {
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(pos.color),
        transmission: isMobile ? 0.3 : 0.8,
        opacity: 0.75,
        transparent: true,
        roughness: 0.1,
        metalness: 0.3,
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(pos.x, pos.y, pos.z);

      const nodeEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(nodeGeo),
        new THREE.LineBasicMaterial({ color: new THREE.Color(pos.edge), transparent: true, opacity: 0.7 })
      );
      nodeMesh.add(nodeEdge);

      nodesGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    });

    // 4. Multi-Colored Brand Lighting & Refractions
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const orangePointLight = new THREE.PointLight(new THREE.Color("#F15E1C"), 2.2, 10);
    orangePointLight.position.set(0, 0, 3);
    scene.add(orangePointLight);

    const greenFillLight = new THREE.PointLight(new THREE.Color("#2E936F"), 1.8, 8);
    greenFillLight.position.set(-2.5, -2, 2);
    scene.add(greenFillLight);

    const goldenHighlight = new THREE.PointLight(new THREE.Color("#FAB60A"), 1.5, 7);
    goldenHighlight.position.set(2.5, 2, 2);
    scene.add(goldenHighlight);

    // 5. Light Yellow Kinetic Particle Field
    const particleCount = isMobile ? 15 : 45;
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
      color: new THREE.Color("#FFEC69"),
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

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Visibility & Pause Control
    let isRunning = true;
    let animationFrameId: number;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animate();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const animate = () => {
      if (!isRunning) return;

      animationFrameId = requestAnimationFrame(animate);

      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const baseX = isMobile ? 0 : 1.8;
      mainGroup.position.x = baseX + currentMouseX * 0.35;
      mainGroup.position.y = currentMouseY * 0.25;

      mainGroup.rotation.y = currentMouseX * 0.3 + Date.now() * 0.00025;
      mainGroup.rotation.x = currentMouseY * 0.2;

      ring1.rotation.z += 0.001;
      ring2.rotation.z -= 0.0012;
      ring3.rotation.z += 0.0008;

      nodes.forEach((node, i) => {
        node.rotation.x += 0.006 * (i + 1);
        node.rotation.y += 0.008 * (i + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
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

