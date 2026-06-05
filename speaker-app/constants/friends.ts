import { ImageSourcePropType } from "react-native";

// Local avatar images from assets/images/humans
const avatarImages = [
  require("@/assets/images/humans/9334237.jpg"),
  require("@/assets/images/humans/9434619.jpg"),
  require("@/assets/images/humans/9434937.jpg"),
  require("@/assets/images/humans/9439678.jpg"),
  require("@/assets/images/humans/9439682.jpg"),
  require("@/assets/images/humans/9439775.jpg"),
  require("@/assets/images/humans/9440461.jpg"),
  require("@/assets/images/humans/9441909.jpg"),
  require("@/assets/images/humans/9442242.jpg"),
];

export type Friend = {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  level: string;
  progress: number; // 0 to 100
  isOnline: boolean;
  likes: number;
  activity: string[];
};

export const dummyFriends: Friend[] = [
  {
    id: "f1",
    name: "Alex Johnson",
    avatar: avatarImages[0],
    level: "C1 Advanced",
    progress: 85,
    isOnline: true,
    likes: 120,
    activity: ["Completed a lesson on Phrasal Verbs", "Aced the Grammar quiz", "Reached a 5-day streak"],
  },
  {
    id: "f2",
    name: "Mia Roberts",
    avatar: avatarImages[1],
    level: "B2 Upper-Int",
    progress: 40,
    isOnline: false,
    likes: 85,
    activity: ["Practiced listening", "Added 20 new words to vocabulary"],
  },
  {
    id: "f3",
    name: "Ryan Smith",
    avatar: avatarImages[2],
    level: "B1 Intermediate",
    progress: 60,
    isOnline: true,
    likes: 42,
    activity: ["Started a new chapter: Travel", "Finished a speaking exercise"],
  },
  {
    id: "f4",
    name: "Emma Davis",
    avatar: avatarImages[3],
    level: "A2 Pre-Int",
    progress: 90,
    isOnline: false,
    likes: 230,
    activity: ["Reviewed old vocabulary", "Completed daily goals"],
  },
  {
    id: "f5",
    name: "Noah Wilson",
    avatar: avatarImages[4],
    level: "C2 Mastery",
    progress: 100,
    isOnline: true,
    likes: 510,
    activity: ["Helped 5 people in chat", "Finished the entire Advanced course", "Earned the Polyglot badge"],
  },
];

export const dummyNewUsers: Friend[] = [
  {
    id: "nu1",
    name: "Tom Hardy",
    avatar: avatarImages[5],
    level: "B2 Upper-Int",
    progress: 55,
    isOnline: true,
    likes: 12,
    activity: ["Just joined the app!", "Completed the placement test"],
  },
  {
    id: "nu2",
    name: "Sophia Martinez",
    avatar: avatarImages[6],
    level: "A1 Beginner",
    progress: 20,
    isOnline: false,
    likes: 5,
    activity: ["Started learning English", "Completed Alphabet lesson"],
  },
  {
    id: "nu3",
    name: "Chris Evans",
    avatar: avatarImages[7],
    level: "C1 Advanced",
    progress: 95,
    isOnline: true,
    likes: 340,
    activity: ["Practicing for IELTS", "Scored 95% on Reading comprehension"],
  },
  {
    id: "nu4",
    name: "Olivia Taylor",
    avatar: avatarImages[8],
    level: "B1 Intermediate",
    progress: 70,
    isOnline: true,
    likes: 88,
    activity: ["Looking for a speaking partner", "Completed chapter 5"],
  },
];

// Export avatar images for use in avatar picker
export { avatarImages };
