import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the logo for the header',
      },
    },
    {
      name: 'searchEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or disable the search functionality in the header',
      },
    },
    {
      name: 'languages',
      type: 'select',
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Thai',
          value: 'th',
        },
        {
          label: 'Hindi',
          value: 'hn',
        },
      ],
      hasMany: true,
      required: true,
      defaultValue: ['en'],
      admin: {
        placeholder: 'Select languages for the website',
      },
    },
  ],
}
