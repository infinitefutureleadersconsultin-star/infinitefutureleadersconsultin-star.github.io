/**
 * Database types for Firestore collections
 *
 * Firestore conventions:
 * - Use camelCase for field names
 * - Timestamps are Firebase Timestamp objects (converted to Date in code)
 * - Document IDs are auto-generated or use Firebase Auth UID
 */

import type { Timestamp } from 'firebase/firestore';

export type WorkflowStatus =
  | 'intake_step_1'
  | 'discovery_payment_pending'
  | 'discovery_scheduled'
  | 'intake_step_2'
  | 'checklist'
  | 'deposit_pending'
  | 'deposit_paid'
  | 'ready_to_post'
  | 'video_posted'
  | 'final_payment_pending'
  | 'completed';

export type PrimaryGoal = 'brand_awareness' | 'deep_dive' | 'install_campaign';

export type NotificationType = 'ready_to_post' | 'video_posted' | 'payment_complete';

export interface Profile {
  id: string; // Firebase Auth UID (document ID)
  created_at: Timestamp | Date;
  email: string;
  full_name: string | null;
  company_name: string | null;
  role: string | null;
  how_found_us: string | null;
}

export interface AppSubmission {
  id: string; // Auto-generated document ID
  user_id: string; // References Profile document ID (Firebase Auth UID)
  created_at: Timestamp | Date;
  updated_at: Timestamp | Date;

  // About You (Intake Step 1)
  full_name: string;
  email: string;
  company_name: string | null;
  role: string | null;
  how_found_us: string | null;

  // About Your App (Intake Step 1)
  app_name: string;
  app_store_link: string | null;
  play_store_link: string | null;
  website_url: string | null;
  app_category: string | null;
  one_liner: string;
  problem_solved: string;
  target_audience: string;
  current_downloads: string | null;

  // Service Selection (Intake Step 2)
  primary_goal: PrimaryGoal | null;
  usage_rights: boolean;
  usage_rights_details: string | null;
  rush_delivery: boolean;
  script_approval: boolean;
  budget_range: string | null;
  additional_notes: string | null;

  // Pricing locked at booking
  base_rate_at_booking: number | null; // In dollars
  follower_count_at_booking: number | null;

  // Workflow Status
  workflow_status: WorkflowStatus;

  // Timestamps
  discovery_call_paid_at: Timestamp | Date | null;
  discovery_call_scheduled_at: Timestamp | Date | null;
  deposit_paid_at: Timestamp | Date | null;
  ready_to_post_at: Timestamp | Date | null;
  video_posted_at: Timestamp | Date | null;
  final_paid_at: Timestamp | Date | null;

  // Payment Tracking (amounts in cents)
  total_amount_cents: number | null;
  deposit_amount_cents: number | null;
  final_amount_cents: number | null;
  discovery_payment_intent: string | null;
  deposit_payment_intent: string | null;
  final_payment_intent: string | null;

  // Video Tracking (Good Faith Policy)
  videos_created_count: number;
  video_1_url: string | null;
  video_1_views: number | null;
  video_2_url: string | null;
  video_2_views: number | null;
  video_3_url: string | null;
  video_3_views: number | null;
  current_video_url: string | null;
}

export interface Notification {
  id: string; // Auto-generated document ID
  created_at: Timestamp | Date;
  submission_id: string | null; // References AppSubmission document ID
  notification_type: NotificationType;
  sent_to_email: string;
  email_subject: string | null;
  email_body: string | null;
  sent_successfully: boolean;
}

// Database insert types (omit auto-generated fields)
export type ProfileInsert = Omit<Profile, 'id' | 'created_at'>;
export type AppSubmissionInsert = Omit<AppSubmission, 'id' | 'created_at' | 'updated_at'>;
export type NotificationInsert = Omit<Notification, 'id' | 'created_at'>;

// Database update types (all fields optional except id)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>;
export type AppSubmissionUpdate = Partial<
  Omit<AppSubmission, 'id' | 'created_at' | 'updated_at'>
>;
export type NotificationUpdate = Partial<Omit<Notification, 'id' | 'created_at'>>;
