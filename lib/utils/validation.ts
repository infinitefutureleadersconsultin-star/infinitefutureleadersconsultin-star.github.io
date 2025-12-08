import { z } from 'zod';
import {
  APP_CATEGORIES,
  DOWNLOAD_RANGES,
  USER_ROLES,
  HOW_FOUND_US_OPTIONS,
  BUDGET_RANGES,
} from '../constants';

/**
 * Intake Form Step 1 validation schema
 */
export const intakeStep1Schema = z.object({
  // About You
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company_name: z.string().optional(),
  role: z.enum(USER_ROLES as unknown as [string, ...string[]]),
  how_found_us: z.enum(HOW_FOUND_US_OPTIONS as unknown as [string, ...string[]]),

  // About Your App
  app_name: z.string().min(2, 'App name is required'),
  app_store_link: z.string().url().optional().or(z.literal('')),
  play_store_link: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
  app_category: z.enum(APP_CATEGORIES as unknown as [string, ...string[]]),
  one_liner: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(150, 'Description must be 150 characters or less'),
  problem_solved: z.string().min(20, 'Please describe the problem your app solves'),
  target_audience: z.string().min(10, 'Please describe your target audience'),
  current_downloads: z.enum(DOWNLOAD_RANGES as unknown as [string, ...string[]]),
});

/**
 * Intake Form Step 2 validation schema
 */
export const intakeStep2Schema = z.object({
  primary_goal: z.enum(['brand_awareness', 'deep_dive', 'install_campaign']),
  usage_rights: z.boolean(),
  usage_rights_details: z.string().optional(),
  rush_delivery: z.boolean(),
  script_approval: z.boolean(),
  budget_range: z.enum(BUDGET_RANGES as unknown as [string, ...string[]]),
  additional_notes: z.string().optional(),
}).refine(
  (data) => {
    // If usage rights is selected, details are required
    if (data.usage_rights && !data.usage_rights_details) {
      return false;
    }
    return true;
  },
  {
    message: 'Please specify how many platforms and for how long you need usage rights',
    path: ['usage_rights_details'],
  }
);

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailSchema = z.string().email();
  return emailSchema.safeParse(email).success;
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty URLs are allowed for optional fields
  const urlSchema = z.string().url();
  return urlSchema.safeParse(url).success;
}

/**
 * Validate App Store URL
 */
export function isValidAppStoreUrl(url: string): boolean {
  if (!url) return true;
  return url.includes('apps.apple.com') || url.includes('itunes.apple.com');
}

/**
 * Validate Play Store URL
 */
export function isValidPlayStoreUrl(url: string): boolean {
  if (!url) return true;
  return url.includes('play.google.com');
}
