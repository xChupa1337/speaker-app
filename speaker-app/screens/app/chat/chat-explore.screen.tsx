import React, { useEffect } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  Text,
} from "react-native";
import useTheme from "@/store/theme";
import useSocialStore from "@/store/social";
import FriendCard from "@/components/share/friend-card";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const ChatExploreScreen: React.FC<Props> = ({ onScroll }) => {
  const { isDarkMode } = useTheme();
  const { newUsers, addFriend, loadSocial, loaded } = useSocialStore();

  useEffect(() => {
    if (!loaded) loadSocial();
  }, [loaded]);

  return (
    <View className="flex-1 pt-6">
      <View className="flex-row items-center mb-6">
        <Ionicons 
          name="people" 
          size={24} 
          color={isDarkMode ? "white" : "black"} 
        />
        <Text
          className={`text-headline-xs ml-2 ${
            isDarkMode ? "text-bg-light" : "text-bg-dark"
          }`}
        >
          Discover Users ({newUsers.length})
        </Text>
      </View>

      <FlatList
        data={newUsers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <FriendCard 
            friend={item} 
            onPressAction={() => addFriend(item.id)} 
            actionIcon="person-add"
          />
        )}
        ListHeaderComponent={
          newUsers.length > 0 ? (
            <Text
              className={`text-body-medium mb-4 ${
                isDarkMode ? "text-text-gray" : "text-gray-500"
              }`}
            >
              People who are learning English and might be interested in practicing together:
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <View className="mt-10 items-center px-6">
            <Ionicons
              name="checkmark-circle-outline"
              size={64}
              color={isDarkMode ? "#555" : "#ccc"}
            />
            <Text
              className={`text-body-large mt-4 ${
                isDarkMode ? "text-text-gray" : "text-gray-500"
              } text-center`}
            >
              You've added everyone! Check your Friends list.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default ChatExploreScreen;
