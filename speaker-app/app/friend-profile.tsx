import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useTheme from "@/store/theme";
import AppHeader from "@/components/share/app-header";
import { Ionicons } from "@expo/vector-icons";
import useSocialStore from "@/store/social";
import { dummyFriends, dummyNewUsers } from "@/constants/friends";

// Combined list for lookup (static data, used to find user details)
const allStaticUsers = [...dummyFriends, ...dummyNewUsers];

export default function FriendProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { friends, toggleLike, isLiked, getLikes, addFriend, removeFriend, loadSocial, loaded } = useSocialStore();

  useEffect(() => {
    if (!loaded) loadSocial();
  }, [loaded]);

  const user = allStaticUsers.find((u) => u.id === id);
  const isFriend = friends.some((f) => f.id === id);
  const liked = isLiked(id as string);
  const likesCount = getLikes(id as string);

  if (!user) {
    return (
      <View className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"} p-6`}>
        <AppHeader title="Profile Not Found" customBack={() => router.back()} />
        <Text className={`mt-10 text-center ${isDarkMode ? "text-white" : "text-black"}`}>
          User not found.
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}>
      <View className="px-6 pt-12">
        <AppHeader title={user.name} customBack={() => router.back()} />
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={user.avatar}
              className="w-32 h-32 rounded-full mb-4 border-4 border-main-color"
            />
            {user.isOnline && (
              <View className="absolute bottom-4 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
            )}
          </View>
          <Text className={`text-headline-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            {user.name}
          </Text>
          <Text className={`text-body-large mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {user.level}
          </Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-between px-4 mb-8">
          <View className="items-center">
            <Text className={`text-headline-xs font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              {user.progress}%
            </Text>
            <Text className={`text-body-small ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Progress
            </Text>
          </View>

          <TouchableOpacity onPress={() => toggleLike(id as string)} className="items-center">
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={32}
              color={liked ? "#ff4757" : isDarkMode ? "white" : "black"}
            />
            <Text className={`text-body-small mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              {likesCount} Likes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity className="flex-1 bg-main-color py-3 rounded-2xl mr-2 items-center flex-row justify-center">
            <Ionicons name="chatbubble" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isFriend) {
                removeFriend(id as string);
              } else {
                addFriend(id as string);
              }
            }}
            className={`flex-1 py-3 rounded-2xl ml-2 items-center flex-row justify-center border-2 ${
              isFriend
                ? "border-red-500"
                : isDarkMode
                ? "border-gray-700"
                : "border-gray-200"
            }`}
          >
            <Ionicons
              name={isFriend ? "person-remove" : "person-add"}
              size={20}
              color={isFriend ? "#ff4757" : isDarkMode ? "white" : "black"}
            />
            <Text
              className={`font-bold ml-2 ${
                isFriend ? "text-red-500" : isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {isFriend ? "Remove" : "Add Friend"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View className="mb-10">
          <Text className={`text-title-large font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            Recent Activity
          </Text>
          {user.activity && user.activity.length > 0 ? (
            user.activity.map((act, index) => (
              <View
                key={index}
                className={`p-4 mb-3 rounded-2xl flex-row items-center ${isDarkMode ? "bg-bg-dark-gray" : "bg-bg-light-gray"}`}
              >
                <View className="w-10 h-10 rounded-full bg-main-color/20 items-center justify-center mr-4">
                  <Ionicons name="checkmark-done" size={20} color="#2ed573" />
                </View>
                <Text className={`flex-1 text-body-medium ${isDarkMode ? "text-white" : "text-black"}`}>
                  {act}
                </Text>
              </View>
            ))
          ) : (
            <Text className={`text-body-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No recent activity.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
