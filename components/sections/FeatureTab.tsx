import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface TabContent {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  heading?: string;
  description?: string;
  tabs: Tab[];
}

const FeatureTab = ({ heading, description, tabs }: Feature108Props) => {
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

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  const tabsListVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
    },
  };

  const tabTriggerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut', delay: 0.4 + i * 0.1 },
    }),
  };

  return (
    <motion.section ref={ref} className='py-10 md:py-30'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <motion.h2
            variants={headingVariants}
            initial='hidden'
            animate={controls}
            className='text-3xl  md:text-7xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={descriptionVariants}
            initial='hidden'
            animate={controls}
            className='text-muted-foreground max-w-2xl text-lg'
          >
            {description}
          </motion.p>
        </div>
        <Tabs defaultValue={tabs[0].value} className='mt-8'>
          <motion.div
            variants={tabsListVariants}
            initial='hidden'
            animate={controls}
          >
            <TabsList className='container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10'>
              {tabs.map((tab, index) => (
                <motion.div
                  key={tab.value}
                  custom={index}
                  variants={tabTriggerVariants}
                  initial='hidden'
                  animate={controls}
                >
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className='flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary'
                  >
                    {tab.icon} {tab.label}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>
          <div className='mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16'>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className='grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10'
              >
                <div className='flex flex-col gap-5'>
                  <h3 className='text-3xl font-semibold lg:text-5xl'>
                    {tab.content.title}
                  </h3>
                  <p className='text-muted-foreground lg:text-lg'>
                    {tab.content.description}
                  </p>
                  <Link href='/waitlist'>
                    <Button className='mt-2.5 w-fit gap-2' size='lg'>
                      {tab.content.buttonText} <MoveRight className='w-4 h-4' />
                    </Button>
                  </Link>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className='rounded-xl'
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </motion.section>
  );
};

export default FeatureTab;
