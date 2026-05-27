"use client";

import { useState } from "react";
import {
  SceneType,
  PostStyle,
  XiaohongshuPost,
  ContentAnalysis,
} from "@/lib/types";
import { analyzeContent, generatePost } from "@/lib/api";
import SceneSelect from "@/components/SceneSelect";
import InterviewGuide from "@/components/InterviewGuide";
import AnalysisPreview from "@/components/AnalysisPreview";
import PostResult from "@/components/PostResult";

type Step = "select" | "interview" | "analysis" | "result";

export default function Home() {
  const [step, setStep] = useState<Step>("select");
  const [scene, setScene] = useState<SceneType | null>(null);
  const [rawText, setRawText] = useState("");
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [post, setPost] = useState<XiaohongshuPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleSceneSelect = (s: SceneType) => {
    setScene(s);
    setStep("interview");
    setError("");
  };

  const handleInterviewSubmit = async (text: string) => {
    if (!scene) return;
    setRawText(text);
    setIsGenerating(true);
    setError("");

    try {
      const analysisResult = await analyzeContent(scene, text);
      setAnalysis(analysisResult);
      setStep("analysis");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "分析失败，请稍后再试");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePost = async () => {
    if (!scene || !analysis) return;
    setIsGenerating(true);
    setError("");

    try {
      const postResult = await generatePost(
        scene,
        rawText,
        "真实日记感" as PostStyle,
        analysis
      );
      setPost(postResult);
      setStep("result");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "生成失败，请稍后再试");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setError("");
    if (step === "interview") {
      setStep("select");
      setScene(null);
    } else if (step === "analysis") {
      setStep("interview");
    } else if (step === "result") {
      setStep("analysis");
    }
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl shadow-lg text-sm max-w-md animate-slide-up">
          {error}
          <button
            onClick={() => setError("")}
            className="ml-3 text-red-400 hover:text-red-600"
          >
            关闭
          </button>
        </div>
      )}
      {step === "select" && <SceneSelect onSelect={handleSceneSelect} />}
      {step === "interview" && scene && (
        <InterviewGuide
          scene={scene}
          onSubmit={handleInterviewSubmit}
          onBack={handleBack}
          isGenerating={isGenerating}
        />
      )}
      {step === "analysis" && scene && analysis && (
        <AnalysisPreview
          scene={scene}
          rawText={rawText}
          analysis={analysis}
          onConfirm={handleGeneratePost}
          onBack={handleBack}
          isGenerating={isGenerating}
        />
      )}
      {step === "result" && scene && analysis && post && (
        <PostResult
          scene={scene}
          rawText={rawText}
          analysis={analysis}
          initialPost={post}
          onBack={handleBack}
        />
      )}
    </>
  );
}
