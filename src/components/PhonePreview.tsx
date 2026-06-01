"use client";

import { XiaohongshuPost, PostStyle } from "@/lib/types";

interface PhonePreviewProps {
  post: XiaohongshuPost;
}

const coverGradients: Record<PostStyle, string> = {
  真实日记感: "from-amber-100 to-orange-100",
  情绪共鸣感: "from-pink-100 to-rose-100",
  实用攻略感: "from-emerald-100 to-teal-100",
  种草推荐感: "from-violet-100 to-pink-100",
  避雷复盘感: "from-red-100 to-amber-100",
};

export default function PhonePreview({ post }: PhonePreviewProps) {
  const gradient = coverGradients[post.style] || coverGradients["真实日记感"];

  return (
    <div className="flex justify-center">
      <div className="phone-frame w-[280px] bg-white overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] text-gray-400 font-medium">9:41</span>
          <div className="w-3 h-1.5 border border-gray-300 rounded-sm relative">
            <div className="absolute inset-0.5 bg-gray-400 rounded-[1px]" style={{ width: "60%" }} />
          </div>
        </div>

        {/* Cover */}
        <div className={`mx-3 mt-2 rounded-lg bg-gradient-to-br ${gradient} h-40 flex items-center justify-center transition-all duration-300`}>
          <p className="text-base font-bold text-gray-700/80 leading-snug text-center px-5">
            {post.coverText}
          </p>
        </div>

        {/* Content */}
        <div className="px-3 pt-2.5">
          <h3 className="text-[13px] font-bold text-gray-800 leading-snug mb-1.5">{post.title}</h3>

          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)]" />
            <span className="text-[10px] text-gray-400">声声笔记用户</span>
            <span className="text-[10px] text-gray-300">· 刚刚</span>
          </div>

          <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-5 mb-2">
            {post.body.split("\n").slice(0, 4).join("\n")}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            {post.hashtags.map((tag) => (
              <span key={tag} className="text-[10px] text-[var(--accent)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="bg-gray-50 rounded-md px-2 py-1.5 mb-2">
            <p className="text-[10px] text-gray-400">{post.commentPrompt}</p>
          </div>

          <div className="flex items-center gap-3 pb-2.5 border-t border-gray-100 pt-2">
            <span className="text-[10px] text-gray-300">❤️ 0</span>
            <span className="text-[10px] text-gray-300">⭐ 收藏</span>
            <span className="text-[10px] text-gray-300">💬 评论</span>
          </div>
        </div>
      </div>
    </div>
  );
}
