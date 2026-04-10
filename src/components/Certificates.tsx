"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { certificatesQuery } from "@/sanity/lib/queries";
import { useLanguage } from "@/context/LanguageContext";

type LocalizedString = { tr: string; en: string };

type CertificateItem = {
  _id: string;
  certificateName: LocalizedString;
};

const labels = {
  title: { tr: "Sertifikalar", en: "Certificates" },
  subtitle: { 
    tr: "Mesleki yetkinlikleri ve teknik donanımı destekleyen nitelikli eğitimler", 
    en: "Qualified trainings supporting professional competencies and technical equipment" 
  },
  loading: { tr: "Yükleniyor...", en: "Loading..." },
  empty: { tr: "Henüz sertifika eklenmemiştir.", en: "No certificates added yet." }
};

export default function Certificates() {
  const { language } = useLanguage();
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await client.fetch(certificatesQuery);
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="sertifikalar" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">{labels.title[language]}</h2>
        <p className="mt-3 text-deep-ocean/55">
          {labels.subtitle[language]}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-deep-ocean/60">{labels.loading[language]}</p>
        ) : certificates.length === 0 ? (
          <p className="text-deep-ocean/60">{labels.empty[language]}</p>
        ) : (
          certificates.map((certificate, index) => (
            <motion.article
              key={certificate._id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.04,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: "0 18px 36px -24px rgba(168, 85, 247, 0.35)",
              }}
              className="group rounded-xl border border-deep-ocean/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="h-full rounded-lg border border-deep-ocean/5 bg-white/4 p-4 transition-all duration-300 group-hover:border-pharmacy-green/25 group-hover:shadow-[0_16px_34px_-24px_rgba(168,85,247,0.35)]">
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