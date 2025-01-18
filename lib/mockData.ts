export interface Proposal {
  id: string;
  candidateName: string;
  receivedDate: string;
  contactPerson: string;
  brokerName: string | null;
  currentStage: string;
  overallStatus: string;
  lastUpdated: string;
  initialImpression: string | null;
  biodataDetails: BiodataDetails | null;
  horoscopeDetails: HoroscopeDetails | null;
}

export interface BiodataDetails {
  height: number | null;
  education: string | null;
  job: string | null;
  salary: number | null;
  location: string | null;
  businessDetails: string | null;
  rentalIncome: number | null;
  ownHouse: boolean | null;
  parentDetails: string | null;
  siblingDetails: string | null;
}

export interface HoroscopeDetails {
  nakshatra: string | null;
  raashi: string | null;
  gunaPoints: number | null;
  compatibilityNotes: string | null;
  otherInsights: string | null;
}

export const mockProposals: Proposal[] = [
  {
    id: '1',
    candidateName: 'Rahul Sharma',
    receivedDate: '2024-01-15',
    contactPerson: 'Mr. K.C. Sharma',
    brokerName: null,
    currentStage: 'Initial Screening',
    overallStatus: 'In Progress',
    lastUpdated: '2024-01-20',
    initialImpression: 'Seems like a good match',
    biodataDetails: {
      height: 175,
      education: 'B.Tech (Computer Science)',
      job: 'Software Engineer',
      salary: 1500000,
      location: 'Bangalore',
      businessDetails: null,
      rentalIncome: null,
      ownHouse: true,
      parentDetails: 'Father: Mr. K.C. Sharma (Retired), Mother: Mrs. Radha Sharma (Homemaker)',
      siblingDetails: '1 Sister (Married)'
    },
    horoscopeDetails: {
      nakshatra: 'Rohini',
      raashi: 'Taurus',
      gunaPoints: 28,
      compatibilityNotes: 'Good compatibility with Gemini and Libra. Avoid Scorpio.',
      otherInsights: null
    }
  },
  {
    id: '2',
    candidateName: 'Priya Patel',
    receivedDate: '2024-01-18',
    contactPerson: 'Mrs. Meena Patel',
    brokerName: 'Mr. Gupta',
    currentStage: 'Family Meeting',
    overallStatus: 'Positive',
    lastUpdated: '2024-02-01',
    initialImpression: 'Friendly and well-educated',
    biodataDetails: {
      height: 165,
      education: 'MBA (Finance)',
      job: 'Investment Banker',
      salary: 2000000,
      location: 'Mumbai',
      businessDetails: null,
      rentalIncome: 50000,
      ownHouse: true,
      parentDetails: 'Father: Mr. Rajesh Patel (Business Owner), Mother: Mrs. Meena Patel (Homemaker)',
      siblingDetails: '1 Brother (Unmarried)'
    },
    horoscopeDetails: {
      nakshatra: 'Magha',
      raashi: 'Leo',
      gunaPoints: 32,
      compatibilityNotes: 'Excellent match with Aries and Sagittarius.',
      otherInsights: 'Strong career-oriented personality'
    }
  }
];

