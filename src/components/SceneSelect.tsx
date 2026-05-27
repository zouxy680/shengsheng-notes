"use client";

import { SceneType } from "@/lib/types";
import { sceneConfigs } from "@/lib/data";

interface SceneSelectProps {
  onSelect: (scene: SceneType) => void;
}

export default function SceneSelect({ onSelect }: SceneSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="max-w-2xl w-full text-center animate-fade-in relative z-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm text-orange-600 rounded-full text-sm font-medium border border-orange-200/40 shadow-sm">
            声声笔记
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight tracking-tight">
          今天想把哪段生活
          <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            说出来
          </span>
          ？
        </h1>
        <p className="text-gray-400 mb-10 text-base md:text-lg">
          像发语音给朋友一样说出来，AI 帮你整理成一篇小红书帖子。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sceneConfigs.map((scene, index) => (
            <button
              key={scene.type}
              onClick={() => onSelect(scene.type)}
              className="group relative glass-card p-5 text-left hover:shadow-lg hover:shadow-orange-100/40 hover:-translate-y-0.5 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
              >
                {scene.emoji}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{scene.type}</h3>
              <p className="text-sm text-gray-400">{scene.description}</p>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-300">
                →
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-300">
          所有内容仅用于 Demo 演示，不会存储或发布
        </p>
      </div>
    </div>
  );
}
