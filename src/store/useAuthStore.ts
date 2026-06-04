import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    Achievement,
    ACHIEVEMENTS,
    User,
    WeeklyActivity
} from "../services/mockData";

const buildWeeklyActivity = (): WeeklyActivity[] => {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      date: date.toDateString(),
      label: date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3),
      completed: index < 4,
    };
  });
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  language: string;
  streak: number;
  longestStreak: number;
  learningHours: number;
  careerGoal: string;
  weeklyActivity: WeeklyActivity[];
  lastActiveDate: string | null;
  achievements: Achievement[];
  login: (email: string, name?: string) => Promise<boolean>;
  register: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: string) => void;
  recordDailyActivity: () => void;
  incrementStreak: () => void;
  setCareerGoal: (goal: string) => void;
  unlockAchievement: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isDarkMode: false,
      language: "English",
      streak: 4,
      longestStreak: 6,
      learningHours: 42.5,
      careerGoal: "Build a career in AI Engineering",
      weeklyActivity: buildWeeklyActivity(),
      lastActiveDate: new Date().toDateString(),
      achievements: ACHIEVEMENTS,

      login: async (email, name) => {
        if (email) {
          const userObj: User = {
            id: "user_01",
            name: name || "Rohan Sharma",
            email,
            avatar:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
            role: email.includes("admin") ? "admin" : "student",
          };
          set({ user: userObj, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (name, email) => {
        if (name && email) {
          const userObj: User = {
            id: "user_" + Date.now(),
            name,
            email,
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
            role: email.includes("admin") ? "admin" : "student",
          };
          set({ user: userObj, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setLanguage: (language) => {
        set({ language });
      },

      recordDailyActivity: () => {
        const today = new Date().toDateString();
        if (get().lastActiveDate === today) return;

        set((state) => {
          const nextStreak = state.streak + 1;
          const nextWeekly = state.weeklyActivity
            .filter((item) => item.date !== today)
            .concat({
              date: today,
              label: new Date(today)
                .toLocaleDateString("en-US", { weekday: "short" })
                .slice(0, 3),
              completed: true,
            })
            .slice(-7);

          return {
            streak: nextStreak,
            longestStreak: Math.max(state.longestStreak, nextStreak),
            learningHours: state.learningHours + 0.5,
            lastActiveDate: today,
            weeklyActivity: nextWeekly,
          };
        });
      },

      incrementStreak: () => {
        const today = new Date().toDateString();
        const last = get().lastActiveDate;
        if (last !== today) {
          get().recordDailyActivity();
        }
      },

      setCareerGoal: (goal) => {
        set({ careerGoal: goal });
      },

      unlockAchievement: (id) => {
        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === id && !ach.unlockedAt
              ? {
                  ...ach,
                  unlockedAt: new Date().toLocaleDateString(),
                  progress: 100,
                }
              : ach,
          ),
        }));
      },
    }),
    {
      name: "eduverse-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
