import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type QuizResult = {
  id: string;
  subject: string;
  score: number; // percent
  correct: number;
  total: number;
  timeTakenSec: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  date: string;
};

interface QuizState {
  history: QuizResult[];
  addResult: (r: Omit<QuizResult, "id" | "date">) => void;
  clearHistory: () => void;
  averageAccuracy: () => number;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      history: [],
      addResult: (r) =>
        set((state) => ({
          history: [
            ...state.history,
            { ...r, id: `qr_${Date.now()}`, date: new Date().toISOString() },
          ],
        })),
      clearHistory: () => set({ history: [] }),
      averageAccuracy: () => {
        const h = get().history;
        if (!h.length) return 0;
        return Math.round(h.reduce((s, x) => s + x.score, 0) / h.length);
      },
    }),
    { name: "eduverse-quiz", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useQuizStore;
