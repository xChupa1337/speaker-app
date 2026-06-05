import React, { useState, useRef } from "react";
import { View, Text, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useTheme from "@/store/theme";
import AppHeader from "@/components/share/app-header";
import { AIRobot } from "@/assets/images/onboarding/hello_img";
import { ArrowRightLight } from "@/assets/icons/icons";

type Message = {
  id: string;
  text: string;
  isAi: boolean;
};

export default function AiLessonScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I am your AI language tutor. What topic or grammar rule would you like to practice today?",
      isAi: true,
    }
  ]);

  const generateAiResponse = (userTopic: string) => {
    setIsLoading(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      let aiText = "";
      const topic = userTopic.toLowerCase();
      
      if (topic.includes("food") || topic.includes("restaurant") || topic.includes("order")) {
        aiText = "Great! Let's practice ordering food. \n\nRoleplay: You are at a restaurant and I am the waiter. \n\n'Hello, welcome to Bella Italia! Here is the menu. Are you ready to order?' \n\n(Try replying with what you'd like to eat!)";
      } else if (topic.includes("grammar") || topic.includes("perfect") || topic.includes("tense")) {
        aiText = "Awesome. Let's practice Present Perfect! \n\nWe use it to talk about past experiences without specifying when they happened. \n\nExample: 'I have visited France.' \n\nCan you make a sentence about a country you have visited?";
      } else if (topic.includes("travel") || topic.includes("hotel") || topic.includes("airport")) {
        aiText = "Perfect! Traveling is a great topic. \n\nImagine you are at the hotel reception. \n\n'Good evening! Do you have a reservation with us?' \n\n(How would you reply?)";
      } else {
        aiText = `That sounds interesting! Let's build a quick lesson around "${userTopic}". \n\nHere are 3 useful words for this topic:\n1. Essential\n2. Progress\n3. Practice\n\nTry writing a sentence using one of these words!`;
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), text: aiText, isAi: true }]);
      setIsLoading(false);
      
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
    }, 1500);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, isAi: false }]);
    setInputText("");
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    generateAiResponse(userMsg);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}>
      <View className="px-6 pt-6 mb-4">
        <AppHeader title="AI Tutor" customBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="items-center mb-6 mt-2">
            <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-3">
              <AIRobot isDarkMode={isDarkMode} />
            </View>
            <Text className={`text-title-small font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              AI Assistant
            </Text>
            <Text className={`text-body-small ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Always ready to help you learn
            </Text>
          </View>

          <View className="gap-4">
            {messages.map((msg) => (
              <View 
                key={msg.id} 
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.isAi 
                    ? `self-start rounded-tl-none ${isDarkMode ? 'bg-surfaces-dark-1' : 'bg-gray-200'}` 
                    : "self-end rounded-tr-none bg-primary"
                }`}
              >
                <Text className={`text-body-large ${
                  msg.isAi 
                    ? (isDarkMode ? "text-white" : "text-black") 
                    : "text-white"
                }`}>
                  {msg.text}
                </Text>
              </View>
            ))}
            
            {isLoading && (
              <View className={`max-w-[85%] self-start rounded-2xl rounded-tl-none p-4 ${isDarkMode ? 'bg-surfaces-dark-1' : 'bg-gray-200'}`}>
                <ActivityIndicator color="#FF8C00" />
              </View>
            )}
          </View>
        </ScrollView>

        <View className={`px-6 py-4 border-t ${isDarkMode ? "border-surfaces-dark-1 bg-bg-dark" : "border-gray-200 bg-bg-light"}`}>
          <View className={`flex-row items-center rounded-full px-4 py-2 ${isDarkMode ? "bg-surfaces-dark-1" : "bg-gray-100"}`}>
            <TextInput
              className={`flex-1 h-10 text-body-large ${isDarkMode ? "text-white" : "text-black"}`}
              placeholder="Type your topic or answer..."
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity 
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`w-10 h-10 rounded-full items-center justify-center ml-2 ${
                inputText.trim() && !isLoading ? "bg-primary" : "bg-gray-400"
              }`}
            >
              <ArrowRightLight />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
