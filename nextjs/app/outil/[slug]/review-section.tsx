"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"
import { useApiMutation } from "@/hooks/use-api-query"
import { toast } from "@/hooks/use-toast"

export const ReviewSection = ({
  toolId,
  toolSlug,
  initialReviews,
}: { toolId: number; toolSlug: string; initialReviews: any[] }) => {
  const [reviews, setReviews] = useState(initialReviews)
  const [userName, setUserName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  // Use the mutation hook instead of fetch
  const { mutate, isLoading, error } = useApiMutation<any, any>(`tools/${toolSlug}/reviews`, "POST", {
    onSuccess: (data) => {
      // Add the new review to state but mark it as pending
      setReviews((prevReviews) => [{ ...data, pending: true }, ...prevReviews])

      // Clear form
      setUserName("")
      setRating(5)
      setComment("")

      // Show success message
      toast({
        title: "Avis soumis avec succès",
        description: "Votre avis a été soumis et est en attente d'approbation.",
        variant: "default",
      })
    },
    onError: (err) => {
      toast({
        title: "Erreur lors de la soumission",
        description: err.message,
        variant: "destructive",
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userName || !comment) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Submit the review
    await mutate({ userName, rating, comment })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Avis</h2>

      {/* Formulaire d'ajout d'avis */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Ajouter un avis</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium mb-1">
              Nom
            </label>
            <Input
              id="userName"
              placeholder="Votre nom"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Note
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`text-2xl ${rating >= value ? "text-amber-500" : "text-gray-300"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isLoading && setRating(value)}
                  disabled={isLoading}
                >
                  <StarIcon className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Commentaire
            </label>
            <Input
              id="comment"
              placeholder="Votre commentaire"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Envoi en cours..." : "Soumettre l'avis"}
          </Button>
        </form>
      </Card>

      {/* Liste des avis existants */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Card
              key={review.id || `pending-${index}`}
              className={`p-5 ${review.pending ? "border-dashed border-amber-300" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${review.name || review.userName}`}
                  />
                  <AvatarFallback>{(review.name || review.userName).charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{review.name || review.userName}</h4>
                    <div className="flex items-center text-amber-500">
                      <StarIcon className="h-4 w-4 fill-current" />
                      <span className="text-xs ml-1">{review.rating}</span>
                    </div>
                    {review.pending && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                        En attente d'approbation
                      </span>
                    )}
                    {review.isVerified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Vérifié</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(review.date || review.reviewDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Aucun avis pour le moment.</p>
      )}
    </div>
  )
}

