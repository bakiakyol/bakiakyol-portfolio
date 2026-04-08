import { client } from "@/sanity/lib/client";
import { experiencesQuery } from "@/sanity/lib/queries";
import ExperienceList from "./ExperienceList";

export default async function Experience() {
  const experiences = await client.fetch(experiencesQuery, {}, { next: { revalidate: 60 } });

  return (
    <section id="deneyimler" className="w-full py-24">
      <div className="max-w-4xl">
        <h2 className="font-bold text-deep-ocean">Deneyimler</h2>
        <p className="mt-3 text-deep-ocean/55">
          Akademik, sosyal ve saha deneyimi
        </p>
      </div>

      <ExperienceList experiences={experiences ?? []} />
    </section>
  );
}
