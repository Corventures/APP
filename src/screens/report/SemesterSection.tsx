import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Semester } from "@/data/subjects";
import { colors } from "@/constants/color";
import EvaluationBadge from "./EvaluationBadge";
import { calcSemesterAverage } from "./gradeUtils";

type SemesterSectionProps = {
    semester: Semester;
    absencesLimit: number;
};

export default memo(function SemesterSection({ semester, absencesLimit }: SemesterSectionProps) {
    const averageGrade = calcSemesterAverage(semester);
    const absencesProgress = Math.min((semester.absences / absencesLimit) * 100, 100);
    const averageProgress = Math.min((averageGrade / 10) * 100, 100);

    let averageStatus = "";
    if (semester.absences >= absencesLimit) {
        averageStatus = "Muitas faltas";
    } else if (averageGrade >= 8) {
        averageStatus = "Ótimo";
    } else if (averageGrade >= 6) {
        averageStatus = "Bom";
    } else {
        averageStatus = "Baixo";
    }

    const lowestCpGrade = Math.min(
        ...semester.evaluations
            .filter((e) => e.type.includes("CheckPoint"))
            .map((e) => e.grade)
    );
    const indexOfLowestCp = semester.evaluations.findIndex(
        (e) => e.type.includes("CheckPoint") && e.grade === lowestCpGrade
    );

    return (
        <View style={styles.semesterContainer}>
            <View style={styles.semesterHeader}>
                <Text style={styles.semesterTitle}>Desempenho Geral</Text>
                <View style={styles.semesterStatusBadge}>
                    <Text
                        style={[
                            styles.semesterStatusText,
                            {
                                color:
                                    averageStatus === "Ótimo"
                                        ? colors.success
                                        : averageStatus === "Bom"
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

            <View style={styles.evaluationsSection}>
                <Text style={styles.evaluationSectionTitle}>Avaliações</Text>

                <View style={styles.evaluationsGrid}>
                    {semester.evaluations.map((evaluation, index) => {
                        const isLowestGradeCP = index === indexOfLowestCp;
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
        </View>
    );
});

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
        fontSize: 16,
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
    evaluationsSection: {
        borderWidth: 1,
        borderColor: "#2B2B32",
        backgroundColor: "#17171C",
        borderRadius: 10,
        padding: 10,
    },
    evaluationSectionTitle: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 8,
    },
    evaluationsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 10,
    },
});
