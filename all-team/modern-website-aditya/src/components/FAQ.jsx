import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What technologies is Vivid Nexus built with?',
    a: 'Vivid Nexus is built with Tailwind CSS, ensuring a modern, responsive, and highly customizable admin dashboard experience.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-secondary pr-4">{faq.q}</span>
        <ChevronDown
          size={20}
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}>
        <p className="px-5 pb-5 text-gray-500 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">FAQ</p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
