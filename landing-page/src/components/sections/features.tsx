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
    <section id="features" className="px-6 py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6">
            <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
