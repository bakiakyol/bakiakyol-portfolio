"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };
type CertificateItem = { _id: string; certificateName: LocalizedString; };

const spring = { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 };

const labels = {
  title: { tr: "Sertifikalar ve Katılımlar", en: "Certificates and Participations" },
  subtitle: { tr: "Mesleki yetkinlikleri ve teknik donanımı destekleyen nitelikli eğitimler", en: "Qualified trainings supporting professional competencies and technical equipment" },
  empty: { tr: "Henüz sertifika eklenmemiştir.", en: "No certificates added yet." },
};

export default function Certificates({ certificates }: { certificates: CertificateItem[] }) {
  const { language } = useLanguage();

  return (
    <section id="sertifikalar" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold">{labels.title[language]}</h2>
        <p className="mt-3">{labels.subtitle[language]}</p>
      </div>

      <div className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {certificates.length === 0 ? (
          <p>{labels.empty[language]}</p>
        ) : (
          certificates.map((cert, index) => (
            <motion.article
              key={cert._id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...spring, delay: index * 0.03 }}
              className="group relative overflow-hidden rounded-[14px] p-5 will-change-transform transition-shadow duration-300"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-br from-pharmacy-green/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-start gap-3">
                <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pharmacy-green/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-pharmacy-green" />
                </span>
                <p className="text-sm font-medium leading-snug" style={{ color: "var(--text-2)" }}>
                  {cert.certificateName?.[language] || cert.certificateName?.tr}
                </p>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}