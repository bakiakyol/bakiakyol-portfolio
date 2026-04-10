"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };

type ProjectItem = {
  _id: string;
  projectName: LocalizedString;
  description: LocalizedString;
};

const labels = {
  title: { tr: "Projeler", en: "Projects" },
  subtitle: {
    tr: "Sağlık sektöründe değer yaratan akademik ve sosyal projeler",
    en: "Academic and social projects creating value in the healthcare sector",
  },
  empty: { tr: "Henüz proje eklenmemiştir.", en: "No projects added yet." },
};

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const { language } = useLanguage();

  return (
    <section id="projeler" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">{labels.title[language]}</h2>
        <p className="mt-3 text-deep-ocean/55">{labels.subtitle[language]}</p>
      </div>

      <div className="mt-10 grid gap-7 md:mt-12 md:grid-cols-2">
        {projects.length === 0 ? (
          <p className="text-deep-ocean/60">{labels.empty[language]}</p>
        ) : (
          projects.map((project, index) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 18,
                mass: 0.8,
                delay: index * 0.04,
              }}
              className="group relative overflow-hidden rounded-2xl border border-deep-ocean/10 bg-white/5 p-6 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.75)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-pharmacy-green/20 hover:shadow-[0_24px_54px_-34px_rgba(168,85,247,0.28)] will-change-transform"
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-pharmacy-green/8 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-deep-ocean">
                  {project.projectName?.[language] || project.projectName?.tr}
                </h3>
                <p className="mt-3 text-sm leading-6 text-deep-ocean/72">
                  {project.description?.[language] || project.description?.tr}
                </p>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}