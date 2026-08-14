"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const t = {
  contact: { tr: "İletişim", en: "Contact" },
  rights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  joke: { tr: "Yan etkisi yoktur...", en: "No side effects..." },
  madeBy: { tr: "made by", en: "made by" },
};

const spring = { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.7 };

const socials = [
  { href: "https://linkedin.com/in/bakiakyol", label: "LinkedIn", icon: Linkedin, external: true },
  { href: "https://instagram.com/akyolbaki0", label: "Instagram", icon: Instagram, external: true },
  { href: "mailto:info@bakiakyol.com", label: "E-posta", icon: Mail, external: false },
];

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="py-16 border-t" style={{ borderColor: "var(--border)", backgroundColor: "transparent" }}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--text-3)" }}>
              {t.contact[language]}
            </p>
            <div className="flex justify-center gap-3">
              {socials.map(({ href, label, icon: Icon, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  transition={spring}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-150 hover:border-pharmacy-green/40 hover:text-pharmacy-green"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)", color: "var(--text-3)" }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="border-t pt-8 w-full text-center space-y-1.5" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>© 2026 Baki Akyol. {t.rights[language]}</p>
            <p className="text-xs italic" style={{ color: "var(--text-3)" }}>{t.joke[language]}</p>
            <p className="text-xs mt-3" style={{ color: "var(--text-3)" }}>
              {t.madeBy[language]}{" "}
              <a href="https://eftekin.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-pharmacy-green">
                eftekin
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}