import { Flame, Star, Trophy } from 'lucide-react';

export function DailyProgress() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Streak Counter */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#FF8A5B]/20">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF8A5B] to-[#FB7185] rounded-2xl flex items-center justify-center">
            <Flame size={24} className="text-white" fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-gray-800">7</span>
        </div>
        <p className="text-gray-600 font-semibold">Day Streak</p>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FF8A5B] to-[#FB7185] rounded-full" style={{ width: '70%' }}></div>
        </div>
      </div>

      {/* Stars Earned */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#FCD34D]/20">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FCD34D] to-[#FF8A5B] rounded-2xl flex items-center justify-center">
            <Star size={24} className="text-white" fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-gray-800">142</span>
        </div>
        <p className="text-gray-600 font-semibold">Stars Earned</p>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FCD34D] to-[#FF8A5B] rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#10D9A7]/20">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#10D9A7] to-[#5EC8F2] rounded-2xl flex items-center justify-center">
            <Trophy size={24} className="text-white" fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-gray-800">12</span>
        </div>
        <p className="text-gray-600 font-semibold">Badges</p>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#10D9A7] to-[#5EC8F2] rounded-full" style={{ width: '45%' }}></div>
        </div>
      </div>
    </div>
  );
}