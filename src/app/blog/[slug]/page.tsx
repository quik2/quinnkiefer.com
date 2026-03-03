import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://quinnkiefer.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["Quinn Kiefer"],
      ...(post.image && {
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image && { images: [post.image] }),
    },
  };
}

function formatDate(raw: string) {
  const d = new Date(raw + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const mins = readingTime(post.content);

  return (
    <>
      <Header />

      {post.image && (
        <div className="relative w-full h-[40vh] sm:h-[45vh] mt-[56px] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover scale-[1.25]"
            style={{ objectPosition: "center 40%" }}
            priority
          />
        </div>
      )}

      <main className="max-w-[660px] mx-auto px-6 sm:px-10 pb-28">
        <div className={post.image ? "pt-10" : "pt-36"}>
          <Link
            href="/blog"
            className="text-[12px] text-[#bbb] hover:text-[#111] transition-colors duration-300 uppercase tracking-[0.12em]"
          >
            &larr; All writing
          </Link>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#111] leading-[1.15] tracking-[-0.02em]">
            {post.title}
          </h1>
          <p className="mt-4 text-[13px] text-[#aaa]">
            {formatDate(post.date)} &nbsp;&middot;&nbsp; {mins} min read
          </p>
        </div>

        <article className="mt-10 article-body">
          <div className="prose max-w-none
            prose-p:text-[#444] prose-p:text-[16px] prose-p:leading-[1.9] prose-p:mb-6
            prose-headings:font-serif prose-headings:text-[#111]
            prose-a:text-[#111] prose-a:underline prose-a:underline-offset-4 prose-a:decoration-[#ddd] hover:prose-a:decoration-[#111]
            prose-strong:text-[#222]
            prose-blockquote:border-l-2 prose-blockquote:border-[#ddd] prose-blockquote:pl-5 prose-blockquote:ml-0 prose-blockquote:text-[#555] prose-blockquote:not-italic
            prose-hr:border-0 prose-hr:my-10 prose-hr:text-center
            prose-code:text-[#111]
          ">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-[#eee]">
          <Link
            href="/blog"
            className="text-[13px] text-[#bbb] hover:text-[#111] transition-colors duration-300"
          >
            &larr; Back to all writing
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
