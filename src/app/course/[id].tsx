import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle2, Circle, Clock, BookOpen, Star, PlayCircle } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';
import { AppHeader } from '../../components/AppHeader';

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDarkMode } = useAuthStore();
  const { courses, enrollInCourse, toggleLessonComplete } = useCourseStore();
  const insets = useSafeAreaInsets();

  // Find course details
  const course = useMemo(() => {
    return courses.find((c) => c.id === id) || null;
  }, [courses, id]);

  const handleEnroll = () => {
    if (!course) return;
    enrollInCourse(course.id);
    if (Platform.OS === 'web') {
      alert(`Enrolled successfully! You are now enrolled in "${course.title}".`);
      handleStartLesson(course.lessons[0].id);
    } else {
      Alert.alert(
        'Enrolled successfully!',
        `You are now enrolled in "${course.title}". Start your first lesson today!`,
        [{ text: 'Start learning', onPress: () => handleStartLesson(course.lessons[0].id) }]
      );
    }
  };

  const handleStartLesson = (lessonId: string) => {
    if (!course) return;
    router.push({
      pathname: '/course/lesson',
      params: { courseId: course.id, lessonId }
    });
  };

  if (!course) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500 font-bold">Course Not Found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-primary-500 px-4 py-2 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Detail Header bar */}
      <AppHeader title="Course Details" showBackButton={true} showProfile={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className={isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
      >
        {/* Banner image */}
        <Image
          source={{ uri: course.thumbnail }}
          className="w-full h-56 object-cover"
        />

        <View className="p-4">
          {/* Category & Ratings row */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="bg-primary-50 dark:bg-primary-950/40 px-2.5 py-1 rounded-full">
              <Text className="text-primary-650 text-primary-500 dark:text-primary-400 text-xs font-black uppercase">
                {course.category}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <Text className={`text-sm font-black ${isDarkMode ? 'text-slate-350 text-slate-300' : 'text-slate-700'}`}>
                {course.rating.toFixed(1)} / 5.0
              </Text>
            </View>
          </View>

          {/* Title & Description */}
          <Text className={`text-2xl font-black mb-3 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            {course.title}
          </Text>

          <Text className={`text-sm leading-relaxed mb-6 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {course.description}
          </Text>

          {/* Course Metadata Stats */}
          <View className={`p-4 rounded-2xl flex-row justify-between mb-6 ${
            isDarkMode ? 'bg-slate-900' : 'bg-slate-100'
          }`}>
            <View className="items-center flex-1 border-r border-slate-200 dark:border-slate-800">
              <Clock size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
              <Text className={`text-xs mt-1.5 font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {course.duration}
              </Text>
            </View>
            <View className="items-center flex-1 border-r border-slate-200 dark:border-slate-800">
              <BookOpen size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
              <Text className={`text-xs mt-1.5 font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {course.lessons.length} Lessons
              </Text>
            </View>
            <View className="items-center flex-1">
              <Star size={20} color="#fbbf24" fill="#fbbf24" />
              <Text className={`text-xs mt-1.5 font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Premium Cert
              </Text>
            </View>
          </View>

          {/* Instructor profile */}
          <Text className={`text-base font-black mb-3 uppercase tracking-wider ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Your Instructor
          </Text>
          <View className={`flex-row items-center p-4 rounded-3xl border mb-6 ${
            isDarkMode ? 'bg-slate-905 bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <Image
              source={{ uri: course.instructorAvatar }}
              className="w-12 h-12 rounded-full border border-primary-500"
            />
            <View className="ml-4">
              <Text className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                {course.instructorName}
              </Text>
              <Text className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {course.instructorTitle}
              </Text>
            </View>
          </View>

          {/* Progress Tracker (If enrolled) */}
          {course.enrolled && (
            <View className={`p-5 rounded-3xl border mb-6 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
            }`}>
              <View className="flex-row justify-between items-center mb-2">
                <Text className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                  Your Progress
                </Text>
                <Text className="text-sm font-black text-primary-500">
                  {course.progress}% Completed
                </Text>
              </View>
              <View className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <View className="h-full bg-primary-500 rounded-full" style={{ width: `${course.progress}%` }} />
              </View>
            </View>
          )}

          {/* Lesson Checklist */}
          <Text className={`text-base font-black mb-3 uppercase tracking-wider ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Syllabus ({course.lessons.length} Modules)
          </Text>
          <View className="gap-3">
            {course.lessons.map((lesson, idx) => {
              const isAvailable = course.enrolled;
              return (
                <TouchableOpacity
                  key={lesson.id}
                  disabled={!isAvailable}
                  onPress={() => handleStartLesson(lesson.id)}
                  className={`p-4 rounded-2xl border flex-row items-center justify-between ${
                    lesson.completed
                      ? isDarkMode ? 'bg-primary-950/20 border-primary-900/40' : 'bg-primary-50/20 border-primary-100'
                      : isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-150'
                  } ${!isAvailable ? 'opacity-65' : ''}`}
                >
                  <View className="flex-row items-center flex-1 pr-3">
                    {/* Index or completion icon */}
                    {isAvailable ? (
                      <TouchableOpacity onPress={() => toggleLessonComplete(course.id, lesson.id)} className="mr-3">
                        {lesson.completed ? (
                          <CheckCircle2 size={22} color="#10b981" />
                        ) : (
                          <Circle size={22} color={isDarkMode ? '#475569' : '#cbd5e1'} />
                        )}
                      </TouchableOpacity>
                    ) : (
                      <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}>
                        <Text className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                          {idx + 1}
                        </Text>
                      </View>
                    )}

                    <View className="flex-1">
                      <Text className={`text-sm font-extrabold ${
                        lesson.completed
                          ? isDarkMode ? 'text-slate-400 line-through' : 'text-slate-500 line-through'
                          : isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {lesson.title}
                      </Text>
                      <Text className={`text-xxs mt-0.5 font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                        {lesson.duration}
                      </Text>
                    </View>
                  </View>

                  {isAvailable && (
                    <PlayCircle size={20} color="#0ea5e9" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Persistent Bottom Enrollment/Start Button */}
      <View 
        className={`p-4 border-t ${
          isDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-100'
        }`}
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }}
      >
        {course.enrolled ? (
          <TouchableOpacity
            onPress={() => handleStartLesson(course.lessons.find((l) => !l.completed)?.id || course.lessons[0].id)}
            className="bg-primary-500 hover:bg-primary-600 py-4 rounded-2xl items-center shadow-lg shadow-primary-500/25"
          >
            <Text className="text-white font-extrabold text-base uppercase tracking-wider">
              {course.progress === 100 ? 'Review Course' : 'Continue Course'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleEnroll}
            className="bg-teal-500 hover:bg-teal-650 py-4 rounded-2xl items-center shadow-lg shadow-teal-500/25"
          >
            <Text className="text-white font-extrabold text-base uppercase tracking-wider">
              Enroll Free Now
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
