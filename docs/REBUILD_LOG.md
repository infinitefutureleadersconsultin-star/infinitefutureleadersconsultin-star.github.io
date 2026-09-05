# REBUILD LOG — Esther and Mays

Every file removed or replaced during the rebuild, with the reason and what took its place.

| File | Disposition | Why | Replaced by |
|---|---|---|---|
| `app/admin/page.tsx` | DELETE | Admin dashboard for managing TikTok video review submissions | nothing |
| `app/api/payments/create-deposit-session/route.ts` | DELETE | Stripe checkout session creation for deposit payment | nothing |
| `app/api/payments/create-discovery-session/route.ts` | DELETE | Stripe checkout session creation for $50 discovery call | nothing |
| `app/api/payments/create-final-session/route.ts` | DELETE | Stripe checkout session creation for final 50% payment | nothing |
| `app/api/webhooks/stripe/route.ts` | DELETE | Stripe webhook handler updating Firestore and sending emails | nothing |
| `app/auth/login/page.tsx` | DELETE | Firebase email/password login for brand-review clients | nothing |
| `app/auth/signup/page.tsx` | DELETE | Firebase account creation for brand-review clients | nothing |
| `app/book/page.tsx` | DELETE | Calendly embed for scheduling discovery calls | nothing |
| `app/checklist/page.tsx` | DELETE | Pre-call checklist for brand-review discovery calls | nothing |
| `app/dashboard/page.tsx` | DELETE | Client dashboard tracking TikTok video production workflow | nothing |
| `app/intake/step-1/page.tsx` | DELETE | Brand/product intake form (app name, store links, target audience) | nothing |
| `app/intake/step-2/page.tsx` | DELETE | Package and add-on selection form with pricing calculator | nothing |
| `app/payment/discovery/page.tsx` | DELETE | Stripe checkout page for $50 discovery call fee | nothing |
| `app/success/deposit/DepositSuccessContent.tsx` | DELETE | Deposit payment confirmation content component | nothing |
| `app/success/deposit/page.tsx` | DELETE | Deposit payment confirmation page wrapper | nothing |
| `app/success/discovery/DiscoverySuccessContent.tsx` | DELETE | Discovery payment confirmation content component | nothing |
| `app/success/discovery/page.tsx` | DELETE | Discovery payment confirmation page wrapper | nothing |
| `app/success/final/FinalSuccessContent.tsx` | DELETE | Final payment confirmation content component | nothing |
| `app/success/final/page.tsx` | DELETE | Final payment confirmation page wrapper | nothing |
| `components/landing/Bio.tsx` | DELETE | Bio section with "Hey, I'm Issiah", @zaydevelops TikTok link, profile photo | nothing |
| `components/landing/Hero.tsx` | DELETE | Hero with "Get Your Brand Seen", animated blobs, 17K followers badge | nothing |
| `components/landing/HowItWorks.tsx` | DELETE | 4-step brand-review workflow (Submit, Discovery, Review, Launch) | nothing |
| `components/landing/Pricing.tsx` | DELETE | $500 base rate card, add-ons, payment structure for TikTok reviews | nothing |
| `components/landing/SocialProof.tsx` | DELETE | Three hardcoded testimonials (TaskFlow, UrbanFit, GlowUp Beauty) | nothing |
| `components/landing/WhatMakesDifferent.tsx` | DELETE | Three feature cards with emoji icons about TikTok brand reviews | nothing |
| `lib/constants.ts` | DELETE | Follower tiers, TikTok pricing, add-on prices, workflow statuses, business categories | nothing |
| `lib/email/resend.ts` | DELETE | Resend email client, from address "Infinite Future Leaders" | nothing |
| `lib/email/templates.ts` | DELETE | Four HTML email templates referencing "Issiah Mclean", "@zaydevelops" | nothing |
| `lib/firebase/admin.ts` | DELETE | Firebase Admin SDK initialization, verifyIdToken, isAdmin | nothing |
| `lib/firebase/client.ts` | DELETE | Firebase client SDK initialization, getFirebaseAuth, getFirebaseDb | nothing |
| `lib/firebase/middleware.ts` | DELETE | Route protection checking __session cookie for Firebase auth | nothing |
| `lib/stripe/client.ts` | DELETE | Stripe.js client loader | nothing |
| `lib/stripe/server.ts` | DELETE | Server Stripe client, checkout session creators for discovery/deposit/final | nothing |
| `lib/utils/formatting.ts` | DELETE | Date formatting utilities depending on date-fns | nothing |
| `lib/utils/pricing.ts` | DELETE | Pricing calculations (getBaseRate, calculateTotal, toCents) | nothing |
| `lib/utils/validation.ts` | DELETE | Zod schemas for intake form validation | nothing |
| `types/database.ts` | DELETE | TypeScript types for Profile, AppSubmission, Notification (old data model) | nothing |
| `types/index.ts` | DELETE | Re-exports of old product types, ServiceSelection, PricingBreakdown | nothing |
| `middleware.ts` | DELETE | Root middleware importing Firebase route protection (import target deleted) | nothing |
| `firestore.rules` | DELETE | Firestore security rules for profiles, appSubmissions, notifications; hardcoded old admin email | nothing |
| `SETUP.md` | DELETE | Old product setup guide referencing Supabase, Stripe, Calendly, old email | nothing |
| `FIREBASE-SETUP.md` | DELETE | Firebase setup guide for old product's project and data model | nothing |
| `public/file.svg` | DELETE | Next.js create-next-app template leftover | nothing |
| `public/globe.svg` | DELETE | Next.js template leftover | nothing |
| `public/next.svg` | DELETE | Next.js logo SVG — template leftover and framework badge | nothing |
| `public/profile.jpg` | DELETE | Personal photo used in old Bio component | nothing |
| `public/vercel.svg` | DELETE | Vercel logo SVG — template leftover and deploy badge | nothing |
| `public/window.svg` | DELETE | Next.js template leftover | nothing |
