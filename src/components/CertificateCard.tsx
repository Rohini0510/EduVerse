import { useRouter } from "expo-router";
import { Award, Download, Share2, ShieldCheck } from "lucide-react-native";
import React from "react";
import { Alert, Share, Text, TouchableOpacity, View } from "react-native";
import { Certificate } from "../services/mockData";
import { useAuthStore } from "../store/useAuthStore";

interface CertificateCardProps {
  certificate: Certificate;
  onPreview?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onPreview,
}) => {
  const { isDarkMode } = useAuthStore();

  const handleDownload = () => {
    Alert.alert(
      "Download Certificate",
      `Your certificate for "${certificate.courseName}" has been saved to your downloads offline!`,
      [{ text: "OK" }],
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just earned a verified certificate for completing the course "${certificate.courseName}" on EduVerse! Verification ID: ${certificate.verificationId}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const handleVerify = () => {
    router.push(
      `/verify?verificationId=${encodeURIComponent(certificate.verificationId)}`,
    );
  };

  return (
    <View
      className={`p-5 rounded-3xl border mb-4 ${
        isDarkMode
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-100"
      } shadow-sm`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3">
          <View className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40">
            <Award size={24} color="#0d9488" />
          </View>
          <View className="flex-1 pr-4">
            <Text
              className={`text-base font-extrabold mb-1 leading-tight ${isDarkMode ? "text-white" : "text-slate-950"}`}
            >
              {certificate.courseName}
            </Text>
            <Text
              className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Issued on {certificate.issueDate}
            </Text>
          </View>
        </View>
      </View>

      <View
        className={`my-4 p-3 rounded-2xl flex-row items-center justify-between ${
          isDarkMode ? "bg-slate-850" : "bg-slate-50"
        }`}
      >
        <View className="flex-row items-center gap-2">
          <ShieldCheck size={16} color="#0ea5e9" />
          <Text
            className={`text-xs font-mono font-medium ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            ID: {certificate.verificationId}
          </Text>
        </View>
        <TouchableOpacity onPress={handleVerify}>
          <Text className="text-primary-500 text-xs font-bold uppercase tracking-wider">
            Verify
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
        <TouchableOpacity
          onPress={onPreview}
          className="flex-1 bg-primary-500 hover:bg-primary-600 py-2.5 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-xs uppercase tracking-wider">
            Preview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDownload}
          className={`p-2.5 rounded-xl border ${
            isDarkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <Download size={18} color={isDarkMode ? "#cbd5e1" : "#475569"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleShare}
          className={`p-2.5 rounded-xl border ${
            isDarkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <Share2 size={18} color={isDarkMode ? "#cbd5e1" : "#475569"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
