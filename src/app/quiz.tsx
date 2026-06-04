import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { useAuthStore } from "../store/useAuthStore";
import { useQuizStore } from "../store/useQuizStore";

// Minimal demo quiz screen with mock question
export default function QuizScreen() {
  const { isDarkMode } = useAuthStore();
  const quizStore = useQuizStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const question = {
    id: "q1",
    text: "What is 2 + 2?",
    choices: ["3", "4", "5", "22"],
    answer: "4",
  };

  const submit = () => {
    const correct = selected === question.answer ? 1 : 0;
    quizStore.addResult({
      subject: "Mathematics",
      score: correct ? 100 : 0,
      correct,
      total: 1,
      timeTakenSec: 12,
      difficulty: "Beginner",
    });
    setSubmitted(true);
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader title="Quick Quiz" showBackButton={true} showProfile={true} />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        <Text className="text-lg font-black mb-3">{question.text}</Text>
        {question.choices.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setSelected(c)}
            className={`rounded-2xl p-3 mb-2 ${selected === c ? "bg-primary-500" : "bg-white"}`}
          >
            <Text
              className={`${selected === c ? "text-white" : "text-slate-900"}`}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}

        {!submitted ? (
          <TouchableOpacity
            onPress={submit}
            className="rounded-2xl bg-primary-500 p-3 mt-4 items-center"
          >
            <Text className="text-white font-bold">Submit</Text>
          </TouchableOpacity>
        ) : (
          <View className="mt-4">
            <Text className="text-base font-black">
              {selected === question.answer
                ? "Correct! Great job."
                : "Incorrect — the answer is 4."}
            </Text>
            <TouchableOpacity
              onPress={() => setSubmitted(false)}
              className="rounded-2xl p-3 mt-4 border"
            >
              <Text className="font-bold">Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
