import React from 'react';
import { View, Text, Image } from 'react-native';
import { Bot, User } from 'lucide-react-native';
import { ChatMessage } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { isDarkMode, user } = useAuthStore();
  const isAi = message.sender === 'ai';

  return (
    <View className={`flex-row mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}>
      {/* Avatar for AI */}
      {isAi && (
        <View className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950 items-center justify-center mr-2 self-end">
          <Bot size={16} color="#0ea5e9" />
        </View>
      )}

      {/* Bubble Content */}
      <View className={`max-w-[75%] px-4 py-3 rounded-2xl ${
        isAi
          ? isDarkMode
            ? 'bg-slate-800 rounded-bl-none text-white'
            : 'bg-slate-100 rounded-bl-none text-slate-800'
          : 'bg-primary-500 rounded-br-none'
      }`}>
        <Text className={`text-sm leading-relaxed ${
          isAi
            ? isDarkMode ? 'text-slate-200' : 'text-slate-800'
            : 'text-white'
        }`}>
          {message.text}
        </Text>
        <Text className={`text-xxs mt-1 text-right font-medium ${
          isAi
            ? isDarkMode ? 'text-slate-500' : 'text-slate-400'
            : 'text-primary-200'
        }`}>
          {message.timestamp}
        </Text>
      </View>

      {/* Avatar for User */}
      {!isAi && (
        user?.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            className="w-8 h-8 rounded-full ml-2 self-end border border-primary-400"
          />
        ) : (
          <View className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 items-center justify-center ml-2 self-end">
            <User size={16} color="#fff" />
          </View>
        )
      )}
    </View>
  );
};
