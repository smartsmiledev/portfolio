"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  /** Total width of the rule. */
  width?: string;
};

/**
 * Thin gold rule with a highlight that sweeps across it and a pulsing centre
 * node. Used under section headings.
 */
export function GlowDivider({ className, width = "12rem" }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`relative mx-auto flex h-4 items-center justify-center ${className ?? ""}`}
      style={{ width }}
    >
      {/* Base rule, fading out towards both ends */}
      <span className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Highlight travelling left to right */}
      {!reduceMotion && (
        <span className="absolute inset-x-0 h-px overflow-hidden">
          <motion.span
            className="absolute top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-gold-bright to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "320%" }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.8,
            }}
          />
        </span>
      )}

      {/* Centre node */}
      <span className="relative flex size-1.5 items-center justify-center">
        <span className="absolute size-1.5 rounded-full bg-gold" />
        {!reduceMotion && (
          <motion.span
            className="absolute size-1.5 rounded-full bg-gold"
            animate={{ scale: [1, 3.4, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </span>
    </div>
  );
}
