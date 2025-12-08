import Stripe from 'stripe';

/**
 * Server-side Stripe client with lazy initialization
 * Created only when needed to avoid build-time errors
 */
let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    });
  }
  return stripeClient;
}

/**
 * Create a checkout session for discovery call payment ($50)
 */
export async function createDiscoveryCheckoutSession(
  submissionId: string,
  userId: string
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 5000, // $50 in cents
          product_data: {
            name: 'Discovery Call with Issiah Mclean',
            description: '30-minute video call to discuss your app and goals',
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      submissionId,
      userId,
      paymentType: 'discovery',
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success/discovery?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/book/payment`,
  });

  return session;
}

/**
 * Create a checkout session for deposit payment (50% of total)
 */
export async function createDepositCheckoutSession(
  submissionId: string,
  userId: string,
  appName: string,
  depositAmountCents: number
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: depositAmountCents,
          product_data: {
            name: `50% Deposit - ${appName} Campaign`,
            description: 'First half payment before video creation',
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      submissionId,
      userId,
      paymentType: 'deposit',
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success/deposit?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return session;
}

/**
 * Create a checkout session for final payment (remaining 50%)
 */
export async function createFinalCheckoutSession(
  submissionId: string,
  userId: string,
  appName: string,
  finalAmountCents: number
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: finalAmountCents,
          product_data: {
            name: `Final Payment - ${appName} Campaign`,
            description: 'Remaining balance after video posting',
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      submissionId,
      userId,
      paymentType: 'final',
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success/final?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return session;
}

/**
 * Verify Stripe webhook signature
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set');
  }
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    webhookSecret
  );
}
