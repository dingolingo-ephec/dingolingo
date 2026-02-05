"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface QuizEngineProps {
  exercises: any[];
  lessonId: number;
}

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizEngine({ exercises, lessonId }: QuizEngineProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [correctCount, setCorrectCount] = useState(0);

  // Mélanger les options une seule fois par exercice (au montage et quand step change)
  const shuffledExercises = useMemo(() => {
    return exercises.map(exercise => ({
      ...exercise,
      shuffledOptions: exercise.options ? shuffleArray(exercise.options) : []
    }));
  }, [exercises]);

  const current = shuffledExercises[step];
  const progress = ((step + 1) / exercises.length) * 100;

  const handleCheck = () => {
    if (selected === current.answer) {
      setStatus("correct");
      setCorrectCount(prev => prev + 1);
    } else {
      setStatus("wrong");
    }
  };

  const saveProgress = async (completed: boolean) => {
    const finalScore = completed 
      ? Math.round(((correctCount + (selected === current.answer ? 1 : 0)) / exercises.length) * 100)
      : Math.round((correctCount / exercises.length) * 100);

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          score: finalScore,
          completed,
        }),
      });
    } catch (error) {
      console.error("Erreur sauvegarde progression:", error);
    }
  };

  const handleNext = async () => {
    if (step < exercises.length - 1) {
      setStep(step + 1);
      setSelected(null);
      setStatus("idle");
    } else {
      await saveProgress(true);
      router.push("/lessons?completed=true");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 font-medium min-w-[3rem] text-right">
          {step + 1}/{exercises.length}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          {current.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-24">
        {current.shuffledOptions?.map((opt: string) => (
          <button
            key={opt}
            onClick={() => status === "idle" && setSelected(opt)}
            disabled={status !== "idle"}
            className={`w-full p-4 text-left border-2 rounded-xl font-medium transition-all ${
              status !== "idle" && opt === current.answer
                ? "border-green-500 bg-green-50 text-green-700"
                : status === "wrong" && opt === selected
                ? "border-red-500 bg-red-50 text-red-700"
                : selected === opt 
                ? "border-orange-500 bg-orange-50 text-orange-700" 
                : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                status !== "idle" && opt === current.answer
                  ? "border-green-500 bg-green-500"
                  : status === "wrong" && opt === selected
                  ? "border-red-500 bg-red-500"
                  : selected === opt 
                  ? "border-orange-500 bg-orange-500" 
                  : "border-gray-300"
              }`}>
                {(selected === opt || (status !== "idle" && opt === current.answer)) && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {status !== "idle" && opt === current.answer ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    ) : status === "wrong" && opt === selected ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <circle cx="12" cy="12" r="4" fill="currentColor" />
                    )}
                  </svg>
                )}
              </div>
              {opt}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom action bar */}
      <div className={`fixed bottom-0 left-0 w-full p-5 border-t transition-colors ${
        status === "correct" ? "bg-green-50 border-green-200" : 
        status === "wrong" ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
      }`}>
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {status === "correct" && (
              <>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-700 font-semibold">Correct !</p>
                </div>
              </>
            )}
            {status === "wrong" && (
              <>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-700 font-semibold">Incorrect</p>
                  <p className="text-red-600 text-sm">Réponse : {current.answer}</p>
                </div>
              </>
            )}
          </div>

          {status === "idle" ? (
            <button
              onClick={handleCheck}
              disabled={!selected}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl transition-colors"
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`px-8 py-3 text-white font-semibold rounded-xl transition-colors ${
                status === "correct" 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {step < exercises.length - 1 ? "Continuer" : "Terminer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}