// Proyectos y aprendizajes: agrega un objeto a la lista para publicar uno nuevo.
// El orden importa: los 3 primeros salen como destacados en el inicio.

export type ProjectCategory = "ia" | "frontend" | "testing" | "juegos";

export const categoryLabels: Record<ProjectCategory, string> = {
  ia: "IA",
  frontend: "Frontend",
  testing: "Testing",
  juegos: "Juegos",
};

export type Project = {
  slug: string;
  name: string;
  year: number;
  category: ProjectCategory;
  status: "live" | "demo" | "archivo";
  description: string;
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
    description:
      "Juego gratis sobre la política monetaria del BCRP: presides el Banco Central y, mes a mes, mantienes la inflación entre 1% y 3% sin apagar el país. Modo Historia con capítulos reales (1990, 2008, 2017, 2020, 2021–23), mapa del Perú por regiones y música andina generada en el navegador.",
    stack: ["JavaScript", "Vite", "Web Audio", "Cloudflare Workers"],
    landing: "https://carloshs92.github.io/sol-firme-landing/",
  },
  {
    slug: "model-ai-jev-demos",
    name: "Jev Demos (TypeSafe AI)",
    year: 2026,
    category: "ia",
    status: "demo",
    description:
      "Demos ejecutables de Jev, un “System One model” que no genera texto: recibe un estado y devuelve valores tipados con probabilidades calibradas (Choice, Score, Noul). Backend en Flask + frontend.",
    stack: ["Python", "Flask", "TypeScript", "LLMs tipados"],
    repo: "https://github.com/carloshs92/model-ai-jev-demos",
  },
  {
    slug: "sin-panza",
    name: "SinPanza",
    year: 2026,
    category: "frontend",
    status: "live",
    description:
      "Webapp de entrenamiento personal guiado por voz. Convierte el catálogo de ExerciseDB en rutinas, con View Transitions y media servido vía jsDelivr.",
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
    description:
      "Chatbot con RAG para la academia de fútbol Americano FC: responde con la base de conocimiento de la academia (Pinecone) y streaming de respuestas. Proyecto final del programa de Apps y Chatbots con IA de la USIL.",
    stack: ["Next.js", "Vercel AI SDK", "OpenAI", "Pinecone", "Firebase"],
    repo: "https://github.com/carloshs92/usil-grupo-2",
    demo: "https://usil-grupo-2.vercel.app",
  },
  {
    slug: "team2-chatbot-comidas",
    name: "Chatbot de comida peruana",
    year: 2025,
    category: "ia",
    status: "archivo",
    description:
      "Llama 3.2 ajustado con LoRA para conversar sobre comida peruana, servido por WhatsApp con Twilio y Flask. Trabajo en equipo del programa de IA de la USIL.",
    stack: ["Python", "Llama 3.2", "LoRA / PEFT", "Twilio", "Flask"],
    repo: "https://github.com/carloshs92/Team2ChatbotComidas",
  },
  {
    slug: "nextjs-pwa-typescript",
    name: "Next.js + PWA + Workbox",
    year: 2023,
    category: "frontend",
    status: "archivo",
    description: "Plantilla de Next.js convertida en PWA con TypeScript y Workbox, acompañada de un artículo paso a paso.",
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
    description:
      "Serie de ejemplos con LangChain y TypeScript: leer documentos, chatbots, conversar con un libro, vectores con Pinecone y RAG sobre Notion + Firestore.",
    stack: ["LangChain", "TypeScript", "OpenAI", "Pinecone"],
    repo: "https://github.com/carloshs92/langchain-demos",
  },
  {
    slug: "mocha-tutorial-primeros-pasos",
    name: "Mocha: primeros pasos",
    year: 2015,
    category: "testing",
    status: "archivo",
    description:
      "Tutorial para iniciarse con pruebas unitarias en Mocha.js, con tips para el día a día. Publicado originalmente en Frontend Labs.",
    stack: ["Mocha", "Node.js", "JavaScript"],
    repo: "https://github.com/carloshs92/mocha-tutorial-primeros-pasos",
  },
];
