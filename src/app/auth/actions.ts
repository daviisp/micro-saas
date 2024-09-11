"use server";

import { signIn } from "@/services/auth";

export async function gitHubLogin() {
  await signIn("github");
}

export async function googleLogin() {
  await signIn("google");
}
