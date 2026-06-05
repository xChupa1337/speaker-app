import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Language {
  id: string;
  name: string;
  code: string;
  flagUri?: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { id: "en", name: "English", code: "EN", flagUri: "https://flagcdn.com/w160/gb.png" },
  { id: "es", name: "Spanish", code: "ES", flagUri: "https://flagcdn.com/w160/es.png" },
  { id: "fr", name: "French", code: "FR", flagUri: "https://flagcdn.com/w160/fr.png" },
  { id: "de", name: "German", code: "DE", flagUri: "https://flagcdn.com/w160/de.png" },
  { id: "pl", name: "Polish", code: "PL", flagUri: "https://flagcdn.com/w160/pl.png" },
];

interface LearningLanguageState {
  currentLanguage: Language;
  loaded: boolean;
  setLanguage: (lang: Language) => void;
  loadLanguage: () => Promise<void>;
}

const useLearningLanguageStore = create<LearningLanguageState>((set) => ({
  currentLanguage: SUPPORTED_LANGUAGES[0], // default to English
  loaded: false,
  setLanguage: (lang: Language) => {
    AsyncStorage.setItem("learning_language", JSON.stringify(lang));
    set({ currentLanguage: lang });
  },
  loadLanguage: async () => {
    try {
      const stored = await AsyncStorage.getItem("learning_language");
      if (stored) {
        set({ currentLanguage: JSON.parse(stored), loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch (e) {
      set({ loaded: true });
    }
  },
}));

export default useLearningLanguageStore;
