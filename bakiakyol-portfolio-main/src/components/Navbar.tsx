"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { smoothScrollTo } from "./SmoothScroll";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { href: "#hakkimda", tr: "Hakkımda", en: "About" },
  { href: "#deneyimler", tr: "Deneyimler", en: "Experience" },
  { href: "#projeler", tr: "Projeler", en: "Projects" },
  { href: "#sertifikalar", tr: "Sertifikalar", en: "Certificates" },
];

const spring = { type: "spring" as const, stiffness: 380, damping: 30, mass: 0.7 };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); smoothScrollTo(href); setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          backgroundColor: scrolled ? "var(--glass)" : "transparent",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <nav className="mx-auto flex h-[52px] w-full max-w-6xl items-center justify-between px-6">
          {/* Sol: nav linkleri */}
          <ul className="hidden flex-wrap items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="apple-press inline-block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/8 focus-visible:outline-none"
                  style={{ color: "var(--text-2)" }}
                >
                  {item[language as keyof typeof item]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobil hamburger */}
          <motion.button
            onClick={() => setMenuOpen((p) => !p)}
            whileTap={{ scale: 0.94 }}
            transition={spring}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/8"
            style={{ color: "var(--text-2)" }}
            aria-label="Menüyü aç"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={spring}>
                  <X className="h-5 w-5" strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div key="m" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={spring}>
                  <Menu className="h-5 w-5" strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Sağ: İsim + Tema + Dil */}
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-1)" }}>
              Baki Akyol
            </span>

            {/* Tema toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                whileTap={{ scale: 0.88 }}
                transition={spring}
                aria-label="Tema değiştir"
                className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)", color: "var(--text-2)" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={spring}>
                      <Sun className="h-3.5 w-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={spring}>
                      <Moon className="h-3.5 w-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Dil dropdown */}
            <div className="relative">
              <motion.button
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onClick={() => setDropdownOpen((p) => !p)}
                whileTap={{ scale: 0.95 }}
                transition={spring}
                className="flex h-8 w-[68px] items-center justify-center gap-1.5 rounded-full border text-xs font-medium transition-all duration-150 backdrop-blur-sm"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)", color: "var(--text-2)" }}
              >
                <span>{language === "tr" ? "🇹🇷" : "🇺🇸"}</span>
                <span>{language.toUpperCase()}</span>
              </motion.button>

              <AnimatePresence initial={false}>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={spring}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ transformOrigin: "top right", backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                    className="absolute top-full right-0 mt-2 w-[72px] overflow-hidden rounded-xl border shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl"
                  >
                    {[{ code: "tr", flag: "🇹🇷", label: "TR" }, { code: "en", flag: "🇺🇸", label: "EN" }].map(({ code, flag, label }, i) => (
                      <motion.button
                        key={code}
                        onClick={() => { setLanguage(code as "tr" | "en"); setDropdownOpen(false); }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex w-full items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/8 ${i > 0 ? "border-t" : ""}`}
                        style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
                      >
                        <span>{flag}</span><span>{label}</span>
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
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              className="fixed inset-0 top-[52px] z-40 md:hidden"
              style={{ backdropFilter: "blur(2px)", backgroundColor: "rgba(0,0,0,0.2)" }}
              onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={spring}
              className="fixed left-0 right-0 top-[52px] z-40 overflow-hidden md:hidden border-b"
              style={{ backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", backgroundColor: "var(--glass)", borderColor: "var(--border)" }}
            >
              <ul className="flex flex-col py-2">
                {navItems.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: i * 0.04 }}>
                    <Link href={item.href} onClick={(e) => handleNav(e, item.href)}
                      className="apple-press flex items-center px-6 py-3.5 text-base font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/8"
                      style={{ color: "var(--text-2)" }}>
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