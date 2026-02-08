export interface ServicePrice {
  midSize: number | string;
  fullSize: number | string;
}

export type ServiceTier = 'silver' | 'gold' | 'platinum' | 'diamond';

export interface Service {
  id: string;
  name: string;
  tagline?: string;
  price: ServicePrice;
  duration: string;
  description: string;
  inclusions: string[];
  badge?: string;
  isCallForQuote?: boolean;
  tier?: ServiceTier;
  tierOrder?: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const services: Service[] = [
  {
    id: 'maintenance',
    name: 'Maintenance Detail',
    tagline: 'Monthly customers only',
    badge: 'Monthly Customers Only',
    tier: 'silver',
    tierOrder: 0,
    price: {
      midSize: 75,
      fullSize: 95,
    },
    duration: '1–2 hours',
    description: 'Perfect for our regular customers who want to keep their vehicle looking pristine all year round.',
    inclusions: [
      'Hand Wash',
      'Vacuum floorboards, mats, seats & trunk',
      'Clean rim face & tires',
      'Tire dressing',
      'Ceramic spray wax',
      'Glass cleaned',
      'Wipe down doors, dash & door panels',
    ],
  },
  {
    id: 'supreme',
    name: 'Supreme',
    tagline: 'Hand Wash & Interior Detail',
    tier: 'gold',
    tierOrder: 1,
    price: {
      midSize: 180,
      fullSize: 200,
    },
    duration: '2.5–3 hours',
    description: 'Comprehensive hand wash and interior detailing service that brings out the best in your vehicle.',
    inclusions: [
      'Hand Wash with foam cannon',
      '2-bucket method',
      'Gyeon Q2 Wax',
      'Vacuum entire interior including trunk',
      'Clean rim face & tires',
      'Carpro Darkside tire dressing',
      'Wipe down dash, doors, door panels & console',
      'Glass cleaned inside & out',
      'Dress vinyl & plastic',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Everything in Supreme plus',
    tier: 'platinum',
    tierOrder: 2,
    price: {
      midSize: 260,
      fullSize: 280,
    },
    duration: '4–5 hours',
    description: 'Our premium service combines everything from Supreme with additional deep cleaning treatments.',
    inclusions: [
      'All Supreme inclusions',
      'Clay bar treatment',
      'Steam clean air vents',
      'Steam clean seats',
      'Steam clean headliner',
      'Deep clean all surfaces',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Everything in Supreme & Premium plus',
    tier: 'diamond',
    tierOrder: 3,
    price: {
      midSize: 300,
      fullSize: 350,
    },
    duration: '5–6 hours',
    description: 'The ultimate detailing experience with our most comprehensive service package.',
    inclusions: [
      'All Supreme & Premium inclusions',
      'Pet hair removal',
      'Stain removal',
      'Heated 210° carpet extractor',
      'Full carpet & upholstery shampoo',
      'Complete interior restoration',
    ],
  },
  {
    id: 'exterior-only',
    name: 'Exterior Only',
    tagline: 'Hand Wash',
    price: {
      midSize: 90,
      fullSize: 100,
    },
    duration: '1.5–2 hours',
    description: 'Focused exterior detailing service for a showroom shine.',
    inclusions: [
      'Foam cannon pre-wash',
      '2-bucket hand wash method',
      'Gyeon Q2 ceramic spray wax',
      'Clean & dress tires with Carpro Darkside',
      'Clean rim faces',
      'Glass cleaned (exterior)',
      'Door jambs cleaned',
      'Spot-free deionized water rinse',
    ],
  },
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating',
    tagline: 'Ultimate paint protection',
    price: {
      midSize: 'Call for Quote',
      fullSize: 'Call for Quote',
    },
    duration: '10+ hours',
    description: 'Professional-grade ceramic coating application for long-lasting paint protection and shine.',
    isCallForQuote: true,
    inclusions: [
      'Complete vehicle wash',
      'Iron fallout removal',
      'Clay bar treatment',
      'Two-stage compound & polish',
      'Professional ceramic coating application',
      'Base coating longevity: 6 years',
      '2-5 year coating options available',
      'Hydrophobic properties',
      'UV protection',
    ],
  },
];

export const addOns: AddOn[] = [
  {
    id: 'shampoo-seat',
    name: 'Shampoo Seats',
    price: '$40',
    description: 'Per seat deep shampoo treatment',
  },
  {
    id: 'engine-bay',
    name: 'Engine Bay Detail',
    price: '$60',
    description: 'Complete engine bay cleaning and dressing',
  },
  {
    id: 'shampoo-mat',
    name: 'Shampoo Floor Mat',
    price: '$15',
    description: 'Per mat deep cleaning',
  },
  {
    id: 'sanitation',
    name: 'Interior Sanitation/Decontamination',
    price: '$70+',
    description: 'Professional-grade interior sanitization',
  },
  {
    id: 'water-spot',
    name: 'Water Spot Removal',
    price: '$90+',
    description: 'Remove stubborn water spots from paint and glass',
  },
  {
    id: 'headlight',
    name: 'Headlight Restoration',
    price: '$95/pair',
    description: 'Restore clarity to cloudy or yellowed headlights',
  },
];

export const trustBadges = [
  {
    id: 'mobile',
    title: '7 Days a Week',
    description: 'Available every day',
  },
  {
    id: 'service',
    title: 'Mobile Service',
    description: 'We come to you',
  },
  {
    id: 'water',
    title: 'Spot-Free Water System',
    description: 'Deionized filtration',
  },
  {
    id: 'premium',
    title: 'Premium Products Only',
    description: 'Top-quality results',
  },
];

export const whyChooseUs = [
  {
    id: 'mobile-service',
    title: 'We Come To You',
    description: 'Enjoy premium detailing at your home or office. No need to disrupt your day or wait at a shop.',
  },
  {
    id: 'spot-free',
    title: 'Spot-Free Water System',
    description: 'Our deionized water filtration system ensures a perfect, spot-free finish every time.',
  },
  {
    id: 'premium-products',
    title: 'Premium Products',
    description: 'We use only the finest professional-grade products for exceptional results that last.',
  },
];

export const packageTierOrder = ['maintenance', 'supreme', 'premium', 'platinum'] as const;
export type PackageTierId = (typeof packageTierOrder)[number];

export interface PackageTierInfo {
  id: PackageTierId;
  label: string;
  tier: ServiceTier;
  includesEverythingFrom?: PackageTierId;
}

export const packageTiers: PackageTierInfo[] = [
  { id: 'maintenance', label: 'Maintenance', tier: 'silver' },
  { id: 'supreme', label: 'Supreme', tier: 'gold', includesEverythingFrom: 'maintenance' },
  { id: 'premium', label: 'Premium', tier: 'platinum', includesEverythingFrom: 'supreme' },
  { id: 'platinum', label: 'Platinum', tier: 'diamond', includesEverythingFrom: 'premium' },
];

export interface ComparisonFeature {
  label: string;
  includedIn: Record<PackageTierId, boolean>;
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    label: 'Hand Wash',
    includedIn: { maintenance: true, supreme: true, premium: true, platinum: true },
  },
  {
    label: 'Interior Vacuum',
    includedIn: { maintenance: true, supreme: true, premium: true, platinum: true },
  },
  {
    label: 'Tire Dressing',
    includedIn: { maintenance: true, supreme: true, premium: true, platinum: true },
  },
  {
    label: 'Ceramic Spray Wax',
    includedIn: { maintenance: true, supreme: true, premium: true, platinum: true },
  },
  {
    label: 'Steam Clean Seats',
    includedIn: { maintenance: false, supreme: false, premium: true, platinum: true },
  },
  {
    label: 'Clay Bar Treatment',
    includedIn: { maintenance: false, supreme: false, premium: true, platinum: true },
  },
  {
    label: 'Pet Hair Removal',
    includedIn: { maintenance: false, supreme: false, premium: false, platinum: true },
  },
  {
    label: 'Carpet & Upholstery Shampoo',
    includedIn: { maintenance: false, supreme: false, premium: false, platinum: true },
  },
];
