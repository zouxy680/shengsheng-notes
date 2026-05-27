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
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
            声声笔记
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
          今天想把哪段生活说出来？
        </h1>
        <p className="text-gray-500 mb-10 text-base md:text-lg">
          像发语音给朋友一样说出来，AI 帮你整理成一篇小红书帖子。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sceneConfigs.map((scene, index) => (
            <button
              key={scene.type}
              onClick={() => onSelect(scene.type)}
              className="group relative bg-white rounded-2xl p-5 text-left shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform`}
              >
                {scene.emoji}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{scene.type}</h3>
              <p className="text-sm text-gray-400">{scene.description}</p>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-gray-500 transition-colors">
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
