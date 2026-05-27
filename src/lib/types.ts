export type SceneType =
  | "情绪日记"
  | "探店体验"
  | "好物推荐"
  | "避雷经历"
  | "旅行回忆";

export type PostStyle =
  | "真实日记感"
  | "情绪共鸣感"
  | "实用攻略感"
  | "种草推荐感"
  | "避雷复盘感";

export type RecordingState = "idle" | "recording" | "transcribed";

export interface GuideQuestion {
  id: string;
  question: string;
}

export interface SceneGuide {
  sceneType: SceneType;
  questions: GuideQuestion[];
}

export interface UserInput {
  sceneType: SceneType;
  rawText: string;
}

export interface ContentAnalysis {
  scene: string;
  emotion: string;
  topic: string;
  keyDetails: string[];
  highlights: string[];
  drawbacks: string[];
  targetAudience: string[];
}

export interface XiaohongshuPost {
  title: string;
  coverText: string;
  body: string;
  hashtags: string[];
  commentPrompt: string;
  style: PostStyle;
}

export interface SceneConfig {
  type: SceneType;
  description: string;
  emoji: string;
  gradient: string;
  mockText: string;
}

export interface AppState {
  selectedScene: SceneType | null;
  guideQuestions: GuideQuestion[];
  rawText: string;
  selectedStyle: PostStyle;
  analysis: ContentAnalysis | null;
  generatedPost: XiaohongshuPost | null;
  isGenerating: boolean;
  recordingState: RecordingState;
}
