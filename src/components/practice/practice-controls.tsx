"use client";

import { Play, Pause, Square, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PracticeControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  hasPermission: boolean | null;
  isCalibrating: boolean;
  isSoundDetected: boolean;
  isPianoDetected: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onRequestPermission: () => void;
}

export function PracticeControls({
  isRecording,
  isPaused,
  hasPermission,
  isCalibrating,
  isSoundDetected,
  isPianoDetected,
  onStart,
  onPause,
  onResume,
  onStop,
  onRequestPermission,
}: PracticeControlsProps) {
  return (
    <>
      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isRecording ? (
          <Button
            onClick={onStart}
            disabled={hasPermission === false}
            className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 disabled:opacity-50"
          >
            <Play className="w-8 h-8 text-white" fill="white" />
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => (isPaused ? onResume() : onPause())}
              className="w-16 h-16 rounded-full"
            >
              {isPaused ? (
                <Play className="w-6 h-6" fill="currentColor" />
              ) : (
                <Pause className="w-6 h-6" />
              )}
            </Button>
            <Button
              onClick={onStop}
              className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90"
            >
              <Square className="w-6 h-6 text-white" fill="white" />
            </Button>
          </>
        )}
      </div>

      {isRecording && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          {isPaused ? (
            "일시정지됨"
          ) : isCalibrating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              환경 소음 측정 중... 잠시만 기다려주세요
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPianoDetected ? "bg-green-500" : isSoundDetected ? "bg-yellow-500" : "bg-gray-400"}`} />
              {isPianoDetected ? "🎹 피아노 연주 감지" : isSoundDetected ? "소리 감지 (피아노 아님)" : "대기 중"}
            </span>
          )}
        </p>
      )}

      {/* Permission Request Button */}
      {hasPermission === false && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={onRequestPermission}>
            <Mic className="w-4 h-4 mr-2" />
            마이크 권한 요청
          </Button>
        </div>
      )}
    </>
  );
}
