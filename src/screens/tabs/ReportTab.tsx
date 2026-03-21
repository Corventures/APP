import React, { useState, useRef } from "react";
import { ChevronDown, ChevronUp, LucideIcon, UserX } from "lucide-react-native";
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
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/color";
import {
  SUBJECTS,
  Subject,
} from "@/data/subjects";
import SemesterSection from "@/components/tabs/report/SemesterSection";
import { calcSemesterAverage } from "@/components/tabs/report/gradeUtils";

export default function ReportTabScreen() {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set([]));
  const [activeSemester, setActiveSemester] = useState<1 | 2>(1);
  const cardsScrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = useWindowDimensions();

  const scrollToSemester = (semester: 1 | 2) => {
    setActiveSemester(semester);
    cardsScrollRef.current?.scrollTo({
      x: semester === 1 ? 0 : screenWidth,
      animated: true,
    });
  };

  const semesterProgress = scrollX.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const animatedLeft = semesterProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  const animatedColorText1 = semesterProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, colors.textSecondary],
  });

  const animatedColorText2 = semesterProgress.interpolate({
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

  const handleCardsMomentumEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const semester = offsetX >= screenWidth / 2 ? 2 : 1;
    setActiveSemester(semester);
  };

  const renderSemesterCards = (semesterNumber: 1 | 2) => (
    <View style={styles.subjectsContainer}>
      {SUBJECTS.map((subject: Subject) => {
        const currentSemester = subject.semesters.find(
          (semester) => semester.semester === semesterNumber
        );
        const currentAverage = currentSemester
          ? calcSemesterAverage(currentSemester)
          : 0;

        const SubjectIcon = subject.icon as LucideIcon;
        const cardKey = `${semesterNumber}-${subject.id}`;
        const isExpanded = expandedSubjects.has(subject.id);

        return (
          <View key={cardKey} style={styles.subjectCard}>
            <TouchableOpacity
              style={styles.subjectHeader}
              activeOpacity={0.7}
              onPress={() => toggleSubject(subject.id)}
            >
              <View style={styles.subjectIconBg}>
                <SubjectIcon size={24} color={colors.white} strokeWidth={1.5} />
              </View>

              <View style={styles.subjectInfo}>
                {isExpanded ? (
                  <Text style={styles.subjectTitle}>{subject.title}</Text>
                ) : (
                  <Text
                    style={styles.subjectTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {subject.title}
                  </Text>
                )}
                {/* <Text style={styles.subjectProfessor}>{subject.professor}</Text> */}
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
                    {/* <UserX size={14} color={colors.textSecondary} /> */}
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

              {isExpanded ? (
                <ChevronUp size={24} color={colors.textSecondary} />
              ) : (
                <ChevronDown size={24} color={colors.textSecondary} />
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.expandedContent}>
                {subject.semesters
                  .filter((semester) => semester.semester === semesterNumber)
                  .map((semester) => (
                    <SemesterSection key={semester.semester} semester={semester} />
                  ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor={colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Boletim</Text>
        </View>

        <View style={styles.stickySwitchWrap}>
          <View style={styles.switchContainer}>
            <Animated.View
              style={[
                styles.switchKnob,
                { left: animatedLeft, width: "50%" },
              ]}
            />
            <Pressable
              style={styles.switchButton}
              onPress={() => scrollToSemester(1)}
            >
              <Animated.Text style={[styles.switchText, { color: animatedColorText1 }]}>
                1º Semestre
              </Animated.Text>
            </Pressable>
            <Pressable
              style={styles.switchButton}
              onPress={() => scrollToSemester(2)}
            >
              <Animated.Text style={[styles.switchText, { color: animatedColorText2 }]}>
                2º Semestre
              </Animated.Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.cardsViewport}>
          <Animated.ScrollView
            ref={cardsScrollRef}
            horizontal
            pagingEnabled
            bounces={false}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleCardsMomentumEnd}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={[styles.cardsPage, { width: screenWidth }]}>{renderSemesterCards(1)}</View>
            <View style={[styles.cardsPage, { width: screenWidth }]}>{renderSemesterCards(2)}</View>
          </Animated.ScrollView>
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
  stickySwitchWrap: {
    marginHorizontal: -16,
    backgroundColor: colors.background,
    paddingBottom: 12,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 30,
    overflow: 'hidden',
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
    gap: 18,
  },
  cardsViewport: {
    marginHorizontal: -16,
    overflow: "visible",
  },
  cardsPage: {
    paddingHorizontal: 16,
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