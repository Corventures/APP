import React from "react";
import {
    createBottomTabNavigator,
    BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { colors } from "@/styles/color";
import TabBarIcon from "../../components/tabs/bottom-bar/TabBarIcon";
import { TAB_SCREENS } from "../../components/tabs/bottom-bar/tabScreensConfig";

export type BottomTabParamList = {
    HomeTab: undefined;
    ReportTab: undefined;
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
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarIconStyle: styles.tabBarIcon,
                tabBarShowLabel: false,
            }}
        >
            {TAB_SCREENS.map(({ name, component, title, icon: Icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        title,
                        tabBarIcon: ({ color, size, focused }) => (
                            <TabBarIcon Icon={Icon} color={color} size={size} focused={focused} />
                        ),
                    }}
                />
            ))}
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
    tabBarLabel: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 4,
    },
    tabBarIcon: {},
});
