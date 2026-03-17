import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

export default function SplashScreen({ navigation }: any) {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "/assets/fiapp-loading.png"
        }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ED145B",
    justifyContent: "center",
    alignItems: "center"
  },

  logo: {
    width: 220,
    height: 120
  }
});