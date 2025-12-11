'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { STATUS_LABELS, SERVICE_GOALS } from '@/lib/constants';
import { formatCurrency, toDollars } from '@/lib/utils/pricing';
import type { AppSubmission } from '@/types/database';

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submission, setSubmission] = useState<AppSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSubmission = async (uid: string) => {
    const db = getFirebaseDb();
    const submissionsRef = collection(db, 'appSubmissions');
    const q = query(submissionsRef, where('user_id', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      router.push('/intake/step-1');
      return null;
    }

    const submissionDoc = querySnapshot.docs[0];
    const data = { id: submissionDoc.id, ...submissionDoc.data() } as AppSubmission;
    return data;
  };

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUserId(user.uid);
      const data = await loadSubmission(user.uid);
      setSubmission(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handlePayDeposit = async () => {
    if (!submission) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create-deposit-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submission.id,
          userId: submission.user_id,
          appName: submission.app_name,
          depositAmountCents: submission.deposit_amount_cents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment session');
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message);
      setProcessing(false);
    }
  };

  const handlePayFinal = async () => {
    if (!submission) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create-final-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submission.id,
          userId: submission.user_id,
          appName: submission.app_name,
          finalAmountCents: submission.final_amount_cents,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment session');
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message);
      setProcessing(false);
    }
  };

  const handleReadyToPost = async () => {
    if (!submission) return;

    setProcessing(true);
    setError(null);

    try {
      const db = getFirebaseDb();
      const submissionRef = doc(db, 'appSubmissions', submission.id);

      await updateDoc(submissionRef, {
        workflow_status: 'ready_to_post',
        ready_to_post_at: serverTimestamp(),
      });

      // Reload submission
      if (userId) {
        const data = await loadSubmission(userId);
        setSubmission(data);
      }
    } catch (err) {
      console.error('Error marking ready:', err);
      setError('Failed to update status. Please try again.');
    } finally {
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

  if (!submission) {
    return null;
  }

  const status = submission.workflow_status;
  const statusLabel = STATUS_LABELS[status] || status;

  // Determine current step
  const getCurrentStep = () => {
    if (['intake_step_1', 'discovery_payment_pending', 'discovery_scheduled'].includes(status)) {
      return 1;
    }
    if (['intake_step_2', 'checklist'].includes(status)) {
      return 2;
    }
    if (['deposit_pending', 'deposit_paid'].includes(status)) {
      return 3;
    }
    if (['ready_to_post', 'video_posted', 'final_payment_pending'].includes(status)) {
      return 4;
    }
    if (status === 'completed') {
      return 5;
    }
    return 1;
  };

  const currentStep = getCurrentStep();

  const steps = [
    { number: 1, label: 'Discovery' },
    { number: 2, label: 'Planning' },
    { number: 3, label: 'Production' },
    { number: 4, label: 'Launch' },
    { number: 5, label: 'Complete' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Hey {submission.full_name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Here's the current status of your {submission.app_name} campaign.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-8">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <Card className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Progress</h2>
            <p className="text-primary-600 font-bold">{statusLabel}</p>
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                      step.number <= currentStep
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.number <= currentStep ? (
                      step.number === currentStep ? (
                        step.number
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )
                    ) : (
                      step.number
                    )}
                  </div>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step.number < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Action Items */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next:</h2>

              {/* Deposit Payment Pending */}
              {status === 'deposit_pending' && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Great! Now it's time to pay the 50% deposit to kick off production.
                  </p>
                  <Button
                    onClick={handlePayDeposit}
                    className="w-full"
                    size="lg"
                    isLoading={processing}
                    disabled={processing}
                  >
                    Pay {formatCurrency(toDollars(submission.deposit_amount_cents || 0), true)}{' '}
                    Deposit
                  </Button>
                </div>
              )}

              {/* Deposit Paid - Waiting for Video */}
              {status === 'deposit_paid' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-green-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-bold text-green-900">Deposit Received!</p>
                        <p className="text-sm text-green-700 mt-1">
                          I'm working on your video now. I'll notify you when it's ready for
                          review.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Estimated delivery:{' '}
                    {submission.rush_delivery ? '7 business days' : '14 business days'}
                  </p>
                </div>
              )}

              {/* Ready to Post */}
              {status === 'ready_to_post' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-bold text-blue-900">Video Ready for Review!</p>
                        <p className="text-sm text-blue-700 mt-1">
                          I've finished your video and I'm ready to post it. Click below when
                          you're ready.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleReadyToPost}
                    className="w-full"
                    size="lg"
                    isLoading={processing}
                    disabled={processing}
                  >
                    I'm Ready - Please Post! 🚀
                  </Button>
                </div>
              )}

              {/* Video Posted - Final Payment */}
              {status === 'video_posted' && (
                <div className="space-y-4">
                  <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-primary-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <div>
                        <p className="font-bold text-primary-900">Video is Live! 🎉</p>
                        <p className="text-sm text-primary-700 mt-1">
                          Your video has been posted to TikTok. Check it out below!
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handlePayFinal}
                    className="w-full"
                    size="lg"
                    isLoading={processing}
                    disabled={processing}
                  >
                    Pay Final {formatCurrency(toDollars(submission.final_amount_cents || 0), true)}
                  </Button>
                </div>
              )}

              {/* Final Payment Pending */}
              {status === 'final_payment_pending' && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Almost done! Just need the final 50% payment to complete the project.
                  </p>
                  <Button
                    onClick={handlePayFinal}
                    className="w-full"
                    size="lg"
                    isLoading={processing}
                    disabled={processing}
                  >
                    Pay Final {formatCurrency(toDollars(submission.final_amount_cents || 0), true)}
                  </Button>
                </div>
              )}

              {/* Completed */}
              {status === 'completed' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-2">
                      Project Complete! 🎉
                    </h3>
                    <p className="text-green-700">
                      Thanks for working with me. Track your video performance below!
                    </p>
                  </div>
                </div>
              )}

              {/* Discovery Call Scheduled - Book on Calendly */}
              {status === 'discovery_scheduled' && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Great! Your discovery call payment has been received. Now let's schedule a time to chat.
                  </p>
                  <Link href="/book">
                    <Button className="w-full" size="lg">
                      📅 Book Your Discovery Call
                    </Button>
                  </Link>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      After booking your call, you'll select your service package and review the pre-call checklist.
                    </p>
                  </div>
                </div>
              )}

              {/* Intake Step 2 - Select Package */}
              {status === 'intake_step_2' && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Time to select your service package and add-ons.
                  </p>
                  <Link href="/intake/step-2">
                    <Button className="w-full" size="lg">
                      Select Your Package
                    </Button>
                  </Link>
                </div>
              )}

              {/* Other Statuses - Links to next steps */}
              {status === 'checklist' && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Review the pre-call checklist to prepare for our discovery call.
                  </p>
                  <Link href="/checklist">
                    <Button className="w-full" size="lg">
                      View Pre-Call Checklist
                    </Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Quick Links */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {status === 'discovery_scheduled' && (
                  <Link
                    href="/book"
                    className="block text-primary-600 hover:text-primary-700 font-medium"
                  >
                    → Book Discovery Call
                  </Link>
                )}
                {status === 'intake_step_2' && (
                  <Link
                    href="/intake/step-2"
                    className="block text-primary-600 hover:text-primary-700 font-medium"
                  >
                    → Select Your Package
                  </Link>
                )}
                {(status === 'checklist' || status === 'discovery_scheduled' || status === 'intake_step_2') && (
                  <Link
                    href="/checklist"
                    className="block text-primary-600 hover:text-primary-700 font-medium"
                  >
                    → Pre-Call Checklist
                  </Link>
                )}
                <a
                  href="mailto:infinitefutureleadersconsultin@gmail.com"
                  className="block text-primary-600 hover:text-primary-700 font-medium"
                >
                  → Contact Support
                </a>
              </div>
            </Card>
          </div>

          {/* Right Column - Project Details */}
          <div className="space-y-6">
            {/* Project Summary */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">App Name</p>
                  <p className="text-gray-900">{submission.app_name}</p>
                </div>

                {submission.primary_goal && (
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-1">Primary Goal</p>
                    <p className="text-gray-900">
                      {SERVICE_GOALS[submission.primary_goal]?.label}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Add-ons</p>
                  <div className="flex flex-wrap gap-2">
                    {submission.usage_rights && (
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                        Usage Rights
                      </span>
                    )}
                    {submission.rush_delivery && (
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                        Rush Delivery
                      </span>
                    )}
                    {submission.script_approval && (
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
                        Script Approval
                      </span>
                    )}
                    {!submission.usage_rights &&
                      !submission.rush_delivery &&
                      !submission.script_approval && (
                        <span className="text-gray-500 text-sm">None selected</span>
                      )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Pricing Breakdown */}
            {submission.total_amount_cents && (
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Project Cost</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(toDollars(submission.total_amount_cents), true)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deposit (50%)</span>
                    <span
                      className={
                        submission.deposit_paid_at ? 'text-green-600 font-bold' : 'text-gray-900'
                      }
                    >
                      {formatCurrency(toDollars(submission.deposit_amount_cents || 0), true)}
                      {submission.deposit_paid_at && ' ✓'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Final (50%)</span>
                    <span
                      className={
                        submission.final_paid_at ? 'text-green-600 font-bold' : 'text-gray-900'
                      }
                    >
                      {formatCurrency(toDollars(submission.final_amount_cents || 0), true)}
                      {submission.final_paid_at && ' ✓'}
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* Video Performance */}
            {submission.current_video_url && (
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Video Performance</h3>
                <div className="space-y-4">
                  <div>
                    <a
                      href={submission.current_video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Watch on TikTok →
                    </a>
                  </div>

                  {submission.video_1_views !== null && (
                    <div>
                      <p className="text-sm font-bold text-gray-500 mb-1">Current Views</p>
                      <p className="text-3xl font-black text-gray-900">
                        {submission.video_1_views?.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Good Faith Policy */}
                  {submission.videos_created_count > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="font-bold text-blue-900 mb-2">Good Faith Policy</p>
                      <p className="text-sm text-blue-700">
                        Video {submission.videos_created_count} of 3. If this video doesn't hit
                        the milestone, I'll create another one.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
