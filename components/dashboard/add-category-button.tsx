"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const colors = [
  "#C2703E", // Terracotta
  "#D4A574", // Sand
  "#8B5A2B", // Brown
  "#4A7C59", // Forest green
  "#5B8A72", // Sage
  "#6B7280", // Gray
  "#9333EA", // Purple
  "#DC2626", // Red
  "#2563EB", // Blue
  "#059669", // Emerald
]

export function AddCategoryButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [color, setColor] = useState(colors[0])
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from("categories").insert({
      user_id: user.id,
      name,
      color,
    })

    if (!error) {
      setOpen(false)
      setName("")
      setColor(colors[0])
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle categorie
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Ajouter une categorie</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Creez une nouvelle categorie pour organiser vos transactions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Nom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Alimentation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Couleur</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-8 w-8 rounded-lg transition-all ${
                    color === c ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Creation..." : "Creer la categorie"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
