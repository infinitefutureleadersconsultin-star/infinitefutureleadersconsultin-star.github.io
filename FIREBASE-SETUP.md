# Firebase Setup Guide

This guide will walk you through setting up Firebase for the Infinite Future Leaders Consulting client portal.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `infinite-future-leaders`
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

---

## 2. Enable Authentication

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click "Email/Password" under Sign-in method
4. Toggle "Enable" and click "Save"
5. (Optional) Disable "Email link (passwordless sign-in)" if you don't need it

---

## 3. Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in production mode" (we'll add custom rules)
4. Choose a location (select closest to your users, e.g., `us-central1`)
5. Click "Enable"

---

## 4. Set Up Firestore Security Rules

1. In Firestore Database, click the "Rules" tab
2. Copy the contents of `firestore.rules` from this repository
3. Paste into the Firebase Console rules editor
4. Click "Publish"

Your rules should now protect:
- Users can only read/write their own profiles
- Users can only read/write their own submissions
- Admin (your email) can read all submissions
- Notifications can only be written by server-side Admin SDK

---

## 5. Get Firebase Web App Configuration

1. In Project Overview, click the gear icon → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register app name: `Client Portal`
5. (Optional) Set up Firebase Hosting if you want
6. Copy the `firebaseConfig` object

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

7. Add these values to your `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 6. Create Service Account for Admin SDK

1. In Project settings, click "Service accounts" tab
2. Click "Generate new private key"
3. Click "Generate key" - this downloads a JSON file
4. **IMPORTANT:** Keep this file secure! Never commit it to git!
5. Open the JSON file and copy its entire contents
6. Minify it to a single line (remove all line breaks and extra spaces)
7. Add to `.env.local`:
```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...entire JSON as one line..."}
```

**For production (Vercel):**
- Add this as an environment variable in Vercel dashboard
- Make sure to escape quotes properly or use the Vercel UI to paste it

---

## 7. Firestore Data Structure

The application will automatically create these collections:

### `profiles` Collection
Document ID: User's Firebase Auth UID

```javascript
{
  email: "user@example.com",
  fullName: "John Doe",
  companyName: "Acme Inc",
  role: "Founder",
  howFoundUs: "TikTok",
  createdAt: Timestamp
}
```

### `appSubmissions` Collection
Document ID: Auto-generated

```javascript
{
  userId: "firebase-auth-uid",

  // About You (Intake Step 1)
  fullName: "John Doe",
  email: "john@example.com",
  companyName: "Acme Inc",
  role: "Founder",
  howFoundUs: "TikTok",

  // About Your App (Intake Step 1)
  appName: "MyApp",
  appStoreLink: "https://apps.apple.com/...",
  playStoreLink: "https://play.google.com/...",
  websiteUrl: "https://myapp.com",
  appCategory: "Productivity",
  oneLiner: "The best productivity app ever",
  problemSolved: "Helps people manage their time",
  targetAudience: "Busy professionals",
  currentDownloads: "1K - 10K",

  // Service Selection (Intake Step 2)
  primaryGoal: "install_campaign",
  usageRights: false,
  usageRightsDetails: null,
  rushDelivery: false,
  scriptApproval: true,
  budgetRange: "$1,000 - $2,500",
  additionalNotes: "Looking forward to working together",

  // Pricing Locked at Booking
  baseRateAtBooking: 1000,
  followerCountAtBooking: 17000,

  // Workflow Status
  workflowStatus: "intake_step_1",

  // Timestamps
  discoveryCallPaidAt: Timestamp,
  discoveryCallScheduledAt: Timestamp,
  depositPaidAt: Timestamp,
  readyToPostAt: Timestamp,
  videoPostedAt: Timestamp,
  finalPaidAt: Timestamp,
  createdAt: Timestamp,
  updatedAt: Timestamp,

  // Payment Tracking (in cents)
  totalAmountCents: 115000,
  depositAmountCents: 57500,
  finalAmountCents: 57500,
  discoveryPaymentIntent: "pi_abc123",
  depositPaymentIntent: "pi_def456",
  finalPaymentIntent: "pi_ghi789",

  // Video Tracking (Good Faith Policy)
  videosCreatedCount: 1,
  video1Url: "https://tiktok.com/@zaydevelops/video/123",
  video1Views: 5420,
  video2Url: null,
  video2Views: null,
  video3Url: null,
  video3Views: null,
  currentVideoUrl: "https://tiktok.com/@zaydevelops/video/123"
}
```

### `notifications` Collection
Document ID: Auto-generated

```javascript
{
  submissionId: "submission-doc-id",
  notificationType: "ready_to_post",
  sentToEmail: "admin@example.com",
  emailSubject: "Ready to Post: MyApp",
  emailBody: "<html>...",
  sentSuccessfully: true,
  createdAt: Timestamp
}
```

---

## 8. Testing Firestore Rules

You can test your security rules directly in the Firebase Console:

1. Go to Firestore Database → Rules tab
2. Click "Rules Playground"
3. Test queries like:
   - GET `/profiles/{userId}` with authenticated user
   - GET `/appSubmissions` with admin email
   - POST `/notifications` (should fail from client)

---

## 9. Indexing (If Needed)

Firestore will automatically prompt you to create indexes when you run certain queries. The application queries are designed to work without composite indexes, but if you see errors, Firebase will provide a link to auto-create them.

Common indexes you might need:
- `appSubmissions`: `userId` + `workflowStatus`
- `appSubmissions`: `workflowStatus` + `createdAt`

---

## 10. Update Admin Email in Rules

**Important:** Update the Firestore security rules with your actual admin email!

In `firestore.rules`, change:
```javascript
function isAdmin() {
  return request.auth.token.email == 'infinitefutureleadersconsultin@gmail.com';
}
```

To your actual email address that matches `ADMIN_EMAIL` in `.env.local`.

---

## 11. Monitoring and Logging

### Firestore Usage
- Go to Firestore Database → Usage tab
- Monitor reads, writes, and deletes
- Free tier: 50K reads/day, 20K writes/day, 20K deletes/day

### Authentication
- Go to Authentication → Usage tab
- Free tier: Unlimited email/password auth

### Set Up Budget Alerts
1. Go to Google Cloud Console
2. Billing → Budgets & alerts
3. Set a budget (e.g., $10/month) with email alerts

---

## 12. Development vs Production

### Development
- Use Firebase emulators for local testing (optional):
```bash
npm install -g firebase-tools
firebase init emulators
firebase emulators:start
```

- Update `lib/firebase/client.ts` to use emulators:
```typescript
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

### Production
- All environment variables should be set in Vercel
- Firestore rules are automatically deployed
- Service account key must be in Vercel environment variables

---

## 13. Backup Strategy

### Automated Backups
1. Go to Google Cloud Console
2. Firestore → Import/Export
3. Set up scheduled exports to Cloud Storage
4. Recommended: Daily backups at 3 AM UTC

### Manual Export
```bash
gcloud firestore export gs://your-bucket-name/backup-$(date +%Y%m%d)
```

---

## Troubleshooting

### "Missing or insufficient permissions"
- Check Firestore rules are published
- Verify user is authenticated
- Check `userId` matches `auth.uid`

### "Service account key invalid"
- Verify JSON is valid and properly escaped
- Check no extra line breaks in environment variable
- Regenerate key if needed

### "Auth domain not authorized"
- Go to Authentication → Settings → Authorized domains
- Add your deployment domain (Vercel URL)
- Add `localhost` for local development

---

## Next Steps

1. Run `npm run dev` to start development server
2. Test signup flow to create a user
3. Check Firestore to see profile document created
4. Test intake form to create a submission
5. Verify security rules are working correctly

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Next.js with Firebase](https://firebase.google.com/docs/web/setup)

---

For questions, contact Issiah at infinitefutureleadersconsultin@gmail.com
