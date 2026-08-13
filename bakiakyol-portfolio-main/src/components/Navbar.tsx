"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScrollTo } from "./SmoothScroll";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { href: "#hakkimda", tr: "Hakkımda", en: "About" },
  { href: "#deneyimler", tr: "Deneyimler", en: "Experience" },
  { href: "#projeler", tr: "Projeler", en: "Projects" },
  { href: "#sertifikalar", tr: "Sertifikalar", en: "Certificates" },
];

// Apple spring — stiff, no bounce (critically damped)
const appleSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  // Scroll'a göre navbar'ın glass yoğunluğunu artır
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
    closeMenu();
  };

  return (
    <>
      {/* Apple-style frosted glass navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          backgroundColor: scrolled ? "rgba(245,245,247,0.85)" : "rgba(245,245,247,0.72)",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.1)"
            : "1px solid rgba(0,0,0,0.06)",
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <nav
          aria-label="Ana navigasyon"
          className="mx-auto flex h-[52px] w-full max-w-6xl items-center justify-between px-6"
        >
          {/* Sol: Nav linkleri */}
          <ul className="hidden flex-wrap items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="apple-press inline-block rounded-lg px-3 py-1.5 text-sm font-medium text-deep-ocean/75 transition-colors duration-150 hover:bg-deep-ocean/6 hover:text-deep-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pharmacy-green focus-visible:ring-offset-2"
                >
                  {item[language as keyof typeof item]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobil: Hamburger */}
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.94 }}
            transition={appleSpring}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-deep-ocean/70 hover:bg-deep-ocean/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pharmacy-green"
            aria-label="Menüyü aç"
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={appleSpring}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={appleSpring}
                >
                  <Menu className="h-5 w-5" strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Sağ: İsim + Dil seçici */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-deep-ocean">
              Baki Akyol
            </span>

            {/* Dil dropdown */}
            <div className="relative">
              <motion.button
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                whileTap={{ scale: 0.95 }}
                transition={appleSpring}
                className="flex h-8 w-[68px] items-center justify-center gap-1.5 rounded-full border border-deep-ocean/12 bg-white/60 text-xs font-medium text-deep-ocean/75 backdrop-blur-sm transition-all duration-150 hover:border-deep-ocean/20 hover:bg-white/80 hover:text-deep-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pharmacy-green"
                aria-label="Dil değiştir"
              >
                <span className="text-xs">{language === "tr" ? "🇹🇷" : "🇺🇸"}</span>
                <span>{language.toUpperCase()}</span>
              </motion.button>

              <AnimatePresence initial={false}>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={appleSpring}
                    style={{ transformOrigin: "top right" }}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute top-full right-0 mt-2 w-[72px] overflow-hidden rounded-xl border border-deep-ocean/10 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                  >
                    {[
                      { code: "tr", flag: "🇹🇷", label: "TR" },
                      { code: "en", flag: "🇺🇸", label: "EN" },
                    ].map(({ code, flag, label }, i) => (
                      <motion.button
                        key={code}
                        onClick={() => {
                          setLanguage(code as "tr" | "en");
                          setIsDropdownOpen(false);
                        }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex w-full items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-deep-ocean/80 transition-colors hover:bg-deep-ocean/6 hover:text-deep-ocean ${
                          i > 0 ? "border-t border-deep-ocean/6" : ""
                        }`}
                      >
                        <span>{flag}</span>
                        <span>{label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobil menü */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 top-[52px] z-40 bg-black/20 md:hidden"
              style={{ backdropFilter: "blur(2px)" }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={appleSpring}
              className="fixed left-0 right-0 top-[52px] z-40 overflow-hidden md:hidden"
              style={{
                backdropFilter: "saturate(180%) blur(20px)",
                WebkitBackdropFilter: "saturate(180%) blur(20px)",
                backgroundColor: "rgba(245,245,247,0.92)",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <ul className="flex flex-col py-2">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...appleSpring, delay: i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="apple-press flex items-center px-6 py-3.5 text-base font-medium text-deep-ocean/75 transition-colors hover:bg-deep-ocean/6 hover:text-deep-ocean"
                    >
                      {item[language as keyof typeof item]}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-[52px]" />
    </>
  );
}