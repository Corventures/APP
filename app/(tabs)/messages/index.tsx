import ComingSoon from "@/components/ComingSoon";
import { Bell, MessageSquare, Send } from "lucide-react-native";

export default function MessagesTabScreen() {
  return (
    <ComingSoon
      screenTitle="Mensagens"
      subtitle="Estamos preparando seu hub de comunicação"
      heroIcon={MessageSquare}
      heroTitle="Em breve no app"
      description="Centralize suas comunicações com professores, coordenadores e colegas de classe."
      features={[
        { icon: Send, text: "Mensagens diretas com professores" },
        { icon: MessageSquare, text: "Notificações de avisos acadêmicos" },
        { icon: Bell, text: "Histórico de conversas organizado" },
      ]}
      ctaText="Me avise quando lançar"
      ctaIcon={Bell}
    />
  );
}
