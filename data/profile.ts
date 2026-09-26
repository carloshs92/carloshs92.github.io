// Toda la información del CV vive aquí: edita este archivo para actualizar /perfil.

export const profile = {
  name: "Carlos Huamani",
  handle: "carloshs92",
  role: "Ingeniero de Sistemas · Front End Lead · IA aplicada",
  location: "Lima, Perú",
  startYear: 2014,
  summary: [
    "Ingeniero de Sistemas con más de una década construyendo productos web. Empecé como desarrollador front en Grupo El Comercio y desde entonces he liderado equipos y chapters frontend en e-commerce, salud, educación y finanzas.",
    "Hoy combino liderazgo técnico en frontend (Next.js, React, TypeScript, Tailwind) con el diseño de experiencias potenciadas por IA: agentes, RAG, chatbots y flujos de desarrollo con Claude.",
  ],
  links: {
    github: "https://github.com/carloshs92",
    linkedin: "https://www.linkedin.com/in/carloshs92",
    medium: "https://carloshuamani.com",
  },
};

export type Skill = { name: string; level: number };
export type SkillGroup = { id: string; label: string; skills: Skill[] };

// Las 4 habilidades principales (se muestran como gauges grandes)
export const featuredSkills: Skill[] = [
  { name: "Next.js", level: 96 },
  { name: "React", level: 97 },
  { name: "Claude", level: 94 },
  { name: "Tailwind CSS", level: 93 },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "front",
    label: "frontend",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES2024+)", level: 95 },
      { name: "HTML / CSS moderno", level: 94 },
      { name: "Design Systems", level: 88 },
      { name: "Web Performance / Core Web Vitals", level: 86 },
      { name: "Estado (Redux, Zustand, React Query)", level: 85 },
      { name: "GraphQL", level: 76 },
      { name: "PWA / Service Workers", level: 78 },
      { name: "Astro", level: 72 },
      { name: "Angular / Ionic", level: 62 },
    ],
  },
  {
    id: "ia",
    label: "ia",
    skills: [
      { name: "Claude Code / agentes de código", level: 94 },
      { name: "Claude API / Agent SDK", level: 86 },
      { name: "Prompt & Context Engineering", level: 88 },
      { name: "MCP (Model Context Protocol)", level: 82 },
      { name: "Vercel AI SDK / streaming UI", level: 82 },
      { name: "RAG + bases vectoriales (Pinecone)", level: 78 },
      { name: "LangChain", level: 76 },
      { name: "OpenAI API / fine-tuning", level: 74 },
      { name: "Evals y observabilidad de LLMs", level: 66 },
      { name: "Python para IA", level: 60 },
    ],
  },
  {
    id: "calidad",
    label: "testing",
    skills: [
      { name: "Jest / Vitest", level: 88 },
      { name: "React Testing Library", level: 88 },
      { name: "Playwright / Cypress", level: 72 },
      { name: "Mocha", level: 72 },
      { name: "Accesibilidad (WCAG)", level: 78 },
    ],
  },
  {
    id: "ops",
    label: "tooling",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Node.js", level: 80 },
      { name: "CI/CD (GitHub Actions)", level: 78 },
      { name: "Vercel / AWS Amplify", level: 84 },
      { name: "Docker", level: 55 },
      { name: "Figma", level: 70 },
    ],
  },
];

export const softSkills = [
  "Liderazgo técnico",
  "Lineamientos frontend",
  "Code review",
  "Mentoría",
  "Innovación",
  "Pensamiento creativo",
];

export type Job = {
  role: string;
  company: string;
  start: string;
  end: string;
  mode: string;
  description: string;
  stack: string[];
};

export const experience: Job[] = [
  {
    role: "Front End Lead",
    company: "Delosi S.A.",
    start: "sept. 2023",
    end: "actualidad",
    mode: "Lima, Perú · Híbrido",
    description:
      "Responsable de dictar los lineamientos técnicos de frontend y de supervisar el desarrollo de soluciones digitales que dan soporte al ecosistema de e-commerce.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "React Testing Library", "IA"],
  },
  {
    role: "Senior Frontend Developer",
    company: "Blum SAF",
    start: "dic. 2021",
    end: "sept. 2023",
    mode: "Remoto",
    description:
      "Encargado del equipo de desarrollo frontend, estableciendo estándares de código y flujos de trabajo que garantizan la entrega de aplicativos web ordenados, escalables y de alta calidad técnica.",
    stack: ["React", "TypeScript", "Jest", "Design System"],
  },
  {
    role: "Senior Frontend Developer",
    company: "Auna",
    start: "may. 2021",
    end: "ene. 2022",
    mode: "Remoto",
    description:
      "Desarrollo y optimización del ecosistema de e-commerce para el sector salud, con un stack moderno basado en React, TypeScript y GraphQL para una experiencia fluida y robusta.",
    stack: ["React", "TypeScript", "GraphQL"],
  },
  {
    role: "Senior Frontend Developer · Líder del Chapter Front",
    company: "UTP Universidad Tecnológica del Perú",
    start: "abr. 2018",
    end: "abr. 2021",
    mode: "Lima, Perú · Presencial",
    description:
      "Líder del Chapter Front: desarrollo de aplicaciones web con React, TypeScript y Design System, y mantenimiento de apps móviles con Ionic y Angular para las áreas de innovación y sistemas.",
    stack: ["React", "TypeScript", "Design System", "Ionic", "Angular", "Jest"],
  },
  {
    role: "Desarrollador Front-End",
    company: "Quantum Talent Co.",
    start: "ene. 2020",
    end: "dic. 2020",
    mode: "Remoto · Autónomo",
    description:
      "Desarrollo de requerimientos aplicando generator functions (redux-saga) para los distintos servicios del sistema junto con Redux.",
    stack: ["React", "Redux", "redux-saga"],
  },
  {
    role: "Desarrollador Front-End",
    company: "Grupo El Comercio",
    start: "2014",
    end: "abr. 2018",
    mode: "Lima, Perú · Presencial",
    description:
      "Programador y principal encargado de proyectos con JavaScript, React y Angular, aplicando técnicas de optimización web y responsive design.",
    stack: ["JavaScript", "React", "Angular", "Responsive", "Performance"],
  },
];

export const education = [
  {
    school: "Universidad Peruana de Ciencias Aplicadas (UPC)",
    degree: "Ingeniería de Sistemas",
    period: "2014 – 2017",
  },
  {
    school: "Escuela de Posgrado · Universidad San Ignacio de Loyola",
    degree: "Programa Especializado en Diseño de Aplicaciones y Chatbots con IA",
    period: "mar. 2025 – may. 2025",
  },
  {
    school: "Escuela de Postgrado UTP",
    degree: "Especialización en Innovación Empresarial",
    period: "2018 – 2019",
  },
];

export const certifications = [
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "may. 2026",
    credentialId: "3tgea4a2aypc",
  },
  {
    name: "Creative Thinking: Techniques and Tools for Success",
    issuer: "Imperial College London",
    date: "jul. 2020",
  },
];
