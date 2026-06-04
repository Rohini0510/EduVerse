import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { useAuthStore } from "../store/useAuthStore";
import useQuizStore from "../store/useQuizStore";

export default function QuizResultsScreen() {
  const { isDarkMode } = useAuthStore();
  const { history } = useQuizStore();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Quiz History"
        showBackButton={true}
        showProfile={true}
      />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        {history.length === 0 ? (
          <Text className="text-sm text-slate-400">No quiz attempts yet.</Text>
        ) : (
          history.map((h) => (
            <View key={h.id} className="rounded-2xl p-4 mb-3 border">
              <Text className="text-sm font-bold">
                {h.subject} • {h.difficulty}
              </Text>
              <Text className="text-xxs text-slate-500">
                Score: {h.score}% • {h.correct}/{h.total} correct
              </Text>
              <Text className="text-xxs text-slate-400 mt-2">
                {new Date(h.date).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
