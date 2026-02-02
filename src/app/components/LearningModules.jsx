import { Lock } from 'lucide-react';

function ModuleCard({ title, emoji, color, lessons, completed, locked = false }) {
  const percentage = (completed / lessons) * 100;
  
  return (
    <div
      className={`bg-white rounded-[32px] p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
        locked ? 'opacity-60' : 'hover:scale-105'
      }`}
      style={{ borderColor: `${color}30` }}
    >
      {locked && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          <Lock size={16} className="text-white" />
        </div>
      )}
      
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-4 shadow-md"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
      >
        {emoji}
      </div>
      
      <h3 className="text-gray-800 text-xl font-bold mb-2">{title}</h3>
      
      <p className="text-gray-600 text-sm mb-4">
        {completed} of {lessons} lessons
      </p>

      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        ></div>
      </div>
    </div>
  );
}

export function LearningModules() {
  const modules = [
    { title: 'Animals', emoji: '🐾', color: '#10D9A7', lessons: 8, completed: 5 },
    { title: 'Food', emoji: '🍕', color: '#FF8A5B', lessons: 10, completed: 7 },
    { title: 'Travel', emoji: '✈️', color: '#5EC8F2', lessons: 12, completed: 3 },
    { title: 'Family', emoji: '👨‍👩‍👧', color: '#A78BFA', lessons: 6, completed: 6 },
    { title: 'Numbers', emoji: '🔢', color: '#FCD34D', lessons: 5, completed: 5 },
    { title: 'Colors', emoji: '🎨', color: '#FB7185', lessons: 4, completed: 2 },
    { title: 'Weather', emoji: '⛅', color: '#5EC8F2', lessons: 7, completed: 0, locked: true },
    { title: 'Sports', emoji: '⚽', color: '#10D9A7', lessons: 9, completed: 0, locked: true },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <ModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  );
}