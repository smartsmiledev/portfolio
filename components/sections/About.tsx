import { Bot, Cloud, Layers, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const traits = [
  {
    icon: Bot,
    title: "AI-First Development",
    text: "Building AI applications with Azure OpenAI, RAG pipelines, AI agents, vector search, and prompt engineering — production-grade, not experimental.",
  },
  {
    icon: ShieldCheck,
    title: "Microsoft Ecosystem",
    text: "Deep experience with Microsoft 365, SharePoint, Microsoft Graph API, and Entra ID — integrating enterprise data into custom applications.",
  },
  {
    icon: Layers,
    title: "Full-Stack Ownership",
    text: "Comfortable across the whole stack — from database schema to REST API to rendered component — without handing off at boundaries.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    text: "Deploying on Azure, AWS, and GCP with Docker, CI/CD pipelines, application monitoring, and production release management.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          watermark="ABOUT"
          title="About Me"
          subtitle="Who I am"
        />

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-5">
            {profile.bio.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-text-muted">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {["C# / .NET", "Azure OpenAI", "React", "TypeScript", "Python"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs text-gold"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {traits.map(({ icon: Icon, title, text }) => (
              <RevealItem
                key={title}
                className="group rounded-2xl border border-border bg-surface/40 p-6 transition-all duration-300 hover:border-gold/40 hover:bg-surface"
              >
                <div className="mb-4 inline-flex rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
