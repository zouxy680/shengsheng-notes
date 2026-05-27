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

  const {
    status: speechStatus,
    transcript: speechTranscript,
    interimTranscript,
    supported: speechSupported,
    startRecording,
    stopRecording,
    isRecording,
  } = useSpeechRecognition();

  const config = sceneConfigs.find((s) => s.type === scene)!;
  const guide = sceneGuides[scene];

  // Sync speech transcript to text when speech finishes
  useEffect(() => {
    if (!isRecording && speechTranscript) {
      setText((prev) => {
        const combined = prev + speechTranscript;
        return combined.trim();
      });
      setRecordingState("transcribed");
    }
  }, [isRecording, speechTranscript]);

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
      setRecordingState("transcribed");
      return;
    }

    if (!speechSupported) {
      // Fallback: use mock data
      setRecordingState("recording");
      setTimeout(() => {
        setText(config.mockText);
        setRecordingState("transcribed");
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 1500);
      return;
    }

    setRecordingState("recording");
    startRecording();
  };

  const handleSubmit = () => {
    if (text.trim().length < 20) {
      setError(
        "内容有点少，可以再像发语音一样多说几句，比如当时发生了什么、你为什么有这种感受、有没有一个具体画面。"
      );
      return;
    }
    setError("");
    // Stop any ongoing recording
    if (isRecording) {
      stopRecording();
    }
    onSubmit(text);
  };

  const recordingLabels: Record<RecordingState, string> = {
    idle: speechSupported ? "点击开始说话" : "点击填入示例文字",
    recording: "正在听你说……",
    transcribed: "已整理为文字，可继续编辑",
  };

  // Show both confirmed + interim transcript during recording
  const displayText = isRecording
    ? text + speechTranscript + interimTranscript
    : text;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => {
              if (isRecording) stopRecording();
              onBack();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ← 返回
          </button>
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-sm`}
            >
              {config.emoji}
            </span>
            <span className="font-medium text-gray-700">{scene}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Guide Questions */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              说说你的故事
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              下面这些问题可以帮助你把经历说得更完整，不用每个都回答，挑想说的说就好。
            </p>

            <div className="space-y-3">
              {guide.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="flex items-start gap-3 animate-slide-up"
                  style={{
                    animationDelay: `${i * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} text-white text-xs flex items-center justify-center mt-0.5`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {q.question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Input Area */}
          <div>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={displayText}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder="可以像发语音给朋友一样随便说，比如：今天下班路上突然觉得一个人走也挺舒服的……"
                className={`w-full h-56 p-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 text-gray-700 text-sm leading-relaxed resize-none placeholder:text-gray-300 ${
                  isRecording ? "border-red-200 ring-2 ring-red-100" : "border-gray-200"
                }`}
              />
              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs text-red-500">录音中</span>
                </div>
              )}
            </div>

            {isRecording && interimTranscript && (
              <div className="mt-2 px-1">
                <p className="text-xs text-gray-400 mb-0.5">实时识别：</p>
                <p className="text-sm text-blue-500 italic">{interimTranscript}</p>
              </div>
            )}

            {error && (
              <p className="mt-2 text-sm text-red-400 animate-fade-in">{error}</p>
            )}

            {/* Voice Button */}
            <div className="mt-4">
              <button
                onClick={handleVoiceToggle}
                className={`w-full py-3 rounded-xl border-2 border-dashed transition-all duration-300 flex items-center justify-center gap-3 text-sm ${
                  isRecording
                    ? "border-red-300 bg-red-50 text-red-500 animate-pulse-soft"
                    : recordingState === "transcribed"
                    ? "border-green-300 bg-green-50 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-400 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {isRecording ? (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-red-400 rounded-full recording-bar" />
                      <div className="w-1 h-3 bg-red-400 rounded-full recording-bar" />
                      <div className="w-1 h-3 bg-red-400 rounded-full recording-bar" />
                      <div className="w-1 h-3 bg-red-400 rounded-full recording-bar" />
                      <div className="w-1 h-3 bg-red-400 rounded-full recording-bar" />
                    </div>
                    点击停止录音
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    {recordingLabels[recordingState]}
                  </>
                )}
              </button>
              <p className="text-xs text-gray-300 mt-1.5 text-center">
                {speechSupported
                  ? "使用浏览器语音识别，支持中文 · 也可以直接打字输入"
                  : "当前浏览器不支持语音识别，点击可填入示例文字 · 请使用 Chrome 获得最佳体验"}
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isGenerating || !text.trim()}
              className={`mt-4 w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isGenerating
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : text.trim()
                  ? "bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md hover:shadow-lg active:scale-[0.98]"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  AI 正在整理你的内容…
                </span>
              ) : (
                "下一步：让 AI 整理我的内容"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
