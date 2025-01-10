"use client";

import { Button } from "@/components/ui/button";
import {  googleLogin } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateThemeButton } from "./update-theme-button";
import { ChromeIcon } from "lucide-react";

export function AuthForm() {


  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px] max-w-[90%]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Login</CardTitle>
            <UpdateThemeButton />
          </div>
          <CardDescription>Make login to use app!</CardDescription>
        </CardHeader>
        <CardContent>
        <form action={googleLogin}>
              <Button variant="outline" className="w-full">
                <ChromeIcon className="mr-2 h-4 w-4" /> Login with Google
              </Button>
            </form>
        </CardContent>

      
      </Card>
    </div>
  );
}
