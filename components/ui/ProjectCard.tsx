"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/basePath";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: Props) {
  const { code, title, subtitle, year, images } = project;
  const cover = images[0] ?? null;

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface/40 transition-all duration-300 hover:border-gold/40"
    >
      {/* Image / Placeholder */}
      <div className="relative aspect-video overflow-hidden bg-bg-elevated">
        {cover ? (
          <Image
            src={asset(cover)}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no screenshot is available yet */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface via-bg-elevated to-surface">
            <div className="flex flex-col items-center gap-3 opacity-30">
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-10 rounded-sm bg-gold"
                    style={{ opacity: 0.3 + (i % 3) * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROJ-XX badge */}
        <span className="absolute top-3 right-3 rounded-full border border-gold/25 bg-bg/80 px-2.5 py-1 text-[11px] font-mono font-medium text-gold backdrop-blur-sm">
          {code}
        </span>

        {/* Arrow button — visible on hover */}
        <div className="absolute bottom-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-gold opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={16} className="text-bg" strokeWidth={2.5} />
        </div>

        {/* Gold overlay on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Info row */}
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-text transition-colors group-hover:text-gold">
            {title}
          </h3>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-text-subtle">
            {subtitle}
          </p>
        </div>
        <span className="shrink-0 pt-0.5 font-mono text-sm text-text-subtle">
          {year}
        </span>
      </div>
    </article>
  );
}
