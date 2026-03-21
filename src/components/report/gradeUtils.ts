import { Semester } from "@/data/subjects";

export function calcPartialAverage(semester: Semester) {
  const cps = semester.evaluations
    .filter((evaluation) => evaluation.type.startsWith("CheckPoint"))
    .map((evaluation) => evaluation.grade);

  const sprints = semester.evaluations
    .filter((evaluation) => evaluation.type.startsWith("Challenge"))
    .map((evaluation) => evaluation.grade);

  const bestCPs = cps.sort((first, second) => second - first).slice(0, 2);
  const bestSprints = sprints.slice(0, 2);
  const sum = [...bestCPs, ...bestSprints].reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  return sum / 4;
}

export function calcSemesterAverage(semester: Semester) {
  const partial = calcPartialAverage(semester);
  const gs =
    semester.evaluations.find((evaluation) => evaluation.type === "Global Solution")?.grade ?? 0;

  return 0.4 * partial + 0.6 * gs;
}
