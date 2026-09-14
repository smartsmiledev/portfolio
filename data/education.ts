export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  current?: boolean;
  detail?: string;
  note?: string;
};

export const education: EducationItem[] = [
  {
    degree: "Bachelor's Degree",
    institution: "Queens College",
    period: "Sep 20xx — May 20xx",
    note: "Foundation in computer science, software engineering, and systems design — providing the groundwork for a career spanning full-stack web development, enterprise integrations, and AI engineering.",
  },
];
