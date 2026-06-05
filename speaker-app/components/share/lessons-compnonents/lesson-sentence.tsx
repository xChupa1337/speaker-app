import React, {useState} from 'react';
import {Pressable, Text, View} from "react-native";
import useTheme from "@/store/theme";
import {selectedAnswer} from "@/screens/app/lesson/lesson.screen";

const LessonSentence = ({text, questions, onPress}: {
    text: string,
    questions: selectedAnswer[],
    onPress: (question: string, correct: boolean) => void,
}) => {
    const {isDarkMode} = useTheme()
    const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
    const handlePress = (correct: boolean, question: string, index: number) => {
        onPress(question, correct)
        setSelectedAnswer(index)
    }
    return (
        <View className='gap-3 my-3'>
            <Text
                className={` ${isDarkMode ? 'text-bg-light' : 'text-bg-dark'} text-body-large`}>{text}</Text>
            <View className='flex-col gap-3 mt-4'>
                {questions.map((question, index) => (
                    <Pressable key={'question-' + index}
                               onPress={() => handlePress(question.correct, question.question, index)}
                               className={`w-full rounded-[16px] px-5 py-4 flex-row items-center justify-between border-2 ${
                                   selectedAnswer === index 
                                       ? 'bg-primary border-primary' 
                                       : isDarkMode 
                                           ? 'bg-surfaces-dark-2 border-border-dark' 
                                           : 'bg-surfaces-light-2 border-border-light'
                               }`}>
                        <Text
                            className={`${
                                selectedAnswer === index 
                                    ? 'text-white' 
                                    : isDarkMode 
                                        ? 'text-bg-light' 
                                        : 'text-bg-dark'
                            } text-title-medium`}>
                            {question.question}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default LessonSentence;