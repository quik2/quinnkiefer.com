import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  let imgSrc = "";
  if (post.image) {
    const imgData = readFileSync(join(process.cwd(), "public", post.image));
    imgSrc = `data:image/jpeg;base64,${imgData.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          backgroundColor: "#111",
        }}
      >
        {imgSrc && (
          <img
            alt=""
            src={imgSrc}
            width={1680}
            height={882}
            style={{
              width: "140%",
              height: "140%",
              objectFit: "cover",
              objectPosition: "center 38%",
              marginTop: "-12%",
              marginLeft: "-20%",
            }}
          />
        )}
      </div>
    ),
    { ...size }
  );
}
