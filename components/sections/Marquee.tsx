'use client';

import { Logos } from '@/data/logos';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import FastMarquee from 'react-fast-marquee';
import type { MarqueeProps as FastMarqueeProps } from 'react-fast-marquee';

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div
    className={cn('relative w-full overflow-hidden', className)}
    {...props}
  />
);

export type MarqueeContentProps = FastMarqueeProps;

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = false,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    loop={loop}
    autoFill={autoFill}
    pauseOnHover={pauseOnHover}
    {...props}
  />
);

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      'absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent',
      side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l',
      className
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div
    className={cn('mx-2 flex-shrink-0 object-contain', className)}
    {...props}
  />
);

function MarqueeSection() {
  const arr = [Logos.tailwindcss, Logos.framer, Logos.nextjs, Logos.aws];
  return (
    <div className='py-10'>
      <p className='text-lg md:text-xl leading-relaxed tracking-tight text-center text-muted-foreground'>
        Trusted by 3000+ recruiters worldwide
      </p>
      <Marquee className='py-10'>
        <MarqueeFade side='left' />
        <MarqueeFade side='right' />
        <MarqueeContent>
          {arr.map((Logo, index) => (
            <MarqueeItem
              key={index}
              className='relative h-full w-fit mx-[3rem] flex items-center justify-start grayscale hover:grayscale-0 transition-all duration-300'
            >
              <Logo />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}

export default MarqueeSection;
