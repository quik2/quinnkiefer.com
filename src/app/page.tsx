"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ease = [0.25, 0.1, 0, 1] as const;

function R({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <>
      <Header />

      {/* ═══════ MASTHEAD ═══════ */}
      <section className="min-h-[50svh] sm:min-h-[100svh] flex flex-col justify-end px-6 sm:px-10 pb-10 sm:pb-20 pt-24 sm:pt-20">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease }}
              className="font-serif text-[clamp(3rem,13vw,12rem)] leading-[0.88] tracking-[-0.04em] text-[#111]"
            >
              Quinn
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.08 }}
              className="font-serif text-[clamp(3rem,13vw,12rem)] leading-[0.88] tracking-[-0.04em] text-[#111]"
            >
              Kiefer
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="origin-left"
          >
            <div className="mt-8 sm:mt-14 border-t border-[#ddd]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 sm:mt-5 flex items-start justify-between"
          >
            <p className="text-[13px] text-[#999] leading-relaxed">
              Writer & builder.
              <br className="sm:hidden" />
              <span className="hidden sm:inline">{" "}</span>
              Cognitive Science at UCLA.
            </p>
            <p className="text-[12px] text-[#ccc] tracking-[0.15em] hidden sm:block">
              2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PULL QUOTE ═══════ */}
      <section className="px-6 sm:px-10 py-16 sm:py-32">
        <div className="max-w-[1200px] mx-auto">
          <R>
            <blockquote className="max-w-3xl">
              <p className="font-serif text-[clamp(1.4rem,3.8vw,3rem)] text-[#111] leading-[1.35] tracking-[-0.01em]">
                <span className="text-[#ccc]">&ldquo;</span>
                I&apos;m twenty years old, and my life plan is already
                outdated.
                <span className="text-[#ccc]">&rdquo;</span>
              </p>
              <Link
                href="/blog/the-promise"
                className="inline-block mt-4 sm:mt-6 text-[13px] text-[#bbb] hover:text-[#111] transition-colors duration-300"
              >
                from <em>The Promise</em>&thinsp;&#8594;
              </Link>
            </blockquote>
          </R>
        </div>
      </section>

      {/* ═══════ FEATURED — full bleed ═══════ */}
      <section ref={articleRef}>
        <R>
          <Link
            href="/blog/the-promise"
            className="group block relative overflow-hidden"
          >
            <div className="relative h-[60vh] sm:h-[80vh] lg:h-[90vh]">
              <motion.div
                style={{ y: imgY }}
                className="absolute inset-x-0 -top-[80px] -bottom-[80px]"
              >
                <Image
                  src="/thepromise.jpg"
                  alt="The Promise"
                  fill
                  className="object-cover group-hover:scale-[1.015] transition-transform duration-[2.5s] ease-out"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-14 lg:p-20">
                <div className="max-w-[1200px] mx-auto">
                  <p className="text-[10px] sm:text-[11px] text-white/25 uppercase tracking-[0.3em] mb-4 sm:mb-6">
                    Essay &middot; March 2026
                  </p>
                  <h2 className="font-serif text-3xl sm:text-6xl lg:text-8xl text-white leading-[1] tracking-[-0.03em]">
                    The Promise
                  </h2>
                  <div className="mt-5 sm:mt-8 flex items-center gap-4">
                    <span className="text-[13px] text-white/30 group-hover:text-white/80 transition-colors duration-700">
                      Read essay
                    </span>
                    <span className="w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-white/60 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </R>
      </section>

      {/* ═══════ COLOPHON ═══════ */}
      <section className="py-20 sm:py-44 px-6 sm:px-10">
        <div className="max-w-[1200px] mx-auto">
          <R>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-16">
              <p className="text-[11px] text-[#ccc] uppercase tracking-[0.2em] sm:pt-[6px]">
                About
              </p>
              <div>
                <p className="text-[15px] sm:text-[16px] text-[#666] leading-[1.9] sm:leading-[2] max-w-lg">
                  I build things at the intersection of people and technology.
                  Currently a product engineer at{" "}
                  <a
                    href="https://sugarwish.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111] hover:underline underline-offset-4"
                  >
                    Sugarwish
                  </a>{" "}
                  and founder of{" "}
                  <a
                    href="https://narrowrecruit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111] hover:underline underline-offset-4"
                  >
                    Narrow
                  </a>
                  , a video interview platform bootstrapped from zero.
                </p>
                <div className="mt-8 sm:mt-10 flex gap-8">
                  {[
                    { label: "GitHub", href: "https://github.com/quik2" },
                    {
                      label: "LinkedIn",
                      href: "https://linkedin.com/in/quinn-kiefer-0bb360294",
                    },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#bbb] hover:text-[#111] transition-colors duration-300"
                    >
                      {l.label}&thinsp;&#8599;
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      <Footer />
    </>
  );
}
