import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { GraduationCap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';

export default function SplashScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const scale = useSharedValue(0.9);

  useEffect(() => {
    // Pulsing logo animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(0.9, { duration: 1000 })
      ),
      -1, // infinite loops
      true
    );

    // Timeout to navigate to onboarding
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 items-center justify-center ${
      isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      <View className="items-center">
        {/* Animated logo icon */}
        <Animated.View style={animatedStyle} className="p-6 bg-primary-500 rounded-3xl mb-4 shadow-xl shadow-primary-500/30">
          <GraduationCap size={64} color="#fff" />
        </Animated.View>

        {/* Title */}
        <Text className={`text-4xl font-black tracking-tighter ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Edu<Text className="text-primary-500">Verse</Text>
        </Text>
        <Text className={`text-sm font-semibold mt-1 tracking-widest uppercase ${
          isDarkMode ? 'text-slate-400' : 'text-slate-550'
        }`}>
          Knowledge for Everyone
        </Text>
      </View>

      {/* Loading indicator */}
      <View className="absolute bottom-16 items-center">
        <ActivityIndicator size="small" color="#0ea5e9" className="mb-2" />
        <Text className={`text-xs font-bold uppercase tracking-wider ${
          isDarkMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Loading Classroom...
        </Text>
      </View>
    </SafeAreaView>
  );
}
