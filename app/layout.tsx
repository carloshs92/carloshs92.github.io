import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Experience from "@/components/Experience";
import BinaryRain from "@/components/BinaryRain";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/profile";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://carloshs92.github.io"),
  title: { default: `${profile.name} · Ingeniero de Sistemas`, template: `%s · ${profile.name}` },
  description: "Ingeniero de Sistemas, Front End Lead e IA aplicada. Perfil, blog y proyectos.",
  openGraph: { type: "website", locale: "es_PE", siteName: profile.name },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07100b" },
    { media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
  ],
};

// Se ejecuta antes de pintar para evitar el parpadeo de tema
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getAllPosts().map(({ slug, title, date }) => ({ slug, title, date }));
  return (
    <html lang="es" data-theme="dark" className={mono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Experience>
          <BinaryRain />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <Header posts={posts} />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">{children}</main>
            <Footer />
          </div>
        </Experience>
      </body>
    </html>
  );
}
