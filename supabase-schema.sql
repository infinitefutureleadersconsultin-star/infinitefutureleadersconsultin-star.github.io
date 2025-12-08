-- ============================================================================
-- INFINITE FUTURE LEADERS CONSULTING - SUPABASE DATABASE SCHEMA
-- ============================================================================
-- This file contains the complete database schema for the client portal.
-- Run this in your Supabase SQL editor to set up the database.
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- Extends auth.users with additional client information
-- ============================================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  role TEXT,
  how_found_us TEXT
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- APP SUBMISSIONS TABLE
-- Stores all intake form data and workflow tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS app_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Intake Form Part 1: About You
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  role TEXT,
  how_found_us TEXT,

  -- Intake Form Part 1: About Your App
  app_name TEXT NOT NULL,
  app_store_link TEXT,
  play_store_link TEXT,
  website_url TEXT,
  app_category TEXT,
  one_liner TEXT NOT NULL,
  problem_solved TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  current_downloads TEXT,

  -- Intake Form Part 2: Service Selection
  primary_goal TEXT CHECK (primary_goal IN ('brand_awareness', 'deep_dive', 'install_campaign')),
  usage_rights BOOLEAN DEFAULT false,
  usage_rights_details TEXT,
  rush_delivery BOOLEAN DEFAULT false,
  script_approval BOOLEAN DEFAULT false,
  budget_range TEXT,
  additional_notes TEXT,

  -- Pricing locked at booking (in dollars)
  base_rate_at_booking INTEGER,
  follower_count_at_booking INTEGER,

  -- Workflow Status
  workflow_status TEXT NOT NULL DEFAULT 'intake_step_1',

  -- Timestamps
  discovery_call_paid_at TIMESTAMPTZ,
  discovery_call_scheduled_at TIMESTAMPTZ,
  deposit_paid_at TIMESTAMPTZ,
  ready_to_post_at TIMESTAMPTZ,
  video_posted_at TIMESTAMPTZ,
  final_paid_at TIMESTAMPTZ,

  -- Payment Tracking (amounts in cents)
  total_amount_cents INTEGER,
  deposit_amount_cents INTEGER,
  final_amount_cents INTEGER,
  discovery_payment_intent TEXT,
  deposit_payment_intent TEXT,
  final_payment_intent TEXT,

  -- Video Tracking (Good Faith Policy - up to 3 videos)
  videos_created_count INTEGER DEFAULT 0,
  video_1_url TEXT,
  video_1_views INTEGER,
  video_2_url TEXT,
  video_2_views INTEGER,
  video_3_url TEXT,
  video_3_views INTEGER,
  current_video_url TEXT
);

-- Enable Row Level Security
ALTER TABLE app_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for app_submissions
CREATE POLICY "Users can view own submissions"
  ON app_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON app_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON app_submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_app_submissions_updated_at
  BEFORE UPDATE ON app_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- NOTIFICATIONS TABLE
-- Logs all sent email notifications
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submission_id UUID REFERENCES app_submissions(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('ready_to_post', 'video_posted', 'payment_complete', 'discovery_reminder', 'deposit_reminder')),
  sent_to_email TEXT NOT NULL,
  email_subject TEXT,
  email_body TEXT,
  sent_successfully BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policy for notifications (admin only for now)
CREATE POLICY "Only system can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_app_submissions_user_id ON app_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_app_submissions_workflow_status ON app_submissions(workflow_status);
CREATE INDEX IF NOT EXISTS idx_app_submissions_created_at ON app_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_submission_id ON notifications(submission_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(notification_type);

-- ============================================================================
-- HELPER FUNCTION: Create profile on signup
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- Next steps:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Verify all tables were created successfully
-- 3. Check that RLS policies are enabled
-- 4. Update your .env.local with Supabase credentials
-- ============================================================================
