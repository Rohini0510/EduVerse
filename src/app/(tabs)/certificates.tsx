import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';
import { AppHeader } from '../../components/AppHeader';
import { CertificateCard } from '../../components/CertificateCard';
import { EmptyState } from '../../components/EmptyState';
import { Award, ShieldCheck, X, Share2, HelpCircle } from 'lucide-react-native';
import { Certificate } from '../../services/mockData';

export default function CertificatesScreen() {
  const { isDarkMode, user } = useAuthStore();
  const { certificates } = useCourseStore();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleShare = async (cert: Certificate) => {
    try {
      await Share.share({
        message: `I just earned a verified certificate for completing the course "${cert.courseName}" on EduVerse! Verification ID: ${cert.verificationId}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <AppHeader title="My Qualifications" showBackButton={false} showProfile={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
      >
        <View className="mb-4">
          <Text className={`text-base font-extrabold uppercase tracking-wider ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Earned Qualifications ({certificates.length})
          </Text>
        </View>

        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onPreview={() => setSelectedCert(cert)}
            />
          ))
        ) : (
          <EmptyState
            title="No Certificates Yet"
            description="You will earn verified certificates when you complete courses to 100%. Master a subject today!"
            actionText="Browse Courses"
            onAction={() => {}} // Route to courses page is handled by tab navigation
          />
        )}
      </ScrollView>

      {/* Certificate Premium Preview Modal */}
      <Modal
        visible={!!selectedCert}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCert(null)}
      >
        <View className="flex-1 bg-black/60 items-center justify-center p-6">
          <View className={`w-full max-w-md rounded-3xl overflow-hidden border shadow-2xl ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Modal Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
              <Text className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                Verified Certificate
              </Text>
              <TouchableOpacity onPress={() => setSelectedCert(null)} className="p-1 rounded-full bg-slate-100 dark:bg-slate-800">
                <X size={18} color={isDarkMode ? '#fff' : '#000'} />
              </TouchableOpacity>
            </View>

            {/* Certificate Template Body */}
            {selectedCert && (
              <View className="p-6 items-center">
                {/* Visual Certificate Frame */}
                <View className={`w-full p-6 border-4 rounded-2xl items-center relative ${
                  isDarkMode
                    ? 'bg-slate-950 border-primary-900/60'
                    : 'bg-amber-50/20 border-amber-200/60'
                }`} style={{ borderColor: '#d97706', borderWidth: 3 }}>
                  
                  {/* Decorative corner borders */}
                  <View className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-600" />
                  <View className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-600" />
                  <View className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-600" />
                  <View className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-600" />

                  {/* Header Cap */}
                  <Award size={36} color="#d97706" className="mb-2" />

                  <Text className="text-amber-700 dark:text-amber-400 font-extrabold text-xs uppercase tracking-widest text-center">
                    EduVerse Academy
                  </Text>
                  
                  <Text className={`text-lg font-black text-center mt-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Certificate of Achievement
                  </Text>
                  
                  <Text className={`text-xxs italic mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    This is proudly presented to
                  </Text>

                  <Text className={`text-xl font-black text-center mt-3 border-b pb-1 px-4 tracking-wide ${
                    isDarkMode ? 'text-teal-400 border-slate-800' : 'text-primary-600 border-slate-200'
                  }`}>
                    {selectedCert.recipientName}
                  </Text>

                  <Text className={`text-xxs text-center max-w-[200px] leading-relaxed mt-2 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    for successfully finishing all lessons and assessments in the online course
                  </Text>

                  <Text className={`text-sm font-black text-center mt-2.5 max-w-[240px] px-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {selectedCert.courseName}
                  </Text>

                  {/* Credentials / Signatures */}
                  <View className="flex-row justify-between w-full mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <View className="items-center">
                      <Text className={`text-xxs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Issue Date
                      </Text>
                      <Text className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                        {selectedCert.issueDate}
                      </Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-amber-700 italic font-bold text-xs font-serif">
                        EduVerse Reg.
                      </Text>
                      <Text className={`text-xxs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Verified Authority
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Blockchain Info */}
                <View className="mt-4 flex-row items-center gap-2">
                  <ShieldCheck size={16} color="#0d9488" />
                  <Text className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-455 text-slate-400' : 'text-slate-600'}`}>
                    Verification ID: {selectedCert.verificationId}
                  </Text>
                </View>

                {/* Action button inside Modal */}
                <TouchableOpacity
                  onPress={() => handleShare(selectedCert)}
                  className="w-full mt-6 bg-teal-500 hover:bg-teal-600 py-3.5 rounded-2xl flex-row items-center justify-center gap-2"
                >
                  <Share2 size={16} color="#fff" />
                  <Text className="text-white font-extrabold text-sm uppercase tracking-wider">Share Credentials</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
