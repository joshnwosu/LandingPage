'use client';

import { BackgroundBeams } from '@/components/shared/background-beams';
import { GridBackground } from '@/components/shared/grid-background';
import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Building,
  Globe,
  Link,
  Mail,
  MoveRight,
  Phone,
  User,
} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone_number: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 digits.',
    })
    .optional(),
  country: z.string().min(2, {
    message: 'Country must be at least 2 characters.',
  }),
  company_name: z
    .string()
    .min(2, {
      message: 'Company name must be at least 2 characters.',
    })
    .optional(),
  reg_channel: z
    .string()
    .min(2, {
      message: 'Please specify how you heard about us.',
    })
    .optional(),
});

export default function waitlist() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      country: '',
      company_name: '',
      reg_channel: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className='relative min-h-screen'>
      <GridBackground />
      <BackgroundBeams />
      {/* <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      /> */}
      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='flex flex-col items-center justify-center'>
          <div className='space-y-6 text-center'>
            <h1 className='text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-sans'>
              <span className='text-spektr-cyan-50 font-extralight'>
                Join the waitlist for the{' '}
              </span>
              <br />
              <span
                className={cn(
                  'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'
                )}
              >
                Best Hire!
              </span>
            </h1>
          </div>

          <div className='w-full max-w-[600px] mx-auto p-8 space-y-12'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600' />
                            <Input
                              placeholder='Your name'
                              className='py-6 pl-10'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600' />
                            <Input
                              placeholder='Your email'
                              className='py-6 pl-10'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone_number'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600' />
                            <Input
                              placeholder='Your phone number'
                              className='py-6 pl-10'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600' />
                            <Input
                              placeholder='Your country'
                              className='py-6 pl-10'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='company_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600' />
                            <Input
                              placeholder='Your company name'
                              className='py-6 pl-10'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='reg_channel'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <Link className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600' />
                            <Input
                              placeholder='E.g., LinkedIn, Indeed'
                              className='py-6 pl-10'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full py-6'
                  variant='secondary'
                >
                  Continue <MoveRight className='ml-2 h-4 w-4' />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
