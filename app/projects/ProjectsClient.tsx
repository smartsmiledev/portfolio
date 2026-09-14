"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { Project } from "@/data/projects";

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <ProjectModal
          projects={projects}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
