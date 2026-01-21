// Practice 관련 타입 정의

/** 연습 유형 */
export type PracticeType = "partial" | "routine" | "runthrough";

/** 연습 유형 정보 */
export interface PracticeTypeInfo {
  id: PracticeType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: "blue" | "green" | "purple";
}

/** 곡 정보 */
export interface Song {
  id: string;
  title: string;
  duration: string;
  lastPracticed: string;
}

/** 새 곡 추가 폼 데이터 */
export interface NewSongForm {
  composer: string;
  songType: string;
  opus: string;
  number: string;
  duration: string;
}

/** 완료된 연습 세션 정보 */
export interface CompletedSession {
  totalTime: number;
  practiceTime: number;
  practiceType: PracticeType;
}

/** 최근 녹음 항목 (연습 페이지용) */
export interface RecentRecording {
  id: string;
  title: string;
  duration: string;
  score: number;
  date: string;
  focusAreas: number;
}
