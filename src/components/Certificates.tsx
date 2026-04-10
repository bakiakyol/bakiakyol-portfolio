"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };

type CertificateItem = {
  _id: string;
  certificateName: LocalizedString;
};

const labels = {
  title: { tr: "Sertifikalar ve Katılımlar", en: "Certificates and Participations" },
  subtitle: {
    tr: "Mesleki yetkinlikleri ve teknik donanımı destekleyen nitelikli eğitimler",
    en: "Qualified trainings supporting professional competencies and technical equipment",
  },
  empty: { tr: "Henüz sertifika eklenmemiştir.", en: "No certificates added yet." },
};

export default function Certificates({ certificates }: { certificates: CertificateItem[] }) {
  const { language } = useLanguage();

  return (
    <section id="sertifikalar" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">{labels.title[language]}</h2>
        <p className="mt-3 text-deep-ocean/55">{labels.subtitle[language]}</p>
      </div>

      <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {certificates.length === 0 ? (
          <p className="text-deep-ocean/60">{labels.empty[language]}</p>
        ) : (
          certificates.map((certificate, index) => (
            <motion.article
              key={certificate._id}
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
                mass: 0.8,
                delay: index * 0.03,
              }}
              className="group relative overflow-hidden rounded-xl border border-deep-ocean/10 bg-white/5 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-pharmacy-green/20 hover:shadow-[0_20px_40px_-28px_rgba(168,85,247,0.25)] will-change-transform"
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-pharmacy-green/7 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-full rounded-lg border border-deep-ocean/5 bg-white/4 p-4 transition-[border-color,box-shadow] duration-200 group-hover:border-pharmacy-green/25 group-hover:shadow-[0_16px_34px_-24px_rgba(168,85,247,0.28)]">
                <div className="text-sm font-medium text-deep-ocean/80">
                  {certificate.certificateName?.[language] || certificate.certificateName?.tr}
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}