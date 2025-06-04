import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { fetchBlogs, type Blog as BlogType } from '@/lib/api';
import { Loader2 } from 'lucide-react';

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

const Blog = ({
  tagline = 'Latest Updates',
  heading = 'Blog Posts',
  description = 'Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.',
  buttonText = 'View all articles',
  buttonUrl = '/blog',
}: Blog7Props) => {
  const [posts, setPosts] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchBlogs(1, 3); // Fetch only 3 posts
        setPosts(response.data.blogs);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <section className='py-32'>
      <div className='container max-w-7xl mx-auto flex flex-col items-center gap-16 lg:px-16'>
        <div className='text-center'>
          {false && (
            <Badge variant='secondary' className='mb-6'>
              {tagline}
            </Badge>
          )}
          <h2 className='text-3xl md:text-5xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
            {heading}
          </h2>
          {!isLoading && posts.length > 0 && (
            <>
              {false && (
                <p className='my-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-md'>
                  {description}
                </p>
              )}
              <div className='mt-8'>
                <Button variant='link' className='w-full sm:w-auto' asChild>
                  <Link href={buttonUrl}>
                    {buttonText}
                    <ArrowRight className='ml-2 size-4' />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
        {isLoading ? (
          <div className='flex items-center justify-center w-full py-12'>
            <Loader2 className='h-8 w-8 animate-spin' />
            <span className='ml-2'>Loading blog posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className='flex flex-col items-center justify-center w-full text-center'>
            <p className='text-lg text-muted-foreground mb-4'>
              No blog posts available at the moment.
            </p>
            <p className='text-sm text-muted-foreground'>
              Check back later for new content!
            </p>
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
            {posts.map((post, index) => (
              <div key={post.id} className='h-full'>
                <Card className='h-full grid grid-rows-[auto_auto_1fr_auto] pt-0 overflow-hidden'>
                  <div className='aspect-16/9 w-full'>
                    <Link
                      href={`/blog/${post.slug}`}
                      className='transition-opacity duration-200 fade-in hover:opacity-70'
                    >
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className='h-full w-full object-cover object-center'
                      />
                    </Link>
                  </div>
                  <CardHeader>
                    <h3 className='text-md font-semibold hover:underline md:text-md'>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className='text-muted-foreground mb-4 text-sm'>
                      {post.summary}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={post.created_by_profile_image}
                          alt={post.created_by}
                        />
                        <AvatarFallback>
                          {post.created_by.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {post.created_by}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {post.created_by_position}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/blog/${post.slug}`}
                      className='flex items-center text-foreground hover:underline'
                    >
                      Read more
                      <ArrowRight className='ml-2 size-4' />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
