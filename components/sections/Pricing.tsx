'use client';

import * as React from 'react';
import { Tab } from '../shared/pricing-tab';
import { PricingCard, PricingTier } from '../shared/pricing-card';
import { cn } from '@/lib/utils';
import { GridBackground } from '../shared/grid-background';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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
            tier={tier}
            paymentFrequency={selectedFrequency}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
