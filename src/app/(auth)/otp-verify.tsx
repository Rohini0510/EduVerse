import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ShieldAlert, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { isDarkMode, login, register } = useAuthStore();
  const params = useLocalSearchParams<{ email: string; name?: string; mode: string }>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 4) {
      Alert.alert('Invalid Code', 'Please enter the 4-digit code.');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let success = false;

      if (params.mode === 'register' && params.name) {
        success = await register(params.name, params.email);
      } else {
        success = await login(params.email, params.name);
      }

      if (success) {
        if (Platform.OS === 'web') {
          alert('Verification Successful! Welcome to EduVerse.');
          router.replace('/(tabs)');
        } else {
          Alert.alert(
            'Verification Successful',
            'Welcome to EduVerse! Your account is active.',
            [
              {
                text: 'Enter Classroom',
                onPress: () => router.replace('/(tabs)')
              }
            ]
          );
        }
      } else {
        if (Platform.OS === 'web') {
          alert('Verification Failed. Invalid OTP.');
        } else {
          Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
        }
      }
    }, 1200);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 justify-center px-6 ${
      isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 p-2 rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <ArrowLeft size={18} color={isDarkMode ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Header */}
      <View className="items-center mb-8">
        <View className="p-4 bg-teal-500 rounded-2xl mb-3 shadow-md shadow-teal-500/20">
          <ShieldAlert size={36} color="#fff" />
        </View>
        <Text className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Security Code
        </Text>
        <Text className={`text-sm mt-1 text-center font-medium max-w-xs ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          We sent a verification code to {params.email || 'your email'}. Enter any 4-digit code (e.g. 1234).
        </Text>
      </View>

      {/* Input */}
      <View className="items-center mb-8">
        <TextInput
          value={otp}
          onChangeText={setOtp}
          placeholder="0000"
          placeholderTextColor={isDarkMode ? '#475569' : '#cbd5e1'}
          keyboardType="number-pad"
          maxLength={4}
          className={`text-4xl tracking-[24px] text-center font-black w-48 border-b-2 py-2 ${
            isDarkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-300'
          }`}
          style={{ outlineStyle: 'none' } as any}
        />
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        disabled={loading}
        onPress={handleVerify}
        className="bg-primary-500 hover:bg-primary-600 py-4 rounded-2xl items-center shadow-lg shadow-primary-500/20"
      >
        <Text className="text-white font-extrabold text-base uppercase tracking-wider">
          {loading ? 'Verifying...' : 'Verify Code'}
        </Text>
      </TouchableOpacity>

      {/* Resend Link */}
      <View className="flex-row justify-center mt-6">
        <Text className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Didn't receive code?{' '}
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('Code Resent', 'A new OTP has been sent to your email.')}>
          <Text className="text-primary-500 font-extrabold text-sm">
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
