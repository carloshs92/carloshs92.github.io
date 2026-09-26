import type { Metadata } from "next";
import Link from "next/link";
import Prompt from "@/components/Prompt";
import Scramble from "@/components/Scramble";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <Prompt cmd={`cat ${slug}.md`} path="~/blog" />
        <Scramble as="h1" text={post.title} duration={900} className="glow block text-2xl font-extrabold leading-tight text-accent sm:text-4xl" />
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" data-piece>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min de lectura</span>
          {post.tags.map((t) => (
            <span key={t} className="text-accent-3">
              #{t}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-term" dangerouslySetInnerHTML={{ __html: post.html }} />

      <footer className="space-y-4 border-t border-line pt-6 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}/`} className="rounded border border-line p-3 hover:border-accent" data-piece>
              <div className="text-xs text-muted">← anterior</div>
              <div className="mt-1 font-bold">{older.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}/`} className="rounded border border-line p-3 text-right hover:border-accent" data-piece>
              <div className="text-xs text-muted">siguiente →</div>
              <div className="mt-1 font-bold">{newer.title}</div>
            </Link>
          )}
        </div>
        <Link href="/blog/" className="inline-block text-accent-3 hover:text-accent">
          $ cd ..
        </Link>
      </footer>
    </article>
  );
}
