import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DownloadStatus = "downloading" | "paused" | "offline" | "available";

export type DownloadItem = {
  id: string;
  title: string;
  type: "course" | "lesson" | "pdf" | "notes";
  sizeMB: number;
  status: DownloadStatus;
  progress: number; // 0-100
  courseId?: string;
  lessonId?: string;
};

interface DownloadsState {
  downloads: DownloadItem[];
  startDownload: (
    item: Omit<DownloadItem, "id" | "status" | "progress">,
  ) => void;
  pauseDownload: (id: string) => void;
  resumeDownload: (id: string) => void;
  deleteDownload: (id: string) => void;
  clearDownloads: () => void;
  getTotalStorageUsed: () => number;
}

export const useDownloadsStore = create<DownloadsState>()(
  persist(
    (set, get) => ({
      downloads: [],

      startDownload: (item) => {
        const id = `dl_${Date.now()}`;
        const newItem: DownloadItem = {
          ...item,
          id,
          status: "downloading",
          progress: 0,
        } as DownloadItem;

        set((state) => ({ downloads: [...state.downloads, newItem] }));

        // Simulate download progress and completion
        setTimeout(() => {
          // If item was deleted or paused, still mark offline for mock simplicity
          set((state) => ({
            downloads: state.downloads.map((d) =>
              d.id === id ? { ...d, status: "offline", progress: 100 } : d,
            ),
          }));
        }, 2000);
      },

      pauseDownload: (id) => {
        set((state) => ({
          downloads: state.downloads.map((d) =>
            d.id === id ? { ...d, status: "paused" } : d,
          ),
        }));
      },

      resumeDownload: (id) => {
        set((state) => ({
          downloads: state.downloads.map((d) =>
            d.id === id ? { ...d, status: "downloading" } : d,
          ),
        }));
      },

      deleteDownload: (id) => {
        set((state) => ({
          downloads: state.downloads.filter((d) => d.id !== id),
        }));
      },

      clearDownloads: () => {
        set({ downloads: [] });
      },

      getTotalStorageUsed: () => {
        const total = get().downloads.reduce((sum, d) => sum + d.sizeMB, 0);
        return Number(total.toFixed(2));
      },
    }),
    {
      name: "eduverse-downloads",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useDownloadsStore;
