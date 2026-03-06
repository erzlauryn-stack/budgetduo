import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddTransactionButton } from "@/components/dashboard/add-transaction-button"
import { TransactionsList } from "@/components/dashboard/transactions-list"

export default async function TransactionsPage() {
  const supabase = await createClient()

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*, categories(*)")
    .order("date", { ascending: false })

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Gerez toutes vos transactions
          </p>
        </div>
        <AddTransactionButton categories={categories || []} />
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Historique</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsList transactions={transactions || []} />
        </CardContent>
      </Card>
    </div>
  )
}
