import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useTheme from "@/store/theme";
import AppHeader from "@/components/share/app-header";
import Button from "@/components/ui/button";
import useUserStore from "@/store/user";
import useLearningLanguageStore from "@/store/learning-language";

const getTestQuestions = (lang: string) => {
  if (lang === "es") return [
    { question: "¿Cuál es la frase correcta?", options: ["Yo soy un estudiante.", "Yo es un estudiante.", "Yo eres un estudiante."], answer: 0, level: "A1" },
    { question: "Ella normalmente ___ al trabajo en coche.", options: ["va", "ir", "vas"], answer: 0, level: "A2" },
    { question: "Yo ___ una gran película ayer.", options: ["veo", "vi", "visto"], answer: 1, level: "A2" },
    { question: "Si yo ___ tú, estudiaría más.", options: ["soy", "fuera", "fui"], answer: 1, level: "B1" },
    { question: "Cuando llegamos, la película ___.", options: ["ya había empezado", "ya ha empezado", "ya empezó"], answer: 0, level: "B2" },
    { question: "Ojalá ___ más tiempo para leer.", options: ["tengo", "tuviera", "tendré"], answer: 1, level: "B2" },
    { question: "Apenas ___ de la casa cuando empezó a llover.", options: ["había salido", "salí", "he salido"], answer: 0, level: "C1" }
  ];
  if (lang === "fr") return [
    { question: "Quelle phrase est correcte?", options: ["Je suis un étudiant.", "Je es un étudiant.", "Je est un étudiant."], answer: 0, level: "A1" },
    { question: "Elle ___ généralement au travail en voiture.", options: ["va", "aller", "vas"], answer: 0, level: "A2" },
    { question: "J'___ un super film hier.", options: ["ai vu", "vois", "verrai"], answer: 0, level: "A2" },
    { question: "Si j'___ à ta place, j'étudierais plus.", options: ["suis", "étais", "serai"], answer: 1, level: "B1" },
    { question: "Quand nous sommes arrivés, le film ___.", options: ["avait déjà commencé", "a déjà commencé", "commence déjà"], answer: 0, level: "B2" },
    { question: "Je souhaite que j'___ plus de temps pour lire.", options: ["aie", "avais", "aurai"], answer: 0, level: "B2" },
    { question: "À peine ___ de la maison qu'il a commencé à pleuvoir.", options: ["étais-je parti", "suis-je parti", "je partais"], answer: 0, level: "C1" }
  ];
  if (lang === "de") return [
    { question: "Welcher Satz ist richtig?", options: ["Ich bin ein Student.", "Ich ist ein Student.", "Ich bist ein Student."], answer: 0, level: "A1" },
    { question: "Sie ___ normalerweise mit dem Auto zur Arbeit.", options: ["fährt", "fahren", "fährst"], answer: 0, level: "A2" },
    { question: "Ich ___ gestern einen tollen Film gesehen.", options: ["habe", "bin", "hatte"], answer: 0, level: "A2" },
    { question: "Wenn ich du ___, würde ich mehr lernen.", options: ["wäre", "bin", "war"], answer: 0, level: "B1" },
    { question: "Als wir ankamen, ___ der Film schon angefangen.", options: ["hatte", "hat", "wird"], answer: 0, level: "B2" },
    { question: "Ich wünschte, ich ___ mehr Zeit zum Lesen.", options: ["hätte", "habe", "werde haben"], answer: 0, level: "B2" },
    { question: "Kaum ___ ich das Haus verlassen, fing es an zu regnen.", options: ["hatte", "habe", "würde"], answer: 0, level: "C1" }
  ];
  if (lang === "pl") return [
    { question: "Które zdanie jest poprawne?", options: ["Jestem studentem.", "Jest studentem.", "Jesteś studentem."], answer: 0, level: "A1" },
    { question: "Ona zazwyczaj ___ do pracy samochodem.", options: ["jeździ", "jechać", "jeździsz"], answer: 0, level: "A2" },
    { question: "Wczoraj ___ świetny film.", options: ["widziałem", "widzę", "zobaczę"], answer: 0, level: "A2" },
    { question: "Gdybym ___ tobą, uczyłbym się więcej.", options: ["był", "jestem", "będę"], answer: 0, level: "B1" },
    { question: "Zanim przyjechaliśmy, film ___.", options: ["już się zaczął", "już się zaczyna", "zacznie się"], answer: 0, level: "B2" },
    { question: "Chciałbym ___ więcej czasu na czytanie.", options: ["mieć", "mam", "będę miał"], answer: 0, level: "B2" },
    { question: "Zaledwie ___ z domu, zaczęło padać.", options: ["wyszedłem", "wychodzę", "wyjdę"], answer: 0, level: "C1" }
  ];
  
  // Default EN
  return [
    { question: "Which sentence is correct?", options: ["I am a student.", "I is a student.", "I are a student."], answer: 0, level: "A1" },
    { question: "She usually ___ to work by car.", options: ["go", "going", "goes"], answer: 2, level: "A2" },
    { question: "I ___ a great movie yesterday.", options: ["see", "saw", "seen"], answer: 1, level: "A2" },
    { question: "If I ___ you, I would study more.", options: ["am", "were", "was"], answer: 1, level: "B1" },
    { question: "By the time we arrived, the movie ___.", options: ["had already started", "has already started", "already started"], answer: 0, level: "B2" },
    { question: "I wish I ___ more time to read.", options: ["have", "had", "will have"], answer: 1, level: "B2" },
    { question: "Scarcely ___ the house when it started to rain.", options: ["I had left", "did I leave", "had I left"], answer: 2, level: "C1" }
  ];
};

export default function LevelTestScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { updateUser } = useUserStore();
  const params = useLocalSearchParams();
  const isFromAuth = params.fromAuth === "true";
  
  const { currentLanguage } = useLearningLanguageStore();
  const testQuestions = useMemo(() => getTestQuestions(currentLanguage.id), [currentLanguage.id]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = testQuestions[currentQuestionIndex];

  const handleNext = () => {
    const isCorrect = selectedOption === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
    }

    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      finishTest(newScore);
    }
  };

  const finishTest = (finalScore: number) => {
    let finalLevel = "A1 Beginner";
    if (finalScore === 2 || finalScore === 3) finalLevel = "A2 Pre-Intermediate";
    if (finalScore === 4 || finalScore === 5) finalLevel = "B1 Intermediate";
    if (finalScore === 6) finalLevel = "B2 Upper-Intermediate";
    if (finalScore === 7) finalLevel = "C1 Advanced";

    updateUser({ level: finalLevel });
    setIsFinished(true);
  };

  const handleFinish = () => {
    if (isFromAuth) {
      router.push("/auth/select-daily-time");
    } else {
      router.back();
    }
  };

  if (isFinished) {
    return (
      <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}>
        <View className="px-6 pt-6">
          <AppHeader title="Test Results" />
        </View>
        <View className="flex-1 justify-center items-center px-6">
          <Text className={`text-headline-sm font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            Congratulations!
          </Text>
          <Text className={`text-body-large text-center mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Based on your answers, your estimated level is:
          </Text>
          <View className="bg-primary px-8 py-6 rounded-3xl mb-10">
            <Text className="text-white text-headline-sm font-bold text-center">
              {useUserStore.getState().user?.level}
            </Text>
          </View>
          <Button fullCustomClassName="bg-primary w-full py-4 rounded-2xl items-center" onPress={handleFinish}>
            Continue
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"}`}>
      <View className="px-6 pt-6 mb-6">
        <AppHeader title="Language Level Test" />
        <View className="mt-6 flex-row items-center justify-between">
          <Text className={`text-body-medium font-bold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Question {currentQuestionIndex + 1} of {testQuestions.length}
          </Text>
          <Text className={`text-body-medium font-bold text-primary`}>
            Difficulty: {currentQuestion.level}
          </Text>
        </View>
        <View className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
          <View 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / testQuestions.length) * 100}%` }} 
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className={`text-title-large font-bold mb-8 ${isDarkMode ? "text-white" : "text-black"}`}>
          {currentQuestion.question}
        </Text>

        <View className="gap-4 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOption(index)}
                className={`w-full p-5 rounded-2xl border-2 flex-row justify-between items-center ${
                  isSelected 
                    ? "border-primary bg-primary/10" 
                    : isDarkMode 
                      ? "border-surfaces-dark-1 bg-surfaces-dark-1" 
                      : "border-surfaces-light-1 bg-surfaces-light-1"
                }`}
              >
                <Text className={`text-body-large ${
                  isSelected ? "text-primary font-bold" : isDarkMode ? "text-white" : "text-black"
                }`}>
                  {option}
                </Text>
                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  isSelected ? "border-primary" : "border-gray-400"
                }`}>
                  {isSelected && <View className="w-3 h-3 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View className="px-6 pb-8 pt-4">
        <Button 
          fullCustomClassName={`w-full py-4 rounded-2xl items-center ${selectedOption === null ? "bg-gray-400" : "bg-primary"}`}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex === testQuestions.length - 1 ? "Finish Test" : "Next Question"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
