import React from "react";
import ComingSoon from "@/components/ComingSoon";
import { BarChart2, Bell, Calendar, Rocket } from "lucide-react-native";


export default function HomeTabScreen() {
    return (
        <ComingSoon
            screenTitle="Início"
            subtitle="Estamos preparando sua experiência principal"
            heroIcon={Rocket}
            heroTitle="Em breve no app"
            description="Seu painel inicial terá atalhos inteligentes, próximas aulas e visão rápida do semestre."
            features={[
                { icon: Calendar, text: "Próximas aulas e compromissos" },
                { icon: BarChart2, text: "Resumo de desempenho acadêmico" },
                { icon: Bell, text: "Alertas importantes em tempo real" },
            ]}
            ctaText="Me avise quando lançar"
            ctaIcon={Bell}
        />
    );
}