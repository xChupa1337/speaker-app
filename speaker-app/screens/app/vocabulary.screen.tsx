import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useTheme from "@/store/theme";
import { getVocabularyData } from "../../constants/vocab";
import OnBoardingTitle from "@/components/share/on-boarding-title";
import AppHeader from "@/components/share/app-header";
import useAnkiStore, { SavedWord } from "@/store/anki";
import useLearningLanguageStore from "@/store/learning-language";

// ─── Anki Stats Cards ─────────────────────────────
const AnkiStatCard = ({
  title,
  count,
  bgColor,
}: {
  title: string;
  count: number;
  bgColor: string;
}) => (
  <View
    className={`flex-1 h-[80px] rounded-[16px] ${bgColor} items-center justify-center mx-1`}
  >
    <Text className="text-bg-light text-headline-small font-bold">{count}</Text>
    <Text className="text-bg-light text-label-medium mt-1">{title}</Text>
  </View>
);

// ─── Word Card (expanded view inside topic) ───────
const WordCard = ({
  word,
  onToggleSave,
  isSaved,
}: {
  word: any;
  onToggleSave: () => void;
  isSaved: boolean;
}) => {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setIsExpanded(!isExpanded)}
      className={`rounded-[12px] p-4 ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center gap-2">
            <Text
              className={`text-body-large font-bold ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
            >
              {word.word}
            </Text>
            <Text className="text-primary text-body-medium">
              {word.transcription}
            </Text>
          </View>
          <Text
            className={`text-body-medium mt-1 ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
          >
            {word.translation}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleSave();
            }}
            className={`w-9 h-9 rounded-full items-center justify-center ${
              isSaved
                ? "bg-primary"
                : isDarkMode
                  ? "bg-surfaces-dark-2"
                  : "bg-surfaces-light-2"
            }`}
          >
            <Text style={{ fontSize: 16 }}>{isSaved ? "★" : "☆"}</Text>
          </Pressable>
          <Text className="text-primary text-body-large">
            {isExpanded ? "−" : "+"}
          </Text>
        </View>
      </View>

      {isExpanded && (
        <View className="mt-3 gap-2">
          <Text
            className={`text-label-medium font-bold ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
          >
            Examples:
          </Text>
          {(word.examples || [word.example]).map(
            (ex: string, idx: number) => (
              <View key={idx} className="flex-row">
                <Text
                  className={`text-body-medium ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
                >
                  {idx + 1}.{" "}
                </Text>
                <Text
                  className={`text-body-medium flex-1 italic ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
                >
                  "{ex}"
                </Text>
              </View>
            )
          )}
        </View>
      )}
    </Pressable>
  );
};

// ─── Topic Card ────────────────────────────────────
const TopicCard = ({ item }: { item: any }) => {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const { addWord, removeWord, isWordSaved } = useAnkiStore();

  const handleToggleSave = (word: any) => {
    if (isWordSaved(word.id)) {
      removeWord(word.id);
    } else {
      addWord({
        id: word.id,
        word: word.word,
        translation: word.translation,
        transcription: word.transcription,
        examples: word.examples || [word.example],
      });
    }
  };

  return (
    <Pressable
      onPress={() => setIsExpanded(!isExpanded)}
      className={`mb-3 rounded-[16px] overflow-hidden ${isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
    >
      <View className="flex-row justify-between items-center p-4">
        <View className="flex-row items-center gap-3">
          <View
            className={`w-10 h-10 rounded-[12px] items-center justify-center ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
          >
            <Text style={{ fontSize: 20 }}>{item.emoji || "📖"}</Text>
          </View>
          <View>
            <Text
              className={`text-body-large font-bold ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
            >
              {item.title}
            </Text>
            <Text
              className={`text-body-small ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
            >
              {item.words.length} words
            </Text>
          </View>
        </View>
        <Text className="text-primary text-headline-small">
          {isExpanded ? "−" : "+"}
        </Text>
      </View>

      {isExpanded && (
        <View className="px-4 pb-4 gap-3">
          {item.words.map((word: any) => (
            <WordCard
              key={word.id}
              word={word}
              isSaved={isWordSaved(word.id)}
              onToggleSave={() => handleToggleSave(word)}
            />
          ))}
        </View>
      )}
    </Pressable>
  );
};

// ─── Saved Word Card (in Anki deck) ───────────────
const SavedWordCard = ({ word }: { word: SavedWord }) => {
  const { isDarkMode } = useTheme();
  const { updateStatus, removeWord } = useAnkiStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors: Record<string, string> = {
    new: "bg-red",
    learning: "bg-primary",
    known: "bg-green",
  };

  const statusLabels: Record<string, string> = {
    new: "New",
    learning: "Learning",
    known: "Known",
  };

  return (
    <Pressable
      onPress={() => setIsExpanded(!isExpanded)}
      className={`rounded-[12px] p-4 mb-2 ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text
              className={`text-body-large font-bold ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
            >
              {word.word}
            </Text>
            <View className={`px-2 py-0.5 rounded-full ${statusColors[word.status]}`}>
              <Text className="text-bg-light" style={{ fontSize: 10 }}>
                {statusLabels[word.status]}
              </Text>
            </View>
          </View>
          <Text
            className={`text-body-medium ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
          >
            {word.translation}
          </Text>
        </View>
        <Pressable
          onPress={() => removeWord(word.id)}
          className={`w-8 h-8 rounded-full items-center justify-center ${isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
        >
          <Text style={{ fontSize: 14 }}>✕</Text>
        </Pressable>
      </View>

      {isExpanded && (
        <View className="mt-3">
          <Text className="text-primary text-body-medium mb-2">
            {word.transcription}
          </Text>
          {word.examples.map((ex, idx) => (
            <Text
              key={idx}
              className={`text-body-medium mb-1 italic ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
            >
              {idx + 1}. "{ex}"
            </Text>
          ))}

          <View className="flex-row gap-2 mt-3">
            <Pressable
              onPress={() => updateStatus(word.id, "new")}
              className={`flex-1 py-2 rounded-[8px] items-center ${word.status === "new" ? "bg-red" : isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
            >
              <Text
                className={`text-label-medium ${word.status === "new" ? "text-bg-light" : isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
              >
                New
              </Text>
            </Pressable>
            <Pressable
              onPress={() => updateStatus(word.id, "learning")}
              className={`flex-1 py-2 rounded-[8px] items-center ${word.status === "learning" ? "bg-primary" : isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
            >
              <Text
                className={`text-label-medium ${word.status === "learning" ? "text-bg-light" : isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
              >
                Learning
              </Text>
            </Pressable>
            <Pressable
              onPress={() => updateStatus(word.id, "known")}
              className={`flex-1 py-2 rounded-[8px] items-center ${word.status === "known" ? "bg-green" : isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
            >
              <Text
                className={`text-label-medium ${word.status === "known" ? "text-bg-light" : isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
              >
                Known
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
};

// ─── Main Screen ──────────────────────────────────
const VocabularyScreen = () => {
  const { isDarkMode } = useTheme();
  const { currentLanguage } = useLearningLanguageStore();
  const { getCurrentLangWords, loadWords } = useAnkiStore();
  const [activeTab, setActiveTab] = useState<"topics" | "saved">("topics");

  useEffect(() => {
    loadWords();
  }, []);
  
  const savedWords = getCurrentLangWords();

  const newCount = savedWords.filter((w) => w.status === "new").length;
  const learningCount = savedWords.filter((w) => w.status === "learning").length;
  const knownCount = savedWords.filter((w) => w.status === "known").length;

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}
    >
      <View className="px-5 flex-1">
        <AppHeader title="Vocabulary" />

        {/* Anki Stats */}
        <View className="flex-row mb-4">
          <AnkiStatCard
            title="New"
            count={newCount}
            bgColor="bg-red"
          />
          <AnkiStatCard
            title="Learning"
            count={learningCount}
            bgColor="bg-primary"
          />
          <AnkiStatCard
            title="Known"
            count={knownCount}
            bgColor="bg-green"
          />
        </View>

        {/* Saved Words Count */}
        <Pressable
          onPress={() => setActiveTab(activeTab === "saved" ? "topics" : "saved")}
          className={`flex-row justify-between items-center p-4 rounded-[12px] mb-4 ${isDarkMode ? "bg-surfaces-dark-2" : "bg-surfaces-light-2"}`}
        >
          <View className="flex-row items-center gap-3">
            <View
              className={`w-10 h-10 rounded-[12px] items-center justify-center border-2 border-primary ${isDarkMode ? "bg-surfaces-dark-1" : "bg-surfaces-light-1"}`}
            >
              <Text style={{ fontSize: 18 }}>📝</Text>
            </View>
            <Text
              className={`text-body-large ${isDarkMode ? "text-body-primary-dark" : "text-body-primary-light"}`}
            >
              My Anki Deck
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-primary text-body-large font-bold">
              {savedWords.length}
            </Text>
            <Text className="text-primary text-body-large">
              {activeTab === "saved" ? "▲" : "▼"}
            </Text>
          </View>
        </Pressable>

        {activeTab === "saved" && savedWords.length > 0 && (
          <View className="mb-4">
            <ScrollView
              style={{ maxHeight: 300 }}
              showsVerticalScrollIndicator={false}
            >
              {savedWords.map((word) => (
                <SavedWordCard key={word.id} word={word} />
              ))}
            </ScrollView>
          </View>
        )}

        {activeTab === "saved" && savedWords.length === 0 && (
          <View className="mb-4 items-center py-6">
            <Text style={{ fontSize: 40 }}>📚</Text>
            <Text
              className={`text-body-large mt-2 ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
            >
              No saved words yet
            </Text>
            <Text
              className={`text-body-medium ${isDarkMode ? "text-body-secondary-dark" : "text-body-secondary-light"}`}
            >
              Tap ☆ on any word to add it here
            </Text>
          </View>
        )}

        <OnBoardingTitle>Dictionary by Topics</OnBoardingTitle>
        <FlatList
          data={getVocabularyData(currentLanguage.id)}
          renderItem={({ item }) => <TopicCard item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default VocabularyScreen;
