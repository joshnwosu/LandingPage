import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchBlogs, type Blog } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { data } = await fetchBlogs(1, 100);
  return data.blogs.map((blog: Blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { data } = await fetchBlogs(1, 100);
  const post = data.blogs.find((blog) => blog.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='container mx-auto px-4 py-12 max-w-4xl font-sans'>
      <Link href='/blog' className='block mb-12'>
        <Button variant='ghost' className='group'>
          <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Back to Blog
        </Button>
      </Link>

      <header className='mb-12'>
        <h1 className='text-4xl font-bold mb-6 leading-tight lg:text-5xl'>
          {post.title}
        </h1>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-muted-foreground'>
          <div className='flex items-center gap-3'>
            {post.created_by_profile_image && (
              <img
                src={post.created_by_profile_image}
                alt={post.created_by}
                className='w-10 h-10 rounded-full'
              />
            )}
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
      </div>
    </article>
  );
}
