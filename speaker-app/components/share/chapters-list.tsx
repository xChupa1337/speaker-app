import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { API } from "@/services/api";
import { GetChaptersResponse } from "@/screens/app/book.screen";
import { Chapter as ChapterType } from "@/types/chapter.types";
import Chapter from "@/components/share/chapter";
import Error from "@/components/share/error";
import ChapterLoading from "@/components/share/chapter-loading";
import useLearningLanguageStore from "@/store/learning-language";
import useStarredChaptersStore from "@/store/starred-chapters";

const ChaptersList = ({ handleOpenSheet }: { handleOpenSheet: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const { currentLanguage } = useLearningLanguageStore();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchChapters = async () => {
        try {
          if (chapters.length === 0) setIsLoading(true);
          const token = await AsyncStorage.getItem("token");
          if (!token) router.replace("/auth/sign-in");
          const resp: GetChaptersResponse = await API.chapter.getChapters(token!, currentLanguage.id);
          if (isActive) {
            setChapters(resp.data);
            const total = resp.data.reduce((acc, chapter) => acc + (chapter.topics?.length || 0), 0);
            useStarredChaptersStore.getState().setTotalTopics(total);
          }
        } catch (e) {
          if (isActive) setIsError(true);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };
      fetchChapters();
      
      return () => { isActive = false; };
    }, [currentLanguage.id]) // Re-fetch when language changes
  );

  if (isLoading) return <ChapterLoading />;

  if (isError) return <Error />;
  return (
    <>
      {chapters.length > 0 &&
        chapters.map((chapter) => {
          // Remove text in brackets like "[A1 Beginner] "
          const cleanTitle = chapter.title ? chapter.title.replace(/\[.*?\]\s*/, '') : '';
          return (
            <Chapter
              key={chapter.title + chapter.order}
              chapterTitle={`Chapter - ${chapter.order}`}
              chapterName={cleanTitle}
              onCardPress={handleOpenSheet}
              topics={chapter.topics}
            />
          );
        })}
    </>
  );
};

export default ChaptersList;
