"use client";

import { Modal } from "@/components/ui/modal";
import type { NewSongForm } from "@/types";

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  newSong: NewSongForm;
  onNewSongChange: (song: NewSongForm) => void;
  onAddSong: () => void;
}

export function AddSongModal({
  isOpen,
  onClose,
  newSong,
  onNewSongChange,
  onAddSong,
}: AddSongModalProps) {
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
            작곡가 *
          </label>
          <input
            type="text"
            placeholder="예: F. Chopin"
            value={newSong.composer}
            onChange={(e) => onNewSongChange({ ...newSong, composer: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Song Type */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            곡 종류 *
          </label>
          <input
            type="text"
            placeholder="예: Etude, Sonata, Ballade"
            value={newSong.songType}
            onChange={(e) => onNewSongChange({ ...newSong, songType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Opus & Number */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Opus
            </label>
            <input
              type="text"
              placeholder="예: Op.10"
              value={newSong.opus}
              onChange={(e) => onNewSongChange({ ...newSong, opus: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              번호
            </label>
            <input
              type="text"
              placeholder="예: 4"
              value={newSong.number}
              onChange={(e) => onNewSongChange({ ...newSong, number: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            연주 시간
          </label>
          <input
            type="text"
            placeholder="예: 5 min"
            value={newSong.duration}
            onChange={(e) => onNewSongChange({ ...newSong, duration: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Preview */}
        {(newSong.composer || newSong.songType) && (
          <div className="bg-secondary/50 rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">미리보기</p>
            <p className="font-semibold text-foreground">
              {newSong.composer} {newSong.songType}
              {newSong.opus ? ` ${newSong.opus}` : ""}
              {newSong.number ? ` No.${newSong.number}` : ""}
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
            disabled={!newSong.composer || !newSong.songType}
            className="flex-1 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            추가하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
