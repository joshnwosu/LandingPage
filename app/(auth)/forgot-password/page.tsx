'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Mail, MoveRight } from 'lucide-react';
import Link from 'next/link';

// Zod schema remains the same
const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted:', values);
  }

  return (
    <div className='flex flex-col'>
      <div className='space-y-6 text-left'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h1 className='text-3xl tracking-tighter font-sans bg-clip-text text-transparent mx-auto  bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
            <span>Forgot Password </span>
          </h1>

          <p className='text-md leading-relaxed tracking-tight text-muted-foreground font-sans max-w-xl py-4'>
            No worries, we'll send you resent instructions.
          </p>
        </motion.div>
      </div>

      <div className='w-[400px] mx-auto space-y-12'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 items-start'>
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
              </div>

              <Button
                type='submit'
                variant='secondary'
                className='w-full h-12 px-6 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-100 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed'
              >
                Continue
                <MoveRight className='ml-2 h-4 w-4' />
              </Button>

              <p className='text-md leading-relaxed tracking-tight text-muted-foreground text-center font-sans max-w-xl mx-auto px-4'>
                {/* <MoveLeft /> */}
                <Link href='/login' className='text-blue-500'>
                  Back to log in
                </Link>
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
