import { useState, useRef, useCallback } from "react";
import { ListChevronsDownUp, ListChevronsUpDown } from "lucide-react-native";
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
import { colors } from "@/constants/color";
import { SUBJECTS } from "@/data/subjects";
import SubjectCard from "@/screens/report/SubjectCard";


export default function ReportTabScreen() {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const cardsScrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = useWindowDimensions();

  const scrollToSemester = useCallback((semester: 1 | 2) => {
    cardsScrollRef.current?.scrollTo({
      x: semester === 1 ? 0 : screenWidth,
      animated: true,
    });
  }, [screenWidth]);

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

  const isAllExpanded = expandedSubjects.size === SUBJECTS.length;

  const toggleAllSubjects = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSubjects(
      isAllExpanded ? new Set() : new Set(SUBJECTS.map((s) => s.id))
    );
  }, [isAllExpanded]);

  const toggleSubject = useCallback((subjectId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSubjects((prev) => {
      const next = new Set(prev);
      next.has(subjectId) ? next.delete(subjectId) : next.add(subjectId);
      return next;
    });
  }, []);

  const renderSemesterCards = useCallback((semesterNumber: 1 | 2) => (
    <View style={styles.subjectsContainer}>
      {SUBJECTS.map((subject) => (
        <SubjectCard
          key={`${semesterNumber}-${subject.id}`}
          subject={subject}
          semesterNumber={semesterNumber}
          isExpanded={expandedSubjects.has(subject.id)}
          onToggle={toggleSubject}
        />
      ))}
    </View>
  ), [expandedSubjects, toggleSubject]);

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
          <TouchableOpacity onPress={toggleAllSubjects} style={styles.toggleAllButton}>
            {isAllExpanded
              ? <ListChevronsDownUp size={24} color={colors.white} />
              : <ListChevronsUpDown size={24} color={colors.white} />}
          </TouchableOpacity>
        </View>

        <View style={styles.stickySwitchWrap}>
          <View style={styles.switchContainer}>
            <Animated.View
              style={[styles.switchKnob, { left: animatedLeft, width: "50%" }]}
              pointerEvents="none"
            />
            <Pressable style={styles.switchButton} onPress={() => scrollToSemester(1)}>
              <Animated.Text style={[styles.switchText, { color: animatedColorText1 }]}>
                1º Semestre
              </Animated.Text>
            </Pressable>
            <Pressable style={styles.switchButton} onPress={() => scrollToSemester(2)}>
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
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleAllButton: {
    padding: 8,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
  },
  stickySwitchWrap: {
    marginHorizontal: -16,
    backgroundColor: colors.background,
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 16,
    zIndex: 20,
    elevation: 2,
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
    height: 48,
  },
  switchKnob: {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 26,
  },
  switchButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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