import { Check } from 'lucide-react'

const benefits = [
  'Fair compensation for all contributors',
  'Engaging, gamified labeling experience',
  'High-quality data through community validation',
  'Transparent payment and reward system'
]

export function Mission() {
  return (
    <section id="mission" className="px-6 py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          We're transforming the data labeling industry by creating an ethical, 
          engaging platform that values both the quality of data and the wellbeing 
          of our contributors.
        </p>
        <div className="grid gap-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 bg-white p-4 rounded-lg">
              <Check className="text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}