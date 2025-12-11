'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const auth = getFirebaseAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set auth cookie for middleware
      const idToken = await user.getIdToken();
      document.cookie = `__session=${idToken}; path=/; max-age=3600; secure; samesite=strict`;

      // Check if user is admin and redirect accordingly
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infinitefutureleadersconsultin@gmail.com';
      if (user.email === adminEmail) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);

      // Firebase auth error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError('Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to access your dashboard.</p>
        </div>

        {/* Login Form */}
        <Card>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <Button type="submit" className="w-full" isLoading={loading}>
              Log In
            </Button>
          </form>

          {/* Password Reset Link (Future Feature) */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              onClick={() => alert('Password reset feature coming soon. Please contact support.')}
            >
              Forgot your password?
            </button>
          </div>
        </Card>

        {/* Signup Link */}
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-bold text-primary-600 hover:text-primary-700">
            Create one
          </Link>
        </p>

        {/* Back to Home */}
        <p className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
