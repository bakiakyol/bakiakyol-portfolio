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
    transition: { staggerChildren: 0.16 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const labels = {
  title: { tr: "Deneyimler", en: "Experience" },
  subtitle: { tr: "Akademik, sosyal ve saha deneyimi", en: "Academic, social, and field experience" },
  empty: { tr: "Henüz deneyim eklenmemiştir.", en: "No experiences added yet." }
};

export default function ExperienceList({ experiences }: { experiences: ExperienceItem[] }) {
  const { language } = useLanguage();

  return (
    <>
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">{labels.title[language]}</h2>
        <p className="mt-3 text-deep-ocean/55">{labels.subtitle[language]}</p>
      </div>

      <motion.div
        className="relative mt-10 space-y-6 border-l border-deep-ocean/10 pl-6 md:mt-12 md:space-y-7 md:pl-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {experiences.length === 0 ? (
          <p className="text-deep-ocean/60">{labels.empty[language]}</p>
        ) : (
          experiences.map((item) => {
            // Task array'i için seçili dili alıyoruz
            const tasksArray = item.tasks?.[language] || item.tasks?.tr || [];
            
            return (
              <motion.article
                key={item._id}
                variants={itemVariants}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative rounded-xl border border-deep-ocean/8 bg-clinical-white p-6 shadow-sm"
              >
                <span className="absolute -left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-pharmacy-green md:-left-[39px]" />

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-deep-ocean">
                    {item.organization?.[language] || item.organization?.tr}
                  </h3>
                  <p className="text-sm text-deep-ocean/60">
                    {item.role?.[language] || item.role?.tr} <span className="mx-1">|</span> {item.dateRange?.[language] || item.dateRange?.tr}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-6 text-deep-ocean/72">
                  {Array.isArray(tasksArray) ? tasksArray.join(" ") : tasksArray}
                </p>
              </motion.article>
            );
          })
        )}
      </motion.div>
    </>
  );
}