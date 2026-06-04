import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../components/AppHeader";
import { useAuthStore } from "../store/useAuthStore";
import useCommunityStore from "../store/useCommunityStore";

export default function CommunityCreateScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const { user } = useAuthStore();
  const { communities, createPost } = useCommunityStore();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(communities[0]?.name || "General");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState(communities[0]?.id || "");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !communityId) {
      return;
    }

    createPost({
      communityId,
      author: user?.name || "Study Buddy",
      category,
      content: content.trim(),
    });

    router.back();
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="New Community Post"
        showBackButton
        showProfile={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
      >
        <View
          className={`rounded-3xl p-6 ${isDarkMode ? "bg-slate-900" : "bg-white"} border ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <Text
            className={`text-lg font-black mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Share your learning challenge
          </Text>

          <Text
            className={`text-xs uppercase tracking-widest mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Choose community
          </Text>
          <View className="space-y-3 mb-4">
            {communities.map((community) => (
              <TouchableOpacity
                key={community.id}
                onPress={() => {
                  setCommunityId(community.id);
                  setCategory(community.topic);
                }}
                className={`rounded-3xl p-4 border ${communityId === community.id ? "border-primary-500 bg-primary-50" : isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"}`}
              >
                <Text
                  className={`font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  {community.name}
                </Text>
                <Text
                  className={`text-xxs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  {community.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            className={`text-xs uppercase tracking-widest mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Post title
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="E.g. Best way to learn algorithms"
            placeholderTextColor={isDarkMode ? "#64748b" : "#9ca3af"}
            className={`rounded-3xl border px-4 py-3 mb-4 text-sm ${isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
          />

          <Text
            className={`text-xs uppercase tracking-widest mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Details
          </Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Describe your question, what you've tried, and where you're stuck."
            placeholderTextColor={isDarkMode ? "#64748b" : "#9ca3af"}
            multiline
            numberOfLines={6}
            className={`rounded-3xl border px-4 py-4 mb-6 text-sm ${isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className={`rounded-3xl px-5 py-4 items-center ${!title.trim() || !content.trim() ? "bg-slate-400" : "bg-primary-500"}`}
          >
            <Text className="text-sm font-bold text-white">
              Post to Community
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
