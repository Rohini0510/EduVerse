import { Flame } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

interface StreakSummaryProps {
  weeklyActivity: { date: string; label: string; completed: boolean }[];
  streak: number;
  longestStreak: number;
}

export const StreakSummary: React.FC<StreakSummaryProps> = ({
  weeklyActivity,
  streak,
  longestStreak,
}) => {
  const { isDarkMode } = useAuthStore();

  return (
    <View
      className={`p-5 rounded-3xl border mb-6 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
    >
      <View className="flex-row items-center gap-3 mb-4">
        <View className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950/20">
          <Flame size={24} color="#fb923c" />
        </View>
        <View className="flex-1">
          <Text
            className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Daily Learning Streak
          </Text>
          <Text
            className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Keep the momentum going with weekly activity tracking.
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text
            className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            {streak}
          </Text>
          <Text
            className={`text-xs uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            current streak
          </Text>
        </View>
        <View className="items-end">
          <Text
            className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            {longestStreak}
          </Text>
          <Text
            className={`text-xs uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            longest streak
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        {weeklyActivity.map((day) => (
          <View key={day.date} className="items-center">
            <View
              className={`w-10 h-10 rounded-2xl mb-2 ${day.completed ? "bg-orange-500" : isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}
            >
              <Text className="text-center text-sm font-black leading-10 text-white">
                {day.label}
              </Text>
            </View>
            <Text
              className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              {day.completed ? "Done" : "Off"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
