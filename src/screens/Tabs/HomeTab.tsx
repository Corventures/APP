import React from "react";
import ComingSoon from "@/components/ComingSoon";


export default function HomeTabScreen() {
    return (
        <ComingSoon
            screenTitle="Início"
            subtitle="Estamos preparando sua experiência principal"
            heroIcon="sparkles"
            heroTitle="Em breve no app"
            description="Seu painel inicial terá atalhos inteligentes, próximas aulas e visão rápida do semestre."
            features={[
                { icon: "calendar-outline", text: "Próximas aulas e compromissos" },
                { icon: "stats-chart-outline", text: "Resumo de desempenho acadêmico" },
                { icon: "notifications-outline", text: "Alertas importantes em tempo real" },
            ]}
            ctaText="Me avise quando lançar"
            ctaIcon="notifications-outline"
        />
    );
}