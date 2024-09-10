"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/services/schemas/profile-form-schema";
import { updateUserProfile } from "../actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

type ProfileFormProps = {
  user: Session["user"];
};

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      await updateUserProfile(data.name, data.email);
      router.refresh();

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error ocurred. Please try again",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This is your account settings section</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-8">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                className="w-1/2"
                {...form.register("name")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Email</Label>
              <Input id="email" className="w-1/2" {...form.register("email")} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
