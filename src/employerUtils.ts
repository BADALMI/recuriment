import type { JobFormState, JobPosting } from './employerTypes';
import type { Job, SalaryRating } from './types';

export const buildSalaryString = (form: JobFormState): string => {
  const actualCurrency = form.currency === 'OTHER' ? form.customCurrency : form.currency;

  let salaryString = 'Competitive';

  if (form.baseSalaryMin && form.baseSalaryMax) {
    salaryString = `${actualCurrency} ${form.baseSalaryMin} - ${form.baseSalaryMax}`;
  }

  if (form.bonusTarget && form.bonusMax) {
    if (form.bonusType === 'percentage') {
      salaryString += ` + Bonus (${form.bonusTarget}% - ${form.bonusMax}%)`;
    } else {
      salaryString += ` + Bonus (${actualCurrency} ${form.bonusTarget} - ${form.bonusMax})`;
    }
  }

  return salaryString;
};

export const buildLocationString = (form: JobFormState): string => {
  if (form.locationType === 'Remote') {
    return form.state
      ? `${form.state}, ${form.country} (Remote)`
      : `${form.country} (Remote - Work from anywhere)`;
  }

  if (form.country === 'United States' || form.country === 'Canada') {
    return `${form.city}, ${form.state} (${form.locationType})`;
  }

  return `${form.city}, ${form.country} (${form.locationType})`;
};

export const createJobForJobSeekers = (form: JobFormState): Omit<Job, 'id' | 'posted'> => {
  const actualCurrency = form.currency === 'OTHER' ? form.customCurrency : form.currency;
  const salaryString = buildSalaryString(form);
  const locationString = buildLocationString(form);

  return {
    title: form.title,
    company: form.company,
    location: locationString,
    type: form.type,
    salary: salaryString,
    description: form.description,
    requirements: form.requirements
      .split(',')
      .map(req => req.trim())
      .filter(Boolean),
    tags: [
      form.type,
      form.locationType,
      form.jobCategory,
      form.seniorityLevel,
      salaryString.includes(actualCurrency) ? 'Competitive Salary' : 'Salary Negotiable'
    ].filter(Boolean)
  };
};

export const createEmployerJobPosting = (form: JobFormState, salaryRating?: SalaryRating | null): JobPosting => {
  const salaryString = buildSalaryString(form);
  const locationString = buildLocationString(form);

  return {
    id: Date.now().toString(),
    title: form.title,
    company: form.company,
    location: locationString,
    salary: salaryString,
    requirements: form.requirements
      .split(',')
      .map(req => req.trim())
      .filter(Boolean),
    description: form.description,
    type: form.type,
    posted: 'Just now',
    status: 'active',
    salaryRating
  };
};

export const generateJDRequestPrompt = (form: JobFormState): string => {
  const actualCurrency = form.currency === 'OTHER' ? form.customCurrency : form.currency;
  const salaryInfo = form.baseSalaryMin && form.baseSalaryMax
    ? `${actualCurrency} ${form.baseSalaryMin} - ${form.baseSalaryMax}`
    : 'Competitive';

  const bonusInfo = form.bonusTarget && form.bonusMax
    ? form.bonusType === 'percentage'
      ? ` + Bonus (${form.bonusTarget}% - ${form.bonusMax}%)`
      : ` + Bonus (${actualCurrency} ${form.bonusTarget} - ${form.bonusMax})`
    : '';

  const fullLocation = form.city && form.state
    ? `${form.city}, ${form.state}`
    : 'Not specified';

  const benefitsStr = [
    form.benefits.health && 'Health Insurance',
    form.benefits.dental && 'Dental',
    form.benefits.pension && 'Pension/401k',
    form.benefits.vacation && `${form.benefits.vacation} vacation`
  ].filter(Boolean).join(', ');

  return `
    Generate a comprehensive and professional job description for the following position:

    Job Title: ${form.title}
    Company: ${form.company}
    Job Category: ${form.jobCategory || 'Not specified'}
    Location: ${fullLocation} (${form.locationType})
    Travel: ${form.travelPercentage || 'None'}
    Seniority Level: ${form.seniorityLevel || 'Not specified'}
    Salary Range: ${salaryInfo}${bonusInfo}
    Requirements: ${form.requirements || 'Standard requirements for this role'}
    Benefits: ${benefitsStr}

    Please create a detailed job description that includes:
    1. A compelling overview of the role and company
    2. Key responsibilities and duties
    3. Required qualifications and skills
    4. Preferred qualifications
    5. Benefits and what makes this opportunity attractive
    6. Company culture highlights

    Make it professional, engaging, and tailored to attract top talent in the ${form.jobCategory || 'insurance and financial services'} sector. The description should be 3-4 paragraphs long and highlight why candidates would want to work for this company.
  `;
};

export const generateJDParserPrompt = (documentContent: string): string => `
  Analyze the following job description document and extract all relevant information. Return the response in JSON format with the exact structure shown below:

  Document Content:
  ${documentContent}

  Please extract:
  1. Job title
  2. Company name
  3. Location (city, state/province, country)
  4. Job type (Full-time, Part-time, Contract, etc.)
  5. Location type (On-site, Remote, Hybrid)
  6. Salary range (min and max)
  7. Currency (USD, CAD, EUR, etc.)
  8. Required skills and qualifications
  9. Full job description
  10. Seniority level
  11. Travel percentage
  12. Benefits mentioned
  13. Any bonus information

  Return ONLY valid JSON in this exact format:
  {
    "title": "string",
    "company": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "locationType": "string",
    "type": "string",
    "baseSalaryMin": "string",
    "baseSalaryMax": "string",
    "currency": "string",
    "requirements": "string (comma-separated)",
    "description": "string",
    "seniorityLevel": "string",
    "travelPercentage": "string",
    "benefits": {
      "pension": boolean,
      "health": boolean,
      "dental": boolean,
      "vacation": "string"
    },
    "bonusTarget": "string",
    "bonusMax": "string"
  }

  If any field is not found in the document, use empty string or false for booleans.
`;
