"use client";

import { useState, useRef, useEffect } from "react";
import { SceneType, RecordingState } from "@/lib/types";
import { sceneConfigs, sceneGuides } from "@/lib/data";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";

interface InterviewGuideProps {
  scene: SceneType;
  onSubmit: (text: string) => void;
  onBack: () => void;
  isGenerating: boolean;
}

export default function InterviewGuide({
  scene,
  onSubmit,
  onBack,
  isGenerating,
}: InterviewGuideProps) {
  const [text, setText] = useState("");
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mockTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const {
    transcript: speechTranscript,
    interimTranscript,
    supported: speechSupported,
    startRecording,
    stopRecording,
    isRecording,
  } = useSpeechRecognition();

  const config = sceneConfigs.find((s) => s.type === scene)!;
  const guide = sceneGuides[scene];

  useEffect(() => {
    if (!isRecording && speechTranscript) {
      setText((prev) => (prev + speechTranscript).trim());
      setRecordingState("transcribed");
    }
  }, [isRecording, speechTranscript]);

  useEffect(() => {
    return () => {
      if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
    };
  }, []);

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
      setRecordingState("transcribed");
      return;
    }

    if (!speechSupported) {
      setRecordingState("recording");
      mockTimerRef.current = setTimeout(() => {
        setText(config.mockText);
        setRecordingState("transcribed");
        textareaRef.current?.focus();
      }, 1500);
      return;
    }

    setRecordingState("recording");
    startRecording();
  };

  const handleSubmit = () => {
    if (text.trim().length < 20) {
      setError("内容有点少，可以再多说几句，比如当时发生了什么、你有什么感受。");
      return;
    }
    setError("");
    if (isRecording) stopRecording();
    onSubmit(text);
  };

  const voiceLabel: Record<RecordingState, string> = {
    idle: speechSupported ? "按住说话" : "填入示例文字",
    recording: "正在听……",
    transcribed: "已转文字，可编辑",
  };

  const displayText = isRecording ? text + interimTranscript : text;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="sticky-header sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => { if (isRecording) stopRecording(); onBack(); }}
            className="font-typewriter text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 text-xs tracking-wide uppercase"
          >
            ← 返回
          </button>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-xs border border-black/5`}>
              {config.emoji}
            </span>
            <span className="font-typewriter text-xs tracking-wide">{scene}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Guide (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="font-serif-display text-2xl font-light text-[var(--foreground)] mb-1 animate-reveal-up" style={{ animationDelay: "0ms", opacity: 0, animationFillMode: "forwards" }}>
              说说你的<span className="italic">故事</span>
            </h2>
            <p className="font-typewriter text-[11px] text-[var(--muted)] mb-5 tracking-wide animate-fade-in" style={{ animationDelay: "150ms", opacity: 0, animationFillMode: "forwards" }}>
              不用每个都回答，挑想说的说。
            </p>
            <div className="space-y-2.5">
              {guide.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="flex items-start gap-2.5 animate-slide-up"
                  style={{ animationDelay: `${200 + i * 80}ms`, animationFillMode: "both" }}
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] font-typewriter text-[10px] flex items-center justify-center mt-0.5 transition-all duration-300 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    {q.question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Input (3 cols) */}
          <div className="lg:col-span-3 space-y-3 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={displayText}
                onChange={(e) => { setText(e.target.value); setError(""); }}
                placeholder="像发语音给朋友一样随便说，比如：今天下班路上突然觉得一个人走也挺舒服的……"
                className={`w-full h-52 p-4 rounded-xl text-sm leading-relaxed resize-none max-w-[75ch] transition-all duration-300 ${
                  isRecording
                    ? "input-base border-[var(--accent)] ring-[3px] ring-[rgba(198,93,59,0.12)]"
                    : "input-base"
                }`}
              />
              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[var(--accent-light)] px-2.5 py-1 rounded-full border border-[var(--accent)]/20 animate-fade-scale">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                  <span className="font-typewriter text-[10px] text-[var(--accent)] tracking-wide">录音中</span>
                </div>
              )}
            </div>

            {isRecording && interimTranscript && (
              <p className="font-typewriter text-[10px] text-[var(--muted)] px-1 animate-fade-in">{interimTranscript}</p>
            )}

            {error && <p className="text-sm text-[var(--accent)] animate-fade-in">{error}</p>}

            {/* Voice toggle */}
            <button
              onClick={handleVoiceToggle}
              className={`w-full py-2.5 rounded-lg font-typewriter text-xs font-medium transition-all duration-300 border ${
                isRecording
                  ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] animate-pulse-soft"
                  : recordingState === "transcribed"
                  ? "border-[var(--color-warm-gray)] bg-[var(--color-paper)] text-[var(--muted)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent-light)]/50"
              }`}
            >
              {isRecording ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="flex items-center gap-[3px]">
                    <span className="w-[3px] bg-[var(--accent)] rounded-full recording-bar" />
                    <span className="w-[3px] bg-[var(--accent)] rounded-full recording-bar" />
                    <span className="w-[3px] bg-[var(--accent)] rounded-full recording-bar" />
                    <span className="w-[3px] bg-[var(--accent)] rounded-full recording-bar" />
                    <span className="w-[3px] bg-[var(--accent)] rounded-full recording-bar" />
                  </span>
                  点击停止
                </span>
              ) : voiceLabel[recordingState]}
            </button>
            <p className="font-typewriter text-[10px] text-[var(--muted)] opacity-50 text-center tracking-wide">
              {speechSupported ? "浏览器语音识别 · 也可以直接打字" : "浏览器不支持语音 · 请用 Chrome"}
            </p>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isGenerating || !text.trim()}
              className={`w-full py-3 rounded-lg font-medium text-sm font-typewriter tracking-wide transition-all duration-300 ${
                isGenerating ? "btn-loading" : "btn-primary"
              }`}
            >
              {isGenerating ? "AI 正在整理……" : "下一步：让 AI 整理内容"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
