import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";
import { createUserInStripe } from "../stripe";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    verifyRequest: "/auth",
    error: "/auth",
    newUser: "/",
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  events: {
    async createUser(message) {
      await createUserInStripe({
        name: message.user.name as string,
        email: message.user.email as string,
      });
    },
  },
});
