"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Avatar } from "@/components/ui/Avatar";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { asset } from "@/lib/basePath";
import { profile } from "@/data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-radial-gold pt-32 pb-16"
    >
      {/* Faint grid to give the dark background some depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-text-muted">
              <MapPin size={13} className="text-gold" />
              {profile.location}
            </span>

            {profile.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                Open to Opportunities
              </span>
            )}
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-sm uppercase tracking-[0.3em] text-text-subtle"
          >
            Hello, I&apos;m
          </motion.p>

          <AnimatedText
            as="h1"
            text={profile.name}
            trigger="mount"
            variant="mask"
            delay={0.35}
            stagger={0.045}
            className="mt-3 block font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          />

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-2xl font-semibold text-gradient-gold sm:text-3xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl leading-relaxed text-text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <ButtonLink href={asset(profile.cvUrl)} download={profile.cvFileName}>
              <Download size={16} />
              Download CV
            </ButtonLink>
            <ButtonLink href="#projects" variant="ghost">
              View Projects
              <ArrowRight size={16} />
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          <div className="relative aspect-square">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-gold/20 blur-3xl"
            />
            <motion.div
              aria-hidden
              className="absolute -inset-3 rounded-full border border-dashed border-gold/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative size-full overflow-hidden rounded-full border-2 border-gold/40 glow-gold">
              <Avatar src={profile.avatarUrl} name={profile.name} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative mx-auto mt-16 w-full max-w-6xl px-6"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {profile.stats.map(({ value, suffix, label, sub }) => (
            <div
              key={label}
              className="group rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur-sm transition-colors hover:border-gold/40"
            >
              <p className="font-display text-3xl font-bold text-gradient-gold">
                <Counter to={value} suffix={suffix} />
              </p>
              <p className="mt-1 text-sm font-medium">{label}</p>
              <p className="text-xs text-text-subtle">{sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
