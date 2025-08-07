"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/three/HeroScene";

export default function Page() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}

function NavBar() {
  return (
    <div className="container-responsive py-6 flex items-center justify-between">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500" />
        <span className="text-sm uppercase tracking-widest text-zinc-400">Portfolio</span>
      </motion.div>
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" className="hidden sm:inline-flex">
          <Link href="#work">Work</Link>
        </Button>
        <Button asChild variant="ghost" className="hidden sm:inline-flex">
          <Link href="#about">About</Link>
        </Button>
        <Button asChild>
          <Link href="#contact">Get in touch</Link>
        </Button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-10 md:pt-16 lg:pt-24">
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
        >
          I craft delightful
          <span className="block bg-gradient-to-br from-indigo-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">web experiences</span>
          that feel alive.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-base md:text-lg text-zinc-400 max-w-xl"
        >
          Frontend engineer and interaction designer specializing in high-performance interfaces, motion, and WebGL.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          <Button className="group">
            <span className="mr-1">See my work</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Button>
          <Button variant="secondary" className="group">
            <span className="mr-1">Resume</span>
            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-3 gap-3 max-w-md"
        >
          {["Performance", "3D", "Motion"].map((label) => (
            <div key={label} className="glass p-3 text-center text-sm text-zinc-300">
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-10 -z-10 bg-[radial-gradient(40rem_40rem_at_50%_30%,rgba(236,72,153,0.12),transparent_50%)]" />
        <HeroScene />
      </motion.div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "Interactive 3D",
      desc: "Immersive WebGL and GPU-accelerated visuals with smooth interactions.",
    },
    {
      title: "Motion-first UI",
      desc: "Micro-interactions and fluid page transitions that feel natural.",
    },
    {
      title: "Performance",
      desc: "Optimized for speed and accessibility without compromising style.",
    },
  ];
  return (
    <section className="container-responsive py-16 md:py-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <TiltCard key={item.title} title={item.title} desc={item.desc} />)
        )}
      </div>
    </section>
  );
}

function TiltCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      className="glass p-6 md:p-7"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
        el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }}
      style={{
        transform: "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: "transform 120ms ease-out",
      }}
    >
      <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/70 to-pink-500/70" />
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-zinc-400">{desc}</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="container-responsive py-12 text-sm text-zinc-500">
      © {new Date().getFullYear()} Your Name. Built with Next.js, Three.js and Framer Motion.
    </footer>
  );
}

