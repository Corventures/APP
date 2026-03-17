import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../styles/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>Placeholder da tela principal.</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.secondaryButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B1B20",
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
