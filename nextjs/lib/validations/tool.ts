import * as z from "zod"
import { isValidUrl } from "@/lib/utils"

export const toolSubmissionSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  websiteUrl: z
    .string()
    .refine((url) => isValidUrl(url), "L'URL du site web n'est pas valide"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  submitterName: z
    .string()
    .min(2, "Votre nom doit contenir au moins 2 caractères")
    .max(100, "Votre nom ne peut pas dépasser 100 caractères"),
  submitterEmail: z
    .string()
    .email("L'adresse email n'est pas valide"),
  categoryId: z
    .number()
    .int("La catégorie est requise")
    .positive("La catégorie est requise"),
  tags: z
    .array(z.string())
    .min(1, "Sélectionnez au moins un tag")
    .max(5, "Vous ne pouvez pas sélectionner plus de 5 tags"),
})

export const toolUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  longDescription: z
    .string()
    .max(5000, "La description longue ne peut pas dépasser 5000 caractères")
    .optional(),
  websiteUrl: z
    .string()
    .refine((url) => isValidUrl(url), "L'URL du site web n'est pas valide"),
  twitterUrl: z
    .string()
    .refine((url) => url === "" || isValidUrl(url), "L'URL Twitter n'est pas valide")
    .optional(),
  linkedinUrl: z
    .string()
    .refine((url) => url === "" || isValidUrl(url), "L'URL LinkedIn n'est pas valide")
    .optional(),
  instagramUrl: z
    .string()
    .refine((url) => url === "" || isValidUrl(url), "L'URL Instagram n'est pas valide")
    .optional(),
  categoryId: z
    .number()
    .int("La catégorie est requise")
    .positive("La catégorie est requise"),
  tags: z
    .array(z.string())
    .min(1, "Sélectionnez au moins un tag")
    .max(5, "Vous ne pouvez pas sélectionner plus de 5 tags"),
  pricing: z.enum(["Gratuit", "Freemium", "Payant", "Essai Gratuit"]),
  priceDetails: z
    .string()
    .max(255, "Les détails de prix ne peuvent pas dépasser 255 caractères")
    .optional(),
})

export const reviewSchema = z.object({
  rating: z
    .number()
    .int("La note doit être un nombre entier")
    .min(1, "La note minimale est 1")
    .max(5, "La note maximale est 5"),
  comment: z
    .string()
    .min(10, "Le commentaire doit contenir au moins 10 caractères")
    .max(1000, "Le commentaire ne peut pas dépasser 1000 caractères"),
  userName: z
    .string()
    .min(2, "Votre nom doit contenir au moins 2 caractères")
    .max(100, "Votre nom ne peut pas dépasser 100 caractères"),
}) 