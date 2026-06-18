export const currencies = [
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'CAD', name: 'Canadian Dollar (C$)' },
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'AUD', name: 'Australian Dollar (A$)' },
  { code: 'SGD', name: 'Singapore Dollar (S$)' },
  { code: 'CHF', name: 'Swiss Franc (CHF)' },
  { code: 'JPY', name: 'Japanese Yen (¥)' },
  { code: 'NZD', name: 'New Zealand Dollar (NZ$)' },
  { code: 'OTHER', name: 'Other (Custom)' }
];

export const countries = [
  // North America
  'United States',
  'Canada',
  'Mexico',
  'Bermuda',
  'Cayman Islands',
  'Barbados',
  // Europe
  'England',
  'Scotland',
  'Ireland',
  'Northern Ireland',
  'Switzerland',
  'Germany',
  'Austria',
  'Luxembourg',
  'Netherlands',
  'Belgium',
  'France',
  'Spain',
  'Portugal',
  'Czech Republic',
  'Gibraltar',
  // Asia Pacific
  'Australia',
  'New Zealand',
  'India',
  'China',
  'Hong Kong',
  'Singapore',
  'Malaysia',
  'Thailand',
  // Middle East
  'UAE',
  'Kuwait',
  'Saudi Arabia',
  // Latin America
  'Colombia',
  'Brazil',
  'Argentina',
  'Peru',
  // Africa
  'South Africa',
  // Other
  'Other'
];

export const usStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'];

export const canadianProvinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

export const locationTypes = ['On-site', 'Remote', 'Hybrid'];

export const seniorityLevels = ['Individual Contributor', 'Manager', 'Senior Manager', 'Director', 'Senior Director', 'VP', 'Senior VP', 'C-Level'];

export const jobCategories = [
  { group: 'Life Insurance', options: ['Life - Actuarial', 'Life - Other', 'Life - Data Science', 'Life - Underwriting', 'Life - Data Engineering', 'Life - Business Intelligence', 'Life - ILS', 'Life - Pension', 'Life - Retirement', 'Life - AI', 'Life - Machine Learning'] },
  { group: 'Non-Life Insurance', options: ['Non-Life - Actuarial', 'Non-Life - Cat Modeling', 'Non-Life - Risk', 'Non-Life - Data Science', 'Non-Life - Underwriting', 'Non-Life - Other', 'Non-Life - Investment', 'Non-Life - Product Management', 'Non-Life - Data Engineer', 'Non-Life - Business Intelligence', 'Non-Life - Climate Risk', 'Non-Life - ESG', 'Non-Life - AI', 'Non-Life - Machine Learning'] },
  { group: 'Health Insurance', options: ['Health - Actuarial', 'Health - Underwriting', 'Health - Data Science'] },
  { group: 'Pension', options: ['Pension - Actuarial', 'Pension - Retirement'] },
  { group: 'Technology (Non-Insurance)', options: ['Tech - Artificial Intelligence', 'Tech - Machine Learning', 'Tech - Data Science', 'Tech - Data Engineering', 'Tech - Product Management', 'Tech - Software Engineering'] },
  { group: 'Cross-Domain', options: ['Cross-Domain - Business Intelligence', 'Cross-Domain - Data Engineering'] }
];

export const searchTypes = [
  {
    id: 'contingent',
    name: 'Contingent Search',
    description: 'Pay only when position is filled. Ideal for single roles or when you want to explore options.',
    fee: 'No upfront cost, fee upon successful placement',
    bestFor: 'Single roles, exploring options, budget-conscious hiring'
  },
  {
    id: 'retained',
    name: 'Retained/Exclusive Search',
    description: 'Dedicated recruiting team with priority access to our talent network.',
    fee: 'Engagement fee + success fee (structure varies)',
    bestFor: '_critical roles, senior positions, confidential searches'
  },
  {
    id: 'multiple',
    name: 'Multiple Position Search',
    description: 'Streamlined hiring for multiple similar roles. Volume discounts available.',
    fee: 'Custom pricing based on number of positions',
    bestFor: 'Team building, scaling operations, high-volume hiring'
  }
];
