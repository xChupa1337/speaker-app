import React, { useRef } from "react";
import { Pressable, View, Text, Animated } from "react-native";
import InstagramStories, {
  InstagramStoriesProps,
  InstagramStoriesPublicMethods,
} from "@birdwingo/react-native-instagram-stories";

const InstaStories = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const ref = useRef<InstagramStoriesPublicMethods>(null);

  const stories: InstagramStoriesProps["stories"] = [
    {
      id: "news1",
      name: "Language News",
      avatarSource: { uri: "https://picsum.photos/seed/news_avatar/200/200" },
      stories: [
        {
          id: "news_story1",
          source: { uri: "https://picsum.photos/seed/news1/800/1200" },
          renderContent: () => (
            <Animated.View style={{ position: 'absolute', bottom: 64, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.6)', padding: 16, borderRadius: 16 }}>
              <Animated.Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>📰 Word of the Year</Animated.Text>
              <Animated.Text style={{ color: 'white', fontSize: 16 }}>Oxford University Press recently announced that 'Rizz' (meaning style or charm) is the word of the year. Are you using it yet?</Animated.Text>
            </Animated.View>
          ),
        },
        {
          id: "news_story2",
          source: { uri: "https://picsum.photos/seed/news2/800/1200" },
          renderContent: () => (
            <Animated.View style={{ position: 'absolute', bottom: 64, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.6)', padding: 16, borderRadius: 16 }}>
              <Animated.Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>🌍 English in Tech</Animated.Text>
              <Animated.Text style={{ color: 'white', fontSize: 16 }}>Over 60% of all content on the internet is in English. Mastering it gives you access to the world's biggest digital library!</Animated.Text>
            </Animated.View>
          ),
        },
      ],
    },
    {
      id: "tips1",
      name: "English Tips",
      avatarSource: { uri: "https://picsum.photos/seed/tips_avatar/200/200" },
      stories: [
        {
          id: "tip_story1",
          source: { uri: "https://picsum.photos/seed/tips1/800/1200" },
          renderContent: () => (
            <Animated.View style={{ position: 'absolute', bottom: 64, left: 20, right: 20, backgroundColor: 'rgba(0,122,255,0.8)', padding: 16, borderRadius: 16 }}>
              <Animated.Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>💡 Word of the Day</Animated.Text>
              <Animated.Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Serendipity</Animated.Text>
              <Animated.Text style={{ color: 'white', fontSize: 14, marginTop: 4 }}>Finding something good without looking for it.</Animated.Text>
            </Animated.View>
          ),
        },
        {
          id: "tip_story2",
          source: { uri: "https://picsum.photos/seed/tips2/800/1200" },
          renderContent: () => (
            <Animated.View style={{ position: 'absolute', bottom: 64, left: 20, right: 20, backgroundColor: 'rgba(0,122,255,0.8)', padding: 16, borderRadius: 16 }}>
              <Animated.Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>🇬🇧 Grammar Tip</Animated.Text>
              <Animated.Text style={{ color: 'white', fontSize: 16 }}>Use "Its" for possession and "It's" for "It is". This is a very common mistake even for native speakers!</Animated.Text>
            </Animated.View>
          ),
        },
      ],
    },
  ];

  const setStories = () => ref.current?.setStories(stories);

  return (
    <View>
      <InstagramStories
        ref={ref}
        stories={stories}
        avatarListContainerStyle={{
          gap: 10,
        }}
        showName={false}
        avatarBorderColors={["#007AFF"]}
      />
      <Pressable className="justify-center " onPress={setStories}></Pressable>
    </View>
  );
};

export default InstaStories;
