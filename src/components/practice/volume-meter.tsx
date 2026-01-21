"use client";

import { Mic } from "lucide-react";

interface VolumeMeterProps {
  currentDecibel: number;
  noiseFloor: number;
  isCalibrating: boolean;
  isSoundDetected: boolean;
  isPianoDetected: boolean;
}

export function VolumeMeter({
  currentDecibel,
  noiseFloor,
  isCalibrating,
  isSoundDetected,
  isPianoDetected,
}: VolumeMeterProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">입력 레벨</span>
        </div>
        <div className="flex items-center gap-3">
          {!isCalibrating && (
            <span className={`text-xs font-mono ${isPianoDetected ? "text-green-600 font-semibold" : "text-muted-foreground"}`}>
              {currentDecibel}dB
            </span>
          )}
          {!isCalibrating && noiseFloor > 0 && (
            <span className="text-[10px] text-muted-foreground">
              기준: {Math.round(noiseFloor)}dB
            </span>
          )}
        </div>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
        {/* Threshold indicators */}
        {!isCalibrating && (
          <>
            {/* 노이즈 플로어 */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gray-400/50 z-10"
              style={{ left: `${(noiseFloor / 100) * 100}%` }}
            />
            {/* 피아노 임계값 (65dB) */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-green-500/50 z-10"
              style={{ left: `${(65 / 100) * 100}%` }}
            />
          </>
        )}
        {/* Volume bar */}
        <div
          className={`h-full rounded-full transition-all duration-100 ${
            isCalibrating
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
              : isPianoDetected
                ? "bg-gradient-to-r from-green-400 to-green-500"
                : isSoundDetected
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                  : "bg-gradient-to-r from-primary/50 to-primary"
          }`}
          style={{ width: `${(currentDecibel / 100) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {isCalibrating ? (
          <p className="text-[10px] text-yellow-600">
            조용히 기다려주세요. 환경 소음을 측정하고 있습니다...
          </p>
        ) : (
          <>
            <span className="text-[10px] text-muted-foreground">0dB</span>
            <span className="text-[10px] text-green-600">65dB (피아노)</span>
            <span className="text-[10px] text-muted-foreground">100dB</span>
          </>
        )}
      </div>
    </div>
  );
}
