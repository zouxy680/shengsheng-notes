"use client";

import { useState } from "react";
import { SceneType } from "@/lib/types";
import { sceneConfigs } from "@/lib/data";

interface SceneSelectProps {
  onSelect: (scene: SceneType) => void;
}

const cardLayout = [
  { rot: -3, x: 0, y: 24, z: 10 },
  { rot: 2.5, x: 60, y: 8, z: 20 },
  { rot: -1, x: 120, y: 0, z: 30 },
  { rot: 2.5, x: 180, y: 8, z: 20 },
  { rot: -3, x: 240, y: 24, z: 10 },
];

const cardGradients = [
  "from-rose-100 to-amber-50",
  "from-amber-100 to-yellow-50",
  "from-emerald-100 to-teal-50",
  "from-red-100 to-orange-50",
  "from-sky-100 to-cyan-50",
];

export default function SceneSelect({ onSelect }: SceneSelectProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-full lg:w-[30%] border-b lg:border-b-0 lg:border-r border-[var(--border)]/50 flex flex-col justify-between p-6 lg:p-12 bg-[var(--color-paper)] z-20">
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-8 lg:w-10 h-8 lg:h-10 border border-current rounded-full flex items-center justify-center text-xs lg:text-sm">
              🎤
            </div>
            <span className="font-typewriter uppercase tracking-widest text-[10px] lg:text-xs">
              声声笔记
            </span>
          </div>

          {/* Desktop heading — multi-line */}
          <div className="hidden lg:block mt-8 space-y-1">
            <h1
              className="font-serif-display text-5xl xl:text-6xl font-light leading-[0.9] animate-reveal-up"
              style={{ animationDelay: "100ms", opacity: 0, animationFillMode: "forwards" }}
            >
              今天想把
            </h1>
            <h1
              className="font-serif-display text-5xl xl:text-6xl font-light leading-[0.9] italic animate-reveal-up"
              style={{ animationDelay: "200ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="ml-8 xl:ml-10">哪段生活</span>
            </h1>
            <h1
              className="font-serif-display text-5xl xl:text-6xl font-light leading-[0.9] animate-reveal-up"
              style={{ animationDelay: "300ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <span className="ml-2">说出来？</span>
            </h1>
            <p
              className="font-typewriter text-sm max-w-[220px] leading-relaxed opacity-80 mt-6 animate-fade-in"
              style={{ animationDelay: "400ms", opacity: 0, animationFillMode: "forwards" }}
            >
              像发语音给朋友一样说出来，
              <br />
              AI 帮你整理成小红书帖子。
            </p>
          </div>

          {/* Mobile heading — single line */}
          <h1 className="lg:hidden font-serif-display text-2xl font-light leading-tight animate-reveal-up">
            今天想把 <span className="italic">哪段生活</span> 说出来？
          </h1>
        </div>

        {/* Bottom nav — desktop only */}
        <nav
          className="hidden lg:flex flex-col gap-3 mt-auto pt-8 animate-fade-in"
          style={{ animationDelay: "600ms", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[var(--color-terracotta)] rounded-full" />
            <span className="font-typewriter text-xs tracking-widest text-[var(--muted)]">
              选择场景开始
            </span>
          </div>
          <span className="font-typewriter text-[10px] text-[var(--muted)] opacity-40">
            所有内容仅用于 Demo 演示
          </span>
        </nav>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 relative lg:h-screen overflow-y-auto lg:overflow-hidden">
        {/* Decorative spinning text — desktop only */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none hidden lg:block">
          <svg
            className="w-72 h-72"
            style={{ animation: "spin 60s linear infinite" }}
            viewBox="0 0 200 200"
          >
            <path
              id="homeCurve"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              fill="transparent"
            />
            <text>
              <textPath
                xlinkHref="#homeCurve"
                style={{
                  fontFamily: "var(--font-courier)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                }}
              >
                声声笔记 · 语音转小红书 · AI 整理 ·&nbsp;
              </textPath>
            </text>
          </svg>
        </div>

        <div className="w-full min-h-[calc(100vh-180px)] lg:min-h-0 lg:h-full flex flex-col lg:items-center lg:justify-center p-6 lg:p-12 gap-10 lg:gap-14">
          {/* Mobile label */}
          <div className="lg:hidden text-center animate-fade-in">
            <h2 className="font-typewriter uppercase text-[10px] tracking-widest mb-1 opacity-50">
              选择场景
            </h2>
            <div className="text-xl font-serif-display italic">点击卡片开始</div>
          </div>

          {/* ── Desktop: overlapping card fan ── */}
          <div className="hidden lg:block relative" style={{ width: 520, height: 440 }}>
            {sceneConfigs.map((scene, i) => {
              const c = cardLayout[i];
              const isHovered = hovered === i;
              return (
                <div
                  key={scene.type}
                  className="paper-texture absolute rounded-lg border border-black/5 cursor-pointer"
                  style={{
                    width: 280,
                    height: 400,
                    left: c.x,
                    top: c.y,
                    zIndex: isHovered ? 50 : c.z,
                    transform: isHovered
                      ? "translateY(-16px) rotate(0deg)"
                      : `rotate(${c.rot}deg)`,
                    boxShadow: isHovered
                      ? "0 25px 50px rgba(31,31,31,0.15), 0 8px 20px rgba(31,31,31,0.08)"
                      : "0 20px 40px rgba(31,31,31,0.08), 0 4px 12px rgba(31,31,31,0.04)",
                    transition:
                      "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
                    opacity: 0,
                    animation: `fadeOnly 0.5s cubic-bezier(0.16,1,0.3,1) ${300 + i * 100}ms forwards`,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(scene.type)}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${cardGradients[i]} rounded-lg p-6 flex flex-col relative overflow-hidden`}
                  >
                    {/* Vertical text accent */}
                    <div className="absolute right-2 top-0 bottom-0 flex items-center opacity-15">
                      <span className="text-vertical font-typewriter text-[8px] tracking-[0.2em]">
                        {scene.type}
                      </span>
                    </div>

                    {/* Number stamp */}
                    <div className="absolute top-5 right-5 w-14 h-14 border border-black/15 rounded-full flex items-center justify-center -rotate-12">
                      <div className="w-10 h-10 border border-dashed border-black/25 rounded-full flex items-center justify-center">
                        <span className="font-typewriter text-[9px] text-center leading-tight opacity-60">
                          NO.
                          <br />
                          {i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Emoji */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-xl border border-black/5 shadow-sm`}
                    >
                      {scene.emoji}
                    </div>

                    {/* Scene name */}
                    <h3 className="font-serif-display text-xl font-semibold leading-tight mt-4 mb-1.5">
                      {scene.type}
                    </h3>

                    {/* Description */}
                    <p className="font-typewriter text-[11px] leading-relaxed opacity-55 max-w-[180px]">
                      {scene.description}
                    </p>

                    {/* Tear line */}
                    <div className="mt-auto pt-4">
                      <div className="border-t border-dashed border-black/10 pt-3 flex items-center justify-between">
                        <span className="font-typewriter text-[9px] uppercase tracking-wider opacity-30">
                          点击选择
                        </span>
                        <span className="font-typewriter text-sm opacity-30">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Mobile: vertical card list ── */}
          <div className="lg:hidden w-full max-w-md mx-auto space-y-3">
            {sceneConfigs.map((scene, i) => (
              <button
                key={scene.type}
                onClick={() => onSelect(scene.type)}
                className="paper-texture w-full text-left rounded-lg border border-black/5 p-4 flex items-center gap-4 bg-[var(--color-surface)] animate-slide-up active:scale-[0.98] transition-transform"
                style={{
                  animationDelay: `${300 + i * 80}ms`,
                  animationFillMode: "both",
                }}
              >
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${scene.gradient} flex items-center justify-center text-lg border border-black/5 flex-shrink-0`}
                >
                  {scene.emoji}
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif-display text-base font-semibold">{scene.type}</h3>
                  <p className="font-typewriter text-[10px] text-[var(--muted)] leading-relaxed mt-0.5 truncate">
                    {scene.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* ── Bottom info strip ── */}
          <div
            className="w-full max-w-2xl grid grid-cols-3 gap-4 lg:gap-8 opacity-70 animate-fade-in"
            style={{ animationDelay: "800ms", opacity: 0, animationFillMode: "forwards" }}
          >
            {[
              {
                n: "1",
                bg: "bg-[var(--color-ink)]",
                fg: "text-[var(--color-paper)]",
                title: "语音输入",
                desc: "像聊天一样\n说出你的故事",
              },
              {
                n: "2",
                bg: "bg-[var(--color-terracotta)]",
                fg: "text-[var(--color-paper)]",
                title: "AI 整理",
                desc: "提取关键信息\n生成优质内容",
              },
              {
                n: "3",
                bg: "bg-[var(--color-mustard)]",
                fg: "text-[var(--color-ink)]",
                title: "发布帖子",
                desc: "一键复制\n发布到小红书",
              },
            ].map((item) => (
              <div key={item.n} className="flex flex-col items-center lg:items-start gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full ${item.bg} ${item.fg} flex items-center justify-center`}
                >
                  <span className="font-serif-display italic text-xs">{item.n}</span>
                </div>
                <h3 className="font-serif-display text-sm">{item.title}</h3>
                <p className="font-typewriter text-[10px] leading-relaxed text-[var(--muted)] text-center lg:text-left whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
