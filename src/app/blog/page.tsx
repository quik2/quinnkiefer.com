import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Writing" };

function formatDate(raw: string) {
  const d = new Date(raw + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-36 pb-32 min-h-screen">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111] mb-16">Writing</h1>

        {posts.length === 0 ? (
          <p className="text-[#bbb]">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl overflow-hidden bg-[#fafafa] hover:shadow-lg transition-shadow duration-500"
              >
                {post.image && (
                  <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover scale-[1.25] group-hover:scale-[1.3] transition-transform duration-700 ease-out"
                      style={{ objectPosition: "center 40%" }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <time className="text-[12px] text-[#bbb]">{formatDate(post.date)}</time>
                  <h2 className="font-serif text-lg text-[#111] mt-2 leading-snug group-hover:underline underline-offset-4">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-[#999] mt-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16">
          <Link href="/" className="text-[13px] text-[#bbb] hover:text-[#111] transition-colors duration-300">
            &larr; Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
