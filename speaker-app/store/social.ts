import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Friend, dummyFriends, dummyNewUsers } from '@/constants/friends';

type SocialStore = {
  friends: Friend[];
  newUsers: Friend[];
  likedProfiles: string[]; // IDs of liked profiles
  loaded: boolean;

  loadSocial: () => Promise<void>;
  addFriend: (id: string) => void;
  removeFriend: (id: string) => void;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  getLikes: (id: string) => number;
};

const STORAGE_KEY_FRIENDS = 'social_friends';
const STORAGE_KEY_NEW_USERS = 'social_new_users';
const STORAGE_KEY_LIKES = 'social_likes';

const persist = (friends: Friend[], newUsers: Friend[], likedProfiles: string[]) => {
  // We store only IDs to avoid serializing ImageSourcePropType
  const friendIds = friends.map(f => f.id);
  const newUserIds = newUsers.map(u => u.id);
  AsyncStorage.setItem(STORAGE_KEY_FRIENDS, JSON.stringify(friendIds));
  AsyncStorage.setItem(STORAGE_KEY_NEW_USERS, JSON.stringify(newUserIds));
  AsyncStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likedProfiles));
};

// All possible users combined
const allUsers = [...dummyFriends, ...dummyNewUsers];

const useSocialStore = create<SocialStore>((set, get) => ({
  friends: [...dummyFriends],
  newUsers: [...dummyNewUsers],
  likedProfiles: [],
  loaded: false,

  loadSocial: async () => {
    try {
      const [friendIdsRaw, newUserIdsRaw, likesRaw] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_FRIENDS),
        AsyncStorage.getItem(STORAGE_KEY_NEW_USERS),
        AsyncStorage.getItem(STORAGE_KEY_LIKES),
      ]);

      if (friendIdsRaw && newUserIdsRaw) {
        const friendIds: string[] = JSON.parse(friendIdsRaw);
        const newUserIds: string[] = JSON.parse(newUserIdsRaw);
        
        const friends = friendIds.map(id => allUsers.find(u => u.id === id)).filter(Boolean) as Friend[];
        const newUsers = newUserIds.map(id => allUsers.find(u => u.id === id)).filter(Boolean) as Friend[];

        set({ friends, newUsers });
      }

      if (likesRaw) {
        set({ likedProfiles: JSON.parse(likesRaw) });
      }

      set({ loaded: true });
    } catch (e) {
      console.error('Failed to load social data:', e);
      set({ loaded: true });
    }
  },

  addFriend: (id: string) => {
    const { friends, newUsers, likedProfiles } = get();
    const user = newUsers.find(u => u.id === id);
    if (!user) return;

    const updatedFriends = [...friends, user];
    const updatedNewUsers = newUsers.filter(u => u.id !== id);

    set({ friends: updatedFriends, newUsers: updatedNewUsers });
    persist(updatedFriends, updatedNewUsers, likedProfiles);
  },

  removeFriend: (id: string) => {
    const { friends, newUsers, likedProfiles } = get();
    const user = friends.find(u => u.id === id);
    if (!user) return;

    const updatedFriends = friends.filter(u => u.id !== id);
    const updatedNewUsers = [...newUsers, user];

    set({ friends: updatedFriends, newUsers: updatedNewUsers });
    persist(updatedFriends, updatedNewUsers, likedProfiles);
  },

  toggleLike: (id: string) => {
    const { likedProfiles, friends, newUsers } = get();
    let updated: string[];
    if (likedProfiles.includes(id)) {
      updated = likedProfiles.filter(lid => lid !== id);
    } else {
      updated = [...likedProfiles, id];
    }
    set({ likedProfiles: updated });
    persist(friends, newUsers, updated);
  },

  isLiked: (id: string) => {
    return get().likedProfiles.includes(id);
  },

  getLikes: (id: string) => {
    const user = allUsers.find(u => u.id === id);
    const baseLikes = user?.likes || 0;
    const isLiked = get().likedProfiles.includes(id);
    return baseLikes + (isLiked ? 1 : 0);
  },
}));

export default useSocialStore;
