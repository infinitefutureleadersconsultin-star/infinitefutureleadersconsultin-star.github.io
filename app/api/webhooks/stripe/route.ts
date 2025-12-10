import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { sendEmail } from '@/lib/email/resend';
import { paymentCompleteEmail } from '@/lib/email/templates';
import { toDollars } from '@/lib/utils/pricing';
import Stripe from 'stripe';

// Disable body parsing so we can verify the webhook signature
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error handling webhook:', err);
    return NextResponse.json(
      { error: `Webhook handler failed: ${err.message}` },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const { submissionId, paymentType } = session.metadata || {};

  if (!submissionId || !paymentType) {
    console.error('Missing metadata in checkout session:', session.id);
    return;
  }

  console.log(`Processing ${paymentType} payment for submission ${submissionId}`);

  const db = getAdminDb();
  const submissionRef = db.collection('appSubmissions').doc(submissionId);
  const submissionDoc = await submissionRef.get();
  const submission = submissionDoc.data();

  if (!submission) {
    console.error(`Submission ${submissionId} not found`);
    return;
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL!;

    switch (paymentType) {
      case 'discovery':
        await submissionRef.update({
          discovery_call_paid_at: FieldValue.serverTimestamp(),
          discovery_payment_intent: session.payment_intent,
          workflow_status: 'discovery_scheduled',
        });
        console.log(`Discovery payment processed for submission ${submissionId}`);

        // Notify admin about discovery payment
        await sendEmail({
          to: adminEmail,
          subject: `🎯 Discovery Call Paid: ${submission.app_name}`,
          html: `
            <h2>Discovery Call Payment Received</h2>
            <p><strong>${submission.full_name}</strong> has paid the $50 discovery call fee for <strong>${submission.app_name}</strong>.</p>
            <p>Next steps:</p>
            <ul>
              <li>Client will book a time on your Calendly</li>
              <li>Client will select their service package</li>
              <li>Review pre-call checklist</li>
            </ul>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">View in Admin Dashboard</a></p>
          `,
        });

        // Send confirmation to client
        await sendEmail({
          to: submission.email,
          subject: 'Discovery Call Payment Confirmed ✅',
          html: `
            <h2>Payment Received!</h2>
            <p>Hey ${submission.full_name?.split(' ')[0]},</p>
            <p>Your $50 discovery call fee has been received. Here's what to do next:</p>
            <ol>
              <li><strong>Book your call</strong> - Pick a time on my Calendly</li>
              <li><strong>Select your package</strong> - Choose your service level and add-ons</li>
              <li><strong>Review the checklist</strong> - Get prepared for our call</li>
            </ol>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/book">Continue to booking →</a></p>
            <p>Looking forward to chatting about ${submission.app_name}!</p>
            <p><strong>Issiah Mclean</strong><br>@zaydevelops</p>
          `,
        });
        break;

      case 'deposit':
        await submissionRef.update({
          deposit_paid_at: FieldValue.serverTimestamp(),
          deposit_payment_intent: session.payment_intent,
          workflow_status: 'deposit_paid',
        });
        console.log(`Deposit payment processed for submission ${submissionId}`);

        // Notify admin that deposit is paid
        await sendEmail({
          to: adminEmail,
          subject: `💰 Deposit Received: ${submission.app_name}`,
          html: `
            <h2>Deposit Payment Received</h2>
            <p><strong>${submission.full_name}</strong> has paid their deposit for <strong>${submission.app_name}</strong>.</p>
            <p>You can now start production on this project!</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">View in Admin Dashboard</a></p>
          `,
        });
        break;

      case 'final':
        await submissionRef.update({
          final_paid_at: FieldValue.serverTimestamp(),
          final_payment_intent: session.payment_intent,
          workflow_status: 'completed',
        });
        console.log(`Final payment processed for submission ${submissionId}`);

        // Send completion email to admin
        const totalAmount = submission.total_amount_cents
          ? toDollars(submission.total_amount_cents)
          : 0;

        const emailTemplate = paymentCompleteEmail({
          clientName: submission.full_name,
          appName: submission.app_name,
          totalAmount,
        });

        await sendEmail({
          to: adminEmail,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
        });

        // Send thank you email to client
        await sendEmail({
          to: submission.email,
          subject: 'Thank You! Project Complete 🎉',
          html: `
            <h2>Thank You for Working With Me!</h2>
            <p>Hey ${submission.full_name?.split(' ')[0]},</p>
            <p>Your final payment has been received and your project is now complete!</p>
            <p>You can track your video performance in your dashboard:</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Go to Dashboard</a></p>
            <p>Thanks for trusting me with ${submission.app_name}. If you need anything else, don't hesitate to reach out!</p>
            <p><strong>Issiah Mclean</strong><br>@zaydevelops</p>
          `,
        });
        break;

      default:
        console.error(`Unknown payment type: ${paymentType}`);
    }
  } catch (err: any) {
    console.error(`Error updating submission ${submissionId}:`, err);
    throw err;
  }
}
