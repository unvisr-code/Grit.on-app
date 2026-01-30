"use client";

import { Modal } from "@/components/ui/modal";

interface NewSongData {
  composer: string;
  title: string;
}

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  newSong: NewSongData;
  onNewSongChange: (song: NewSongData) => void;
  onAddSong: () => void;
}

export function AddSongModal({
  isOpen,
  onClose,
  newSong,
  onNewSongChange,
  onAddSong,
}: AddSongModalProps) {
  const isValid = newSong.composer.trim().length >= 2 && newSong.title.trim().length >= 2;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="새 곡 추가"
    >
      <div className="p-4 space-y-4">
        {/* Composer */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            작곡가
          </label>
          <input
            type="text"
            placeholder="예: F. Chopin"
            value={newSong.composer}
            onChange={(e) => onNewSongChange({ ...newSong, composer: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
        </div>

        {/* Song Title */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            곡 이름
          </label>
          <input
            type="text"
            placeholder="예: Ballade Op.23 No.1"
            value={newSong.title}
            onChange={(e) => onNewSongChange({ ...newSong, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Preview */}
        {isValid && (
          <div className="bg-secondary/50 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">미리보기</p>
            <p className="font-semibold text-foreground">
              {newSong.composer} {newSong.title}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-accent transition-colors"
          >
            취소
          </button>
          <button
            onClick={onAddSong}
            disabled={!isValid}
            className="flex-1 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            추가하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
