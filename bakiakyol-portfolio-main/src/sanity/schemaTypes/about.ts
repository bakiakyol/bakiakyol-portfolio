import { defineType } from "sanity";

export default defineType({
  name: "about",
  title: "Hakkımda",
  type: "document",
  fields: [
    {
      name: "name",
      title: "İsim",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Unvan",
      type: "object", // Eskiden string idi, şimdi obje oldu
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (Rule) => Rule.required() },
        { name: "en", title: "İngilizce", type: "string", validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: "biography",
      title: "Biyografi",
      type: "object", // Eskiden text idi, şimdi obje oldu
      fields: [
        { name: "tr", title: "Türkçe", type: "text", validation: (Rule) => Rule.required() },
        { name: "en", title: "İngilizce", type: "text", validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: "university",
      title: "Üniversite",
      type: "object", // Eskiden string idi, şimdi obje oldu
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (Rule) => Rule.required() },
        { name: "en", title: "İngilizce", type: "string", validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: "graduationYear",
      title: "Mezuniyet Yılı",
      type: "number",
      validation: (Rule) => Rule.required().min(1900).max(2100),
    },
    {
      name: "interests",
      title: "İlgi Alanları",
      type: "object", // Eskiden direkt array idi, şimdi obje içinde iki ayrı array oldu
      fields: [
        { name: "tr", title: "Türkçe", type: "array", of: [{ type: "string" }] },
        { name: "en", title: "İngilizce", type: "array", of: [{ type: "string" }] }
      ],
    },
  ],
});