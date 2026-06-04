import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, HelpCircle, GraduationCap, Award, ArrowRight, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';

const ONBOARDING_STEPS = [
  {
    title: 'Welcome to EduVerse',
    description: 'An AI-powered learning environment designed specifically to bring high-quality education to everyone, everywhere.',
    icon: GraduationCap,
    color: 'bg-primary-500',
    iconColor: '#ffffff',
  },
  {
    title: 'Learn Anywhere, Offline',
    description: 'Slow connection? No problem. Download full video lessons and worksheets directly to study anytime without mobile data.',
    icon: BookOpen,
    color: 'bg-teal-500',
    iconColor: '#ffffff',
  },
  {
    title: 'AI Tutor Assistance',
    description: 'Ask questions, translate lessons, and clarify concepts with our instant AI assistant in Marathi, Hindi, Telugu, Tamil, and Bengali.',
    icon: HelpCircle,
    color: 'bg-indigo-500',
    iconColor: '#ffffff',
  },
  {
    title: 'Earn Verified Certificates',
    description: 'Complete lessons, test your skills, and earn certified qualifications to boost your career opportunities and resume.',
    icon: Award,
    color: 'bg-amber-500',
    iconColor: '#ffffff',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/(auth)/login');
    }
  };

  const activeStep = ONBOARDING_STEPS[currentStep];
  const Icon = activeStep.icon;

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 justify-between p-6 ${
      isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Skip Button */}
      <View className="flex-row justify-end pt-4">
        {currentStep < ONBOARDING_STEPS.length - 1 ? (
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-primary-500 font-bold text-sm uppercase tracking-wider">
              Skip
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="h-5" />
        )}
      </View>

      {/* Slide Content */}
      <View className="items-center px-4 my-auto">
        {/* Animated Badge Container */}
        <View className={`p-8 rounded-full mb-8 ${activeStep.color} shadow-lg shadow-black/10`}>
          <Icon size={72} color={activeStep.iconColor} />
        </View>

        <Text className={`text-2xl font-black text-center mb-3 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {activeStep.title}
        </Text>

        <Text className={`text-sm text-center leading-relaxed font-medium ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {activeStep.description}
        </Text>
      </View>

      {/* Footer Navigation */}
      <View className="pb-8">
        {/* Step Indicator Dots */}
        <View className="flex-row justify-center gap-2 mb-8">
          {ONBOARDING_STEPS.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentStep ? 'w-6 bg-primary-500' : 'w-2 bg-slate-300 dark:bg-slate-800'
              }`}
            />
          ))}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          onPress={handleNext}
          className={`w-full py-4 rounded-2xl flex-row items-center justify-center gap-2 ${
            currentStep === ONBOARDING_STEPS.length - 1 ? 'bg-teal-500' : 'bg-primary-500'
          }`}
        >
          <Text className="text-white font-extrabold text-base uppercase tracking-wider">
            {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <Check size={18} color="#fff" />
          ) : (
            <ArrowRight size={18} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
