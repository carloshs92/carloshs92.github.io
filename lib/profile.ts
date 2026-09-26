// Datos derivados del CV. Ambas vistas (terminal y humana) leen de aquí,
// así los cálculos viven en un solo lugar.

import { certifications, education, experience, featuredSkills, profile, skillGroups } from "@/data/profile";
import { durationMonths, toMonthIndex } from "./dates";

export const yearsOfExperience = () => new Date().getFullYear() - profile.startYear;

export const companyCount = () => new Set(experience.map((e) => e.company)).size;

export const skillCount = () => featuredSkills.length + skillGroups.reduce((n, g) => n + g.skills.length, 0);

export const credentialCount = () => education.length + certifications.length;

export const currentJob = () => experience.find((e) => !e.to) ?? experience[0];

export const groupAverages = () =>
  skillGroups.map((g) => ({
    id: g.id,
    label: g.label,
    title: g.title,
    level: Math.round(g.skills.reduce((s, k) => s + k.level, 0) / g.skills.length),
  }));

/** Filas para la línea de tiempo: inicio y fin en meses absolutos. */
export const timeline = () =>
  experience.map((job) => ({
    job,
    start: toMonthIndex(job.from),
    end: toMonthIndex(job.to) + 1,
    months: durationMonths(job.from, job.to),
  }));

/** Hash corto y estable para simular un `git log`. */
export function shortHash(s: string) {
  let h = 5381;
  for (const c of s) h = (h * 33) ^ c.charCodeAt(0);
  return (h >>> 0).toString(16).padStart(7, "0").slice(0, 7);
}
