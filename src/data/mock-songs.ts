import type { Song, RecentRecording } from "@/types";

/** 연습곡 목록 */
export const mockSongs: Song[] = [
  {
    id: "1",
    title: "F. Chopin Ballade Op.23 No.1",
    duration: "9 min",
    lastPracticed: "Today",
  },
  {
    id: "2",
    title: "L. v. Beethoven Sonata Op.13 No.8",
    duration: "18 min",
    lastPracticed: "Yesterday",
  },
  {
    id: "3",
    title: "C. Debussy Suite Bergamasque No.3",
    duration: "5 min",
    lastPracticed: "3 days ago",
  },
  {
    id: "4",
    title: "F. Liszt Etude S.141 No.3",
    duration: "5 min",
    lastPracticed: "1 week ago",
  },
  {
    id: "5",
    title: "F. Chopin Fantaisie-Impromptu Op.66",
    duration: "5 min",
    lastPracticed: "2 weeks ago",
  },
];

/** 연습 팁 목록 */
export const PRACTICE_TIPS = [
  "천천히 연습하는 것이 가장 빠른 길입니다.",
  "어려운 부분은 리듬을 바꿔서 연습해보세요.",
  "한 손씩 따로 연습하면 더 명확해집니다.",
  "녹음해서 자신의 연주를 객관적으로 들어보세요.",
  "긴장을 풀고 호흡에 집중하세요.",
  "메트로놈을 활용하여 정확한 템포를 유지하세요.",
  "같은 구간을 5번 연속 완벽하게 치면 다음으로 넘어가세요.",
  "손목과 팔의 힘을 빼고 자연스럽게 연주하세요.",
  "어려운 패시지는 점점 빠르게 연습해보세요.",
  "눈을 감고 연주해보면 청각에 더 집중할 수 있어요.",
  "프레이징을 노래하듯이 연주해보세요.",
  "페달 없이 먼저 완벽하게 연습하세요.",
];

/** 최근 녹음 (연습 페이지용) */
export const recentRecordings: RecentRecording[] = [
  { id: "1", title: "F. Chopin Ballade Op.23 No.1", duration: "30:45", score: 84, date: "오늘", focusAreas: 2 },
  { id: "2", title: "F. Chopin Ballade Op.23 No.1", duration: "25:20", score: 81, date: "어제", focusAreas: 3 },
  { id: "3", title: "L. v. Beethoven Sonata Op.13 No.8", duration: "39:00", score: 86, date: "2일 전", focusAreas: 1 },
];

/** 랜덤 팁 가져오기 */
export function getRandomTip(): string {
  return PRACTICE_TIPS[Math.floor(Math.random() * PRACTICE_TIPS.length)];
}
