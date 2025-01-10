import { SignInForm } from '@/components/sign-in-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/_auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center ">
        <CardTitle className="text-lg">Sign In</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
