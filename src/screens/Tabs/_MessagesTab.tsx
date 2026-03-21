import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/color";

const MESSAGES = [
  {
    id: "1",
    sender: "Prof. João Silva",
    message: "Olá! Verificou o material da aula passada?",
    timestamp: "Há 2 horas",
    avatar: "👨‍🏫",
    unread: true,
  },
  {
    id: "2",
    sender: "Grupo de Estudos",
    message: "Vamos nos reunir amanhã para discutir o projeto?",
    timestamp: "Há 4 horas",
    avatar: "👥",
    unread: true,
  },
  {
    id: "3",
    sender: "Coordenação Acadêmica",
    message: "Aviso importante sobre a data de inscrição dos seminários",
    timestamp: "Ontem",
    avatar: "📢",
    unread: false,
  },
  {
    id: "4",
    sender: "Maria Santos",
    message: "Conseguiu terminar a tarefa?",
    timestamp: "2 dias atrás",
    avatar: "👩‍🎓",
    unread: false,
  },
];

export default function MessagesTabScreen() {
  const renderMessageCard = ({ item }: { item: typeof MESSAGES[0] }) => (
    <TouchableOpacity
      style={[
        styles.messageCard,
        item.unread && styles.messageCardUnread,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.avatarBg}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender}</Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.messagePreview} numberOfLines={1}>
          {item.message}
        </Text>
        <Text style={styles.messageTime}>{item.timestamp}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mensagens</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="create-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={MESSAGES}
          renderItem={renderMessageCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.emptyStateHelper}>
          <Ionicons name="chatbubble-outline" size={32} color={colors.textMuted} />
          <Text style={styles.emptyStateText}>Todas as suas mensagens aqui</Text>
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

    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 16,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "800",
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2B2B32",
  },
  listContent: {
    gap: 10,
  },
  messageCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 14,
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
  messageCardUnread: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  avatarBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#2B2B32",
  },
  avatar: {
    fontSize: 24,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  senderName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  messagePreview: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },
  messageTime: {
    color: colors.textMuted,
    fontSize: 11,
  },
  emptyStateHelper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 8,
  },
  emptyStateText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
