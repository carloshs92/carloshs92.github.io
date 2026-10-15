// "Trabajemos juntos": qué ofrezco y cómo contactarme. Edita este archivo para
// cambiar servicios, pasos o canales de contacto (español e inglés).

import type { Text } from "@/lib/i18n";

/** `slug` es el nombre de "carpeta" que se ve en modo terminal. */
export type Service = { id: string; slug: Text; title: Text; description: Text; examples: Text[] };

export const services: Service[] = [
  {
    id: "frontend",
    slug: "frontend",
    title: { es: "Liderazgo y consultoría frontend", en: "Frontend leadership and consulting" },
    description: {
      es: "Defino lineamientos técnicos, diseño la arquitectura con Next.js y React y acompaño a los equipos que necesitan ordenar o escalar su frontend, con code review incluido.",
      en: "I set technical guidelines, design Next.js and React architecture, and support teams that need to organize or scale their frontend, code review included.",
    },
    examples: [
      { es: "Auditoría de arquitectura", en: "Architecture audit" },
      { es: "Migración a Next.js", en: "Migration to Next.js" },
      { es: "Estándares de código y code review", en: "Coding standards and code review" },
    ],
  },
  {
    id: "ia",
    slug: { es: "ia", en: "ai" },
    title: { es: "Inteligencia artificial aplicada", en: "Applied AI" },
    description: {
      es: "Diseño y construyo funciones con IA que la gente realmente usa: asistentes que responden con la información de tu negocio, agentes conectados a tus sistemas y equipos que programan más rápido con Claude Code.",
      en: "I design and build AI features people actually use: assistants that answer from your business's own information, agents connected to your systems, and teams that ship faster with Claude Code.",
    },
    examples: [
      { es: "Chatbots con tu información (RAG)", en: "Chatbots on your own data (RAG)" },
      { es: "Agentes con Claude y MCP", en: "Agents with Claude and MCP" },
      { es: "Claude Code para tu equipo", en: "Claude Code for your team" },
    ],
  },
  {
    id: "calidad",
    slug: { es: "design-systems", en: "design-systems" },
    title: { es: "Design systems y performance", en: "Design systems and performance" },
    description: {
      es: "Creo componentes reutilizables y accesibles, y optimizo los Core Web Vitals para que tu producto se vea igual de bien en cada pantalla y cargue rápido.",
      en: "I build reusable, accessible components and tune Core Web Vitals so your product looks consistent on every screen and loads fast.",
    },
    examples: [
      { es: "Design system en React", en: "React design system" },
      { es: "Auditoría de accesibilidad", en: "Accessibility audit" },
      { es: "Optimización de Core Web Vitals", en: "Core Web Vitals tuning" },
    ],
  },
  {
    id: "mentoria",
    slug: { es: "mentorias", en: "mentoring" },
    title: { es: "Mentorías y charlas", en: "Mentoring and talks" },
    description: {
      es: "Acompaño a desarrolladores frontend en sesiones uno a uno, doy talleres a equipos y charlas sobre frontend moderno e IA en el trabajo diario.",
      en: "I mentor frontend developers one-on-one, run team workshops and give talks on modern frontend and AI in day-to-day work.",
    },
    examples: [
      { es: "Mentoría 1:1", en: "1:1 mentoring" },
      { es: "Talleres para equipos", en: "Team workshops" },
      { es: "Charlas y meetups", en: "Talks and meetups" },
    ],
  },
];

export const steps: { title: Text; description: Text }[] = [
  {
    title: { es: "Conversamos", en: "We talk" },
    description: { es: "Me cuentas qué quieres lograr, con qué equipo cuentas y en qué plazos.", en: "You tell me what you want to achieve, the team you have and your timeline." },
  },
  {
    title: { es: "Propuesta", en: "Proposal" },
    description: { es: "Te envío un alcance claro, con entregables, tiempos y presupuesto.", en: "I send you a clear scope with deliverables, timing and budget." },
  },
  {
    title: { es: "Manos a la obra", en: "We get to work" },
    description: { es: "Avanzamos en ciclos cortos y revisas resultados al final de cada uno.", en: "We move in short cycles and you review results at the end of each one." },
  },
];

/**
 * Canales de contacto además de LinkedIn. Se muestran solo si tienen valor.
 * - email: correo público para propuestas
 * - calendar: enlace para agendar (Cal.com, Calendly…)
 */
export const contact: { email?: string; calendar?: string } = {};
