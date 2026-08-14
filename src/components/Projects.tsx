"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };
type ProjectItem = { _id: string; projectName: LocalizedString; description: LocalizedString; };

const spring = { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.8 };

const labels = {
  title: { tr: "Projeler", en: "Projects" },
  subtitle: { tr: "Sağlık sektöründe değer yaratan akademik ve sosyal projeler", en: "Academic and social projects creating value in the healthcare sector" },
  empty: { tr: "Henüz proje eklenmemiştir.", en: "No projects added yet." },
};

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const { language } = useLanguage();

  return (
    <section id="projeler" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold">{labels.title[language]}</h2>
        <p className="mt-3">{labels.subtitle[language]}</p>
      </div>

      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
        {projects.length === 0 ? (
          <p>{labels.empty[language]}</p>
        ) : (
          projects.map((project, index) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -4, scale: 1.008 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...spring, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-[18px] p-6 will-change-transform transition-shadow duration-300"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-pharmacy-green/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pharmacy-green/70" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--text-3)" }}>Proje</span>
                </div>
                <h3 className="text-xl font-semibold" style={{ letterSpacing: "-0.02em", color: "var(--text-1)" }}>
                  {project.projectName?.[language] || project.projectName?.tr}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
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