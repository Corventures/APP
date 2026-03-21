import type { ComponentType } from "react";
import { FileText, Home, LucideIcon, MapPin, User } from "lucide-react-native";
import HomeTabScreen from "@/screens/tabs/HomeTab";
import MapsTabScreen from "@/screens/tabs/MapsTab";
import ProfileTabScreen from "@/screens/tabs/ProfileTab";
import ReportTabScreen from "@/screens/tabs/ReportTab";

export type TabScreenConfig = {
    name: "HomeTab" | "ReportTab" | "MapsTab" | "ProfileTab";
    title: string;
    component: ComponentType<any>;
    icon: LucideIcon;
};

export const TAB_SCREENS: TabScreenConfig[] = [
    {
        name: "HomeTab",
        title: "Início",
        component: HomeTabScreen,
        icon: Home,
    },
    {
        name: "ReportTab",
        title: "Boletim",
        component: ReportTabScreen,
        icon: FileText,
    },
    {
        name: "MapsTab",
        title: "Mapa",
        component: MapsTabScreen,
        icon: MapPin,
    },
    {
        name: "ProfileTab",
        title: "Perfil",
        component: ProfileTabScreen,
        icon: User,
    },
];
