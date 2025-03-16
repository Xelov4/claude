import { Decimal } from "@prisma/client/runtime/library"

export interface Tool {
  id: number
  name: string
  slug: string
  shortDescription: string
  longDescription?: string
  logoUrl?: string
  imageUrl?: string
  websiteUrl?: string
  rating: Decimal
  reviewCount: number
  categoryId: number
  pricingType: PricingType
  priceDetails?: string
  lastUpdated?: Date
  isFeatured: boolean
  twitterUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  isVisible: boolean
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parentId?: number
  orderPosition: number
  isVisible: boolean
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: string
  name: string
  slug: string
  count: number
}

export interface ToolSubmission {
  id: number
  name: string
  websiteUrl: string
  description: string
  submitterName: string
  submitterEmail: string
  status: SubmissionStatus
  createdAt: Date
  updatedAt: Date
}

export enum SubmissionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected"
}

export enum PricingType {
  Gratuit = "Gratuit",
  Freemium = "Freemium",
  Payant = "Payant",
  EssaiGratuit = "Essai Gratuit"
}

export interface Review {
  id: number
  toolId: number
  userName: string
  rating: number
  comment?: string
  reviewDate: Date
  isVerified: boolean
  isVisible: boolean
} 