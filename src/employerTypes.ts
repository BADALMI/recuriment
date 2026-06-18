import type { SalaryRating } from './types';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requirements: string[];
  description: string;
  type: string;
  posted: string;
  status: 'active' | 'draft' | 'closed';
  salaryRating?: SalaryRating;
}

export interface JobFormState {
  title: string;
  company: string;
  country: string;
  city: string;
  state: string;
  locationType: string;
  daysInOffice: string;
  travelPercentage: string;
  salary: string;
  currency: string;
  customCurrency: string;
  baseSalaryMin: string;
  baseSalaryMax: string;
  bonusTarget: string;
  bonusMax: string;
  bonusType: string;
  benefits: {
    pension: boolean;
    health: boolean;
    dental: boolean;
    vacation: string;
  };
  perks: {
    rsuOrStockOptions: string;
    equityOrProfitSharing: string;
    signOnBonus: string;
    relocationAssistance: string;
    temporaryHousing: string;
    otherPerks: string;
    visaSponsorship: string;
  };
  seniorityLevel: string;
  directReports: string;
  indirectReports: string;
  reportsToName: string;
  reportsToTitle: string;
  dottedLineToName: string;
  dottedLineToTitle: string;
  jobCategory: string;
  requirements: string;
  description: string;
  type: string;
  confidentialSearch: boolean;
  sellingPoints: string;
  applicationProcess: string;
  targetStartDate: string;
  searchType: string;
}

export interface ClientLoginState {
  email: string;
  password: string;
}

export const createEmptyJobForm = (): JobFormState => ({
  title: '',
  company: '',
  country: 'United States',
  city: '',
  state: '',
  locationType: 'On-site',
  daysInOffice: '',
  travelPercentage: '',
  salary: '',
  currency: 'USD',
  customCurrency: '',
  baseSalaryMin: '',
  baseSalaryMax: '',
  bonusTarget: '',
  bonusMax: '',
  bonusType: 'amount',
  benefits: {
    pension: false,
    health: false,
    dental: false,
    vacation: ''
  },
  perks: {
    rsuOrStockOptions: '',
    equityOrProfitSharing: '',
    signOnBonus: '',
    relocationAssistance: '',
    temporaryHousing: '',
    otherPerks: '',
    visaSponsorship: ''
  },
  seniorityLevel: '',
  directReports: '',
  indirectReports: '',
  reportsToName: '',
  reportsToTitle: '',
  dottedLineToName: '',
  dottedLineToTitle: '',
  jobCategory: '',
  requirements: '',
  description: '',
  type: 'Full-time',
  confidentialSearch: false,
  sellingPoints: '',
  applicationProcess: '',
  targetStartDate: '',
  searchType: ''
});

export const createEmptyClientLogin = (): ClientLoginState => ({
  email: '',
  password: ''
});
