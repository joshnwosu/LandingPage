import BlogPreview from '@/components/blog-preview';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; title: string }>;
}) {
  const { slug } = await params;

  return <BlogPreview slug={slug} />;
}
