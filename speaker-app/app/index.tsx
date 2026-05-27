import { Text, View } from "react-native";
import { Appearance, useColorScheme } from 'react-native';

export default function Index() {
  return (
    let colorScheme = useColorScheme();


    return (
    <View>
      <Text className='text-3xl font-bold'>Edit app/index.tsx to edit this screen.</Text>
      <Text  className='text-body-large color-neutral-950 font-bold'>Typography - SF Pro Text</Text>
    </View>
  );
}