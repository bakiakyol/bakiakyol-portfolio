import { client } from "@/sanity/lib/client";
import { experiencesQuery } from "@/sanity/lib/queries";
import ExperienceList from "./ExperienceList";

export default async function Experience() {
  const experiences = await client.fetch(experiencesQuery, {}, { next: { revalidate: 60 } });

  return (
    <section id="deneyimler" className="w-full py-24">
      <ExperienceList experiences={experiences ?? []} />
    </section>
  );
}