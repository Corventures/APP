import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Semester } from "@/data/subjects";
import { colors } from "@/styles/color";
import EvaluationBadge from "./EvaluationBadge";
import { calcSemesterAverage } from "./gradeUtils";

type SemesterSectionProps = {
    semester: Semester;
};

export default function SemesterSection({ semester }: SemesterSectionProps) {
    const averageGrade = calcSemesterAverage(semester);
    const absencesLimit = 20;
    const absencesProgress = Math.min((semester.absences / absencesLimit) * 100, 100);
    const averageProgress = Math.min((averageGrade / 10) * 100, 100);

    const averageStatus =
        averageGrade >= 8 ? "Excelente" : averageGrade >= 6 ? "Aprovado" : "Risco";

    return (
        <View style={styles.semesterContainer}>
            <View style={styles.semesterHeader}>
                <Text style={styles.semesterTitle}>{semester.semester}º Semestre</Text>
                <View style={styles.semesterStatusBadge}>
                    <Text
                        style={[
                            styles.semesterStatusText,
                            {
                                color:
                                    averageGrade >= 8
                                        ? colors.success
                                        : averageGrade >= 6
                                            ? colors.white
                                            : colors.error,
                            },
                        ]}
                    >
                        {averageStatus}
                    </Text>
                </View>
            </View>

            <View style={styles.semesterStats}>
                <View style={styles.statBadge}>
                    <Text style={styles.statLabel}>Média Semestral</Text>
                    <Text
                        style={[
                            styles.statValue,
                            { color: averageGrade >= 6 ? colors.success : colors.error },
                        ]}
                    >
                        {averageGrade.toFixed(1)}
                    </Text>
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${averageProgress}%`,
                                    backgroundColor: averageGrade >= 6 ? colors.success : colors.error,
                                },
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.statBadge}>
                    <Text style={styles.statLabel}>Faltas</Text>
                    <View style={styles.absenceRow}>
                        <Text
                            style={[
                                styles.statValue,
                                {
                                    color:
                                        semester.absences >= 15
                                            ? colors.error
                                            : semester.absences >= 10
                                                ? colors.warning
                                                : colors.white,
                                },
                            ]}
                        >
                            {semester.absences}
                        </Text>
                        <Text style={styles.statValueMuted}>/{absencesLimit}</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${absencesProgress}%`,
                                    backgroundColor:
                                        semester.absences >= 15
                                            ? colors.error
                                            : semester.absences >= 10
                                                ? colors.warning
                                                : colors.success,
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>

            <Text style={styles.evaluationSectionTitle}>Avaliações</Text>

            <View style={styles.evaluationsGrid}>
                {semester.evaluations.map((evaluation, index) => {
                    const lowestGrade = Math.min(...semester.evaluations.map((e) => e.grade));
                    const isLowestGradeCP = evaluation.grade === lowestGrade &&
                        semester.evaluations.findIndex((e) => e.grade === lowestGrade) === index;
                    return (
                        <EvaluationBadge
                            key={index}
                            type={evaluation.type}
                            grade={evaluation.grade}
                            isLowestGrade={isLowestGradeCP}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    semesterContainer: {
        marginBottom: 12,
    },
    semesterHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    semesterStatusBadge: {
        borderWidth: 1,
        borderColor: "#2B2B32",
        backgroundColor: "#1E1E24",
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    semesterStatusText: {
        fontSize: 11,
        fontWeight: "700",
    },
    semesterTitle: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "700",
    },
    semesterStats: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 10,
    },
    statBadge: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#2B2B32",
        backgroundColor: "#1E1E24",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: colors.textSecondary,
    },
    statValue: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 4,
        color: colors.white,
    },
    statValueMuted: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.textSecondary,
        marginTop: 4,
    },
    absenceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    progressTrack: {
        width: "100%",
        height: 5,
        borderRadius: 999,
        backgroundColor: "#2A2A32",
        marginTop: 8,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 999,
    },
    evaluationSectionTitle: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 8,
    },
    evaluationsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
    },
});
