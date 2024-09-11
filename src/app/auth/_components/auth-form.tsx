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
import { gitHubLogin, googleLogin } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { UpdateThemeButton } from "./update-theme-button";
import { ChromeIcon } from "lucide-react";

export function AuthForm() {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    try {
      console.log("caiu");
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
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px] max-w-[90%]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Login</CardTitle>
            <UpdateThemeButton />
          </div>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
              <Button className="w-full text-center" type="submit">
                {form.formState.isSubmitting ? "Sending..." : "Send Magic Link"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <form action={gitHubLogin}>
              <Button variant="outline" className="w-full">
                <GitHubLogoIcon className="mr-2 h-4 w-4" />{" "}
                {form.formState.isSubmitting
                  ? "Submitting"
                  : "Login with GitHub"}
              </Button>
            </form>
            <form action={googleLogin}>
              <Button variant="outline" className="w-full">
                <ChromeIcon className="mr-2 h-4 w-4" /> Login with Google
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
