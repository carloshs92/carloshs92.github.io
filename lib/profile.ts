// Datos derivados del CV. Ambas vistas (terminal y humana) leen de aquí,
// así los cálculos viven en un solo lugar.

import { certifications, experience, featuredSkills, profile, skillGroups } from "@/data/profile";

export const yearsOfExperience = () => new Date().getFullYear() - profile.startYear;

export const companyCount = () => new Set(experience.map((e) => e.company)).size;

export const skillCount = () => featuredSkills.length + skillGroups.reduce((n, g) => n + g.skills.length, 0);

export const certificationCount = () => certifications.length;

export const currentJob = () => experience.find((e) => !e.to) ?? experience[0];

export const groupAverages = () =>
  skillGroups.map((g) => ({
    id: g.id,
    label: g.label,
    title: g.title,
    level: Math.round(g.skills.reduce((s, k) => s + k.level, 0) / g.skills.length),
  }));
