import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Goal } from "../store/useGoalsStore";

export const GoalCard: React.FC<{ goal: Goal; onToggle?: () => void }> = ({
  goal,
  onToggle,
}) => {
  return (
    <View className="rounded-2xl p-3 border mb-3 flex-row items-center justify-between">
      <View>
        <Text className="text-sm font-bold">{goal.title}</Text>
        <Text className="text-xxs text-slate-500">
          {goal.completed ? "Completed" : `${goal.progress}%`}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onToggle}
        className="rounded-full bg-primary-500 p-2"
      >
        <Text className="text-white font-bold">
          {goal.completed ? "Undo" : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalCard;
