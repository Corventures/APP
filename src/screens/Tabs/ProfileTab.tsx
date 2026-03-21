import React from "react";
import { Ionicons } from "@expo/vector-icons";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/styles/color";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { supabase } from "@/lib/supabase";

export default function ProfileTabScreen() {
    const navigation = useAppNavigation();

    async function handleLogout() {
        try {
            await AsyncStorage.setItem("@remember_me", "false");
            await supabase.auth.signOut();
            navigation.replace("Login");
        } catch (e) {
            Alert.alert("Erro", "Não foi possível realizar o logout.");
        }
    }

    const menuItems = [
        {
            id: "1",
            icon: "person-outline",
            label: "Meu Perfil",

        },
        {
            id: "2",
            icon: "notifications-outline",
            label: "Notificações",

        },
        {
            id: "3",
            icon: "shield-checkmark-outline",
            label: "Privacidade",

        },
        {
            id: "4",
            icon: "help-circle-outline",
            label: "Ajuda",

        },
        {
            id: "5",
            icon: "document-text-outline",
            label: "Termos de Serviço",

        },
    ];

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.bannerSection}>
                    <View style={styles.bannerBackground}>
                        <View style={styles.bannerGradient} />
                    </View>

                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={require("@assets/profile/profile-square.jpg")}
                                style={styles.avatarImage}
                            />
                        </View>
                    </View>

                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userName}>Augusto B. Barros</Text>
                        <Text style={styles.userEmail}>rm565065@fiap.com.br</Text>
                        <Text style={styles.userInfo}>Engenharia de Software • 5º Semestre</Text>
                    </View>
                </View>

                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>6</Text>
                        <Text style={styles.statLabel}>Cursos</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>92%</Text>
                        <Text style={styles.statLabel}>Presença</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>9.38</Text>
                        <Text style={styles.statLabel}>Média</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Configurações</Text>
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            activeOpacity={0.7}
                        >
                            <View
                                style={[
                                    styles.menuIconBg,
                                    { backgroundColor: colors.primary + "20" },
                                ]}
                            >
                                <Ionicons name={item.icon as any} size={22} color={colors.white} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Ionicons name="exit-outline" size={22} color={colors.white} />
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Versão 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    bannerSection: {
        marginBottom: 28,
        alignItems: "center",
    },
    bannerBackground: {
        width: "100%",
        height: 140,
        backgroundColor: colors.primary,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: -80,
        zIndex: 0,
    },
    bannerGradient: {
        flex: 1,
        backgroundColor: colors.primary,
        opacity: 0.9,
    },
    avatarWrapper: {
        zIndex: 1,
        marginBottom: 16,
        alignItems: "center",
    },
    avatarContainer: {
        width: 128,
        height: 128,
        borderRadius: 64,
        overflow: "hidden",
        borderWidth: 6,
        borderColor: colors.card,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
        backgroundColor: colors.card,
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    userInfoContainer: {
        alignItems: "center",
    },
    userName: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 4,
    },
    userEmail: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    userInfo: {
        color: colors.textMuted,
        fontSize: 12,
    },
    statsCard: {
        flexDirection: "row",
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: colors.background,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        color: colors.primary,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 4,
    },
    statLabel: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    statDivider: {
        width: 1,
        backgroundColor: "#2B2B32",
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
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
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
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
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
