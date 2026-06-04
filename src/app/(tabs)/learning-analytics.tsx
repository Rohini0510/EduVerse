import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../components/AppHeader";
import LearningAnalytics from "../../components/LearningAnalytics";
import { useAuthStore } from "../../store/useAuthStore";

export default function LearningAnalyticsScreen() {
  const { isDarkMode } = useAuthStore();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Learning Analytics"
        showBackButton={true}
        showProfile={true}
      />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        <LearningAnalytics />
      </ScrollView>
    </SafeAreaView>
  );
}
