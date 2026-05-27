import { NextRequest, NextResponse } from "next/server";
import { requireApiKey, callAI, handleAIError } from "@/lib/ai-server";

const SYSTEM_PROMPT = `你是一个小红书社区内容产品助手。你的任务不是编造内容，而是从用户真实输入中提取可用于生成帖子的关键信息。

请根据用户选择的场景和输入内容，提取以下信息，并严格返回 JSON：

字段：
scene：内容场景
emotion：用户表达的主要情绪
topic：适合发布的小红书主题（一句话概括）
keyDetails：关键细节列表（从用户原文中提取具体事实和细节）
highlights：亮点列表（用户提到的好的方面）
drawbacks：缺点或提醒列表（用户提到的不好的方面，没有则为空数组）
targetAudience：适合人群列表

要求：
1. 不要编造用户没有说过的具体事实。
2. 可以基于语义做合理归纳。
3. 保留用户原本的情绪和表达动机。
4. 如果用户输入很口语化，要理解其真实意图。
5. 返回纯 JSON，不要输出解释文字。`;

export async function POST(req: NextRequest) {
  const { sceneType, rawText } = await req.json();

  if (!rawText || !sceneType) {
    return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
  }

  const keyError = requireApiKey();
  if (keyError) return keyError;

  try {
    const result = await callAI(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `用户选择的场景：${sceneType}\n\n用户输入：\n${rawText}` },
      ],
      0.3
    );
    return NextResponse.json(result);
  } catch (e) {
    return handleAIError(e);
  }
}
