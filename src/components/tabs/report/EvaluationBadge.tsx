import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/styles/color";

type EvaluationBadgeProps = {
    type: string;
    grade: number;
    isLowestGrade?: boolean;
};

export default function EvaluationBadge({ type, grade, isLowestGrade }: EvaluationBadgeProps) {
    return (
        <View style={styles.evaluationBadge}>
            <Text style={styles.evaluationType}>{type}</Text>
            <Text
                style={[
                    styles.evaluationGrade,
                    isLowestGrade && { textDecorationLine: "line-through", color: colors.textSecondary },
                ]}
            >
                {grade.toFixed(1)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    evaluationBadge: {
        width: "48%",
        borderWidth: 1,
        borderColor: "#2B2B32",
        backgroundColor: "#1E1E24",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    evaluationType: {
        fontSize: 11,
        fontWeight: "600",
        color: colors.textSecondary,
        marginBottom: 4,
    },
    evaluationGrade: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.white,
    },
});
