# Infinite Future Leaders Consulting - Setup Guide

This document provides step-by-step instructions to set up and deploy the client management portal.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- A **Firebase** account (free Spark plan works)
- A **Stripe** account (use test mode for development)
- A **Resend** account for emails (free tier: 100 emails/day)
- **Calendly** account (free plan works)

---

## 🚀 Quick Start (5 steps)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase

**See `FIREBASE-SETUP.md` for detailed Firebase setup instructions.**

Quick summary:
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Create a Firestore database
4. Deploy the security rules from `firestore.rules`
5. Get your web app configuration
6. Download service account key for Admin SDK

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:

**Firebase:**
- Get configuration from Firebase Console → Project Settings → General
- Copy API Key → `NEXT_PUBLIC_FIREBASE_API_KEY`
- Copy Auth Domain → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- Copy Project ID → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- Copy Storage Bucket → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- Copy Messaging Sender ID → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- Copy App ID → `NEXT_PUBLIC_FIREBASE_APP_ID`
- Get Service Account from Project Settings → Service Accounts → Generate new private key
- Minify JSON to one line → `FIREBASE_SERVICE_ACCOUNT_KEY`

**Stripe:**
- Go to [dashboard.stripe.com](https://dashboard.stripe.com)
- Get your test keys from Developers → API Keys
- Copy `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Copy `Secret key` → `STRIPE_SECRET_KEY`
- Create a webhook endpoint (see Stripe Webhooks section below)

**Resend:**
- Go to [resend.com](https://resend.com) and create an account
- Create an API key → `RESEND_API_KEY`
- Note: Emails will be sent from `noreply@infinitefutureleaders.com` (update domain in code if needed)

**Admin & Calendly:**
- Set your email → `ADMIN_EMAIL`
- Set Calendly URL → `NEXT_PUBLIC_CALENDLY_URL`

**App URL:**
- Development: `http://localhost:3000`
- Production: Your deployment URL

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### 5. Test Stripe Webhooks Locally

Install Stripe CLI:
```bash
# Mac
brew install stripe/stripe-cli/stripe

# Windows/Linux - download from https://stripe.com/docs/stripe-cli
```

Forward webhooks to local server:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret displayed and update `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## 🎨 Customization

### Update Branding

1. **Colors**: Edit `app/globals.css` to change the primary color (currently #2563eb)
2. **Logo**: Update the text "Infinite Future Leaders Consulting" in `components/layout/Header.tsx`
3. **Metadata**: Edit `app/layout.tsx` for SEO title and description
4. **Pricing**: Update follower count in `.env.local` → `CURRENT_FOLLOWERS`

### Email Sender Domain

1. Verify your domain in Resend dashboard
2. Update the `from` address in `lib/email/resend.ts`
   ```typescript
   from: 'Infinite Future Leaders <noreply@yourdo

main.com>',
   ```

---

## 🗄️ Database Schema Overview

### Tables Created

**profiles**
- Extends Supabase auth.users
- Stores: full_name, company_name, role, how_found_us
- Auto-created when user signs up

**app_submissions**
- Stores all intake form data
- Tracks workflow status and payment states
- Contains pricing locked at booking time
- Good Faith Policy video tracking (up to 3 videos)

**notifications**
- Logs all sent emails
- Tracks success/failure
- Useful for debugging email delivery

---

## 💳 Stripe Setup

### Test Cards

Use these cards in test mode:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date and any CVC

### Webhook Configuration

#### Local Development

Use Stripe CLI (see step 5 above)

#### Production

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Events to listen for:
   - `checkout.session.completed`
5. Copy the signing secret → `STRIPE_WEBHOOK_SECRET` in Vercel env vars

---

## 📧 Email Configuration

### Development Mode

All emails are automatically sent to `ADMIN_EMAIL` with a prefix showing the intended recipient:
```
Subject: [DEV - Would send to: client@example.com] Ready to Post: MyApp
```

### Production Mode

Emails go to actual recipients when `NODE_ENV=production`.

### Resend Limits

- **Free tier**: 100 emails/day, 3,000/month
- Upgrade if you exceed limits

---

## 🔐 Admin Access

Only the email specified in `ADMIN_EMAIL` can access `/admin`.

To grant admin access to multiple users (future):
1. Create an `admin_users` table
2. Update `lib/supabase/middleware.ts` to check that table
3. For MVP, use single email env var

---

## 📱 Testing the Complete Flow

### User Flow Test

1. **Landing Page**: Go to `http://localhost:3000`
2. **Sign Up**: Click "Submit Your App" → Create account
3. **Intake Step 1**: Fill out client & app info
4. **Discovery Payment**: Pay $50 (use test card `4242...`)
5. **Book Call**: Click through Calendly embed, click "I've Booked My Call"
6. **Intake Step 2**: Select service package and add-ons
7. **Checklist**: View pre-call checklist
8. **Dashboard**: See project status
9. **Mark Discovery Complete** (as admin): Go to `/admin`, mark call complete
10. **Pay Deposit**: Click "Pay 50% Deposit" (use test card)
11. **Ready to Post**: Click "I'm Ready - Please Post"
12. **Mark Posted** (as admin): Enter video URL in admin dashboard
13. **Pay Final**: Client pays remaining 50%
14. **Completed**: Project marked as complete

### Admin Flow Test

1. Go to `/admin`
2. Verify you can see all submissions
3. Test marking a discovery call as complete
4. Test marking a video as posted
5. Verify email notifications are logged in database

---

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit - Client portal"
git push origin claude/clarify-requirements-019KfZPmxLDZd2UDBjZU3uyN
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js
4. Add all environment variables from `.env.local` to Vercel
5. Deploy

### 3. Update Environment Variables

After deployment:
1. Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
2. Update Stripe webhook endpoint to production URL
3. Redeploy

---

## 🐛 Troubleshooting

### "Supabase client error"
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Verify the Supabase project is active

### "Stripe webhook signature verification failed"
- Make sure `STRIPE_WEBHOOK_SECRET` matches your webhook endpoint secret
- In local development, use Stripe CLI secret
- In production, use Stripe dashboard webhook secret

### "Emails not sending"
- Check `RESEND_API_KEY` is valid
- Verify domain in Resend dashboard
- Check Resend dashboard logs for delivery errors
- In dev mode, all emails go to `ADMIN_EMAIL`

### "Cannot access /admin"
- Make sure `ADMIN_EMAIL` matches your logged-in user's email exactly
- Check middleware is protecting the route correctly
- Look at browser console and network tab for errors

### "Payment not updating status"
- Check Stripe webhook is receiving events (Stripe Dashboard → Developers → Webhooks → Logs)
- Verify webhook handler is updating database correctly
- Check database for payment_intent values

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🎯 Next Steps

1. Run `npm run dev` and test the complete flow
2. Customize branding and copy
3. Set up production environment variables
4. Deploy to Vercel
5. Test with real Stripe test mode payments
6. Go live! 🚀

---

For questions or issues, contact Issiah at infinitefutureleadersconsultin@gmail.com
