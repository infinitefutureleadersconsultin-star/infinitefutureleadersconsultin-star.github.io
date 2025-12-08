import { Suspense } from 'react';
import DiscoverySuccessContent from './DiscoverySuccessContent';

// Force dynamic rendering since this page uses search params from Stripe redirect
export const dynamic = 'force-dynamic';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function DiscoverySuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DiscoverySuccessContent />
    </Suspense>
  );
}
