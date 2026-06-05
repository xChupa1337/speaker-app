import React, { useMemo, useRef } from "react";
import useTheme from "@/store/theme";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import BookHeader from "@/components/share/book-header";
import OnBoardingTitle from "@/components/share/on-boarding-title";
import UserProgress from "@/components/share/user-progress";
import { MarkIcon } from "@/assets/icons/icons";
import { Chapter } from "@/types/chapter.types";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChapterCardBottomSheet from "@/components/share/chapter-card-bottom-sheet";
import useCurrentChapterItem from "@/store/selected-chapter";
import ShimmerButton from "@/components/share/shimmer-button";
import AiMessageBottomSheet from "@/components/share/ai-message-bottom-sheet";
import LanguageSelectorBottomSheet from "@/components/share/language-bottom-sheet";
import ChaptersList from "@/components/share/chapters-list";

export interface GetChaptersResponse {
  success: boolean;
  data: Chapter[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

const BookScreen = () => {
  const { isDarkMode } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const aiBottomSheetRef = useRef<BottomSheet>(null);
  const languageBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const { title, progress, isLock, description, imgUri, id } =
    useCurrentChapterItem();
  const handleOpenSheet = () => {
    if (title !== undefined && id !== undefined) {
      bottomSheetRef.current?.expand();
    }
  };

  const handleOpenAISheet = () => {
    aiBottomSheetRef.current?.expand();
  };

  const handleOpenLanguageSheet = () => {
    languageBottomSheetRef.current?.expand();
  };
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"} `}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="px-5 mt-5" keyboardShouldPersistTaps="handled">
          <BookHeader onFlagPress={handleOpenLanguageSheet} />
          <View className="my-5 flex-row justify-between items-center">
            <OnBoardingTitle>Chapters</OnBoardingTitle>
          </View>
          <UserProgress />

          <View className="mt-8 gap-3">
            <ShimmerButton
              isDarkTheme={isDarkMode}
              title="Learn English with AI"
              onPress={handleOpenAISheet}
            />
          </View>
          <ChaptersList handleOpenSheet={handleOpenSheet} />
        </ScrollView>

        <ChapterCardBottomSheet
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          isDarkMode={isDarkMode}
          title={title}
          id={id}
          description={description}
          imgUri={imgUri}
          isLock={isLock}
          progress={progress}
        />

        <AiMessageBottomSheet
          bottomSheetRef={aiBottomSheetRef}
          snapPoints={snapPoints}
          isDarkMode={isDarkMode}
        />

        <LanguageSelectorBottomSheet
          ref={languageBottomSheetRef}
          isDarkMode={isDarkMode}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default BookScreen;
