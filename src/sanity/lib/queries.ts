// GROQ Queries for Sanity CMS

/**
 * About Query - Singleton
 * Hakkımda bilgilerini çeker (tek bir belge)
 */
export const aboutQuery = `*[_type == "about"][0] {
  _id,
  name,
  title,
  biography,
  university,
  graduationYear,
  interests
}`;

/**
 * Experience Query
 * Tüm deneyimleri tarih aralığına göre sıralı şekilde çeker
 */
export const experiencesQuery = `*[_type == "experience"] | order(_createdAt desc) {
  _id,
  organization,
  role,
  dateRange,
  tasks
}`;

/**
 * Projects Query
 * Tüm projeleri ve görsellerini çeker
 */
export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  projectName,
  description,
  image {
    asset->{
      _id,
      url,
      metadata{
        dimensions
      }
    },
    hotspot,
    crop
  }
}`;

/**
 * Certificates Query
 * Tüm sertifikaları çeker
 */
export const certificatesQuery = `*[_type == "certificate"] | order(_createdAt desc) {
  _id,
  certificateName
}`;
