import { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { File } from "expo-file-system";
import { colors } from "@/constants/color";
import ProfileAvatar from "@/components/Avatar";
import AppAlertModal, { type AlertVariant } from "@/components/AppAlertModal";
import { supabase } from "@/lib/supabase";
import {
    ChevronRight,
    LogOut,
    User,
    Bell,
    ShieldCheck,
    HelpCircle,
    FileText,
    LucideIcon,
    Mail,
    IdCard,
    Trash2,
} from "lucide-react-native";

interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
}

export default function ProfileTabScreen() {
    const router = useRouter();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [alertState, setAlertState] = useState<{
        visible: boolean;
        title: string;
        message: string;
        variant: AlertVariant;
    }>({
        visible: false,
        title: "",
        message: "",
        variant: "warning",
    });

    const showAlert = useCallback((title: string, message: string, variant: AlertVariant) => {
        setAlertState({ visible: true, title, message, variant });
    }, []);

    const closeAlert = useCallback(() => {
        setAlertState((prevState) => ({ ...prevState, visible: false }));
    }, []);

    const getPublicUrl = useCallback((userId: string): string | null => {
        const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(`${userId}/avatar.jpg`);
        console.log("Public URL data:", data);
        return data?.publicUrl ?? null;
    }, []);

    const loadUser = useCallback(async () => {
        try {
            setLoading(true);

            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) throw error;

            const meta = user.user_metadata ?? {};

            const userProfile: UserProfile = {
                id: user.id,
                email: user.email ?? "",
                full_name: meta.full_name ?? meta.name ?? user.email ?? "Usuário",
                avatar_url: meta.avatar_url ?? null,
            };

            setProfile(userProfile);


            if (userProfile.avatar_url) {
                const publicUrl = getPublicUrl(user.id);
                if (publicUrl) setAvatarUri(publicUrl);
            }
        } catch (err) {
            console.error("Erro ao carregar usuário:", err);
        } finally {
            setLoading(false);
        }
    }, [getPublicUrl]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    async function handleRemoveAvatar() {
        if (!profile) return;
        try {
            setUploading(true);
            // Remove from storage
            const { error: removeError } = await supabase.storage
                .from("avatars")
                .remove([`${profile.id}/avatar.jpg`]);
            if (removeError) throw removeError;

            // Remove from user metadata
            await supabase.auth.updateUser({ data: { avatar_url: null } });

            setAvatarUri(null);
            setProfile((prev) => prev ? { ...prev, avatar_url: null } : prev);

            showAlert("Foto removida", "Sua foto de perfil foi removida.", "success");
        } catch (err: any) {
            console.error("Erro ao remover avatar:", err);
            showAlert("Erro", err.message ?? "Não foi possível remover a foto.", "error");
        } finally {
            setUploading(false);
        }
    }

    async function handlePickAvatar() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            showAlert("Permissão necessária", "Permita o acesso à galeria nas configurações.", "warning");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (result.canceled || !result.assets?.[0]) return;

        await uploadAvatar(result.assets[0].uri);
    }

    async function uploadAvatar(uri: string) {
        if (!profile) return;

        try {
            setUploading(true);


            const file = new File(uri);
            const bytes = await file.bytes();

            const filePath = `${profile.id}/avatar.jpg`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, bytes, {
                    contentType: "image/jpeg",
                    upsert: true,
                });

            if (uploadError) throw uploadError;


            await supabase.auth.updateUser({
                data: { avatar_url: filePath },
            });


            const publicUrl = getPublicUrl(profile.id);
            setAvatarUri(publicUrl ? `${publicUrl}?t=${Date.now()}` : null);

            showAlert(
                "Foto atualizada",
                "Sua foto de perfil foi alterada com sucesso",
                "success"
            );
        } catch (err: any) {
            console.error("Erro no upload:", err);
            showAlert("Erro", err.message ?? "Não foi possível atualizar a foto.", "error");
        } finally {
            setUploading(false);
        }
    }


    async function handleLogout() {
        try {
            await AsyncStorage.setItem("@remember_me", "false");
            await supabase.auth.signOut();
            router.replace("/(auth)/login");
        } catch {
            showAlert("Erro", "Não foi possível realizar o logout.", "error");
        }
    }


    const menuItems: { id: string; icon: LucideIcon; label: string }[] = [
        { id: "1", icon: User, label: "Meu Perfil" },
        { id: "2", icon: Bell, label: "Notificações" },
        { id: "3", icon: ShieldCheck, label: "Privacidade" },
        { id: "4", icon: HelpCircle, label: "Ajuda" },
        { id: "5", icon: FileText, label: "Termos de Serviço" },
    ];

    const stats = [
        { id: "courses", value: "#2", label: "Ranking" },
        { id: "attendance", value: "98%", label: "Presença" },
        { id: "average", value: "9.48", label: "Média Geral" },
    ];


    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <AppAlertModal
                visible={alertState.visible}
                title={alertState.title}
                message={alertState.message}
                variant={alertState.variant}
                onClose={closeAlert}
            />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Image
                        source={require("@/assets/profile/banner-particle.jpg")}
                        style={[styles.bannerImage, { opacity: 0.8, backgroundColor: "#18181B" }]}
                        resizeMode="cover"
                    />


                    <ProfileAvatar
                        avatarUri={avatarUri}
                        loading={loading}
                        uploading={uploading}
                        onPress={handlePickAvatar}
                    />

                    {avatarUri && !loading && (
                        <TouchableOpacity
                            style={styles.removePhotoButton}
                            onPress={handleRemoveAvatar}
                            activeOpacity={0.8}
                            disabled={uploading}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                <Trash2 size={16} color={colors.error} strokeWidth={2} />
                                <Text style={styles.removePhotoText}>Remover foto</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    <View style={styles.userInfoContainer}>
                        <View style={styles.userInfoCard}>
                            <View style={styles.nameRow}>
                                <Text style={styles.userName} numberOfLines={1}>
                                    {/* {profile?.full_name ?? "Usuário"} */}
                                    Augusto Barcelos Barros
                                </Text>
                            </View>

                            <View style={styles.badgeGroup}>
                                <View style={styles.idBadge}>
                                    <IdCard size={16} color={colors.textSecondary} strokeWidth={1.5} />
                                    <Text style={styles.userId}>RM 565065</Text>
                                </View>
                                <View style={styles.classBadge}>
                                    <Text style={styles.classText}>3ESPX</Text>
                                </View>
                            </View>

                            <View style={styles.badgeContainer}>
                                <Text style={styles.userInfo}>Engenharia de Software • 5º Semestre</Text>
                            </View>

                            <View style={styles.contactRow}>
                                <Mail size={14} color={colors.textSecondary} strokeWidth={1.8} />
                                <Text style={styles.userEmail}>{profile?.email ?? "—"}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.statsCard}>
                    {stats.map((stat) => (
                        <View key={stat.id} style={styles.statItem}>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Configurações</Text>
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.menuItem}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuIconBg}>
                                    <IconComponent size={20} color={colors.primary} strokeWidth={1.5} />
                                </View>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                                <ChevronRight size={20} color={colors.textSecondary} strokeWidth={1.5} />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <LogOut size={22} color={colors.white} />
                    <Text style={styles.logoutButtonText}>Sair da Conta</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Versão 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },
    headerSection: { marginBottom: 28, alignItems: "center" },
    bannerImage: {
        width: "100%",
        height: 140,
        borderRadius: 20,
        backgroundColor: colors.primary,
    },
    userInfoContainer: { width: "100%", paddingHorizontal: 8 },
    userInfoCard: {
        width: "100%",
        maxWidth: 380,
        alignSelf: "center",
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#2B2B32",
        padding: 14,
    },
    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 10,
    },
    userName: {
        color: colors.white,
        fontSize: 21,
        fontWeight: "800",
        flexShrink: 1,
    },
    idBadge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: "#1E1E24",
        borderWidth: 1,
        borderColor: "#2B2B32",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    userId: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    badgeGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 10,
    },
    badgeContainer: {
        backgroundColor: "rgba(237, 20, 91, 0.12)",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(237, 20, 91, 0.28)",
        alignSelf: "flex-start",
    },
    userInfo: {
        color: "#F69DB6",
        fontSize: 12,
        fontWeight: "600",
    },
    userEmail: {
        color: colors.textSecondary,
        fontSize: 13,
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#2B2B32",
    },
    classBadge: {
        backgroundColor: colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    classText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
    statsCard: {
        flexDirection: "row",
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 10,
        gap: 10,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: "#2B2B32",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1E1E24",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2B2B32",
        paddingVertical: 12,
    },
    statValue: {
        color: colors.white,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 4,
    },
    statLabel: {
        color: colors.textSecondary,
        fontSize: 11,
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    sectionTitle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        marginTop: 8,
    },
    menuContainer: { gap: 10, marginBottom: 24 },
    menuItem: {
        flexDirection: "row",
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#2B2B32",
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 1,
    },
    menuIconBg: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "rgba(237, 20, 91, 0.1)",
        borderColor: "rgba(237, 20, 91, 0.3)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    menuLabel: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "600",
        flex: 1,
    },
    logoutButton: {
        flexDirection: "row",
        backgroundColor: "#DC2626",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    logoutButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "600",
    },
    version: {
        color: colors.textMuted,
        fontSize: 12,
        textAlign: "center",
        marginTop: 24,
    },
    removePhotoButton: {
        marginBottom: 12,
        alignSelf: "center",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: "#23232A",
        borderWidth: 1,
        borderColor: colors.error,
    },
    removePhotoText: {
        color: colors.error,
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});