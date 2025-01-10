"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const isDisabled = isLoading || !!socialLoading;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          router.navigate({ to: "/" });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const socialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social(
      { provider },
      {
        onRequest: () => {
          setSocialLoading(provider);
        },
        onResponse: () => {
          setSocialLoading(null);
        },
        onSuccess: () => {
          router.navigate({ to: "/" });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="inline-flex items-center justify-between w-full">
                  <FormLabel>Password</FormLabel>
                  <Link
                    className="text-xs text-muted-foreground hover:text-primary"
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isDisabled} type="submit" className="w-full">
            {isLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-center gap-2 py-4">
        <div className="h-[1px] w-full bg-border"></div>
        <div className="text-xs text-muted-foreground">Or</div>
        <div className="h-[1px] w-full bg-border"></div>
      </div>

      <div className="flex gap-2.5 mb-4">
        <Button
          disabled={isDisabled}
          variant="outline"
          className="w-full"
          onClick={() => socialSignIn("google")}
        >
          {socialLoading === "google" ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <img src="./google.svg" alt="Google" className="size-[18px]" />
          )}
        </Button>
        <Button
          disabled={isDisabled}
          variant="outline"
          className="w-full"
          onClick={() => socialSignIn("github")}
        >
          {socialLoading === "github" ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <img
              src="./github.svg"
              alt="GitHub"
              className="size-[18px] dark:invert"
            />
          )}
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-primary">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
