'use client';

import * as React from 'react';
import { Tab } from '../shared/pricing-tab';
import { PricingCard, PricingTier } from '../shared/pricing-card';
import { cn } from '@/lib/utils';
import { GridBackground } from '../shared/grid-background';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface PricingSectionProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  frequencies: string[];
}

const NAIRA_CONVERSION_RATE = 1000;

export default function Pricing({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[1] // Default to yearly (assuming it's the second option)
  );
  const [isNigerianUser, setIsNigerianUser] = useState(false);

  useEffect(() => {
    // Detect if user is from Nigeria based on browser locale
    const userLocale = navigator.language || (navigator as any).userLanguage;
    const userCountry = new Intl.Locale(userLocale).region;
    setIsNigerianUser(userCountry === 'NG');
  }, []);

  const formatPrice = (priceObj: Record<string, number | string>) => {
    // If price contains any string values (like 'Custom'), return the original object
    if (
      typeof priceObj.monthly === 'string' ||
      typeof priceObj.yearly === 'string'
    ) {
      return priceObj;
    }

    // Convert to Naira if user is from Nigeria
    if (isNigerianUser) {
      return {
        monthly: `₦${(
          (priceObj.monthly as number) * NAIRA_CONVERSION_RATE
        ).toLocaleString()}`,
        yearly: `₦${(
          (priceObj.yearly as number) * NAIRA_CONVERSION_RATE
        ).toLocaleString()}`,
      };
    }

    // Return in USD format
    return {
      monthly: `$${(priceObj.monthly as number).toLocaleString()}`,
      yearly: `$${(priceObj.yearly as number).toLocaleString()}`,
    };
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  const tabsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className='flex flex-col items-center gap-10 py-10 md:py-30 font-sans relative'
    >
      <GridBackground />
      <div className='space-y-7 text-center'>
        <div className='space-y-4 flex flex-col justify-center items-center'>
          <motion.h1
            variants={titleVariants}
            initial='hidden'
            animate={controls}
            className='text-3xl md:text-7xl max-w-4xl tracking-tighter text-center font-sans capitalize'
          >
            <span
              className={cn(
                'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'
              )}
            >
              Flexible{' '}
            </span>
            <span className='text-spektr-cyan-50 font-extralight'>{title}</span>
          </motion.h1>
          <motion.p
            variants={subtitleVariants}
            initial='hidden'
            animate={controls}
            className='text-muted-foreground max-w-2xl text-lg'
          >
            {subtitle}
          </motion.p>
        </div>
        <motion.div
          variants={tabsVariants}
          initial='hidden'
          animate={controls}
          className='mx-auto flex w-fit rounded-full bg-muted p-1'
        >
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={setSelectedFrequency}
              discount={freq === 'yearly'}
            />
          ))}
        </motion.div>
      </div>

      <div className='grid w-full max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-4'>
        {tiers.map((tier, index) => (
          <PricingCard
            key={tier.name}
            tier={{
              ...tier,
              price: formatPrice(tier.price),
            }}
            paymentFrequency={selectedFrequency}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
