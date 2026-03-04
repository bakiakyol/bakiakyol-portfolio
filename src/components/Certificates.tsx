"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { certificatesQuery } from "@/sanity/lib/queries";

type CertificateItem = {
  _id: string;
  certificateName: string;
};

export default function Certificates() {
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
        <h2 className="font-bold text-deep-ocean">Sertifikalar</h2>
        <p className="mt-3 text-deep-ocean/55">
          Mesleki yetkinlikleri ve teknik donanımı destekleyen nitelikli
          eğitimler
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-deep-ocean/60">Yükleniyor...</p>
        ) : certificates.length === 0 ? (
          <p className="text-deep-ocean/60">Henüz sertifika eklenmemiştir.</p>
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
                boxShadow: "0 16px 28px -20px rgba(15, 23, 42, 0.35)",
              }}
              className="group rounded-xl border border-deep-ocean/10 bg-white p-5"
            >
              <div className="h-full rounded-lg border border-transparent bg-gradient-to-r from-pharmacy-green/0 via-pharmacy-green/5 to-pharmacy-green/0 p-0.5 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-md bg-white px-3 py-4 text-sm font-medium text-deep-ocean/80">
                  {certificate.certificateName}
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}
