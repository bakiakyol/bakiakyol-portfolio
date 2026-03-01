import { defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Proje',
  type: 'document',
  fields: [
    {
      name: 'projectName',
      title: 'Proje Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'projectName',
      media: 'image',
    },
  },
});
