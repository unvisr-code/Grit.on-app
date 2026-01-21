"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAudioRecorder } from "@/hooks";
import { savePracticeSession } from "@/lib/db";
import { mockSongs as initialSongs, getRandomTip, recentRecordings } from "@/data";
import type { PracticeType, Song, NewSongForm } from "@/types";
import {
  PracticeTypeSelector,
  PieceSelector,
  PracticeTimer,
  VolumeMeter,
  PracticeControls,
  RecentRecordingsList,
  SongSelectionModal,
  AddSongModal,
  PracticeCompleteModal,
  AIAnalysisConsentModal,
} from "@/components/practice";

interface CompletedSession {
  totalTime: number;
  practiceTime: number;
  practiceType: PracticeType;
}

export default function PracticePage() {
  const router = useRouter();
  const [tip, setTip] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song>(initialSongs[0]);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isAIAnalysisModalOpen, setIsAIAnalysisModalOpen] = useState(false);
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [practiceType, setPracticeType] = useState<PracticeType>("runthrough");
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSong, setNewSong] = useState<NewSongForm>({
    composer: "",
    songType: "",
    opus: "",
    number: "",
    duration: "",
  });
  const [completedSession, setCompletedSession] = useState<CompletedSession | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Audio recorder hook
  const {
    isRecording,
    isPaused,
    hasPermission,
    error,
    totalTime,
    practiceTime,
    currentVolume,
    currentDecibel,
    isSoundDetected,
    isPianoDetected,
    audioBlob,
    noiseFloor,
    isCalibrating,
    requestPermission,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    reset,
  } = useAudioRecorder({
    decibelThreshold: 65,
    minSoundDuration: 200,
    calibrationDuration: 1000,
  });

  useEffect(() => {
    setTip(getRandomTip());
  }, []);

  useEffect(() => {
    if (hasPermission === null) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleStartRecording = useCallback(async () => {
    setSessionStartTime(new Date());
    await startRecording();
  }, [startRecording]);

  const handleStopRecording = useCallback(async () => {
    stopRecording();

    if (sessionStartTime) {
      const session = {
        pieceId: selectedSong.id,
        pieceName: selectedSong.title,
        startTime: sessionStartTime,
        endTime: new Date(),
        totalTime,
        practiceTime,
        audioBlob: audioBlob || undefined,
        synced: false,
        practiceType,
        label: practiceType === "partial" || practiceType === "routine" ? "부분 연습" : "런스루",
      };

      try {
        await savePracticeSession(session);
      } catch (err) {
        console.error("Failed to save session:", err);
      }
    }

    setCompletedSession({ totalTime, practiceTime, practiceType });

    if (practiceType === "runthrough") {
      setIsAIAnalysisModalOpen(true);
    } else {
      setIsCompleteModalOpen(true);
    }
  }, [
    stopRecording,
    sessionStartTime,
    selectedSong,
    totalTime,
    practiceTime,
    audioBlob,
    practiceType,
  ]);

  const handleCloseCompleteModal = () => {
    setIsCompleteModalOpen(false);
    setCompletedSession(null);
    reset();
  };

  const handleViewRecording = () => {
    setIsCompleteModalOpen(false);
    router.push("/recordings/1");
  };

  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
    setIsSongModalOpen(false);
  };

  const handleAddSong = () => {
    if (!newSong.composer || !newSong.songType) return;

    const title = `${newSong.composer} ${newSong.songType}${newSong.opus ? ` ${newSong.opus}` : ""}${newSong.number ? ` No.${newSong.number}` : ""}`;

    const newSongData: Song = {
      id: String(songs.length + 1),
      title,
      duration: newSong.duration || "5 min",
      lastPracticed: "New",
    };

    setSongs([newSongData, ...songs]);
    setSelectedSong(newSongData);
    setNewSong({
      composer: "",
      songType: "",
      opus: "",
      number: "",
      duration: "",
    });
    setIsAddSongModalOpen(false);
    setIsSongModalOpen(false);
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground">연습 세션</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {hasPermission === false
            ? "마이크 권한이 필요합니다"
            : "녹음 버튼을 눌러 연습을 시작하세요"}
        </p>
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>

      {/* Practice Type Selection */}
      {!isRecording && (
        <PracticeTypeSelector
          selectedType={practiceType}
          onSelectType={setPracticeType}
        />
      )}

      {/* Piece Selection */}
      <PieceSelector
        selectedSong={selectedSong}
        isRecording={isRecording}
        onClick={() => setIsSongModalOpen(true)}
      />

      {/* Timer Display */}
      <PracticeTimer
        practiceTime={practiceTime}
        totalTime={totalTime}
        isRecording={isRecording}
        isPaused={isPaused}
        isSoundDetected={isSoundDetected}
        isPianoDetected={isPianoDetected}
        currentVolume={currentVolume}
        tip={tip}
      />

      {/* Volume Meter */}
      {isRecording && !isPaused && (
        <VolumeMeter
          currentDecibel={currentDecibel}
          noiseFloor={noiseFloor}
          isCalibrating={isCalibrating}
          isSoundDetected={isSoundDetected}
          isPianoDetected={isPianoDetected}
        />
      )}

      {/* Controls */}
      <PracticeControls
        isRecording={isRecording}
        isPaused={isPaused}
        hasPermission={hasPermission}
        isCalibrating={isCalibrating}
        isSoundDetected={isSoundDetected}
        isPianoDetected={isPianoDetected}
        onStart={handleStartRecording}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={handleStopRecording}
        onRequestPermission={requestPermission}
      />

      {/* Recent Recordings Section */}
      {!isRecording && (
        <RecentRecordingsList recordings={recentRecordings} />
      )}

      {/* Modals */}
      <SongSelectionModal
        isOpen={isSongModalOpen}
        onClose={() => setIsSongModalOpen(false)}
        songs={songs}
        selectedSong={selectedSong}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSong={handleSelectSong}
        onAddSongClick={() => setIsAddSongModalOpen(true)}
      />

      <AddSongModal
        isOpen={isAddSongModalOpen}
        onClose={() => setIsAddSongModalOpen(false)}
        newSong={newSong}
        onNewSongChange={setNewSong}
        onAddSong={handleAddSong}
      />

      <PracticeCompleteModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseCompleteModal}
        selectedSong={selectedSong}
        completedSession={completedSession}
        onViewRecording={handleViewRecording}
      />

      <AIAnalysisConsentModal
        isOpen={isAIAnalysisModalOpen}
        onClose={() => {
          setIsAIAnalysisModalOpen(false);
          setIsCompleteModalOpen(true);
        }}
        onStartAnalysis={() => {
          setIsAIAnalysisModalOpen(false);
          router.push("/analysis");
        }}
        onSkip={() => {
          setIsAIAnalysisModalOpen(false);
          setIsCompleteModalOpen(true);
        }}
      />
    </div>
  );
}
