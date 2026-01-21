"use client";

import { Music, Trophy } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { formatTime } from "@/lib/format";
import type { PracticeType, Song } from "@/types";

interface CompletedSession {
  totalTime: number;
  practiceTime: number;
  practiceType: PracticeType;
}

interface PracticeCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSong: Song;
  completedSession: CompletedSession | null;
  onViewRecording: () => void;
}

export function PracticeCompleteModal({
  isOpen,
  onClose,
  selectedSong,
  completedSession,
  onViewRecording,
}: PracticeCompleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      showClose={false}
    >
      <div className="p-6 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-green-600" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-1">연습 완료!</h3>
        <p className="text-muted-foreground mb-6">
          오늘도 훌륭한 연습이었어요
        </p>

        {/* Stats */}
        <div className="bg-secondary rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Music className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">
              {selectedSong.title}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {completedSession ? formatTime(completedSession.totalTime) : "00:00"}
              </div>
              <div className="text-xs text-muted-foreground">총 시간</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {completedSession ? formatTime(completedSession.practiceTime) : "00:00"}
              </div>
              <div className="text-xs text-muted-foreground">순연습</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                {completedSession && completedSession.totalTime > 0
                  ? Math.round(
                      (completedSession.practiceTime /
                        completedSession.totalTime) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="text-xs text-muted-foreground">집중도</div>
            </div>
          </div>
        </div>

        {/* Encouragement based on practice ratio */}
        {completedSession && (
          <div className="bg-primary/5 rounded-xl p-3 mb-6">
            <p className="text-sm text-primary">
              {completedSession.totalTime > 0 &&
              completedSession.practiceTime / completedSession.totalTime >= 0.7
                ? "🎉 훌륭해요! 집중력이 대단합니다!"
                : completedSession.totalTime > 0 &&
                  completedSession.practiceTime / completedSession.totalTime >= 0.5
                ? "👍 좋은 연습이었어요! 조금 더 집중해볼까요?"
                : "💪 꾸준히 연습하면 더 좋아질 거예요!"}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          {completedSession?.practiceType === "runthrough" && (
            <button
              onClick={onViewRecording}
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              분석 결과 보기
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 text-muted-foreground rounded-xl font-medium hover:bg-accent transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}
