import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    Certificate,
    Course,
    INITIAL_CERTIFICATES,
    INITIAL_COURSES
} from "../services/mockData";

export interface DownloadItem {
  id: string;
  title: string;
  type: "course" | "lesson" | "pdf";
  size: string;
  status: "downloading" | "offline" | "available";
  progress: number;
  courseId: string;
  lessonId?: string;
}

interface CourseState {
  courses: Course[];
  certificates: Certificate[];
  downloads: DownloadItem[];
  enrollInCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  addCertificate: (courseName: string, recipientName: string) => void;
  downloadCourse: (courseId: string) => void;
  downloadLesson: (courseId: string, lessonId: string) => void;
  downloadResource: (
    courseId: string,
    lessonId: string,
    resource: string,
  ) => void;
  clearDownloads: () => void;
  resetProgress: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: INITIAL_COURSES,
      certificates: INITIAL_CERTIFICATES,
      downloads: [],

      enrollInCourse: (courseId) => {
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === courseId ? { ...c, enrolled: true, progress: 0 } : c,
          ),
        }));
      },

      toggleLessonComplete: (courseId, lessonId) => {
        set((state) => {
          const updatedCourses = state.courses.map((c) => {
            if (c.id !== courseId) return c;

            const updatedLessons = c.lessons.map((l) =>
              l.id === lessonId ? { ...l, completed: !l.completed } : l,
            );

            const completedCount = updatedLessons.filter(
              (l) => l.completed,
            ).length;
            const progress = Math.round(
              (completedCount / updatedLessons.length) * 100,
            );

            return {
              ...c,
              lessons: updatedLessons,
              progress,
            };
          });

          // Check if the modified course has reached 100% and doesn't already have a certificate
          const course = updatedCourses.find((c) => c.id === courseId);
          if (course && course.progress === 100) {
            const hasCert = state.certificates.some(
              (cert) => cert.courseName === course.title,
            );
            if (!hasCert) {
              // Add certificate dynamically
              const newCert: Certificate = {
                id: "cert_" + Date.now(),
                courseName: course.title,
                issueDate: new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
                verificationId: `EV-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
                recipientName: "Rohan Sharma",
              };

              return {
                courses: updatedCourses,
                certificates: [...state.certificates, newCert],
              };
            }
          }

          return { courses: updatedCourses };
        });
      },

      downloadCourse: (courseId) => {
        const course = get().courses.find((c) => c.id === courseId);
        if (!course) return;
        const itemId = `download_course_${courseId}`;
        const existing = get().downloads.find((item) => item.id === itemId);
        if (existing) return;

        const newDownload = {
          id: itemId,
          courseId,
          title: `${course.title} (Full Course)`,
          type: "course" as const,
          size: "230 MB",
          status: "downloading" as const,
          progress: 0,
        };

        set((state) => ({ downloads: [...state.downloads, newDownload] }));
        setTimeout(() => {
          set((state) => ({
            downloads: state.downloads.map((item) =>
              item.id === itemId
                ? { ...item, status: "offline", progress: 100 }
                : item,
            ),
          }));
        }, 1400);
      },

      downloadLesson: (courseId, lessonId) => {
        const course = get().courses.find((c) => c.id === courseId);
        const lesson = course?.lessons.find((l) => l.id === lessonId);
        if (!course || !lesson) return;
        const itemId = `download_lesson_${lessonId}`;
        const existing = get().downloads.find((item) => item.id === itemId);
        if (existing) return;

        const newDownload = {
          id: itemId,
          courseId,
          lessonId,
          title: `${lesson.title} • ${course.title}`,
          type: "lesson" as const,
          size: "18 MB",
          status: "downloading" as const,
          progress: 0,
        };

        set((state) => ({ downloads: [...state.downloads, newDownload] }));
        setTimeout(() => {
          set((state) => ({
            downloads: state.downloads.map((item) =>
              item.id === itemId
                ? { ...item, status: "offline", progress: 100 }
                : item,
            ),
          }));
        }, 900);
      },

      downloadResource: (courseId, lessonId, resource) => {
        const itemId = `download_pdf_${courseId}_${lessonId}_${resource}`;
        const existing = get().downloads.find((item) => item.id === itemId);
        if (existing) return;

        const newDownload = {
          id: itemId,
          courseId,
          lessonId,
          title: `${resource}`,
          type: "pdf" as const,
          size: "2.5 MB",
          status: "downloading" as const,
          progress: 0,
        };

        set((state) => ({ downloads: [...state.downloads, newDownload] }));
        setTimeout(() => {
          set((state) => ({
            downloads: state.downloads.map((item) =>
              item.id === itemId
                ? { ...item, status: "offline", progress: 100 }
                : item,
            ),
          }));
        }, 700);
      },

      clearDownloads: () => {
        set({ downloads: [] });
      },

      addCertificate: (courseName, recipientName) => {
        const newCert: Certificate = {
          id: `cert_${Date.now()}`,
          courseName,
          issueDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          verificationId: `EV-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
          recipientName,
        };

        set((state) => ({
          certificates: [...state.certificates, newCert],
        }));
      },

      resetProgress: () => {
        set({
          courses: INITIAL_COURSES,
          certificates: INITIAL_CERTIFICATES,
          downloads: [],
        });
      },
    }),
    {
      name: "eduverse-course-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
