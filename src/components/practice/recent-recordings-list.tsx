"use client";

import Link from "next/link";
import { Music, Clock } from "lucide-react";
import type { RecentRecording } from "@/types";

interface RecentRecordingsListProps {
  recordings: RecentRecording[];
}

export function RecentRecordingsList({ recordings }: RecentRecordingsListProps) {
  return (
    <div className="mt-8 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">최근 녹음</h3>
        <Link href="/practice/recordings" className="text-xs text-primary font-medium">
          전체 보기 &rarr;
        </Link>
      </div>
      <div className="space-y-2">
        {recordings.map((recording) => (
          <Link
            key={recording.id}
            href={`/practice/recordings/${recording.id}`}
            className="block bg-card rounded-xl p-3 border border-border hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{recording.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recording.duration}
                  </span>
                  <span className="text-xs text-primary font-medium">~{recording.score}점</span>
                  {recording.focusAreas > 0 && (
                    <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                      {recording.focusAreas}개 집중구간
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{recording.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
