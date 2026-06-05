import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { LockIcon, StarIcon } from "@/assets/icons/icons";
import useCurrentChapterItem from "@/store/selected-chapter";
import useStarredChaptersStore from "@/store/starred-chapters";

const ChapterTestCard = ({
  id,
  title,
  description,
  isLock,
  onPress,
}: {
  id?: string;
  title: string;
  description: string;
  isLock?: boolean;
  onPress?: () => void;
}) => {
  const { setChapterItem } = useCurrentChapterItem();
  const { isStarred, toggleStar } = useStarredChaptersStore();
  const chapterId = id || title; // fallback to title if no id

  const handlePress = () => {
    setChapterItem({
      title: title,
      description: description,
      id: chapterId,
      progress: 0,
      isLock: isLock ?? false,
      imgUri: "https://media.istockphoto.com/id/939566616/photo/wooden-table-with-empty-paper-top-view.jpg?s=612x612&w=0&k=20&c=9fcXhqijV2bzhcA1q9FprWU0s88qLOSeMx_c2OmfE-Q=",
    });
    if (onPress) onPress();
  };

  const handleStarPress = (e: any) => {
    e.stopPropagation(); // prevent triggering handlePress
    toggleStar(chapterId);
  };

  const starred = isStarred(chapterId);

  return (
    <Pressable
      onPress={handlePress}
      className={`w-full flex-row rounded-[12px] justify-between items-center p-2 bg-primary`}
    >
      <View className="flex-row gap-2 ">
        <View
          className={`z-10 h-[90px] w-[90px] justify-center items-center border-4 border-bg-light rounded-full`}
        >
          {isLock && (
            <>
              <View className="absolute z-20">
                <LockIcon isDark={true} />
              </View>
              <View className="absolute bg-primary w-16 h-16 rounded-full z-10 opacity-50" />
            </>
          )}

          <Image
            source={{
              uri: "https://media.istockphoto.com/id/939566616/photo/wooden-table-with-empty-paper-top-view.jpg?s=612x612&w=0&k=20&c=9fcXhqijV2bzhcA1q9FprWU0s88qLOSeMx_c2OmfE-Q=",
            }}
            className="w-16 h-16 rounded-full"
          />
        </View>
        <View className="w-auto max-w-56">
          <Text className={`mt-3 text-body-large text-body-primary-dark`}>
            {title}
          </Text>
          <Text
            className={`mt-3 text-body-small font-normal text-body-primary-dark`}
          >
            {description}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleStarPress}
        className={`mr-2 w-12 h-12 border-2 border-bg-light rounded-[12px] items-center justify-center ${starred ? 'bg-bg-light' : ''}`}
      >
        <StarIcon isDark={!starred} />
      </Pressable>
    </Pressable>
  );
};

export default ChapterTestCard;
