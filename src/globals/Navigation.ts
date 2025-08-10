import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation',
  fields: [
    {
      name: 'TopLevelMenuItems',
      label: 'Top Level Menu Items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter the label for the top levelmenu item',
          },
        },
        {
          name: 'MenuItems',
          label: 'Navigation Items',
          type: 'array',
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
              required: true,
            },
            {
              name: 'blogPost',
              type: 'relationship',
              relationTo: 'posts',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'internal',
                description: 'Select a blog post to link to',
              },
            },
            {
              name: 'externalUrl',
              type: 'text',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'external',
                description: 'Enter the external URL (https://example.com)',
              },
              validate: (val, { siblingData }) => {
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
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
          minRows: 1,
          maxRows: 5,
        },
      ],
      minRows: 1,
      maxRows: 4,
    },
  ],
}
