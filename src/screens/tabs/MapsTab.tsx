import React from "react";
import ComingSoon from "@/components/ComingSoon";
import { Bell, FlaskConical, MapPin, Map, School } from "lucide-react-native";


export default function MapsTabScreen() {
    return (
        <ComingSoon
            screenTitle="Mapa do Prédio"
            subtitle="Estamos construindo algo incrível para você"
            heroIcon={MapPin}
            heroTitle="Em breve no seu app"
            description="Navegue pelo campus, encontre salas e visualize rotas internas com precisão."
            features={[
                { icon: Map, text: "Localização de salas em tempo real" },
                { icon: FlaskConical, text: "Status de Laboratórios e do Maker" },
                { icon: School, text: "Pontos acadêmicos mais importantes" },
            ]}
            ctaText="Me avise quando lançar"
            ctaIcon={Bell}
        />
    );
}