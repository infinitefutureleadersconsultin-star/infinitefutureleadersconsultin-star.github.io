'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase/client';
import { InlineWidget } from 'react-calendly';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { AppSubmission } from '@/types/database';

export default function BookCallPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
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
      const data = submissionDoc.data() as AppSubmission;
      setSubmissionId(submissionDoc.id);

      // Check if discovery call has already been confirmed (user clicked "I've Booked")
      // Don't redirect just because status is discovery_scheduled - they need to actually book first!
      if (data.discovery_call_scheduled_at) {
        // Already confirmed booking, redirect to next step
        router.push('/intake/step-2');
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleConfirmBooking = async () => {
    if (!submissionId) return;

    setConfirming(true);
    setError(null);

    try {
      const db = getFirebaseDb();
      const submissionRef = doc(db, 'appSubmissions', submissionId);

      // Update workflow status and timestamp
      // Move to intake_step_2 since they've now booked the call
      await updateDoc(submissionRef, {
        workflow_status: 'intake_step_2',
        discovery_call_scheduled_at: serverTimestamp(),
      });

      // Redirect to intake step 2
      router.push('/intake/step-2');
    } catch (err) {
      console.error('Error confirming booking:', err);
      setError('Failed to confirm booking. Please try again.');
      setConfirming(false);
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

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Book Your Discovery Call</h1>
          <p className="text-gray-600">
            Pick a time that works for you. We'll spend 30 minutes aligning on strategy.
          </p>
        </div>

        {/* Instructions Card */}
        <Card className="mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Before Our Call:</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>
                  Have your app ready to show (download link or demo account if needed)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Think about your primary goal (awareness, deep dive, or installs)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Be ready to discuss your target audience and what makes your app unique</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Calendly Widget */}
        <Card className="mb-8">
          <div className="min-h-[700px]">
            <InlineWidget
              url={calendlyUrl}
              styles={{
                height: '700px',
                minWidth: '100%',
              }}
            />
          </div>
        </Card>

        {/* Confirmation Section */}
        <Card>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-bold text-blue-900 mb-1">After Booking</p>
                  <p className="text-sm text-blue-700">
                    Once you've booked your call above, click the button below to continue to the
                    next step.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirmBooking}
              className="w-full"
              size="lg"
              isLoading={confirming}
              disabled={confirming}
            >
              {confirming ? 'Confirming...' : "I've Booked My Call - Continue"}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              You'll receive a calendar invite from Calendly with the meeting details.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
