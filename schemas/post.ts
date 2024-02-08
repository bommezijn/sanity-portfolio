import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      // type: 'array',
      // of: [
      //   {
      //     type: 'block',
      //     styles: [
      //       {title: 'Normal', value: 'normal'},
      //       {title: 'H1', value: 'h1'},
      //       {title: 'H2', value: 'h2'},
      //       {title: 'H3', value: 'h3'},
      //       {title: 'H4', value: 'h4'},
      //       {title: 'H5', value: 'h5'},
      //       {title: 'H6', value: 'h6'},
      //       {title: 'Quote', value: 'blockquote'}
      //     ]
      //   }
      // ]
    }),
    defineField({
      type: 'code',
      name: 'codeField',
      title: 'Code block',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'Javascript', value: 'javascript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
        ],
        withFilename: true,
      }
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
