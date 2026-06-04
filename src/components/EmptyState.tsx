import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There is nothing to display here yet.',
  actionText,
  onAction,
}) => {
  const { isDarkMode } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center py-12 px-6">
      <View className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
        <HelpCircle size={40} color={isDarkMode ? '#64748b' : '#94a3b8'} />
      </View>
      <Text className={`text-lg font-bold text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </Text>
      <Text className={`text-sm mt-2 text-center max-w-xs leading-relaxed ${
        isDarkMode ? 'text-slate-400' : 'text-slate-500'
      }`}>
        {description}
      </Text>

      {actionText && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="mt-6 bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold text-sm uppercase tracking-wider">
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
