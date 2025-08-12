import { Block } from 'payload'

export const ContentWithMedia: Block = {
  slug: 'content-w-media',
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
          name: 'contentTitle',
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
          name: 'contentTags',
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
          name: 'contentBody',
          fields: [
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Enter the main content for the block',
              },
            },
          ],
        },
        {
          name: 'contentLink',
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
          name: 'contentIcon',
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
