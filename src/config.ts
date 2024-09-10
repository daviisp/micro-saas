export const config = {
  stripe: {
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        freePriceId: process.env.FREE_PRICE_ID,
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        proPriceId: process.env.PRO_PRICE_ID,
        quota: {
          TASKS: 100,
        },
      },
    },
  },
};
