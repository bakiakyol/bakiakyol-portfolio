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
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ExperienceList({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  const { language } = useLanguage();

  return (
    <motion.div
      className="relative mt-10 space-y-6 border-l border-deep-ocean/10 pl-6 md:mt-12 md:space-y-7 md:pl-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {experiences.length === 0 ? (
        <p className="text-deep-ocean/60">Henüz deneyim eklenmemiştir.</p>
      ) : (
        experiences.map((item) => {
          const localizedTasks = item.tasks?.[language] || item.tasks?.tr || [];

          return (
            <motion.article
              key={item._id}
              variants={itemVariants}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative rounded-xl border border-deep-ocean/8 bg-clinical-white p-6 shadow-sm"
            >
              <span className="absolute top-7 -left-7.5 h-2.5 w-2.5 rounded-full border border-clinical-white bg-pharmacy-green shadow-[0_0_12px_rgba(168,85,247,0.35)] md:-left-9.5" />

              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-deep-ocean">
                  {item.organization?.[language] || item.organization?.tr}
                </h3>
                <p className="text-sm text-deep-ocean/60">
                  {item.role?.[language] || item.role?.tr}
                  <span className="mx-1">|</span>
                  {item.dateRange?.[language] || item.dateRange?.tr}
                </p>
              </div>

              {localizedTasks.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {localizedTasks.map((task, index) => (
                    <li
                      key={`${item._id}-${index}`}
                      className="flex items-start gap-2.5 text-sm leading-6 text-deep-ocean/72"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pharmacy-green/85 shadow-[0_0_10px_rgba(168,85,247,0.45)]" />
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
  );
}
