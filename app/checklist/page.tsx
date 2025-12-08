'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import type { AppSubmission } from '@/types/database';

export default function ChecklistPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submission, setSubmission] = useState<AppSubmission | null>(null);
  const [loading, setLoading] = useState(true);

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
        router.push('/intake/step-1');
        return;
      }

      const submissionDoc = querySnapshot.docs[0];
      const data = { id: submissionDoc.id, ...submissionDoc.data() } as AppSubmission;
      setSubmission(data);

      // Check if user should be on this step
      if (data.workflow_status === 'intake_step_2' || !data.primary_goal) {
        router.push('/intake/step-2');
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

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

  const checklistItems = [
    {
      title: 'Have Your App Ready to Demo',
      description:
        'Make sure your app is downloaded and ready to show. If it requires login, have test credentials ready.',
      icon: '📱',
    },
    {
      title: 'Know Your Unique Value Proposition',
      description:
        'Be ready to explain what makes your app different from competitors in 1-2 sentences.',
      icon: '💡',
    },
    {
      title: 'Understand Your Target Audience',
      description:
        'Who are the ideal users? What problem are they trying to solve when they find your app?',
      icon: '🎯',
    },
    {
      title: 'Identify Key Features to Highlight',
      description:
        "Pick 2-3 features you want me to focus on. Don't try to show everything - less is more.",
      icon: '⭐',
    },
    {
      title: 'Share Your Success Metrics',
      description:
        'Do you have any testimonials, download numbers, or user feedback that shows traction?',
      icon: '📊',
    },
    {
      title: 'Think About Your Call to Action',
      description:
        'What do you want viewers to do? Download? Visit website? Sign up for waitlist?',
      icon: '🚀',
    },
    {
      title: 'Prepare Any Visual Assets',
      description:
        'If you have screenshots, demo videos, or branding guidelines, have them handy to share.',
      icon: '🎨',
    },
    {
      title: 'Set Realistic Expectations',
      description:
        "TikTok is unpredictable. I'll do my best, but views aren't guaranteed. Focus on the quality of exposure.",
      icon: '✅',
    },
  ];

  const callReminders = [
    'Join from a quiet location with stable internet',
    'Have your app open and ready to screenshare',
    'Budget 30-45 minutes (I usually go over to make sure we cover everything)',
    'Come with questions - this is your time to ask anything',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Pre-Call Checklist</h1>
          <p className="text-gray-600">
            Get the most out of our discovery call by preparing these items in advance.
          </p>
        </div>

        {/* Checklist Items */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {checklistItems.map((item, index) => (
            <Card key={index} hover>
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call Day Reminders */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">On Call Day:</h2>
          <ul className="space-y-3">
            {callReminders.map((reminder, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">{reminder}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* What Happens After */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens After the Call:</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-primary-50 rounded-xl">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Deposit Payment</h3>
                <p className="text-gray-600 text-sm">
                  I'll send you a link to pay the 50% deposit. This kicks off production.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Content Creation</h3>
                <p className="text-gray-600 text-sm">
                  I'll create your video. If you selected script approval, you'll review before
                  filming.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Review & Post</h3>
                <p className="text-gray-600 text-sm">
                  You'll review the final video. Once approved, I'll post it to TikTok.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Final Payment & Results</h3>
                <p className="text-gray-600 text-sm">
                  Pay the remaining 50%. Track your video performance in the dashboard.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            You can return to this checklist anytime from your dashboard.
          </p>
        </div>

        {/* Support */}
        <p className="text-center text-gray-600 mt-8">
          Questions before the call?{' '}
          <a
            href="mailto:infinitefutureleadersconsultin@gmail.com"
            className="font-bold text-primary-600 hover:text-primary-700"
          >
            Email me
          </a>
        </p>
      </div>
    </div>
  );
}
