export interface PricingTier {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface PricingPackage {
  title: string;
  description: string;
  price: string;
  image?: string;
  featureImage?: string;
  features?: string[];
  tags?: string[];
  onContact?: () => void;
  isPopular?: boolean;
  tiers?: PricingTier[];
}

interface PricingData {
  [key: string]: PricingPackage;
}

export const oneTimeProjects: PricingData = {
  website: {
    title: 'Website Design',
    description: 'Design • Coding • Deployment',
    price: '$149',
    image: '/images/pricing/d1.png',
    tags: ['Starter', 'Growth', 'Pro'],
    tiers: [
      {
        title: 'Starter',
        price: '$149',
        features: [
          'Pages /5 Pages',
          'Design Concept /1 Concept',
          'Revisions /2 revision rounds',
          'Revisions /Responsive Yes-mobile-desktop optimised',
          'Coding /Included',
          'Hosting Setup /S3 static hosting setup',
          'Delivery /7-10 business days',
        ]
      },
      {
        title: 'Growth',
        price: '$249',
        isPopular: true,
        features: [
          'Pages /Up to 8 pages',
          'UI /Custom UI sections',
          'Layout /Conversion-focused layout',
          'Structure /CMS-ready structure',
          'Revisions /3 revision rounds',
          'Coding /Included',
          'Hosting Setup /S3 static hosting setup',
          'Delivery /12-15 business days',
        ]
      },
      {
        title: 'Pro',
        price: '$449',
        features: [
          'Pages /10+ pages',
          'UX /Structured UX planning',
          'Components /Advanced UI components',
          'Design System /Design system basics',
          'Revisions /4 revision rounds',
          'Coding /Included',
          'Hosting Setup /S3 static hosting setup - 1 year',
          'Delivery /18-25 business days',
        ]
      }
    ]
  },
  landing: {
    title: 'Landing Page Design',
    description: 'Design • Coding • Hosting Setup',
    price: '$59',
    image: '/images/pricing/d2.png',
    tags: ['Starter', 'Growth'],
    tiers: [
      {
        title: 'Starter',
        price: '$59',
        features: [
          'Type /Static or simple animated page',
          'Sections /5-6 sections',
          'Revisions /2 revision rounds',
          'Hosting Setup /S3 static hosting setup',
          'Coding /Included',
          'Delivery /5-7 business days',
        ]
      },
      {
        title: 'Growth',
        price: '$99',
        features: [
          'Sections /Custom sections',
          'Structure /Conversion optimization structure',
          'CTA /Strong CTA flow',
          'Revisions /3 revision rounds',
          'Coding /Included',
          'Delivery /10-12 business days',
        ]
      }
    ]
  },
  saas: {
    title: 'SaaS / B2B Product UI',
    description: 'Design only – Figma handoff',
    price: '$179',
    image: '/images/pricing/d3.png',
    tags: ['Starter', 'Growth', 'Pro'],
    tiers: [
      {
        title: 'Starter',
        price: '$179',
        features: [
          'Screens /5-8 core screens',
          'User Flow /Basic user flow',
          'Components /Clean UI components',
          'Handoff /Figma handoff',
        ]
      },
      {
        title: 'Growth',
        price: '$329',
        features: [
          'Screens /15+ screens',
          'UX /Structured UX flow',
          'Library /Component library',
          'Revisions /3 revision rounds',
          'Handoff /Figma handoff',
        ]
      },
      {
        title: 'Pro',
        price: '$699',
        features: [
          'Screens /25+ screens',
          'Workflows /Complex workflows',
          'Components /Advanced UI components',
          'Design System /Full design system',
          'Handoff /Figma handoff',
        ]
      }
    ]
  },
  mobile: {
    title: 'Mobile App UI/UX',
    description: 'Design only – Figma handoff',
    price: '$299',
    image: '/images/pricing/d4.png',
    tags: ['Starter', 'Growth'],
    tiers: [
      {
        title: 'Starter',
        price: '$299',
        features: [
          'Screens /15-20 screens',
          'User Flow /Included',
          'UI Kit /Included',
          'Revisions /2 revision rounds',
          'Handoff /Figma handoff',
        ]
      },
      {
        title: 'Growth',
        price: '$549',
        features: [
          'Screens /30-50 screens',
          'UX Structure /Full UX structure',
          'Prototype /Interactive prototype',
          'Design System /Included',
          'Handoff /Figma handoff',
        ]
      }
    ]
  },
  audit: {
    title: 'UX Audit & Redesign',
    description: 'Full Evaluation + Figma Handoff',
    price: '$169',
    image: '/images/pricing/d5.png',
    tags: ['Complete Audit'],
    tiers: [
      {
        title: 'Complete Audit',
        price: '$169',
        features: [
          'Full UX evaluation /Existing product',
          'Detailed improvement report',
          'Wireframe suggestions',
          'Actionable redesign roadmap',
          'Heuristic analysis',
          'Delivery /Within 5 business days',
        ]
      }
    ]
  },
};

export const monthlyPods: PricingData = {
  launchpad: {
    title: 'Launchpad Pod',
    description: 'Robust 2-Member Team',
    price: '$1,200',
    image: '/images/pricing/launchpad.png',
    featureImage: '/images/pricing/launchpad-pod.svg',
    features: [
      '40Hrs /Month',
      '1 /Active Task',
      '2 Member /Team Pod',
      'Clickable prototype',
      'Unlimited Revisions /Figma , Zeplin',
      'Foundation (Style Guide) /Design System',
      'Weekly Check-ins (Async)',
      'Weekly Reports + Smart Rollover',
    ],
  },
  momentum: {
    title: 'Momentum Pod',
    description: 'Expanded 3-Member Team',
    price: '$2,800',
    isPopular: true,
    image: '/images/pricing/momentum.png',
    featureImage: '/images/pricing/momentum-pod.svg',
    features: [
      '80Hrs /Month',
      '2 /Active Tasks',
      '3 Members /Team Pod',
      'Clickable prototype',
      'Quality Assurance',
      'Unlimited Revisions /Figma , Zeplin',
      'Component Based /Design System',
      'Monthly UX Audit',
      'Weekly Sync-ups (Live)',
      'Monthly Insights + Smart Rollover',
    ],
  },
  velocity: {
    title: 'Velocity Pod',
    description: 'Full-Stack Design Team',
    price: '$5,600',
    image: '/images/pricing/velocity.png',
    featureImage: '/images/pricing/velocity-pod.svg',
    features: [
      '140Hrs /Month',
      '2-3 Stream /Active Tasks',
      'Multi-Role Team /Team Pod',
      'Clickable prototype + Motion Design',
      'Quality Assurance',
      'Unlimited Revisions (Priority Turnaround)',
      'Scalable System /Design System',
      'Research Pack & Brand Refresh',
      'Strategic Sessions (Live)',
      'Performance Tracking + Smart Rollover',
    ],
  },
};

const pricingData = { oneTimeProjects, monthlyPods };
export default pricingData;