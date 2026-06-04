import * as Speech from "expo-speech";
import {
    Pause,
    Play,
    Speaker,
    StopCircle
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { useAuthStore } from "../store/useAuthStore";
import { useCourseStore } from "../store/useCourseStore";

const LANGUAGE_OPTIONS = [
  { label: "English", code: "en-US" },
  { label: "Hindi", code: "hi-IN" },
  { label: "Marathi", code: "mr-IN" },
  { label: "Tamil", code: "ta-IN" },
];

export default function VoiceLearningScreen() {
  const { isDarkMode } = useAuthStore();
  const { courses } = useCourseStore();
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const sampleText = useMemo(() => {
    const course = courses.find((c) => c.enrolled) || courses[0];
    return course
      ? `Learn from the lesson: ${course.lessons[0].title}. ${course.lessons[0].notes}`
      : "Choose a course to start voice learning and let EduVerse read your lesson aloud.";
  }, [courses]);

  const startReading = () => {
    Speech.speak(sampleText, {
      language: language.code,
      rate: speed,
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
    });
    setIsPlaying(true);
  };

  const pauseReading = () => {
    Speech.pause();
    setIsPlaying(false);
  };

  const stopReading = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Voice Learning"
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
            <View className="p-3 rounded-2xl bg-sky-100 dark:bg-sky-950/20">
              <Speaker size={24} color="#0ea5e9" />
            </View>
            <View>
              <Text
                className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
              >
                Read lessons aloud
              </Text>
              <Text
                className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Play, pause, and adjust reading speed for better comprehension.
              </Text>
            </View>
          </View>

          <View
            className={`rounded-3xl border p-4 mb-5 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}
          >
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              {sampleText}
            </Text>
          </View>

          <View className="mb-5">
            <Text
              className={`text-xs uppercase tracking-widest mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Language
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.code}
                  onPress={() => setLanguage(option)}
                  className={`px-4 py-3 rounded-2xl border ${language.code === option.code ? "bg-primary-500 border-primary-500" : isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <Text
                    className={`text-sm font-bold ${language.code === option.code ? "text-white" : isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-6">
            <Text
              className={`text-xs uppercase tracking-widest mb-3 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Reading Speed
            </Text>
            <View
              className={`rounded-3xl border p-4 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  Speed: {speed.toFixed(1)}x
                </Text>
                <Text
                  className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  Tap to adjust
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={() =>
                    setSpeed((prev) => Math.max(0.8, +(prev - 0.1).toFixed(1)))
                  }
                  className="rounded-2xl border px-4 py-3 bg-slate-100 dark:bg-slate-950"
                >
                  <Text
                    className={`text-sm ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {speed.toFixed(1)}x
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setSpeed((prev) => Math.min(1.4, +(prev + 0.1).toFixed(1)))
                  }
                  className="rounded-2xl border px-4 py-3 bg-slate-100 dark:bg-slate-950"
                >
                  <Text
                    className={`text-sm ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between gap-3">
            <TouchableOpacity
              onPress={startReading}
              className="flex-1 rounded-2xl bg-primary-500 px-4 py-4 items-center"
            >
              <Play size={20} color="#fff" />
              <Text className="text-white font-bold mt-2">Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pauseReading}
              className="flex-1 rounded-2xl bg-slate-800 px-4 py-4 items-center"
            >
              <Pause size={20} color="#fff" />
              <Text className="text-white font-bold mt-2">Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={stopReading}
              className="flex-1 rounded-2xl bg-red-500 px-4 py-4 items-center"
            >
              <StopCircle size={20} color="#fff" />
              <Text className="text-white font-bold mt-2">Stop</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          className={`rounded-3xl p-5 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <Text
            className={`text-base font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Accessibility Notes
          </Text>
          <Text
            className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Voice learning helps you absorb lessons during commutes and
            strengthens retention through audio repetition.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
