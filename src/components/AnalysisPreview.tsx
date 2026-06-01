"use client";

import { useState } from "react";
import { SceneType, ContentAnalysis } from "@/lib/types";
import { sceneConfigs } from "@/lib/data";

interface AnalysisPreviewProps {
  scene: SceneType;
  rawText: string;
  analysis: ContentAnalysis;
  onConfirm: (editedText: string) => void;
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

  const sections = [
    { emoji: "💭", label: "情绪", bg: "bg-pink-50", text: "text-pink-700", content: analysis.emotion },
    { emoji: "🎯", label: "主题", bg: "bg-amber-50", text: "text-amber-700", content: analysis.topic },
  ];

  const tagSections = [
    { emoji: "🔍", label: "关键细节", bg: "bg-blue-50", text: "text-blue-600", items: analysis.keyDetails },
    { emoji: "✨", label: "亮点", bg: "bg-emerald-50", text: "text-emerald-600", items: analysis.highlights },
    { emoji: "⚠️", label: "槽点", bg: "bg-red-50", text: "text-red-500", items: analysis.drawbacks },
    { emoji: "👥", label: "适合人群", bg: "bg-purple-50", text: "text-purple-600", items: analysis.targetAudience },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <div className="sticky-header sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm">
            ← 返回编辑
          </button>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-md bg-gradient-to-br ${config.gradient} flex items-center justify-center text-xs`}>
              {config.emoji}
            </span>
            <span className="text-sm font-medium">AI 内容整理</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 w-full flex-1">
        <h2 className="text-lg font-semibold mb-1">AI 帮你整理好了</h2>
        <p className="text-sm text-[var(--muted)] mb-6">看看提取的信息对不对，可以修改你的原文后继续。</p>

        {/* Editable original */}
        <div className="surface p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--muted)]">你说的内容</span>
            <span className="text-[11px] text-[var(--muted)] opacity-60">可编辑</span>
          </div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full min-h-[80px] p-2.5 rounded-lg input-base text-sm leading-relaxed resize-none max-w-[75ch]"
          />
        </div>

        {/* AI analysis */}
        <div className="surface p-4 mb-4">
          <span className="text-xs font-medium text-[var(--muted)] mb-3 block">AI 提取的关键信息</span>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {sections.map((s) => (
              <div key={s.label} className="flex items-start gap-2">
                <span className={`w-6 h-6 rounded-md ${s.bg} flex items-center justify-center text-[11px] flex-shrink-0`}>
                  {s.emoji}
                </span>
                <div>
                  <p className="text-[11px] text-[var(--muted)]">{s.label}</p>
                  <p className={`text-sm ${s.text}`}>{s.content}</p>
                </div>
              </div>
            ))}
          </div>

          {tagSections.map((s) => (
            <div key={s.label} className="flex items-start gap-2 mb-2 last:mb-0">
              <span className={`w-6 h-6 rounded-md ${s.bg} flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5`}>
                {s.emoji}
              </span>
              <div>
                <p className="text-[11px] text-[var(--muted)] mb-1">{s.label}</p>
                <div className="flex flex-wrap gap-1">
                  {s.items.map((item) => (
                    <span key={item} className={`text-xs ${s.bg} ${s.text} px-2 py-0.5 rounded-full`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-shrink-0 px-5 py-2.5 rounded-lg text-sm border border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface)] transition-colors"
          >
            返回修改
          </button>
          <button
            onClick={() => onConfirm(editedText)}
            disabled={isGenerating}
            className="flex-1 py-2.5 rounded-lg font-medium text-sm btn-primary"
          >
            {isGenerating ? "正在生成……" : "生成小红书帖子"}
          </button>
        </div>
      </div>
    </div>
  );
}
