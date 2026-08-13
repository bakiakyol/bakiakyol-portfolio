import { defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Deneyim',
  type: 'document',
  fields: [
    {
      name: 'organization',
      title: 'Kurum',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'İngilizce', type: 'string', validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: 'role',
      title: 'Rol',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'İngilizce', type: 'string', validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: 'dateRange',
      title: 'Tarih Aralığı',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'İngilizce', type: 'string', validation: (Rule) => Rule.required() }
      ],
    },
    {
      name: 'tasks',
      title: 'Görevler',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'İngilizce', type: 'array', of: [{ type: 'string' }] }
      ],
    },
  ],
  // Önizlemede Türkçe verileri çekmesi için .tr eklendi
  preview: {
    select: {
      title: 'role.tr',
      subtitle: 'organization.tr',
    },
  },
});