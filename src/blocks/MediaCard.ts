import { Block } from 'payload'
import { lexicalEditor, HTMLConverterFeature, lexicalHTML } from '@payloadcms/richtext-lexical'

export const MediaCard: Block = {
  slug: 'mediaCard',
  labels: {
    singular: 'Content with Media',
    plural: 'Content with Media Blocks',
  },
  imageURL: '/icons/content-with-media-icon.png',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload an image to accompany the content',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content Title',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                description: 'Title of the content block',
              },
            },
          ],
        },
        {
          label: 'Content Tags',
          fields: [
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  admin: {
                    placeholder: 'Enter a tag for the content',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Content Body',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
              }),
              admin: {
                description: 'Enter the main content for the block',
              },
            },
            lexicalHTML('content', { name: 'content_html' }),
          ],
        },
        {
          label: 'Content Link',
          fields: [
            {
              name: 'linkType',
              type: 'radio',
              options: [
                {
                  label: 'Blog Post',
                  value: 'internal',
                },
                {
                  label: 'External URL',
                  value: 'external',
                },
              ],
              defaultValue: 'internal',
            },
            {
              name: 'blogPost',
              type: 'relationship',
              relationTo: 'posts',
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'internal',
                description: 'Select a blog post to link to',
              },
            },
            {
              name: 'externalUrl',
              type: 'text',
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'external',
                description: 'Enter the external URL (https://example.com)',
              },
              validate: (val: string, { siblingData }: any) => {
                if (siblingData?.linkType === 'external') {
                  if (!val) return 'External URL is required'
                  const isValidUrl = /^https?:\/\/.+/.test(val)
                  if (!isValidUrl) {
                    return 'Please enter a valid URL starting with http:// or https://'
                  }
                }
                return true
              },
            },
            {
              name: 'linkLabel',
              type: 'text',
            },
          ],
        },
        {
          label: 'Content Icon',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload an icon image for the content block',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'contentPosition',
      type: 'radio',
      options: [
        {
          label: 'Left Column',
          value: 'left',
        },
        {
          label: 'Right Column',
          value: 'right',
        },
        {
          label: 'Single Column',
          value: 'center',
        },
      ],
    },
  ],
}
