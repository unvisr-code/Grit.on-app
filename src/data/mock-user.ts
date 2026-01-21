import type { User, Stats } from "@/types";

/** 사용자 정보 */
export const mockUser: User = {
  name: "지민",
  instrument: "Piano",
  level: "Intermediate",
  currentPiece: "Chopin Ballade No. 1",
};

/** 통계 정보 */
export const mockStats: Stats = {
  totalHours: 127,
  weekSessions: 12,
  streakDays: 23,
  todayMinutes: 45,
  dailyGoal: 60,
  weeklyGoal: 420,
  weeklyProgress: 285,
  averageScore: 82,
  totalRecordings: 47,
};

/** AI 분석 완료 여부 */
export const hasAIAnalysis = true;

/** 인사말 가져오기 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "좋은 아침이에요";
  if (hour < 18) return "좋은 오후에요";
  return "좋은 저녁이에요";
}
