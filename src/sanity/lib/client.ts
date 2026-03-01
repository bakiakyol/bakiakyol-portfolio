import { createClient } from "next-sanity";

import { dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-02",
  useCdn: process.env.NODE_ENV === "production", // Production'da CDN, development'ta güncel veri
});
