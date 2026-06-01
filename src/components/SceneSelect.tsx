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
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[var(--accent-light)] text-[var(--accent)] rounded-md text-sm font-medium">
            声声笔记
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3 leading-tight tracking-tight">
          今天想把哪段生活说出来？
        </h1>
        <p className="text-[var(--muted)] mb-10 text-base">
          像发语音给朋友一样说出来，AI 帮你整理成一篇小红书帖子。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sceneConfigs.map((scene, index) => (
            <button
              key={scene.type}
              onClick={() => onSelect(scene.type)}
              className="group surface p-5 text-left hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-lg mb-3`}
              >
                {scene.emoji}
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-1">{scene.type}</h3>
              <p className="text-sm text-[var(--muted)]">{scene.description}</p>
              <div className="mt-3 text-xs text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                点击开始 →
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs text-[var(--muted)] opacity-60">
          所有内容仅用于 Demo 演示，不会存储或发布
        </p>
      </div>
    </div>
  );
}
