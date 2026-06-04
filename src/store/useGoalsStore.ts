import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Goal = {
  id: string;
  title: string;
  targetAmount?: number; // e.g., minutes or count
  progress: number; // 0-100
  completed: boolean;
  kind?: "time" | "lesson" | "quiz" | "words" | "module";
};

interface GoalsState {
  goals: Goal[];
  addGoal: (g: Omit<Goal, "id" | "progress" | "completed">) => void;
  updateGoal: (id: string, patch: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  toggleComplete: (id: string) => void;
  completionRate: () => number;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [
        {
          id: "goal_1",
          title: "Study 2 hours today",
          targetAmount: 120,
          progress: 40,
          completed: false,
          kind: "time",
        },
        {
          id: "goal_2",
          title: "Complete 1 lesson",
          progress: 0,
          completed: false,
          kind: "lesson",
        },
      ],
      addGoal: (g) =>
        set((state) => ({
          goals: [
            ...state.goals,
            { id: `goal_${Date.now()}`, progress: 0, completed: false, ...g },
          ],
        })),
      updateGoal: (id, patch) =>
        set((state) => ({
          goals: state.goals.map((gg) =>
            gg.id === id ? { ...gg, ...patch } : gg,
          ),
        })),
      removeGoal: (id) =>
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
      toggleComplete: (id) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, completed: !g.completed } : g,
          ),
        })),
      completionRate: () => {
        const goals = get().goals;
        if (!goals.length) return 0;
        const completed = goals.filter((g) => g.completed).length;
        return Math.round((completed / goals.length) * 100);
      },
    }),
    { name: "eduverse-goals", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useGoalsStore;
