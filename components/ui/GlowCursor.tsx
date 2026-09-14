"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SIZE = 28;
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select';

/**
 * Gold ring that trails the pointer, growing over interactive elements. Mounts
 * only on devices with a precise pointer so touch screens are untouched.
 */
export function GlowCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () =>
      setEnabled(pointerQuery.matches && !motionQuery.matches);

    sync();
    pointerQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      pointerQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setActive(
        event.target instanceof Element && !!event.target.closest(INTERACTIVE),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[70] rounded-full border border-gold mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        width: RING_SIZE,
        height: RING_SIZE,
        marginLeft: -RING_SIZE / 2,
        marginTop: -RING_SIZE / 2,
        left: 0,
        top: 0,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: active ? 1.9 : 1,
        borderColor: active
          ? "var(--color-gold-bright)"
          : "var(--color-gold-dim)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <span className="absolute inset-0 rounded-full bg-gold/25 blur-[6px]" />
    </motion.div>
  );
}
