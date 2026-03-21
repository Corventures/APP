import React, { useEffect } from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { colors } from "@/styles/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const rememberMe = await AsyncStorage.getItem("@remember_me");

        setTimeout(async () => {
          if (session) {
            if (rememberMe === "true") {
              navigation.replace("Home");
            } else {
              await supabase.auth.signOut();
              navigation.replace("Login");
            }
          } else {
            navigation.replace("Login");
          }
        }, 1000);
      } catch {
        navigation.replace("Login");
      }
    }
    checkUser();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.content}>
        <Image
          source={require("@assets/fiap-loading.png")}
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
