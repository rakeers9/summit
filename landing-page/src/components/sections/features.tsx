import Image from 'next/image'
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
      <div className="content-container flex flex-col md:flex-row items-start md:items-center">
        
        {/* Left side: Title + stacked (vertical) features */}
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-3xl font-bold mb-4">User Experience</h2>
          <div className="space-y-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="modern-card p-8 flex items-start gap-4"
              >
                <feature.icon className="h-8 w-8 text-[var(--gradient-end)]" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-text-dark">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: iPhone mockup(s) */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src="/images/iphone-mockup1.png"
            alt="iPhone Mockup 1"
            width={300}
            height={600}
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}