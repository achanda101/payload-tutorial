import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    adminThumbnail: 'small',
    formatOptions: {
      format: 'webp',
    },
    staticURL: '/media',
    imageSizes: [
      {
        name: 'small',
        width: 50,
        height: 50,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'avatar',
        width: 25,
        height: 25,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
        },
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
