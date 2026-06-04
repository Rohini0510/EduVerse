import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';
import { AppHeader } from '../../components/AppHeader';
import { SearchBar } from '../../components/SearchBar';
import { CategoryChips } from '../../components/CategoryChips';
import { CourseCard } from '../../components/CourseCard';
import { EmptyState } from '../../components/EmptyState';
import { CATEGORIES } from '../../services/mockData';

export default function CoursesScreen() {
  const { isDarkMode } = useAuthStore();
  const { courses, enrollInCourse } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter course catalog based on category and search query
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
      const matchesSearch = searchQuery
        ? course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchQuery]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <AppHeader title="Course Catalog" showBackButton={false} showProfile={true} />

      {/* Search Header Container */}
      <View className={`px-4 py-3 border-b ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
      }`}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Category Chips Selector */}
      <View className={`py-3 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <CategoryChips
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
      >
        <Text className={`text-base font-extrabold mb-4 uppercase tracking-wider ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Available
        </Text>

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={() => enrollInCourse(course.id)}
            />
          ))
        ) : (
          <EmptyState
            title="No Courses Found"
            description="We couldn't find any courses matching your search parameters. Please try a different query or category."
            actionText="Clear Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
