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
import { Navigation } from './globals/Navigation'
import { Header } from './globals/Header'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd/MM/yyyy',
    livePreview: {
      url: process.env.DOMAIN_URL || 'http://localhost:3000',
      collections: ['posts'],
      globals: ['homepage'],
    },
  },
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_DOMAIN_URL || ''],
  // CSRF: Whitelist of domains from which the backend can accept cookies
  csrf: ['http://localhost:3000', process.env.NEXT_PUBLIC_DOMAIN_URL || ''],
  upload: {
    limits: {
      fileSize: 20 * 1024 * 1024, // 20 MB
    },
    abortOnLimit: true,
    responseOnLimit: 'File size exceeds the limit of 20 MB.',
  },
  globals: [Navigation, Header, Homepage],
  collections: [Users, Media, BlogPosts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
