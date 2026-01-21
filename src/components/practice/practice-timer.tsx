"use client";

import { Clock, Sparkles, Volume2, MicOff } from "lucide-react";
import { formatTime } from "@/lib/format";

interface PracticeTimerProps {
  practiceTime: number;
  totalTime: number;
  isRecording: boolean;
  isPaused: boolean;
  isSoundDetected: boolean;
  isPianoDetected: boolean;
  currentVolume: number;
  tip: string;
}

export function PracticeTimer({
  practiceTime,
  totalTime,
  isRecording,
  isPaused,
  isSoundDetected,
  isPianoDetected,
  currentVolume,
  tip,
}: PracticeTimerProps) {
  const practiceRatio = totalTime > 0 ? Math.round((practiceTime / totalTime) * 100) : 0;

  // Generate waveform bars based on volume
  const generateWaveformBars = () => {
    const bars = [];
    const baseHeight = isPianoDetected ? 30 : 15;
    const volumeMultiplier = currentVolume / 100;

    for (let i = 0; i < 24; i++) {
      const randomFactor = 0.5 + Math.random() * 0.5;
      const height = isPaused
        ? 15
        : baseHeight + volumeMultiplier * 60 * randomFactor;
      bars.push(height);
    }
    return bars;
  };

  const waveformHeights = isRecording ? generateWaveformBars() : [];

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm mb-6 relative overflow-hidden">
      <div className="text-center relative z-10">
        {/* Main Timer - Practice Time */}
        <div className="text-6xl font-bold text-foreground font-mono mb-1 tracking-tighter">
          {formatTime(practiceTime)}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="w-4 h-4" />
          <span>순연습시간</span>
          {isRecording && (
            <span
              className={`ml-2 flex items-center gap-1 ${
                isPianoDetected ? "text-green-500" : isSoundDetected ? "text-yellow-500" : "text-muted-foreground"
              }`}
            >
              {isPianoDetected ? (
                <Volume2 className="w-3 h-3" />
              ) : (
                <MicOff className="w-3 h-3" />
              )}
            </span>
          )}
        </div>

        {/* Secondary Timer - Total Time */}
        {isRecording && (
          <div className="text-sm text-muted-foreground mb-6">
            총 시간: {formatTime(totalTime)} ({practiceRatio}% 연습)
          </div>
        )}

        {/* Dynamic Content Area */}
        <div className="h-24 flex items-center justify-center">
          {isRecording ? (
            <div className="flex items-end gap-1.5 h-16 w-full justify-center px-4">
              {waveformHeights.map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isPianoDetected ? "bg-green-500" : isSoundDetected ? "bg-yellow-500" : "bg-primary"
                  }`}
                  style={{
                    height: `${height}%`,
                    opacity: isPaused ? 0.3 : 0.6 + (height / 100) * 0.4,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-secondary rounded-xl p-4 w-full flex items-center gap-3 animate-fade-in">
              <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-sm text-muted-foreground font-medium text-left leading-snug text-pretty">
                &quot;{tip}&quot;
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
    </div>
  );
}
