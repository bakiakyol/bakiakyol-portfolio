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
    {
      name: 'image',
      title: 'Görsel',
      type: 'image', // Görselin dile göre değişmesine gerek yok, sabit kalıyor
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  // Önizlemede Türkçe proje adını çekmesi için .tr eklendi
  preview: {
    select: {
      title: 'projectName.tr',
      media: 'image',
    },
  },
});