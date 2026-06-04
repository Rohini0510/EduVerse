import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  language: string;
}

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  aiQuestions: number;
  sendMessage: (text: string, language: string) => Promise<void>;
  clearChat: () => void;
  newChat: () => void;
}

// Regional language responses
const AI_RESPONSES: Record<string, string[]> = {
  English: [
    "That is an excellent question! In computer programming, variables are like labelled storage boxes containing data that can change.",
    "Sure, I can explain that. Photosynthesis is the process where green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
    "A great tip for interviews: always research the company before, dress professionally, and use the STAR method to answer behavioral questions.",
    "In simple terms, Machine Learning teaches computers to recognize patterns from examples instead of writing rules manually.",
    "To build a strong daily learning habit, set aside just 15 minutes at the same time every day. Small efforts build up over time!",
  ],
  Hindi: [
    "यह एक बहुत अच्छा सवाल है! कंप्यूटर प्रोग्रामिंग में, वेरिएबल्स डिब्बों की तरह होते हैं जिनमें डेटा स्टोर होता है।",
    "प्रकाश संश्लेषण (Photosynthesis) वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश का उपयोग करके भोजन बनाते हैं।",
    "इंटरव्यू के लिए एक बढ़िया सुझाव: हमेशा कंपनी के बारे में पहले से शोध करें और आत्मविश्वास से जवाब दें।",
  ],
  Marathi: [
    "हा खूप छान प्रश्न आहे! कॉम्प्युटर प्रोग्रामिंगमध्ये, व्हेरिएबल्स म्हणजे डेटा साठवून ठेवणारे कप्पे असतात.",
    "प्रकाशसंश्लेषण ही अशी प्रक्रिया आहे ज्यामध्ये वनस्पती सूर्यप्रकाशाचा वापर करून अन्न तयार करतात.",
  ],
  Tamil: [
    "இது ஒரு சிறந்த கேள்வி! கணினி நிரலாக்கத்தில், மாறிகள் (variables) என்பது தரவைச் சேமிக்கும் கொள்கலன்கள் போன்றது.",
    "ஒளிச்சேர்க்கை என்பது தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி உணவைத் தயாரிக்கும் செயல்முறையாகும்.",
  ],
  Bengali: [
    "এটি একটি খুব ভালো প্রশ্ন! কম্পিউটার প্রোগ্রামিংয়ে ভেরিয়েবল হলো এমন পাত্র যা ডেটা ধারণ করে এবং পরিবর্তিত হতে পারে।",
    "সালোকসংশ্লেষ হলো এমন প্রক্রিয়া যার মাধ্যমে সবুজ উদ্ভিদ সূর্যালোক ব্যবহার করে খাদ্য তৈরি করে।",
  ],
  Telugu: [
    "ఇది చాలా మంచి ప్రశ్న! కంప్యూటర్ ప్రోగ్రామింగ్‌లో వేరియబుల్స్ అనేవి డేటాను నిల్వ చేయడానికి ఉపయోగించే పెట్టెల వంటివి.",
    "కిరణజన్య సంయోగక్రియ అనేది మొక్కలు సూర్యరశ్మిని ఉపయోగించి ఆహారాన్ని తయారుచేసే ప్రక్రియ.",
  ],
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: "welcome_msg",
          sender: "ai",
          text: "Hello! I am your EduVerse AI Tutor. How can I help you study today? You can select your preferred regional language above!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          language: "English",
        },
      ],
      isTyping: false,
      aiQuestions: 0,

      sendMessage: async (text, language) => {
        const userMsg: ChatMessage = {
          id: "msg_" + Date.now(),
          sender: "user",
          text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          language,
        };

        set((state) => ({
          messages: [...state.messages, userMsg],
          isTyping: true,
          aiQuestions: state.aiQuestions + 1,
        }));

        // Simulate typing delay of 1.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Get appropriate response
        const responsesList = AI_RESPONSES[language] || AI_RESPONSES["English"];
        const randomResponse =
          responsesList[Math.floor(Math.random() * responsesList.length)];

        const aiMsg: ChatMessage = {
          id: "msg_ai_" + Date.now(),
          sender: "ai",
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          language,
        };

        set((state) => ({
          messages: [...state.messages, aiMsg],
          isTyping: false,
        }));
      },

      newChat: () => {
        set({
          messages: [
            {
              id: "welcome_msg",
              sender: "ai",
              text: "Welcome to a fresh EduVerse AI Tutor chat. Ask anything in your preferred language!",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              language: "English",
            },
          ],
          aiQuestions: 0,
        });
      },

      clearChat: () => {
        set({
          messages: [
            {
              id: "welcome_msg",
              sender: "ai",
              text: "Hello! I am your EduVerse AI Tutor. How can I help you study today?",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              language: "English",
            },
          ],
        });
      },
    }),
    {
      name: "eduverse-chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
