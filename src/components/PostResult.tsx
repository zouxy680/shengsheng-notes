"use client";

import { useState } from "react";
import {
  SceneType,
  PostStyle,
  XiaohongshuPost,
  ContentAnalysis,
} from "@/lib/types";
import { sceneConfigs, postStyles } from "@/lib/data";
import { generatePost } from "@/lib/api";
import PhonePreview from "./PhonePreview";

interface PostResultProps {
  scene: SceneType;
  rawText: string;
  analysis: ContentAnalysis;
  initialPost: XiaohongshuPost;
  onBack: () => void;
}

export default function PostResult({
  scene,
  rawText,
  analysis,
  initialPost,
  onBack,
}: PostResultProps) {
  const [post, setPost] = useState<XiaohongshuPost>(initialPost);
  const [selectedStyle, setSelectedStyle] = useState<PostStyle>(initialPost.style);
  const [isSwitching, setIsSwitching] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = sceneConfigs.find((s) => s.type === scene)!;

  const handleStyleSwitch = async (style: PostStyle) => {
    if (style === selectedStyle) return;
    setSelectedStyle(style);
    setIsSwitching(true);
    try {
      const newPost = await generatePost(scene, rawText, style, analysis);
      setPost(newPost);
    } finally {
      setIsSwitching(false);
    }
  };

  const handleCopy = async () => {
    const copyText = `标题：${post.title}\n\n封面文案：\n${post.coverText}\n\n正文：\n${post.body}\n\n标签：\n${post.hashtags.map((t) => `#${t}`).join(" ")}\n\n评论区引导：\n${post.commentPrompt}`;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = copyText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="sticky-header sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="font-typewriter text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-xs tracking-wide uppercase">
              ← 返回
            </button>
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-xs border border-black/5`}>
                {config.emoji}
              </span>
              <span className="font-typewriter text-xs tracking-wide">{scene}</span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 rounded-lg font-typewriter text-xs font-medium transition-all duration-200 tracking-wide ${
              copied
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : "bg-[var(--accent)] text-[#F4F1EA] hover:bg-[var(--accent-hover)]"
            }`}
          >
            {copied ? "已复制" : "复制帖子"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Style switcher */}
            <div className="surface p-4">
              <div className="font-typewriter text-[10px] tracking-widest uppercase text-[var(--muted)] mb-2.5">切换风格</div>
              <div className="flex flex-wrap gap-2">
                {postStyles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleStyleSwitch(s.value)}
                    disabled={isSwitching}
                    className={`px-3 py-1.5 rounded-lg font-typewriter text-[11px] font-medium transition-all duration-200 tracking-wide ${
                      selectedStyle === s.value
                        ? "bg-[var(--accent)] text-[#F4F1EA]"
                        : "bg-[var(--color-paper)] text-[var(--muted)] hover:bg-[var(--color-warm-gray)]/50 border border-[var(--border)]"
                    } ${isSwitching ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated post */}
            <div className={`paper-texture surface p-5 transition-opacity duration-200 ${isSwitching ? "opacity-40" : "opacity-100"}`}>
              {/* Title */}
              <div className="mb-4">
                <div className="font-typewriter text-[10px] text-[var(--muted)] mb-1 tracking-widest uppercase">标题</div>
                <h2 className="font-serif-display text-xl font-semibold leading-snug">{post.title}</h2>
              </div>

              {/* Cover */}
              <div className="mb-4">
                <div className="font-typewriter text-[10px] text-[var(--muted)] mb-1 tracking-widest uppercase">封面文案</div>
                <p className="text-sm bg-[var(--accent-light)] border border-[var(--accent)]/10 rounded-lg px-3.5 py-2 text-[var(--accent)]">
                  {post.coverText}
                </p>
              </div>

              {/* Body */}
              <div className="mb-4">
                <div className="font-typewriter text-[10px] text-[var(--muted)] mb-1 tracking-widest uppercase">正文</div>
                <div className="text-sm leading-relaxed whitespace-pre-line max-w-[75ch] text-[var(--foreground)]">
                  {post.body}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="font-typewriter text-[10px] text-[var(--muted)] mb-1 tracking-widest uppercase">标签</div>
                <div className="flex flex-wrap gap-1.5">
                  {post.hashtags.map((tag) => (
                    <span key={tag} className="font-typewriter text-[11px] text-[var(--accent)] bg-[var(--accent-light)] border border-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment prompt */}
              <div>
                <div className="font-typewriter text-[10px] text-[var(--muted)] mb-1 tracking-widest uppercase">评论区引导</div>
                <p className="text-sm bg-[var(--color-paper)] border border-dashed border-[var(--border)] rounded-lg px-3.5 py-2 text-[var(--muted)]">
                  {post.commentPrompt}
                </p>
              </div>
            </div>

            {/* Analysis */}
            <div className="surface p-4">
              <div className="font-typewriter text-[10px] tracking-widest uppercase text-[var(--muted)] mb-2">内容分析</div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.keyDetails.map((d) => (
                  <span key={d} className="font-typewriter text-[11px] bg-[var(--color-paper)] text-[var(--muted)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right (2 cols) */}
          <div className="lg:col-span-2">
            <div className="sticky top-16">
              <div className="font-typewriter text-[10px] text-[var(--muted)] mb-3 text-center tracking-widest uppercase">预览效果</div>
              <PhonePreview post={post} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
