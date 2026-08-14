import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { client } from "@/sanity/lib/client";
import { aboutQuery, certificatesQuery, projectsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const [about, projects, certificates] = await Promise.all([
    client.fetch(aboutQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(projectsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(certificatesQuery, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-24 px-6 py-12 md:space-y-28 md:py-16">
        <Hero about={about ?? null} />
        <Experience />
        <Projects projects={projects ?? []} />
        <Certificates certificates={certificates ?? []} />
      </main>
      <Footer />
    </div>
  );
}
