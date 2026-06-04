import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, GraduationCap, ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginScreen() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fields Required', 'Please enter your email and password to log in.');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      router.push({
        pathname: '/(auth)/otp-verify',
        params: { email, mode: 'login' }
      });
    }, 1000);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className={`flex-1 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className={isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
        >
        <View className="px-6 py-12 items-center justify-center">
          
          {/* Brand/Header cap */}
          <View className="items-center mb-8">
            <View className="p-4 bg-gradient-to-tr from-primary-600 to-teal-500 rounded-3xl mb-4 shadow-lg shadow-primary-500/30">
              <GraduationCap size={44} color="#fff" />
            </View>
            <Text className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Edu<Text className="text-primary-500">Verse</Text>
            </Text>
            <Text className={`text-xs mt-1 font-bold uppercase tracking-widest ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Knowledge for Everyone
            </Text>
          </View>

          {/* Premium Form Card */}
          <View className={`w-full max-w-md p-6 rounded-3xl border shadow-xl ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 shadow-black/40' 
              : 'bg-white border-slate-100 shadow-slate-200/50'
          }`}>
            <Text className={`text-xl font-black mb-1.5 ${isDarkMode ? 'text-white' : 'text-slate-955 text-slate-900'}`}>
              Welcome Back
            </Text>
            <Text className={`text-xs font-semibold mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Sign in to continue your course progress.
            </Text>

            {/* Email Field */}
            <View className="mb-4">
              <Text className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Email Address
              </Text>
              <View className={`flex-row items-center border px-3.5 py-3 rounded-2xl ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <Mail size={18} color={isDarkMode ? '#64748b' : '#94a3b8'} className="mr-2.5" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="e.g. rohan.sharma@domain.com"
                  placeholderTextColor={isDarkMode ? '#475569' : '#94a3b8'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`flex-1 text-sm p-0 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                  style={{ outlineStyle: 'none' } as any}
                />
              </View>
            </View>

            {/* Password Field */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Password
                </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                  <Text className="text-primary-500 text-xs font-bold">
                    Forgot?
                  </Text>
                </TouchableOpacity>
              </View>
              <View className={`flex-row items-center border px-3.5 py-3 rounded-2xl ${
                isDarkMode ? 'bg-slate-955 bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <Lock size={18} color={isDarkMode ? '#64748b' : '#94a3b8'} className="mr-2.5" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your security password"
                  placeholderTextColor={isDarkMode ? '#475569' : '#94a3b8'}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className={`flex-1 text-sm p-0 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                  style={{ outlineStyle: 'none' } as any}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={18} color={isDarkMode ? '#64748b' : '#94a3b8'} />
                  ) : (
                    <Eye size={18} color={isDarkMode ? '#64748b' : '#94a3b8'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button with Blue-to-Teal gradient texturing */}
            <TouchableOpacity
              disabled={loading}
              onPress={handleLogin}
              className="bg-primary-500 hover:bg-primary-650 py-4 rounded-2xl items-center flex-row justify-center gap-2 shadow-md shadow-primary-500/20"
            >
              <Text className="text-white font-extrabold text-sm uppercase tracking-wider">
                {loading ? 'Processing...' : 'Proceed to OTP'}
              </Text>
              {!loading && <ArrowRight size={16} color="#fff" />}
            </TouchableOpacity>
          </View>

          {/* Registration Redirect Link */}
          <View className="flex-row justify-center mt-6">
            <Text className={`text-sm font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Don't have an account yet?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-primary-555 text-primary-500 font-extrabold text-sm">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}
