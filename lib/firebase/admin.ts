import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK for server-side operations
 * Use this in API routes, Server Components, and Server Actions
 *
 * IMPORTANT: This bypasses all Firestore security rules
 * Only use when you need elevated permissions
 */

let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;

/**
 * Initialize Firebase Admin SDK
 * Uses service account credentials from environment variable
 */
function initializeAdmin() {
  if (!getApps().length) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
    );

    adminApp = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    adminApp = getApps()[0];
  }

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);

  return { adminApp, adminAuth, adminDb };
}

/**
 * Get Admin Auth instance
 */
export function getAdminAuth(): Auth {
  if (!adminAuth) {
    initializeAdmin();
  }
  return adminAuth;
}

/**
 * Get Admin Firestore instance
 */
export function getAdminDb(): Firestore {
  if (!adminDb) {
    initializeAdmin();
  }
  return adminDb;
}

/**
 * Verify Firebase ID token from client
 * Use this in API routes to authenticate requests
 */
export async function verifyIdToken(token: string) {
  try {
    const auth = getAdminAuth();
    const decodedToken = await auth.verifyIdToken(token);
    return { user: decodedToken, error: null };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { user: null, error };
  }
}

/**
 * Check if a user is an admin
 */
export async function isAdmin(email: string): Promise<boolean> {
  return email === process.env.ADMIN_EMAIL;
}

// Export initialized instances
export { adminAuth, adminDb };
