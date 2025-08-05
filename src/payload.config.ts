// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd/MM/yyyy',
  },
  cors: ['http://localhost:3000', process.env.DOMAIN_URL || ''],
  // CSRF: Whitelist of domains from which the backend can accept cookies
  csrf: ['http://localhost:3000', process.env.DOMAIN_URL || ''],
  upload: {
    limits: {
      fileSize: 20 * 1024 * 1024, // 20 MB
    },
    abortOnLimit: true,
    responseOnLimit: 'File size exceeds the limit of 20 MB.',
  },
  globals: [
    {
      slug: 'nav',
      label: 'Navigation',
      fields: [
        {
          name: 'MenuItems',
          label: 'Navigation Items',
          type: 'array',
          fields: [
            {
              name: 'link',
              type: 'text',
              admin: {
                description: 'URL for the navigation item. Use absolute URLs or relative paths.',
              },
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  collections: [Users, Media, BlogPosts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
