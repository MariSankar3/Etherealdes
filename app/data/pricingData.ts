export interface PricingPackage {
  title: string;
  description: string;
  price: string;
  image: string;
  featureImage: string;
  features: string[];
  onContact?: () => void;
}

interface PricingData {
  [key: string]: PricingPackage;
}

const pricingData: PricingData = {
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
  momentum: {
    title: 'Momentum Pod',
    description: 'Expanded 3-Member Team',
    price: '$2,800',
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
};

export default pricingData; 