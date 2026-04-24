import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import { Media } from './src/payload/collections/Media'
import { Pieces } from './src/payload/collections/Pieces'
import { Users } from './src/payload/collections/Users'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_STORAGE_URL = process.env.SUPABASE_STORAGE_URL || ''
const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'pieces'

// NOTE: First admin user
// On initial deployment, visit /admin and use Payload's built-in "create first user"
// flow. Set the role field to 'admin' — this user then has full write access.
// Subsequent users created via the API will default to role: 'user' and cannot
// write to any collection unless promoted to 'admin' by an existing admin.
export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    Users,
    Media,
    Pieces,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/time-and-again',
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename }) =>
            `${SUPABASE_STORAGE_URL}/object/public/${SUPABASE_STORAGE_BUCKET}/${filename}`,
        },
      },
      bucket: SUPABASE_STORAGE_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY || '',
        },
        region: 'us-east-1',
        endpoint: process.env.SUPABASE_STORAGE_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})
