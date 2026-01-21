"use client";

import { Brain } from "lucide-react";
import { Modal } from "@/components/ui/modal";

interface AIAnalysisConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: () => void;
  onSkip: () => void;
}

export function AIAnalysisConsentModal({
  isOpen,
  onClose,
  onStartAnalysis,
  onSkip,
}: AIAnalysisConsentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      showClose={false}
    >
      <div className="p-6 text-center">
        {/* AI Icon */}
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-10 h-10 text-purple-600" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">AI 분석을 켤까요?</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          녹음된 연주를 AI가 분석하여<br />
          취약 구간과 개선점을 알려드려요
        </p>

        {/* Features */}
        <div className="bg-secondary rounded-xl p-4 mb-6 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-sm">🎯</span>
              </div>
              <p className="text-sm text-foreground">오늘의 집중 구간 표시</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <p className="text-sm text-foreground">템포, 리듬, 다이나믹 분석</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-sm">📝</span>
              </div>
              <p className="text-sm text-foreground">맞춤형 연습 플랜 생성</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={onStartAnalysis}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Brain className="w-5 h-5" />
            AI 분석 시작
          </button>
          <button
            onClick={onSkip}
            className="w-full py-3 text-muted-foreground rounded-xl font-medium hover:bg-accent transition-colors"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
