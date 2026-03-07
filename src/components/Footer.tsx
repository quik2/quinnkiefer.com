"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0, 1] as const;

export function Footer() {
  return (
    <footer className="px-6 sm:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
        >
          <div className="border-t border-[#e0e0e0]" />
          <div className="py-10 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[13px] text-[#999]">
              Quinn Kiefer &middot; {new Date().getFullYear()}
            </p>
            <div className="flex gap-8">
              {[
                { label: "X", href: "https://x.com/quinn28202" },
                { label: "GitHub", href: "https://github.com/quik2" },
                { label: "LinkedIn", href: "https://linkedin.com/in/quinn-kiefer-0bb360294" },
                { label: "Email", href: "mailto:quinn@narrowrecruiting.com" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#bbb] hover:text-[#111] transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
