import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddCategoryButton } from "@/components/dashboard/add-category-button"
import { CategoriesList } from "@/components/dashboard/categories-list"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Organisez vos depenses par categorie
          </p>
        </div>
        <AddCategoryButton />
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Vos categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesList categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}
