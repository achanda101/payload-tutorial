import type { GlobalConfig } from 'payload'
import { MediaCard } from '../blocks/MediaCard'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Landing Pages',
  },
  fields: [
    {
      label: 'Hero Section',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter the main title for the homepage hero section',
          },
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          required: false,
          admin: {
            placeholder: 'Enter a subtitle for the homepage hero section',
          },
        },
      ],
    },
    {
      type: 'blocks',
      name: 'storiesOfResilience',
      blocks: [MediaCard],
      labels: {
        singular: 'A Story of Resilience',
        plural: 'Stories of Resilience',
      },
      maxRows: 1,
      admin: {
        initCollapsed: true,
        isSortable: false,
      },
    },
    {
      type: 'blocks',
      name: 'featuredPublication',
      blocks: [MediaCard],
      labels: {
        singular: 'A Featured Publication',
        plural: 'Featured Publications',
      },
      maxRows: 1,
      admin: {
        initCollapsed: true,
        isSortable: false,
      },
    },
    {
      type: 'blocks',
      name: 'listOfPublications',
      blocks: [MediaCard],
      labels: {
        singular: 'A Publication',
        plural: 'Publications',
      },
      maxRows: 3,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
}
