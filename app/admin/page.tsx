'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, getDocs, updateDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase/client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { STATUS_LABELS } from '@/lib/constants';
import { formatDate } from '@/lib/utils/formatting';
import { formatCurrency, toDollars } from '@/lib/utils/pricing';
import type { AppSubmission } from '@/types/database';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<AppSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<AppSubmission | null>(null);
  const [showMarkCompleteModal, setShowMarkCompleteModal] = useState(false);
  const [showPostVideoModal, setShowPostVideoModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states for modals
  const [videoUrl, setVideoUrl] = useState('');
  const [videoViews, setVideoViews] = useState('');

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Check if user is admin
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'infinitefutureleadersconsultin@gmail.com';
      if (user.email !== adminEmail) {
        router.push('/dashboard');
        return;
      }

      // Load all submissions
      await loadSubmissions();
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loadSubmissions = async () => {
    const db = getFirebaseDb();
    const submissionsRef = collection(db, 'appSubmissions');
    const q = query(submissionsRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AppSubmission[];

    setSubmissions(data);
  };

  const handleMarkDiscoveryComplete = async (submission: AppSubmission) => {
    setProcessing(true);
    setError(null);

    try {
      const db = getFirebaseDb();
      const submissionRef = doc(db, 'appSubmissions', submission.id);

      await updateDoc(submissionRef, {
        workflow_status: 'deposit_pending',
      });

      await loadSubmissions();
      setShowMarkCompleteModal(false);
      setSelectedSubmission(null);
    } catch (err) {
      console.error('Error marking discovery complete:', err);
      setError('Failed to update status. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePostVideo = async () => {
    if (!selectedSubmission || !videoUrl) {
      setError('Please provide a video URL.');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const db = getFirebaseDb();
      const submissionRef = doc(db, 'appSubmissions', selectedSubmission.id);

      const videosCreated = selectedSubmission.videos_created_count + 1;
      const views = videoViews ? parseInt(videoViews, 10) : null;

      const updateData: any = {
        workflow_status: 'video_posted',
        video_posted_at: serverTimestamp(),
        videos_created_count: videosCreated,
        current_video_url: videoUrl,
      };

      // Set the appropriate video URL and views fields
      if (videosCreated === 1) {
        updateData.video_1_url = videoUrl;
        updateData.video_1_views = views;
      } else if (videosCreated === 2) {
        updateData.video_2_url = videoUrl;
        updateData.video_2_views = views;
      } else if (videosCreated === 3) {
        updateData.video_3_url = videoUrl;
        updateData.video_3_views = views;
      }

      await updateDoc(submissionRef, updateData);

      await loadSubmissions();
      setShowPostVideoModal(false);
      setSelectedSubmission(null);
      setVideoUrl('');
      setVideoViews('');
    } catch (err) {
      console.error('Error posting video:', err);
      setError('Failed to post video. Please try again.');
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all client submissions and campaigns.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-8">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Total Submissions</p>
              <p className="text-4xl font-black text-gray-900">{submissions.length}</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">In Production</p>
              <p className="text-4xl font-black text-primary-600">
                {submissions.filter((s) => s.workflow_status === 'deposit_paid').length}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Posted</p>
              <p className="text-4xl font-black text-green-600">
                {submissions.filter((s) => s.workflow_status === 'video_posted' || s.workflow_status === 'completed').length}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Completed</p>
              <p className="text-4xl font-black text-gray-900">
                {submissions.filter((s) => s.workflow_status === 'completed').length}
              </p>
            </div>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Submissions</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">App Name</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Client</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Total</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Deposit</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Final</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-900 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-gray-900">{submission.app_name}</p>
                        {submission.current_video_url && (
                          <a
                            href={submission.current_video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700"
                          >
                            View Video →
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-gray-900 text-sm">{submission.full_name}</p>
                        <p className="text-gray-500 text-xs">{submission.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                        {STATUS_LABELS[submission.workflow_status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {submission.total_amount_cents
                        ? formatCurrency(toDollars(submission.total_amount_cents), true)
                        : '-'}
                    </td>
                    <td className="py-3 px-4">
                      {submission.deposit_paid_at ? (
                        <span className="text-green-600 text-sm font-bold">✓ Paid</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {submission.final_paid_at ? (
                        <span className="text-green-600 text-sm font-bold">✓ Paid</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {/* Mark Discovery Complete */}
                        {submission.workflow_status === 'checklist' && (
                          <button
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setShowMarkCompleteModal(true);
                            }}
                            className="text-xs px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                          >
                            Mark Complete
                          </button>
                        )}

                        {/* Post Video */}
                        {(submission.workflow_status === 'deposit_paid' ||
                          submission.workflow_status === 'ready_to_post') && (
                          <button
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setShowPostVideoModal(true);
                            }}
                            className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Post Video
                          </button>
                        )}

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mark Discovery Complete Modal */}
        {showMarkCompleteModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-lg w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mark Discovery Call Complete
              </h3>
              <p className="text-gray-700 mb-6">
                This will update the status to "Deposit Pending" and allow the client to pay their
                deposit. Are you sure the discovery call is complete?
              </p>
              <p className="text-sm text-gray-600 mb-6">
                <strong>Client:</strong> {selectedSubmission.full_name}
                <br />
                <strong>App:</strong> {selectedSubmission.app_name}
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleMarkDiscoveryComplete(selectedSubmission)}
                  isLoading={processing}
                  disabled={processing}
                >
                  Yes, Mark Complete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowMarkCompleteModal(false);
                    setSelectedSubmission(null);
                  }}
                  disabled={processing}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Post Video Modal */}
        {showPostVideoModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-lg w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Post Video</h3>
              <p className="text-gray-700 mb-6">
                Enter the TikTok URL for {selectedSubmission.app_name}'s video.
              </p>
              <div className="space-y-4 mb-6">
                <Input
                  label="Video URL"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://tiktok.com/@zaydevelops/video/..."
                  required
                />
                <Input
                  label="Initial Views (Optional)"
                  type="number"
                  value={videoViews}
                  onChange={(e) => setVideoViews(e.target.value)}
                  placeholder="e.g., 1000"
                />
                <p className="text-xs text-gray-500">
                  This is video {selectedSubmission.videos_created_count + 1} of 3 (Good Faith
                  Policy)
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handlePostVideo}
                  isLoading={processing}
                  disabled={processing || !videoUrl}
                >
                  Post Video
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPostVideoModal(false);
                    setSelectedSubmission(null);
                    setVideoUrl('');
                    setVideoViews('');
                  }}
                  disabled={processing}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Details Modal */}
        {selectedSubmission && !showMarkCompleteModal && !showPostVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-bold text-gray-500 mb-1">App Name</p>
                  <p className="text-gray-900">{selectedSubmission.app_name}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-500 mb-1">Client</p>
                  <p className="text-gray-900">{selectedSubmission.full_name}</p>
                  <p className="text-gray-600">{selectedSubmission.email}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-500 mb-1">One-Liner</p>
                  <p className="text-gray-900">{selectedSubmission.one_liner}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-500 mb-1">Problem Solved</p>
                  <p className="text-gray-900">{selectedSubmission.problem_solved}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-500 mb-1">Target Audience</p>
                  <p className="text-gray-900">{selectedSubmission.target_audience}</p>
                </div>
                {selectedSubmission.app_store_link && (
                  <div>
                    <p className="font-bold text-gray-500 mb-1">App Store</p>
                    <a
                      href={selectedSubmission.app_store_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {selectedSubmission.app_store_link}
                    </a>
                  </div>
                )}
                {selectedSubmission.play_store_link && (
                  <div>
                    <p className="font-bold text-gray-500 mb-1">Play Store</p>
                    <a
                      href={selectedSubmission.play_store_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {selectedSubmission.play_store_link}
                    </a>
                  </div>
                )}
                {selectedSubmission.additional_notes && (
                  <div>
                    <p className="font-bold text-gray-500 mb-1">Additional Notes</p>
                    <p className="text-gray-900">{selectedSubmission.additional_notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button variant="outline" onClick={() => setSelectedSubmission(null)} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
