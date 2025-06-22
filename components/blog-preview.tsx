'use client';

import { Blog, fetchBlogBySlug } from '@/lib/api';
import { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BlogPreviewProps {
  slug: string;
}

export default function BlogPreview({ slug }: BlogPreviewProps) {
  const [post, setPost] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await fetchBlogBySlug(slug);
      setPost(data);

      // console.log(data);
      // const post = data.blogs.find((blog) => blog.slug === slug);
    };

    fetchBlog();
  }, []);

  if (!post) {
    return;
  }

  return (
    <article className='container mx-auto px-4 py-12 max-w-4xl font-sans'>
      <Button
        variant='ghost'
        className='group mb-12'
        onClick={() => router.back()}
      >
        <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
        Back
      </Button>

      <header className='mb-12'>
        <h1 className='text-4xl font-bold mb-6 leading-tight lg:text-5xl'>
          {post?.title}
        </h1>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-muted-foreground'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={post.created_by_profile_image}
                alt={post.created_by}
              />
              <AvatarFallback>{post.created_by.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-medium'>{post.created_by}</p>
              <p className='text-sm text-muted-foreground'>
                {post.created_by_position}
              </p>
            </div>
          </div>
          <time dateTime={post.createdAt} className='text-sm'>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        {post.blogCategory && (
          <div className='mt-4'>
            <Badge variant='secondary'>{post.blogCategory.name}</Badge>
          </div>
        )}
      </header>

      {post.image_url && (
        <div className='mb-12'>
          <img
            src={post.image_url}
            alt={post.title}
            className='w-full h-auto rounded-lg'
          />
        </div>
      )}

      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <p>{post.summary}</p>

        {post.body && <div dangerouslySetInnerHTML={{ __html: post.body }} />}
      </div>
    </article>
  );
}
