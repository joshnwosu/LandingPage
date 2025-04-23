import { Layout, Mail, Pointer, Zap } from 'lucide-react';

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
  heading: 'Global Talent Network',
  description:
    'Access a vast network of over 800 million professional profiles worldwide.',
  tabs: [
    {
      value: 'tab-1',
      icon: <Zap className='h-auto w-4 shrink-0' />,
      label: 'Search (PeopleGPT)',
      content: {
        title: 'Discover talent through AI-powered search',
        description:
          'Elevate your recruitment strategy with PeopleGPT, the AI-powered search platform that transforms how you find talent. Streamline your search with semantic natural language queries – no need for complicated boolean strings.',
        buttonText: 'Try for free',
        imageSrc:
          'https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg',
        imageAlt: 'placeholder',
      },
    },
    {
      value: 'tab-2',
      icon: <Pointer className='h-auto w-4 shrink-0' />,
      label: 'Talent Insights',
      content: {
        title: 'Uncover new data by leveraging Talent Insights',
        description:
          'Analyze comprehensive data directly tied to your searches and uncover valuable insights instantly. Benefit from an integrated overview of your talent pool and confidently act on curated findings that drive you forward.',
        buttonText: 'Try for free',
        imageSrc:
          'https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg',
        imageAlt: 'placeholder',
      },
    },
    {
      value: 'tab-3',
      icon: <Mail className='h-auto w-4 shrink-0' />,
      label: 'Email Outreach',
      content: {
        title: 'Convert candidates with AI email campaigns',
        description:
          'Maximize candidate engagement with AI-powered email campaigns that reflect your unique voice. Personalize messaging at scale using templates and AI commands, ensuring a 40% increase in response rates.',
        buttonText: 'Try for free',
        imageSrc:
          'https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg',
        imageAlt: 'placeholder',
      },
    },
  ],
};
