import {
  LayoutDashboard, Users, Handshake, Calculator,
  Package, FolderKanban, ScrollText, ShoppingCart,
  BarChart3, Building2, ShieldCheck, Bell
} from 'lucide-react'

const modules = [
  { icon: LayoutDashboard, color: 'bg-primary', title: 'Smart Dashboards', desc: 'Dashboard layouts with KPI cards, charts, tables, widgets, and analytics UI components.' },
  { icon: Users, color: 'bg-secondary', title: 'Employee Management', desc: 'Employee management dashboard pages including employee lists, profiles, attendance, payroll, and HR workflows.' },
  { icon: Handshake, color: 'bg-yellow-500', title: 'CRM Management', desc: 'CRM dashboard pages including customer profiles, lead management layouts, sales pipeline interfaces, and reporting screens.' },
  { icon: Calculator, color: 'bg-red-500', title: 'Finance & Accounting', desc: 'Finance and accounting dashboard pages for invoices, expenses, payments, taxes, and reporting interfaces.' },
  { icon: Package, color: 'bg-green-500', title: 'Inventory Management', desc: 'Inventory management screens with products, warehouses, stock management, suppliers, and inventory reports.' },
  { icon: FolderKanban, color: 'bg-orange-500', title: 'Project Management', desc: 'Project management templates featuring Kanban boards, Gantt charts, task management pages, team collaboration layouts, and reporting dashboards.' },
  { icon: ScrollText, color: 'bg-purple-500', title: 'HR & Payroll', desc: 'HR and payroll dashboard screens including employee profiles, attendance, leave management, payroll pages, and HR reports.' },
  { icon: ShoppingCart, color: 'bg-pink-500', title: 'Sales & Purchase', desc: 'Sales and procurement dashboard templates with orders, vendors, quotations, purchases, and reporting interfaces.' },
  { icon: BarChart3, color: 'bg-cyan-500', title: 'Reports & Analytics', desc: 'Reporting dashboard layouts with charts, analytics widgets, KPI cards, data tables, and export-ready UI screens.' },
  { icon: Building2, color: 'bg-indigo-500', title: 'Branch Management', desc: 'Branch management pages with multi-location dashboards, branch listings, transfer screens, and reporting layouts.' },
  { icon: ShieldCheck, color: 'bg-teal-500', title: 'Role & Permission', desc: 'Role and permission dashboard pages with user role interfaces, permission layouts, tables, and audit log screens.' },
  { icon: Bell, color: 'bg-gray-800', title: 'Notifications & Logs', desc: 'Notification center layouts, activity logs, alerts, announcements, and system log dashboard screens.' },
]

export default function CoreModules() {
  return (
    <section id="modules" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Core Modules</p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary">
            Complete <span className="text-primary">ERP Dashboard</span> UI Collection
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <div
                key={mod.title}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-12 h-12 ${mod.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary pt-1">{mod.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
