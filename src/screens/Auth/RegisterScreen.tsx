import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomInput from "@/components/CustomInput";
import PrimaryButton from "@/components/PrimaryButton";
import { colors } from "@/styles/color";
import { supabase } from "@/lib/supabase";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function RegisterScreen() {
  const navigation = useAppNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  function validateEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function validateForm() {
    const emailValue = email.trim().toLowerCase();
    const passwordValue = password.trim();
    const confirmPasswordValue = confirmPassword.trim();
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFormError("");

    if (!emailValue) {
      setEmailError("Informe seu e-mail institucional.");
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      setEmailError("Digite um e-mail válido.");
      isValid = false;
    }

    if (!passwordValue) {
      setPasswordError("Informe sua senha.");
      isValid = false;
    } else if (passwordValue.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    }

    if (!confirmPasswordValue) {
      setConfirmPasswordError("Confirme sua senha.");
      isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      setConfirmPasswordError("As senhas não coincidem.");
      isValid = false;
    }

    return isValid;
  }

  async function handleRegister() {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const passwordValue = password.trim();

      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: passwordValue,
      });

      if (error) {
        if (error.message?.toLowerCase().includes("user already registered")) {
          setFormError(
            "E-mail já cadastrado. Tente fazer login ou recuperar a senha.",
          );
        } else {
          setFormError(
            "Erro ao criar conta. Verifique os dados e tente novamente.",
          );
        }
        return;
      }

      if (!data.session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: passwordValue,
        });

        if (signInError) {
          setFormError(
            "Conta criada, mas não foi possível entrar automaticamente.",
          );
          return;
        }
      }

      navigation.navigate("Home");
    } catch {
      setFormError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          enableAutomaticScroll
        >
          <View style={styles.topSection}>
            <Image
              source={require("@assets/fiap-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>Criar conta</Text>
          </View>

          <View style={styles.card}>
            <CustomInput
              label="E-mail"
              icon="mail-outline"
              placeholder="Ex: RM123456@fiap.com.br"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (emailError) {
                  setEmailError("");
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
              autoCorrect={false}
              errorMessage={emailError}
            />

            <CustomInput
              label="Senha"
              icon="lock-closed-outline"
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

            <CustomInput
              label="Confirmar senha"
              icon="shield-checkmark-outline"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                if (confirmPasswordError) {
                  setConfirmPasswordError("");
                }
              }}
              isPassword
              textContentType="password"
              autoComplete="password"
              errorMessage={confirmPasswordError}
            />

            {formError ? (
              <Text style={styles.formError}>{formError}</Text>
            ) : null}

            <PrimaryButton
              title="Criar conta"
              onPress={handleRegister}
              loading={loading}
            />

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Voltar ao login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 8,
  },
  formError: {
    color: "#F87171",
    fontSize: 13,
    marginBottom: 10,
    marginTop: -2,
  },
  backButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B1B20",
    marginTop: 14,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
