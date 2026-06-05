import React, { useCallback, forwardRef } from "react";
import { View, Text, Pressable, Image } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { UKFlagRounded } from "@/assets/images/images";
import useLearningLanguageStore, { SUPPORTED_LANGUAGES, Language } from "@/store/learning-language";

interface LanguageSelectorBottomSheetProps {
  isDarkMode: boolean;
}

const LanguageSelectorBottomSheet = forwardRef<BottomSheet, LanguageSelectorBottomSheetProps>(
  ({ isDarkMode }, ref) => {
    const { currentLanguage, setLanguage } = useLearningLanguageStore();

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );

    const handleSelect = (lang: Language) => {
      setLanguage(lang);
      if (ref && "current" in ref) {
        ref.current?.close();
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["50%"]}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: isDarkMode ? "#1A1A1A" : "#FFFFFF",
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? "#333333" : "#E5E5E5",
        }}
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
          <Text className={`${isDarkMode ? "text-bg-light" : "text-bg-dark"} text-title-medium mb-5 text-center`}>
            Select Language
          </Text>
          
          <View className="gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage.id === lang.id;
              return (
                <Pressable
                  key={lang.id}
                  onPress={() => handleSelect(lang)}
                  className={`flex-row items-center p-4 rounded-xl border-2 ${
                    isSelected ? "border-primary bg-primary/10" : isDarkMode ? "border-surfaces-dark-1" : "border-surfaces-light-1"
                  }`}
                >
                  <View className="w-10 h-10 rounded-full overflow-hidden mr-4 bg-surfaces-light-2 items-center justify-center">
                    {lang.flagUri ? (
                      <Image source={{ uri: lang.flagUri }} className="w-full h-full" resizeMode="cover" />
                    ) : (
                      <Text className="font-bold">{lang.code}</Text>
                    )}
                  </View>
                  <Text className={`text-body-large flex-1 ${isDarkMode ? "text-bg-light" : "text-bg-dark"}`}>
                    {lang.name}
                  </Text>
                  {isSelected && (
                    <View className="w-4 h-4 rounded-full bg-primary" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

LanguageSelectorBottomSheet.displayName = "LanguageSelectorBottomSheet";

export default LanguageSelectorBottomSheet;
