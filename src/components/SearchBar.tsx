import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search courses, lessons, topics...',
}) => {
  const { isDarkMode } = useAuthStore();

  return (
    <View className={`flex-row items-center px-3 py-2.5 rounded-2xl border ${
      isDarkMode
        ? 'bg-slate-800 border-slate-700'
        : 'bg-slate-50 border-slate-200'
    }`}>
      <Search size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} className="mr-2" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
        className={`flex-1 text-base p-0 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
        style={{ outlineStyle: 'none' } as any}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} className="p-1 rounded-full bg-slate-200 dark:bg-slate-700">
          <X size={14} color={isDarkMode ? '#cbd5e1' : '#475569'} />
        </TouchableOpacity>
      )}
    </View>
  );
};
