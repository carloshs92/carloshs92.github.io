// Proyectos y aprendizajes: agrega un objeto a la lista para publicar uno nuevo.

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
  repo?: string;
  demo?: string;
  article?: string;
};

export const projects: Project[] = [
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
    slug: "bcrp-game",
    name: "Guardián de la Estabilidad",
    year: 2026,
    category: "juegos",
    status: "demo",
    description:
      "Juego educativo sobre política monetaria del BCRP: controla inflación, tipo de cambio y reservas. Pixel art cyberpunk andino, música adaptativa y un asesor económico que da pistas.",
    stack: ["JavaScript", "Canvas", "Web Audio", "LocalStorage"],
    repo: "https://github.com/carloshs92/bcrp-game",
  },
  {
    slug: "usil-grupo-2",
    name: "Proyecto final · Apps y Chatbots con IA",
    year: 2025,
    category: "ia",
    status: "live",
    description:
      "Aplicación desarrollada en el Programa Especializado en Diseño de Aplicaciones y Chatbots con IA de la USIL.",
    stack: ["Next.js", "TypeScript", "IA"],
    repo: "https://github.com/carloshs92/usil-grupo-2",
    demo: "https://usil-grupo-2.vercel.app",
  },
  {
    slug: "team2-chatbot-comidas",
    name: "Chatbot de comidas",
    year: 2025,
    category: "ia",
    status: "archivo",
    description: "Chatbot en Python desarrollado en equipo como trabajo final del programa de IA de la USIL.",
    stack: ["Python", "Chatbot"],
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
    article: "https://carloshuamani.com",
  },
  {
    slug: "javascript-testing-frontend-course",
    name: "Frontend testing con Testing Library",
    year: 2021,
    category: "testing",
    status: "archivo",
    description: "Material de curso sobre testing frontend con Testing Library y Jest.",
    stack: ["Jest", "Testing Library", "JavaScript"],
    repo: "https://github.com/carloshs92/javascript-testing-frontend-course",
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
