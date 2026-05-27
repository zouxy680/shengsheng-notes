import { NextResponse } from "next/server";

const API_KEY = process.env.AI_API_KEY || "";
const BASE_URL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
const MODEL = process.env.AI_MODEL || "gpt-4o-mini";

export function requireApiKey() {
  if (!API_KEY) {
    return NextResponse.json(
      {
        error:
          "未配置 AI API Key。请在 .env.local 中设置 AI_API_KEY 和 AI_BASE_URL。",
      },
      { status: 500 }
    );
  }
  return null;
}

export async function callAI(
  messages: { role: string; content: string }[],
  temperature = 0.5
) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("AI API error:", err);
    throw new Error(`AI_API_ERROR:${err}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content || "";

  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("INVALID_JSON");
    }
    return JSON.parse(jsonMatch[0]);
  }
}

export function handleAIError(e: unknown) {
  if (e instanceof Error) {
    if (e.message.startsWith("AI_API_ERROR:")) {
      return NextResponse.json(
        { error: "AI API 调用失败", detail: e.message.slice(13) },
        { status: 502 }
      );
    }
    if (e.message === "INVALID_JSON") {
      return NextResponse.json(
        { error: "AI 返回格式异常" },
        { status: 502 }
      );
    }
  }
  console.error("AI error:", e);
  return NextResponse.json(
    { error: "服务异常，请稍后再试" },
    { status: 500 }
  );
}
