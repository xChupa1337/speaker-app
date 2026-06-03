import { Stack } from "expo-router";
import useTheme from "@/store/theme";
import AuthHeader from "@/components/share/auth-header";
import { SafeAreaView } from "react-native-safe-area-context";
const AuthLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-bg-dark" : "bg-bg-light"} `}
    >
      <AuthHeader />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="select-language"
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
