'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DISCOVERY_CALL_FEE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils/pricing';

export default function DiscoveryPaymentPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUserId(user.uid);

      // Load user's submission
      const db = getFirebaseDb();
      const submissionsRef = collection(db, 'appSubmissions');
      const q = query(submissionsRef, where('user_id', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // No submission found, redirect to intake
        router.push('/intake/step-1');
        return;
      }

      const submissionDoc = querySnapshot.docs[0];
      setSubmissionId(submissionDoc.id);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handlePayment = async () => {
    if (!submissionId || !userId) return;

    setProcessing(true);
    setError(null);

    try {
      // Call API to create Stripe checkout session
      const response = await fetch('/api/payments/create-discovery-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId,
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment session');
      }

      // Update workflow status to discovery_payment_pending
      const db = getFirebaseDb();
      const submissionRef = doc(db, 'appSubmissions', submissionId);
      await updateDoc(submissionRef, {
        workflow_status: 'discovery_payment_pending',
        discovery_payment_intent: data.sessionId,
      });

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to process payment. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Discovery Call Payment</h1>
          <p className="text-gray-600">
            Let's make sure we're a good fit before moving forward.
          </p>
        </div>

        {/* Payment Card */}
        <Card>
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Pricing */}
            <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Discovery Call Fee</h2>
                <div className="text-right">
                  <p className="text-4xl font-black text-primary-600">
                    {formatCurrency(DISCOVERY_CALL_FEE)}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                30-minute call to align on strategy and package selection
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">What Happens Next:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span className="text-gray-700">
                    <span className="font-bold">Pay the discovery fee</span> - Non-refundable
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="text-gray-700">
                    <span className="font-bold">Book your call</span> - Pick a time that works for
                    you on my Calendly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <span className="text-gray-700">
                    <span className="font-bold">Select your package</span> - Choose your service
                    level and add-ons
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <span className="text-gray-700">
                    <span className="font-bold">Review the checklist</span> - Get prepared for our
                    discovery call
                  </span>
                </li>
              </ul>
            </div>

            {/* Payment Button */}
            <div className="pt-4">
              <Button
                onClick={handlePayment}
                className="w-full"
                size="lg"
                isLoading={processing}
                disabled={processing}
              >
                {processing ? 'Redirecting to payment...' : 'Pay Discovery Fee & Continue'}
              </Button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Secure payment powered by Stripe
              </p>
            </div>

            {/* Back Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                onClick={() => router.push('/intake/step-1')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to intake form
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
