export type SkillCategory = {
  title: string;
  items: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 94 },
      { name: "Angular", level: 88 },
      { name: "Vue.js", level: 82 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend & AI",
    items: [
      { name: "C# / .NET", level: 96 },
      { name: "Node.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "Azure OpenAI / RAG", level: 87 },
      { name: "REST APIs / GraphQL", level: 93 },
    ],
  },
  {
    title: "Cloud & Data",
    items: [
      { name: "Azure", level: 90 },
      { name: "Microsoft Graph / 365", level: 88 },
      { name: "SQL Server / PostgreSQL", level: 89 },
      { name: "Docker / CI-CD", level: 84 },
    ],
  },
];

/** Keys map to the icon components in `components/ui/TechSphere`. */
export type TechIcon =
  | "typescript"
  | "javascript"
  | "python"
  | "csharp"
  | "react"
  | "nextjs"
  | "angular"
  | "vue"
  | "nodejs"
  | "dotnet"
  | "azure"
  | "openai"
  | "graphql"
  | "docker"
  | "postgresql"
  | "mysql"
  | "git"
  | "githubactions"
  | "tailwind"
  | "html"
  | "css"
  | "php"
  | "figma"
  | "aws";

export type TechOrbitItem = {
  name: string;
  icon: TechIcon;
  /** Official brand colour, used to tint the icon on the sphere. */
  color: string;
};

/** Technologies scattered across the rotating sphere in the Tech Stack section. */
export const techOrbit: TechOrbitItem[] = [
  { name: "TypeScript", icon: "typescript", color: "#3178c6" },
  { name: "JavaScript", icon: "javascript", color: "#f7df1e" },
  { name: "Python", icon: "python", color: "#3776ab" },
  { name: "C#", icon: "csharp", color: "#a179dc" },
  { name: "React", icon: "react", color: "#61dafb" },
  { name: "Next.js", icon: "nextjs", color: "#ffffff" },
  { name: "Angular", icon: "angular", color: "#dd0031" },
  { name: "Vue.js", icon: "vue", color: "#42b883" },
  { name: "Node.js", icon: "nodejs", color: "#5fa04e" },
  { name: ".NET", icon: "dotnet", color: "#8b6cf0" },
  { name: "Azure", icon: "azure", color: "#0089d6" },
  { name: "Azure OpenAI", icon: "openai", color: "#10a37f" },
  { name: "GraphQL", icon: "graphql", color: "#e10098" },
  { name: "Docker", icon: "docker", color: "#2496ed" },
  { name: "PostgreSQL", icon: "postgresql", color: "#5b7ee8" },
  { name: "MySQL", icon: "mysql", color: "#4479a1" },
  { name: "Git", icon: "git", color: "#f05033" },
  { name: "GitHub Actions", icon: "githubactions", color: "#2088ff" },
  { name: "Tailwind", icon: "tailwind", color: "#38bdf8" },
  { name: "HTML5", icon: "html", color: "#e34f26" },
  { name: "CSS", icon: "css", color: "#8a5cf6" },
  { name: "PHP", icon: "php", color: "#777bb4" },
  { name: "Figma", icon: "figma", color: "#f24e1e" },
  { name: "AWS", icon: "aws", color: "#ff9900" },
];
