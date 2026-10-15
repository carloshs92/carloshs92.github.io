"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { useLocale } from "@/lib/useLocale";

export default function Footer() {
  const en = useLocale() === "en";
  return (
    <footer className="border-t border-line text-xs text-muted print:hidden">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6">
        <span>
          <span className="text-accent human:hidden">[exit 0]</span> © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="hidden sm:inline">{en ? "built with Next.js, Tailwind and Claude" : "hecho con Next.js, Tailwind y Claude"}</span>
        <span className="ml-auto flex gap-4">
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-accent">
            github
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
            linkedin
          </a>
          <a href={profile.links.medium} target="_blank" rel="noreferrer" className="hover:text-accent">
            medium
          </a>
          <Link href="/design-system/" className="hover:text-accent">
            design system
          </Link>
          <a href="/feed.xml" className="hover:text-accent">
            rss
          </a>
        </span>
      </div>
    </footer>
  );
}
