import { defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Deneyim',
  type: 'document',
  fields: [
    {
      name: 'organization',
      title: 'Kurum',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Rol',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'dateRange',
      title: 'Tarih Aralığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tasks',
      title: 'Görevler',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'organization',
    },
  },
});
