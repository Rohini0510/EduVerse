import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Award, Zap, CheckCircle2 } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';

interface ProgressCardProps {
  completedCourses: number;
  totalEnrolled: number;
  overallProgress: number;
  streak: number;
  onPressStreak?: () => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  completedCourses,
  totalEnrolled,
  overallProgress,
  streak,
  onPressStreak,
}) => {
  const { isDarkMode } = useAuthStore();

  return (
    <View className={`p-5 rounded-3xl border shadow-sm ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    }`}>
      {/* Upper row: Greeting & Streak */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className={`text-sm font-semibold uppercase tracking-wider ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Overall Progress
          </Text>
          <Text className={`text-2xl font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Keep Growing!
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressStreak}
          className="flex-row items-center gap-1.5 bg-orange-50 dark:bg-orange-950/30 px-3.5 py-1.5 rounded-full border border-orange-200 dark:border-orange-900/50"
        >
          <Zap size={16} color="#f97316" fill="#f97316" />
          <Text className="text-orange-600 dark:text-orange-400 font-extrabold text-sm">
            {streak} Days
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View className="mb-5">
        <View className="flex-row items-center justify-between mb-1.5">
          <Text className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Average Completion
          </Text>
          <Text className="text-xs font-bold text-primary-500">
            {overallProgress}%
          </Text>
        </View>
        <View className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <View
            className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </View>
      </View>

      {/* Lower row: Quick Stats */}
      <View className="flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
        <View className="flex-row items-center gap-3">
          <View className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/30">
            <CheckCircle2 size={20} color="#0d9488" />
          </View>
          <View>
            <Text className="text-teal-600 dark:text-teal-400 font-extrabold text-lg leading-tight">
              {completedCourses}
            </Text>
            <Text className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Completed
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="p-2.5 rounded-2xl bg-primary-50 dark:bg-primary-950/30">
            <Award size={20} color="#0ea5e9" />
          </View>
          <View>
            <Text className="text-primary-600 dark:text-primary-400 font-extrabold text-lg leading-tight">
              {totalEnrolled}
            </Text>
            <Text className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Active Courses
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
