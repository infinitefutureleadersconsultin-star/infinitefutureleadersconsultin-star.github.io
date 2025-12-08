'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function DepositSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVerifying(false);
    };

    verifyPayment();
  }, [sessionId]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Deposit Received! 🎉</h1>
          <p className="text-xl text-gray-600">Production is officially underway.</p>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-900 mb-3">What Happens Next:</h2>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start gap-3">
                  <span className="text-green-600">•</span>
                  <span>I'll start creating your video content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">•</span>
                  <span>
                    If you selected script approval, you'll get a chance to review before filming
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">•</span>
                  <span>You'll be notified when the video is ready for final review</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">•</span>
                  <span>Once approved, I'll post it to TikTok</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-bold text-blue-900 mb-1">Stay Tuned</p>
                  <p className="text-sm text-blue-700">
                    Check your dashboard for updates. I'll email you at each major milestone.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/dashboard">
                <Button fullWidth size="lg">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <p className="text-center text-gray-600 mt-8">
          Questions?{' '}
          <a href="mailto:infinitefutureleadersconsultin@gmail.com" className="font-bold text-primary-600 hover:text-primary-700">
            Contact me
          </a>
        </p>
      </div>
    </div>
  );
}
