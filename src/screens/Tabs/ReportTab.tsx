import React, { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  LayoutAnimation,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/color";
import {
  SUBJECTS,
  Subject,
} from "@/data/subjects";
import SemesterSection from "@/components/report/SemesterSection";
import { calcSemesterAverage } from "@/components/report/gradeUtils";

export default function ReportTabScreen() {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(
    new Set([])
  );
  const [activeSemester, setActiveSemester] = useState<1 | 2>(1);
  const switchAnimation = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.spring(switchAnimation, {
      toValue: activeSemester === 1 ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [activeSemester, switchAnimation]);

  const animatedLeft = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  const animatedColorText1 = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, colors.textSecondary],
  });

  const animatedColorText2 = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.textSecondary, colors.white],
  });

  const toggleSubject = (subjectId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };


  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor={colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Boletim</Text>
          <Text style={styles.subtitle}>Acompanhe suas notas</Text>
        </View>

        <View style={styles.switchContainer}>
          <Animated.View
            style={[
              styles.switchKnob,
              { left: animatedLeft, width: "50%" },
            ]}
          />
          <Pressable
            style={styles.switchButton}
            onPress={() => setActiveSemester(1)}
          >
            <Animated.Text style={[styles.switchText, { color: animatedColorText1 }]}>
              1º Semestre
            </Animated.Text>
          </Pressable>
          <Pressable
            style={styles.switchButton}
            onPress={() => setActiveSemester(2)}
          >
            <Animated.Text style={[styles.switchText, { color: animatedColorText2 }]}>
              2º Semestre
            </Animated.Text>
          </Pressable>
        </View>


        <View style={styles.subjectsContainer}>
          {SUBJECTS.map((subject: Subject) => {
            const currentSemester = subject.semesters.find(
              (semester) => semester.semester === activeSemester
            );
            const currentAverage = currentSemester ? calcSemesterAverage(currentSemester) : 0;

            return (
              <View key={subject.id} style={styles.subjectCard}>
                <TouchableOpacity
                  style={styles.subjectHeader}
                  activeOpacity={0.7}
                  onPress={() => toggleSubject(subject.id)}
                >
                  <View style={styles.subjectIconBg}>
                    <MaterialCommunityIcons name={subject.icon as any} size={24} color={colors.white} />
                  </View>

                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectTitle}>{subject.title}</Text>
                    <Text style={styles.subjectProfessor}>{subject.professor}</Text>
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
                              color:
                                (currentSemester?.absences ?? 0) >= 15
                                  ? colors.error
                                  : colors.white,
                            }}
                          >
                            {currentSemester?.absences ?? 0}
                          </Text>
                          <Text style={{ color: colors.textSecondary }}>/20</Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <MaterialCommunityIcons
                    name={
                      expandedSubjects.has(subject.id)
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={24}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>

                {expandedSubjects.has(subject.id) && (
                  <View style={styles.expandedContent}>
                    {subject.semesters
                      .filter((semester) => semester.semester === activeSemester)
                      .map((semester) => (
                        <SemesterSection
                          key={semester.semester}
                          semester={semester}
                        />
                      ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    marginVertical: 10,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2B2B32",
    position: 'relative',
    height: 48,
  },
  switchKnob: {
    position: 'absolute',
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 26,
  },
  switchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  switchText: {
    fontSize: 14,
  },
  subjectsContainer: {
    gap: 12,
  },
  subjectCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2B2B32",
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
    backgroundColor: "#1E1E24",
    borderWidth: 1,
    borderColor: "#2B2B32",
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
  subjectProfessor: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  quickStatsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  quickStatBadge: {
    borderWidth: 1,
    borderColor: "#2B2B32",
    backgroundColor: "#1E1E24",
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
    borderTopColor: "#2B2B32",
    borderTopWidth: 1,
  },
});
