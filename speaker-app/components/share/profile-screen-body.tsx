import React, { useState } from "react";
import { Text, View } from "react-native";
import OnBoardingTitle from "@/components/share/on-boarding-title";
import UserProgressCircle from "@/components/share/user-progress-circle";
import TabChatItem from "@/components/share/tab-chat-item";
import UserStreak from "@/components/share/user-streak";
import UserRating from "@/components/share/user-rating";
import Button from "@/components/ui/button";
import useUserStore from "@/store/user";
import { UserProgressType } from "../../constants";
import useSocialStore from "@/store/social";
import useAnkiStore from "@/store/anki";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { API } from "@/services/api";
import useLearningLanguageStore from "@/store/learning-language";

const TOTAL_WORDS = 750;

const ProfileScreenBody = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { user } = useUserStore();
  const { friends } = useSocialStore();
  const { getCurrentLangWords } = useAnkiStore();
  const [currentChildPage, setCurrentChildPage] = useState<
    "progress" | "exercises" | "social"
  >("progress");

  const completedCount = user?.progress?.length || 0;
  
  const savedWords = getCurrentLangWords();
  const knownWordsCount = savedWords.filter(w => w.status === 'known').length;
  const learningWordsCount = savedWords.filter(w => w.status === 'learning').length;
  
  const progressPercentage = Math.round((knownWordsCount / TOTAL_WORDS) * 100) || 0;

  const progressData: Record<string, UserProgressType> = {
    progress: {
      fill: progressPercentage,
      fistBlock: `${knownWordsCount} words learned`,
      secondBlock: `${learningWordsCount} learning`,
      bottomText: "Language Knowledge",
    },
    exercises: {
      fill: Math.min(completedCount * 5, 100),
      fistBlock: `${completedCount} completed exercises`,
      secondBlock: "0 learning",
      bottomText: "Completed exercises",
    },
    social: {
      fill: Math.min(friends.length * 10, 100),
      fistBlock: `${friends.length} friends`,
      secondBlock: `${useSocialStore.getState().likedProfiles.length} likes given`,
      bottomText: "Community network",
    }
  };

  const userProgress = progressData[currentChildPage];

  const [isRandomLoading, setIsRandomLoading] = useState(false);
  const handleRandomLesson = async () => {
    setIsRandomLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      const lang = useLearningLanguageStore.getState().currentLanguage.id;
      const resp = await API.chapter.getChapters(token, lang);
      
      const allTopics: string[] = [];
      resp.data.forEach((chapter: any) => {
        chapter.topics?.forEach((topic: any) => {
          allTopics.push(topic._id);
        });
      });
      
      if (allTopics.length > 0) {
        const randomTopicId = allTopics[Math.floor(Math.random() * allTopics.length)];
        router.push({
          pathname: "/lesson/lesson",
          params: { id: randomTopicId }
        });
      }
    } catch (error) {
      console.error("Failed to get random lesson:", error);
    } finally {
      setIsRandomLoading(false);
    }
  };

  return (
    <>
      <View className="flex-row justify-between mb-3 items-center px-5">
        <OnBoardingTitle classname="mt-0">Friends</OnBoardingTitle>
        <Text className={`mt-3 text-body-large text-primary`}>{friends.length}</Text>
      </View>

      <Button className="py-1" onPress={handleRandomLesson}>
        {isRandomLoading ? "Loading..." : "Random lesson"}
      </Button>

      <View
        className={`h-auto border-b-2 mt-6 mb-1 px-5 ${isDarkMode ? "border-border-dark" : "border-border-light"} flex-row`}
      >
        <TabChatItem
          className="h-auto"
          isActive={currentChildPage === "progress"}
          title="Progress"
          onPress={() => {
            setCurrentChildPage("progress");
          }}
        />
        <TabChatItem
          className="h-12"
          isActive={currentChildPage === "exercises"}
          title="Exercises"
          onPress={() => {
            setCurrentChildPage("exercises");
          }}
        />
        <TabChatItem
          className="h-12"
          isActive={currentChildPage === "social"}
          title="Social"
          onPress={() => {
            setCurrentChildPage("social");
          }}
        />
      </View>
      <UserProgressCircle
        fill={userProgress.fill}
        fistBlock={userProgress.fistBlock}
        bottomText={userProgress.bottomText}
        secondBlock={userProgress.secondBlock}
        isDarkMode={isDarkMode}
      />
      <View className="px-5">
        <View
          className={`w-full h-[2px] my-6 ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
        />
        <UserStreak isDarkMode={isDarkMode} />
        <UserRating isDarkMode={isDarkMode} />
      </View>
    </>
  );
};

export default ProfileScreenBody;
