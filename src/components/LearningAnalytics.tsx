import React from "react";
import { Text, View } from "react-native";
import useScreenTimeStore from "../store/useScreenTimeStore";

export const LearningAnalytics: React.FC = () => {
  const { todayMinutes, weekMinutes, monthMinutes } = useScreenTimeStore();

  const fmt = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <View className="px-4">
      <View className="rounded-3xl p-4 border mb-4">
        <Text className="text-base font-black mb-2">Today's Learning</Text>
        <Text className="text-lg font-extrabold">{fmt(todayMinutes)}</Text>
      </View>

      <View className="rounded-3xl p-4 border mb-4">
        <Text className="text-sm font-black mb-2">Weekly</Text>
        <Text className="text-lg font-extrabold">{fmt(weekMinutes)}</Text>
      </View>

      <View className="rounded-3xl p-4 border">
        <Text className="text-sm font-black mb-2">Monthly</Text>
        <Text className="text-lg font-extrabold">{fmt(monthMinutes)}</Text>
      </View>
    </View>
  );
};

export default LearningAnalytics;
