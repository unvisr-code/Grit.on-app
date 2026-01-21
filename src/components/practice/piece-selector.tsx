"use client";

import { Music, ChevronRight } from "lucide-react";
import type { Song } from "@/types";

interface PieceSelectorProps {
  selectedSong: Song;
  isRecording: boolean;
  onClick: () => void;
}

export function PieceSelector({
  selectedSong,
  isRecording,
  onClick,
}: PieceSelectorProps) {
  return (
    <div
      onClick={() => !isRecording && onClick()}
      className={`bg-card rounded-xl p-4 border border-border shadow-sm mb-6 transition-transform cursor-pointer ${
        !isRecording ? "active:scale-[0.99]" : "opacity-60"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Music className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-card-foreground">
            {selectedSong.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {selectedSong.duration} · {selectedSong.lastPracticed}
          </p>
        </div>
        {!isRecording && (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
