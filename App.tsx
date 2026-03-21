import React from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import BottomTabNavigator from "./src/screens/tabs/BottomTabNavigator";
import { colors } from "@/styles/color";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const FiapDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer theme={FiapDarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ animation: "fade" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ animation: "fade" }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ animation: "slide_from_bottom", presentation: "modal" }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ animation: "fade" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
