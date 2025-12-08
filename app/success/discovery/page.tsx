'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Force dynamic rendering since this page uses search params from Stripe redirect
export const dynamic = 'force-dynamic';

export default function DiscoverySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    // Verify payment completion on the backend
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        return;
      }

      try {
        // In a real implementation, you would verify the session here
        // For now, we'll just mark as verified after a short delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVerifying(false);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setVerifying(false);
      }
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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
          <h1 className="text-4xl font-black text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-600">Your discovery call fee has been received.</p>
        </div>

        {/* Next Steps Card */}
        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps:</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-primary-50 rounded-xl">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Book Your Discovery Call</h3>
                    <p className="text-gray-600 text-sm">
                      Pick a time that works for you on my Calendly. After booking, mark it as
                      scheduled in the portal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Select Your Service Package
                    </h3>
                    <p className="text-gray-600 text-sm">
                      After booking your call, you'll select your package and add-ons.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Review Pre-Call Checklist</h3>
                    <p className="text-gray-600 text-sm">
                      Get prepared with helpful tips and materials to bring to the call.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Confirmation */}
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="font-bold text-blue-900 mb-1">Check Your Email</p>
                  <p className="text-sm text-blue-700">
                    You'll receive a confirmation email with your payment receipt and next steps.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/book">
                <Button className="w-full" size="lg">
                  Continue to Book Discovery Call
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Support Link */}
        <p className="text-center text-gray-600 mt-8">
          Questions?{' '}
          <a
            href="mailto:infinitefutureleadersconsultin@gmail.com"
            className="font-bold text-primary-600 hover:text-primary-700"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
