import { FOLLOWER_TIERS, CURRENT_FOLLOWERS, ADD_ON_PRICES } from '../constants';

/**
 * Get the base rate based on follower count
 */
export function getBaseRate(followerCount: number = CURRENT_FOLLOWERS): number {
  const tier = FOLLOWER_TIERS.find(
    (t) => followerCount >= t.min && followerCount < t.max
  );
  return tier ? tier.rate : FOLLOWER_TIERS[0].rate;
}

/**
 * Calculate total project cost based on selections
 */
export function calculateTotal(selections: {
  usageRights: boolean;
  rushDelivery: boolean;
  scriptApproval: boolean;
  followerCount?: number;
}): number {
  let total = getBaseRate(selections.followerCount);

  if (selections.usageRights) total += ADD_ON_PRICES.usageRights;
  if (selections.rushDelivery) total += ADD_ON_PRICES.rushDelivery;
  if (selections.scriptApproval) total += ADD_ON_PRICES.scriptApproval;

  return total;
}

/**
 * Calculate 50% deposit amount
 */
export function calculateDeposit(totalDollars: number): number {
  return Math.round(totalDollars * 0.5);
}

/**
 * Calculate final payment (remaining 50%)
 */
export function calculateFinal(totalDollars: number, depositDollars: number): number {
  return totalDollars - depositDollars;
}

/**
 * Convert dollars to cents for Stripe
 */
export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Convert cents to dollars for display
 */
export function toDollars(cents: number): number {
  return cents / 100;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, isCents: boolean = false): string {
  const dollars = isCents ? toDollars(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}
