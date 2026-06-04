import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';

export default function RegisterScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Fields Required', 'Please complete all fields to sign up.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Route to OTP screen
      router.push({
        pathname: '/(auth)/otp-verify',
        params: { email, name, mode: 'register' }
      });
    }, 1000);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 justify-center px-6 ${
      isDarkMode ? 'bg-slate-955 bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Header Info */}
      <View className="items-center mb-8">
        <View className="p-4 bg-teal-500 rounded-2xl mb-3 shadow-md shadow-teal-500/20">
          <GraduationCap size={36} color="#fff" />
        </View>
        <Text className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Join EduVerse
        </Text>
        <Text className={`text-sm mt-1 text-center font-medium ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Create an account to start your educational journey
        </Text>
      </View>

      {/* Inputs Form */}
      <View className="space-y-4 gap-4">
        {/* Name Input */}
        <View>
          <Text className={`text-xs font-bold uppercase tracking-wider mb-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Full Name
          </Text>
          <View className={`flex-row items-center border px-3.5 py-3 rounded-2xl ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <User size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} className="mr-2" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Rohan Sharma"
              placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
              className={`flex-1 text-base p-0 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              style={{ outlineStyle: 'none' } as any}
            />
          </View>
        </View>

        {/* Email Input */}
        <View>
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

        {/* Password Input */}
        <View>
          <Text className={`text-xs font-bold uppercase tracking-wider mb-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Create Password
          </Text>
          <View className={`flex-row items-center border px-3.5 py-3 rounded-2xl ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Lock size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} className="mr-2" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Min 6 characters"
              placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              className={`flex-1 text-base p-0 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              style={{ outlineStyle: 'none' } as any}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} />
              ) : (
                <Eye size={18} color={isDarkMode ? '#94a3b8' : '#64748b'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        disabled={loading}
        onPress={handleRegister}
        className="bg-teal-500 hover:bg-teal-600 py-4 rounded-2xl items-center mt-8 shadow-lg shadow-teal-500/20"
      >
        <Text className="text-white font-extrabold text-base uppercase tracking-wider">
          {loading ? 'Submitting...' : 'Register & Verify'}
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View className="flex-row justify-center mt-6">
        <Text className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text className="text-teal-500 font-extrabold text-sm">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
