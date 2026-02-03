'use client'

import { CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

export function FillInBlanks() {
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const correctAnswer = 'gato'
  const isCorrect = answer.toLowerCase() === correctAnswer

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-lg border-2 border-[#A78BFA]/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#5EC8F2] rounded-xl flex items-center justify-center text-white font-bold">
          ?
        </div>
        <h3 className="text-xl font-bold text-gray-800">Fill in the Blank</h3>
      </div>

      <div className="bg-gradient-to-br from-[#A78BFA]/10 to-[#5EC8F2]/10 rounded-3xl p-6 mb-6">
        <p className="text-gray-700 text-lg mb-4">
          Translate to Spanish: <span className="font-bold">&quot;The cat&quot;</span>
        </p>
        
        <div className="flex items-center gap-3 text-xl">
          <span className="text-gray-800">El</span>
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setChecked(false)
            }}
            className="bg-white border-3 border-[#A78BFA]/30 rounded-2xl px-6 py-3 text-center min-w-[200px] focus:outline-none focus:border-[#A78BFA] transition-all"
            placeholder="______"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setChecked(true)}
          className="bg-gradient-to-r from-[#10D9A7] to-[#5EC8F2] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Check Answer
        </button>

        {checked && (
          <div className={`flex items-center gap-2 ${isCorrect ? 'text-[#10D9A7]' : 'text-[#FB7185]'}`}>
            {isCorrect ? (
              <>
                <CheckCircle2 size={24} />
                <span className="font-bold">Correct!</span>
              </>
            ) : (
              <>
                <XCircle size={24} />
                <span className="font-bold">Try again</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
