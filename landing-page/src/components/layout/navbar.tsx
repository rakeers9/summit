import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="text-2xl font-bold text-blue-600">DataLabel</div>
      <div className="flex gap-6">
        <Link href="#about" className="text-gray-600 hover:text-blue-600">
          About
        </Link>
        <Link href="#features" className="text-gray-600 hover:text-blue-600">
          Features
        </Link>
        <Link href="#mission" className="text-gray-600 hover:text-blue-600">
          Our Mission
        </Link>
        <Link href="/app" className="text-gray-600 hover:text-blue-600">
          App
        </Link>
      </div>
    </nav>
  )
}
