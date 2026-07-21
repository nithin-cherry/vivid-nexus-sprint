import { useState } from 'react'
import { Menu, X, LogIn, ChevronRight } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Core Modules', href: '#modules' },
  { label: 'Demos', href: '#demos' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-secondary">Vivid Nexus</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogIn size={16} />
              Login
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            >
              Sign up
              <ChevronRight size={16} />
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2 flex flex-col gap-2">
              <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
                <LogIn size={16} />
                Login
              </a>
              <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg">
                Sign up
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
