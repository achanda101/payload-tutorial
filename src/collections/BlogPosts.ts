import type { CollectionConfig } from 'payload'
import { lexicalEditor, lexicalHTML, HTMLConverterFeature } from '@payloadcms/richtext-lexical'
import { ContentWithMedia } from '@/blocks/ContentWithMedia'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const BlogPosts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'author'],
    group: 'Content',
  },
  defaultSort: ['updatedAt', 'title'],
  defaultPopulate: {
    author: true,
    featuredImage: true,
    slug: true,
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
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description:
          'Must be unique and can be used in the URL. If left blank, it will be auto-generated from the title.',
      },
      hooks: {
        beforeValidate: [
          ({ value, operation, data }) => {
            if (operation === 'create' || !value) {
              return formatSlug(data?.title || value || '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        placeholder: 'A brief summary of the post',
      },
    },
    {
      type: 'blocks',
      name: 'storiesOfResilience',
      blocks: [ContentWithMedia],
      labels: {
        singular: 'A Story of Resilience',
        plural: 'Stories of Resilience',
      },
      maxRows: 1,
    },
    {
      type: 'blocks',
      name: 'featuredPublication',
      blocks: [ContentWithMedia],
      labels: {
        singular: 'A Featured Publication',
        plural: 'Featured Publications',
      },
      maxRows: 1,
    },
    {
      type: 'blocks',
      name: 'listOfPublications',
      blocks: [ContentWithMedia],
      labels: {
        singular: 'A Publication',
        plural: 'Publications',
      },
      maxRows: 3,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter(
            (feature) => !['inlineCode', 'subscript', 'indent', 'checklist'].includes(feature.key),
          ),
          HTMLConverterFeature(),
        ],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
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
              hasMany: true,
              required: true,
              admin: {
                width: '50%',
                placeholder: 'Select the type of post',
              },
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              admin: {
                allowEdit: false,
                width: '50%',
                placeholder: 'Select the author of the post',
              },
              filterOptions: ({ relationTo }) => {
                if (relationTo === 'users') {
                  return {
                    role: { not_equals: 'admin' },
                  }
                }
              },
            },
          ],
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
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
  trash: true,
  versions: {
    drafts: true,
  },
}
