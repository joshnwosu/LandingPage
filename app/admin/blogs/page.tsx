'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin-layout';
import { AuthGuard } from '@/components/auth-guard';
import { BlogForm } from '@/components/blog-form';
import { BlogList } from '@/components/blog-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, List, Pencil } from 'lucide-react';

// Inner component that uses useSearchParams
import { useSearchParams } from 'next/navigation';

function BlogsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get('edit');
  const [activeTab, setActiveTab] = useState(editId ? 'edit' : 'list');

  useEffect(() => {
    if (editId) {
      setActiveTab('edit');
    }
  }, [editId]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value !== 'edit') {
      // Remove the edit parameter from the URL
      router.push('/admin/blogs');
    }
  };

  return (
    <div className='space-y-6'>
      {false && (
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Blog Management</h1>
        </div>
      )}

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-3 max-w-md'>
          <TabsTrigger value='list' className='flex items-center'>
            <List className='h-4 w-4 mr-2' />
            View Blogs
          </TabsTrigger>
          <TabsTrigger value='create' className='flex items-center'>
            <Plus className='h-4 w-4 mr-2' />
            Create Blog
          </TabsTrigger>
          <TabsTrigger
            value='edit'
            className='flex items-center'
            disabled={!editId}
          >
            <Pencil className='h-4 w-4 mr-2' />
            Edit Blog
          </TabsTrigger>
        </TabsList>

        <TabsContent value='list' className='mt-6'>
          <BlogList />
        </TabsContent>

        <TabsContent value='create' className='mt-6'>
          <BlogForm />
        </TabsContent>

        <TabsContent value='edit' className='mt-6'>
          {editId && <BlogForm blogId={editId} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Main component with Suspense boundary
export default function BlogsPage() {
  return (
    <AuthGuard>
      <AdminLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogsContent />
        </Suspense>
      </AdminLayout>
    </AuthGuard>
  );
}
