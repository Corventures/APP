import React from "react";
import type { LucideIcon } from "lucide-react-native";

type TabBarIconProps = {
    Icon: LucideIcon;
    color: string;
    size: number;
    focused: boolean;
};

export default function TabBarIcon({ Icon, color, size, focused }: TabBarIconProps) {
    return <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 1.5} />;
}
