"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type ProjectItem = {
  _id: string;
  projectName: string;
  description: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    hotspot?: any;
    crop?: any;
  };
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery);
        setProjects(data);
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
        <h2 className="font-bold text-deep-ocean">Projeler ve Katılımlar</h2>
        <p className="mt-3 text-deep-ocean/55">
          Sağlık sektöründe değer yaratan akademik ve sosyal projeler 
        </p>
      </div>

      <div className="mt-10 grid gap-7 md:mt-12 md:grid-cols-2">
        {loading ? (
          <p className="text-deep-ocean/60">Yükleniyor...</p>
        ) : projects.length === 0 ? (
          <p className="text-deep-ocean/60">Henüz proje eklenmemiştir.</p>
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
              className="rounded-2xl border border-deep-ocean/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-deep-ocean/10 bg-clinical-white overflow-hidden">
                {project.image?.asset?.url ? (
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.projectName}
                    width={400}
                    height={250}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-xs tracking-[0.08em] text-deep-ocean/40 uppercase">
                    Proje Görseli
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-deep-ocean">
                {project.projectName}
              </h3>
              <p className="mt-3 text-sm leading-6 text-deep-ocean/72">
                {project.description}
              </p>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}
