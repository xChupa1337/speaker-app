import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useTheme from "@/store/theme";
import { Friend } from "@/constants/friends";
import { Ionicons } from "@expo/vector-icons";

type FriendCardProps = {
  friend: Friend;
  onPressAction: () => void;
  actionIcon?: keyof typeof Ionicons.glyphMap;
};

const FriendCard: React.FC<FriendCardProps> = ({ friend, onPressAction, actionIcon = "chatbubble-ellipses" }) => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <View
      className={`p-4 mb-4 rounded-3xl flex-row items-center justify-between ${
        isDarkMode ? "bg-bg-dark-gray" : "bg-bg-light-gray"
      }`}
    >
      <TouchableOpacity 
        className="flex-row items-center flex-1"
        onPress={() => router.push(`/friend-profile?id=${friend.id}`)}
      >
        <View className="relative">
          <Image
            source={friend.avatar}
            className="w-14 h-14 rounded-full"
          />
          {friend.isOnline && (
            <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          )}
        </View>

        <View className="ml-4 flex-1 pr-2">
          <Text
            className={`text-title-medium ${
              isDarkMode ? "text-bg-light" : "text-bg-dark"
            } font-semibold`}
            numberOfLines={1}
          >
            {friend.name}
          </Text>
          <Text
            className={`text-body-small mt-1 ${
              isDarkMode ? "text-text-gray" : "text-gray-500"
            }`}
          >
            Level: {friend.level}
          </Text>

          {/* Progress Bar */}
          <View className="w-full h-1.5 bg-gray-300 rounded-full mt-2 overflow-hidden">
            <View
              className="h-full bg-main-color rounded-full"
              style={{ width: `${friend.progress}%` }}
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressAction}
        className="bg-main-color p-3 rounded-full"
      >
        <Ionicons name={actionIcon} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FriendCard;
