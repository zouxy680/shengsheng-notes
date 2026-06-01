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
    { emoji: "💭", label: "情绪", bg: "bg-rose-50", text: "text-rose-800", content: analysis.emotion },
    { emoji: "🎯", label: "主题", bg: "bg-amber-50", text: "text-amber-800", content: analysis.topic },
  ];

  const tagSections = [
    { emoji: "🔍", label: "关键细节", bg: "bg-sky-50", text: "text-sky-800", items: analysis.keyDetails },
    { emoji: "✨", label: "亮点", bg: "bg-emerald-50", text: "text-emerald-800", items: analysis.highlights },
    { emoji: "⚠️", label: "槽点", bg: "bg-red-50", text: "text-red-800", items: analysis.drawbacks },
    { emoji: "👥", label: "适合人群", bg: "bg-violet-50", text: "text-violet-800", items: analysis.targetAudience },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <div className="sticky-header sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="font-typewriter text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-xs tracking-wide uppercase">
            ← 返回编辑
          </button>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-xs border border-black/5`}>
              {config.emoji}
            </span>
            <span className="font-typewriter text-xs tracking-wide">AI 内容整理</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 w-full flex-1">
        <h2 className="font-serif-display text-2xl font-light mb-1">
          AI 帮你整理<span className="italic">好了</span>
        </h2>
        <p className="font-typewriter text-[11px] text-[var(--muted)] mb-6 tracking-wide">
          看看提取的信息对不对，可以修改你的原文后继续。
        </p>

        {/* Editable original */}
        <div className="paper-texture surface p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-typewriter text-[10px] tracking-widest uppercase text-[var(--muted)]">你说的内容</span>
            <span className="font-typewriter text-[10px] text-[var(--muted)] opacity-50">可编辑</span>
          </div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full min-h-[80px] p-2.5 rounded-lg input-base text-sm leading-relaxed resize-none max-w-[75ch]"
          />
        </div>

        {/* AI analysis */}
        <div className="paper-texture surface p-4 mb-4">
          <span className="font-typewriter text-[10px] tracking-widest uppercase text-[var(--muted)] mb-3 block">AI 提取的关键信息</span>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {sections.map((s) => (
              <div key={s.label} className="flex items-start gap-2">
                <span className={`w-6 h-6 rounded-md ${s.bg} flex items-center justify-center text-[11px] flex-shrink-0`}>
                  {s.emoji}
                </span>
                <div>
                  <p className="font-typewriter text-[10px] text-[var(--muted)] tracking-wide">{s.label}</p>
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
                <p className="font-typewriter text-[10px] text-[var(--muted)] mb-1 tracking-wide">{s.label}</p>
                <div className="flex flex-wrap gap-1">
                  {s.items.map((item) => (
                    <span key={item} className={`font-typewriter text-[11px] ${s.bg} ${s.text} px-2 py-0.5 rounded-full`}>
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
            className="flex-shrink-0 px-5 py-2.5 rounded-lg font-typewriter text-xs border border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface)] transition-colors tracking-wide"
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
