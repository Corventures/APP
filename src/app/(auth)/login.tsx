import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import PrimaryButton from "@/components/PrimaryButton";
import { colors } from "@/constants/color";
import { supabase } from "@/lib/supabase";
import { Check, User, Lock } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [rm, setRm] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rmError, setRmError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  async function handleLogin() {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: rm.trim(),
        password: password.trim(),
      });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setFormError("E-mail ou senha inválidos.");
        } else {
          setFormError("Erro ao fazer login. Tente novamente.");
          console.error("Login error:", error);
        }
      } else {
        if (remember) {
          await AsyncStorage.setItem("@remember_me", "true");
        } else {
          await AsyncStorage.setItem("@remember_me", "false");
        }
        router.replace("/(tabs)/home");
      }
    } catch {
      setFormError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function validateForm() {
    const rmValue = rm.trim();
    const passwordValue = password.trim();
    let isValid = true;

    setRmError("");
    setPasswordError("");
    setFormError("");

    if (!rmValue) {
      setRmError("Informe seu RM ou e-mail institucional.");
      isValid = false;
    }

    if (!passwordValue) {
      setPasswordError("Informe sua senha.");
      isValid = false;
    } else if (passwordValue.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    }

    return isValid;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topSection}>
              <Image
                source={require("@/assets/fiap-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.title}>Portal do Aluno</Text>
            </View>

            <View style={styles.card}>
              <CustomInput
                label="E-mail"
                icon={User}
                placeholder="Ex: RM123456@fiap.com.br"
                value={rm}
                onChangeText={(value) => {
                  setRm(value);
                  if (rmError) {
                    setRmError("");
                  }
                }}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                errorMessage={rmError}
              />

              <CustomInput
                label="Senha"
                icon={Lock}
                placeholder="Digite sua senha"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (passwordError) {
                    setPasswordError("");
                  }
                }}
                isPassword
                textContentType="password"
                autoComplete="password"
                errorMessage={passwordError}
              />

              {formError ? (
                <Text style={styles.formError}>{formError}</Text>
              ) : null}

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberWrapper}
                  activeOpacity={0.7}
                  onPress={() => setRemember((prev) => !prev)}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      remember
                        ? styles.checkboxBoxChecked
                        : styles.checkboxBoxUnchecked,
                    ]}
                  >
                    {remember && (
                      <Check size={18} color={colors.white} />
                    )}
                  </View>
                  <Text style={styles.rememberText}>Lembrar de mim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/(auth)/forgot-password")}
                >
                  <Text style={styles.forgotText}>Esqueci minha senha</Text>
                </TouchableOpacity>
              </View>

              <PrimaryButton
                title="Entrar"
                onPress={handleLogin}
                loading={loading}
              />

              <View style={styles.dividerWrapper}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={() => router.push("/(auth)/register")}
              >
                <Text style={styles.secondaryButtonText}>Criar conta</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 26,
  },
  logo: {
    width: 170,
    height: 46,
    marginBottom: 18,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#202028",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 8,
  },
  optionsRow: {
    marginTop: 2,
    marginBottom: 8,
  },
  rememberWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxBoxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxBoxUnchecked: {
    borderColor: "#3A3A42",
    backgroundColor: "transparent",
  },
  formError: {
    color: "#F87171",
    fontSize: 13,
    marginBottom: 10,
    marginTop: -2,
  },
  rememberText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "flex-end",
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textMuted,
    marginHorizontal: 10,
    fontSize: 13,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 15,
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
