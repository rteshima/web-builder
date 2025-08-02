-'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense, useRef } from 'react';
import type { Mesh } from 'three';

function AnimatedTorus() {
  const ref = useRef<Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={ref} scale={1.2}>
      <torusKnotGeometry args={[0.8, 0.26, 128, 32]} />
      <meshStandardMaterial color={"#6366f1"} metalness={0.3} roughness={0.25} />
    </mesh>
  );
} // hello
 
export default function Home() {
  const features = [
    {
      title: 'Realtime Generative APIs',
      description:
        'Ship blazing fast realtime generative endpoints with a single line of code.',
    },
    {
      title: 'Fine-Tuned Models',
      description:
        'Upload your data and fine-tune on-the-fly for your specific domain.',
    },
    {
      title: 'Developer-First Tooling',
      description:
        'SDKs, CLI and observability baked-in so you can focus on building.',
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between">
      {/* Hero */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-32 md:flex-row md:pt-0 lg:px-20">
        {/* 3D Canvas */}
        <div className="pointer-events-none absolute inset-0 -z-10 mx-auto flex h-[560px] w-full max-w-4xl items-center justify-center md:static md:inset-auto md:order-2 md:h-[600px] md:w-[600px]">
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }} className="w-full h-full">
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={0.8} />
              <AnimatedTorus />
              <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
            </Canvas>
          </Suspense>
        </div>

        {/* Copy */}
        <div className="relative z-10 flex max-w-xl flex-col gap-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            Build what’s <span className="text-indigo-500">next</span> with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mx-auto max-w-prose text-lg text-neutral-400 md:mx-0"
          >
            NexaAI provides an end-to-end platform for teams to design, develop and deploy production-grade generative experiences in minutes—not months.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center gap-4 md:justify-start"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#get-started"
              className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            >
              Request Access
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="rounded-md border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            >
              Explore Features
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-32 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-semibold sm:text-4xl"
        >
          Why NexaAI?
        </motion.h2>
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-xl font-medium">{f.title}</h3>
              <p className="text-sm text-neutral-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="flex w-full flex-col items-center gap-8 bg-indigo-500 px-6 py-24 text-center text-white lg:px-0">
        <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
          Ship your next AI-powered product faster than ever before
        </h2>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="mailto:hello@nexa.ai"
          className="rounded-md bg-white px-8 py-3 font-medium text-indigo-600 shadow-lg transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/90"
        >
          Get in touch
        </motion.a>
      </section>
    </main>
  );
}
