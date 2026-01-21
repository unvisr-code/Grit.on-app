import type { AnalysisFocusArea, OverallAnalysis } from "@/types";

/** 분석 페이지용 집중 구간 */
export const mockFocusAreas: AnalysisFocusArea[] = [
  { measure: 3, type: "high", issue: "왼손 아르페지오 불안정" },
  { measure: 6, type: "high", issue: "코다 진입부 템포 불안정" },
  { measure: 7, type: "mid", issue: "다이나믹 부족" },
  { measure: 9, type: "low", issue: "페달링 불균형" },
  { measure: 10, type: "low", issue: "왼손 베이스 약함" },
  { measure: 12, type: "mid", issue: "리듬 불안정" },
  { measure: 16, type: "mid", issue: "프레이징 끊김" },
  { measure: 19, type: "high", issue: "템포 과속 경향" },
  { measure: 23, type: "mid", issue: "아르페지오 불균등" },
  { measure: 26, type: "low", issue: "페달 과다 사용" },
  { measure: 30, type: "high", issue: "코다 진입 실수" },
];

/** 전체 분석 정보 */
export const mockOverallAnalysis: OverallAnalysis = {
  currentPiece: "F. Chopin Ballade Op.23 No.1",
  totalSessions: 23,
  averageScore: 82,
  improvement: "+12",
  weakAreas: 4,
  strongAreas: 8,
  recentTrend: "상승",
  recommendations: [
    "23-28마디 코다 진입부에서 왼손 아르페지오 연습에 집중하세요",
    "88-92마디 프레스토 구간의 템포를 메트로놈으로 제어하세요",
    "다이나믹 범위를 pp에서 ff까지 더 넓게 사용해보세요",
  ],
};
