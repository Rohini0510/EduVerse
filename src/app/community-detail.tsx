import { useSearchParams } from "expo-router";
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

export default function CommunityDetailScreen() {
  const params = useSearchParams();
  const { isDarkMode } = useAuthStore();
  const { user } = useAuthStore();
  const { posts, communities, likePost, addComment } = useCommunityStore();
  const [commentText, setCommentText] = useState("");

  const postId = params.postId as string;
  const post = posts.find((item) => item.id === postId);
  const community = post
    ? communities.find((item) => item.id === post.communityId)
    : null;

  const handleComment = () => {
    if (!post || !commentText.trim()) return;
    addComment(post.id, user?.name || "Study Buddy", commentText.trim());
    setCommentText("");
  };

  if (!post) {
    return (
      <SafeAreaView
        edges={["top", "left", "right"]}
        className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
      >
        <AppHeader title="Community Post" showBackButton showProfile={false} />
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Post not found
          </Text>
          <Text
            className={`text-sm mt-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Try returning to the community feed and selecting another
            discussion.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Discussion Details"
        showBackButton
        showProfile={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
      >
        <View
          className={`rounded-3xl p-6 mb-5 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"} border`}
        >
          <Text
            className={`text-base font-black mb-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            {post.title}
          </Text>
          <Text
            className={`text-xxs mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            {community?.name ?? "Community"} • Posted by {post.author}
          </Text>
          <Text
            className={`text-sm mb-4 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
          >
            {post.content}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text
              className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              {post.createdAt}
            </Text>
            <TouchableOpacity
              onPress={() => likePost(post.id)}
              className="flex-row items-center gap-2 rounded-full bg-primary-500 px-4 py-2"
            >
              <Text className="text-xxs font-bold text-white">Like</Text>
              <Text className="text-xxs text-white">{post.upvotes}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          className={`rounded-3xl p-5 mb-5 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"} border`}
        >
          <Text
            className={`text-sm font-black mb-4 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Comments ({post.comments.length})
          </Text>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <View
                key={comment.id}
                className={`rounded-3xl p-4 mb-3 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}
              >
                <Text
                  className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  {comment.author}
                </Text>
                <Text
                  className={`text-xs mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  {comment.createdAt}
                </Text>
                <Text
                  className={`text-sm ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {comment.text}
                </Text>
              </View>
            ))
          ) : (
            <Text
              className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              No comments yet — add the first helpful reply.
            </Text>
          )}
        </View>

        <View
          className={`rounded-3xl p-5 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"} border`}
        >
          <Text
            className={`text-sm font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Add a comment
          </Text>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write your answer or insight"
            placeholderTextColor={isDarkMode ? "#64748b" : "#9ca3af"}
            multiline
            numberOfLines={4}
            className={`rounded-3xl border px-4 py-4 mb-4 text-sm ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
          />
          <TouchableOpacity
            onPress={handleComment}
            disabled={!commentText.trim()}
            className={`rounded-3xl px-5 py-4 items-center ${!commentText.trim() ? "bg-slate-400" : "bg-primary-500"}`}
          >
            <Text className="text-sm font-bold text-white">Submit Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
