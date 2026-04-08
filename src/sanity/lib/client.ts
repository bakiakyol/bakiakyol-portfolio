import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Server-side fetch kullandığı için CDN'e gerek yok; revalidate ile cache yönetilir
});
