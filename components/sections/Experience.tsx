import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { experience } from "@/data/experience";

export function Experience() {
  const entries: TimelineEntry[] = experience.map((item, i) => ({
    id: `${item.company}-${i}`,
    badge: item.current ? "Current Role" : "Previous Role",
    highlight: item.current,
    period: item.period,
    title: item.role,
    subtitle: item.company,
    children: (
      <>
        <ul className="space-y-2.5">
          {item.points.map((point, idx) => (
            <li key={idx} className="flex gap-3 text-sm leading-relaxed text-text-muted">
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0 text-gold/70"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 text-xs text-text-subtle"
            >
              {tech}
            </span>
          ))}
        </div>
      </>
    ),
  }));

  return (
    <section
      id="experience"
      className="relative border-y border-border bg-bg-elevated py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          watermark="CAREER"
          title="Experience"
          subtitle="Where I have worked"
        />
        <Timeline entries={entries} />
      </div>
    </section>
  );
}
