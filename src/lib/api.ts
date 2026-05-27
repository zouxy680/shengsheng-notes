import { ContentAnalysis, XiaohongshuPost, PostStyle, SceneType } from "./types";

export async function analyzeContent(
  sceneType: SceneType,
  rawText: string
): Promise<ContentAnalysis> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sceneType, rawText }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "分析失败");
  }

  return res.json();
}

export async function generatePost(
  sceneType: SceneType,
  rawText: string,
  postStyle: PostStyle,
  analysis: ContentAnalysis
): Promise<XiaohongshuPost> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sceneType, rawText, postStyle, analysis }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "生成失败");
  }

  return res.json();
}
