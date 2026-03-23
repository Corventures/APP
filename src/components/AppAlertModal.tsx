import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { CircleAlert, CircleCheck, CircleX, Check } from "lucide-react-native";
import { colors } from "@/constants/color";

export type AlertVariant = "success" | "error" | "warning";

interface AppAlertModalProps {
    visible: boolean;
    title: string;
    message: string;
    variant?: AlertVariant;
    buttonLabel?: string;
    onClose: () => void;
}

const variantStyles = {
    success: {
        icon: CircleCheck,
        accentColor: colors.success,
    },
    error: {
        icon: CircleX,
        accentColor: colors.error,
    },
    warning: {
        icon: CircleAlert,
        accentColor: colors.warning,
    },
} as const;

export default function AppAlertModal({
    visible,
    title,
    message,
    variant = "warning",
    buttonLabel = "Entendi",
    onClose,
}: AppAlertModalProps) {
    const selectedVariant = variantStyles[variant];
    const Icon = selectedVariant.icon;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.backdrop}>
                <View style={styles.card}>
                    <View
                        style={[
                            styles.iconContainer,
                            { backgroundColor: `${selectedVariant.accentColor}20` },
                        ]}
                    >
                        <Icon size={52} color={selectedVariant.accentColor} strokeWidth={2} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <Pressable style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: "100%",
        maxWidth: 360,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        paddingHorizontal: 18,
        paddingVertical: 22,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 8,
    },
    iconContainer: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    title: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 8,
    },
    message: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        marginBottom: 18,
    },
    button: {
        width: "100%",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
    },
});
