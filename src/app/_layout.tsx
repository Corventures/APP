import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { colors } from "@/constants/color";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const rememberMeValue = await AsyncStorage.getItem("@remember_me");

        if (session && rememberMeValue === "true") {
          setSession(session);
        } else if (session) {
          await supabase.auth.signOut();
          setSession(null);
        }
      } catch {
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {session ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
