import { useEffect } from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "@/constants/color";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const rememberMe = await AsyncStorage.getItem("@remember_me");

        setTimeout(async () => {
          if (session) {
            if (rememberMe === "true") {
              router.replace("home");
            } else {
              await supabase.auth.signOut();
              router.replace("login");
            }
          } else {
            router.replace("login");
          }
        }, 1000);
      } catch {
        router.replace("login");
      }
    }
    checkUser();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Image
          source={require("@/assets/fiap-loading.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 120,
  },
});
