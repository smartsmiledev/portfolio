"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { asset } from "@/lib/basePath";
import type { Project } from "@/data/projects";

type Props = {
  projects: Project[];
  initialIndex: number;
  onClose: () => void;
};

function Carousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  // Reset when project changes.
  useEffect(() => setActive(0), [images]);

  if (images.length === 0) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center rounded-xl bg-gradient-to-br from-surface via-bg-elevated to-surface">
        <div className="flex flex-col items-center gap-3 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-12 rounded-sm bg-gold"
                style={{ opacity: 0.3 + (i % 3) * 0.2 }}
              />
            ))}
          </div>
          <span className="text-xs text-text-subtle">No screenshot yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-bg-elevated">
        <Image
          src={asset(images[active])}
          alt={`${title} — screenshot ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 90vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-bg/70 backdrop-blur-sm transition-colors hover:bg-bg"
            >
              <ChevronLeft size={16} className="text-text" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-bg/70 backdrop-blur-sm transition-colors hover:bg-bg"
            >
              <ChevronRight size={16} className="text-text" />
            </button>
            <span className="absolute bottom-2 right-3 text-xs text-text/60">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                i === active ? "border-gold" : "border-border hover:border-gold/40"
              }`}
            >
              <Image src={asset(src)} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectModal({ projects, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const project = projects[index];
  const overlayRef = useRef<HTMLDivElement>(null);

  // Sync when parent changes initialIndex (e.g. user opens a different card).
  useEffect(() => setIndex(initialIndex), [initialIndex]);

  // Close on Escape.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent background scroll while modal is open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        ref={overlayRef}
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 px-4 py-6 backdrop-blur-sm"
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      >
        {/* Panel */}
        <motion.div
          key={`panel-${index}`}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-gold/40 hover:text-text"
          >
            <X size={15} />
          </button>

          {/* Scrollable content */}
          <div className="overflow-y-auto">
            {/* Carousel */}
            <div className="p-5 pb-0">
              <Carousel images={project.images} title={project.title} />
            </div>

            {/* Project info */}
            <div className="px-6 pt-5 pb-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mb-1 font-mono text-xs font-medium text-gold">
                    {project.code}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-text">
                    {project.title}
                  </h2>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-text-subtle">
                    {project.subtitle}
                  </p>
                  <p className="mt-1 font-mono text-xs text-text-subtle">
                    {project.year}
                  </p>
                  <p className="mt-2 text-xs text-text-muted">
                    {project.industry}
                    <span className="mx-1.5 text-text-subtle">·</span>
                    {project.projectType}
                  </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-gold underline underline-offset-2 transition-opacity hover:opacity-70"
                    >
                      {project.links.live.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-gold"
                    >
                      <FaGithub size={13} />
                      Source
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-gold"
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Case Study */}
            <div className="space-y-5 px-6 py-5">
              {/* Concept */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Concept
                </h4>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.summary}
                </p>
              </section>

              {/* Core features */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Core Features
                </h4>
                <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm leading-relaxed text-text-muted"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Divider */}
              <div className="h-px bg-border" />

              <p className="text-[10px] uppercase tracking-[0.2em] text-text-subtle">
                Case study — sample scenario
              </p>

              {/* Situation */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Situation
                </h4>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.caseStudy.situation}
                </p>
              </section>

              {/* Challenges */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Challenges
                </h4>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.caseStudy.challenges}
                </p>
              </section>

              {/* Approach */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Approach
                </h4>
                <ul className="space-y-2">
                  {project.caseStudy.approach.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Technical decisions */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Technical Decisions
                </h4>
                <ul className="space-y-2">
                  {project.caseStudy.decisions.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Result */}
              <section>
                <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Expected Result
                </h4>
                <p className="text-sm font-medium leading-relaxed text-text">
                  {project.caseStudy.result}
                </p>
              </section>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between border-t border-border px-6 py-3">
            <button
              onClick={prev}
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold"
            >
              <ChevronLeft size={15} />
              Prev project
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold"
            >
              Next project
              <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
