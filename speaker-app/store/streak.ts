import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StreakStore = {
  streakCount: number;
  lastStudyDate: string | null;
  loaded: boolean;
  loadStreak: () => Promise<void>;
  recordStudyDay: () => void;
};

const STORAGE_KEY_STREAK = 'user_streak_count';
const STORAGE_KEY_LAST_STUDY = 'user_last_study_date';

const useStreakStore = create<StreakStore>((set, get) => ({
  streakCount: 0,
  lastStudyDate: null,
  loaded: false,

  loadStreak: async () => {
    try {
      const [streakRaw, lastDateRaw] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_STREAK),
        AsyncStorage.getItem(STORAGE_KEY_LAST_STUDY),
      ]);

      let streak = streakRaw ? parseInt(streakRaw, 10) : 0;
      let lastDate = lastDateRaw;

      // Check if streak is broken (difference > 1 day)
      if (lastDate) {
        const lastStudy = new Date(lastDate);
        const today = new Date();
        
        // Normalize to midnight for accurate day difference
        lastStudy.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today.getTime() - lastStudy.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          streak = 0; // Streak broken
          AsyncStorage.setItem(STORAGE_KEY_STREAK, '0');
        }
      }

      set({ streakCount: streak, lastStudyDate: lastDate, loaded: true });
    } catch (e) {
      console.error('Failed to load streak:', e);
      set({ loaded: true });
    }
  },

  recordStudyDay: () => {
    const { lastStudyDate, streakCount } = get();
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (lastStudyDate !== todayStr) {
      const newStreak = streakCount + 1;
      set({ streakCount: newStreak, lastStudyDate: todayStr });
      AsyncStorage.setItem(STORAGE_KEY_STREAK, newStreak.toString());
      AsyncStorage.setItem(STORAGE_KEY_LAST_STUDY, todayStr);
    }
  },
}));

export default useStreakStore;
