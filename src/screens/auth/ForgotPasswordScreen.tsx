import React, { useState } from "react";
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
import { colors } from "@/styles/color";
import { supabase } from "@/lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { Mail } from "lucide-react-native";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validateEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  async function handleRecoverPassword() {
    const emailValue = email.trim().toLowerCase();
    setEmailError("");

    if (!emailValue) {
      setEmailError("Informe seu e-mail institucional.");
      return;
    }

    if (!validateEmail(emailValue)) {
      setEmailError("Digite um e-mail válido para recuperar a senha.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailValue, {
        redirectTo: "https://example.com/reset-password", // TODO: Criar página de reset de senha e colocar a URL aqui
      });
      setLoading(false);
      if (error) {
        setEmailError("Erro ao enviar e-mail. Tente novamente.");
        return;
      }
      setIsSuccess(true);
    } catch {
      setLoading(false);
      setEmailError("Erro inesperado. Tente novamente.");
    }
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
                source={require("@assets/fiap-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Recuperar senha</Text>
            </View>

            <View style={styles.card}>
              {isSuccess ? (
                <View style={styles.successContainer}>
                  <Text style={styles.successIcon}>✓</Text>
                  <Text style={styles.successTitle}>E-mail enviado!</Text>
                  <Text style={styles.successText}>
                    Se o endereço estiver cadastrado, você receberá um e-mail
                    com as instruções para redefinir sua senha em instantes.
                  </Text>
                  <PrimaryButton
                    title="Voltar ao login"
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ) : (
                <>
                  <CustomInput
                    label="E-mail"
                    icon={Mail}
                    placeholder="Ex: rm123456@fiap.com.br"
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

                  <PrimaryButton
                    title="Enviar link"
                    onPress={handleRecoverPassword}
                    loading={loading}
                  />

                  <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.backButtonText}>Voltar ao login</Text>
                  </TouchableOpacity>
                </>
              )}
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
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
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
  successContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  successIcon: {
    fontSize: 52,
    color: colors.success,
    marginBottom: 16,
  },
  successTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  successText: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
});
