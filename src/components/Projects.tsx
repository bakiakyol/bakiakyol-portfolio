"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };

type ProjectItem = {
  _id: string;
  projectName: LocalizedString;
  description: LocalizedString;
};

const labels = {
  title: { tr: "Projeler", en: "Projects" }, // "ve Katılımlar" silindi
  subtitle: { tr: "Sağlık sektöründe değer yaratan akademik ve sosyal projeler", en: "Academic and social projects creating value in the healthcare sector" },
  loading: { tr: "Yükleniyor...", en: "Loading..." },
  empty: { tr: "Henüz proje eklenmemiştir.", en: "No projects added yet." }
};

export default function Projects() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery);
        setProjects(data); // Renk hesaplama zımbırtılarını çıkardık, direkt veriyi basıyoruz
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projeler" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">{labels.title[language]}</h2>
        <p className="mt-3 text-deep-ocean/55">
          {labels.subtitle[language]}
        </p>
      </div>

      <div className="mt-10 grid gap-7 md:mt-12 md:grid-cols-2">
        {loading ? (
          <p className="text-deep-ocean/60">{labels.loading[language]}</p>
        ) : projects.length === 0 ? (
          <p className="text-deep-ocean/60">{labels.empty[language]}</p>
        ) : (
          projects.map((project, index) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="rounded-2xl border border-deep-ocean/10 bg-white/5 p-6 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.75)] backdrop-blur-sm"
            >
              {/* Görsel gösteren div tamamen kaldırıldı */}
              <h3 className="text-2xl font-semibold text-deep-ocean">
                {project.projectName?.[language] || project.projectName?.tr}
              </h3>
              <p className="mt-3 text-sm leading-6 text-deep-ocean/72">
                {project.description?.[language] || project.description?.tr}
              </p>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}