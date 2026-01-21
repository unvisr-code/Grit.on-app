"use client";

import Link from "next/link";
import { Music, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { formatDuration } from "@/lib/format";
import { mockRecordingsList, getRecordingsStats } from "@/data";

const { totalMinutes, avgScore } = getRecordingsStats(mockRecordingsList);

export default function RecordingsPage() {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">녹음 기록</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          연습 녹음과 AI 분석 결과를 확인하세요
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {mockRecordingsList.length}
          </div>
          <div className="text-xs text-gray-500">총 녹음</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-primary">{avgScore}</div>
          <div className="text-xs text-gray-500">평균 점수</div>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-gray-900">{totalMinutes}</div>
          <div className="text-xs text-gray-500">총 분</div>
        </div>
      </div>

      {/* Recordings List */}
      <div className="space-y-3">
        {mockRecordingsList.map((recording) => (
          <Link
            key={recording.id}
            href={`/recordings/${recording.id}`}
            className="block bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all active:scale-[0.99]"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 truncate">
                  {recording.pieceTitle}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3" />
                    {formatDuration(recording.duration)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary font-bold bg-primary/5 px-2 py-1 rounded-md">
                    <TrendingUp className="w-3 h-3" />
                    {recording.score}점
                  </div>
                  {recording.focusAreas > 0 && (
                    <div className="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-md">
                      {recording.focusAreas}개 집중구간
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <div className="text-xs text-slate-400">{recording.date}</div>
                <ChevronRight className="w-4 h-4 text-gray-400 mt-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
