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
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#111",
        }}
      >
        {imgSrc && (
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgSrc}
            width={1680}
            height={882}
            style={{
              position: "absolute",
              top: "-18%",
              left: "-20%",
              width: "140%",
              height: "140%",
              objectFit: "cover",
              objectPosition: "center 38%",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "56px",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 16,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              marginBottom: 16,
            }}
          >
            Quinn Kiefer
          </div>
          <div
            style={{
              color: "white",
              fontSize: 64,
              lineHeight: 1.1,
              fontWeight: 400,
              fontFamily: "serif",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 22,
              marginTop: 18,
              lineHeight: 1.4,
            }}
          >
            {post.description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
