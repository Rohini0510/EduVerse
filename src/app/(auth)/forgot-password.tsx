import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    if (!email) {
      Alert.alert('Email Required', 'Please enter your registered email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Code Sent',
        `A password reset OTP code has been sent to ${email}.`,
        [
          {
            text: 'Proceed to OTP',
            onPress: () => {
              router.push({
                pathname: '/(auth)/otp-verify',
                params: { email, mode: 'reset' }
              });
            }
          }
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 justify-center px-6 ${
      isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Back to Login */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 p-2 rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <ArrowLeft size={18} color={isDarkMode ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Header */}
      <View className="items-center mb-8">
        <View className="p-4 bg-indigo-500 rounded-2xl mb-3 shadow-md shadow-indigo-500/20">
          <KeyRound size={36} color="#fff" />
        </View>
        <Text className={`text-3xl font-black text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Reset Password
        </Text>
        <Text className={`text-sm mt-1 text-center font-medium max-w-xs ${
          isDarkMode ? 'text-slate-400' : 'text-slate-550'
        }`}>
          Enter your email and we'll send you an OTP to set a new password
        </Text>
      </View>

      {/* Input */}
      <View className="space-y-4">
        <Text className={`text-xs font-bold uppercase tracking-wider mb-2 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Email Address
        </Text>
        <View className={`flex-row items-center border px-3.5 py-3 rounded-2xl ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <Mail size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} className="mr-2" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="e.g. name@domain.com"
            placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
            keyboardType="email-address"
            autoCapitalize="none"
            className={`flex-1 text-base p-0 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            style={{ outlineStyle: 'none' } as any}
          />
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        disabled={loading}
        onPress={handleReset}
        className="bg-indigo-500 hover:bg-indigo-600 py-4 rounded-2xl items-center mt-8 shadow-lg shadow-indigo-500/20"
      >
        <Text className="text-white font-extrabold text-base uppercase tracking-wider">
          {loading ? 'Sending Code...' : 'Send Recovery OTP'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
