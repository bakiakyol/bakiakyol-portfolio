import { defineType } from 'sanity';

export default defineType({
  name: 'certificate',
  title: 'Sertifika',
  type: 'document',
  fields: [
    {
      name: 'certificateName',
      title: 'Sertifika Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'certificateName',
    },
  },
});
