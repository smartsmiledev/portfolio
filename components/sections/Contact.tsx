"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Send, Check, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.socials.email,
    href: `mailto:${profile.socials.email}`,
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "@shahdev",
    href: profile.socials.github,
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    value: "Shah Islam",
    href: profile.socials.linkedin,
  },
];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-sm text-text placeholder:text-text-subtle transition-colors focus:border-gold/50 focus:outline-none";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;

    // Without EmailJS credentials the form degrades to opening the user's mail client.
    if (!configured) {
      const data = new FormData(formRef.current);
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(
        `${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`,
      );
      window.location.href = `mailto:${profile.socials.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, {
        publicKey: PUBLIC_KEY!,
      });
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-border bg-bg-elevated py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          watermark="CONTACT"
          title="Let's Work Together"
          subtitle="Get in touch"
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-8">
            <p className="leading-relaxed text-text-muted">
              Have a project in mind or a role you think fits? Send a message
              and I will get back to you.
            </p>

            <div className="space-y-3">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-4 transition-all hover:border-gold/40 hover:bg-surface"
                >
                  <span className="rounded-lg border border-gold/20 bg-gold/10 p-2.5 text-gold transition-transform group-hover:scale-110">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-text-subtle">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-text transition-colors group-hover:text-gold">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-border bg-surface/40 p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs uppercase tracking-wider text-text-subtle"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className={field}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs uppercase tracking-wider text-text-subtle"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs uppercase tracking-wider text-text-subtle"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  className={field}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-wider text-text-subtle"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${field} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </Button>

                {status === "sent" && (
                  <span className="inline-flex items-center gap-2 text-sm text-emerald-400">
                    <Check size={15} />
                    Message sent. Thanks for reaching out.
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={15} />
                    Something went wrong. Try email instead.
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
