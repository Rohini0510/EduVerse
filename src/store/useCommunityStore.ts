import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Community = {
  id: string;
  name: string;
  topic: string;
  members: number;
  description?: string;
};

export type Post = {
  id: string;
  communityId: string;
  author: string; // username only
  avatar?: string;
  category: string;
  content: string;
  upvotes: number;
  comments: CommentItem[];
  createdAt: string;
};

export type CommentItem = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

interface CommunityState {
  communities: Community[];
  posts: Post[];
  joined: string[]; // community ids
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;
  createPost: (
    p: Omit<Post, "id" | "upvotes" | "comments" | "createdAt">,
  ) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, author: string, text: string) => void;
  searchPosts: (query: string) => Post[];
}

const INITIAL_COMMUNITIES: Community[] = [
  {
    id: "comm_prog",
    name: "Programming",
    topic: "Programming",
    members: 1240,
    description: "Discuss code, patterns, and projects.",
  },
  {
    id: "comm_math",
    name: "Mathematics",
    topic: "Mathematics",
    members: 820,
    description: "Problem solving and math discussions.",
  },
  {
    id: "comm_ai",
    name: "AI & ML",
    topic: "AI & ML",
    members: 540,
    description: "AI projects, papers and resources.",
  },
];

const INITIAL_POSTS: Post[] = [
  {
    id: "post_1",
    communityId: "comm_prog",
    author: "java_master",
    avatar: undefined,
    category: "Study Tips",
    content:
      "What are the best resources to learn system design as a beginner?",
    upvotes: 34,
    comments: [
      {
        id: "c1",
        author: "dev_jai",
        text: "Start with small projects and read scalable system case studies.",
        createdAt: "2h ago",
      },
    ],
    createdAt: "3h ago",
  },
];

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      communities: INITIAL_COMMUNITIES,
      posts: INITIAL_POSTS,
      joined: [],
      joinCommunity: (id: string) => {
        set((state) => ({
          joined: Array.from(new Set([...state.joined, id])),
        }));
      },
      leaveCommunity: (id: string) => {
        set((state) => ({ joined: state.joined.filter((c) => c !== id) }));
      },
      createPost: (p) => {
        const newPost: Post = {
          ...p,
          id: `post_${Date.now()}`,
          upvotes: 0,
          comments: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ posts: [newPost, ...state.posts] }));
      },
      likePost: (postId: string) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post,
          ),
        }));
      },
      addComment: (postId: string, author: string, text: string) => {
        const comment: CommentItem = {
          id: `c_${Date.now()}`,
          author,
          text,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post,
          ),
        }));
      },
      searchPosts: (query: string) => {
        const q = query.toLowerCase();
        return get().posts.filter(
          (p) =>
            p.content.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q),
        );
      },
    }),
    {
      name: "eduverse-community",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useCommunityStore;
