import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { clearAuthUser, getAuthUser } from '@/lib/auth';
import { LogOut, PenTool } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const user = getAuthUser();

  const handleLogout = () => {
    clearAuthUser();
    router.push('/admin/login');
  };

  return (
    <div className='min-h-screen'>
      <header className='shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              {/* <PenTool className='h-8 w-8 text-blue-600' /> */}
              <h1 className='ml-2 text-xl font-semibold'>Blog Admin</h1>
            </div>
            <div className='flex items-center space-x-4'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleLogout}
                className='flex items-center'
              >
                <LogOut className='h-4 w-4 mr-2' />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        {children}
      </main>
    </div>
  );
}
