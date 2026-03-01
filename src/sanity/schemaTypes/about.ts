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
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "biography",
      title: "Biyografi",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "university",
      title: "Üniversite",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
});
