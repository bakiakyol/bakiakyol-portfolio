/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your admin path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import { notFound } from "next/navigation";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  const studioDisabledInProduction =
    process.env.NEXT_PUBLIC_ENABLE_STUDIO === "false";

  if (process.env.NODE_ENV === "production" && studioDisabledInProduction) {
    notFound();
  }

  return <NextStudio config={config} />;
}
