import { Reveal } from "./Reveal";
import { AnimatedText } from "./AnimatedText";
import { GlowDivider } from "./GlowDivider";

type Props = {
  /** Large faded word rendered behind the title. */
  watermark: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ watermark, title, subtitle }: Props) {
  return (
    <Reveal className="relative mb-16 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-6 select-none text-6xl font-bold tracking-tight text-white/[0.03] sm:text-8xl"
      >
        {watermark}
      </span>

      <AnimatedText
        as="h2"
        text={title}
        trigger="inView"
        variant="mask"
        className="relative block font-display text-4xl font-bold tracking-tight sm:text-5xl"
      />

      <GlowDivider className="relative mt-5" />

      {subtitle && (
        <p className="relative mt-4 text-sm uppercase tracking-[0.25em] text-text-subtle">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
