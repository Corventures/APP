import { Stack } from "expo-router";
import { colors } from "@/styles/color";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen
        name="forgot-password"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
