'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { APP_CATEGORIES, HOW_FOUND_US_OPTIONS, WORKFLOW_STATUSES } from '@/lib/constants';
import type { AppSubmission } from '@/types/database';

export default function IntakeStep1Page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Client Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [howFoundUs, setHowFoundUs] = useState('');

  // App Info
  const [appName, setAppName] = useState('');
  const [appStoreLink, setAppStoreLink] = useState('');
  const [playStoreLink, setPlayStoreLink] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [appCategory, setAppCategory] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [problemSolved, setProblemSolved] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [currentDownloads, setCurrentDownloads] = useState('');

  const [error, setError] = useState<string | null>(null);

  // Initialize auth and load existing submission
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUserId(user.uid);
      setEmail(user.email || '');

      // Load existing submission
      const db = getFirebaseDb();
      const submissionsRef = collection(db, 'appSubmissions');
      const q = query(submissionsRef, where('user_id', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Load existing submission
        const submissionDoc = querySnapshot.docs[0];
        const data = submissionDoc.data() as AppSubmission;
        setSubmissionId(submissionDoc.id);

        // Populate form fields
        setFullName(data.full_name || '');
        setCompanyName(data.company_name || '');
        setRole(data.role || '');
        setHowFoundUs(data.how_found_us || '');
        setAppName(data.app_name || '');
        setAppStoreLink(data.app_store_link || '');
        setPlayStoreLink(data.play_store_link || '');
        setWebsiteUrl(data.website_url || '');
        setAppCategory(data.app_category || '');
        setOneLiner(data.one_liner || '');
        setProblemSolved(data.problem_solved || '');
        setTargetAudience(data.target_audience || '');
        setCurrentDownloads(data.current_downloads || '');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Auto-save functionality (debounced 1 second)
  const saveSubmission = useCallback(async () => {
    if (!userId) return;

    setSaving(true);
    const db = getFirebaseDb();

    try {
      const submissionData = {
        user_id: userId,
        full_name: fullName,
        email,
        company_name: companyName || null,
        role: role || null,
        how_found_us: howFoundUs || null,
        app_name: appName,
        app_store_link: appStoreLink || null,
        play_store_link: playStoreLink || null,
        website_url: websiteUrl || null,
        app_category: appCategory || null,
        one_liner: oneLiner,
        problem_solved: problemSolved,
        target_audience: targetAudience,
        current_downloads: currentDownloads || null,
        updated_at: serverTimestamp(),
      };

      if (submissionId) {
        // Update existing submission
        const submissionRef = doc(db, 'appSubmissions', submissionId);
        await updateDoc(submissionRef, submissionData);
      } else {
        // Create new submission
        const newSubmission = {
          ...submissionData,
          created_at: serverTimestamp(),
          workflow_status: WORKFLOW_STATUSES.INTAKE_STEP_1,
          primary_goal: null,
          usage_rights: false,
          usage_rights_details: null,
          rush_delivery: false,
          script_approval: false,
          budget_range: null,
          additional_notes: null,
          base_rate_at_booking: null,
          follower_count_at_booking: null,
          discovery_call_paid_at: null,
          discovery_call_scheduled_at: null,
          deposit_paid_at: null,
          ready_to_post_at: null,
          video_posted_at: null,
          final_paid_at: null,
          total_amount_cents: null,
          deposit_amount_cents: null,
          final_amount_cents: null,
          discovery_payment_intent: null,
          deposit_payment_intent: null,
          final_payment_intent: null,
          videos_created_count: 0,
          video_1_url: null,
          video_1_views: null,
          video_2_url: null,
          video_2_views: null,
          video_3_url: null,
          video_3_views: null,
          current_video_url: null,
        };

        const docRef = await addDoc(collection(db, 'appSubmissions'), newSubmission);
        setSubmissionId(docRef.id);
      }

      setLastSaved(new Date());
      setError(null);
    } catch (err) {
      console.error('Auto-save error:', err);
      setError('Failed to save. Please check your connection.');
    } finally {
      setSaving(false);
    }
  }, [
    userId,
    submissionId,
    fullName,
    email,
    companyName,
    role,
    howFoundUs,
    appName,
    appStoreLink,
    playStoreLink,
    websiteUrl,
    appCategory,
    oneLiner,
    problemSolved,
    targetAudience,
    currentDownloads,
  ]);

  // Debounced auto-save (1 second delay)
  useEffect(() => {
    if (!userId || loading) return;

    const timeoutId = setTimeout(() => {
      saveSubmission();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    userId,
    loading,
    fullName,
    email,
    companyName,
    role,
    howFoundUs,
    appName,
    appStoreLink,
    playStoreLink,
    websiteUrl,
    appCategory,
    oneLiner,
    problemSolved,
    targetAudience,
    currentDownloads,
    saveSubmission,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName || !email || !appName || !oneLiner || !problemSolved || !targetAudience) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!appStoreLink && !playStoreLink && !websiteUrl) {
      setError('Please provide at least one link (App Store, Play Store, or Website).');
      return;
    }

    // Save one final time before proceeding
    await saveSubmission();

    // Navigate to discovery payment page
    router.push('/payment/discovery');
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Tell Me About Your App</h1>
          <p className="text-gray-600">
            This helps me understand your product and prepare for our discovery call.
          </p>
          {lastSaved && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Auto-saved {lastSaved.toLocaleTimeString()}
            </p>
          )}
          {saving && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
        </div>

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* About You */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About You</h2>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled
                  helperText="From your account"
                />

                <Input
                  label="Company Name (Optional)"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Inc."
                />

                <Input
                  label="Your Role (Optional)"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Founder, Product Manager, etc."
                />

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    How Did You Find Me? (Optional)
                  </label>
                  <select
                    value={howFoundUs}
                    onChange={(e) => setHowFoundUs(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select one...</option>
                    {HOW_FOUND_US_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* About Your App */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Your App</h2>
              <div className="space-y-4">
                <Input
                  label="App Name"
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="TaskFlow"
                  required
                />

                <Input
                  label="App Store Link (iOS)"
                  type="url"
                  value={appStoreLink}
                  onChange={(e) => setAppStoreLink(e.target.value)}
                  placeholder="https://apps.apple.com/..."
                  helperText="At least one link (App Store, Play Store, or Website) is required"
                />

                <Input
                  label="Play Store Link (Android)"
                  type="url"
                  value={playStoreLink}
                  onChange={(e) => setPlayStoreLink(e.target.value)}
                  placeholder="https://play.google.com/..."
                />

                <Input
                  label="Website URL"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourapp.com"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    App Category (Optional)
                  </label>
                  <select
                    value={appCategory}
                    onChange={(e) => setAppCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a category...</option>
                    {APP_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    One-Liner Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={oneLiner}
                    onChange={(e) => setOneLiner(e.target.value)}
                    placeholder="E.g., A productivity app that helps developers track their time."
                    maxLength={100}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                  <p className="text-sm text-gray-500">{oneLiner.length}/100 characters</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    What Problem Does It Solve? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={problemSolved}
                    onChange={(e) => setProblemSolved(e.target.value)}
                    placeholder="Describe the problem your app solves and how it helps users..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    Who's Your Target Audience? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="E.g., Freelance developers, software engineers at startups, etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <Input
                  label="Current Downloads/Users (Optional)"
                  type="text"
                  value={currentDownloads}
                  onChange={(e) => setCurrentDownloads(e.target.value)}
                  placeholder="E.g., 10K downloads, 500 active users, just launched, etc."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" fullWidth size="lg">
                Continue to Discovery Call Payment
              </Button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Your progress is auto-saved every second.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
