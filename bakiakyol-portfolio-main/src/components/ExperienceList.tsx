"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };
type LocalizedArray = { tr: string[]; en: string[] };

type ExperienceItem = {
  _id: string;
  organization: LocalizedString;
  role: LocalizedString;
  dateRange: LocalizedString;
  tasks: LocalizedArray;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 26,
      mass: 0.8,
    },
  },
};

const labels = {
  title: { tr: "Deneyimler", en: "Experience" },
  subtitle: {
    tr: "Akademik, sosyal ve saha deneyimi.",
    en: "Academic, social and field experience.",
  },
  empty: { tr: "Henüz deneyim eklenmemiştir.", en: "No experience added yet." },
};

export default function ExperienceList({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  const { language } = useLanguage();

  return (
    <>
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">{labels.title[language]}</h2>
        <p className="mt-3 text-deep-ocean/50">{labels.subtitle[language]}</p>
      </div>

      <motion.div
        className="relative mt-10 space-y-4 border-l border-deep-ocean/10 pl-6 md:mt-12 md:space-y-5 md:pl-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px 120px 0px" }}
      >
        {experiences.length === 0 ? (
          <p className="text-deep-ocean/50">{labels.empty[language]}</p>
        ) : (
          experiences.map((item) => {
            const localizedTasks = item.tasks?.[language] || item.tasks?.tr || [];

            return (
              <motion.article
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -3, x: 2 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.8 }}
                className="group relative rounded-[16px] border border-deep-ocean/8 bg-white p-5 shadow-[0_1px_10px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] will-change-transform"
              >
                {/* Timeline dot — Apple-style, sade */}
                <span className="absolute top-6 -left-[30px] h-2.5 w-2.5 rounded-full border-2 border-white bg-pharmacy-green shadow-[0_0_0_1px_rgba(0,113,227,0.25)] md:-left-[38px]" />

                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] font-semibold text-deep-ocean" style={{ letterSpacing: "-0.018em" }}>
                    {item.organization?.[language] || item.organization?.tr}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-medium text-deep-ocean/55">
                      {item.role?.[language] || item.role?.tr}
                    </p>
                    <span className="text-deep-ocean/25">·</span>
                    <p className="text-sm text-deep-ocean/45">
                      {item.dateRange?.[language] || item.dateRange?.tr}
                    </p>
                  </div>
                </div>

                {localizedTasks.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {localizedTasks.map((task, index) => (
                      <li
                        key={`${item._id}-${index}`}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-deep-ocean/65"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-pharmacy-green/60" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            );
          })
        )}
      </motion.div>
    </>
  );
}
