import { useQuery } from "@tanstack/react-query";
import {
    ArrowRight,
    ShieldCheck,
    TrendingUp
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { CAREER_PATHS } from "../services/mockData";
import { useAuthStore } from "../store/useAuthStore";
import { useCourseStore } from "../store/useCourseStore";

const fetchCareerPaths = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return CAREER_PATHS;
};

export default function CareerRoadmapScreen() {
  const { isDarkMode } = useAuthStore();
  const { courses } = useCourseStore();
  const [selectedPathId, setSelectedPathId] = useState(CAREER_PATHS[0].id);
  const { data: paths = [] } = useQuery(["careerPaths"], fetchCareerPaths);

  const selectedPath = useMemo(
    () => paths.find((path) => path.id === selectedPathId) || paths[0],
    [paths, selectedPathId],
  );

  const recommendedCourses = useMemo(
    () =>
      courses
        .filter((course) =>
          selectedPath?.recommendedCourses.includes(course.title),
        )
        .slice(0, 2),
    [courses, selectedPath],
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Career Roadmap"
        showBackButton={false}
        showProfile={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        <View
          className={`rounded-3xl p-5 mb-6 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <View className="flex-row items-center gap-3 mb-4">
            <View className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950/20">
              <TrendingUp size={24} color="#06b6d4" />
            </View>
            <View>
              <Text
                className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                AI Career Pathways
              </Text>
              <Text
                className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Select a roadmap and explore recommended learning milestones.
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-3"
          >
            {paths.map((path) => (
              <TouchableOpacity
                key={path.id}
                onPress={() => setSelectedPathId(path.id)}
                className={`px-4 py-3 rounded-3xl border ${selectedPathId === path.id ? "border-cyan-400 bg-cyan-500/10" : isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}
              >
                <Text
                  className={`font-bold ${selectedPathId === path.id ? "text-cyan-400" : isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {path.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedPath && (
          <View
            className={`rounded-3xl p-5 mb-6 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <Text
              className={`text-xl font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              {selectedPath.title}
            </Text>
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"} mb-5`}
            >
              {selectedPath.focus}
            </Text>

            <View className="mb-5">
              <Text
                className={`text-xs uppercase tracking-widest font-bold mb-3 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Progress
              </Text>
              <View className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <View
                  className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full"
                  style={{ width: `${selectedPath.completion}%` }}
                />
              </View>
              <Text
                className={`text-xxs mt-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {selectedPath.completion}% complete
              </Text>
            </View>

            <Text
              className={`text-sm font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              Milestones
            </Text>
            {selectedPath.highlights.map((highlight) => (
              <View key={highlight} className="mb-3 flex-row items-start gap-3">
                <View className="mt-1 rounded-full bg-cyan-500/10 p-2">
                  <ShieldCheck size={16} color="#06b6d4" />
                </View>
                <Text
                  className={`text-sm ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {highlight}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View
          className={`rounded-3xl p-5 border mb-6 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              Recommended Courses
            </Text>
            <ArrowRight size={18} color={isDarkMode ? "#fff" : "#0ea5e9"} />
          </View>

          {recommendedCourses.length > 0 ? (
            recommendedCourses.map((course) => (
              <View
                key={course.id}
                className={`rounded-3xl p-4 mb-3 border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}
              >
                <Text
                  className={`font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  {course.title}
                </Text>
                <Text
                  className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  {course.instructorName} • {course.duration}
                </Text>
              </View>
            ))
          ) : (
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Explore more courses from the catalog to unlock personalized
              roadmap recommendations.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
