'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // shadcn utility for className concatenation

// Sample sections data
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollSpyDemo() {
  const [activeSection, setActiveSection] = React.useState('home');

  // Set up Intersection Observer to track visible sections
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // Use viewport as root
        rootMargin: '-100px 0px -50% 0px', // Adjust to trigger when section is near top
        threshold: 0.1, // Trigger when 10% of section is visible
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar Navigation with ScrollArea */}
      <aside className='w-64 border-r sticky top-0 h-screen'>
        {/* <ScrollArea className='h-screen'> */}
        <nav className='p-4'>
          <ul className='space-y-2'>
            {sections.map((section) => (
              <li key={section.id}>
                <Button
                  variant={activeSection === section.id ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    activeSection === section.id &&
                      'bg-primary text-primary-foreground'
                  )}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        {/* </ScrollArea> */}
      </aside>

      {/* Main Content */}
      <main className='flex-1'>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className='min-h-screen flex items-center justify-center bg-gray-100'
          >
            <h2 className='text-3xl font-bold'>{section.label}</h2>
          </section>
        ))}
      </main>
    </div>
  );
}
