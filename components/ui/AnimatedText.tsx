"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** `mount` animates immediately, `inView` waits until scrolled into view. */
  trigger?: "mount" | "inView";
  /**
   * `fade` drifts each character up out of a blur.
   * `mask` slides it out from behind a clipping box for a sharper reveal.
   */
  variant?: "fade" | "mask";
  /** Seconds between each character. */
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * The clip box has to be taller than the line box, otherwise `overflow: hidden`
 * shaves the ascenders and descenders off the glyphs it is meant to reveal.
 * Negative margins keep the extra space from affecting layout.
 */
const CLIP_TOP = "0.12em";
const CLIP_BOTTOM = "0.22em";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const characterVariants: Record<NonNullable<Props["variant"]>, Variants> = {
  fade: {
    hidden: { opacity: 0, y: "0.35em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  mask: {
    // Past 100% to clear the padding added to the clip box below.
    hidden: { y: "130%" },
    visible: {
      y: "0%",
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

/**
 * Reveals a headline character by character. Splitting happens per word first so
 * that line wrapping stays on word boundaries — splitting straight into
 * characters lets a browser break a word in half mid-animation.
 */
export function AnimatedText({
  text,
  className,
  trigger = "inView",
  variant = "fade",
  stagger = 0.03,
  delay = 0,
  as = "span",
}: Props) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const animationProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  const clipStyle =
    variant === "mask"
      ? {
          paddingTop: CLIP_TOP,
          marginTop: `-${CLIP_TOP}`,
          paddingBottom: CLIP_BOTTOM,
          marginBottom: `-${CLIP_BOTTOM}`,
        }
      : undefined;

  return (
    <MotionTag
      className={className}
      // The characters are split across elements, so expose the plain string to
      // assistive tech and hide the fragments.
      aria-label={text}
      variants={container(stagger, delay)}
      initial="hidden"
      {...animationProps}
    >
      {text.split(" ").map((word, wordIndex, words) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {[...word].map((char, charIndex) => (
            <span
              key={charIndex}
              aria-hidden
              className={
                variant === "mask"
                  ? "inline-block overflow-hidden"
                  : "inline-block"
              }
              style={clipStyle}
            >
              <motion.span
                className="inline-block"
                variants={characterVariants[variant]}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span aria-hidden className="inline-block">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}
