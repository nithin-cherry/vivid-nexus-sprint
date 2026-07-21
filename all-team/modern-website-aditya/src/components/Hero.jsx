import { ChevronRight, BarChart3, Users, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative pt-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Tailwind CSS Admin Template
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight mb-6">
              Vivid Nexus{' '}
              <span className="text-primary">Tailwind CSS</span>{' '}
              Admin Dashboard Template.
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-xl">
              Build Modern ERP, CRM, HRM, Inventory, Finance, and Business Admin Dashboard Interfaces Faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#demos"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Buy Template
                <ChevronRight size={18} />
              </a>
              <a
                href="#demos"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-secondary rounded-xl hover:bg-gray-800 transition-all"
              >
                Live Demo
                <ChevronRight size={18} />
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-1 overflow-hidden">
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-4 h-3 bg-gray-300 rounded w-32" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BarChart3 size={16} className="text-primary" />
                      </div>
                      <span className="text-xs text-gray-500">Revenue</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">$45,231</p>
                    <p className="text-xs text-green-500">+20.1% from last month</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-green-600" />
                      </div>
                      <span className="text-xs text-gray-500">Users</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">+2,350</p>
                    <p className="text-xs text-green-500">+180.1% from last month</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <TrendingUp size={16} className="text-yellow-600" />
                      </div>
                      <span className="text-xs text-gray-500">Growth</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">+12,234</p>
                    <p className="text-xs text-green-500">+19% from last month</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-secondary">Revenue Overview</span>
                    <span className="text-xs text-gray-400">Last 7 days</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[
                      { bar: 40, fill: 75 },
                      { bar: 65, fill: 82 },
                      { bar: 45, fill: 68 },
                      { bar: 80, fill: 90 },
                      { bar: 60, fill: 72 },
                      { bar: 90, fill: 95 },
                      { bar: 70, fill: 85 },
                    ].map(({ bar, fill }, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-primary/20 rounded-t-sm"
                          style={{ height: `${bar}%` }}
                        >
                          <div
                            className="w-full bg-primary rounded-t-sm"
                            style={{ height: `${fill}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                      <span key={d} className="text-[10px] text-gray-400 flex-1 text-center">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
