import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Play, Download, CheckSquare, Square, MessageSquare, Send } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';
import { AppHeader } from '../../components/AppHeader';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export default function LessonScreen() {
  const router = useRouter();
  const { isDarkMode, user } = useAuthStore();
  const { courses, toggleLessonComplete } = useCourseStore();
  const params = useLocalSearchParams<{ courseId: string; lessonId: string }>();

  // Fetch course and lesson details
  const course = useMemo(() => {
    return courses.find((c) => c.id === params.courseId) || null;
  }, [courses, params.courseId]);

  const lessonIndex = useMemo(() => {
    if (!course) return -1;
    return course.lessons.findIndex((l) => l.id === params.lessonId);
  }, [course, params.lessonId]);

  const lesson = useMemo(() => {
    if (lessonIndex === -1 || !course) return null;
    return course.lessons[lessonIndex];
  }, [course, lessonIndex]);

  // Simulated Comments Database
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Anita Desai',
      avatar: 'A',
      text: 'This explanation of functions is so helpful! Thanks, teacher.',
      time: '2 hours ago'
    },
    {
      id: 'c2',
      author: 'Vikram Singh',
      avatar: 'V',
      text: 'Are there any practice exercises for if-else conditions too?',
      time: '1 day ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const commentObj: Comment = {
      id: 'comment_' + Date.now(),
      author: user?.name || 'Anonymous Student',
      avatar: (user?.name || 'A')[0],
      text: newComment,
      time: 'Just now'
    };
    setComments([commentObj, ...comments]);
    setNewComment('');
  };

  const handleDownload = (resourceName: string) => {
    Alert.alert(
      'Download Complete',
      `"${resourceName}" has been successfully downloaded for offline access!`,
      [{ text: 'OK' }]
    );
  };

  const handlePrevLesson = () => {
    if (lessonIndex > 0 && course) {
      router.setParams({ lessonId: course.lessons[lessonIndex - 1].id });
    }
  };

  const handleNextLesson = () => {
    if (course && lessonIndex < course.lessons.length - 1) {
      router.setParams({ lessonId: course.lessons[lessonIndex + 1].id });
    }
  };

  if (!course || !lesson) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500 font-bold">Lesson Not Found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-primary-500 px-4 py-2 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <AppHeader title={course.title} showBackButton={true} showProfile={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className={isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
      >
        {/* Video Player Placeholder */}
        <View className="bg-slate-900 aspect-video justify-center items-center relative">
          {/* Simulated Player Background Graphic */}
          <View className="absolute inset-0 bg-black/45 justify-center items-center">
            <TouchableOpacity className="w-16 h-16 rounded-full bg-white/20 items-center justify-center border border-white/40">
              <Play size={32} color="#fff" fill="#fff" />
            </TouchableOpacity>
            <Text className="text-white/80 font-bold text-xs mt-3 uppercase tracking-widest">
              Tap to Play Video (Offline Ready)
            </Text>
          </View>
        </View>

        {/* Lesson Titles */}
        <View className="p-4">
          <Text className="text-xs text-primary-500 font-extrabold uppercase tracking-wider mb-1">
            Lesson {lessonIndex + 1} of {course.lessons.length}
          </Text>
          <Text className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            {lesson.title}
          </Text>
          <Text className={`text-xs mt-1.5 font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Length: {lesson.duration}
          </Text>

          {/* Action Row: Mark Complete & Download */}
          <View className="flex-row gap-3 mt-4 border-t border-b border-slate-100 dark:border-slate-800 py-3 mb-6">
            <TouchableOpacity
              onPress={() => toggleLessonComplete(course.id, lesson.id)}
              className={`flex-1 flex-row items-center justify-center gap-2 p-3 rounded-2xl border ${
                lesson.completed
                  ? 'bg-teal-500/10 border-teal-500'
                  : isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              {lesson.completed ? (
                <CheckSquare size={18} color="#10b981" />
              ) : (
                <Square size={18} color={isDarkMode ? '#64748b' : '#94a3b8'} />
              )}
              <Text className={`text-xs font-black uppercase tracking-wider ${
                lesson.completed
                  ? 'text-teal-600 dark:text-teal-400'
                  : isDarkMode
                  ? 'text-slate-300'
                  : 'text-slate-700'
              }`}>
                {lesson.completed ? 'Finished' : 'Mark Complete'}
              </Text>
            </TouchableOpacity>

            {lesson.resources && lesson.resources.length > 0 && (
              <TouchableOpacity
                onPress={() => handleDownload(lesson.resources![0])}
                className={`flex-1 flex-row items-center justify-center gap-2 p-3 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <Download size={18} color="#0ea5e9" />
                <Text className={`text-xs font-black uppercase tracking-wider ${
                  isDarkMode ? 'text-slate-350 text-slate-300' : 'text-slate-700'
                }`}>
                  Get Materials
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Study Notes Section */}
          <Text className={`text-base font-black mb-2 uppercase tracking-wider ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Instructor Notes
          </Text>
          <View className={`p-4 rounded-3xl border mb-6 ${
            isDarkMode ? 'bg-slate-905 bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <Text className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {lesson.notes}
            </Text>
          </View>

          {/* Lesson Resources List */}
          {lesson.resources && lesson.resources.length > 0 && (
            <View className="mb-6">
              <Text className={`text-base font-black mb-3 uppercase tracking-wider ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Course Materials ({lesson.resources.length})
              </Text>
              {lesson.resources.map((res) => (
                <TouchableOpacity
                  key={res}
                  onPress={() => handleDownload(res)}
                  className={`p-3.5 rounded-2xl border mb-2 flex-row items-center justify-between ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-150'
                  }`}
                >
                  <Text className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    📎 {res}
                  </Text>
                  <Download size={14} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Navigation Controls */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity
              onPress={handlePrevLesson}
              disabled={lessonIndex === 0}
              className={`flex-row items-center gap-1.5 px-4 py-2.5 rounded-xl border ${
                lessonIndex === 0 ? 'opacity-30' : ''
              } ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <ChevronLeft size={16} color={isDarkMode ? '#fff' : '#000'} />
              <Text className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNextLesson}
              disabled={lessonIndex === course.lessons.length - 1}
              className={`flex-row items-center gap-1.5 px-4 py-2.5 rounded-xl border ${
                lessonIndex === course.lessons.length - 1 ? 'opacity-30' : ''
              } ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <Text className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Next
              </Text>
              <ChevronRight size={16} color={isDarkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>

          {/* Discussions Panel */}
          <Text className={`text-base font-black mb-3 uppercase tracking-wider ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Discussion Board ({comments.length})
          </Text>

          {/* Post Comment Input */}
          <View className="flex-row items-center gap-3 mb-6">
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Ask a question or comment..."
              placeholderTextColor={isDarkMode ? '#475569' : '#94a3b8'}
              className={`flex-1 text-sm border px-3.5 py-3 rounded-2xl ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              style={{ outlineStyle: 'none' } as any}
            />
            <TouchableOpacity
              onPress={handlePostComment}
              className="p-3.5 bg-primary-500 rounded-2xl shadow-md shadow-primary-500/25"
            >
              <Send size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <View className="gap-3">
            {comments.map((comment) => (
              <View
                key={comment.id}
                className={`p-4 rounded-3xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                }`}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-2">
                    <View className="w-6 h-6 rounded-full bg-primary-500 items-center justify-center">
                      <Text className="text-white text-xxs font-black">{comment.avatar}</Text>
                    </View>
                    <Text className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                      {comment.author}
                    </Text>
                  </View>
                  <Text className={`text-xxs font-semibold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {comment.time}
                  </Text>
                </View>
                <Text className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {comment.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
