import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fa } from 'payload/i18n/fa'

export const BlogPosts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'author'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter the title of the blog post',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      type: 'collapsible',
      label: 'Post Details',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'selectPostType',
              type: 'select',
              options: [
                {
                  label: 'Article',
                  value: 'article',
                },
                {
                  label: 'Report',
                  value: 'report',
                },
                {
                  label: 'Audio Podcast',
                  value: 'audioPodcast',
                },
              ],
              defaultValue: 'article',
              hasMany: true,
              required: true,
              admin: {
                width: '50%',
                placeholder: 'Select the type of post',
              },
            },
            {
              name: 'date',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                  timeIntervals: 15,
                },
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            allowEdit: false,
          },
          filterOptions: ({ id, data, siblingData, relationTo }) => {
            if (relationTo === 'users') {
              return {
                role: { not_equals: 'admin' },
              }
            }
            return {}
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'upload',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'Seo',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              admin: {
                placeholder: 'SEO Title',
              },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              admin: {
                placeholder: 'SEO Description',
              },
            },
          ],
        },
        {
          name: 'media',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
}
