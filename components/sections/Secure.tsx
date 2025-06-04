import React from 'react';
import { Button } from '@/components/ui/button';

const Secure = () => {
  return (
    <section className='w-full pb-16 px-4 font-mono'>
      <div className='max-w-4xl mx-auto text-center bg-muted/10 p-14 relative border-t-[20px]'>
        <h2 className='text-3xl font-medium mb-6'>
          Securely, ethically with the highest technical barriers
        </h2>

        <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
          We take security very seriously. All data is encrypted with AES-256
          encryption, and your data is stored in secure, GDPR-compliant data
          centers.
        </p>

        <div className='flex flex-wrap justify-center gap-4 mb-6'>
          {/* Non-clickable certification buttons */}
          <div className='px-6 py-2 bg-sidebar rounded-md text-muted-foreground font-medium text-sm'>
            CCPA Compliant
          </div>
          <div className='px-6 py-2 bg-sidebar rounded-md text-muted-foreground font-medium text-sm'>
            GDPR Compliant
          </div>
          <div className='px-6 py-2 bg-sidebar rounded-md text-muted-foreground font-medium text-sm'>
            SOC 2 Compliant
          </div>
        </div>

        {/* Clickable CTA button */}
        <Button
          onClick={() => (window.location.href = '/access')}
          className='cursor-pointer'
        >
          GET ACCESS
        </Button>
      </div>
    </section>
  );
};

export default Secure;
