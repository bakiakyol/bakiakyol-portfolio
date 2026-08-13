"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  contact: { tr: "İletişim", en: "Contact" },
  rights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  joke: { tr: "Yan etkisi yoktur...", en: "No side effects..." },
  madeBy: { tr: "made by", en: "made by" },
};

const appleSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.7,
};

const socialLinks = [
  {
    href: "https://linkedin.com/in/bakiakyol",
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
  {
    href: "https://instagram.com/akyolbaki0",
    label: "Instagram",
    icon: Instagram,
    external: true,
  },
  {
    href: "mailto:info@bakiakyol.com",
    label: "E-posta",
    icon: Mail,
    external: false,
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <footer
      className="border-t py-16"
      style={{
        borderColor: "rgba(0,0,0,0.08)",
        background: "rgba(0,0,0,0.02)",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* İletişim */}
          <div className="text-center space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-deep-ocean/40">
              {t.contact[language]}
            </p>
            <div className="flex justify-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  transition={appleSpring}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-deep-ocean/10 bg-white text-deep-ocean/50 shadow-[0_1px_6px_rgba(0,0,0,0.07)] transition-all duration-150 hover:border-pharmacy-green/30 hover:text-pharmacy-green hover:shadow-[0_4px_14px_rgba(0,113,227,0.16)]"
                >
                  <Icon className="h-4.5 w-4.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-deep-ocean/8 pt-8 w-full">
            <div className="text-center space-y-1.5">
              <p className="text-xs text-deep-ocean/40">
                © 2026 Baki Akyol. {t.rights[language]}
              </p>
              <p className="text-xs italic text-deep-ocean/30">
                {t.joke[language]}
              </p>
              <p className="text-xs text-deep-ocean/25 mt-3">
                {t.madeBy[language]}{" "}
                <a
                  href="https://eftekin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-pharmacy-green"
                >
                  eftekin
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}