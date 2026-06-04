import { useRouter } from "expo-router";
import { ArrowRight, Download, Pause, Play, Trash2 } from "lucide-react-native";
import { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import StorageManager from "../components/StorageManager";
import { useAuthStore } from "../store/useAuthStore";
import { useCourseStore } from "../store/useCourseStore";
import useDownloadsStore from "../store/useDownloadsStore";

export default function DownloadsScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const { downloadCourse, downloadLesson } = useCourseStore();
  const {
    downloads,
    pauseDownload,
    resumeDownload,
    deleteDownload,
    startDownload,
    clearDownloads,
    getTotalStorageUsed,
  } = useDownloadsStore();

  const offlineCount = useMemo(
    () => downloads.filter((item) => item.status === "offline").length,
    [downloads],
  );
  const storageUsed = useMemo(
    () => `${getTotalStorageUsed()} MB`,
    [downloads, getTotalStorageUsed],
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Offline Downloads"
        showBackButton={false}
        showProfile={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        <View
          className={`rounded-3xl p-5 mb-6 border shadow-sm ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <View className="flex-row items-center gap-3 mb-4">
            <View className="p-3 rounded-2xl bg-sky-100 dark:bg-sky-950/20">
              <Download size={24} color="#0ea5e9" />
            </View>
            <View>
              <Text
                className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Download Manager
              </Text>
              <Text
                className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Track offline lessons, PDFs, and full course downloads in one
                place.
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center gap-4">
            <View>
              <Text
                className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                {offlineCount}
              </Text>
              <Text
                className={`text-xs uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Offline items
              </Text>
            </View>
            <View>
              <Text
                className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                {storageUsed}
              </Text>
              <Text
                className={`text-xs uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                storage used
              </Text>
            </View>
          </View>
        </View>
        <StorageManager />+
        {downloads.length === 0 ? (
          <View
            className={`rounded-3xl border p-6 items-center justify-center ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <Text
              className={`text-lg font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              No downloads yet
            </Text>
            <Text
              className={`text-sm text-center mb-5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Download courses or lessons to keep your learning available even
              without internet.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/courses")}
              className="bg-primary-500 px-5 py-3 rounded-2xl"
            >
              <Text className="text-white font-bold">Browse Courses</Text>
            </TouchableOpacity>
          </View>
        ) : (
          downloads.map((item) => (
            <View
              key={item.id}
              className={`rounded-3xl p-4 mb-4 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View>
                  <Text
                    className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className={`text-xxs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {item.type.toUpperCase()} • {item.sizeMB} MB
                  </Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-xxs uppercase ${item.status === "offline" ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    {item.status}
                  </Text>
                  <Text
                    className={`text-xs font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    {item.progress}%
                  </Text>
                </View>
              </View>

              <View className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <View
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </View>

              <View className="flex-row items-center gap-3">
                {item.status === "downloading" && (
                  <TouchableOpacity
                    onPress={() => pauseDownload(item.id)}
                    className="rounded-2xl border px-4 py-2"
                  >
                    <Pause size={14} />
                    <Text className="text-xs font-bold">Pause</Text>
                  </TouchableOpacity>
                )}
                {item.status === "paused" && (
                  <TouchableOpacity
                    onPress={() => resumeDownload(item.id)}
                    className="rounded-2xl border px-4 py-2"
                  >
                    <Play size={14} />
                    <Text className="text-xs font-bold">Resume</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => deleteDownload(item.id)}
                  className="rounded-2xl bg-red-50 px-4 py-2"
                >
                  <Trash2 size={14} color="#ef4444" />
                  <Text className="text-xs font-bold text-red-500">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        {downloads.length > 0 && (
          <TouchableOpacity
            onPress={clearDownloads}
            className="mt-4 flex-row items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-red-400 bg-red-50 dark:bg-red-950/20"
          >
            <Trash2 size={16} color="#ef4444" />
            <Text className="text-red-500 font-bold">Clear Download Queue</Text>
          </TouchableOpacity>
        )}
        <View
          className={`mt-6 p-5 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              Quick Actions
            </Text>
            <ArrowRight size={18} color={isDarkMode ? "#fff" : "#0ea5e9"} />
          </View>
          <TouchableOpacity
            onPress={() =>
              startDownload({
                title: "Python Fundamentals (Full Course)",
                type: "course",
                sizeMB: 230,
              })
            }
            className={`mb-3 rounded-2xl border px-4 py-3 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}
          >
            <Text
              className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              Download Python Fundamentals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              startDownload({
                title: "AI Lesson: Supervised Learning",
                type: "lesson",
                sizeMB: 18,
              })
            }
            className={`rounded-2xl border px-4 py-3 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}
          >
            <Text
              className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              Download AI lesson for offline review
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
