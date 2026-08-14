"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Mail } from "lucide-react";
import profileImage from "../../public/profile.jpg";

import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };
type LocalizedArray = { tr: string[]; en: string[] };

type AboutData = {
  _id: string;
  name: string;
  title: LocalizedString;
  biography: LocalizedString;
  university: LocalizedString;
  graduationYear: number;
  interests: LocalizedArray;
};

interface HeroProps {
  about: AboutData | null;
}

// Apple critically-damped spring (damping ratio = 1.0, no bounce)
const appleSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Staggered container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// Apple-style fade+lift (küçük mesafe, hızlı)
const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: appleSpring,
  },
};

const heroLabels = {
  university: { tr: "ÜNİVERSİTE", en: "UNIVERSITY" },
  gradYear: { tr: "MEZUNİYET YILI", en: "GRADUATION YEAR" },
  interests: { tr: "İLGİ ALANLARI", en: "INTERESTS" },
  loadingError: { tr: "VERİLER YÜKLENEMEDİ", en: "FAILED TO LOAD DATA" },
  aboutMe: { tr: "HAKKIMDA", en: "ABOUT ME" },
};

// Apple-style typewriter: anında tepki, hafif cursor
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const shouldReduceMotion = useReducedMotion();
  const hasMountedRef = useRef(false);

  useEffect(() => {
    let index = 0;
    let frameId: number | undefined;
    let intervalId: number | undefined;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (!text) {
      frameId = window.requestAnimationFrame(() => setDisplayedText(""));
      return () => { if (frameId) window.cancelAnimationFrame(frameId); };
    }

    if (shouldReduceMotion) {
      frameId = window.requestAnimationFrame(() => setDisplayedText(text));
      return () => { if (frameId) window.cancelAnimationFrame(frameId); };
    }

    frameId = window.requestAnimationFrame(() => setDisplayedText(""));

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        const step = text.length > 24 ? 2 : 1;
        index = Math.min(index + step, text.length);
        setDisplayedText(text.substring(0, index));
        if (index >= text.length && intervalId) window.clearInterval(intervalId);
      }, 55);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) window.cancelAnimationFrame(frameId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, delay, shouldReduceMotion]);

  return (
    <span className="inline-flex min-h-[1.5em] items-center">
      {displayedText}
      {!shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          className="ml-0.5 inline-block h-[1em] w-[2px] rounded-full bg-pharmacy-green/70"
        />
      )}
    </span>
  );
};

function InfoBlock({
  about,
  language,
  className = "",
}: {
  about: AboutData | null;
  language: "tr" | "en";
  className?: string;
}) {
  if (!about) return null;

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-deep-ocean/40">
            {heroLabels.university[language]}
          </p>
          <p className="mt-1.5 text-sm font-medium text-deep-ocean/80 text-center md:text-left">
            {about.university?.[language] || about.university?.tr}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-deep-ocean/40">
            {heroLabels.gradYear[language]}
          </p>
          <p className="mt-1.5 text-sm font-medium text-deep-ocean/80 text-center md:text-left">
            {about.graduationYear}
          </p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-deep-ocean/40">
          {heroLabels.interests[language]}
        </p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 md:justify-start">
          {(about.interests?.[language] || about.interests?.tr || []).map((interest, index) => (
            <span
              key={index}
              className="rounded-full border border-deep-ocean/10 bg-white px-3 py-1 text-xs font-medium text-deep-ocean/70 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Apple-style sosyal medya ikonu
function SocialButton({ href, label, children, external = true }: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      whileHover={{ y: -2, scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
      transition={appleSpring}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-deep-ocean/10 bg-white text-deep-ocean/60 shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-all duration-150 hover:border-pharmacy-green/30 hover:text-pharmacy-green hover:shadow-[0_4px_14px_rgba(0,113,227,0.18)]"
    >
      {children}
    </motion.a>
  );
}

export default function Hero({ about }: HeroProps) {
  const { language } = useLanguage();

  return (
    <motion.section
      id="hakkimda"
      className="relative mt-3 mb-4 flex min-h-[72vh] w-full flex-col items-center justify-start overflow-hidden rounded-[22px] px-6 pt-12 pb-12 sm:pt-16 sm:pb-14 md:px-10 md:pt-20 lg:px-14 lg:pt-24"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Apple-style subtle decorative gradient — çok yumuşak */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[22px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 0%, rgba(0,113,227,0.06) 0%, transparent 70%), " +
            "radial-gradient(ellipse 40% 30% at 10% 100%, rgba(0,113,227,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative flex w-full flex-col items-center justify-between gap-10 md:flex-row md:items-start md:gap-10 lg:gap-20">
        {/* Sol: Metin içeriği */}
        <motion.div
          variants={fadeUp}
          className="order-last z-20 flex w-full flex-col items-center space-y-6 text-center md:order-first md:flex-1 md:items-start md:text-left"
        >
          {about ? (
            <>
              {/* Apple: büyük, güçlü, sıkı tracking */}
              <div className="space-y-3">
                <h1 className="font-bold" style={{ color: "var(--text-1)" }}>
                  {about.name}
                </h1>

                <h2 className="text-xl font-medium sm:text-2xl" style={{ letterSpacing: "-0.02em", color: "var(--text-3)" }}>
                  <Typewriter
                    text={about.title?.[language] || about.title?.tr || ""}
                    delay={100}
                  />
                </h2>
              </div>

              <p className="max-w-lg text-center text-base leading-relaxed md:text-left md:text-[17px]" style={{ color: "var(--text-2)" }}>
                {about.biography?.[language] || about.biography?.tr}
              </p>

              <InfoBlock about={about} language={language} className="md:hidden w-full max-w-xl text-center" />

              {/* Sosyal butonlar */}
              <div className="flex justify-center gap-2.5 md:justify-start">
                <SocialButton href="https://linkedin.com/in/bakiakyol" label="LinkedIn">
                  <Linkedin className="h-4.5 w-4.5" />
                </SocialButton>
                <SocialButton href="https://instagram.com/akyolbaki0" label="Instagram">
                  <Instagram className="h-4.5 w-4.5" />
                </SocialButton>
                <SocialButton href="mailto:info@bakiakyol.com" label="E-posta" external={false}>
                  <Mail className="h-4.5 w-4.5" />
                </SocialButton>
              </div>
            </>
          ) : (
            <h1 className="text-4xl font-bold text-deep-ocean">{heroLabels.loadingError[language]}</h1>
          )}
        </motion.div>

        {/* Sağ: Profil fotoğrafı */}
        <motion.div
          variants={fadeUp}
          className="order-first z-10 flex w-full flex-col items-center gap-6 md:order-last md:w-72 md:items-end lg:w-88"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            transition={appleSpring}
            className="w-full max-w-56 overflow-hidden rounded-[20px] border border-deep-ocean/8 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:max-w-full"
          >
            <div className="aspect-square w-full">
              <Image
                src={profileImage}
                alt={about?.name || "Profil Fotoğrafı"}
                width={400}
                height={400}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </motion.div>
          <InfoBlock about={about} language={language} className="hidden w-full text-left md:flex" />
        </motion.div>
      </div>
    </motion.section>
  );
}