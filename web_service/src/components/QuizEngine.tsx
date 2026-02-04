"use client";

import { useState } from "react";

export default function QuizEngine({ exercises }: { exercises: any[] }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const current = exercises[step];
  const progress = ((step + 1) / exercises.length) * 100;

  const handleCheck = () => {
    if (selected === current.answer) setStatus("correct");
    else setStatus("wrong");
  };

  const handleNext = () => {
    if (step < exercises.length - 1) {
      setStep(step + 1);
      setSelected(null);
      setStatus("idle");
    } else {
      alert("Leçon terminée ! Bravo !");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      {/* Barre de progression */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-700 mb-8">
        {current.question}
      </h2>

      {/* Options de réponse */}
      <div className="grid gap-3">
        {current.options?.map((opt: string) => (
          <button
            key={opt}
            onClick={() => status === "idle" && setSelected(opt)}
            className={`p-4 text-left border-2 rounded-2xl font-bold transition-all transform active:scale-95 ${
              selected === opt 
                ? "border-blue-400 bg-blue-50 text-blue-500 shadow-[0_4px_0_0_#60a5fa]" 
                : "border-slate-200 text-slate-600 hover:bg-slate-50 shadow-[0_4px_0_0_#e2e8f0]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Barre de validation en bas */}
      <div className={`fixed bottom-0 left-0 w-full p-6 border-t-2 transition-colors ${
        status === "correct" ? "bg-green-100 border-green-200" : 
        status === "wrong" ? "bg-red-100 border-red-200" : "bg-white border-slate-100"
      }`}>
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div>
            {status === "correct" && <p className="text-green-700 font-extrabold text-xl italic">Excellent !</p>}
            {status === "wrong" && <p className="text-red-700 font-extrabold text-xl italic">Dommage... la réponse était : {current.answer}</p>}
          </div>

          {status === "idle" ? (
            <button
              onClick={handleCheck}
              disabled={!selected}
              className="px-10 py-3 bg-green-500 text-white font-extrabold rounded-xl shadow-[0_4px_0_0_#22c55e] hover:bg-green-400 disabled:bg-slate-200 disabled:shadow-none transition-all"
            >
              VÉRIFIER
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`px-10 py-3 text-white font-extrabold rounded-xl transition-all ${
                status === "correct" 
                ? "bg-green-500 shadow-[0_4px_0_0_#22c55e] hover:bg-green-400" 
                : "bg-red-500 shadow-[0_4px_0_0_#ef4444] hover:bg-red-400"
              }`}
            >
              CONTINUER
            </button>
          )}
        </div>
      </div>
    </div>
  );
}