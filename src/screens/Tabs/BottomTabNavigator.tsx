import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    createBottomTabNavigator,
    BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { colors } from "@/styles/color";
import HomeTabScreen from "./HomeTab";
import ReportTabScreen from "./ReportTab";
import MessagesTabScreen from "./_MessagesTab";
import ProfileTabScreen from "./ProfileTab";
import MapsTabScreen from "./MapsTab";

export type BottomTabParamList = {
    HomeTab: undefined;
    CoursesTab: undefined;
    MapsTab: undefined;
    MessagesTab: undefined;
    ProfileTab: undefined;
};

export type BottomTabNavigationPropType = BottomTabNavigationProp<BottomTabParamList>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarIconStyle: styles.tabBarIcon,
                tabBarBackground: () => (
                    <View style={styles.tabBarBackground} />
                ),
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeTabScreen}
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="CoursesTab"
                component={ReportTabScreen}
                options={{
                    title: "Cursos",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons name={focused ? "book" : "book-outline"} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="MapsTab"
                component={MapsTabScreen}
                options={{
                    title: "Mapa",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons name={focused ? "map" : "map-outline"} size={size} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="MessagesTab"
                component={MessagesTabScreen}
                options={{
                    title: "Mensagens",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons name={focused ? "notifications" : "notifications-outline"} size={size} color={color} />
                    ),
                    tabBarBadge: '',
                    tabBarBadgeStyle: {
                        backgroundColor: colors.primary,
                        minWidth: 8,
                        height: 8,
                        borderRadius: 5,
                        marginTop: 4,
                        marginRight: 2,
                    },
                }}
            /> */}
            <Tab.Screen
                name="ProfileTab"
                component={ProfileTabScreen}
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.background,
        borderTopColor: "#3131367c",
        borderTopWidth: 1,
        paddingBottom: 12,
        paddingTop: 12,
        height: 72,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    tabBarBackground: {
        backgroundColor: colors.card,
    },
    tabBarLabel: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 4,
    },
    tabBarIcon: {

    },
});
