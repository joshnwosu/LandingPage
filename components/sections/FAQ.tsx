'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const items = [
  {
    title: 'Is Sourzer Free?',
    content:
      "Yes, you can try it for free. You won't get access to the latest models and you won't be able to see the entire response on the free version",
  },
  {
    title: 'What platforms and tools are supported?',
    content:
      'We support seamless integration with LinkedIn, Indeed, and GitHub to streamline talent sourcing and profile management. Simply update your preferences on the settings page to select your preferred integration.',
  },
  {
    title: 'Do you have customer support?',
    content:
      'Yes, we provide customer support 24/7 through our email help@sourzer.co with any questions or concerns.',
  },
];

export default function FAQ() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const accordionItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 + index * 0.2 },
    }),
  };

  return (
    <motion.div ref={ref} className='relative max-w-full mx-auto'>
      <div className='space-y-4 max-w-[700px] mx-auto py-10 md:py-28'>
        <motion.h2
          variants={headingVariants}
          initial='hidden'
          animate={controls}
          className='text-3xl md:text-7xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-center'
        >
          Have Questions?
          <br />
          Sourzer Has Answers
        </motion.h2>
        <Accordion type='single' collapsible className='mt-8'>
          {items.map((item, index) => (
            <motion.div
              key={index.toString()}
              custom={index}
              variants={accordionItemVariants}
              initial='hidden'
              animate={controls}
            >
              <AccordionItem value={index.toString()} className='py-2'>
                <AccordionTrigger className='py-4 text-lg leading-6 hover:no-underline font-light'>
                  <span className='flex items-center gap-3'>{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className='py-4 text-muted-foreground text-lg'>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.div>
  );
}
