import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Mission } from '@/components/sections/mission'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <Hero />
      <Features />
      <Mission />
      <Footer />
    </main>
  )
}