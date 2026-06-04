import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Sun, Moon } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showProfile?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'EduVerse',
  showBackButton = false,
  showProfile = true,
}) => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, user } = useAuthStore();

  return (
    <View className={`flex-row items-center justify-between px-4 py-3 border-b ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    }`}>
      <View className="flex-row items-center gap-3">
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => router.back()}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
          >
            <ArrowLeft size={20} color={isDarkMode ? '#cbd5e1' : '#475569'} />
          </TouchableOpacity>
        ) : null}
        <Text className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
        >
          {isDarkMode ? (
            <Sun size={20} color="#fbbf24" />
          ) : (
            <Moon size={20} color="#475569" />
          )}
        </TouchableOpacity>

        <TouchableOpacity className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <Bell size={20} color={isDarkMode ? '#cbd5e1' : '#475569'} />
        </TouchableOpacity>

        {showProfile && user && (
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image
              source={{ uri: user.avatar }}
              className="w-9 h-9 rounded-full border border-primary-500"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
