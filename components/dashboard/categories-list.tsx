"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
  color: string
}

export function CategoriesList({ categories }: { categories: Category[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await supabase.from("categories").delete().eq("id", id)
    router.refresh()
    setDeletingId(null)
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <p className="text-muted-foreground">Aucune categorie</p>
        <p className="text-sm text-muted-foreground mt-1">
          Creez des categories pour organiser vos transactions
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center justify-between p-4 rounded-xl bg-background border border-border"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl"
              style={{ backgroundColor: category.color }}
            />
            <span className="font-medium text-foreground">{category.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => handleDelete(category.id)}
            disabled={deletingId === category.id}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      ))}
    </div>
  )
}
