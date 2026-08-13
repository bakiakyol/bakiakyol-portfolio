import { defineType } from 'sanity';

export default defineType({
  name: 'certificate',
  title: 'Sertifika',
  type: 'document',
  fields: [
    {
      name: 'certificateName',
      title: 'Sertifika Adı',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'en', title: 'İngilizce', type: 'string', validation: (Rule) => Rule.required() }
      ],
    },
  ],
  preview: {
    select: {
      title: 'certificateName.tr',
    },
  },
});