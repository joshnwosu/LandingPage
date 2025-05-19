import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular?: string;
    gradient?: string;
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
  lightLineColor = '#808080',
  darkLineColor = '#808080',
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
        'opacity-[var(--opacity)]'
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

// Animation variants for the image
const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
  },
};

// Animation variants for the h2 text
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Product = React.forwardRef<HTMLDivElement, ProductProps>(
  (
    {
      className,
      subtitle = { regular: '', gradient: '' },
      ctaText = 'Get Started',
      ctaHref,
      bottomImage,
      gridOptions,
      ...props
    },
    ref
  ) => {
    // Controls for h2 text
    const textControls = useAnimation();
    const [textRef, textInView] = useInView({
      threshold: 0.5,
      triggerOnce: true,
    });

    // Controls for bottomImage
    const imageControls = useAnimation();
    const [imageRef, imageInView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    React.useEffect(() => {
      if (textInView) {
        textControls.start('visible');
      }
    }, [textControls, textInView]);

    React.useEffect(() => {
      if (imageInView) {
        imageControls.start('visible');
      }
    }, [imageControls, imageInView]);

    return (
      <div className={cn('relative', className)} ref={ref} {...props}>
        <div className='relative max-w-full mx-auto z-10'>
          <RetroGrid {...gridOptions} />
          <div className='max-w-screen-xl mx-auto px-4 py-16 md:py-24 gap-12 md:px-8'>
            <motion.div
              ref={textRef}
              variants={textVariants}
              initial='hidden'
              animate={textControls}
              className='space-y-5 max-w-6xl mx-auto text-center'
            >
              <p className='text-sm md:text-xl leading-relaxed tracking-tight text-muted-foreground text-center mb-8 font-sans max-w-xl mx-auto px-4'>
                Want to learn more?
              </p>
              <h2
                className={cn(
                  'text-3xl md:text-7xl tracking-tighter font-geist bg-clip-text text-transparent',
                  'bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)]',
                  'dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'
                )}
              >
                {subtitle.regular || 'Try risk free. Ask us how.'} <br />
                {/* <span
                  className={cn(
                    'text-transparent bg-clip-text bg-gradient-to-r',
                    'from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'
                  )}
                >
                  {subtitle.gradient || 'Try risk free. Ask us how.'}
                </span> */}
              </h2>

              <div className='items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 mt-10'>
                <span
                  role='button'
                  className='relative inline-block overflow-hidden rounded-full p-[1.5px]'
                >
                  <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                  <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl'>
                    <Link
                      href={ctaHref}
                      className={cn(
                        'inline-flex rounded-full text-center items-center w-full justify-center',
                        'bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent',
                        'dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white',
                        'border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30',
                        'hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10',
                        'dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10'
                      )}
                    >
                      {ctaText}
                    </Link>
                  </div>
                </span>
              </div>
            </motion.div>
            {bottomImage && (
              <motion.div
                ref={imageRef}
                variants={cardVariants}
                initial='hidden'
                animate={imageControls}
                className='mt-12 md:mt-20 mx-10 relative z-10'
              >
                <img
                  src={bottomImage.light}
                  className='w-full shadow-lg rounded-lg border border-gray-200 dark:hidden'
                  alt='Dashboard preview'
                />
                <img
                  src={bottomImage.dark}
                  className='hidden w-full shadow-lg rounded-lg dark:block'
                  alt='Dashboard preview'
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Product.displayName = 'Product';

export default Product;
