"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };
type ExperienceItem = {
  _id: string;
  organization: LocalizedString;
  role: LocalizedString;
  dateRange: LocalizedString;
  tasks: { tr: string[]; en: string[] };
};

const spring = { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.8 };

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
};

const labels = {
  title: { tr: "Deneyimler", en: "Experience" },
  subtitle: { tr: "Akademik, sosyal ve saha deneyimi.", en: "Academic, social and field experience." },
  empty: { tr: "Henüz deneyim eklenmemiştir.", en: "No experience added yet." },
};

export default function ExperienceList({ experiences }: { experiences: ExperienceItem[] }) {
  const { language } = useLanguage();

  return (
    <>
      <div className="max-w-4xl">
        <h2 className="font-bold">{labels.title[language]}</h2>
        <p className="mt-3">{labels.subtitle[language]}</p>
      </div>

      <motion.div
        className="relative mt-10 space-y-4 pl-6 md:mt-12 md:space-y-5 md:pl-8 border-l"
        style={{ borderColor: "var(--border)" }}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px 120px 0px" }}
      >
        {experiences.length === 0 ? (
          <p>{labels.empty[language]}</p>
        ) : (
          experiences.map((exp) => {
            const tasks = exp.tasks?.[language] || exp.tasks?.tr || [];
            return (
              <motion.article
                key={exp._id}
                variants={item}
                whileHover={{ y: -3, x: 2 }}
                whileTap={{ scale: 0.995 }}
                transition={spring}
                className="group relative rounded-[16px] p-5 will-change-transform transition-shadow duration-300"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
              >
                {/* Timeline dot */}
                <span
                  className="absolute top-6 -left-[30px] h-2.5 w-2.5 rounded-full border-2 bg-pharmacy-green md:-left-[38px]"
                  style={{ borderColor: "var(--bg-page)" }}
                />

                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] font-semibold" style={{ letterSpacing: "-0.018em", color: "var(--text-1)" }}>
                    {exp.organization?.[language] || exp.organization?.tr}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-medium" style={{ color: "var(--text-3)" }}>
                      {exp.role?.[language] || exp.role?.tr}
                    </p>
                    <span style={{ color: "var(--text-3)" }}>·</span>
                    <p className="text-sm" style={{ color: "var(--text-3)" }}>
                      {exp.dateRange?.[language] || exp.dateRange?.tr}
                    </p>
                  </div>
                </div>

                {tasks.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {tasks.map((task, i) => (
                      <li key={`${exp._id}-${i}`} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-pharmacy-green/70" />
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
