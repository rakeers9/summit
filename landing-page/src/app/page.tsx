import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import CompanySection from '@/components/sections/company'
import { Mission } from '@/components/sections/mission'
import { Footer } from '@/components/layout/footer'
import Pipeline  from '@/components/sections/pipeline'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Background with scroll effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#E08D9D] via-[#B4C5D4] to-[#25C6CE] -z-10" />
      <div className="fixed inset-0 bg-black/10 -z-5" /> {/* Subtle overlay */}
      
      <Navbar />
      <main>
        <Hero />
        <Pipeline />
        <CompanySection />
        <Features />
        <Mission />
        <Footer />
      </main>
    </div>
  );
}
