import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../constants/color";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});