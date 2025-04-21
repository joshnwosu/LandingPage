import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular: string;
    gradient: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref: string;
  bottomImage?: {
    light: string;
    dark: string;
  };
  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lightLineColor?: string;
    darkLineColor?: string;
  };
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = 'gray',
  darkLineColor = 'gray',
}) => {
  const gridStyles = {
    '--grid-angle': `${angle}deg`,
    '--cell-size': `${cellSize}px`,
    '--opacity': opacity,
    '--light-line': lightLineColor,
    '--dark-line': darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        'pointer-events-none absolute size-full overflow-hidden [perspective:200px]',
        `opacity-[var(--opacity)]`
      )}
      style={gridStyles}
    >
      <div className='absolute inset-0 [transform:rotateX(var(--grid-angle))]'>
        <div className='animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]' />
      </div>
      <div className='absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black' />
    </div>
  );
};

const Product = React.forwardRef<HTMLDivElement, ProductProps>(
  (
    {
      className,
      subtitle = {},
      ctaText,
      ctaHref,
      bottomImage = {},
      gridOptions,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative', className)} ref={ref} {...props}>
        <div className='relative max-w-full mx-auto z-1'>
          <RetroGrid {...gridOptions} />
          <div className='max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8'>
            <div className='space-y-5 max-w-6xl leading-0 lg:leading-5 mx-auto text-center'>
              <h2 className='text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
                {subtitle.regular} <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'>
                  {subtitle.gradient}
                </span>
              </h2>

              <div className='items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0'>
                <span className='relative inline-block overflow-hidden rounded-full p-[1.5px]'>
                  <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                  <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl'>
                    <Link
                      href={ctaHref}
                      className='inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10'
                    >
                      {ctaText}
                    </Link>
                  </div>
                </span>
              </div>
            </div>
            {bottomImage && (
              <div className='mt-32 mx-10 relative z-10'>
                <img
                  src={bottomImage.light}
                  className='w-full shadow-lg rounded-lg border border-gray-200 dark:hidden'
                  alt='Dashboard preview'
                />
                <img
                  src={bottomImage.dark}
                  className='hidden w-full shadow-lg rounded-lg border border-gray-800 dark:block'
                  alt='Dashboard preview'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Product.displayName = 'Product';

export default Product;
