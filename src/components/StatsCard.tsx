import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, label, icon }) => {
  const { isDarkMode } = useAuthStore();

  return (
    <View className={`flex-1 p-4 rounded-2xl border items-center justify-center ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    } shadow-sm`}>
      <View className="mb-2">{icon}</View>
      <Text className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </Text>
      <Text className={`text-xs mt-1 text-center font-medium ${
        isDarkMode ? 'text-slate-400' : 'text-slate-500'
      }`}>
        {label}
      </Text>
    </View>
  );
};
