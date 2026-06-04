import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import useScreenTimeStore from "../store/useScreenTimeStore";

export const ScreenTimeCard: React.FC = () => {
  const router = useRouter();
  const { todayMinutes } = useScreenTimeStore();

  const hours = Math.floor(todayMinutes / 60);
  const mins = todayMinutes % 60;

  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/learning-analytics")}
      className="rounded-3xl p-4 border"
      style={{ borderColor: "transparent" }}
    >
      <Text className="text-sm font-black mb-1">Screen Time Today</Text>
      <Text className="text-2xl font-extrabold">
        {hours}h {mins}m
      </Text>
      <Text className="text-xxs mt-1 text-slate-500">
        Keep the momentum — goal: 3h/day
      </Text>
    </TouchableOpacity>
  );
};

export default ScreenTimeCard;
