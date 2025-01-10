"use server";

import { signIn } from "@/services/auth";

export async function googleLogin() {
  await signIn("google");
}
