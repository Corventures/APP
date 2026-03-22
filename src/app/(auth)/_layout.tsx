import { Stack } from "expo-router";
import { colors } from "@/constants/color";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" options={{ animation: "slide_from_right" }} />
      <Stack.Screen
        name="forgot-password"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
