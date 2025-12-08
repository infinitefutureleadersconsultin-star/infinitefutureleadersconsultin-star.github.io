import { Hero } from '@/components/landing/Hero';
import { WhatMakesDifferent } from '@/components/landing/WhatMakesDifferent';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { SocialProof } from '@/components/landing/SocialProof';
import { Bio } from '@/components/landing/Bio';
import { Pricing } from '@/components/landing/Pricing';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhatMakesDifferent />
      <HowItWorks />
      <SocialProof />
      <Bio />
      <Pricing />
    </main>
  );
}
