import { Bot, User } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import { ChatMessage } from "../store/useChatStore";

interface AIChatBubbleProps {
  message: ChatMessage;
}

export const AIChatBubble: React.FC<AIChatBubbleProps> = ({ message }) => {
  const { isDarkMode, user } = useAuthStore();
  const isAi = message.sender === "ai";

  return (
    <View className={`flex-row mb-4 ${isAi ? "justify-start" : "justify-end"}`}>
      {isAi && (
        <View className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-950 items-center justify-center mr-3 self-end">
          <Bot size={16} color="#0ea5e9" />
        </View>
      )}

      <View
        className={`max-w-[80%] px-4 py-3 rounded-3xl ${
          isAi
            ? isDarkMode
              ? "bg-slate-800 rounded-bl-none"
              : "bg-slate-100 rounded-bl-none"
            : "bg-primary-500 rounded-br-none"
        }`}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className={`text-xs uppercase tracking-[0.18em] font-bold ${
              isAi ? "text-slate-400" : "text-primary-100"
            }`}
          >
            {isAi ? "AI Tutor" : "You"}
          </Text>
          <Text
            className={`text-xxs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
          >
            {message.timestamp}
          </Text>
        </View>

        <Text
          className={`text-sm leading-relaxed ${
            isAi
              ? isDarkMode
                ? "text-slate-200"
                : "text-slate-900"
              : "text-white"
          }`}
        >
          {message.text}
        </Text>

        {isAi && (
          <Text
            className={`text-xxs mt-3 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
          >
            Language: {message.language}
          </Text>
        )}
      </View>

      {!isAi &&
        (user?.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            className="w-9 h-9 rounded-full ml-3 self-end border border-primary-400"
          />
        ) : (
          <View className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-700 items-center justify-center ml-3 self-end">
            <User size={16} color="#fff" />
          </View>
        ))}
    </View>
  );
};
