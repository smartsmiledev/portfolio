"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

export type TimelineEntry = {
  id: string;
  /** Small pill above the title, e.g. "Current Role". */
  badge?: string;
  highlight?: boolean;
  period: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.85", "end 0.5"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });
  const railScale = reduceMotion ? 1 : progress;
  const beamTop = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <div ref={container} className="relative mx-auto max-w-3xl">
      {/* Rail track and beam both span the same box, so the beam head sits at
          the tip of the filled portion. */}
      <div
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[9px]"
      >
        <motion.div
          className="h-full w-px origin-top bg-gradient-to-b from-gold via-gold/40 to-transparent"
          style={{ scaleY: railScale }}
        />

        {!reduceMotion && (
          <motion.span
            className="absolute -left-[3px] size-[7px] -translate-y-1/2 rounded-full bg-gold-bright shadow-[0_0_12px_4px_rgba(212,175,55,0.55)]"
            style={{ top: beamTop }}
          />
        )}
      </div>

      <div className="space-y-8">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="relative pl-10 sm:pl-14"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              aria-hidden
              className={`absolute left-0 top-7 flex size-4 items-center justify-center rounded-full border-2 sm:size-5 ${
                entry.highlight
                  ? "border-gold bg-gold/20"
                  : "border-border bg-bg"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  entry.highlight ? "bg-gold" : "bg-text-subtle"
                }`}
              />
              {entry.highlight && (
                <span className="absolute inline-flex size-4 animate-ping rounded-full bg-gold/40 sm:size-5" />
              )}
            </span>

            <article
              className={`group rounded-2xl border bg-surface/40 p-6 transition-all duration-300 hover:bg-surface sm:p-7 ${
                entry.highlight
                  ? "border-gold/30"
                  : "border-border hover:border-gold/30"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                {entry.badge && (
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                      entry.highlight
                        ? "border border-gold/30 bg-gold/10 text-gold"
                        : "border border-border bg-bg-elevated text-text-subtle"
                    }`}
                  >
                    {entry.badge}
                  </span>
                )}
                <span className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-[11px] text-text-subtle">
                  {entry.period}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold transition-colors group-hover:text-gold">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-gold/80">
                {entry.subtitle}
              </p>

              <div className="mt-4">{entry.children}</div>
            </article>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
