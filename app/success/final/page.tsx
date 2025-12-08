'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function FinalSuccessPage() {
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
          <h1 className="text-4xl font-black text-gray-900 mb-2">Project Complete! 🎉</h1>
          <p className="text-xl text-gray-600">Thanks for working with me!</p>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Video is Live!</h2>
              <p className="text-gray-700 mb-4">
                Your content is now reaching 17K+ engaged followers on TikTok. Track the performance
                in your dashboard.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">What's Next:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>
                    <strong>Monitor performance:</strong> Check your dashboard for real-time view
                    counts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>
                    <strong>Good Faith Policy:</strong> If the video doesn't hit the milestone,
                    I'll create another one (up to 3 total)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>
                    <strong>Share the video:</strong> If you purchased usage rights, you can repost
                    it on your channels
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600">•</span>
                  <span>
                    <strong>Leave feedback:</strong> I'd love to hear how the campaign went for you
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-bold text-blue-900 mb-1">Receipt Sent</p>
                  <p className="text-sm text-blue-700">
                    Check your email for the payment receipt and project summary.
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

        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-600">
            Questions or feedback?{' '}
            <a href="mailto:infinitefutureleadersconsultin@gmail.com" className="font-bold text-primary-600 hover:text-primary-700">
              Get in touch
            </a>
          </p>
          <p className="text-gray-600">
            Want to work together again?{' '}
            <Link href="/" className="font-bold text-primary-600 hover:text-primary-700">
              Submit another app
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
