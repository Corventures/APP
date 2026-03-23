import { colors } from "@/constants/color";
import { Subject } from "@/data/subjects";
import { type LucideIcon, ChevronUp, ChevronDown } from "lucide-react-native";
import { memo, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { calcSemesterAverage } from "./gradeUtils";
import SemesterSection from "./SemesterSection";

interface SubjectCardProps {
  subject: Subject;
  semesterNumber: 1 | 2;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export default memo(function SubjectCard({ subject, semesterNumber, isExpanded, onToggle }: SubjectCardProps) {
  const SubjectIcon = subject.icon as LucideIcon;
  const currentSemester = subject.semesters.find((s) => s.semester === semesterNumber);
  const currentAverage = currentSemester ? calcSemesterAverage(currentSemester) : 0;
  const absencesLimit = subject.totalClasses * 0.25;

  const handlePress = useCallback(() => onToggle(subject.id), [onToggle, subject.id]);

  return (
    <View style={styles.subjectCard}>
      <TouchableOpacity
        style={styles.subjectHeader}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <View style={styles.subjectIconBg}>
          <SubjectIcon size={24} color={colors.white} strokeWidth={1.5} />
        </View>

        <View style={styles.subjectInfo}>
          <Text
            style={styles.subjectTitle}
            numberOfLines={isExpanded ? undefined : 1}
            ellipsizeMode="tail"
          >
            {subject.title}
          </Text>

          {!isExpanded && (
            <View style={styles.quickStatsRow}>
              <View style={styles.quickStatBadge}>
                <Text style={styles.quickStatLabel}>Média</Text>
                <Text
                  style={[
                    styles.quickStatValue,
                    { color: currentAverage >= 6 ? colors.success : colors.error },
                  ]}
                >
                  {currentAverage.toFixed(1)}
                </Text>
              </View>
              <View style={styles.quickStatBadge}>
                <Text style={styles.quickStatLabel}>Faltas</Text>
                <Text style={styles.quickStatValue}>
                  <Text
                    style={{
                      color: (currentSemester?.absences ?? 0) >= 15 ? colors.error : colors.white,
                    }}
                  >
                    {currentSemester?.absences ?? 0}
                  </Text>
                  <Text style={{ color: colors.textSecondary }}>/{absencesLimit}</Text>
                </Text>
              </View>
            </View>
          )}
        </View>

        {isExpanded
          ? <ChevronUp size={24} color={colors.textSecondary} />
          : <ChevronDown size={24} color={colors.textSecondary} />}
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {subject.semesters
            .filter((s) => s.semester === semesterNumber)
            .map((semester) => (
              <SemesterSection key={semester.semester} semester={semester} absencesLimit={absencesLimit} />
            ))}
        </View>
      )}
    </View>
  );
});


const styles = StyleSheet.create({
  subjectCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  subjectIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  quickStatsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  quickStatBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  quickStatLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  quickStatValue: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.white,
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
});