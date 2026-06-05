import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SavedWord = {
  id: string;
  word: string;
  translation: string;
  transcription: string;
  examples: string[];
  status: 'new' | 'learning' | 'known';
  addedAt: number;
};

import useLearningLanguageStore from './learning-language';
import useStreakStore from './streak';

type AnkiStore = {
  savedWords: Record<string, SavedWord[]>;
  addWord: (word: Omit<SavedWord, 'status' | 'addedAt'>) => void;
  removeWord: (id: string) => void;
  updateStatus: (id: string, status: SavedWord['status']) => void;
  isWordSaved: (id: string) => boolean;
  loadWords: () => Promise<void>;
  getCurrentLangWords: () => SavedWord[];
};

const STORAGE_KEY = 'anki_saved_words_v2';

const useAnkiStore = create<AnkiStore>((set, get) => ({
  savedWords: {},

  getCurrentLangWords: () => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    return get().savedWords[lang] || [];
  },

  addWord: (word) => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const newWord: SavedWord = {
      ...word,
      status: 'new',
      addedAt: Date.now(),
    };
    
    const currentAll = get().savedWords;
    const currentLangWords = currentAll[lang] || [];
    const updatedLangWords = [...currentLangWords, newWord];
    
    const updatedAll = { ...currentAll, [lang]: updatedLangWords };
    
    set({ savedWords: updatedAll });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAll));
    useStreakStore.getState().recordStudyDay();
  },

  removeWord: (id) => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const currentAll = get().savedWords;
    const currentLangWords = currentAll[lang] || [];
    const updatedLangWords = currentLangWords.filter((w) => w.id !== id);
    
    const updatedAll = { ...currentAll, [lang]: updatedLangWords };
    
    set({ savedWords: updatedAll });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAll));
  },

  updateStatus: (id, status) => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const currentAll = get().savedWords;
    const currentLangWords = currentAll[lang] || [];
    
    const updatedLangWords = currentLangWords.map((w) =>
      w.id === id ? { ...w, status } : w
    );
    
    const updatedAll = { ...currentAll, [lang]: updatedLangWords };
    
    set({ savedWords: updatedAll });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAll));
    useStreakStore.getState().recordStudyDay();
  },

  isWordSaved: (id) => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const currentLangWords = get().savedWords[lang] || [];
    return currentLangWords.some((w) => w.id === id);
  },

  loadWords: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        set({ savedWords: JSON.parse(data) });
      }
    } catch (e) {
      console.error('Failed to load saved words:', e);
    }
  },
}));

export default useAnkiStore;
