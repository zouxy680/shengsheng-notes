"use client";

import { XiaohongshuPost, PostStyle } from "@/lib/types";

interface PhonePreviewProps {
  post: XiaohongshuPost;
}

const styleCoverGradients: Record<PostStyle, string> = {
  真实日记感: "from-amber-200 via-orange-100 to-yellow-200",
  情绪共鸣感: "from-pink-200 via-rose-100 to-purple-200",
  实用攻略感: "from-emerald-200 via-teal-100 to-cyan-200",
  种草推荐感: "from-purple-200 via-violet-100 to-pink-200",
  避雷复盘感: "from-red-200 via-orange-100 to-amber-200",
};

export default function PhonePreview({ post }: PhonePreviewProps) {
  const gradient = styleCoverGradients[post.style] || styleCoverGradients["真实日记感"];

  return (
    <div className="flex justify-center">
      <div className="phone-frame w-[300px] bg-white overflow-hidden">
        {/* Status bar mock */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] text-gray-400 font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 border border-gray-300 rounded-sm relative">
              <div className="absolute inset-0.5 bg-gray-400 rounded-[1px]" style={{ width: "60%" }} />
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="px-4 py-2 border-b border-gray-50/60">
          <span className="text-xs text-gray-400">社区帖子预览</span>
        </div>

        {/* Cover area */}
        <div className={`mx-3 mt-3 rounded-xl bg-gradient-to-br ${gradient} h-48 flex items-center justify-center relative overflow-hidden transition-all duration-700`}>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/20 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/15 rounded-full" />
          <div className="text-center px-6 relative z-10">
            <p className="text-lg font-bold text-gray-700/90 leading-snug">
              {post.coverText}
            </p>
          </div>
          <div className="absolute bottom-2 right-2 bg-white/70 backdrop-blur-sm rounded-md px-2 py-0.5 text-[10px] text-gray-500">
            封面文案
          </div>
        </div>

        {/* Content */}
        <div className="px-3 pt-3">
          {/* Title */}
          <h3 className="text-sm font-bold text-gray-800 leading-snug mb-2">
            {post.title}
          </h3>

          {/* Author mock */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-300 to-pink-300" />
            <span className="text-[10px] text-gray-400">声声笔记用户</span>
            <span className="text-[10px] text-gray-300">·</span>
            <span className="text-[10px] text-gray-300">刚刚</span>
          </div>

          {/* Body preview */}
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-5 mb-2">
            {post.body.split("\n").slice(0, 4).join("\n")}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-blue-500 bg-blue-50/80 px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comment prompt */}
          <div className="bg-gray-50/80 rounded-lg px-2.5 py-2 mb-3">
            <p className="text-[10px] text-gray-400">
              {post.commentPrompt}
            </p>
          </div>

          {/* Engagement mock */}
          <div className="flex items-center gap-4 pb-3 border-t border-gray-50/60 pt-2">
            <span className="text-[10px] text-gray-300">❤️ 0</span>
            <span className="text-[10px] text-gray-300">⭐ 收藏</span>
            <span className="text-[10px] text-gray-300">💬 评论</span>
          </div>
        </div>
      </div>
    </div>
  );
}
