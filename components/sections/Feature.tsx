import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FeaturesSectionWithHoverEffects from './FeaturesSectionWithHoverEffects';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function Feature() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Animation variants for the description
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  return (
    <div className='w-full'>
      <div className='container mx-auto py-10 lg:py-20'>
        <div className='flex gap-8 items-center justify-center flex-col'>
          {false && (
            <div>
              <Button
                variant='secondary'
                size='sm'
                className='gap-4 cursor-pointer'
              >
                Read our launch article <MoveRight className='w-4 h-4' />
              </Button>
            </div>
          )}
          <motion.div
            ref={ref}
            className='flex gap-4 flex-col justify-center items-center'
          >
            <motion.h1
              variants={titleVariants}
              initial='hidden'
              animate={controls}
              className='text-3xl md:text-7xl max-w-4xl tracking-tighter text-center font-sans capitalize'
            >
              <span className='text-spektr-cyan-50 font-extralight'>
                The right features for your{' '}
              </span>
              <br />
              <span
                className={cn(
                  'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'
                )}
              >
                use case
              </span>
            </motion.h1>

            <motion.p
              variants={descriptionVariants}
              initial='hidden'
              animate={controls}
              className='text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center font-sans'
            >
              We take care of sourcing so you can focus on your candidate
              experience
            </motion.p>
          </motion.div>

          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
    </div>
  );
}
