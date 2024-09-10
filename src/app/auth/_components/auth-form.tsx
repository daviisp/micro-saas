"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@/services/schemas/auth-form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export function AuthForm() {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    try {
      await signIn("nodemailer", { email: data.email, redirect: false });
      toast({
        title: "Success",
        description: "Toast send successfully! Check your email",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error ocurred. Please try again",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in with a Magic Link
          </h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a magic link to sign in.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              {...form.register("email")}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}
