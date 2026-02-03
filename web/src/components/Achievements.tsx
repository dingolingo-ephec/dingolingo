'use client'

import { Award, Sparkles, Zap, Target } from 'lucide-react'

interface BadgeProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  earned: boolean
}

function Badge({ icon, title, description, color, earned }: BadgeProps) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 shadow-lg transition-all ${
        earned ? 'hover:scale-105 cursor-pointer' : 'opacity-50'
      }`}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg mx-auto"
        style={{
          background: earned
            ? `linear-gradient(135deg, ${color}, ${color}dd)`
            : '#e5e7eb',
        }}
      >
        <div className="text-white">{icon}</div>
      </div>
      
      <h4 className="text-gray-800 font-bold text-center mb-1">{title}</h4>
      <p className="text-gray-600 text-sm text-center">{description}</p>
      
      {earned && (
        <div className="mt-3 flex items-center justify-center gap-1">
          <Sparkles size={14} className="text-[#FCD34D]" fill="currentColor" />
          <span className="text-xs text-gray-500">Earned!</span>
        </div>
      )}
    </div>
  )
}

export function Achievements() {
  const badges = [
    {
      icon: <Award size={36} />,
      title: 'First Steps',
      description: 'Complete your first lesson',
      color: '#10D9A7',
      earned: true,
    },
    {
      icon: <Zap size={36} />,
      title: 'Speed Learner',
      description: '7-day streak achieved',
      color: '#FF8A5B',
      earned: true,
    },
    {
      icon: <Target size={36} />,
      title: 'Perfect Score',
      description: 'Get 100% on any lesson',
      color: '#5EC8F2',
      earned: true,
    },
    {
      icon: <Sparkles size={36} />,
      title: 'Star Collector',
      description: 'Earn 100 stars',
      color: '#FCD34D',
      earned: false,
    },
  ]

  return (
    <div className="bg-gradient-to-br from-[#FCD34D]/20 to-[#FF8A5B]/20 rounded-[32px] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#FCD34D] to-[#FF8A5B] rounded-2xl flex items-center justify-center text-white">
          <Award size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Achievements</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>
    </div>
  )
}
