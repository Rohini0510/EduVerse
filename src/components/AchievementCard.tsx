import React from 'react';
import { View, Text } from 'react-native';
import { BookOpen, Zap, Award, MessageSquare, Layers, Lock } from 'lucide-react-native';
import { Achievement } from '../services/mockData';
import { useAuthStore } from '../store/useAuthStore';

interface AchievementCardProps {
  achievement: Achievement;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Zap,
  Award,
  MessageSquare,
  Layers,
};

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { isDarkMode } = useAuthStore();
  const IconComponent = iconMap[achievement.icon] || Award;
  const isUnlocked = !!achievement.unlockedAt;

  return (
    <View className={`flex-row items-center p-4 rounded-2xl border mb-3 ${
      isUnlocked
        ? isDarkMode
          ? 'bg-slate-900 border-primary-950/40'
          : 'bg-white border-primary-100'
        : isDarkMode
        ? 'bg-slate-950 border-slate-900 opacity-60'
        : 'bg-slate-50 border-slate-200 opacity-60'
    }`}>
      {/* Icon Badge */}
      <View className={`p-3 rounded-2xl relative ${
        isUnlocked
          ? 'bg-primary-50 dark:bg-primary-950/30'
          : 'bg-slate-200 dark:bg-slate-800'
      }`}>
        <IconComponent
          size={24}
          color={isUnlocked ? '#0ea5e9' : '#94a3b8'}
        />
        {!isUnlocked && (
          <View className="absolute -bottom-1 -right-1 bg-slate-500 p-0.5 rounded-full">
            <Lock size={10} color="#fff" />
          </View>
        )}
      </View>

      {/* Info details */}
      <View className="flex-1 ml-4 pr-2">
        <Text className={`text-base font-bold ${
          isUnlocked
            ? isDarkMode ? 'text-white' : 'text-slate-950'
            : isDarkMode ? 'text-slate-400' : 'text-slate-650'
        }`}>
          {achievement.title}
        </Text>
        <Text className={`text-xs mt-0.5 leading-relaxed ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {achievement.description}
        </Text>
      </View>

      {/* Unlock Date / State */}
      {isUnlocked && (
        <View className="bg-teal-50 dark:bg-teal-950/20 px-2.5 py-1 rounded-lg">
          <Text className="text-teal-600 dark:text-teal-400 text-xxs font-black uppercase">
            Earned
          </Text>
        </View>
      )}
    </View>
  );
};
