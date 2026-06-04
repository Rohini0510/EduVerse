import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, Clock, BookOpen, ChevronRight } from 'lucide-react-native';
import { Course } from '../services/mockData';
import { useAuthStore } from '../store/useAuthStore';

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/course/${course.id}`)}
      className={`rounded-2xl overflow-hidden border shadow-sm mb-4 ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-100'
      }`}
    >
      <Image
        source={{ uri: course.thumbnail }}
        className="w-full h-44 object-cover"
      />

      <View className="p-4">
        {/* Category & Rating */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="bg-primary-50 dark:bg-primary-950/40 px-2.5 py-1 rounded-full">
            <Text className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase">
              {course.category}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {course.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Title & Instructor */}
        <Text className={`text-lg font-bold mb-1 leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {course.title}
        </Text>
        <Text className={`text-xs mb-3 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          By {course.instructorName} • {course.instructorTitle}
        </Text>

        {/* Short description */}
        <Text
          numberOfLines={2}
          className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {course.description}
        </Text>

        {/* Bottom stats / progress */}
        <View className="border-t border-slate-100 dark:border-slate-800 pt-3">
          {course.enrolled ? (
            <View>
              <View className="flex-row items-center justify-between mb-1.5">
                <Text className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Learning Progress
                </Text>
                <Text className="text-xs font-bold text-primary-500">
                  {course.progress}%
                </Text>
              </View>
              <View className="w-full h-2 bg-slate-150 dark:bg-slate-800 rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </View>
              <View className="flex-row justify-end mt-3">
                <Text className="text-primary-500 font-bold text-sm flex-row items-center gap-1">
                  Continue Learning <ChevronRight size={14} color="#0ea5e9" />
                </Text>
              </View>
            </View>
          ) : (
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center gap-1">
                  <Clock size={14} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                  <Text className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {course.duration}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <BookOpen size={14} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                  <Text className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {course.lessons.length} Lessons
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  if (onEnroll) onEnroll();
                }}
                className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-xl"
              >
                <Text className="text-white font-bold text-xs uppercase">Enroll Free</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
