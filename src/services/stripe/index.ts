import Stripe from "stripe";
import { config } from "@/config";
import { prisma } from "../database";

export const stripe = new Stripe(config.stripe.secretKey || "", {
  apiVersion: "2024-06-20",
});

export async function getUserInStripeByEmail(email: string) {
  const findUserInStripe = await stripe.customers.list({ email });
  return findUserInStripe.data[0];
}

export async function createUserInStripe(input: {
  name?: string;
  email: string;
}) {
  const customer = await getUserInStripeByEmail(input.email);
  if (customer) return customer;

  const createdCustomer = await stripe.customers.create({
    email: input.email,
    name: input.name,
  });

  const createdCustomerSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: config.stripe.plans.free.freePriceId }],
  });

  await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdCustomerSubscription.id,
      stripeSubscriptionStatus: createdCustomerSubscription.status,
      stripePriceId: config.stripe.plans.free.freePriceId,
    },
  });

  return createdCustomer;
}

export async function createCheckoutSession(
  stripeCustomerId: string,
  userSubscriptionId: string
) {
  try {
    const currentSignature = await stripe.subscriptionItems.list({
      subscription: userSubscriptionId,
      limit: 1,
    });

    const checkoutSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: "http://localhost:3000/app/settings/billing",
      flow_data: {
        type: "subscription_update_confirm",
        after_completion: {
          type: "redirect",
          redirect: {
            return_url:
              "http://localhost:3000/app/settings/billing?success=true",
          },
        },
        subscription_update_confirm: {
          subscription: userSubscriptionId,
          items: [
            {
              id: currentSignature.data[0].id,
              price: config.stripe.plans.pro.proPriceId,
              quantity: 1,
            },
          ],
        },
      },
    });

    return {
      url: checkoutSession.url,
    };
  } catch (err) {
    console.error(err);
  }
}

export const handleUpdateWebhookStripe = async (event: {
  object: Stripe.Subscription;
}) => {
  const stripeCustomerId = event.object.customer as string;
  const stripeSubscriptionId = event.object.id as string;
  const stripeSubscriptionStatus = event.object.status;
  const stripePriceId = event.object.items.data[0].price.id;

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId,
        },
        {
          stripeCustomerId,
        },
      ],
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    throw new Error("user of stripeCustomerId not found");
  }

  await prisma.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId,
    },
  });
};
