import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PreferencesProvider from "@/components/providers/Preferences";
import PageTransitions from "@/components/providers/PageTransitions";
import BinaryRain from "@/components/effects/BinaryRain";
import KeySounds from "@/components/effects/KeySounds";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { bootScript } from "@/lib/preferences";
import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/profile";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getAllPosts().map(({ slug, title, date }) => ({ slug, title, date }));
  return (
    <html lang="es" data-theme="dark" data-mode="terminal" className={`${mono.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <PreferencesProvider>
          <PageTransitions>
            <BinaryRain />
            <KeySounds />
            <div className="relative z-10 flex min-h-dvh flex-col">
              <Header posts={posts} />
              <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">{children}</main>
              <Footer />
            </div>
          </PageTransitions>
        </PreferencesProvider>
      </body>
    </html>
  );
}
