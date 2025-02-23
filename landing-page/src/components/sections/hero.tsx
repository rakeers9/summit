import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
// components/Hero.tsx
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-bold mb-8 leading-tight">
          Ethical Data Labeling
          <br />
          for the Future
        </h1>
        <p className="text-white/90 text-xl sm:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Join our community-driven platform that revolutionizes data labeling
          through fair compensation and gamified experience.
        </p>
        <button className="px-8 py-3 bg-white/10 rounded-full text-white text-lg hover:bg-white/20 transition-all mb-24">
          Get Started
        </button>

        {/* Scroll Down Indicator - Increased spacing */}

          <p className="text-white/90 text-lg uppercase tracking-[0.2em]">
            Scroll Down
          </p>
          <ChevronDown 
            className="w-8 h-8 text-white/90 mx-auto animate-bounce" 
            strokeWidth={2}
          />
      </div>
    </section>
  );
}