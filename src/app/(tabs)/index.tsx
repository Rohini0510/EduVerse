import { useRouter } from "expo-router";
import {
    ArrowUpRight,
    ChevronRight,
    Play,
    Sparkles,
} from "lucide-react-native";
import { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import { CourseCard } from "../../components/CourseCard";
import GoalsDashboard from "../../components/GoalsDashboard";
import { ProgressCard } from "../../components/ProgressCard";
import ScreenTimeCard from "../../components/ScreenTimeCard";
import { StreakSummary } from "../../components/StreakSummary";
import { MOTIVATIONAL_QUOTES } from "../../services/mockData";
import { useAuthStore } from "../../store/useAuthStore";
import { useCourseStore } from "../../store/useCourseStore";

export default function HomeScreen() {
  const router = useRouter();
  const {
    isDarkMode,
    user,
    streak,
    longestStreak,
    weeklyActivity,
    achievements,
  } = useAuthStore();
  const { courses, downloads } = useCourseStore();

  // Pick a random motivational quote
  const quote = useMemo(() => {
    const day = new Date().getDate();
    return MOTIVATIONAL_QUOTES[day % MOTIVATIONAL_QUOTES.length];
  }, []);

  // Compute overall progress metrics
  const stats = useMemo(() => {
    const enrolled = courses.filter((c) => c.enrolled);
    const completed = courses.filter((c) => c.enrolled && c.progress === 100);
    const averageProgress = enrolled.length
      ? Math.round(
          enrolled.reduce((acc, c) => acc + c.progress, 0) / enrolled.length,
        )
      : 0;

    return {
      enrolledCount: enrolled.length,
      completedCount: completed.length,
      averageProgress,
      enrolled,
    };
  }, [courses]);

  // Find course to "Continue Learning"
  const continueCourse = useMemo(() => {
    return (
      stats.enrolled.find((c) => c.progress > 0 && c.progress < 100) ||
      stats.enrolled[0] ||
      null
    );
  }, [stats.enrolled]);

  // Get recommended and popular courses
  const recommendedCourses = useMemo(() => {
    return courses.filter((c) => !c.enrolled).slice(0, 2);
  }, [courses]);

  const offlineCount = useMemo(
    () => downloads.filter((item) => item.status === "offline").length,
    [downloads],
  );
  const offlineSize = useMemo(() => {
    const total = downloads.reduce(
      (sum, item) =>
        sum +
        (item.status === "offline"
          ? Number(item.size.replace(/[^\d.]/g, ""))
          : 0),
      0,
    );
    return `${total.toFixed(1)} MB`;
  }, [downloads]);

  const topAchievements = useMemo(
    () => achievements.slice(0, 3),
    [achievements],
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader showBackButton={false} showProfile={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        {/* Welcome Section */}
        <View className="px-4 pt-4 mb-4">
          <Text
            className={`text-sm font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Welcome back,
          </Text>
          <Text
            className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {user?.name || "Student"} 👋
          </Text>
        </View>

        {/* Dashboard Progress Card */}
        <View className="px-4 mb-6">
          <ProgressCard
            completedCourses={stats.completedCount}
            totalEnrolled={stats.enrolledCount}
            overallProgress={stats.averageProgress}
            streak={streak}
            onPressStreak={() => router.push("/(tabs)/profile")}
          />
        </View>

        {/* Weekly Streak Summary */}
        <View className="px-4 mb-6">
          <StreakSummary
            weeklyActivity={weeklyActivity}
            streak={streak}
            longestStreak={longestStreak}
          />
        </View>

        {/* Small widgets row */}
        <View className="px-4 mb-6">
          <View className="grid grid-cols-2 gap-3">
            <ScreenTimeCard />
            <GoalsDashboard />
          </View>
        </View>

        {/* Shortcut Cards */}
        <View className="px-4 mb-6">
          <View className="grid grid-cols-2 gap-3">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/ai-tutor")}
              className={`rounded-3xl p-4 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
            >
              <Text
                className={`text-sm font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                AI Tutor
              </Text>
              <Text
                className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Fast homework help
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/career-roadmap")}
              className={`rounded-3xl p-4 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
            >
              <Text
                className={`text-sm font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Roadmap
              </Text>
              <Text
                className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Plan your future career
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/community")}
              className={`rounded-3xl p-4 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
            >
              <Text
                className={`text-sm font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Community
              </Text>
              <Text
                className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Join learner discussions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/downloads")}
              className={`rounded-3xl p-4 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
            >
              <Text
                className={`text-sm font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Downloads
              </Text>
              <Text
                className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Offline learning hub
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Tutor Card (Quick access) */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/ai-tutor")}
          className="mx-4 p-5 rounded-3xl mb-6 bg-gradient-to-r from-primary-600 to-teal-500 border border-primary-400 shadow-md shadow-primary-500/10 flex-row items-center justify-between"
        >
          <View className="flex-1 pr-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Sparkles size={16} color="#fff" />
              <Text className="text-white font-extrabold text-xs uppercase tracking-wider">
                Instant Assistance
              </Text>
            </View>
            <Text className="text-white text-lg font-black leading-tight">
              Chat with AI Tutor
            </Text>
            <Text className="text-white/80 text-xs font-semibold mt-1">
              Clear your doubts in 6 local languages instantly!
            </Text>
          </View>
          <View className="p-3 bg-white/20 rounded-2xl">
            <ArrowUpRight size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Continue Learning */}
        {continueCourse && (
          <View className="px-4 mb-6">
            <Text
              className={`text-lg font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              Continue Learning
            </Text>
            <TouchableOpacity
              onPress={() => router.push(`/course/${continueCourse.id}`)}
              className={`p-4 rounded-3xl border flex-row items-center justify-between shadow-sm ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-100"
              }`}
            >
              <Image
                source={{ uri: continueCourse.thumbnail }}
                className="w-16 h-16 rounded-2xl"
              />
              <View className="flex-1 ml-4 pr-3">
                <Text className="text-xs text-primary-500 font-extrabold uppercase mb-0.5">
                  {continueCourse.category}
                </Text>
                <Text
                  numberOfLines={1}
                  className={`text-base font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {continueCourse.title}
                </Text>
                {/* Progress bar inside */}
                <View className="flex-row items-center gap-2 mt-2">
                  <View className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${continueCourse.progress}%` }}
                    />
                  </View>
                  <Text
                    className={`text-xxs font-extrabold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {continueCourse.progress}%
                  </Text>
                </View>
              </View>
              <View className="p-2.5 rounded-full bg-primary-500">
                <Play size={16} color="#fff" fill="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Recommended Courses */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              Recommended for You
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
              <Text className="text-primary-500 font-bold text-sm flex-row items-center">
                See All <ChevronRight size={14} color="#0ea5e9" />
              </Text>
            </TouchableOpacity>
          </View>

          {recommendedCourses.length > 0 ? (
            recommendedCourses.map((c) => <CourseCard key={c.id} course={c} />)
          ) : (
            <Text className="text-slate-400 text-sm">
              No new courses available right now.
            </Text>
          )}
        </View>

        {/* Achievements & Offline Summary */}
        <View className="px-4 mb-6">
          <View
            className={`rounded-3xl p-5 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Achievements Summary
              </Text>
              <Text
                className={`text-xxs font-bold uppercase tracking-[0.3em] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {topAchievements.filter((ach) => ach.unlockedAt).length}/
                {topAchievements.length} unlocked
              </Text>
            </View>
            {topAchievements.map((ach) => (
              <View
                key={ach.id}
                className="mb-3 last:mb-0 flex-row items-center justify-between"
              >
                <View>
                  <Text
                    className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    {ach.title}
                  </Text>
                  <Text
                    className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {ach.description}
                  </Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    {ach.progress}%
                  </Text>
                  <Text
                    className={`text-xxs uppercase tracking-[0.2em] ${ach.unlockedAt ? "text-emerald-500" : isDarkMode ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {ach.unlockedAt ? "Unlocked" : "Locked"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="px-4 mb-6">
          <View
            className={`rounded-3xl p-5 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Offline Learning
              </Text>
              <Text
                className={`text-xxs font-bold uppercase tracking-[0.3em] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {offlineCount} items
              </Text>
            </View>
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"} mb-4`}
            >
              Access your saved lessons and resources without an internet
              connection.
            </Text>
            <View className="flex-row items-center justify-between">
              <Text
                className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                {offlineSize}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/downloads")}
                className="rounded-2xl bg-primary-500 px-4 py-3"
              >
                <Text className="text-white font-bold">Open Downloads</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Motivational Quote */}
        <View className="px-4">
          <View
            className={`p-5 rounded-3xl border border-dashed ${
              isDarkMode
                ? "bg-slate-900/50 border-slate-800"
                : "bg-primary-50/40 border-primary-200"
            }`}
          >
            <Text
              className={`text-base font-bold italic text-center leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              "{quote.text}"
            </Text>
            <Text className="text-primary-500 font-bold text-xs text-center mt-2.5 uppercase tracking-wider">
              — {quote.author}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
