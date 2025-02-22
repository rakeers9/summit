import { Card } from '@/components/ui/card'
import { Globe, Shield, Users } from 'lucide-react'

const features = [
  {
    title: 'Global Community',
    description: 'Connect with a worldwide network of data labelers who share your commitment to quality and ethics.',
    icon: Globe
  },
  {
    title: 'Fair Compensation',
    description: 'We ensure all contributors are fairly compensated for their valuable work through our transparent payment system.',
    icon: Shield
  },
  {
    title: 'Gamified Experience',
    description: 'Earn points, unlock achievements, and compete with others while contributing to meaningful projects.',
    icon: Users
  }
]

export function Features() {
  return (
    <section className="relative section-spacing">
      <div className="content-container">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="modern-card p-8">
              <feature.icon className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
              <h3 className="text-xl font-semibold mb-3 text-text-dark">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
