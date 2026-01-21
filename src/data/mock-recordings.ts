import type { RecordingListItem, RecordingDetail } from "@/types";

/** 녹음 목록 데이터 (리스트 표시용) */
export const mockRecordingsList: RecordingListItem[] = [
  {
    id: "1",
    pieceTitle: "F. Chopin Ballade Op.23 No.1",
    duration: 1845,
    score: 84,
    date: "2024-12-30",
    focusAreas: 2,
    improvement: "+3",
  },
  {
    id: "2",
    pieceTitle: "F. Chopin Ballade Op.23 No.1",
    duration: 1520,
    score: 81,
    date: "2024-12-29",
    focusAreas: 3,
    improvement: "+2",
  },
  {
    id: "3",
    pieceTitle: "L. v. Beethoven Sonata Op.13 No.8",
    duration: 2340,
    score: 86,
    date: "2024-12-28",
    focusAreas: 1,
    improvement: "+5",
  },
  {
    id: "4",
    pieceTitle: "C. Debussy Suite Bergamasque No.3",
    duration: 980,
    score: 91,
    date: "2024-12-27",
    focusAreas: 0,
    improvement: "+4",
  },
  {
    id: "5",
    pieceTitle: "F. Chopin Ballade Op.23 No.1",
    duration: 1680,
    score: 79,
    date: "2024-12-26",
    focusAreas: 4,
    improvement: "+1",
  },
  {
    id: "6",
    pieceTitle: "F. Liszt Etude S.141 No.3",
    duration: 890,
    score: 72,
    date: "2024-12-25",
    focusAreas: 5,
    improvement: "-2",
  },
  {
    id: "7",
    pieceTitle: "L. v. Beethoven Sonata Op.13 No.8",
    duration: 2100,
    score: 81,
    date: "2024-12-24",
    focusAreas: 2,
    improvement: "+3",
  },
  {
    id: "8",
    pieceTitle: "F. Chopin Fantaisie-Impromptu Op.66",
    duration: 720,
    score: 88,
    date: "2024-12-23",
    focusAreas: 1,
    improvement: "+6",
  },
];

/** 녹음 상세 데이터 */
export const mockRecordingsDetail: RecordingDetail[] = [
  {
    id: "1",
    pieceTitle: "F. Chopin Ballade Op.23 No.1",
    duration: 1845,
    score: 84,
    date: "2024-12-30",
    focusAreas: [
      { measure: "23-28", issue: "왼손 아르페지오 불안정", severity: "high" },
      { measure: "88-92", issue: "템포 과속 경향", severity: "high" },
    ],
    improvement: "+3",
    tempo: { average: 172, target: 168, stability: 78 },
    dynamics: { range: "mf-f", consistency: 82 },
    rhythm: { accuracy: 85, notes: "일부 16분음표 불균등" },
    waveform: Array(50).fill(0).map(() => Math.random() * 100),
  },
  {
    id: "2",
    pieceTitle: "F. Chopin Ballade Op.23 No.1",
    duration: 1520,
    score: 81,
    date: "2024-12-29",
    focusAreas: [
      { measure: "23-28", issue: "왼손 아르페지오 불안정", severity: "high" },
      { measure: "56-60", issue: "다이나믹 부족", severity: "medium" },
      { measure: "88-92", issue: "템포 과속 경향", severity: "high" },
    ],
    improvement: "+2",
    tempo: { average: 175, target: 168, stability: 72 },
    dynamics: { range: "mf-f", consistency: 78 },
    rhythm: { accuracy: 82, notes: "16분음표 불균등" },
    waveform: Array(50).fill(0).map(() => Math.random() * 100),
  },
  {
    id: "3",
    pieceTitle: "L. v. Beethoven Sonata Op.13 No.8",
    duration: 2340,
    score: 86,
    date: "2024-12-28",
    focusAreas: [
      { measure: "1-8", issue: "그라베 템포 유지", severity: "medium" },
    ],
    improvement: "+5",
    tempo: { average: 66, target: 66, stability: 88 },
    dynamics: { range: "pp-ff", consistency: 85 },
    rhythm: { accuracy: 89, notes: "점음표 정확" },
    waveform: Array(50).fill(0).map(() => Math.random() * 100),
  },
  {
    id: "4",
    pieceTitle: "C. Debussy Suite Bergamasque No.3",
    duration: 980,
    score: 91,
    date: "2024-12-27",
    focusAreas: [],
    improvement: "+4",
    tempo: { average: 52, target: 52, stability: 92 },
    dynamics: { range: "pp-mp", consistency: 90 },
    rhythm: { accuracy: 93, notes: "루바토 자연스러움" },
    waveform: Array(50).fill(0).map(() => Math.random() * 100),
  },
];

/** 녹음 통계 계산 헬퍼 */
export function getRecordingsStats(recordings: RecordingListItem[]) {
  const totalMinutes = Math.floor(
    recordings.reduce((acc, r) => acc + r.duration, 0) / 60
  );
  const avgScore = Math.round(
    recordings.reduce((acc, r) => acc + r.score, 0) / recordings.length
  );
  return { totalMinutes, avgScore, totalCount: recordings.length };
}

/** ID로 녹음 상세 찾기 */
export function findRecordingById(id: string): RecordingDetail | undefined {
  return mockRecordingsDetail.find((r) => r.id === id);
}
