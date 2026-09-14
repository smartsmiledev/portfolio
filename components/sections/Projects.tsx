"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects } from "@/data/projects";

const VISIBLE = 4;
const preview = projects.slice(0, VISIBLE);

export function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <section id="projects" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            watermark="WORK"
            title="Projects"
            subtitle="Selected work"
          />

          <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.09}>
            {preview.map((project, i) => (
              <RevealItem key={project.slug}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedIndex(i)}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          {/* View More */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-text-muted transition-all duration-200 hover:border-gold/40 hover:text-gold"
            >
              View all projects
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal — rendered outside the section so it sits above everything */}
      {selectedIndex !== null && (
        <ProjectModal
          projects={preview}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
