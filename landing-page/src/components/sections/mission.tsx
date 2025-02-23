import { Check } from 'lucide-react'

const benefits = [
  'Transform data labeling with speed and ethical practices',
  'No‑code platform for rapid deployment',
  'ML‑powered accuracy predictions for quality assurance',
  'Secure role‑based access and credential validation'
]

export function Mission() {
  return (
    <section id="mission" className="relative section-spacing">
      <div className="content-container">
        <div className="modern-card p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/50">
                <Check className="h-6 w-6 text-green-500" />
                <span className="text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
