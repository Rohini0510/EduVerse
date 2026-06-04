import {
    Mic,
    Send,
    Sparkles,
    Trash2
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AIChatBubble } from "../../components/AIChatBubble";
import { AppHeader } from "../../components/AppHeader";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const SUGGESTED_PROMPTS = [
  "Explain Python variables simply",
  "How do plants make food?",
  "STAR method for interviews",
  "What is machine learning?",
];

export default function AiTutorScreen() {
  const { isDarkMode, language, setLanguage } = useAuthStore();
  const { messages, isTyping, sendMessage, clearChat } = useChatStore();
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setInputText("");
    await sendMessage(text, language);
    scrollToBottom();
  };

  const handleMicPress = () => {
    // Simulate voice dictation adding a predefined question
    const voiceText = "How do loops work in Python?";
    Alert.alert("Voice Input (Simulated)", `Recognized: "${voiceText}"`, [
      { text: "Cancel", style: "cancel" },
      { text: "Send Message", onPress: () => handleSend(voiceText) },
    ]);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Compute tab bar height to position input cleanly above it
  const tabHeight = Platform.select({
    ios: 66 + insets.bottom,
    android: insets.bottom > 0 ? 66 + insets.bottom : 70,
    web: 72,
    default: 72,
  });

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <AppHeader
          title="AI Study Tutor"
          showBackButton={false}
          showProfile={true}
        />

        {/* Language Selector at Top */}
        <LanguageSelector
          selectedLanguage={language}
          onSelectLanguage={setLanguage}
        />

        {/* Clear Chat Option */}
        <View
          className={`px-4 py-2 border-b flex-row justify-between items-center ${
            isDarkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <Text
            className={`text-xxs font-bold uppercase tracking-wider ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Tutor online • Translating to {language}
          </Text>
          <TouchableOpacity
            onPress={clearChat}
            className="flex-row items-center gap-1"
          >
            <Trash2 size={12} color="#ef4444" />
            <Text className="text-red-500 text-xxs font-bold uppercase">
              Clear Chat
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={scrollToBottom}
          className={`flex-1 px-4 py-4 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg) => (
            <AIChatBubble key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <View className="flex-row items-center gap-2 mb-4">
              <View className="px-4 py-3 rounded-2xl rounded-bl-none bg-slate-200 dark:bg-slate-800">
                <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs italic animate-pulse">
                  AI Tutor is explaining...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Suggestions & Input */}
        <View
          className={`p-4 border-t ${
            isDarkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-100"
          }`}
          style={{ marginBottom: tabHeight }}
        >
          {/* Suggested Prompt Chips */}
          {messages.length <= 2 && (
            <View className="mb-4">
              <Text
                className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Suggested Topics
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <TouchableOpacity
                    key={prompt}
                    onPress={() => handleSend(prompt)}
                    className={`px-3.5 py-2 rounded-2xl border flex-row items-center gap-1.5 ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <Sparkles size={12} color="#0ea5e9" />
                    <Text
                      className={`text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-660"}`}
                    >
                      {prompt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Input Bar */}
          <View className="flex-row items-center gap-3">
            <View
              className={`flex-1 flex-row items-center border px-3 py-2 rounded-2xl ${
                isDarkMode
                  ? "bg-slate-950 border-slate-850"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder={`Ask in ${language}...`}
                placeholderTextColor={isDarkMode ? "#475569" : "#94a3b8"}
                className={`flex-1 text-base p-0 font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`}
                onSubmitEditing={() => handleSend(inputText)}
                style={{ outlineStyle: "none" } as any}
              />
              <TouchableOpacity onPress={handleMicPress} className="p-1">
                <Mic size={18} color={isDarkMode ? "#94a3b8" : "#64748b"} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => handleSend(inputText)}
              className="p-3 bg-primary-500 rounded-2xl shadow-md shadow-primary-500/20"
            >
              <Send size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
