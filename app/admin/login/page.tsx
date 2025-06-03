'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { setAuthUser, isAuthenticated } from '@/lib/auth';
import { PenTool, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin/blogs');
    }
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple frontend-only validation (in real app, this would be backend)
    if (data.username === 'admin' && data.password === '@Sourzer2025') {
      setAuthUser({
        username: data.username,
        isAuthenticated: true,
      });

      toast.success('Login successful!');

      router.push('/admin/blogs');
    } else {
      toast.error('Invalid credentials. Try contacting the admin');
    }

    setIsLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          {/* <div className='flex justify-center mb-4'>
            <PenTool className='h-12 w-12 text-blue-600' />
          </div> */}
          <CardTitle className='text-2xl'>Blog Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the blog admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                {...register('username')}
                placeholder='Enter username'
                autoComplete='username'
              />
              {errors.username && (
                <p className='text-sm text-red-600'>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                {...register('password')}
                placeholder='Enter password'
                autoComplete='current-password'
              />
              {errors.password && (
                <p className='text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
