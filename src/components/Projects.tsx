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
  dominantColor?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getAreaDominantColor = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve("#f8fafc");
        return;
      }

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";

      img.onload = () => {
        try {
          const sampleSize = 48;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });

          if (!ctx) {
            resolve("#f8fafc");
            return;
          }

          canvas.width = sampleSize;
          canvas.height = sampleSize;
          ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

          const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);
          const colorCounts = new Map<string, number>();
          let topColor = "#f8fafc";
          let topCount = 0;

          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < 128) continue;

            const r = Math.round(data[i] / 16) * 16;
            const g = Math.round(data[i + 1] / 16) * 16;
            const b = Math.round(data[i + 2] / 16) * 16;
            const key = `${r},${g},${b}`;
            const nextCount = (colorCounts.get(key) ?? 0) + 1;

            colorCounts.set(key, nextCount);

            if (nextCount > topCount) {
              topCount = nextCount;
              topColor = `rgb(${r}, ${g}, ${b})`;
            }
          }

          resolve(topColor);
        } catch {
          resolve("#f8fafc");
        }
      };

      img.onerror = () => resolve("#f8fafc");
      img.src = imageUrl;
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery);

        const projectsWithColors = await Promise.all(
          data.map(async (project: ProjectItem) => {
            if (!project.image?.asset?.url) {
              return project;
            }

            const dominantColor = await getAreaDominantColor(
              urlFor(project.image).width(64).height(64).fit("fill").url(),
            );

            return {
              ...project,
              dominantColor,
            };
          }),
        );

        setProjects(projectsWithColors);
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
              <div
                className="mb-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-deep-ocean/10 bg-clinical-white"
                style={{
                  backgroundColor: project.dominantColor ?? "#f8fafc",
                }}
              >
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
