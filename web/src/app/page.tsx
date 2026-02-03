'use client'

import { Sidebar } from '@/components/Sidebar'
import { ContinueLearningCard } from '@/components/ContinueLearningCard'
import { DailyProgress } from '@/components/DailyProgress'
import { LearningModules } from '@/components/LearningModules'
import { Achievements } from '@/components/Achievements'
import { FillInBlanks } from '@/components/FillInBlanks'
import { Flashcard } from '@/components/Flashcard'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FE]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to continue your language journey?
          </p>
        </div>

        {/* Continue Learning Hero Section */}
        <div className="mb-8">
          <ContinueLearningCard />
        </div>

        {/* Daily Progress Stats */}
        <div className="mb-8">
          <DailyProgress />
        </div>

        {/* Learning Modules Grid */}
        <div className="mb-8">
          <LearningModules />
        </div>

        {/* Interactive Exercise Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Practice Exercises
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <FillInBlanks />
            <Flashcard />
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mb-8">
          <Achievements />
        </div>
      </main>
    </div>
  )
}
