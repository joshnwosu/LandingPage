import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Layout, MoveRight, Pointer, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  return (
    <section className='py-32'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <h2 className='text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
            {heading}
          </h2>
          <p className='text-muted-foreground max-w-2xl text-lg'>
            {description}
          </p>
        </div>
        <Tabs defaultValue={tabs[0].value} className='mt-8'>
          <TabsList className='container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10'>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className='flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary'
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
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
    </section>
  );
};

export default FeatureTab;
