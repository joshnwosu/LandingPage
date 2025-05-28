import React, { useState, useEffect } from 'react';
import { Search, Zap, Target, Filter, Download } from 'lucide-react';
import GithubIcon from '@/icon/github';
import LinkedinIcon from '@/icon/linkedin';
import IndeedIcon from '@/icon/indeed';
import { cn } from '@/lib/utils';

const CandidateSourcingSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const platforms = [
    {
      name: 'GitHub',
      icon: GithubIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      count: '100M+',
      specialty: 'Developers',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      count: '900M+',
      specialty: 'Professionals',
    },
    {
      name: 'Indeed',
      icon: IndeedIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      count: '250M+',
      specialty: 'Job Seekers',
    },
  ];

  const steps = [
    {
      icon: Search,
      title: 'AI Search',
      description: 'Define your ideal candidate profile',
      color: 'text-purple-400',
    },
    {
      icon: Filter,
      title: 'Smart Filter',
      description: 'Apply advanced filters & criteria',
      color: 'text-blue-400',
    },
    {
      icon: Target,
      title: 'Match & Rank',
      description: 'AI ranks candidates by relevance',
      color: 'text-green-400',
    },
    {
      icon: Download,
      title: 'Export',
      description: 'Download candidate profiles instantly',
      color: 'text-orange-400',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
      setAnimationKey((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='text-white py-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='space-y-4 flex flex-col justify-center items-center mb-12'>
          <h1 className='text-3xl md:text-7xl max-w-4xl tracking-tighter text-center font-sans capitalize'>
            <span className='text-spektr-cyan-50 font-extralight'>
              Source Candidates
            </span>
            <span
              className={cn(
                'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 font-bold'
              )}
            >
              {' '}
              10x{' '}
            </span>
            <span className='text-spektr-cyan-50 font-extralight'>
              Faster. All in One Platform
            </span>
          </h1>
          <p className='text-muted-foreground max-w-2xl text-lg text-center'>
            Our AI-powered platform connects to the world's largest talent
            pools, intelligently matches candidates, and delivers results in
            minutes.
          </p>
        </div>

        {/* Main Diagram */}
        <div className='relative'>
          {/* Data Sources (Top) */}
          <div className='flex justify-center items-center gap-8 mb-4'>
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div key={index} className='text-center'>
                  {/* Platform Card */}
                  <div
                    className={`relative backdrop-blur-sm transition-all duration-500 hover:scale-105`}
                  >
                    <Icon className='w-24 h-24 text-white' />
                  </div>

                  {/* Connecting Line */}
                  <div className='w-px h-16 bg-gradient-to-b from-gray-600 to-transparent mx-auto mt-6'></div>
                </div>
              );
            })}
          </div>

          {/* Central AI Engine */}
          <div className='flex justify-center mb-4'>
            <div className='relative'>
              <div className='w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl'>
                <div className='w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center'>
                  <Zap className='w-12 h-12 text-purple-400' />
                </div>
              </div>

              {/* Pulsing Rings */}
              <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 animate-ping'></div>
              <div className='absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse'></div>

              {/* AI Label */}
              <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700'>
                <span className='text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                  AI Engine
                </span>
              </div>
            </div>
          </div>

          {/* Process Steps (Bottom) */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4'>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;

              return (
                <div key={index} className='text-center'>
                  {/* Connecting Line from AI Engine */}
                  <div className='w-px h-16 bg-gradient-to-b from-transparent to-gray-600 mx-auto mb-6'></div>

                  {/* Step Card */}
                  <div
                    className={`relative p-6 rounded-2xl border transition-all duration-500 ${
                      isActive
                        ? 'border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30 scale-105'
                        : 'border bg-sidebar'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-800 flex items-center justify-center ${
                        isActive ? 'animate-pulse' : ''
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <h3 className='font-semibold text-lg mb-2'>{step.title}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {step.description}
                    </p>

                    {/* Step Number */}
                    <div
                      className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isActive
                          ? 'bg-purple-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connecting Lines */}
          <svg
            className='absolute inset-0 w-full h-full pointer-events-none'
            style={{ zIndex: -1 }}
          >
            <defs>
              <linearGradient
                id='lineGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='#8B5CF6' stopOpacity='0.3' />
                <stop offset='100%' stopColor='#3B82F6' stopOpacity='0.3' />
              </linearGradient>
            </defs>
            {/* You can add more connecting lines here if needed */}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CandidateSourcingSection;
