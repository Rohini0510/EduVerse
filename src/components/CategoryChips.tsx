import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { isDarkMode } = useAuthStore();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 4 }}
      className="flex-row"
    >
      <TouchableOpacity
        onPress={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full border transition-all ${
          selectedCategory === null
            ? 'bg-primary-500 border-primary-500'
            : isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}
      >
        <Text
          className={`font-semibold text-sm ${
            selectedCategory === null
              ? 'text-white'
              : isDarkMode
              ? 'text-slate-300'
              : 'text-slate-600'
          }`}
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <TouchableOpacity
            key={category}
            onPress={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full border transition-all ${
              isSelected
                ? 'bg-primary-500 border-primary-500'
                : isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                isSelected
                  ? 'text-white'
                  : isDarkMode
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
