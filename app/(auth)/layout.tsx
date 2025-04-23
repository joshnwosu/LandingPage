import { GridBackground } from '@/components/shared/grid-background';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='relative min-h-screen font-sans py-6'>
      <GridBackground />
      {children}
    </main>
  );
}
