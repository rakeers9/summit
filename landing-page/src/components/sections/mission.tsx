import { Check } from 'lucide-react'

const benefits = [
  'Fair compensation for all contributors',
  'Engaging, gamified labeling experience',
  'High-quality data through community validation',
  'Transparent payment and reward system'
]

export function Mission() {
  return (
    <section className="relative section-spacing">
      <div className="content-container">
        <div className="modern-card p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/50">
                <div className="score-indicator">
                  <div className="score-dot" />
                  <div className="score-line" />
                </div>
                <span className="text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}