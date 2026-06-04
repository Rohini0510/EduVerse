import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, XCircle } from "lucide-react-native";
import { useMemo, useState } from "react";
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
import { useCourseStore } from "../store/useCourseStore";

export default function VerifyScreen() {
  const { isDarkMode } = useAuthStore();
  const { certificates } = useCourseStore();
  const [verificationId, setVerificationId] = useState("");
  const [searched, setSearched] = useState(false);

  const matchedCertificate = useMemo(
    () =>
      certificates.find(
        (cert) =>
          cert.verificationId.toLowerCase() ===
          verificationId.trim().toLowerCase(),
      ),
    [certificates, verificationId],
  );

  const certificateStats = useQuery(["verifyCertificate"], async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return certificates;
  });

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <AppHeader
        title="Certificate Verification"
        showBackButton={false}
        showProfile={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        className={isDarkMode ? "bg-slate-950" : "bg-slate-50"}
      >
        <View
          className={`rounded-3xl p-5 mb-6 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <Text
            className={`text-base font-black mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}
          >
            Verify your certificate instantly.
          </Text>
          <Text
            className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Enter the verification ID printed on your EduVerse certificate to
            confirm authenticity.
          </Text>
          <TextInput
            value={verificationId}
            onChangeText={setVerificationId}
            placeholder="EV-8294-8201"
            placeholderTextColor={isDarkMode ? "#64748b" : "#94a3b8"}
            className={`mt-5 rounded-3xl border px-4 py-3 ${isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}
          />
          <TouchableOpacity
            onPress={() => setSearched(true)}
            className="mt-4 bg-primary-500 py-3 rounded-2xl items-center"
          >
            <Text className="text-white font-bold uppercase tracking-widest">
              Verify ID
            </Text>
          </TouchableOpacity>
        </View>

        {searched && (
          <View
            className={`rounded-3xl p-5 border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            {matchedCertificate ? (
              <>
                <View className="flex-row items-center gap-3 mb-4">
                  <CheckCircle2 size={22} color="#22c55e" />
                  <Text
                    className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    Certificate Verified
                  </Text>
                </View>
                <Text
                  className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"} mb-4`}
                >
                  This certificate is authentic and currently active in the
                  EduVerse records.
                </Text>
                <Text
                  className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  Course
                </Text>
                <Text
                  className={`text-sm mb-3 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                >
                  {matchedCertificate.courseName}
                </Text>
                <Text
                  className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  Recipient
                </Text>
                <Text
                  className={`text-sm mb-3 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                >
                  {matchedCertificate.recipientName}
                </Text>
                <Text
                  className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}
                >
                  Issued
                </Text>
                <Text
                  className={`text-sm mb-3 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                >
                  {matchedCertificate.issueDate}
                </Text>
                <View className="mt-4 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 items-center">
                  <Text
                    className={`text-xxs uppercase tracking-[0.3em] font-bold mb-3 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    QR Verification Code
                  </Text>
                  <View className="w-40 h-40 bg-slate-950 rounded-3xl p-3 flex-wrap flex-row justify-between">
                    {Array.from({ length: 25 }).map((_, index) => (
                      <View
                        key={index}
                        className={`w-8 h-8 mb-2 rounded-sm ${index % 3 === 0 ? "bg-white" : "bg-slate-700"}`}
                      />
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View className="flex-row items-center gap-3 mb-4">
                  <XCircle size={22} color="#ef4444" />
                  <Text
                    className={`text-base font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}
                  >
                    Not Found
                  </Text>
                </View>
                <Text
                  className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  We could not locate a certificate with that verification ID.
                  Please check the code and try again.
                </Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
