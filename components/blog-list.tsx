'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchBlogs, type Blog, type BlogsResponse } from '@/lib/api';
import { Loader2, Calendar, User, Eye, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 15,
    total: 0,
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const response: BlogsResponse = await fetchBlogs(
        pagination.page,
        pagination.perPage
      );
      setBlogs(response.data.blogs);
      setPagination({
        page: response.data.page,
        perPage: response.data.lastPage,
        total: response.data.total,
      });
    } catch (error) {
      toast.error('Failed to load blogs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='ml-2'>Loading blogs...</span>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>
          No blogs found. Create your first blog post!
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Blog Posts</h2>
        <Badge variant='secondary'>{pagination.total} total posts</Badge>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className='overflow-hidden hover:shadow-lg transition-shadow p-0 flex flex-col h-full'
          >
            <div className='aspect-video relative'>
              <img
                src={blog.image_url}
                alt={blog.title}
                className='absolute inset-0 w-full h-full object-cover'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            <div className='flex flex-col flex-1'>
              <CardHeader className='pb-3 flex-1'>
                <div className='flex items-center justify-between mb-2'>
                  <Badge variant='outline'>Category</Badge>
                  <Badge variant='secondary'>{blog.blogCategory.name}</Badge>
                </div>
                <CardTitle className='line-clamp-2'>{blog.title}</CardTitle>
                <CardDescription className='line-clamp-3'>
                  {blog.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className='p-4 mt-auto border-t'>
                <div className='flex items-center space-x-4'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage
                      src={blog.created_by_profile_image}
                      alt={blog.created_by}
                    />
                    <AvatarFallback>
                      <User className='h-5 w-5' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {blog.created_by}
                    </p>
                    <div className='flex items-center space-x-1 text-xs text-muted-foreground'>
                      <p className='truncate'>{blog.created_by_position}</p>
                      {blog.createdAt && (
                        <>
                          <span>•</span>
                          <div className='flex items-center'>
                            <Calendar className='h-3 w-3 mr-1' />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex gap-2 mt-4'>
                  <Button
                    variant='outline'
                    className='flex-1'
                    onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                  >
                    <Eye className='w-4 h-4 mr-2' />
                    Preview
                  </Button>
                  <Button
                    variant='secondary'
                    className='flex-1'
                    onClick={() => {
                      window.location.href = `/admin/blogs?edit=${blog.id}`;
                    }}
                  >
                    <Pencil className='w-4 h-4 mr-2' />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
