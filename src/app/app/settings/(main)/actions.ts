"use server";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { stripe } from "@/services/stripe";

export async function findUser(id: string | undefined) {
  const userExists = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return userExists;
}

export async function updateUserProfile(name: string, email?: string) {
  const session = await auth();

  const user = await findUser(session?.user?.id);

  if (!user) {
    return;
  }

  await Promise.all([
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
      },
    }),
    stripe.customers.update(user.stripeCustomerId!, {
      name,
    }),
  ]);

  if (email) {
    await Promise.all([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email,
        },
      }),
      stripe.customers.update(user.stripeCustomerId!, {
        email,
      }),
    ]);
  }
}
