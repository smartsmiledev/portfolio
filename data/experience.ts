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
    period: "June 2024 - Jul 2026",
    current: true,
    points: [
      "Led the design and development of AI-powered web applications and intelligent business solutions using React, TypeScript, Python, FastAPI, and modern cloud infrastructure.",
      "Built LLM-powered features, RAG pipelines, document intelligence workflows, API integrations, and scalable backend services while contributing across product architecture, frontend development, DevOps, and production deployment.",
    ],
    stack: ["React", "Next.js", "TypeScript", ".NET", "Python", "Azure", "Azure OpenAI", "Microsoft Graph"],
  },
  {
    role: "Full Stack Microsoft Developer",
    company: "EPAM Systems",
    period: "September  2022 - November 2024",
    points: [
      "Developed enterprise applications and workflow automation solutions across the Microsoft ecosystem.",
      "Built custom web applications, SharePoint solutions, Power Apps, Power Automate workflows, and Microsoft 365 integrations while contributing to backend services, APIs, authentication, cloud deployment, and enterprise data integration.",
    ],
    stack: ["C#", ".NET", "React", "TypeScript", "SQL Server", "Azure", "Microsoft Graph", "Azure AD"],
  },
  {
    role: "Full Stack Developer",
    company: "Onit Digital, Inc.",
    period: "April 2020 - July 2022",
    points: [
      "Built and maintained responsive web applications, internal business tools, APIs, and data-driven platforms from frontend through backend deployment. ",
      "Developed reusable React interfaces, backend services, database integrations, authentication systems, and third-party API integrations while supporting application testing, optimization, and cloud deployment.",
    ],
    stack: ["JavaScript", "React", "Node.js", "PHP", "HTML", "CSS", "MySQL"],
  },
];
