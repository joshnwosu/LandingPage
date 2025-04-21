import { Layout, Pointer, Zap } from 'lucide-react';

export const FEATURES = [
  {
    step: 'Step 1',
    title: 'Talent Sourcing',
    content:
      'Say goodbye to hours spent digging through databases and job boards for top talent. Our advanced AI technology streamlines applicant review, while our expert team, paired with AI, efficiently sources high-quality candidate profiles tailored to your hiring needs.',
    image:
      'https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 2',
    title: 'Candidate engagement',
    content:
      'Easily reach out to top candidates from our curated lists with personalized and automated outbound email campaigns. Our AI tracks responses and identifies the most interested prospects, giving your team a head start in building a relationship.',
    image:
      'https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 3',
    title: 'Smart recruitment analytics',
    content:
      'Gain valuable insights into your talent sourcing efforts with our analytics dashboard. Measure candidate engagement, diversity, and overall funnel performance, and identify areas for improvement.',
    image:
      'https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop',
  },
];

export const FEATURES3 = {
  badge: 'shadcnblocks.com',
  heading: 'A Collection of Components Built With Shadcn & Tailwind',
  description: 'Join us to build flawless web solutions.',
  tabs: [
    {
      value: 'tab-1',
      icon: <Zap className='h-auto w-4 shrink-0' />,
      label: 'Boost Revenue',
      content: {
        badge: 'Modern Tactics',
        title: 'Make your site a true standout.',
        description:
          'Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.',
        buttonText: 'See Plans',
        imageSrc:
          'https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg',
        imageAlt: 'placeholder',
      },
    },
    {
      value: 'tab-2',
      icon: <Pointer className='h-auto w-4 shrink-0' />,
      label: 'Higher Engagement',
      content: {
        badge: 'Expert Features',
        title: 'Boost your site with top-tier design.',
        description:
          'Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.',
        buttonText: 'See Tools',
        imageSrc:
          'https://www.shadcnblocks.com/images/block/placeholder-dark-2.svg',
        imageAlt: 'placeholder',
      },
    },
    {
      value: 'tab-3',
      icon: <Layout className='h-auto w-4 shrink-0' />,
      label: 'Stunning Layouts',
      content: {
        badge: 'Elite Solutions',
        title: 'Build an advanced web experience.',
        description:
          'Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.',
        buttonText: 'See Options',
        imageSrc:
          'https://www.shadcnblocks.com/images/block/placeholder-dark-3.svg',
        imageAlt: 'placeholder',
      },
    },
  ],
};
