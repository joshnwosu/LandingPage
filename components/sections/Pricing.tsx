'use client';

import * as React from 'react';
import { Tab } from '../shared/pricing-tab';
import { PricingCard, PricingTier } from '../shared/pricing-card';
import { cn } from '@/lib/utils';
import { GridBackground } from '../shared/grid-background';

interface PricingSectionProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  frequencies: string[];
}

export default function Pricing({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0]
  );

  return (
    <div className='flex flex-col items-center gap-10 py-30 font-sans relative'>
      <GridBackground />
      <div className='space-y-7 text-center'>
        <div className='space-y-4 flex flex-col justify-center items-center'>
          {/* <h1 className='text-4xl font-medium md:text-5xl '>{title}</h1> */}

          <h1 className='text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-sans capitalize'>
            <span
              className={cn(
                'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'
              )}
            >
              Flexible{' '}
            </span>
            <span className='text-spektr-cyan-50 font-extralight'>{title}</span>
          </h1>
          <p className='text-muted-foreground max-w-2xl text-lg'>{subtitle}</p>
        </div>
        <div className='mx-auto flex w-fit rounded-full bg-muted p-1'>
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={setSelectedFrequency}
              discount={freq === 'yearly'}
            />
          ))}
        </div>
      </div>

      <div className='grid w-full max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-4'>
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
          />
        ))}
      </div>
    </div>
  );
}
