import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 3 }) => {
  const { isDarkMode } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const cards = Array.from({ length: count });

  return (
    <View className="p-4 flex-1">
      {cards.map((_, index) => (
        <Animated.View
          key={index}
          style={{ opacity: fadeAnim }}
          className={`p-4 rounded-3xl mb-4 border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}
        >
          {/* Mock image skeleton */}
          <View className={`w-full h-36 rounded-2xl mb-4 ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
          }`} />

          {/* Title skeleton */}
          <View className={`h-5 w-3/4 rounded-md mb-2.5 ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
          }`} />

          {/* Description line skeleton */}
          <View className={`h-4 w-5/6 rounded-md mb-4 ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
          }`} />

          {/* Footer skeleton */}
          <View className="flex-row justify-between items-center">
            <View className={`h-4 w-1/3 rounded-md ${
              isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
            }`} />
            <View className={`h-8 w-1/4 rounded-xl ${
              isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
            }`} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};
