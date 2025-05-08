'use client';

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
import { Building, Mail, MailCheck, MoveRight, User } from 'lucide-react';
import { PhoneInput } from '@/components/shared/phone-input';
import { parsePhoneNumber } from 'react-phone-number-input';
import { useEffect, useState } from 'react';
import { SuccessModal } from '@/components/shared/success-modal';
import { motion } from 'framer-motion';

// Zod schema remains the same
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Fullname must be at least 2 characters.',
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
    // .min(2, {
    //   message: 'Please specify how you heard about us.',
    // })
    .optional(),
});

export default function Waitlist() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Watch phone_number field to detect changes
  const phoneNumber = form.watch('phone_number');

  // Auto-populate country based on phone number
  useEffect(() => {
    if (phoneNumber) {
      try {
        const parsedNumber = parsePhoneNumber(phoneNumber);
        if (parsedNumber && parsedNumber.country) {
          // Map country code to country name
          const countryName = new Intl.DisplayNames(['en'], {
            type: 'region',
          }).of(parsedNumber.country);
          form.setValue('country', countryName || parsedNumber.country, {
            shouldValidate: true,
          });
        } else {
          form.setValue('country', '', { shouldValidate: true });
        }
      } catch (error) {
        form.setValue('country', '', { shouldValidate: true });
        console.log('Error: ', error);
      }
    } else {
      form.setValue('country', '', { shouldValidate: true });
    }
  }, [phoneNumber, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    try {
      // Parse phone number to get country code
      let countryCode = 'NG'; // Default to Nigeria as per example
      if (values.phone_number) {
        const parsedNumber = parsePhoneNumber(values.phone_number);
        if (parsedNumber && parsedNumber.country) {
          countryCode = parsedNumber.country;
        }
      }

      // Prepare payload
      const payload = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number || '',
        country: values.country,
        country_code: countryCode,
        company_name: values.company_name || '',
        reg_channel: values.reg_channel || 'linkedin',
      };

      // Make API request
      const response = await fetch(
        //'https://api-sandbox.getfless.com/api/join_talent_place_waitinglist',
        'https://api-production.billpass.app/api/join_talent_place_waitinglist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to join waitlist. Please try again.');
      }

      // On success
      setIsModalOpen(true);
      form.reset(); // Reset form after successful submission
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='relative min-h-screen font-sans'>
      <GridBackground />

      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='flex flex-col items-center justify-center'>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className='flex justify-center items-center mb-10 border-border border-8 w-20 h-20 md:w-30 md:h-30 rounded-full'>
              <div className='flex justify-center items-center border border-border w-10 h-10 md:w-20 md:h-20 rounded-full'>
                <MailCheck className='h-5 w-5 md:w-10 md:h-10 text-neutral-500 dark:text-orange-200' />
              </div>
            </div>
          </motion.div>
          <div className='space-y-6 text-center'>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h1 className='text-3xl md:text-6xl tracking-tighter font-sans bg-clip-text text-transparent mx-auto  bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
                <span>Join the waitlist for the </span>
                <br />
                <span
                  className={cn(
                    'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200'
                  )}
                >
                  Best Hire!
                </span>
              </h1>
            </motion.div>
          </div>

          <div className='w-full max-w-[600px] mx-auto p-8 space-y-12'>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='relative'>
                              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                              <Input
                                placeholder='Fullname'
                                className='h-12 pl-10'
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
                              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                              <Input
                                placeholder='Email address'
                                className='h-12 pl-10'
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
                              <PhoneInput
                                placeholder='Phone number'
                                className='h-12'
                                {...field}
                                defaultCountry='US'
                                onChange={(value) => {
                                  field.onChange(value); // Update form state
                                }}
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
                              <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                              <Input
                                placeholder='Company name'
                                className='h-12 pl-10'
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Continue'}{' '}
                    <MoveRight className='ml-2 h-4 w-4' />
                  </Button>

                  {error && (
                    <div className='text-red-500 text-center'>{error}</div>
                  )}
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="We've added you to our waiting list!"
        message="We'll let you know when Sourzer is ready."
        buttonText='Got it!'
      />
    </div>
  );
}
