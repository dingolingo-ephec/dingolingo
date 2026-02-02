import { RotateCw } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Flashcard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-lg border-2 border-[#FF8A5B]/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Flashcard Practice</h3>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-2 text-[#FF8A5B] font-semibold hover:underline"
        >
          <RotateCw size={20} />
          Flip Card
        </button>
      </div>

      <motion.div
        className="relative w-full h-80 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#FF8A5B] to-[#FB7185] rounded-3xl shadow-xl flex flex-col items-center justify-center p-8"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="text-8xl mb-6">🍎</div>
            <p className="text-white text-sm font-semibold mb-2">English</p>
            <p className="text-white text-4xl font-bold">Apple</p>
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#5EC8F2] to-[#A78BFA] rounded-3xl shadow-xl flex flex-col items-center justify-center p-8"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-8xl mb-6">🍎</div>
            <p className="text-white text-sm font-semibold mb-2">Español</p>
            <p className="text-white text-4xl font-bold">Manzana</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}