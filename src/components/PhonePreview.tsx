"use client";

import { XiaohongshuPost, PostStyle } from "@/lib/types";

interface PhonePreviewProps {
  post: XiaohongshuPost;
}

const coverGradients: Record<PostStyle, string> = {
  真实日记感: "from-amber-100 to-orange-50",
  情绪共鸣感: "from-rose-100 to-pink-50",
  实用攻略感: "from-emerald-100 to-teal-50",
  种草推荐感: "from-violet-100 to-purple-50",
  避雷复盘感: "from-red-100 to-amber-50",
};

export default function PhonePreview({ post }: PhonePreviewProps) {
  const gradient = coverGradients[post.style] || coverGradients["真实日记感"];

  return (
    <div className="flex justify-center">
      <div className="phone-frame w-[280px] bg-[#FAF8F4] overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="font-typewriter text-[10px] text-[var(--color-muted)] font-medium">9:41</span>
          <div className="w-3 h-1.5 border border-[var(--color-warm-gray)] rounded-sm relative">
            <div className="absolute inset-0.5 bg-[var(--color-warm-gray)] rounded-[1px]" style={{ width: "60%" }} />
          </div>
        </div>

        {/* Cover */}
        <div className={`mx-3 mt-2 rounded-lg bg-gradient-to-br ${gradient} h-40 flex items-center justify-center transition-all duration-300 border border-black/5`}>
          <p className="text-base font-bold text-[var(--color-ink)]/70 leading-snug text-center px-5">
            {post.coverText}
          </p>
        </div>

        {/* Content */}
        <div className="px-3 pt-2.5">
          <h3 className="text-[13px] font-bold text-[var(--color-ink)] leading-snug mb-1.5">{post.title}</h3>

          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)]" />
            <span className="font-typewriter text-[10px] text-[var(--muted)]">声声笔记用户</span>
            <span className="font-typewriter text-[10px] text-[var(--color-warm-gray)]">· 刚刚</span>
          </div>

          <p className="text-[11px] text-[var(--muted)] leading-relaxed line-clamp-5 mb-2">
            {post.body.split("\n").slice(0, 4).join("\n")}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            {post.hashtags.map((tag) => (
              <span key={tag} className="font-typewriter text-[10px] text-[var(--accent)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="bg-[var(--color-paper)] border border-dashed border-[var(--border)] rounded-md px-2 py-1.5 mb-2">
            <p className="font-typewriter text-[10px] text-[var(--muted)]">{post.commentPrompt}</p>
          </div>

          <div className="flex items-center gap-3 pb-2.5 border-t border-[var(--border)] pt-2">
            <span className="font-typewriter text-[10px] text-[var(--color-warm-gray)]">❤️ 0</span>
            <span className="font-typewriter text-[10px] text-[var(--color-warm-gray)]">⭐ 收藏</span>
            <span className="font-typewriter text-[10px] text-[var(--color-warm-gray)]">💬 评论</span>
          </div>
        </div>
      </div>
    </div>
  );
}
