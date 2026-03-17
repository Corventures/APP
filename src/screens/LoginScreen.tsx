import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Switch
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleLogin() {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha email e senha.");
      return;
    }

    Alert.alert("Login realizado", `Bem-vindo ${email}`);
  }

  return (
    <View style={styles.container}>
      
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/6/6b/FIAP_logo.png"
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Portal do Aluno</Text>
      <Text style={styles.subtitle}>
        Entre com sua conta FIAP
      </Text>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#777" />

          <TextInput
            style={styles.input}
            placeholder="seuemail@fiap.com.br"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>

        <View style={styles.passwordBox}>

          <Ionicons name="lock-closed-outline" size={20} color="#777" />

          <TextInput
            style={styles.passwordInput}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showPassword}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>


      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Lembrar-me</Text>

        <Switch
          value={remember}
          onValueChange={setRemember}
          thumbColor="#ED145B"
        />
      </View>


      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueci minha senha</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>


      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Não tem conta?
        </Text>

        <TouchableOpacity>
          <Text style={styles.registerLink}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        © FIAP - Faculdade de Informática e Administração Paulista
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "center",
    padding: 25
    },
    card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24
    },
  logo: {
    width: 180,
    height: 80,
    alignSelf: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },

  subtitle: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30
  },

  inputContainer: {
    marginBottom: 18
  },

  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 14
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10
  },

  input: {
    flex: 1,
    padding: 14,
    fontSize: 16
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16
  },

  showPassword: {
    color: "#ED145B",
    fontWeight: "bold"
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  switchText: {
    color: "#fff"
  },

  forgot: {
    color: "#ED145B",
    textAlign: "right",
    marginBottom: 20
  },

  button: {
    backgroundColor: "#ED145B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },

  registerText: {
    color: "#ccc"
  },

  registerLink: {
    color: "#ED145B",
    marginLeft: 5,
    fontWeight: "bold"
  },

  footer: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
    fontSize: 12
  }

});