import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Admin',
  },
  auth: true,
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        await req.payload.update({
          collection: 'posts',
          where: {
            author: {
              equals: id,
            },
          },
          data: {
            author: null,
          },
        })
      },
    ],
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter your full name',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a profile picture',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        { label: 'Writer', value: 'writer' },
      ],
      admin: {
        placeholder: 'Select a role',
      },
      required: true,
    },
    {
      name: 'posts',
      type: 'join',
      collection: 'posts',
      on: 'author',
    },
  ],
}
