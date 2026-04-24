import type { CollectionConfig } from 'payload'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Pieces: CollectionConfig = {
  slug: 'pieces',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'price_zar', 'featured'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.status === 'sold' && originalDoc?.status !== 'sold') {
          data.sold_at = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from title. Override only if needed.',
      },
    },
    {
      name: 'piece_type',
      type: 'text',
      required: true,
      label: 'Piece Type',
      admin: {
        description: 'Short subtitle describing the type of piece (e.g. "Dining Chair", "Chest of Drawers")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Colour Refresh', value: 'colour' },
        { label: 'Wood Restoration', value: 'wood' },
        { label: 'Upholstery', value: 'upholstery' },
        { label: 'Custom / Upcycling', value: 'custom' },
      ],
    },
    {
      name: 'year',
      type: 'text',
      required: false,
      admin: {
        description: 'Year the piece was restored (optional)',
      },
    },
    {
      name: 'price_zar',
      type: 'number',
      required: true,
      label: 'Price (ZAR)',
      min: 0,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Available', value: 'available' },
        { label: 'Sold', value: 'sold' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'dimensions',
      type: 'group',
      fields: [
        {
          name: 'width_cm',
          type: 'number',
          label: 'Width (cm)',
          min: 0,
        },
        {
          name: 'height_cm',
          type: 'number',
          label: 'Height (cm)',
          min: 0,
        },
        {
          name: 'depth_cm',
          type: 'number',
          label: 'Depth (cm)',
          min: 0,
        },
      ],
    },
    {
      name: 'materials',
      type: 'text',
      required: false,
      admin: {
        description: 'Materials used in the restoration (optional)',
      },
    },
    {
      name: 'before_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Before Image',
    },
    {
      name: 'after_images',
      type: 'array',
      label: 'After Images',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
    },
    {
      name: 'sold_at',
      type: 'date',
      required: false,
      label: 'Sold At',
      admin: {
        description: 'Auto-set when status changes to Sold. Do not edit manually.',
        readOnly: true,
      },
    },
  ],
}
