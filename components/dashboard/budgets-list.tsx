"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface Budget {
  id: string
  amount: number
  category_id: string
  categories: {
    name: string
    color: string
  } | null
}

export function BudgetsList({
  budgets,
  spentByCategory,
}: {
  budgets: Budget[]
  spentByCategory: Record<string, number>
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await supabase.from("budgets").delete().eq("id", id)
    router.refresh()
    setDeletingId(null)
  }

  if (budgets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-muted-foreground">Aucun budget defini</p>
        <p className="text-sm text-muted-foreground mt-1">
          Definissez des budgets pour controler vos depenses
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const spent = spentByCategory[budget.category_id] || 0
        const percentage = Math.min((spent / Number(budget.amount)) * 100, 100)
        const isOverBudget = spent > Number(budget.amount)

        return (
          <div
            key={budget.id}
            className="p-4 rounded-xl bg-background border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl"
                  style={{ backgroundColor: budget.categories?.color || "#C2703E" }}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {budget.categories?.name || "Sans categorie"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {spent.toFixed(2)} EUR / {Number(budget.amount).toFixed(2)} EUR
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    isOverBudget ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {percentage.toFixed(0)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(budget.id)}
                  disabled={deletingId === budget.id}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isOverBudget ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
