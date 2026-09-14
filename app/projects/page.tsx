import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectsClient } from "./ProjectsClient";

export const metadata = {
  title: "All Projects",
  description: "Full list of projects by Andriy Tomusiak.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-gold"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Back to home
        </Link>

        <SectionHeading
          watermark="WORK"
          title="All Projects"
          subtitle="Complete portfolio"
        />

        <ProjectsClient projects={projects} />
      </div>
    </main>
  );
}
