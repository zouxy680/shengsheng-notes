import { SceneConfig, SceneGuide, SceneType, PostStyle } from "./types";

export const sceneConfigs: SceneConfig[] = [
  {
    type: "情绪日记",
    description: "记录一个瞬间、一种感受、一段心情",
    emoji: "💭",
    gradient: "from-pink-400 to-rose-400",
    mockText:
      "今天下班路上突然觉得一个人走也挺舒服的。以前我会觉得没人一起吃饭、没人一起回家有点孤单，但今天路过便利店，买了一瓶热牛奶，慢慢走回去，反而觉得这种安静也挺好的。风吹过来的时候，突然觉得生活也没那么难。",
  },
  {
    type: "探店体验",
    description: "咖啡店、餐厅、展览、城市漫游",
    emoji: "☕",
    gradient: "from-amber-400 to-orange-400",
    mockText:
      "今天去了最近挺多人提到的一家新咖啡店，第一感觉是环境确实舒服，空间布置也很适合拍照。但真实体验下来，我觉得它更适合周末和朋友来坐坐，而不是专门为了咖啡来。咖啡味道不算难喝，但也没有特别惊喜。比较加分的是氛围感不错，聊天、拍照都挺合适；需要注意的是人真的不少，如果想安静办公，可能不太适合。",
  },
  {
    type: "好物推荐",
    description: "真实使用体验、优缺点、适合人群",
    emoji: "✨",
    gradient: "from-emerald-400 to-teal-400",
    mockText:
      "最近入手了一款阅读灯，用了一个多星期真的觉得不错。最打动我的是它的色温可以调，晚上看书的时候眼睛很舒服，不会刺眼。而且充电一次能用很久，我每天看一小时左右，充了一次用了一周多还没充。缺点是底座稍微有点轻，有时候会被碰倒。但整体来说性价比很高，推荐给喜欢睡前看书的朋友。",
  },
  {
    type: "避雷经历",
    description: "理性整理一次不太好的体验",
    emoji: "⚡",
    gradient: "from-red-400 to-pink-400",
    mockText:
      "上周去了某网红餐厅，排了快一个小时的队，结果体验挺一般的。菜品颜值确实在线，但味道对不起那个价格。最离谱的是服务，我们等了二十分钟才有人来点单，中间催了两次。环境倒是挺好看的，适合拍照，但如果是为了吃饭，真的不推荐。人均两百多，性价比太低了。",
  },
  {
    type: "旅行回忆",
    description: "把旅行碎片整理成完整帖子",
    emoji: "🏔️",
    gradient: "from-sky-400 to-blue-400",
    mockText:
      "上个月去了大理，待了四天，真的太治愈了。最难忘的是在洱海边骑行的那段路，风很大，阳光刚好，两边是田野和远处的山，感觉整个人都被放空了。古城比想象中商业化，但随便走走也还好。推荐去双廊看日落，真的绝美。唯一想吐槽的是旺季人太多了，住宿也贵了不少。适合想要慢节奏放空的人去。",
  },
];

export const sceneGuides: Record<SceneType, SceneGuide> = {
  情绪日记: {
    sceneType: "情绪日记",
    questions: [
      { id: "1", question: "今天发生了什么让你想记录？" },
      { id: "2", question: "当时你最强烈的感受是什么？" },
      { id: "3", question: "有没有一个具体画面或细节？" },
      { id: "4", question: "这件事让你想到什么？" },
      { id: "5", question: "你希望读到这篇帖子的人感受到什么？" },
    ],
  },
  探店体验: {
    sceneType: "探店体验",
    questions: [
      { id: "1", question: "你去了哪里？它给你的第一感觉是什么？" },
      { id: "2", question: "最让你满意的地方是什么？" },
      { id: "3", question: "有没有不太满意或需要提醒别人的地方？" },
      { id: "4", question: "你觉得它适合什么样的人？" },
      { id: "5", question: "如果用一句话总结这次体验，你会怎么说？" },
    ],
  },
  好物推荐: {
    sceneType: "好物推荐",
    questions: [
      { id: "1", question: "你想分享的东西是什么？" },
      { id: "2", question: "你是在什么场景下使用它的？" },
      { id: "3", question: "它最打动你的地方是什么？" },
      { id: "4", question: "有没有缺点或不适合的人？" },
      { id: "5", question: "你会推荐给谁？" },
    ],
  },
  避雷经历: {
    sceneType: "避雷经历",
    questions: [
      { id: "1", question: "这次经历发生在什么场景？" },
      { id: "2", question: "具体让你不满意的点是什么？" },
      { id: "3", question: "哪些是事实，哪些是你的感受？" },
      { id: "4", question: "你希望提醒别人注意什么？" },
      { id: "5", question: "如果重新选择，你会怎么做？" },
    ],
  },
  旅行回忆: {
    sceneType: "旅行回忆",
    questions: [
      { id: "1", question: "你去了哪里？" },
      { id: "2", question: "这趟旅行最难忘的瞬间是什么？" },
      { id: "3", question: "有没有推荐的地点、路线或体验？" },
      { id: "4", question: "有没有踩雷或想提醒别人的地方？" },
      { id: "5", question: "你会推荐什么样的人去？" },
    ],
  },
};

export const postStyles: {
  label: string;
  value: PostStyle;
  color: string;
  emoji: string;
  desc: string;
}[] = [
  {
    label: "真实日记感",
    value: "真实日记感",
    emoji: "📝",
    desc: "像写日记一样，自然、随意、真诚",
    color: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  },
  {
    label: "情绪共鸣感",
    value: "情绪共鸣感",
    emoji: "💭",
    desc: "从个人故事延伸到共同情感",
    color: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  },
  {
    label: "实用攻略感",
    value: "实用攻略感",
    emoji: "📋",
    desc: "结构清晰，干货满满，有参考价值",
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  },
  {
    label: "种草推荐感",
    value: "种草推荐感",
    emoji: "✨",
    desc: "场景化安利，朋友推荐的感觉",
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  },
  {
    label: "避雷复盘感",
    value: "避雷复盘感",
    emoji: "⚠️",
    desc: "理性吐槽，事实说话，帮人避坑",
    color: "bg-red-100 text-red-700 hover:bg-red-200",
  },
];
