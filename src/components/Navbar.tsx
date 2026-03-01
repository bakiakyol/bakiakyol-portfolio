"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { smoothScrollTo } from "./SmoothScroll";

const navItems = [
  { label: "Hakkımda", href: "#hakkimda" },
  { label: "Deneyimler", href: "#deneyimler" },
  { label: "Projeler", href: "#projeler" },
  { label: "Sertifikalar", href: "#sertifikalar" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    smoothScrollTo(href);
    closeMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-deep-ocean/10 bg-clinical-white/95 backdrop-blur-md">
        <nav
          aria-label="Ana navigasyon"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6"
        >
          {/* DeskonClick={(e) => handleLinkClick(e, item.href)}
                  top Navigation */}
          <ul className="hidden flex-wrap items-center gap-5 text-sm text-deep-ocean/70 md:flex md:gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="-mx-2 rounded-md px-2 py-2 transition-colors hover:text-deep-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pharmacy-green focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-deep-ocean/70 hover:text-deep-ocean transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pharmacy-green focus-visible:ring-offset-2"
            aria-label="Menüyü aç"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={2.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={2.5} />
            )}
          </button>

          <span className="text-sm font-semibold tracking-[0.1em] text-pharmacy-green">
            Baki Akyol
          </span>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/30 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed left-0 right-0 top-16 z-40 bg-clinical-white border-b border-deep-ocean/10 transform transition-all duration-300 ease-out md:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col space-y-0">
          {navItems.map((item) => (
            <li
              key={item.href}
              className="border-b border-deep-ocean/5 last:border-b-0"
            >
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="block px-6 py-4 text-center text-lg font-medium text-deep-ocean/70 transition-colors active:bg-deep-ocean/5 hover:text-deep-ocean hover:bg-deep-ocean/5"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
