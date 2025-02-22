import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Ethical Data Labeling for the Future
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Join our community-driven platform that revolutionizes data labeling 
        through fair compensation and gamified experience.
      </p>
      <Button variant="default" size="lg" className="gap-2">
        Launch App
        <ArrowRight className="h-5 w-5" />
      </Button>
    </section>
  )
}