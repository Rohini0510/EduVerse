import { useRouter } from "expo-router";
import {
    Award,
    LogOut,
    Moon,
    RefreshCw,
    Sparkles,
    Sun,
    Zap,
} from "lucide-react-native";
import { useMemo } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AchievementCard } from "../../components/AchievementCard";
import { AppHeader } from "../../components/AppHeader";
import { StatsCard } from "../../components/StatsCard";
import { useAuthStore } from "../../store/useAuthStore";
import { useCourseStore } from "../../store/useCourseStore";
import useGoalsStore from "../../store/useGoalsStore";
import useQuizStore from "../../store/useQuizStore";
import useScreenTimeStore from "../../store/useScreenTimeStore";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    isDarkMode,
    toggleDarkMode,
    user,
    logout,
    streak,
    longestStreak,
    learningHours,
    careerGoal,
    achievements,
  } = useAuthStore();
  const { courses, certificates, resetProgress } = useCourseStore();

  // Compute profile stats
  const stats = useMemo(() => {
    const active = courses.filter((c) => c.enrolled).length;
    const certsCount = certificates.length;

    // Compute unique categories enrolled as acquired skills
    const acquiredSkills = Array.from(
      new Set(
        courses
          .filter((c) => c.enrolled && c.progress > 0)
          .map((c) => c.category),
      ),
    );

    return {
      active,
      certsCount,
      acquiredSkills,
    };
  }, [courses, certificates]);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of EduVerse?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Data",
      "This will reset all your mock course progress and achievements. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetProgress();
            Alert.alert(
              "Reset Complete",
              "Mock data has been restored to default values.",
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Student Profile"
        showBackButton={false}
        showProfile={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        {/* User Card */}
        {user && (
          <View className="items-center py-6 px-4">
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full border-4 border-primary-500 shadow-lg"
            />
            <Text
              className={`text-2xl font-black mt-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              {user.name}
            </Text>
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              {user.email}
            </Text>
            <View className="bg-primary-50 dark:bg-primary-950/40 px-3 py-1 rounded-full mt-2">
              <Text className="text-primary-600 dark:text-primary-400 text-xs font-bold capitalize">
                Student Member
              </Text>
            </View>
          </View>
        )}

        {/* Stats Grid */}
        <View className="flex-row gap-3 px-4 mb-6">
          <StatsCard
            value={streak}
            label="Current Streak"
            icon={<Zap size={22} color="#f97316" fill="#f97316" />}
          />
          <StatsCard
            value={Math.round(learningHours)}
            label="Total Hours"
            icon={<Sparkles size={22} color="#0ea5e9" />}
          />
          <StatsCard
            value={stats.certsCount}
            label="Certificates"
            icon={<Award size={22} color="#0d9488" />}
          />
        </View>

        {/* Extended Metrics */}
        <View className="flex-row gap-3 px-4 mb-6">
          <StatsCard
            value={Math.round(useScreenTimeStore().todayMinutes / 60)}
            label="Today (hrs)"
            icon={<Zap size={22} color="#7c3aed" />}
          />
          <StatsCard
            value={useQuizStore().averageAccuracy()}
            label="Quiz Accuracy"
            icon={<Sparkles size={22} color="#0ea5e9" />}
          />
          <StatsCard
            value={useGoalsStore().completionRate()}
            label="Goals %"
            icon={<Award size={22} color="#16a34a" />}
          />
        </View>

        <View
          className={`px-4 mb-6 rounded-3xl border p-5 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <Text
            className={`text-sm uppercase tracking-widest mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Career Goal
          </Text>
          <Text
            className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            {careerGoal}
          </Text>
        </View>

        {/* Acquired Skills */}
        <View className="px-4 mb-6">
          <Text
            className={`text-base font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Skills Acquired
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {stats.acquiredSkills.length > 0 ? (
              stats.acquiredSkills.map((skill) => (
                <View
                  key={skill}
                  className="bg-teal-50 dark:bg-teal-950/20 px-3 py-2 rounded-xl border border-teal-150 dark:border-teal-900/30 flex-row items-center gap-1.5"
                >
                  <Sparkles size={12} color="#0d9488" />
                  <Text className="text-teal-700 dark:text-teal-400 text-xs font-extrabold">
                    {skill}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                className={`text-xs italic ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
              >
                Skills will unlock as you progress through lessons.
              </Text>
            )}
          </View>
        </View>

        {/* Achievements list */}
        <View className="px-4 mb-6">
          <Text
            className={`text-base font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Learning Achievements
          </Text>
          {achievements.map((ach) => (
            <AchievementCard key={ach.id} achievement={ach} />
          ))}
        </View>

        {/* Settings Container */}
        <View className="mx-4 p-5 rounded-3xl border mb-6 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 gap-4">
          <Text
            className={`text-sm font-black mb-1 uppercase tracking-wider ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            App Preferences
          </Text>

          {/* Dark Mode Toggle Row */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              {isDarkMode ? (
                <Moon size={20} color="#fbbf24" />
              ) : (
                <Sun size={20} color="#475569" />
              )}
              <Text
                className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#cbd5e1", true: "#0ea5e9" }}
              thumbColor={isDarkMode ? "#ffffff" : "#f8fafc"}
            />
          </View>

          {/* Reset App State */}
          <TouchableOpacity
            onPress={handleReset}
            className="flex-row items-center gap-3 border-t border-slate-50 dark:border-slate-850 pt-4"
          >
            <RefreshCw size={20} color="#64748b" />
            <Text
              className={`text-base font-bold ${isDarkMode ? "text-slate-350 text-slate-300" : "text-slate-650"}`}
            >
              Reset Learning Progress
            </Text>
          </TouchableOpacity>

          {/* Logout Action */}
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center gap-3 border-t border-slate-50 dark:border-slate-850 pt-4"
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 text-base font-black">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
