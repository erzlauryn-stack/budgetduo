import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddBudgetButton } from "@/components/dashboard/add-budget-button"
import { BudgetsList } from "@/components/dashboard/budgets-list"

export default async function BudgetsPage() {
  const supabase = await createClient()

  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  const { data: budgets } = await supabase
    .from("budgets")
    .select("*, categories(*)")
    .eq("month", currentMonth)
    .eq("year", currentYear)
    .order("created_at", { ascending: false })

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  // Fetch transactions for current month to calculate spent amounts
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1)
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("type", "expense")
    .gte("date", startOfMonth.toISOString().split("T")[0])

  // Calculate spent per category
  const spentByCategory: Record<string, number> = {}
  transactions?.forEach((t) => {
    if (t.category_id) {
      spentByCategory[t.category_id] = (spentByCategory[t.category_id] || 0) + Number(t.amount)
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Definissez des limites de depenses par categorie
          </p>
        </div>
        <AddBudgetButton categories={categories || []} />
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">
            Budgets de {now.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetsList budgets={budgets || []} spentByCategory={spentByCategory} />
        </CardContent>
      </Card>
    </div>
  )
}
