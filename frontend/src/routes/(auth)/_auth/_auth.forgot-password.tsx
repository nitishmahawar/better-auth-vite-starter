import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/_auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to receive instructions to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link to="/sign-in">Back to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
