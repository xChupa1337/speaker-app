import React, { useEffect } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import useTheme from "@/store/theme";
import useSocialStore from "@/store/social";
import FriendCard from "@/components/share/friend-card";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const ChatFriendScreen: React.FC<Props> = ({ onScroll }) => {
  const { isDarkMode } = useTheme();
  const { friends, removeFriend, loadSocial, loaded } = useSocialStore();

  useEffect(() => {
    if (!loaded) loadSocial();
  }, [loaded]);

  const handleRemoveFriend = (id: string, name: string) => {
    Alert.alert(
      "Remove Friend",
      `Are you sure you want to remove ${name} from friends?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFriend(id),
        },
      ]
    );
  };

  return (
    <View className="flex-1 pt-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text
          className={`text-headline-xs ${
            isDarkMode ? "text-bg-light" : "text-bg-dark"
          }`}
        >
          My Friends ({friends.length})
        </Text>
      </View>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <FriendCard
            friend={item}
            onPressAction={() => handleRemoveFriend(item.id, item.name)}
            actionIcon="person-remove"
          />
        )}
        ListEmptyComponent={
          <View className="mt-10 items-center px-6">
            <Ionicons
              name="people-outline"
              size={64}
              color={isDarkMode ? "#555" : "#ccc"}
            />
            <Text
              className={`text-body-large mt-4 ${
                isDarkMode ? "text-text-gray" : "text-gray-500"
              } text-center`}
            >
              You don't have any friends yet.{"\n"}Go to "New Users" to add some!
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default ChatFriendScreen;
