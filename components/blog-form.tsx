'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { blogSchema, type BlogFormData } from '@/lib/validations';
import {
  createBlog,
  fetchBlogCategories,
  type BlogCategory,
  fetchBlog,
  updateBlog,
} from '@/lib/api';
import {
  Loader2,
  User,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Redo,
} from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from './rich-text-editor';
import { AddCategoryDialog } from './add-category-dialog';

// Default data for dropdowns
const TEAMS = [
  'Engineering',
  'Design',
  'Marketing',
  'Product',
  'Sales',
  'Support',
  'HR',
  'Finance',
];

const POSITIONS = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Software Engineer',
  'Engineering Manager',
  'Product Manager',
  'Senior Product Manager',
  'UI/UX Designer',
  'Senior Designer',
  'Design Lead',
  'Marketing Manager',
  'Content Manager',
  'Sales Manager',
  'Customer Success Manager',
];

const AUTHORS = [
  {
    name: 'Oyinade',
    position: 'Product Manager',
    team: 'Product',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Tobi Odejinmi',
    position: 'CEO',
    team: 'Engineering',
    image: 'https://avatars.githubusercontent.com/u/56538999?v=4',
  },
  {
    name: 'Joshua Nwosu',
    position: 'Senior Software Engineer',
    team: 'Engineering',
    image: 'https://avatars.githubusercontent.com/u/28848976?v=4',
  },
];

export interface BlogFormProps {
  blogId?: string;
}

export function BlogForm({ blogId }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!blogId);
  const [selectedAuthor, setSelectedAuthor] = useState<
    (typeof AUTHORS)[0] | null
  >(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [summaryLength, setSummaryLength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  const watchedAuthor = watch('created_by');

  const loadBlog = async (id: string) => {
    try {
      setIsLoading(true);
      const blog = await fetchBlog(id);

      // Set form values
      setValue('title', blog.data.title);
      setValue('summary', blog.data.summary);
      setValue('body', blog.data.body);
      setValue('blogCategoryId', blog.data.blogCategory?.id);
      setValue('created_by', blog.data.created_by);
      setValue('created_by_position', blog.data.created_by_position);
      setValue('created_by_profile_image', blog.data.created_by_profile_image);
      setValue('team', blog.data.team);
      setValue('image_url', blog.data.image_url);

      // Set selected author if it matches
      const author = AUTHORS.find((a) => a.name === blog.data.created_by);
      if (author) {
        setSelectedAuthor(author);
      }
    } catch (error) {
      toast.error('Failed to load blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetchBlogCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to load blog categories');
      console.error('Error loading categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadCategories();
    if (blogId) {
      loadBlog(blogId);
    }
  }, [blogId]);

  // Debounce summary length update
  useEffect(() => {
    const summary = watch('summary');
    const timeoutId = setTimeout(() => {
      setSummaryLength(summary?.length || 0);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [watch('summary')]);

  const handleAuthorChange = (authorName: string) => {
    const author = AUTHORS.find((a) => a.name === authorName);
    if (author) {
      setSelectedAuthor(author);
      setValue('created_by', author.name);
      setValue('created_by_position', author.position);
      setValue('team', author.team);
      setValue('created_by_profile_image', author.image);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);

    try {
      if (blogId) {
        const { blogCategoryId, ...updateData } = data;
        await updateBlog(blogId, updateData);
        toast.success('Blog post updated successfully!');
        console.log('data: ', data);
      } else {
        await createBlog(data);
        toast.success('Blog post created successfully!');
        reset();
        setSelectedAuthor(null);
      }
    } catch (error) {
      toast.error(
        blogId ? 'Failed to update blog post' : 'Failed to create blog post'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='ml-2'>Loading blog post...</span>
      </div>
    );
  }

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>
          {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
        </CardTitle>
        <CardDescription>
          {blogId
            ? 'Update the form below to edit this blog post.'
            : 'Fill out the form below to create a new blog post.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                {...register('title')}
                placeholder='Enter blog title'
              />
              {errors.title && (
                <p className='text-sm text-red-600'>{errors.title.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center mb-2'>
                <Label htmlFor='blogCategory'>Blog Category</Label>
              </div>
              <Controller
                name='blogCategoryId'
                control={control}
                render={({ field }) => (
                  <div className='flex gap-4'>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                      disabled={isLoadingCategories || blogId != undefined}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingCategories
                              ? 'Loading categories...'
                              : 'Select a category'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {!blogId && (
                      <AddCategoryDialog
                        onCategoryAdded={() => {
                          setIsLoadingCategories(true);
                          loadCategories();
                        }}
                      />
                    )}
                  </div>
                )}
              />
              {errors.blogCategoryId && (
                <p className='text-sm text-red-600'>
                  {errors.blogCategoryId.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Author & Team</Label>
            <div className='flex gap-4'>
              <Select onValueChange={handleAuthorChange} value={watchedAuthor}>
                <SelectTrigger>
                  <SelectValue>
                    {selectedAuthor && (
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-6 w-6'>
                          <AvatarImage
                            src={selectedAuthor.image}
                            alt={selectedAuthor.name}
                          />
                          <AvatarFallback>
                            <User className='h-3 w-3' />
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='font-medium'>
                            {selectedAuthor.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {AUTHORS.map((author) => (
                    <SelectItem key={author.name} value={author.name}>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-6 w-6'>
                          <AvatarImage src={author.image} alt={author.name} />
                          <AvatarFallback>
                            <User className='h-3 w-3' />
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{author.name}</span>
                          <span className='text-xs text-muted-foreground'>
                            {author.position}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Controller
                name='team'
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select team' />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAMS.map((team) => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {(errors.created_by || errors.team) && (
              <p className='text-sm text-red-600'>
                {errors.created_by?.message || errors.team?.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='summary'>Summary</Label>
              <span className='text-xs text-muted-foreground'>
                {summaryLength}/120 characters
              </span>
            </div>
            <Textarea
              id='summary'
              {...register('summary')}
              placeholder='Enter blog summary (max 120 characters)'
              rows={3}
              maxLength={120}
              className='resize-none'
            />
            {errors.summary && (
              <p className='text-sm text-red-600'>{errors.summary.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label>Body</Label>
            <Controller
              name='body'
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder='Start writing your blog content...'
                />
              )}
            />
            {errors.body && (
              <p className='text-sm text-red-600'>{errors.body.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='image_url'>Blog Image</Label>
            <div className='w-full md:w-[300px] grid grid-cols-1 gap-4'>
              <div>
                <Input
                  id='image_url'
                  {...register('image_url')}
                  placeholder='Enter image URL'
                />
                {errors.image_url && (
                  <p className='text-sm text-red-600'>
                    {errors.image_url.message}
                  </p>
                )}
              </div>
              <div className='aspect-video relative bg-muted rounded-lg overflow-hidden'>
                {watch('image_url') ? (
                  <img
                    src={watch('image_url')}
                    alt='Blog preview'
                    className='absolute inset-0 w-full h-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className='absolute inset-0 flex items-center justify-center text-muted-foreground'>
                    <Image className='h-8 w-8' />
                    <span className='ml-2'>Image preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <input
            type='hidden'
            {...register('created_by_profile_image')}
            value={selectedAuthor?.image || ''}
          />

          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full md:w-auto'
            >
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isSubmitting
                ? blogId
                  ? 'Updating...'
                  : 'Creating...'
                : blogId
                ? 'Update Blog Post'
                : 'Create Blog Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
