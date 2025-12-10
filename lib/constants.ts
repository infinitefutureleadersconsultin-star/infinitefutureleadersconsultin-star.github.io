// Follower count tiers and base rates (in dollars)
export const FOLLOWER_TIERS = [
  { min: 0, max: 50000, rate: 500 },
  { min: 50000, max: 100000, rate: 2000 },
  { min: 100000, max: 500000, rate: 5000 },
  { min: 500000, max: 1000000, rate: 10000 },
  { min: 1000000, max: Infinity, rate: 20000 },
] as const;

// Current follower count (update this as you grow)
export const CURRENT_FOLLOWERS = parseInt(
  process.env.CURRENT_FOLLOWERS || '17000',
  10
);

// Add-on prices (in dollars)
export const ADD_ON_PRICES = {
  usageRights: 500,
  rushDelivery: 200,
  scriptApproval: 150,
} as const;

// Discovery call fee (in dollars)
export const DISCOVERY_CALL_FEE = 50;

// Service goals and their milestones
export const SERVICE_GOALS = {
  brand_awareness: {
    label: 'Brand Awareness',
    description: 'Get your app name and concept in front of my audience',
    milestone: '5,000 views minimum',
  },
  deep_dive: {
    label: 'Deep Dive Review',
    description: 'Thorough walkthrough showing features and honest opinion',
    milestone: '3,000 views minimum + 50 comments',
  },
  install_campaign: {
    label: 'Install Campaign',
    description: 'Content designed to drive downloads with clear calls to action',
    milestone: '2,000 views minimum + trackable link clicks',
  },
} as const;

// Workflow statuses
export const WORKFLOW_STATUSES = {
  INTAKE_STEP_1: 'intake_step_1',
  DISCOVERY_PAYMENT_PENDING: 'discovery_payment_pending',
  DISCOVERY_SCHEDULED: 'discovery_scheduled',
  INTAKE_STEP_2: 'intake_step_2',
  CHECKLIST: 'checklist',
  DEPOSIT_PENDING: 'deposit_pending',
  DEPOSIT_PAID: 'deposit_paid',
  READY_TO_POST: 'ready_to_post',
  VIDEO_POSTED: 'video_posted',
  FINAL_PAYMENT_PENDING: 'final_payment_pending',
  COMPLETED: 'completed',
} as const;

// Status labels for display
export const STATUS_LABELS: Record<string, string> = {
  [WORKFLOW_STATUSES.INTAKE_STEP_1]: 'Getting Started',
  [WORKFLOW_STATUSES.DISCOVERY_PAYMENT_PENDING]: 'Discovery Call Payment',
  [WORKFLOW_STATUSES.DISCOVERY_SCHEDULED]: 'Discovery Call Scheduled',
  [WORKFLOW_STATUSES.INTAKE_STEP_2]: 'Service Selection',
  [WORKFLOW_STATUSES.CHECKLIST]: 'Pre-Call Checklist',
  [WORKFLOW_STATUSES.DEPOSIT_PENDING]: 'Deposit Payment',
  [WORKFLOW_STATUSES.DEPOSIT_PAID]: 'Deposit Paid',
  [WORKFLOW_STATUSES.READY_TO_POST]: 'Ready to Post',
  [WORKFLOW_STATUSES.VIDEO_POSTED]: 'Video Posted',
  [WORKFLOW_STATUSES.FINAL_PAYMENT_PENDING]: 'Final Payment',
  [WORKFLOW_STATUSES.COMPLETED]: 'Completed',
};

// Budget ranges
export const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  'Over $10,000 (Enterprise)',
] as const;

// App categories
export const APP_CATEGORIES = [
  'Productivity',
  'Health & Fitness',
  'Finance',
  'Social',
  'Utility',
  'Entertainment',
  'Education',
  'Other',
] as const;

// Current download ranges
export const DOWNLOAD_RANGES = [
  'Pre-launch',
  'Under 1K',
  '1K - 10K',
  '10K - 100K',
  'Over 100K',
] as const;

// User roles
export const USER_ROLES = ['Founder', 'Developer', 'Marketing Lead', 'Other'] as const;

// How found us options
export const HOW_FOUND_US_OPTIONS = [
  'TikTok',
  'Referral',
  'Google Search',
  'Other',
] as const;
