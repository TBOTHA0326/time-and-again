export interface MediaFile {
  id: string
  url?: string
  filename?: string
  alt?: string
  width?: number
  height?: number
}

export interface ShopPiece {
  id: string
  title: string
  slug: string
  piece_type: string
  category: 'colour' | 'wood' | 'upholstery' | 'custom'
  year?: string
  price_zar: number
  status: 'draft' | 'available' | 'sold'
  description?: unknown
  dimensions?: {
    width_cm?: number
    height_cm?: number
    depth_cm?: number
  }
  materials?: string
  before_image: MediaFile | string
  after_images: Array<{ image: MediaFile | string }>
  featured: boolean
  sold_at?: string
  createdAt: string
  updatedAt: string
}

export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
