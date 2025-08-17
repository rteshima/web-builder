"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";

function WavyTorus({ hover }: { hover: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const torus = useMemo(() => new THREE.TorusKnotGeometry(1.2, 0.35, 220, 28), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.85, 0.6, 1.0),
        roughness: 0.2,
        metalness: 0.6,
        emissive: new THREE.Color(0.15, 0.05, 0.2),
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.x = t * 0.25;
    meshRef.current.rotation.y = t * 0.4;
    const scaleBase = hover ? 1.15 : 1.0;
    const pulse = 1 + Math.sin(t * 2.0) * 0.05;
    meshRef.current.scale.setScalar(scaleBase * pulse);
  });

  return (
    <mesh ref={meshRef} geometry={torus} material={material} castShadow receiveShadow />
  );
}

function ColorShiftLights({ hover }: { hover: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    }
  });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight
        position={[3, 2, 2]}
        intensity={hover ? 2.2 : 1.6}
        color={hover ? new THREE.Color("#f43f5e") : new THREE.Color("#8b5cf6")}
      />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color={"#22d3ee"} />
    </group>
  );
}

export default function HeroScene() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-500/10 to-rose-500/10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#0b0b0d"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <Float speed={hover ? 2.0 : 1.2} floatIntensity={hover ? 1.6 : 1.0}>
          <WavyTorus hover={hover} />
        </Float>
        <Sparkles count={hover ? 200 : 120} size={2} speed={0.4} scale={7} color="#a78bfa" />
        <ColorShiftLights hover={hover} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!hover} autoRotateSpeed={0.7} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.15),transparent_45%),radial-gradient(circle_at_30%_70%,rgba(244,63,94,0.12),transparent_40%)]" />
    </div>
  );
}

