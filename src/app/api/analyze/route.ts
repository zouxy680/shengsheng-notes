import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.AI_API_KEY || "";
const BASE_URL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
const MODEL = process.env.AI_MODEL || "gpt-4o-mini";

export async function POST(req: NextRequest) {
  const { sceneType, rawText } = await req.json();

  if (!rawText || !sceneType) {
    return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
  }

  // If no API key configured, return error hint
  if (!API_KEY) {
    return NextResponse.json(
      {
        error:
          "未配置 AI API Key。请在 .env.local 中设置 AI_API_KEY 和 AI_BASE_URL。",
      },
      { status: 500 }
    );
  }

  const systemPrompt = `你是一个小红书社区内容产品助手。你的任务不是编造内容，而是从用户真实输入中提取可用于生成帖子的关键信息。

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

  const userPrompt = `用户选择的场景：${sceneType}\n\n用户输入：\n${rawText}`;

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API error:", err);
      return NextResponse.json(
        { error: "AI API 调用失败", detail: err },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "AI 返回格式异常" },
        { status: 502 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return NextResponse.json(analysis);
  } catch (e) {
    console.error("Analyze error:", e);
    return NextResponse.json(
      { error: "服务异常，请稍后再试" },
      { status: 500 }
    );
  }
}
