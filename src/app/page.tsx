import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-clinical-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-24 px-6 py-12 md:space-y-28 md:py-16">
        <Hero />
        <Experience />
        <Projects />
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}
