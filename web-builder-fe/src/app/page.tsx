"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import { Button } from "@/components/ui/button";

export default function Page() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 120, damping: 20 });
  const rotateXStatic = useSpring(0);
  const scale = useSpring(1, { stiffness: 120, damping: 20 });
  const boxShadow = useTransform<number, string>(
    x,
    [0, 1],
    [
      "-30px 20px 100px rgba(99,102,241,0.25)",
      "30px -20px 100px rgba(244,63,94,0.25)",
    ]
  );

  return (
    <main
      className="relative min-h-dvh w-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_60%)]"
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        x.set(e.clientX / innerWidth);
        y.set(e.clientY / innerHeight);
      }}
    >
      <div className="noise" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_20%,rgba(99,102,241,0.18),transparent),radial-gradient(1200px_600px_at_0%_80%,rgba(244,63,94,0.15),transparent)]" />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-24 pt-20 md:grid-cols-2 md:items-center md:gap-16 md:pb-32 md:pt-28">
        <motion.div style={{ rotateX: rx, rotateY: ry }} className="space-y-6 will-change-transform">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500" />
            Now launching — your personal brand
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            Build a <span className="gradient-text">modern</span> presence with
            interactive <span className="gradient-text">motion</span>
          </h1>
          <p className="max-w-prose text-pretty text-base text-zinc-300 md:text-lg">
            I craft expressive, performant websites blending real‑time 3D, micro‑interactions, and bold type.
            Drag, hover, and explore — everything responds fluidly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg">
              Start a project
            </Button>
            <Button variant="outline" size="lg">
              View work
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-6 text-xs text-zinc-400">
            <span>Next.js 15</span>
            <span>Three.js</span>
            <span>Framer Motion</span>
          </div>
        </motion.div>

        <motion.div className="relative" style={{ rotateX: rotateXStatic, rotateY: ry, scale }}>
          <HeroScene />
          <motion.div className="pointer-events-none absolute -inset-4 rounded-3xl" style={{ boxShadow }} />
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-2xl font-semibold">What I do</h2>
              <p className="text-zinc-300">
                Design and build interactive experiences: portfolio sites, product launch pages, and 3D brand moments.
              </p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button className="w-full md:w-auto" variant="default">Get in touch</Button>
              <Button className="w-full md:w-auto" variant="ghost">Resume</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

