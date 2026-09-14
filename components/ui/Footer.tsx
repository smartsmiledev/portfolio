import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "@/data/profile";

const socials = [
  { href: profile.socials.github, icon: FaGithub, label: "GitHub" },
  { href: profile.socials.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: `mailto:${profile.socials.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-sm text-text-subtle">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-full border border-border p-2.5 text-text-muted transition-all hover:border-gold hover:text-gold"
            >
              <Icon size={16} />
            </a>
          ))}

          <a
            href="#home"
            aria-label="Back to top"
            className="rounded-full border border-border p-2.5 text-text-muted transition-all hover:border-gold hover:text-gold"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
