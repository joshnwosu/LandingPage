'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='relative border-t bg-background text-foreground transition-colors duration-300 font-sans'>
      <div className='container max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8'>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
          <div className='relative'>
            <h2 className='mb-4 text-2xl font-light tracking-tight'>Sourzer</h2>
            <p className='mb-6 text-muted-foreground'>
              Never miss top talents again!
            </p>

            <div className='absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl' />
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <nav className='space-y-4 text-md'>
              <a
                href='#'
                className='block transition-colors hover:text-primary'
              >
                Home
              </a>
              <a
                href='#'
                className='block transition-colors hover:text-primary'
              >
                Features
              </a>
              <a
                href='#'
                className='block transition-colors hover:text-primary'
              >
                Pricing
              </a>
              <a
                href='#'
                className='block transition-colors hover:text-primary'
              >
                Contact us
              </a>
            </nav>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Contact Us</h3>
            <address className='space-y-2 text-sm not-italic'>
              <p>3a Habitat Close</p>
              <p>Lekki phase 1, Nigeria</p>
              <p>Phone: (234) 8085-732-766</p>
              <p>Email: tobi@sourzer.co</p>
            </address>
          </div>
          <div className='relative'>
            <h3 className='mb-4 text-lg font-semibold'>Follow Us</h3>
            <div className='mb-6 flex space-x-4'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Facebook className='h-4 w-4' />
                      <span className='sr-only'>Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Twitter className='h-4 w-4' />
                      <span className='sr-only'>Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Instagram className='h-4 w-4' />
                      <span className='sr-only'>Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Linkedin className='h-4 w-4' />
                      <span className='sr-only'>LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row'>
          <p className='text-sm text-muted-foreground'>
            © 2025 Your Company. All rights reserved.
          </p>

          <nav className='flex gap-4 text-sm'>
            <a
              href='/privacy-policy'
              className='transition-colors hover:text-primary'
            >
              Privacy Policy
            </a>
            <a
              href='/terms-of-service'
              className='transition-colors hover:text-primary'
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
