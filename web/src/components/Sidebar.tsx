'use client'

import { Home, BookOpen, Award, User } from 'lucide-react'

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl transition-all ${
        active
          ? 'bg-[#10D9A7] text-white shadow-lg shadow-[#10D9A7]/30'
          : 'text-gray-600 hover:bg-white/60 hover:text-[#10D9A7]'
      }`}
    >
      <div className="w-7 h-7">{icon}</div>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  )
}

export function Sidebar() {
  return (
    <div className="w-24 min-h-screen bg-white/40 backdrop-blur-sm border-r border-white/60 flex flex-col items-center py-8 gap-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-[#10D9A7] to-[#5EC8F2] rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          LQ
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3 flex-1">
        <NavItem icon={<Home size={28} />} label="Home" active />
        <NavItem icon={<BookOpen size={28} />} label="Lessons" />
        <NavItem icon={<Award size={28} />} label="Badges" />
        <NavItem icon={<User size={28} />} label="Profile" />
      </nav>
    </div>
  )
}
