import { useEffect, useRef } from "react";
import { Sparkles, Bell, LucideIcon } from "lucide-react-native";
import { colors } from "@/constants/color";
import {
    Animated,
    Easing,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ComingSoonFeature = {
    icon: LucideIcon;
    text: string;
};

type ComingSoonProps = {
    screenTitle: string;
    subtitle: string;
    heroIcon: LucideIcon;
    badgeText?: string;
    heroTitle: string;
    description: string;
    features: ComingSoonFeature[];
    ctaText: string;
    ctaIcon?: LucideIcon;
};

export default function ComingSoon({
    screenTitle,
    subtitle,
    heroIcon: HeroIcon, // Capitalized to use as a component
    badgeText = "Coming Soon",
    heroTitle,
    description,
    features,
    ctaText,
    ctaIcon: CtaIcon = Bell, // Capitalized to use as a component
}: ComingSoonProps) {
    const pulseAnimation = useRef(new Animated.Value(0)).current;
    const floatAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1,
                    duration: 1400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 0,
                    duration: 1400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnimation, {
                    toValue: 1,
                    duration: 1700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnimation, {
                    toValue: 0,
                    duration: 1700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [floatAnimation, pulseAnimation]);

    const glowScale = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.08],
    });

    const glowOpacity = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 0.42],
    });

    const floatTranslateY = floatAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
    });

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{screenTitle}</Text>
                    {/* <Text style={styles.subtitle}>{subtitle}</Text> */}
                </View>

                <View style={styles.heroCard}>
                    <Animated.View
                        style={[
                            styles.iconGlow,
                            {
                                opacity: glowOpacity,
                                transform: [{ scale: glowScale }],
                            },
                        ]}
                    />

                    <Animated.View
                        style={[
                            styles.iconWrapper,
                            {
                                transform: [{ translateY: floatTranslateY }],
                            },
                        ]}
                    >
                        {/* Rendering the passed Lucide icon component */}
                        <HeroIcon size={42} color={colors.white} />
                    </Animated.View>

                    <View style={styles.badge}>
                        <Sparkles size={14} color={colors.primary} />
                        <Text style={styles.badgeText}>{badgeText}</Text>
                    </View>

                    <Text style={styles.heroTitle}>{heroTitle}</Text>
                    <Text style={styles.heroDescription}>{description}</Text>

                    <View style={styles.featureList}>
                        {features.map((feature) => {
                            const FeatureIcon = feature.icon; // Extract component to render
                            return (
                                <View key={feature.text} style={styles.featureItem}>
                                    <FeatureIcon size={18} color={colors.primary} />
                                    <Text style={styles.featureText}>{feature.text}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <Pressable style={styles.ctaButton}>
                        <CtaIcon size={18} color={colors.white} />
                        <Text style={styles.ctaText}>{ctaText}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        color: colors.white,
        fontSize: 28,
        fontWeight: "800",
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 15,
        marginTop: 4,
        maxWidth: 300,
        lineHeight: 21,
    },
    heroCard: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#2B2B32",
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },
    iconGlow: {
        position: "absolute",
        top: 46,
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: colors.primary,
    },
    iconWrapper: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        borderColor: "#2B2B32",
        backgroundColor: "#1E1E24",
        borderRadius: 999,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginBottom: 14,
    },
    badgeText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
    heroTitle: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 10,
        textAlign: "center",
    },
    heroDescription: {
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 21,
        marginBottom: 22,
    },
    featureList: {
        flex: 1,
        width: "100%",
        gap: 10,
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 11,
        paddingHorizontal: 12,
        backgroundColor: "#1A1A20",
        borderWidth: 1,
        borderColor: "#2B2B32",
        borderRadius: 10,
    },
    featureText: {
        color: colors.white,
        fontSize: 13,
        flex: 1,
    },
    ctaButton: {
        width: "100%",
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    ctaText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
    },
});