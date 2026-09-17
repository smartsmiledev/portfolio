export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Full Stack / AI Engineer",
    company: "Dreamers Inc",
    period: "June 2023 - Jul 2026",
    current: true,
    points: [
      "Led the design and development of AI-powered web applications and intelligent business solutions using React, TypeScript, Python, FastAPI, and modern cloud infrastructure.",
      "Built LLM-powered features, RAG pipelines, document intelligence workflows, API integrations, and scalable backend services while contributing across product architecture, frontend development, DevOps, and production deployment.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "Generative AI", "LLMs", "RAG", "PostgreSQL", "Azure", "AWS", "Docker", "CI/CD"],
  },
  {
    role: "Full Stack Microsoft Developer",
    company: "EPAM Systems",
    period: "October  2020 - August 2023",
    points: [
      "Developed enterprise applications and workflow automation solutions across the Microsoft ecosystem.",
      "Built custom web applications, SharePoint solutions, Power Apps, Power Automate workflows, and Microsoft 365 integrations while contributing to backend services, APIs, authentication, cloud deployment, and enterprise data integration.",
    ],
    stack: ["React", "TypeScript", "C#/.NET", "Microsoft 365", "SharePoint Online", "Power Apps", "Power Automate", "Microsoft Graph", "Azure", "Entra ID", "SQL", "REST APIs"],
  },
  {
    role: "Full Stack Developer",
    company: "Onit Digital, Inc.",
    period: "June 2018 - July 2020",
    points: [
      "Built and maintained responsive web applications, internal business tools, APIs, and data-driven platforms from frontend through backend deployment. ",
      "Developed reusable React interfaces, backend services, database integrations, authentication systems, and third-party API integrations while supporting application testing, optimization, and cloud deployment.",
    ],
    stack: ["React", "JavaScript", "TypeScript", "Python", "Node.js", "REST APIs", "PostgreSQL", "MySQL", "Git", "Docker", "AWS"],
  },
];
