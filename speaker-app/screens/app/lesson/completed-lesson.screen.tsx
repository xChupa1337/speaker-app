import React, { useMemo, useRef } from 'react';
import { Text, View } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import useTheme from "@/store/theme";

const MOTIVATIONAL_MESSAGES = [
  "В тебе все вийде! 🌟",
  "Так тримати! 🚀",
  "Чудова робота! 🎉",
  "Ще один крок до мети! 💪",
  "Ти молодець! Продовжуй так само! 🔥",
  "Бездоганно! 🏆"
];

const FAIL_MESSAGES = [
  "Не здавайся! 🌟",
  "Спробуй ще раз! 💪",
  "Наступного разу вийде краще! 🚀",
  "Помилки - це частина навчання! 📚",
];

interface CompletedLessonScreenProps {
  isSuccess: boolean;
}

const CompletedLessonScreen: React.FC<CompletedLessonScreenProps> = ({ isSuccess }) => {
  const { isDarkMode } = useTheme();

  const videoRef = useRef<Video>(null);

  const randomMessage = useMemo(() => {
    const messages = isSuccess ? MOTIVATIONAL_MESSAGES : FAIL_MESSAGES;
    return messages[Math.floor(Math.random() * messages.length)];
  }, [isSuccess]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      videoRef.current?.setPositionAsync(3000);
      videoRef.current?.playAsync();
    }
  };

  return (
    <View className="flex-1 items-center mt-5">
      
      <Text className="text-center text-3xl font-bold text-primary mb-5">
        {isSuccess ? "Урок завершено!" : "Урок не пройдено"}
      </Text>
      
      <Text className={`${isDarkMode ? "text-bg-light" : "text-bg-dark"} text-center text-title-large mb-8 px-4`}>
        {randomMessage}
      </Text>

      <View className="w-full h-64 rounded-[20px] overflow-hidden bg-black/5">
        <Video
          ref={videoRef}
          source={isSuccess ? require("@/assets/images/complete.mp4") : require("@/assets/images/sad.mp4")}
          style={{ width: '100%', height: '100%' }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isMuted={true}
          positionMillis={3000}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </View>
    </View>
  );
};

export default CompletedLessonScreen;