import React from "react";
import { Text, View } from "react-native";
import useTheme from "@/store/theme";
import useUserStore from "@/store/user";

const UserProgress = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUserStore();
  
  const completedCount = user?.progress?.length || 0;
  // Let's assume each completed item adds 5% for now until real total is available
  const progress = Math.min(completedCount * 5, 100);

  return (
    <View className="relative w-full h-4">
      <View
        className={`${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"} absolute w-full h-4 rounded-[12px]`}
      />

      <View
        style={{ width: `${progress}%` }}
        className="absolute bg-primary h-4 rounded-[12px]"
      />

      <View
        style={{ left: `${Math.max(progress - 8, 0)}%`, top: "-25%" }}
        className="bg-primary absolute h-6 w-auto px-2 rounded-[12px] justify-center items-center"
      >
        <Text className="text-bg-light">{progress}%</Text>
      </View>
    </View>
  );
};

export default UserProgress;
