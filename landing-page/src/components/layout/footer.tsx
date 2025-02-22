// src/components/layout/footer.tsx
import Link from 'next/link'

const footerLinks = {
  Platform: [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' }
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Company Description */}
        <div>
          <h3 className="text-xl font-bold mb-4">DataLabel</h3>
          <p className="text-gray-400">
            Transforming data labeling through ethical practices and community engagement.
          </p>
        </div>

        {/* Navigation Sections */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-bold mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} DataLabel. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-white">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}