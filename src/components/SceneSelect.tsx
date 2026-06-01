"use client";

import { SceneType } from "@/lib/types";
import { sceneConfigs } from "@/lib/data";

interface SceneSelectProps {
  onSelect: (scene: SceneType) => void;
}

const rotations = [-0.8, 0.5, -0.4, 0.6, -0.5];

export default function SceneSelect({ onSelect }: SceneSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Brand mark — bounce entrance */}
        <div className="mb-6 animate-bounce-in" style={{ animationDelay: "0ms" }}>
          <span className="font-typewriter inline-block px-4 py-1.5 border border-[var(--color-terracotta)]/30 text-[var(--accent)] rounded-md text-xs tracking-widest uppercase hover:border-[var(--accent)]/60 hover:bg-[var(--accent-light)] transition-all duration-300 cursor-default">
            声声笔记
          </span>
        </div>

        {/* Title line 1 */}
        <h1 className="text-4xl md:text-5xl font-light leading-[0.95] tracking-tight mb-1 animate-reveal-up" style={{ animationDelay: "100ms", opacity: 0, animationFillMode: "forwards" }}>
          <span className="font-serif-display">今天想把</span>
        </h1>

        {/* Title line 2 — delayed */}
        <h1 className="text-4xl md:text-5xl font-light leading-[0.95] tracking-tight mb-4 animate-reveal-up" style={{ animationDelay: "200ms", opacity: 0, animationFillMode: "forwards" }}>
          <span className="font-serif-display italic pl-4">哪段生活说出来？</span>
        </h1>

        {/* Subtitle — delayed more */}
        <p className="font-typewriter text-xs text-[var(--muted)] mb-10 tracking-wide animate-fade-in" style={{ animationDelay: "350ms", opacity: 0, animationFillMode: "forwards" }}>
          像发语音给朋友一样说出来，AI 帮你整理成一篇小红书帖子。
        </p>

        {/* Scene cards — staggered with rotation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sceneConfigs.map((scene, index) => (
            <div
              key={scene.type}
              className="animate-slide-up"
              style={{ animationDelay: `${400 + index * 80}ms`, animationFillMode: "both" }}
            >
              <button
                onClick={() => onSelect(scene.type)}
                className="card-rotated paper-texture surface p-5 text-left hover:border-[var(--accent)]/40 w-full group"
                style={{ transform: `rotate(${rotations[index]}deg)` }}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-lg mb-3 border border-black/5 transition-transform duration-300 group-hover:scale-110`}
                >
                  {scene.emoji}
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-[var(--foreground)] mb-1">{scene.type}</h3>
                <p className="font-typewriter text-[11px] text-[var(--muted)] leading-relaxed">{scene.description}</p>
                <div className="mt-3 font-typewriter text-[10px] text-[var(--accent)] tracking-wider uppercase overflow-hidden">
                  <span className="inline-block translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    点击开始 →
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Footer — fades in last */}
        <p className="mt-8 font-typewriter text-[10px] text-[var(--muted)] opacity-0 animate-fade-in" style={{ animationDelay: "900ms", animationFillMode: "forwards" }}>
          所有内容仅用于 Demo 演示，不会存储或发布
        </p>
      </div>
    </div>
  );
}
