import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Documentation', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Support: ['Help Center', 'Community', 'Status', 'Support'],
  Legal: ['Privacy', 'Terms', 'License'],
}

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-white">Vivid Nexus</span>
            </div>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@vividnexus.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} /> info@vividnexus.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} /> +1 (234) 567-890
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={14} /> San Francisco, CA
              </p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; 2025 Vivid Nexus. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['GitHub', 'Twitter', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="text-sm hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
