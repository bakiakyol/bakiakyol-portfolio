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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const revealSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 18,
  mass: 0.75,
};

const heroLabels = {
  university: { tr: "ÜNİVERSİTE", en: "UNIVERSITY" },
  gradYear: { tr: "MEZUNİYET YILI", en: "GRADUATION YEAR" },
  interests: { tr: "İLGİ ALANLARI", en: "INTERESTS" },
  loadingError: { tr: "VERİLER YÜKLENEMEDİ", en: "FAILED TO LOAD DATA" },
  aboutMe: { tr: "HAKKIMDA", en: "ABOUT ME" },
};

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
      return () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }

    if (shouldReduceMotion) {
      frameId = window.requestAnimationFrame(() => setDisplayedText(text));
      return () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }

    frameId = window.requestAnimationFrame(() => setDisplayedText(""));

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        const step = text.length > 24 ? 2 : 1;
        index = Math.min(index + step, text.length);
        setDisplayedText(text.substring(0, index));

        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, 65);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, delay, shouldReduceMotion]);

  return (
    <span className="inline-flex min-h-[1.5em] items-center">
      {displayedText}
      {!shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0.35, 1], scaleY: [1, 0.92, 1] }}
          transition={{ repeat: Infinity, duration: 1.15, ease: "easeInOut" }}
          className="ml-1 inline-block h-[1.1em] w-0.75 origin-center bg-pharmacy-green"
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
          <p className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-green/80">
            {heroLabels.university[language]}
          </p>
          <p className="mt-1 text-center text-sm text-deep-ocean/85 md:text-left">
            {about.university?.[language] || about.university?.tr}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-green/80">
            {heroLabels.gradYear[language]}
          </p>
          <p className="mt-1 text-center text-sm text-deep-ocean/85 md:text-left">
            {about.graduationYear}
          </p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pharmacy-green/80 sm:text-[11px] sm:tracking-widest">
          {heroLabels.interests[language]}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
          {(about.interests?.[language] || about.interests?.tr || []).map((interest, index) => (
            <span
              key={index}
              className="max-w-full rounded-full border border-pharmacy-green/20 bg-pharmacy-green/10 px-3 py-1 text-center text-xs text-deep-ocean/80 wrap-break-word whitespace-normal"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({ about }: HeroProps) {
  const { language } = useLanguage();

  return (
    <motion.section
      id="hakkimda"
      className="relative mt-2 mb-4 flex min-h-[70vh] w-full flex-col items-center justify-start overflow-hidden rounded-3xl border border-deep-ocean/10 bg-linear-to-br from-[#050505] via-[#0c0d11] to-pharmacy-green/10 px-6 pt-10 pb-10 shadow-[0_24px_80px_-40px_rgba(168,85,247,0.3)] sm:pt-16 sm:pb-12 md:px-10 md:pt-20 lg:px-14 lg:pt-24"
      variants={containerVariants}
      initial={false}
      animate="show"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.45, ease: "easeOut" },
          scale: { duration: 0.45, ease: "easeOut" },
          y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute -top-16 -right-20 hidden h-56 w-56 rounded-full bg-pharmacy-green/10 sm:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10, x: -6 }}
        animate={{ opacity: 1, scale: 1, y: [0, 8, 0], x: [0, 4, 0] }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          scale: { duration: 0.5, ease: "easeOut" },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute bottom-0 -left-20 hidden h-52 w-52 rounded-full bg-deep-ocean/5 sm:block"
      />

      <div className="relative flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start md:gap-8 lg:gap-16">
        <motion.div
          variants={fadeUp}
          transition={revealSpring}
          className="order-last z-20 flex w-full flex-col items-center space-y-5 text-center md:order-first md:flex-1 md:items-start md:text-left sm:space-y-6"
        >
          {about ? (
            <>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-deep-ocean sm:text-5xl lg:text-6xl xl:text-7xl">
                {about.name}
              </h1>

              <h2 className="text-lg font-medium text-deep-ocean/60 sm:text-xl lg:text-2xl">
                <Typewriter
                  text={about.title?.[language] || about.title?.tr || ""}
                  delay={120}
                />
              </h2>

              <p className="max-w-xl text-center text-base leading-relaxed text-deep-ocean/70 md:text-left sm:text-lg">
                {about.biography?.[language] || about.biography?.tr}
              </p>

              <InfoBlock about={about} language={language} className="md:hidden w-full max-w-xl text-center" />

              <div className="flex justify-center gap-4 md:justify-start">
                <motion.a
                  href="https://linkedin.com/in/bakiakyol"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={revealSpring}
                  className="rounded-full bg-deep-ocean/5 p-3 transition-[background-color,box-shadow] duration-200 hover:bg-pharmacy-green/20 hover:shadow-[0_14px_28px_-18px_rgba(168,85,247,0.35)]"
                >
                  <Linkedin className="h-5.5 w-5.5 text-deep-ocean" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/akyolbaki0"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={revealSpring}
                  className="rounded-full bg-deep-ocean/5 p-3 transition-[background-color,box-shadow] duration-200 hover:bg-pharmacy-green/20 hover:shadow-[0_14px_28px_-18px_rgba(168,85,247,0.35)]"
                >
                  <Instagram className="h-5.5 w-5.5 text-deep-ocean" />
                </motion.a>
                <motion.a
                  href="mailto:info@bakiakyol.com"
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={revealSpring}
                  className="rounded-full bg-deep-ocean/5 p-3 transition-[background-color,box-shadow] duration-200 hover:bg-pharmacy-green/20 hover:shadow-[0_14px_28px_-18px_rgba(168,85,247,0.35)]"
                >
                  <Mail className="h-5.5 w-5.5 text-deep-ocean" />
                </motion.a>
              </div>
            </>
          ) : (
            <h1 className="text-4xl font-bold text-deep-ocean">{heroLabels.loadingError[language]}</h1>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ ...revealSpring, delay: 0.04 }}
          className="order-first z-10 flex w-full flex-col items-center gap-6 md:order-last md:w-75 md:items-end lg:w-95"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={revealSpring}
            className="w-full max-w-56 overflow-hidden rounded-3xl border border-pharmacy-green/30 bg-[#0f1014]/85 shadow-xl backdrop-blur-md md:max-w-full"
          >
            <div className="aspect-square w-full">
              <Image
                src={profileImage}
                alt={about?.name || "Profil Fotoğrafı"}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
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