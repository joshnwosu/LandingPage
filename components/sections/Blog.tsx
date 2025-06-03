import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
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
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 + index * 0.2 },
    }),
  };

  return (
    <section className='py-32'>
      <motion.div
        ref={ref}
        className='container mx-auto flex flex-col items-center gap-16 lg:px-16'
      >
        <motion.div className='text-center'>
          <Badge variant='secondary' className='mb-6'>
            {tagline}
          </Badge>
          <motion.h2
            variants={headingVariants}
            initial='hidden'
            animate={controls}
            className='text-3xl md:text-7xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'
          >
            {heading}
          </motion.h2>
          {!isLoading && posts.length > 0 && (
            <>
              <motion.p
                variants={contentVariants}
                initial='hidden'
                animate={controls}
                className='my-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-md'
              >
                {description}
              </motion.p>
              <motion.div
                variants={contentVariants}
                initial='hidden'
                animate={controls}
              >
                <Button variant='link' className='w-full sm:w-auto' asChild>
                  <a href={buttonUrl}>
                    {buttonText}
                    <ArrowRight className='ml-2 size-4' />
                  </a>
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
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
              <motion.div
                key={post.id}
                custom={index}
                variants={cardVariants}
                initial='hidden'
                animate={controls}
              >
                <Card className='grid grid-rows-[auto_auto_1fr_auto] pt-0'>
                  <div className='aspect-16/9 w-full'>
                    <a
                      href={`/blog/${post.slug}`}
                      className='transition-opacity duration-200 fade-in hover:opacity-70'
                    >
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className='h-full w-full object-cover object-center'
                      />
                    </a>
                  </div>
                  <CardHeader>
                    <h3 className='text-lg font-semibold hover:underline md:text-xl'>
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground'>{post.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <a
                      href={`/blog/${post.slug}`}
                      className='flex items-center text-foreground hover:underline'
                    >
                      Read more
                      <ArrowRight className='ml-2 size-4' />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Blog;
