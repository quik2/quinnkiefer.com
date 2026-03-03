import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://quinnkiefer.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: "https://quinnkiefer.com", lastModified: new Date() },
    { url: "https://quinnkiefer.com/blog", lastModified: new Date() },
    ...blogEntries,
  ];
}
