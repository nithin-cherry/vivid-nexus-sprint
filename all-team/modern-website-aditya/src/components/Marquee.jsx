export default function Marquee({ text = 'ERP ADMIN TEMPLATE', speed = 'slow' }) {
  const items = Array(8).fill(text)

  return (
    <div className="relative overflow-hidden bg-secondary py-4">
      <div className={`flex animate-marquee${speed === 'slow' ? '-slow' : ''} whitespace-nowrap`}>
        {items.map((item, i) => (
          <span key={i} className="mx-8 text-2xl font-bold text-white/10 uppercase tracking-widest shrink-0">
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="mx-8 text-2xl font-bold text-white/10 uppercase tracking-widest shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
