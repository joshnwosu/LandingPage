'use client';

import { motion } from 'framer-motion';
import { Circle, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MorphingText } from '../shared/morphing-text';
import { MORPHTEXT } from '@/data/morph-text';
import { Button } from '../ui/button';
import Link from 'next/link';
import { GridBackground } from '../shared/grid-background';
import { LexicalInput } from '../lexical-input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className='relative'
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-white/[0.15]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function Hero({ badge = 'Ai Powered' }: { badge?: string; title?: string }) {
  const router = useRouter();
  const [input, setInput] = useState('');

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const handleSend = () => {
    console.log('Sending...');
    router.push('https://app.sourzer.co/auth/signup');
  };

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl' /> */}

      {/* <GridBackground /> */}

      <div className='absolute inset-0 overflow-hidden'>
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient='from-indigo-500/[0.15]'
          className='left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]'
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient='from-rose-500/[0.15]'
          className='right-[-5%] md:right-[0%] top-[70%] md:top-[75%]'
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient='from-violet-500/[0.15]'
          className='left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]'
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient='from-amber-500/[0.15]'
          className='right-[15%] md:right-[20%] top-[10%] md:top-[15%]'
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient='from-cyan-500/[0.15]'
          className='left-[20%] md:left-[25%] top-[5%] md:top-[10%]'
        />
      </div>

      <div className='relative z-10 container mx-auto px-4 md:px-6'>
        <div className='max-w-6xl mx-auto text-center flex flex-col items-center justify-center py-20 md:py-40'>
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
            className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border mb-8 md:mb-12'
          >
            <Circle className='h-4 w-4 fill-green-500/80' />
            <span className='text-md tracking-wide'>{badge}</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
          >
            <h2 className='text-5xl md:text-7xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto  bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
              <span>
                The Ultimate
                <br /> Search Engine for
              </span>
            </h2>

            <h2 className='text-5xl md:text-7xl mb-6 md:mb-8 tracking-tight font-sans text-center max-w-xl mx-auto'>
              <MorphingText texts={MORPHTEXT} className='my-2' />
            </h2>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
          >
            <p className='text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground text-center mb-8 font-sans max-w-xl mx-auto px-4'>
              Sourcing candidates just got easier with Sourzer. Quickly recruit
              great talent for new job opportunities.
            </p>
          </motion.div>

          <div className='flex flex-row gap-3'>
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial='hidden'
              animate='visible'
            >
              <Link href='https://app.sourzer.co/auth/signup'>
                {/* signup */}
                <Button
                  size='lg'
                  className='gap-4 cursor-pointer font-sans'
                  variant='outline'
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial='hidden'
              animate='visible'
            >
              <Link href='https://app.sourzer.co/auth/signup'>
                <Button size='lg' className='gap-4 cursor-pointer font-sans'>
                  Join for Free <MoveRight className='w-4 h-4' />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'
            className='w-full'
          >
            <LexicalInput
              placeholder='Who are you looking for? Ask Sourzer!'
              content={input}
              onInputChange={setInput}
              onSend={handleSend}
              className='mt-12 text-left'
            />
          </motion.div>
        </div>
      </div>

      {/* <div className='absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none' /> */}
    </div>
  );
}

export default Hero;
