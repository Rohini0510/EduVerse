import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useGoalsStore from "../store/useGoalsStore";
import { GoalCard } from "./GoalCard";

export const GoalsDashboard: React.FC = () => {
  const { goals, toggleComplete, completionRate } = useGoalsStore();

  return (
    <View className="px-4">
      <View className="rounded-3xl p-4 border mb-4">
        <Text className="text-base font-black mb-2">Daily Goals</Text>
        <Text className="text-xxs text-slate-500">
          Completion: {completionRate()}%
        </Text>
      </View>

      {goals.map((g) => (
        <GoalCard key={g.id} goal={g} onToggle={() => toggleComplete(g.id)} />
      ))}

      <TouchableOpacity className="mt-3 rounded-2xl bg-primary-500 p-3 items-center">
        <Text className="text-white font-bold">Add Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalsDashboard;
