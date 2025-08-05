import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
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
