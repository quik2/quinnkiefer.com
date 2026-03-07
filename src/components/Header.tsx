"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isArticle = pathname.startsWith("/blog/") && pathname !== "/blog";

  useEffect(() => {
    if (isArticle) return;
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [isArticle]);

  return (
    <header
      className={`${isArticle ? "absolute" : "fixed"} top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled && !isArticle ? "bg-white/80 backdrop-blur-xl border-b border-[#eee]" : ""
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 sm:px-10 h-[56px] flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="draw-link text-[13px] text-[#999] hover:text-[#111] transition-colors duration-300"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
