import React, { useRef } from "react";
import { Animated, SafeAreaView, View, Text, Image } from "react-native";
import useTheme from "@/store/theme";
import ProfileHeader from "@/components/share/profile-header";
import ProfileScreenBody from "@/components/share/profile-screen-body";
import useUserStore from "@/store/user";

const ProfileScreen = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUserStore();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}
    >
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 100 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <View className="flex-row justify-between items-start px-5">
          <View className="flex-row gap-3">
            <Image
              className="rounded-full w-[65px] h-[65px]"
              source={user?.avatarUri || require("@/assets/images/humans/9334237.jpg")}
            />
            <View className="pt-2">
              <Text
                className={`text-title-xs ${isDarkMode ? "text-bg-light" : "text-bg-dark"}`}
              >
                {user?.name || user?.email || 'User'} 🧑‍💻
              </Text>
              <Text
                className={`text-body-small ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
              >
                Learn and become better!
              </Text>
            </View>
          </View>
          <View
            className={`px-3  items-start rounded-[12px] ${isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
          >
            <Text
              className={`${isDarkMode ? "text-bg-light" : "text-bg-dark"} text-label-small`}
            >
              {user?.level || "Not Tested"}
            </Text>
          </View>
        </View>
        <View className="px-5">
          <View
            className={`w-full h-[2px] mt-6 mb-4 ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
          />
        </View>
        <ProfileScreenBody isDarkMode={isDarkMode} />
      </Animated.ScrollView>
      <ProfileHeader scrollY={scrollY} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
