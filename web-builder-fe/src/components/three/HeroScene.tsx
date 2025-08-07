"use client";

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as React from "react";
import * as THREE from "three";

type DistortedBlobProps = {
  colorA?: string;
  colorB?: string;
};

function DistortedBlob({ colorA = "#6366f1", colorB = "#ec4899" }: DistortedBlobProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const targetRotation = React.useRef(new THREE.Euler(0, 0, 0));
  const hoverProgress = React.useRef(0);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Smoothly lerp rotation toward target from pointer
    mesh.rotation.x += (targetRotation.current.x - mesh.rotation.x) * 0.08;
    mesh.rotation.y += (targetRotation.current.y - mesh.rotation.y) * 0.08;
    // Hover spring for subtle scale pulse
    const speed = 3;
    hoverProgress.current += (hoverProgress.current > 0 ? -delta * speed : 0);
    const baseScale = 1;
    const pulse = Math.max(0, hoverProgress.current);
    mesh.scale.setScalar(baseScale + pulse * 0.06);
  });

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    const x = (e.pointer.x ?? 0) as number;
    const y = (e.pointer.y ?? 0) as number;
    targetRotation.current.set(y * 0.6, x * 1.0, 0);
  };

  const onPointerOver = () => {
    hoverProgress.current = 0.8;
    document.body.style.cursor = "grab";
  };
  const onPointerOut = () => {
    hoverProgress.current = 0;
    document.body.style.cursor = "auto";
  };

  const onPointerDown = () => {
    document.body.style.cursor = "grabbing";
  };
  const onPointerUp = () => {
    document.body.style.cursor = "grab";
  };

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh
        ref={meshRef}
        onPointerMove={onPointerMove}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <icosahedronGeometry args={[1.4, 64]} />
        <MeshDistortMaterial
          attach="material"
          color={colorA}
          speed={2.6}
          roughness={0.2}
          metalness={0.1}
          distort={0.45}
        />
        {/* Add a subtle fresnel via second sphere */}
        <mesh scale={1.02}>
          <icosahedronGeometry args={[1.4, 32]} />
          <meshStandardMaterial
            color={colorB}
            opacity={0.15}
            transparent
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1.2}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5] }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} />
        <directionalLight position={[-5, -2, -3]} intensity={0.25} />
        <Environment preset="city" />
        <DistortedBlob />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_60%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
    </div>
  );
}

