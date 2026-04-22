export interface ContentItem {
  _id: string
  type: 'event' | 'deity_image' | 'announcement'
  title: string
  body?: string
  imageUrl?: string
  date?: string
  isActive: boolean
  publishedBy?: string
  createdAt: string
  updatedAt: string
}

export type ContentType = ContentItem['type']
