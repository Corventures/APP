import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/color";
import TabBarIcon from "@/screens/bottom-bar/TabBarIcon";
import { FileText, Home, MapPin, User, MessageCircle } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: true,
        sceneStyle: { backgroundColor: colors.background },
      }}

    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon Icon={Home} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon Icon={MapPin} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Boletim",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon Icon={FileText} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Mensagens",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon Icon={MessageCircle} color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon Icon={User} color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: "#3131367c",
    borderTopWidth: 1,
    paddingBottom: 16,
    paddingTop: 12,
    height: 80,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
});
