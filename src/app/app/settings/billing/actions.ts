"use server";

import { config } from "@/config";
import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { createCheckoutSession } from "@/services/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSessionAction() {
  const session = await auth();

  if (!session) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const checkoutSession = await createCheckoutSession(
    session.user.stripeCustomerId as string,
    session.user.stripeSubscriptionId as string
  );

  if (!checkoutSession?.url) {
    return;
  }

  return redirect(checkoutSession.url);
}

export async function getPlanByUser(userId: string) {
  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    return;
  }

  const countTasks = await prisma.todo.count({
    where: {
      userId: findUser.id,
    },
  });

  const findPlanByPriceId =
    findUser.stripePriceId === config.stripe.plans.free.freePriceId
      ? {
          name: "Free",
          availableTasks: config.stripe.plans.free.quota.TASKS,
        }
      : {
          name: "PRO",
          availableTasks: config.stripe.plans.pro.quota.TASKS,
        };

  return {
    name: findPlanByPriceId.name,
    quota: {
      TASKS: {
        availableTasks: findPlanByPriceId.availableTasks,
        tasksUsage: countTasks,
        percent: (countTasks / findPlanByPriceId.availableTasks) * 100,
      },
    },
  };
}
