import { Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline, type TimelineEntry } from "@/components/Timeline";
import { education } from "@/data/education";

export function Education() {
  const entries: TimelineEntry[] = education.map((item, i) => ({
    id: `${item.institution}-${i}`,
    badge: "Education",
    highlight: i === 0,
    period: item.period,
    title: item.degree,
    subtitle: item.institution,
    children: (
      <>
        {item.note && (
          <p className="text-sm leading-relaxed text-text-muted">{item.note}</p>
        )}
        {item.detail && (
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs text-gold">
            <Award size={12} />
            {item.detail}
          </span>
        )}
      </>
    ),
  }));

  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          watermark="STUDY"
          title="Education"
          subtitle="Academic journey"
        />
        <Timeline entries={entries} />
      </div>
    </section>
  );
}
