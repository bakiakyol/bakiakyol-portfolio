"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { experiencesQuery } from "@/sanity/lib/queries";

type ExperienceItem = {
  _id: string;
  organization: string;
  role: string;
  dateRange: string;
  tasks: string[];
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

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await client.fetch(experiencesQuery);
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="deneyimler" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">Deneyimler</h2>
        <p className="mt-3 text-deep-ocean/55">
          Akademik, sosyal ve saha deneyimi
        </p>
      </div>

      <motion.div
        className="relative mt-10 space-y-6 border-l border-deep-ocean/10 pl-6 md:mt-12 md:space-y-7 md:pl-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {loading ? (
          <p className="text-deep-ocean/60">Yükleniyor...</p>
        ) : experiences.length === 0 ? (
          <p className="text-deep-ocean/60">Henüz deneyim eklenmemiştir.</p>
        ) : (
          experiences.map((item) => (
            <motion.article
              key={item._id}
              variants={itemVariants}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative rounded-xl border border-deep-ocean/8 bg-clinical-white p-6 shadow-sm"
            >
              <span className="absolute -left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-pharmacy-green md:-left-[39px]" />

              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-deep-ocean">
                  {item.organization}
                </h3>
                <p className="text-sm text-deep-ocean/60">
                  {item.role} <span className="mx-1">|</span> {item.dateRange}
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-deep-ocean/72">
                {Array.isArray(item.tasks) ? item.tasks.join(" ") : item.tasks}
              </p>
            </motion.article>
          ))
        )}
      </motion.div>
    </section>
  );
}
