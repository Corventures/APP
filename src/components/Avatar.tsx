import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera } from "lucide-react-native";
import { colors } from "@/constants/color";

interface ProfileAvatarProps {
    avatarUri: string | null;
    loading: boolean;
    uploading: boolean;
    onPress: () => void;
}

export default function ProfileAvatar({
    avatarUri,
    loading,
    uploading,
    onPress,
}: ProfileAvatarProps) {
    return (
        <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onPress}
            disabled={uploading || loading}
            activeOpacity={0.85}
        >
            {loading ? (
                <View style={[styles.avatarImage, styles.centered]}>
                    <ActivityIndicator size={64} color={colors.primary} />
                </View>
            ) : avatarUri ? (
                <>
                    <Image source={{ uri: avatarUri }} style={styles.avatarImage} resizeMode="cover" />
                </>
            ) : (
                <>
                    <View style={[styles.avatarImage, styles.avatarPlaceholder]}>
                        <Camera size={64} color="#888" />
                    </View>
                </>
            )}

            {uploading && (
                <View style={styles.uploadingOverlay}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    centered: { justifyContent: "center", alignItems: "center" },
    avatarContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        marginTop: -80,
        marginBottom: 12,
        borderWidth: 6,
        borderColor: colors.background,
        backgroundColor: colors.card,
        overflow: "hidden",
        zIndex: 1,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    avatarImage: { width: "100%", height: "100%" },
    avatarPlaceholder: {
        backgroundColor: "#2B2B32",
        alignItems: "center",
        justifyContent: "center",
    },
    cameraOverlay: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: colors.background,
    },
    uploadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 80,
        alignItems: "center",
        justifyContent: "center",
    },
});
