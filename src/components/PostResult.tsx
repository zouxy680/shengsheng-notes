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
  const [selectedStyle, setSelectedStyle] = useState<PostStyle>(
    initialPost.style
  );
  const [isSwitching, setIsSwitching] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useState<ReturnType<typeof setTimeout> | null>(null)[0];

  const config = sceneConfigs.find((s) => s.type === scene)!;
  const currentStyleConfig = postStyles.find((s) => s.value === selectedStyle);

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
      <div className="glass-header border-b border-white/30 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
            >
              ← 返回
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center text-sm shadow-sm`}
              >
                {config.emoji}
              </span>
              <span className="font-medium text-gray-700">{scene}</span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              copied
                ? "bg-green-100/80 text-green-600"
                : "bg-orange-100/80 text-orange-600 hover:bg-orange-200/80"
            }`}
          >
            {copied ? "已复制，可以去发布啦" : "一键复制"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Post Content */}
          <div className="lg:col-span-3 space-y-5">
            {/* Analysis Card */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                内容分析
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">情绪：</span>
                  <span className="text-gray-700">{analysis.emotion}</span>
                </div>
                <div>
                  <span className="text-gray-400">主题：</span>
                  <span className="text-gray-700">{analysis.topic}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {analysis.keyDetails.map((d) => (
                  <span
                    key={d}
                    className="text-xs bg-orange-50/80 text-orange-600 px-2 py-0.5 rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Style Switcher */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                切换风格，生成不同感觉的帖子
              </h3>
              <div className="space-y-2">
                {postStyles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleStyleSwitch(s.value)}
                    disabled={isSwitching}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-200 border ${
                      selectedStyle === s.value
                        ? "border-orange-300/60 bg-orange-50/60 shadow-sm"
                        : "border-transparent hover:border-gray-200/60 hover:bg-white/60"
                    } ${isSwitching ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span className="text-lg flex-shrink-0">{s.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${
                        selectedStyle === s.value ? "text-orange-700" : "text-gray-700"
                      }`}>
                        {s.label}
                      </div>
                      <div className={`text-xs ${
                        selectedStyle === s.value ? "text-orange-400" : "text-gray-400"
                      }`}>
                        {s.desc}
                      </div>
                    </div>
                    {selectedStyle === s.value && (
                      <span className="text-xs text-orange-500 font-medium flex-shrink-0">当前</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Post */}
            <div
              className={`glass-card p-5 transition-all duration-500 ${
                isSwitching ? "opacity-30 scale-[0.99]" : "opacity-100 scale-100"
              }`}
            >
              {/* Style Badge */}
              {currentStyleConfig && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${currentStyleConfig.color}`}>
                  {currentStyleConfig.emoji} {currentStyleConfig.label}
                </span>
              )}

              {/* Title */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">标题</div>
                <h2 className="text-lg font-bold text-gray-800">
                  {post.title}
                </h2>
              </div>

              {/* Cover Text */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">封面文案</div>
                <p className="text-sm text-gray-600 bg-gradient-to-r from-orange-50/80 to-pink-50/80 rounded-xl px-4 py-2.5">
                  {post.coverText}
                </p>
              </div>

              {/* Body */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">正文</div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.body}
                </div>
              </div>

              {/* Hashtags */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">标签</div>
                <div className="flex flex-wrap gap-1.5">
                  {post.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-blue-500 bg-blue-50/80 px-2.5 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment Prompt */}
              <div>
                <div className="text-xs text-gray-400 mb-1">
                  评论区引导
                </div>
                <p className="text-sm text-gray-600 bg-gray-50/80 rounded-xl px-4 py-2.5">
                  {post.commentPrompt}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Phone Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center">
                预览效果
              </h3>
              <PhonePreview post={post} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
