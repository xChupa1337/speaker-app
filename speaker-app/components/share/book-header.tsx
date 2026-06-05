import React, { useEffect } from "react";
import { Text, View, Alert, Pressable, Image } from "react-native";
import { UKFlagRounded } from "@/assets/images/images";
import { BellIcon, FireIcon, StarIcon } from "@/assets/icons/icons";
import useTheme from "@/store/theme";
import useStreakStore from "@/store/streak";
import useStarredChaptersStore from "@/store/starred-chapters";

import useLearningLanguageStore from "@/store/learning-language";

const BookHeader = ({ onFlagPress }: { onFlagPress?: () => void }) => {
  const { isDarkMode } = useTheme();
  const { streakCount, loadStreak, loaded: streakLoaded } = useStreakStore();
  const { getCurrentLangStarredCount, totalTopics, loadStarred, loaded: starredLoaded } = useStarredChaptersStore();
  const { currentLanguage, loadLanguage, loaded: languageLoaded } = useLearningLanguageStore();

  useEffect(() => {
    if (!streakLoaded) loadStreak();
    if (!starredLoaded) loadStarred();
    if (!languageLoaded) loadLanguage();
  }, [streakLoaded, starredLoaded, languageLoaded]);

  return (
    <View className="flex-row justify-between items-center mr-3">
      <Pressable onPress={onFlagPress} className="rounded-full overflow-hidden w-[50px] h-[50px] bg-surfaces-light-2 items-center justify-center">
        {currentLanguage?.flagUri ? (
          <Image source={{ uri: currentLanguage.flagUri }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <Text className="font-bold">{currentLanguage?.code || "EN"}</Text>
        )}
      </Pressable>
      <View className="flex-row gap-5 w-auto items-center">
        <View className="flex-row gap-2 items-center">
          <FireIcon isDark={isDarkMode} />
          <Text
            className={`${isDarkMode ? "text-bg-light" : "text-bg-dark"} text-[19px]`}
          >
            {streakCount}
          </Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <StarIcon isDark={isDarkMode} />
          <Text
            className={`${isDarkMode ? "text-bg-light" : "text-bg-dark"} text-[19px]`}
          >
            {getCurrentLangStarredCount()} / {totalTopics || 0}
          </Text>
        </View>
        <Pressable onPress={() => {
            // In a real app this would toggle local push notifications for daily reminders
            Alert.alert(
              "Daily Reminders", 
              "Reminders are active! We'll notify you to keep your streak burning and let you know if you miss a day."
            );
        }}>
          <BellIcon isDark={isDarkMode} />
        </Pressable>
      </View>
    </View>
  );
};

export default BookHeader;
