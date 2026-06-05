import {create} from 'zustand';
import { User } from '@/types/user.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type userStore = {
    isLogged: boolean;
    user: User | null;
    seIsLogged: (value:boolean) => void;
    setUser: (user: User | null) => void;
    updateUser: (partialUser: Partial<User>) => void;
}

const LOCAL_USER_PREFS_KEY = 'local_user_prefs';

const useUserStore = create<userStore>((set, get) => ({
    isLogged: false,
    user: null,
    seIsLogged: (value) => {set({isLogged: value});},
    setUser: async (user) => {
        if (user) {
            try {
                // Restore local preferences (like avatarUri and country)
                const localPrefsRaw = await AsyncStorage.getItem(LOCAL_USER_PREFS_KEY);
                if (localPrefsRaw) {
                    const localPrefs = JSON.parse(localPrefsRaw);
                    user = { ...user, ...localPrefs };
                }
            } catch (e) {
                console.error("Failed to load local user prefs", e);
            }
        }
        set({user});
    },
    updateUser: (partialUser) => {
        set((state) => {
            if (!state.user) return { user: null };
            const updatedUser = { ...state.user, ...partialUser };
            
            // Save local preferences to AsyncStorage
            const localPrefs = {
                avatarUri: updatedUser.avatarUri,
                country: updatedUser.country,
                level: updatedUser.level,
            };
            AsyncStorage.setItem(LOCAL_USER_PREFS_KEY, JSON.stringify(localPrefs)).catch(console.error);

            return { user: updatedUser };
        });
    },
}))

export default useUserStore