'use client';

import * as React from 'react';

export function GridBackground() {
  return (
    <div className='absolute inset-0 pointer-events-none'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
}
