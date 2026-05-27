"use client";

import { useState } from "react";
import { SceneType, ContentAnalysis, PostStyle } from "@/lib/types";
import { sceneConfigs } from "@/lib/data";

interface AnalysisPreviewProps {
  scene: SceneType;
  rawText: string;
  analysis: ContentAnalysis;
  onConfirm: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export default function AnalysisPreview({
  scene,
  rawText,
  analysis,
  onConfirm,
  onBack,
  isGenerating,
}: AnalysisPreviewProps) {
  const [editedText, setEditedText] = useState(rawText);
  const config = sceneConfigs.find((s) => s.type === scene)!;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ← 返回编辑
          </button>
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-sm`}
            >
              {config.emoji}
            </span>
            <span className="font-medium text-gray-700">AI 内容整理</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            AI 帮你整理好了，看看对不对
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            下面是 AI 从你说的内容中提取的关键信息，你可以修改后继续生成帖子。
          </p>

          {/* Original text - editable */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-500">
                📝 你说的内容
              </h3>
              <span className="text-xs text-gray-300">可编辑</span>
            </div>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full min-h-[100px] p-3 rounded-xl bg-gray-50 text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-orange-200 border border-transparent focus:border-orange-200"
            />
          </div>

          {/* Analysis result */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5 animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">
              📋 AI 提取的关键信息
            </h3>

            <div className="space-y-4">
              {/* Emotion */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-sm">
                  💭
                </span>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">情绪</p>
                  <p className="text-sm text-gray-700">{analysis.emotion}</p>
                </div>
              </div>

              {/* Topic */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-sm">
                  🎯
                </span>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">适合的主题</p>
                  <p className="text-sm text-gray-700">{analysis.topic}</p>
                </div>
              </div>

              {/* Key Details */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm">
                  🔍
                </span>
                <div>
                  <p className="text-xs text-gray-400 mb-1">关键细节</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.keyDetails.map((d) => (
                      <span
                        key={d}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              {analysis.highlights.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-sm">
                    ✨
                  </span>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">亮点</p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Drawbacks */}
              {analysis.drawbacks.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-sm">
                    ⚠️
                  </span>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">槽点/提醒</p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.drawbacks.map((d) => (
                        <span
                          key={d}
                          className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Target Audience */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-sm">
                  👥
                </span>
                <div>
                  <p className="text-xs text-gray-400 mb-1">适合人群</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.targetAudience.map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Style selection */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              选择帖子风格
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              默认使用「真实日记感」，生成后也可以随时切换
            </p>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-lg">📝</span>
              <div>
                <span className="text-sm text-orange-700 font-medium">真实日记感</span>
                <span className="text-xs text-orange-400 ml-1">（默认）</span>
                <p className="text-xs text-orange-400 mt-0.5">像写日记一样，自然、随意、真诚</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              返回修改
            </button>
            <button
              onClick={onConfirm}
              disabled={isGenerating}
              className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isGenerating
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md hover:shadow-lg active:scale-[0.98]"
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
                  正在生成帖子…
                </span>
              ) : (
                "生成小红书帖子"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
