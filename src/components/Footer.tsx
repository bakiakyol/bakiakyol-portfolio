"use client";

import { Linkedin, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  contact: { tr: "İletişim", en: "Contact" },
  rights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  joke: { tr: "Yan etkisi yoktur...", en: "No side effects..." },
  madeBy: { tr: "made by", en: "made by" }
};

export default function Footer() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <footer className="border-t border-deep-ocean/10 bg-clinical-white/50 py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Contact Section */}
          <div className="text-center space-y-6">
            <h3 className="text-lg font-semibold text-pharmacy-green">
              {t.contact[language]}
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://linkedin.com/in/bakiakyol"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
              </a>
              <a
                href="https://instagram.com/akyolbaki0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
              </a>
              <a
                href="mailto:info@bakiakyol.com"
                className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
              </a>
            </div>
          </div>

          {/* Copyright & Joke */}
          <div className="border-t border-deep-ocean/10 pt-8 w-full">
            <div className="text-center space-y-2">
              <p className="text-xs text-deep-ocean/50">
                © 2026 Baki Akyol. {t.rights[language]}
              </p>
              <p className="text-xs text-deep-ocean/40 italic">
                {t.joke[language]}
              </p>
              <p className="text-xs text-deep-ocean/30 mt-4">
                {t.madeBy[language]}{" "}
                <a
                  href="https://eftekin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pharmacy-green transition-colors duration-300"
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