import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ScreenTimeState {
  todayMinutes: number;
  weekMinutes: number;
  monthMinutes: number;
  sessionStart?: number | null;
  startSession: () => void;
  stopSession: () => void;
  addMinutes: (mins: number) => void;
  reset: () => void;
}

export const useScreenTimeStore = create<ScreenTimeState>()(
  persist(
    (set, get) => ({
      todayMinutes: 0,
      weekMinutes: 0,
      monthMinutes: 0,
      sessionStart: null,
      startSession: () => {
        set({ sessionStart: Date.now() });
      },
      stopSession: () => {
        const start = get().sessionStart;
        if (!start) return;
        const diff = Math.round((Date.now() - start) / 60000);
        set((state) => ({
          todayMinutes: state.todayMinutes + diff,
          weekMinutes: state.weekMinutes + diff,
          monthMinutes: state.monthMinutes + diff,
          sessionStart: null,
        }));
      },
      addMinutes: (mins: number) =>
        set((state) => ({
          todayMinutes: state.todayMinutes + mins,
          weekMinutes: state.weekMinutes + mins,
          monthMinutes: state.monthMinutes + mins,
        })),
      reset: () =>
        set({
          todayMinutes: 0,
          weekMinutes: 0,
          monthMinutes: 0,
          sessionStart: null,
        }),
    }),
    {
      name: "eduverse-screen-time",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useScreenTimeStore;
