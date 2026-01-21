/**
 * 시간 포맷팅 유틸리티 함수
 */

/**
 * 초 단위를 "X분 Y초" 형식으로 변환
 * @param seconds 초 단위 시간
 * @returns "X분 Y초" 형식 문자열
 * @example formatDuration(125) // "2분 5초"
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}분 ${secs}초`;
}

/**
 * 초 단위를 "MM:SS" 형식으로 변환 (타이머 표시용)
 * @param seconds 초 단위 시간
 * @returns "MM:SS" 형식 문자열
 * @example formatTime(125) // "02:05"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

/**
 * 분 단위 추출
 * @param seconds 초 단위 시간
 * @returns 분 (소수점 없음)
 * @example getMinutes(125) // 2
 */
export function getMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}
