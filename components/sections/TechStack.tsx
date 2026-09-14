"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techOrbit } from "@/data/skills";

// WebGL has no server-side equivalent, so the sphere is client-only.
const TechSphere = dynamic(
  () => import("@/components/ui/TechSphere").then((mod) => mod.TechSphere),
  {
    ssr: false,
    loading: () => (
      <div className="h-[min(132vw,60rem)] w-full animate-pulse" />
    ),
  },
);

export function TechStack() {
  return (
    // `overflow-hidden` contains the full-bleed canvas, which is 100vw and would
    // otherwise trigger horizontal scrolling next to a vertical scrollbar.
    <section
      id="skills"
      className="relative overflow-hidden border-y border-border bg-bg-elevated"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          watermark="SKILLS"
          title="Tech Stack"
          subtitle="What I build with"
        />

        <TechSphere items={techOrbit} />
      </div>
    </section>
  );
}
