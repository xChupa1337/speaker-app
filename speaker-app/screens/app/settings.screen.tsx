import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable, Modal, Image, ImageSourcePropType } from "react-native";
import useTheme from "@/store/theme";
import SettingsHeaderComponent from "@/components/share/settings-header";
import SettingsList from "@/components/share/settings-list";
import { itemType } from "@/components/share/settings-list";
import Button from "@/components/ui/button";

import SwitcherButton from "@/components/share/switcher-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useUserStore from "@/store/user";

const defaultAvatars: ImageSourcePropType[] = [
  require("@/assets/images/humans/9334237.jpg"),
  require("@/assets/images/humans/9434619.jpg"),
  require("@/assets/images/humans/9434937.jpg"),
  require("@/assets/images/humans/9439678.jpg"),
  require("@/assets/images/humans/9439682.jpg"),
  require("@/assets/images/humans/9439775.jpg"),
  require("@/assets/images/humans/9440461.jpg"),
  require("@/assets/images/humans/9441909.jpg"),
  require("@/assets/images/humans/9442242.jpg"),
];

const countriesList = ["Ukraine", "Poland", "United States", "United Kingdom", "Germany", "France", "Canada"];

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, updateUser } = useUserStore();
  const [isSendNotification, setIsSendNotification] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<ImageSourcePropType>(defaultAvatars[0]);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const toggleSwitch = () =>
    setIsSendNotification((previousState) => !previousState);

  const accountItems: itemType[] = [
    { name: "User Name", value: user?.name || "User", type: "text" },
    {
      name: "Avatar",
      value: (
        <Pressable onPress={() => setShowAvatarModal(true)}>
          <Image
            className="rounded-full w-[30px] h-[30px]"
            source={user?.avatarUri || defaultAvatars[0]}
          />
        </Pressable>
      ),
      type: "component",
    },
    { name: "About Me", value: "Learn and become better", type: "text" },
    { name: "Email", value: user?.email || "N/A", type: "text" },
    { 
      name: "I speak", 
      value: (
        <Pressable onPress={() => setShowCountryModal(true)}>
          <Text className={`${isDarkMode ? 'text-bg-light' : 'text-bg-dark'} text-body-medium`}>
            {user?.country || "Ukraine"}
          </Text>
        </Pressable>
      ), 
      type: "component" 
    },
    { name: "Plan of education", value: "Free", type: "text" },
  ];

  const logOutHandler = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/auth/sign-in");
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}
    >
      <SettingsHeaderComponent />

      <View className="px-5">
        <View
          className={`w-full h-[2px] my-3 ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsList title="Account" items={accountItems} />
        <Button onPress={() => router.push('/level-test')}>Language level test</Button>


        <SettingsList
          title="General"
          items={[
            {
              name: "Notification",
              type: "component",
              value: (
                <SwitcherButton
                  isEnabled={isSendNotification}
                  toggleSwitch={toggleSwitch}
                />
              ),
            },
            {
              name: "Interface Language",
              type: "text",
              value: "English",
            },
            {
              name: "Dark Mode",
              type: "component",
              value: (
                <SwitcherButton
                  isEnabled={isDarkMode}
                  toggleSwitch={() =>
                    toggleTheme(isDarkMode ? "light" : "dark")
                  }
                />
              ),
            },
            { name: "Support", type: "text", value: "Contact us" },
          ]}
        />

        <Pressable
          onPress={logOutHandler}
          className="flex justify-start items-start my-2 px-5 pb-8"
        >
          <Text className={`text-red text-title-small`}>Log out</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={showAvatarModal} transparent animationType="slide">
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className={`p-5 rounded-t-[20px] ${isDarkMode ? 'bg-bg-dark' : 'bg-bg-light'}`}>
            <Text className={`text-title-small mb-4 text-center ${isDarkMode ? 'text-bg-light' : 'text-bg-dark'}`}>Select Avatar</Text>
            <View className="flex-row flex-wrap gap-4 justify-center">
              {defaultAvatars.map((src, index) => (
                <Pressable key={index} onPress={() => { updateUser({ avatarUri: src as any }); setShowAvatarModal(false); }}>
                  <Image source={src} className={`rounded-full w-[60px] h-[60px] ${user?.avatarUri === src ? 'border-2 border-primary' : ''}`} />
                </Pressable>
              ))}
            </View>
            <Button fullCustomClassName="mt-6 bg-primary py-3 rounded-[12px] items-center" onPress={() => setShowAvatarModal(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      <Modal visible={showCountryModal} transparent animationType="slide">
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className={`p-5 rounded-t-[20px] max-h-[60%] ${isDarkMode ? 'bg-bg-dark' : 'bg-bg-light'}`}>
            <Text className={`text-title-small mb-4 text-center ${isDarkMode ? 'text-bg-light' : 'text-bg-dark'}`}>Select Country</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {countriesList.map(country => (
                <Pressable key={country} className={`py-4 border-b ${isDarkMode ? 'border-surfaces-dark-1' : 'border-surfaces-light-1'}`} onPress={() => { updateUser({ country }); setShowCountryModal(false); }}>
                  <Text className={`text-body-large text-center ${user?.country === country ? 'text-primary font-bold' : (isDarkMode ? 'text-bg-light' : 'text-bg-dark')}`}>{country}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Button fullCustomClassName="mt-4 bg-primary py-3 rounded-[12px] items-center" onPress={() => setShowCountryModal(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
