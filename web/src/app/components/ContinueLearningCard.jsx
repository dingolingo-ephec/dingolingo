import { Play } from 'lucide-react';

export function ContinueLearningCard() {
  return (
    <div className="bg-gradient-to-br from-[#5EC8F2] to-[#A78BFA] rounded-[32px] p-8 shadow-xl relative overflow-hidden">
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="inline-block bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
            <span className="text-white text-sm font-semibold">Continue Learning</span>
          </div>
          
          <h2 className="text-white text-4xl font-bold mb-3">Intro to Spanish</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/30 backdrop-blur-md rounded-full px-4 py-2">
              <span className="text-white font-semibold">Lesson 3 of 12</span>
            </div>
            <div className="h-3 flex-1 bg-white/30 backdrop-blur-md rounded-full overflow-hidden max-w-xs">
              <div className="h-full bg-white rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          <button className="bg-white text-[#5EC8F2] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3">
            <Play size={24} fill="currentColor" />
            Start Lesson
          </button>
        </div>

        {/* Mascot Placeholder */}
        <div className="w-40 h-40 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/40">
          <span className="text-white text-6xl">🦉</span>
        </div>
      </div>
    </div>
  );
}