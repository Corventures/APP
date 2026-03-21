import React from "react";
import ComingSoon from "@/components/ComingSoon";


export default function MapsTabScreen() {
    return (
        <ComingSoon
            screenTitle="Mapa do Campus"
            subtitle="Estamos construindo algo incrível para você"
            heroIcon="map"
            heroTitle="Em breve no seu app"
            description="Navegue pelo campus, encontre salas e visualize rotas internas com precisão."
            features={[
                { icon: "pin-outline", text: "Localização de salas em tempo real" },
                { icon: "flask-outline", text: "Status de Laboratórios e do Maker" },
                { icon: "school-outline", text: "Pontos acadêmicos mais importantes" },
            ]}
            ctaText="Me avise quando lançar"
            ctaIcon="notifications-outline"
        />
    );
}