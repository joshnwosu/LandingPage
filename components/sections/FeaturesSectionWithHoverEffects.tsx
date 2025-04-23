import { cn } from '@/lib/utils';
import { Search, FileCheck, Calendar, BarChart } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: 'Sourcing Agent',
      description:
        'Automatically source databases and social networks to identify potential candidates.',
      icon: <Search />,
    },
    {
      title: 'Screening Agents',
      description:
        'Quickly review resumes and applications, highlighting standout qualifications.',
      icon: <FileCheck />,
    },
    {
      title: 'Interview Agent',
      description:
        'Schedule interviews and even conduct preliminary screenings through chat or video.',
      icon: <Calendar />,
    },
    {
      title: 'Competitor Analysis Agent',
      description:
        'Analyze competitors talent strategies, helping you stay ahead in acquiring top talent.',
      icon: <BarChart />,
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto'>
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut', delay: index * 0.2 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.1 },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.2 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
      )}
      {index >= 4 && (
        <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
      )}
      <motion.div
        variants={iconVariants}
        initial='hidden'
        animate={controls}
        className='mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400'
      >
        {icon}
      </motion.div>
      <motion.div
        variants={titleVariants}
        initial='hidden'
        animate={controls}
        className='text-lg font-bold mb-2 relative z-10 px-10'
      >
        <div className='absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center' />
        <span className='group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100'>
          {title}
        </span>
      </motion.div>
      <motion.p
        variants={descriptionVariants}
        initial='hidden'
        animate={controls}
        className='text-lg text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10'
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
