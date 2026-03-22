import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { LucideIcon, Eye, EyeOff } from "lucide-react-native";
import { colors } from "../styles/color";

interface CustomInputProps extends TextInputProps {
  label: string;
  icon: LucideIcon;
  isPassword?: boolean;
  errorMessage?: string;
}

export default function CustomInput({
  label,
  icon: Icon,
  isPassword = false,
  errorMessage,
  ...rest
}: CustomInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const secureValue = isPassword ? !isPasswordVisible : false;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[styles.inputWrapper, errorMessage ? styles.inputError : null]}
      >
        <Icon
          size={20}
          color={colors.textSecondary}
          style={styles.leftIcon}
          strokeWidth={1.5}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureValue}
          autoCapitalize="none"
          autoComplete="off"
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={colors.textSecondary} strokeWidth={1.5} />
            ) : (
              <Eye size={20} color={colors.textSecondary} strokeWidth={1.5} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingVertical: 14,
  },
  errorText: {
    color: "#F87171",
    marginTop: 6,
    fontSize: 12,
  },
});
