import { Hero } from "@/components/landing/Hero";
import { AboutBento } from "@/components/landing/AboutBento";
import { TeamSection } from "@/components/landing/TeamSection";

import { TenthAnniversarySection } from "@/components/landing/TenthAnniversarySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Hero />
      <div className="relative z-10 -mt-10 mb-0 bg-background pt-10">
        <AboutBento />
      </div>
      <div className="relative z-10 -mt-10 mb-0 bg-background pt-10">
        <TeamSection />
      </div>
      <div className="relative z-10 -mt-10 mb-0 bg-background pt-10">
        <TenthAnniversarySection />
      </div>
    </main>
  );
}
