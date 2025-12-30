"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  hasPermission: boolean | null;
  error: string | null;
  totalTime: number;
  practiceTime: number;
  currentVolume: number;
  isSoundDetected: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
}

interface UseAudioRecorderOptions {
  volumeThreshold?: number; // 0-100, minimum volume to count as sound
  minSoundDuration?: number;
}

export function useAudioRecorder(options: UseAudioRecorderOptions = {}) {
  const { volumeThreshold = 10, minSoundDuration = 300 } = options;

  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    hasPermission: null,
    error: null,
    totalTime: 0,
    practiceTime: 0,
    currentVolume: 0,
    isSoundDetected: false,
    audioBlob: null,
    audioUrl: null,
  });

  // Refs for audio handling
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Refs for state tracking (to avoid closure issues)
  const isRecordingRef = useRef(false);
  const isPausedRef = useRef(false);

  // Refs for time tracking
  const totalTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const practiceTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const soundStartTimeRef = useRef<number | null>(null);
  const lastSoundTimeRef = useRef<number>(0);
  const consecutiveSoundCountRef = useRef<number>(0);
  const consecutiveSilenceCountRef = useRef<number>(0);
  const isActuallyPlayingRef = useRef<boolean>(false);

  // Request microphone permission
  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      mediaStreamRef.current = stream;
      setState((prev) => ({ ...prev, hasPermission: true, error: null }));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "마이크 접근 권한이 필요합니다";
      setState((prev) => ({
        ...prev,
        hasPermission: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  // Analyze audio in real-time (uses refs to avoid closure issues)
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !isRecordingRef.current || isPausedRef.current) {
      if (isRecordingRef.current && !isPausedRef.current) {
        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      }
      return;
    }

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);

    // Calculate peak volume (0-100) with amplification
    let maxAmplitude = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const amplitude = Math.abs(dataArray[i] - 128);
      if (amplitude > maxAmplitude) {
        maxAmplitude = amplitude;
      }
    }
    // Amplify by 4x for more visible movement, cap at 100
    const normalizedVolume = Math.min(100, (maxAmplitude / 128) * 100 * 4);

    // Check if volume exceeds threshold
    const rawSoundDetected = normalizedVolume >= volumeThreshold;

    // Simple hysteresis-based detection
    // Need 5 consecutive "loud" frames to turn ON
    // Need 15 consecutive "quiet" frames to turn OFF
    const FRAMES_TO_START = 5;
    const FRAMES_TO_STOP = 15;

    if (rawSoundDetected) {
      consecutiveSoundCountRef.current++;
      consecutiveSilenceCountRef.current = 0;
    } else {
      consecutiveSilenceCountRef.current++;
      consecutiveSoundCountRef.current = 0;
    }

    // State transitions
    if (!isActuallyPlayingRef.current && consecutiveSoundCountRef.current >= FRAMES_TO_START) {
      isActuallyPlayingRef.current = true;
    } else if (isActuallyPlayingRef.current && consecutiveSilenceCountRef.current >= FRAMES_TO_STOP) {
      isActuallyPlayingRef.current = false;
    }

    const isSoundDetected = isActuallyPlayingRef.current;

    setState((prev) => ({
      ...prev,
      currentVolume: normalizedVolume,
      isSoundDetected,
    }));

    // Update sound tracking refs - directly tied to isActuallyPlayingRef
    if (isSoundDetected) {
      if (soundStartTimeRef.current === null) {
        soundStartTimeRef.current = Date.now();
      }
    } else {
      // Immediately reset when not playing
      soundStartTimeRef.current = null;
    }

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  }, [volumeThreshold]);

  // Start recording
  const startRecording = useCallback(async () => {
    if (!mediaStreamRef.current) {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;
    }

    const stream = mediaStreamRef.current;
    if (!stream) return;

    try {
      // Set up AudioContext and Analyser
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.3;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // Set up MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setState((prev) => ({ ...prev, audioBlob: blob, audioUrl: url }));
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);

      // Update refs
      isRecordingRef.current = true;
      isPausedRef.current = false;
      consecutiveSoundCountRef.current = 0;
      consecutiveSilenceCountRef.current = 0;
      isActuallyPlayingRef.current = false;
      soundStartTimeRef.current = null;
      lastSoundTimeRef.current = 0;

      // Start time tracking
      const startTime = Date.now();
      let accumulatedPracticeTime = 0;

      totalTimeIntervalRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          totalTime: Math.floor((Date.now() - startTime) / 1000),
        }));
      }, 1000);

      practiceTimeIntervalRef.current = setInterval(() => {
        // Only count time when actually playing (confirmed by analyzeAudio)
        if (isActuallyPlayingRef.current) {
          accumulatedPracticeTime += 0.1;
          setState((prev) => ({
            ...prev,
            practiceTime: Math.floor(accumulatedPracticeTime),
          }));
        }
      }, 100);

      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        error: null,
        totalTime: 0,
        practiceTime: 0,
        audioBlob: null,
        audioUrl: null,
      }));

      // Start audio analysis
      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "녹음을 시작할 수 없습니다";
      setState((prev) => ({ ...prev, error: errorMessage }));
    }
  }, [requestPermission, analyzeAudio, minSoundDuration]);

  // Pause recording
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecordingRef.current && !isPausedRef.current) {
      mediaRecorderRef.current.pause();
      isPausedRef.current = true;

      if (totalTimeIntervalRef.current) clearInterval(totalTimeIntervalRef.current);
      if (practiceTimeIntervalRef.current) clearInterval(practiceTimeIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      setState((prev) => ({ ...prev, isPaused: true }));
    }
  }, []);

  // Resume recording
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecordingRef.current && isPausedRef.current) {
      mediaRecorderRef.current.resume();
      isPausedRef.current = false;

      setState((prev) => {
        const resumeTime = Date.now();
        const previousTotal = prev.totalTime;
        let accumulatedPracticeTime = prev.practiceTime;

        totalTimeIntervalRef.current = setInterval(() => {
          setState((p) => ({
            ...p,
            totalTime: previousTotal + Math.floor((Date.now() - resumeTime) / 1000),
          }));
        }, 1000);

        practiceTimeIntervalRef.current = setInterval(() => {
          if (soundStartTimeRef.current !== null) {
            accumulatedPracticeTime += 0.1;
            setState((p) => ({
              ...p,
              practiceTime: Math.floor(accumulatedPracticeTime),
            }));
          }
        }, 100);

        return { ...prev, isPaused: false };
      });

      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    }
  }, [analyzeAudio]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      mediaRecorderRef.current.stop();
      isRecordingRef.current = false;
      isPausedRef.current = false;

      if (totalTimeIntervalRef.current) clearInterval(totalTimeIntervalRef.current);
      if (practiceTimeIntervalRef.current) clearInterval(practiceTimeIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;

      setState((prev) => ({
        ...prev,
        isRecording: false,
        isPaused: false,
        isSoundDetected: false,
        currentVolume: 0,
      }));
    }
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setState((prev) => {
      if (prev.audioUrl) URL.revokeObjectURL(prev.audioUrl);
      return {
        ...prev,
        totalTime: 0,
        practiceTime: 0,
        audioBlob: null,
        audioUrl: null,
      };
    });
    chunksRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (totalTimeIntervalRef.current) clearInterval(totalTimeIntervalRef.current);
      if (practiceTimeIntervalRef.current) clearInterval(practiceTimeIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
    };
  }, []);

  return {
    ...state,
    requestPermission,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    reset,
  };
}
