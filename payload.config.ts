import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    // Collections will be added here in future tasks
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/time-and-again',
  }),
  plugins: [
    s3Storage({
      collections: {
        // Will be configured in future tasks
      },
      bucket: process.env.S3_BUCKET || 'time-and-again',
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || 'us-east-1',
      },
    }),
  ],
})
