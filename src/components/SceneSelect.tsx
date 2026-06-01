"use client";

import { SceneType } from "@/lib/types";
import { sceneConfigs } from "@/lib/data";

interface SceneSelectProps {
  onSelect: (scene: SceneType) => void;
}

export default function SceneSelect({ onSelect }: SceneSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* Brand mark */}
        <div className="mb-6">
          <span className="font-typewriter inline-block px-4 py-1.5 border border-[var(--color-terracotta)]/30 text-[var(--accent)] rounded-md text-xs tracking-widest uppercase">
            声声笔记
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light leading-[0.95] tracking-tight mb-2">
          <span className="font-serif-display">今天想把</span>
        </h1>
        <h1 className="text-4xl md:text-5xl font-light leading-[0.95] tracking-tight mb-4">
          <span className="font-serif-display italic pl-4">哪段生活说出来？</span>
        </h1>

        <p className="font-typewriter text-xs text-[var(--muted)] mb-10 tracking-wide">
          像发语音给朋友一样说出来，AI 帮你整理成一篇小红书帖子。
        </p>

        {/* Scene cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sceneConfigs.map((scene, index) => (
            <button
              key={scene.type}
              onClick={() => onSelect(scene.type)}
              className="group paper-texture surface p-5 text-left hover:border-[var(--accent)]/40 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-lg mb-3 border border-black/5`}
              >
                {scene.emoji}
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-[var(--foreground)] mb-1">{scene.type}</h3>
              <p className="font-typewriter text-[11px] text-[var(--muted)] leading-relaxed">{scene.description}</p>
              <div className="mt-3 font-typewriter text-[10px] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider uppercase">
                点击开始 →
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 font-typewriter text-[10px] text-[var(--muted)] opacity-50 tracking-wide">
          所有内容仅用于 Demo 演示，不会存储或发布
        </p>
      </div>
    </div>
  );
}
