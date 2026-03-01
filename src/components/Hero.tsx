"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import profileImage from "../../public/profile.jpeg";

type AboutData = {
  _id: string;
  name: string;
  title: string;
  biography: string;
  university: string;
  graduationYear: number;
  interests: string[];
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

export default function Hero() {
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

  return (
    <motion.section
      id="hakkimda"
      className="relative overflow-hidden rounded-3xl border border-deep-ocean/10 bg-gradient-to-br from-clinical-white via-white to-deep-ocean/5 px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Decorative circles - hidden on very small screens to prevent overflow */}
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

      <div className="relative flex flex-col md:grid md:grid-cols-12 items-center gap-10 md:gap-12">
        {/* Text Content */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="z-20 w-full md:col-span-7 md:pr-8 flex flex-col items-center md:items-start text-center md:text-left order-last md:order-none"
        >
          {loading ? (
            <div className="space-y-4">
              <div className="h-12 w-48 bg-deep-ocean/10 rounded animate-pulse" />
              <div className="h-6 w-64 bg-deep-ocean/10 rounded animate-pulse" />
            </div>
          ) : about ? (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-deep-ocean">
                {about.name}
              </h1>
              <h2 className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-deep-ocean/60">
                {about.title}
              </h2>
              <p className="mt-6 sm:mt-7 md:mt-8 text-sm sm:text-base leading-7 text-deep-ocean/70 max-w-2xl">
                {about.biography}
              </p>
              <div className="mt-8 flex gap-4 justify-center md:justify-start">
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
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-deep-ocean">
                Hakkımda
              </h1>
              <h2 className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-deep-ocean/60">
                Veriler yüklenemedi
              </h2>
            </>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="z-10 w-full md:col-span-5 md:-ml-10 flex justify-center md:justify-end order-first md:order-none"
        >
          <div className="w-full max-w-48 sm:max-w-xs md:max-w-xs lg:max-w-sm overflow-hidden rounded-[2rem] border border-pharmacy-green/45 bg-white/90 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <div className="aspect-square w-full">
              <Image
                src={profileImage}
                alt={about?.name || "Profil Fotoğrafı"}
                width={400}
                height={400}
                className="h-full w-full object-cover"
                priority
                placeholder="blur"
                sizes="(max-width: 640px) 100%, (max-width: 768px) 100%, (max-width: 1024px) 320px, 400px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
