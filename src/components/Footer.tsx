import Link from "next/link";
import { Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-deep-ocean/10 bg-clinical-white/50 py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Contact Section */}
          <div className="text-center space-y-6">
            <h3 className="text-lg font-semibold text-pharmacy-green">
              İletişim
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
                href="https://instagram.com/bakiakyol"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
              </a>
              <a
                href="mailto:baki@example.com"
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
                © 2026 Baki Akyol. Tüm hakları saklıdır.
              </p>
              <p className="text-xs text-deep-ocean/40 italic">
                Yan etkisi yoktur...
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
