// Proyectos y aprendizajes: agrega un objeto a la lista para publicar uno nuevo.
// El orden importa: los 3 primeros salen como destacados en el inicio.
// Los textos con { es, en } se muestran según el idioma de la página.

import type { Text } from "@/lib/i18n";

export type ProjectCategory = "ia" | "frontend" | "testing" | "juegos";

export const categoryLabels: Record<ProjectCategory, Text> = {
  ia: "IA",
  frontend: "Frontend",
  testing: "Testing",
  juegos: { es: "Juegos", en: "Games" },
};

export type Project = {
  slug: string;
  name: Text;
  year: number;
  category: ProjectCategory;
  status: "live" | "demo" | "archivo";
  description: Text;
  stack: string[];
  /** Página de presentación del proyecto; si existe, es el enlace principal. */
  landing?: string;
  /** Solo repos públicos: un repo privado da 404 a los visitantes. */
  repo?: string;
  demo?: string;
  article?: string;
};

/** Enlace principal de una tarjeta: landing, luego demo, luego repo. */
export const primaryLink = (p: Project) => p.landing ?? p.demo ?? p.repo;

export const projects: Project[] = [
  {
    slug: "sol-firme",
    name: "Sol Firme",
    year: 2026,
    category: "juegos",
    status: "live",
    description: {
      es: "Juego gratis sobre la política monetaria del BCRP: presides el Banco Central y, mes a mes, mantienes la inflación entre 1% y 3% sin apagar el país. Modo Historia con capítulos reales (1990, 2008, 2017, 2020, 2021–23), mapa del Perú por regiones y música andina generada en el navegador.",
      en: "Free game about the monetary policy of Peru's central bank (BCRP): you chair the bank and, month after month, keep inflation between 1% and 3% without stalling the country. Story mode with real chapters (1990, 2008, 2017, 2020, 2021–23), a map of Peru by region and Andean music generated in the browser.",
    },
    stack: ["JavaScript", "Vite", "Web Audio", "Cloudflare Workers"],
    landing: "https://carloshs92.github.io/sol-firme-landing/",
  },
  {
    slug: "model-ai-jev-demos",
    name: "Jev Demos (TypeSafe AI)",
    year: 2026,
    category: "ia",
    status: "demo",
    description: {
      es: "Demos ejecutables de Jev, un “System One model” que no genera texto: recibe un estado y devuelve valores tipados con probabilidades calibradas (Choice, Score, Noul). Backend en Flask + frontend.",
      en: "Runnable demos of Jev, a “System One model” that doesn't generate text: it takes a state and returns typed values with calibrated probabilities (Choice, Score, Noul). Flask backend + frontend.",
    },
    stack: ["Python", "Flask", "TypeScript", "LLMs tipados"],
    repo: "https://github.com/carloshs92/model-ai-jev-demos",
  },
  {
    slug: "sin-panza",
    name: "SinPanza",
    year: 2026,
    category: "frontend",
    status: "live",
    description: {
      es: "Webapp de entrenamiento personal guiado por voz. Convierte el catálogo de ExerciseDB en rutinas, con View Transitions y media servido vía jsDelivr.",
      en: "Voice-guided personal training web app. It turns the ExerciseDB catalog into workouts, with View Transitions and media served via jsDelivr.",
    },
    stack: ["Astro 5", "View Transitions", "Web Speech API", "Vercel"],
    repo: "https://github.com/carloshs92/sin-panza",
    demo: "https://sin-panza.vercel.app",
  },
  {
    slug: "usil-grupo-2",
    name: "Academia Bot · Americano FC",
    year: 2025,
    category: "ia",
    status: "live",
    description: {
      es: "Chatbot con RAG para la academia de fútbol Americano FC: responde con la base de conocimiento de la academia (Pinecone) y streaming de respuestas. Proyecto final del programa de Apps y Chatbots con IA de la USIL.",
      en: "RAG chatbot for the Americano FC football academy: it answers from the academy's knowledge base (Pinecone) with streamed responses. Final project of USIL's AI Apps and Chatbots program.",
    },
    stack: ["Next.js", "Vercel AI SDK", "OpenAI", "Pinecone", "Firebase"],
    repo: "https://github.com/carloshs92/usil-grupo-2",
    demo: "https://usil-grupo-2.vercel.app",
  },
  {
    slug: "team2-chatbot-comidas",
    name: { es: "Chatbot de comida peruana", en: "Peruvian food chatbot" },
    year: 2025,
    category: "ia",
    status: "archivo",
    description: {
      es: "Llama 3.2 ajustado con LoRA para conversar sobre comida peruana, servido por WhatsApp con Twilio y Flask. Trabajo en equipo del programa de IA de la USIL.",
      en: "Llama 3.2 fine-tuned with LoRA to chat about Peruvian food, served over WhatsApp with Twilio and Flask. Team project from USIL's AI program.",
    },
    stack: ["Python", "Llama 3.2", "LoRA / PEFT", "Twilio", "Flask"],
    repo: "https://github.com/carloshs92/Team2ChatbotComidas",
  },
  {
    slug: "nextjs-pwa-typescript",
    name: "Next.js + PWA + Workbox",
    year: 2023,
    category: "frontend",
    status: "archivo",
    description: {
      es: "Plantilla de Next.js convertida en PWA con TypeScript y Workbox, acompañada de un artículo paso a paso.",
      en: "Next.js template turned into a PWA with TypeScript and Workbox, with a step-by-step article (in Spanish).",
    },
    stack: ["Next.js", "TypeScript", "Workbox", "PWA"],
    repo: "https://github.com/carloshs92/nextjs-pwa-typescript",
    article: "https://carloshuamani.com/nextjs-con-pwa-typescript-workbox-28e31763cc81",
  },
  {
    slug: "langchain-demos",
    name: "LangChain Demos",
    year: 2023,
    category: "ia",
    status: "archivo",
    description: {
      es: "Serie de ejemplos con LangChain y TypeScript: leer documentos, chatbots, conversar con un libro, vectores con Pinecone y RAG sobre Notion + Firestore.",
      en: "A series of LangChain + TypeScript examples: reading documents, chatbots, talking to a book, Pinecone vectors and RAG over Notion + Firestore.",
    },
    stack: ["LangChain", "TypeScript", "OpenAI", "Pinecone"],
    repo: "https://github.com/carloshs92/langchain-demos",
  },
  {
    slug: "mocha-tutorial-primeros-pasos",
    name: { es: "Mocha: primeros pasos", en: "Mocha: getting started" },
    year: 2015,
    category: "testing",
    status: "archivo",
    description: {
      es: "Tutorial para iniciarse con pruebas unitarias en Mocha.js, con tips para el día a día. Publicado originalmente en Frontend Labs.",
      en: "Tutorial (in Spanish) to get started with unit testing in Mocha.js, with everyday tips. Originally published on Frontend Labs.",
    },
    stack: ["Mocha", "Node.js", "JavaScript"],
    repo: "https://github.com/carloshs92/mocha-tutorial-primeros-pasos",
  },
];
