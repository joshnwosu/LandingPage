'use client';

import FeatureTab from '@/components/sections/FeatureTab';
import Footer from '@/components/sections/Footer';
import Product from '@/components/sections/Product';
import Hero from '@/components/sections/Hero';
import MarqueeSection from '@/components/sections/Marquee';
import { NavBar } from '@/components/sections/NavBar';
import Pricing from '@/components/sections/Pricing';
import { FEATURES3 } from '@/data/features';
import { NAVITEMS } from '@/data/nav-items';
import { PAYMENT_FREQUENCIES, TIERS } from '@/data/pricing';
import Feature from '@/components/sections/Feature';
import FAQ from '@/components/sections/FAQ';
import CandidateSourcingSection from '@/components/sections/Diagram';
import Blog from '@/components/sections/Blog';
import Secure from '@/components/sections/Secure';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen font-sans '>
      <NavBar items={NAVITEMS} />
      <section id='home'>
        <Hero />
      </section>
      <main className='flex-grow px-8'>
        {false && <MarqueeSection />}
        <CandidateSourcingSection />
        <section id='products'>
          <Product
            title='Welcome to Our Platform'
            description='Transform your ideas into reality with our comprehensive suite of development tools and resources.'
            ctaText='Book a Demo'
            ctaHref='/waitlist'
            bottomImage={{
              light: '/screenshots/listing-light.png',
              dark: '/screenshots/listing-dark.png',
            }}
            gridOptions={{
              angle: 65,
              opacity: 0.4,
              cellSize: 50,
              lightLineColor: '#4a4a4a',
              darkLineColor: '#2a2a2a',
            }}
          />
        </section>

        <section id='features'>
          <Feature />
        </section>
        <section id='pricing'>
          <Pricing
            title='plans & pricing'
            subtitle="Whether you’re looking for a sourcing platform or a complete recruitment solution, we've got the perfect companion for you"
            frequencies={PAYMENT_FREQUENCIES}
            tiers={TIERS}
          />
        </section>
        <section id='contact'>
          <FeatureTab {...FEATURES3} />
        </section>

        <section id='faq'>
          <FAQ />
        </section>

        <section id='blog'>
          <Blog
            heading='Blog Posts'
            description='Stay updated with the latest trends and insights in the recruitment industry. Our blog features articles, tips, and resources to help you navigate the world of hiring.'
            buttonText='View all articles'
            buttonUrl='/blog'
            tagline='Latest Updates'
          />
        </section>
        <section id='secure'>
          <Secure />
        </section>
        <Footer />
      </main>
    </div>
  );
}
