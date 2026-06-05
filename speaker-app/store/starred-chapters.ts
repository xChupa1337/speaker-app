import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLearningLanguageStore from './learning-language';

type StarredChaptersStore = {
  starredIds: Record<string, string[]>;
  loaded: boolean;
  totalTopics: number;
  setTotalTopics: (total: number) => void;
  loadStarred: () => Promise<void>;
  toggleStar: (id: string) => void;
  isStarred: (id: string) => boolean;
  getCurrentLangStarredCount: () => number;
};

const STORAGE_KEY = 'starred_chapters_v3';

const useStarredChaptersStore = create<StarredChaptersStore>((set, get) => ({
  starredIds: {},
  loaded: false,
  totalTopics: 0,

  setTotalTopics: (total: number) => {
    set({ totalTopics: total });
  },

  loadStarred: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        set({ starredIds: JSON.parse(raw), loaded: true });
      } else {
        set({ loaded: true });
      }
    } catch (e) {
      console.error('Failed to load starred chapters:', e);
      set({ loaded: true });
    }
  },

  toggleStar: (id: string) => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const currentAll = get().starredIds;
    const currentLangIds = currentAll[lang] || [];
    
    let updatedLangIds;
    if (currentLangIds.includes(id)) {
      updatedLangIds = currentLangIds.filter(cid => cid !== id);
    } else {
      updatedLangIds = [...currentLangIds, id];
    }
    
    const updatedAll = { ...currentAll, [lang]: updatedLangIds };
    
    set({ starredIds: updatedAll });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAll)).catch(console.error);
  },

  isStarred: (id: string) => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const currentLangIds = get().starredIds[lang] || [];
    return currentLangIds.includes(id);
  },
  
  getCurrentLangStarredCount: () => {
    const lang = useLearningLanguageStore.getState().currentLanguage.id;
    const currentLangIds = get().starredIds[lang] || [];
    return currentLangIds.length;
  }
}));

export default useStarredChaptersStore;
