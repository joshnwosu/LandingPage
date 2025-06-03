import { ArrowRight, FileText, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fetchBlogs } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function BlogPage() {
  const page = 1;
  const perPage = 10;

  const { data } = await fetchBlogs(page, perPage);
  const { blogs } = data;

  if (!blogs.length) {
    return (
      <section className='py-32 font-sans'>
        <div className='container mx-auto flex flex-col items-center gap-8 text-center'>
          <div className='rounded-full bg-muted p-6'>
            <FileText className='size-12 text-muted-foreground' />
          </div>
          <div>
            <h2 className='mb-3 text-2xl font-semibold'>No Articles Yet</h2>
            <p className='text-muted-foreground'>
              Check back soon for new articles about Sourzer, recruitment, and
              career development.
            </p>
          </div>
          <Button asChild variant='default' size='lg'>
            <Link href='/' className='inline-flex items-center gap-2'>
              <ArrowLeft className='size-4' />
              Back to Homepage
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className='py-32 font-sans'>
      <div className='container mx-auto flex flex-col items-center gap-16'>
        <div className='text-center'>
          <h2 className='mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl'>
            Latest Articles
          </h2>
          <p className='mx-auto max-w-2xl text-muted-foreground md:text-lg'>
            Explore our collection of insightful articles covering various
            topics in technology, recruitment, and career development.
          </p>
        </div>

        <div className='grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20'>
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className='order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2'
            >
              <div className='grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12'>
                <div className='sm:col-span-5'>
                  <div className='mb-4 md:mb-6'>
                    <div className='flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6'>
                      {blog.blogCategory && (
                        <span key={blog.blogCategory.name}>
                          {blog.blogCategory.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold md:text-2xl lg:text-3xl'>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className='hover:underline'
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <p className='mt-4 text-muted-foreground md:mt-5'>
                    {blog.summary}
                  </p>
                  <div className='mt-6 flex items-center space-x-4 text-sm md:mt-8'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={blog.created_by_profile_image}
                          alt={blog.created_by}
                        />
                        <AvatarFallback>
                          {blog.created_by.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{blog.created_by}</span>
                        {blog.created_by_position && (
                          <span className='text-xs text-muted-foreground'>
                            {blog.created_by_position}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className='text-muted-foreground'>•</span>
                    <span className='text-muted-foreground'>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className='mt-6 flex items-center space-x-2 md:mt-8'>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className='inline-flex items-center font-semibold hover:underline md:text-base'
                    >
                      <span>Read more</span>
                      <ArrowRight className='ml-2 size-4 transition-transform' />
                    </Link>
                  </div>
                </div>
                <div className='order-first sm:order-last sm:col-span-5'>
                  <Link href={`/blog/${blog.slug}`} className='block'>
                    <div className='aspect-16/9 overflow-clip rounded-lg border border-border'>
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className='h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
