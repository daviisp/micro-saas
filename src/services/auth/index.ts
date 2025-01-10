import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";
import { createUserInStripe } from "../stripe";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  events: {
    async createUser(message) {
      await createUserInStripe({
        name: message.user.name as string,
        email: message.user.email as string,
      });
    },
  },
});
