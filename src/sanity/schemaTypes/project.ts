import { defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Proje',
  type: 'document',
  fields: [
    {
      name: 'projectName',
      title: 'Proje Adı',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'İngilizce', type: 'string', validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'text', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'İngilizce', type: 'text', validation: (Rule) => Rule.required() }
      ],
    },
    // Görsel (image) alanı tamamen silindi!
  ],
  preview: {
    select: {
      title: 'projectName.tr',
    },
  },
});