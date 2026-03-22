import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/styles/color";
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
    IdCard
} from "lucide-react-native";

export default function ProfileTabScreen() {
    const router = useRouter();

    async function handleLogout() {
        try {
            await AsyncStorage.setItem("@remember_me", "false");
            await supabase.auth.signOut();
            router.replace("/(auth)/login");
        } catch {
            Alert.alert("Erro", "Não foi possível realizar o logout.");
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
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Image
                        source={require("@assets/profile/banner.png")}
                        style={[styles.bannerImage, { opacity: 0.8, backgroundColor: "#18181B" }]}
                        resizeMode="cover"
                    />

                    <View style={styles.avatarContainer}>
                        <Image
                            source={require("@assets/profile/profile-square.jpg")}
                            style={styles.avatarImage}
                        />
                    </View>

                    <View style={styles.userInfoContainer}>
                        <View style={styles.userInfoCard}>
                            <View style={styles.nameRow}>
                                <Text style={styles.userName} numberOfLines={1}>
                                    Augusto Barcelos Barros
                                </Text>
                                {/* <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                                    <Edit3 size={16} color={colors.textSecondary} strokeWidth={1.7} />
                                </TouchableOpacity> */}
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
                                <Text style={styles.userEmail}>rm565065@fiap.com.br</Text>
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
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },
    headerSection: {
        marginBottom: 28,
        alignItems: "center",
    },
    bannerImage: {
        width: "100%",
        height: 140,
        borderRadius: 20,
        backgroundColor: colors.primary,
    },
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
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    userInfoContainer: {
        width: "100%",
        paddingHorizontal: 8,
    },
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
    editButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#2B2B32",
        backgroundColor: "#1E1E24",
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
    menuContainer: {
        gap: 10,
        marginBottom: 24,
    },
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
});
