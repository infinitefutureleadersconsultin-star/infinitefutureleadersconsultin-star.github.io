'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  SERVICE_GOALS,
  CURRENT_FOLLOWERS,
  ADD_ON_PRICES,
  BUDGET_RANGES,
} from '@/lib/constants';
import {
  getBaseRate,
  calculateTotal,
  calculateDeposit,
  calculateFinal,
  toCents,
  formatCurrency,
} from '@/lib/utils/pricing';
import type { AppSubmission, PrimaryGoal } from '@/types/database';

export default function IntakeStep2Page() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Service selections
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal | ''>('');
  const [usageRights, setUsageRights] = useState(false);
  const [usageRightsDetails, setUsageRightsDetails] = useState('');
  const [rushDelivery, setRushDelivery] = useState(false);
  const [scriptApproval, setScriptApproval] = useState(false);
  const [budgetRange, setBudgetRange] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Pricing calculations
  const baseRate = getBaseRate(CURRENT_FOLLOWERS);
  const total = calculateTotal({
    usageRights,
    rushDelivery,
    scriptApproval,
    followerCount: CURRENT_FOLLOWERS,
  });
  const deposit = calculateDeposit(total);
  const final = calculateFinal(total, deposit);

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
      const data = submissionDoc.data() as AppSubmission;
      setSubmissionId(submissionDoc.id);

      // Check if user should be on this step
      if (data.workflow_status === 'intake_step_1' || !data.discovery_call_scheduled_at) {
        router.push('/book');
        return;
      }

      // Load existing selections
      if (data.primary_goal) setPrimaryGoal(data.primary_goal);
      if (data.usage_rights) setUsageRights(data.usage_rights);
      if (data.usage_rights_details) setUsageRightsDetails(data.usage_rights_details);
      if (data.rush_delivery) setRushDelivery(data.rush_delivery);
      if (data.script_approval) setScriptApproval(data.script_approval);
      if (data.budget_range) setBudgetRange(data.budget_range);
      if (data.additional_notes) setAdditionalNotes(data.additional_notes);

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!primaryGoal) {
      setError('Please select your primary goal.');
      return;
    }

    if (!submissionId) return;

    setSaving(true);
    setError(null);

    try {
      const db = getFirebaseDb();
      const submissionRef = doc(db, 'appSubmissions', submissionId);

      // Update submission with service selections and locked pricing
      await updateDoc(submissionRef, {
        primary_goal: primaryGoal,
        usage_rights: usageRights,
        usage_rights_details: usageRights ? usageRightsDetails : null,
        rush_delivery: rushDelivery,
        script_approval: scriptApproval,
        budget_range: budgetRange || null,
        additional_notes: additionalNotes || null,
        // Lock in pricing at booking time
        base_rate_at_booking: baseRate,
        follower_count_at_booking: CURRENT_FOLLOWERS,
        total_amount_cents: toCents(total),
        deposit_amount_cents: toCents(deposit),
        final_amount_cents: toCents(final),
        // Update workflow status
        workflow_status: 'checklist',
      });

      // Redirect to checklist
      router.push('/checklist');
    } catch (err) {
      console.error('Error saving selections:', err);
      setError('Failed to save. Please try again.');
      setSaving(false);
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Select Your Package</h1>
          <p className="text-gray-600">
            Choose your service level and add-ons. Pricing locks in at booking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Primary Goal Selection */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What's Your Primary Goal? <span className="text-red-500">*</span>
            </h2>
            <div className="space-y-4">
              {Object.entries(SERVICE_GOALS).map(([key, goal]) => (
                <label
                  key={key}
                  className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    primaryGoal === key
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="primaryGoal"
                      value={key}
                      checked={primaryGoal === key}
                      onChange={(e) => setPrimaryGoal(e.target.value as PrimaryGoal)}
                      className="mt-1 w-5 h-5 text-primary-600"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{goal.label}</h3>
                      <p className="text-gray-600 mb-2">{goal.description}</p>
                      <p className="text-sm font-medium text-primary-600">{goal.milestone}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Add-ons */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Optional Add-ons</h2>
            <div className="space-y-4">
              {/* Usage Rights */}
              <label className="block p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={usageRights}
                    onChange={(e) => setUsageRights(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Usage Rights</h3>
                      <span className="text-xl font-black text-primary-600">
                        +{formatCurrency(ADD_ON_PRICES.usageRights)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Reuse the video in your marketing (website, ads, social media, etc.)
                    </p>
                    {usageRights && (
                      <textarea
                        value={usageRightsDetails}
                        onChange={(e) => setUsageRightsDetails(e.target.value)}
                        placeholder="How do you plan to use the content? (Optional)"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      />
                    )}
                  </div>
                </div>
              </label>

              {/* Rush Delivery */}
              <label className="block p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={rushDelivery}
                    onChange={(e) => setRushDelivery(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Rush Delivery</h3>
                      <span className="text-xl font-black text-primary-600">
                        +{formatCurrency(ADD_ON_PRICES.rushDelivery)}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      7-day turnaround instead of standard 14 days
                    </p>
                  </div>
                </div>
              </label>

              {/* Script Approval */}
              <label className="block p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={scriptApproval}
                    onChange={(e) => setScriptApproval(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Script Approval</h3>
                      <span className="text-xl font-black text-primary-600">
                        +{formatCurrency(ADD_ON_PRICES.scriptApproval)}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Review and approve the script before I film the video
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </Card>

          {/* Budget and Notes */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Info</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your budget range...</option>
                  {BUDGET_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Helps me understand your expectations and constraints
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Anything else I should know? Special requests, concerns, deadlines, etc."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          </Card>

          {/* Pricing Summary */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Pricing</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">
                  Base Rate ({CURRENT_FOLLOWERS.toLocaleString()} followers)
                </span>
                <span className="font-bold text-gray-900">{formatCurrency(baseRate)}</span>
              </div>

              {usageRights && (
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Usage Rights</span>
                  <span className="font-bold text-gray-900">
                    +{formatCurrency(ADD_ON_PRICES.usageRights)}
                  </span>
                </div>
              )}

              {rushDelivery && (
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Rush Delivery</span>
                  <span className="font-bold text-gray-900">
                    +{formatCurrency(ADD_ON_PRICES.rushDelivery)}
                  </span>
                </div>
              )}

              {scriptApproval && (
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Script Approval</span>
                  <span className="font-bold text-gray-900">
                    +{formatCurrency(ADD_ON_PRICES.scriptApproval)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-4 bg-primary-50 rounded-xl px-6">
                <span className="text-xl font-bold text-gray-900">Total Project Cost</span>
                <span className="text-3xl font-black text-primary-600">
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-bold text-blue-900 mb-2">Payment Structure:</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• {formatCurrency(deposit)} deposit (50%) to start production</li>
                  <li>• {formatCurrency(final)} final payment (50%) when video is posted</li>
                </ul>
                <p className="text-xs text-blue-600 mt-3">
                  This pricing is locked in at booking. Won't change even if my follower count
                  increases.
                </p>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg" isLoading={saving} disabled={saving}>
              {saving ? 'Saving...' : 'Continue to Pre-Call Checklist'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
