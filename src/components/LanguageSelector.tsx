import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Languages } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { name: 'English', localName: 'English' },
  { name: 'Hindi', localName: 'हिंदी' },
  { name: 'Marathi', localName: 'मराठी' },
  { name: 'Tamil', localName: 'தமிழ்' },
  { name: 'Bengali', localName: 'বাংলা' },
  { name: 'Telugu', localName: 'తెలుగు' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const { isDarkMode } = useAuthStore();

  return (
    <View className={`py-2 px-3 border-b flex-row items-center gap-2 ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <Languages size={16} color={isDarkMode ? '#0ea5e9' : '#0284c7'} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingRight: 12 }}
      >
        {LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.name;
          return (
            <TouchableOpacity
              key={lang.name}
              onPress={() => onSelectLanguage(lang.name)}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                isSelected
                  ? 'bg-primary-500 border-primary-500'
                  : isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Text className={`text-xs font-bold ${
                isSelected
                  ? 'text-white'
                  : isDarkMode
                  ? 'text-slate-355 text-slate-300'
                  : 'text-slate-700'
              }`}>
                {lang.name} <Text className="font-normal opacity-80">({lang.localName})</Text>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
