import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-lg text-center">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Erreur d'authentification</CardTitle>
          <CardDescription className="text-muted-foreground">
            Une erreur s'est produite lors de l'authentification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Veuillez reessayer ou contacter le support si le probleme persiste.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/auth/login">Reessayer</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Retour a l'accueil</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
