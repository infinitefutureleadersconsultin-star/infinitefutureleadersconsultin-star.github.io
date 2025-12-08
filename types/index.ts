export * from './database';

// Additional shared types

export interface ServiceSelection {
  primary_goal: 'brand_awareness' | 'deep_dive' | 'install_campaign';
  usage_rights: boolean;
  usage_rights_details?: string;
  rush_delivery: boolean;
  script_approval: boolean;
}

export interface PricingBreakdown {
  baseRate: number;
  addOns: {
    usageRights: number;
    rushDelivery: number;
    scriptApproval: number;
  };
  total: number;
  deposit: number;
  final: number;
}
