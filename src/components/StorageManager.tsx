import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useDownloadsStore from "../store/useDownloadsStore";

export const StorageManager: React.FC = () => {
  const { getTotalStorageUsed, clearDownloads } = useDownloadsStore();
  const used = getTotalStorageUsed();
  const quota = 2048; // MB, example
  const remaining = Math.max(0, quota - used);

  return (
    <View className="rounded-3xl p-4 border mb-4">
      <Text className="text-sm font-black mb-2">Storage</Text>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-extrabold">{used} MB</Text>
          <Text className="text-xxs text-slate-500">used of {quota} MB</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-bold">{remaining} MB free</Text>
          <TouchableOpacity
            onPress={clearDownloads}
            className="mt-2 rounded-2xl bg-red-500 px-3 py-2"
          >
            <Text className="text-white font-bold">Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StorageManager;
