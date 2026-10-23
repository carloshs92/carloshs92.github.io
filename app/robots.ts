import type { MetadataRoute } from "next";
import { SITE } from "@/lib/i18n";

export const dynamic = "force-static";

// Todos los bots pueden entrar. Los de IA van con nombre propio para dejar clara la
// intención y poder cambiar uno sin tocar el resto: para no aparecer en el
// entrenamiento pero sí en respuestas, pasa a `disallow` solo los de entrenamiento.
const AI_TRAINING = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"];
const AI_SEARCH = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_SEARCH, allow: "/" },
      { userAgent: AI_TRAINING, allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
