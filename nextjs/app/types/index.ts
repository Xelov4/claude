// Types pour les modèles Prisma
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: number | null;
  orderPosition: number;
  isVisible: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt?: Date;
}

export interface ToolTag {
  toolId: number;
  tagId: number;
  tag: {
    id: number;
    name: string;
    slug: string;
  };
}

// Type pour représenter le type Decimal de Prisma
export type Decimal = number | { toString(): string };

export enum PricingType {
  Gratuit = "Gratuit",
  Freemium = "Freemium",
  Payant = "Payant",
  EssaiGratuit = "Essai Gratuit"
}

export interface Tool {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string | null;
  logoUrl?: string | null;
  imageUrl?: string | null;
  websiteUrl?: string | null;
  rating: Decimal;
  reviewCount: number;
  categoryId: number;
  pricingType: PricingType;
  priceDetails?: string | null;
  isFeatured: boolean;
  isVisible: boolean;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  lastUpdated?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  category?: Category;
  toolTags?: ToolTag[];
}

export interface TargetAudience {
  id: number;
  name: string;
  slug: string;
  createdAt?: Date;
}

export interface ToolAudience {
  toolId: number;
  audienceId: number;
  description?: string | null;
  audience?: TargetAudience;
}

export interface Feature {
  id: number;
  toolId: number;
  title: string;
  description?: string | null;
  orderPosition: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UseCase {
  id: number;
  toolId: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  orderPosition: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  id: number;
  toolId: number;
  userName: string;
  rating: number;
  comment?: string | null;
  reviewDate: Date;
  isVerified: boolean;
  isVisible: boolean;
  createdAt?: Date;
}

// Types pour les composants d'interface utilisateur
export interface SearchIconProps {
  className?: string;
}

export interface FilterIconProps {
  className?: string;
}

// Types pour les données formatées
export interface FormattedTool {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  rating: number;
  category: string;
  tags: string[];
}

export interface CategoryWithTools extends Category {
  tools: FormattedTool[];
}

// Types pour les pages de recherche
export interface SearchCategory {
  name: string;
  slug: string;
  count: number;
}

export interface SearchTag {
  name: string;
  slug: string;
  count: number;
} 