import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BookOpen, MessageSquare, Award, User } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { isDarkMode } = useAuthStore();
  const insets = useSafeAreaInsets();

  // Dynamic layout calculations based on device safe area
  const tabHeight = Platform.select({
    ios: 66 + insets.bottom,
    android: insets.bottom > 0 ? 66 + insets.bottom : 70,
    web: 72,
    default: 72
  });

  const tabPaddingBottom = Platform.select({
    ios: insets.bottom > 0 ? insets.bottom - 4 : 8,
    android: insets.bottom > 0 ? insets.bottom : 8,
    web: 12,
    default: 8
  });

  const tabPaddingTop = Platform.select({
    ios: 8,
    android: 10,
    web: 12,
    default: 8
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDarkMode ? '#38bdf8' : '#0284c7', // High-contrast active tints (sky-400 / blue-600)
        tabBarInactiveTintColor: isDarkMode ? '#94a3b8' : '#64748b', // High-contrast inactive tints (slate-400 / slate-500)
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? '#1e293b' : '#f1f5f9',
          height: tabHeight,
          paddingBottom: tabPaddingBottom,
          paddingTop: tabPaddingTop,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDarkMode ? 0.3 : 0.06,
          shadowRadius: 8,
          elevation: 8,
          borderTopLeftRadius: Platform.OS === 'web' ? 0 : 24,
          borderTopRightRadius: Platform.OS === 'web' ? 0 : 24,
          ...(Platform.OS === 'web' ? {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
          } : {}),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          marginTop: Platform.OS === 'ios' ? 0 : 2,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        tabBarItemStyle: {
          height: 48, // Ensure touch target height is at least 44px
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <View className={`p-2.5 rounded-2xl ${
                focused 
                  ? isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50' 
                  : 'bg-transparent'
              }`}>
                <Home size={20} color={color} />
              </View>
              {focused && (
                <View className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <View className={`p-2.5 rounded-2xl ${
                focused 
                  ? isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50' 
                  : 'bg-transparent'
              }`}>
                <BookOpen size={20} color={color} />
              </View>
              {focused && (
                <View className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ai-tutor"
        options={{
          title: 'AI Tutor',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <View className={`p-2.5 rounded-2xl ${
                focused 
                  ? isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50' 
                  : 'bg-transparent'
              }`}>
                <MessageSquare size={20} color={color} />
              </View>
              {focused && (
                <View className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="certificates"
        options={{
          title: 'Certificates',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <View className={`p-2.5 rounded-2xl ${
                focused 
                  ? isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50' 
                  : 'bg-transparent'
              }`}>
                <Award size={20} color={color} />
              </View>
              {focused && (
                <View className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <View className={`p-2.5 rounded-2xl ${
                focused 
                  ? isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50' 
                  : 'bg-transparent'
              }`}>
                <User size={20} color={color} />
              </View>
              {focused && (
                <View className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
