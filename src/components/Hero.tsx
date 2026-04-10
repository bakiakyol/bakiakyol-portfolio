"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const heroLabels = {
  university: { tr: "ÜNİVERSİTE", en: "UNIVERSITY" },
  gradYear: { tr: "MEZUNİYET YILI", en: "GRADUATION YEAR" },
  interests: { tr: "İLGİ ALANLARI", en: "INTERESTS" },
  loadingError: { tr: "VERİLER YÜKLENEMEDİ", en: "FAILED TO LOAD DATA" },
  aboutMe: { tr: "HAKKIMDA", en: "ABOUT ME" }
};

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50); 
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className="inline-flex items-center min-h-[1.5em]">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="ml-1 inline-block h-[1.1em] w-0.75 bg-pharmacy-green"
      />
    </span>
  );
};

export default function Hero() {
  const { language } = useLanguage();
  
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await client.fetch(aboutQuery);
        setAbout(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const InfoBlock = ({ className = "" }: { className?: string }) => {
    if (!about) return null;
    return (
      <div className={`flex flex-col gap-5 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-green/80">
              {heroLabels.university[language]}
            </p>
            <p className="mt-1 text-sm text-deep-ocean/85 text-center md:text-left">
              {about.university?.[language] || about.university?.tr}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-green/80">
              {heroLabels.gradYear[language]}
            </p>
            <p className="mt-1 text-sm text-deep-ocean/85 text-center md:text-left">
              {about.graduationYear}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-widest text-pharmacy-green/80">
            {heroLabels.interests[language]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            {(about.interests?.[language] || about.interests?.tr || []).map((interest, index) => (
              <span
                key={index}
                className="max-w-full px-3 py-1 text-center text-xs rounded-full border border-pharmacy-green/20 bg-pharmacy-green/10 text-deep-ocean/80 wrap-break-word whitespace-normal"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      id="hakkimda"
      /* DEĞİŞİKLİK: pt değerleri azaltıldı (pt-12, pt-20, pt-24). min-h kaldırıldı veya düşürüldü. */
      className="relative flex min-h-[70vh] w-full flex-col items-center justify-start overflow-hidden rounded-3xl border border-deep-ocean/10 bg-linear-to-br from-[#050505] via-[#0c0d11] to-pharmacy-green/10 px-6 pt-10 pb-10 sm:pt-16 sm:pb-12 md:px-10 md:pt-20 lg:px-14 lg:pt-24 mt-2 mb-4 shadow-[0_24px_80px_-40px_rgba(168,85,247,0.3)]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-pharmacy-green/10 hidden sm:block"
      />
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-deep-ocean/5 hidden sm:block"
      />

      <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-8 lg:gap-16">
        
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="z-20 w-full md:flex-1 flex flex-col items-center md:items-start text-center md:text-left order-last md:order-first space-y-5 sm:space-y-6"
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-12 w-48 bg-deep-ocean/10 rounded animate-pulse" />
              <div className="h-6 w-64 bg-deep-ocean/10 rounded animate-pulse" />
            </div>
          ) : about ? (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-deep-ocean tracking-tight">
                {about.name}
              </h1>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-deep-ocean/60">
                <Typewriter 
                  text={about.title?.[language] || about.title?.tr || ""} 
                  delay={400} 
                />
              </h2>
              
              <p className="text-base sm:text-lg leading-relaxed text-deep-ocean/70 max-w-xl text-center md:text-left">
                {about.biography?.[language] || about.biography?.tr}
              </p>

              <InfoBlock className="md:hidden w-full max-w-xl text-center" />

              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://linkedin.com/in/bakiakyol" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 hover:scale-110 transition-all duration-300">
                  <Linkedin className="w-5.5 h-5.5 text-deep-ocean" />
                </a>
                <a href="https://instagram.com/akyolbaki0" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 hover:scale-110 transition-all duration-300">
                  <Instagram className="w-5.5 h-5.5 text-deep-ocean" />
                </a>
                <a href="mailto:info@bakiakyol.com" className="p-3 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 hover:scale-110 transition-all duration-300">
                  <Mail className="w-5.5 h-5.5 text-deep-ocean" />
                </a>
              </div>
            </>
          ) : (
            <h1 className="text-4xl font-bold text-deep-ocean">{heroLabels.loadingError[language]}</h1>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="z-10 w-full md:w-75 lg:w-95 flex flex-col items-center md:items-end gap-6 order-first md:order-last"
        >
          <div className="w-full max-w-56 md:max-w-full overflow-hidden rounded-3xl border border-pharmacy-green/30 bg-[#0f1014]/85 shadow-xl backdrop-blur-md">
            <div className="aspect-square w-full">
              <Image
                src={profileImage}
                alt={about?.name || "Profil Fotoğrafı"}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>
          <InfoBlock className="hidden md:flex w-full text-left" />
        </motion.div>
      </div>
    </motion.section>
  );
}