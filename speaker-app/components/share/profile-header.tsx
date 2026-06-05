import React from "react";
import { Animated, Pressable, View } from "react-native";
import OnBoardingTitle from "@/components/share/on-boarding-title";
import { AddFriendIcon, SettingsIcon } from "@/assets/icons/icons";
import { router } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const THRESHOLD = 200;

const ProfileHeader = ({
  scrollY,
  isDarkMode,
}: {
  scrollY: any;
  isDarkMode: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const iconsOpacity = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const titleLeftOpacity = iconsOpacity;
  const titleCenterOpacity = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const handleSettingsPress = () => {
    router.push("/(tabs)/profile/settings");
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className={`absolute top-0 left-0 right-0 h-[100px] px-[24px] items-center justify-center ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: 24,
          opacity: titleLeftOpacity,
        }}
      >
        <OnBoardingTitle>Profile</OnBoardingTitle>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          alignItems: "center",
          opacity: titleCenterOpacity,
        }}
      >
        <OnBoardingTitle>Profile</OnBoardingTitle>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          right: 24,
          flexDirection: "row",
          alignItems: "center",
          opacity: iconsOpacity,
        }}
      >
        <View className="gap-7 flex-row">
          <Pressable onPress={() => router.push("/(tabs)/chat")}>
            <AddFriendIcon isDark={isDarkMode} />
          </Pressable>
          <Pressable onPress={handleSettingsPress}>
            <SettingsIcon isDark={isDarkMode} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default ProfileHeader;
