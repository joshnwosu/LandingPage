import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FeaturesSectionWithHoverEffects from './FeaturesSectionWithHoverEffects';

export default function Feature() {
  return (
    <div className='w-full'>
      <div className='container mx-auto py-10 lg:py-20 '>
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
          <div className='flex gap-4 flex-col justify-center items-center'>
            <h1 className='text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-sans capitalize'>
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
            </h1>

            <p className='text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center font-sans'>
              We take care of sourcing so you can focus on your candidate
              experience
            </p>
          </div>
        </div>

        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}
