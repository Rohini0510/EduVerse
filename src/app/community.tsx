import { useRouter } from "expo-router";
import {
    Search,
    Sparkles,
    ThumbUp,
    Zap
} from "lucide-react-native";
import { useMemo, useState } from "react";
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

export default function CommunityScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const { user } = useAuthStore();
  const {
    communities,
    posts,
    joined,
    joinCommunity,
    leaveCommunity,
    likePost,
  } = useCommunityStore();
  const [searchQuery, setSearchQuery] = useState("");

  const username = user
    ? user.name.split(" ").join("_").toLowerCase()
    : "learning_user";

  const popular = useMemo(
    () =>
      posts
        .slice()
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 2),
    [posts],
  );

  const filtered = useMemo(
    () =>
      posts.filter(
        (discussion) =>
          discussion.content
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          discussion.author.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [posts, searchQuery],
  );

  const handleUpvote = (id: string) => {
    likePost(id);
  };

  const followedCommunities = communities.filter((community) =>
    joined.includes(community.id),
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Community Forum"
        showBackButton={false}
        showProfile={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        <View
          className={`rounded-3xl p-5 mb-6 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <Text
            className={`text-base font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Connect with learners across subjects and share your insights.
          </Text>
          <View
            className={`flex-row items-center gap-3 rounded-3xl border px-3 py-2 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}
          >
            <Search size={18} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search posts or authors"
              placeholderTextColor={isDarkMode ? "#6b7280" : "#9ca3af"}
              className={`flex-1 text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text
            className={`text-sm font-black mb-3 uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Your Communities
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-3"
          >
            {communities.map((community) => {
              const joinedCommunity = joined.includes(community.id);
              return (
                <View
                  key={community.id}
                  className={`rounded-3xl p-4 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
                >
                  <Text
                    className={`text-sm font-bold mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    {community.name}
                  </Text>
                  <Text
                    className={`text-xxs mb-3 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {community.description}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      joinedCommunity
                        ? leaveCommunity(community.id)
                        : joinCommunity(community.id)
                    }
                    className={`rounded-full px-4 py-2 ${joinedCommunity ? "bg-emerald-500" : "bg-slate-200"}`}
                  >
                    <Text
                      className={`text-xxs font-bold ${joinedCommunity ? "text-white" : "text-slate-900"}`}
                    >
                      {joinedCommunity ? "Joined" : "Join"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Trending Discussions
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/community-create")}
              className="rounded-full bg-primary-500 px-4 py-2"
            >
              <Text className="text-xxs font-bold text-white">New Post</Text>
            </TouchableOpacity>
          </View>
          {popular.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/community-detail?postId=${item.id}`)}
              className={`rounded-3xl p-4 mb-3 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Zap size={16} color="#f97316" />
                  <Text
                    className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {item.upvotes} votes
                  </Text>
                </View>
              </View>
              <Text
                className={`text-xs mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {item.category} • {item.createdAt}
              </Text>
              <Text
                className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                {item.content.slice(0, 100)}...
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Posts In Joined Communities
            </Text>
            <Text
              className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              {followedCommunities.length} communities
            </Text>
          </View>

          {filtered.length > 0 ? (
            filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  router.push(`/community-detail?postId=${item.id}`)
                }
                className={`rounded-3xl p-4 mb-3 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text
                      className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className={`text-xxs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Posted by {item.author} • {item.createdAt}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={(event) => {
                      event.stopPropagation();
                      handleUpvote(item.id);
                    }}
                    className="rounded-full bg-primary-500 p-2"
                  >
                    <ThumbUp size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
                <Text
                  className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  {item.content.slice(0, 140)}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              No posts found yet. Create a new discussion to get started.
            </Text>
          )}
        </View>

        <View
          className={`rounded-3xl p-5 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <View className="flex-row items-center gap-3 mb-3">
            <View className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/20">
              <Sparkles size={20} color="#0ea5e9" />
            </View>
            <Text
              className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              Share a challenge and learn together.
            </Text>
          </View>
          <Text
            className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Your post will appear in the community feed for others to support
            you.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
