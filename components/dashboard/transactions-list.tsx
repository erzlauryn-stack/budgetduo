"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  description: string | null
  date: string
  categories: {
    name: string
    color: string
  } | null
}

export function TransactionsList({ transactions }: { transactions: Transaction[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await supabase.from("transactions").delete().eq("id", id)
    router.refresh()
    setDeletingId(null)
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-muted-foreground">Aucune transaction</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 rounded-xl bg-background border border-border"
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                transaction.type === "income"
                  ? "bg-success/10"
                  : "bg-destructive/10"
              }`}
            >
              {transaction.type === "income" ? (
                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">
                {transaction.description || "Transaction"}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(transaction.date).toLocaleDateString("fr-FR")}</span>
                {transaction.categories && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: transaction.categories.color }}
                      />
                      <span>{transaction.categories.name}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`font-semibold ${
                transaction.type === "income" ? "text-success" : "text-destructive"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}
              {Number(transaction.amount).toFixed(2)} EUR
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => handleDelete(transaction.id)}
              disabled={deletingId === transaction.id}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
