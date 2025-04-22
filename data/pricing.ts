export const PAYMENT_FREQUENCIES = ['monthly', 'yearly'];

export const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: 'For your hobby projects',
    features: [
      'Source for 5 candidates',
      'Screen 5 CV ',
      'Post 2 Jobs',
      'Unlimited applicants',
    ],
    cta: 'Get started',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: {
      monthly: 120,
      yearly: 85,
    },
    description: 'Great for small businesses',
    features: [
      'Source for 25 candidates ',
      'Screen 25 CV ',
      'Post 10 Jobs',
      'Unlimited applicants',
    ],
    cta: 'Get started',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: 200,
      yearly: 165,
    },
    description: 'Great for large businesses',
    features: [
      'Source for 55 candidates',
      'Screen 55 CV ',
      'Post 20 Jobs',
      'Unlimited applicants',
    ],
    cta: 'Get started',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'Contact Sales Team',
    features: [],
    cta: 'Contact Us',
    highlighted: true,
  },
];
