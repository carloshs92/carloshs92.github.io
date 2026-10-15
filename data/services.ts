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
      es: "Lineamientos técnicos, arquitectura con Next.js y React, code review y acompañamiento a equipos que necesitan ordenar o escalar su frontend.",
      en: "Technical guidelines, Next.js and React architecture, code review and support for teams that need to organize or scale their frontend.",
    },
    examples: [
      { es: "Auditoría de arquitectura", en: "Architecture audit" },
      { es: "Migración a Next.js", en: "Migration to Next.js" },
      { es: "Estándares y code review", en: "Standards and code review" },
    ],
  },
  {
    id: "ia",
    slug: { es: "ia", en: "ai" },
    title: { es: "Productos con IA", en: "AI-powered products" },
    description: {
      es: "Diseño y construcción de experiencias con modelos de lenguaje: chatbots con RAG, agentes, integraciones con Claude y MCP, y flujos de desarrollo asistidos por IA.",
      en: "Designing and building experiences with language models: RAG chatbots, agents, Claude and MCP integrations, and AI-assisted development workflows.",
    },
    examples: [
      { es: "Chatbots con RAG", en: "RAG chatbots" },
      { es: "Agentes y MCP", en: "Agents and MCP" },
      { es: "Adopción de Claude Code en equipos", en: "Rolling out Claude Code to teams" },
    ],
  },
  {
    id: "calidad",
    slug: { es: "design-systems", en: "design-systems" },
    title: { es: "Design systems y performance", en: "Design systems and performance" },
    description: {
      es: "Componentes reutilizables, accesibilidad y Core Web Vitals para que el producto se vea consistente y cargue rápido.",
      en: "Reusable components, accessibility and Core Web Vitals so the product looks consistent and loads fast.",
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
      es: "Sesiones uno a uno para devs frontend, talleres para equipos y charlas sobre frontend moderno e IA aplicada.",
      en: "One-on-one sessions for frontend developers, team workshops and talks on modern frontend and applied AI.",
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
    description: { es: "Me cuentas el problema, el equipo y los plazos.", en: "You tell me about the problem, the team and the timeline." },
  },
  {
    title: { es: "Propuesta", en: "Proposal" },
    description: { es: "Te envío un alcance concreto con entregables y tiempos.", en: "I send you a concrete scope with deliverables and timing." },
  },
  {
    title: { es: "Manos a la obra", en: "We get to work" },
    description: { es: "Trabajamos en ciclos cortos, con avances que puedes ver.", en: "We work in short cycles, with progress you can see." },
  },
];

/**
 * Canales de contacto además de LinkedIn. Se muestran solo si tienen valor.
 * - email: correo público para propuestas
 * - calendar: enlace para agendar (Cal.com, Calendly…)
 */
export const contact: { email?: string; calendar?: string } = {};
