// Recording 관련 타입 정의

/** 집중 연습 구간 */
export interface FocusArea {
  measure: string;
  issue: string;
  severity: "high" | "medium" | "low";
}

/** 분석 페이지용 집중 구간 (마디 번호 기반) */
export interface AnalysisFocusArea {
  measure: number;
  type: "high" | "mid" | "low";
  issue: string;
}

/** 템포 분석 */
export interface TempoAnalysis {
  average: number;
  target: number;
  stability: number;
}

/** 다이나믹 분석 */
export interface DynamicsAnalysis {
  range: string;
  consistency: number;
}

/** 리듬 분석 */
export interface RhythmAnalysis {
  accuracy: number;
  notes: string;
}

/** 녹음 기본 정보 (리스트 표시용) */
export interface RecordingListItem {
  id: string;
  pieceTitle: string;
  duration: number;
  score: number;
  date: string;
  focusAreas: number;
  improvement: string;
}

/** 녹음 상세 정보 */
export interface RecordingDetail extends Omit<RecordingListItem, "focusAreas"> {
  focusAreas: FocusArea[];
  tempo: TempoAnalysis;
  dynamics: DynamicsAnalysis;
  rhythm: RhythmAnalysis;
  waveform: number[];
}

/** 전체 분석 정보 */
export interface OverallAnalysis {
  currentPiece: string;
  totalSessions: number;
  averageScore: number;
  improvement: string;
  weakAreas: number;
  strongAreas: number;
  recentTrend: string;
  recommendations: string[];
}
