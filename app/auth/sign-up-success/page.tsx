import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-foreground">BudgetDuo</span>
        </Link>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl text-foreground">Verifiez votre email</CardTitle>
            <CardDescription className="text-muted-foreground">
              Nous avons envoye un lien de confirmation a votre adresse email.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Cliquez sur le lien dans l&apos;email pour activer votre compte et commencer a utiliser BudgetDuo.
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Retour a la connexion
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
