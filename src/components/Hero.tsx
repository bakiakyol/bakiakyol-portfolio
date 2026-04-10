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
            <p className="mt-1 text-sm text-deep-ocean/85">
              {about.university?.[language] || about.university?.tr}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-green/80">
              {heroLabels.gradYear[language]}
            </p>
            <p className="mt-1 text-sm text-deep-ocean/85">
              {about.graduationYear}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-pharmacy-green/80">
            {heroLabels.interests[language]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(about.interests?.[language] || about.interests?.tr || []).map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-pharmacy-green/10 text-deep-ocean/80 border border-pharmacy-green/20 whitespace-nowrap"
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
      className="relative flex min-h-[82vh] max-h-212.5 w-full flex-col justify-center overflow-hidden rounded-3xl border border-deep-ocean/10 bg-linear-to-br from-[#050505] via-[#0c0d11] to-pharmacy-green/10 px-6 py-8 shadow-[0_24px_80px_-40px_rgba(168,85,247,0.3)] sm:px-8 md:px-10 lg:px-14 mt-2 mb-4"
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

      {/* md:items-start eklenerek metin ve fotoğrafın üstten hizalanması sağlandı */}
      <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-8 lg:gap-16">
        
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="z-20 w-full md:flex-1 flex flex-col items-center md:items-start text-center md:text-left order-last md:order-first"
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-12 w-48 bg-deep-ocean/10 rounded animate-pulse" />
              <div className="h-6 w-64 bg-deep-ocean/10 rounded animate-pulse" />
            </div>
          ) : about ? (
            <>
              {/* h1 başlığı için üst boşluk temizlendi, fotoğraf ile hizalandı */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-deep-ocean tracking-tight">
                {about.name}
              </h1>
              
              <h2 className="mt-3 md:mt-4 text-lg sm:text-xl lg:text-2xl font-medium text-deep-ocean/60">
                <Typewriter 
                  text={about.title?.[language] || about.title?.tr || ""} 
                  delay={400} 
                />
              </h2>
              
              <p className="mt-5 md:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-deep-ocean/70 max-w-xl">
                {about.biography?.[language] || about.biography?.tr}
              </p>

              <InfoBlock className="mt-8 text-left md:hidden w-full max-w-xl" />

              <div className="mt-8 lg:mt-10 flex gap-4 justify-center md:justify-start">
                <a
                  href="https://linkedin.com/in/bakiakyol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5.5 h-5.5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
                </a>
                <a
                  href="https://instagram.com/akyolbaki0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5.5 h-5.5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
                </a>
                <a
                  href="mailto:info@bakiakyol.com"
                  className="p-3.5 rounded-full bg-deep-ocean/5 hover:bg-pharmacy-green/20 hover:scale-110 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5.5 h-5.5 text-deep-ocean hover:text-pharmacy-green transition-colors" />
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-deep-ocean">
                {heroLabels.aboutMe[language]}
              </h1>
              <h2 className="mt-4 text-xl lg:text-2xl font-medium text-deep-ocean/60">
                {heroLabels.loadingError[language]}
              </h2>
            </>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          /* justify-center yerine üstten hizalama için düzenleme yapıldı */
          className="z-10 w-full md:w-[320px] lg:w-95 flex flex-col items-center md:items-end gap-6 lg:gap-8 order-first md:order-last"
        >
          <div className="w-full max-w-60 md:max-w-full overflow-hidden rounded-4xl border border-pharmacy-green/30 bg-[#0f1014]/85 shadow-[0_24px_60px_-32px_rgba(168,85,247,0.35)] backdrop-blur-md">
            <div className="aspect-square w-full">
              <Image
                src={profileImage}
                alt={about?.name || "Profil Fotoğrafı"}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 240px, 380px"
              />
            </div>
          </div>
          
          <InfoBlock className="hidden md:flex w-full text-left" />
        </motion.div>

      </div>
    </motion.section>
  );
}