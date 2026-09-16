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

    // Root Group for all floating cursor-responsive 3D elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Transparent Monolithic Prism
    const prismGeometry = new THREE.CylinderGeometry(1.1, 1.1, 2.4, 3, 1, false);
    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F15E1C"),
      transmission: 0.9,
      opacity: 0.7,
      transparent: true,
      roughness: 0.05,
      metalness: 0.2,
      ior: 1.6,
      reflectivity: 0.8,
      clearcoat: 0.5,
      side: THREE.DoubleSide,
    });
    const prismMesh = new THREE.Mesh(prismGeometry, prismMaterial);
    mainGroup.add(prismMesh);

    // Wireframe Overlay for Prism
    const edgesGeometry = new THREE.EdgesGeometry(prismGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E5C287"),
      linewidth: 1.5,
      transparent: true,
      opacity: 0.6,
    });
    const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial);
    prismMesh.add(wireframe);

    // 2. Orbital Thin Metallic Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringMatGold = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E5C287"),
      transparent: true,
      opacity: 0.4,
    });
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.31, isMobile ? 32 : 64);
    const ring1 = new THREE.LineLoop(ringGeo1, ringMatGold);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringMatOrange = new THREE.LineBasicMaterial({
      color: new THREE.Color("#F15E1C"),
      transparent: true,
      opacity: 0.35,
    });
    const ringGeo2 = new THREE.RingGeometry(2.8, 2.81, isMobile ? 32 : 64);
    const ring2 = new THREE.LineLoop(ringGeo2, ringMatOrange);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // 3. Floating Interactive Crystal Octahedron Nodes
    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.25, 0);
    const nodeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAB60A"),
      transmission: 0.8,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.3,
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
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
      );
      nodeMesh.add(nodeEdge);

      nodesGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    });

    // 4. Cursor Spotlight & Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cursorPointLight = new THREE.PointLight(new THREE.Color("#F15E1C"), 3, 12);
    cursorPointLight.position.set(0, 0, 3);
    scene.add(cursorPointLight);

    const goldPointLight = new THREE.PointLight(new THREE.Color("#E5C287"), 2, 10);
    goldPointLight.position.set(-2, -2, 2);
    scene.add(goldPointLight);

    // 5. Light Particle Field
    const particleCount = isMobile ? 30 : 80;
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
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Smooth Inertia & Cursor Coordinates Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let mouseVelocity = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalized coordinates from -1 to 1
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      mouseVelocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.0015, 0.6);

      lastX = event.clientX;
      lastY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with Cursor Tracking Physics
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation toward target mouse position
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // 3D Group Translation (Physical displacement following cursor in space)
      mainGroup.position.x = currentMouseX * 0.8;
      mainGroup.position.y = currentMouseY * 0.5;

      // 3D Group Rotation (Dynamic tilt driven by mouse)
      mainGroup.rotation.y = currentMouseX * 0.8 + Date.now() * 0.0003;
      mainGroup.rotation.x = currentMouseY * 0.6;

      // Camera parallax shift
      camera.position.x = currentMouseX * 0.3;
      camera.position.y = currentMouseY * 0.2;

      // Orbital Rings Rotation
      ring1.rotation.z += 0.0015;
      ring2.rotation.z -= 0.002;

      // Floating Crystal Nodes individual orbits
      nodes.forEach((node, i) => {
        node.rotation.x += 0.01 * (i + 1);
        node.rotation.y += 0.015 * (i + 1);
        node.position.y += Math.sin(Date.now() * 0.002 + i) * 0.002;
      });

      // Cursor Light spotlight tracking
      cursorPointLight.position.x = currentMouseX * 4;
      cursorPointLight.position.y = currentMouseY * 4;
      cursorPointLight.intensity = 2.5 + mouseVelocity * 3;

      // Velocity decay
      mouseVelocity *= 0.94;

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
