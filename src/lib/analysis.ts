export type Platform = "YouTube" | "Spotify" | "Melon";

export type CategoryBreakdown = {
  name: string;
  value: number;
};

export type AnalysisResult = {
  platform: Platform;
  inputText: string;
  keywords: string[];
  categories: CategoryBreakdown[];
  summary: string[];
  catchphrase: string;
  algoType: string;
  createdAt: string;
};

const STOP_WORDS = new Set([
  "the",
  "and",
  "that",
  "this",
  "with",
  "from",
  "your",
  "just",
  "have",
  "you",
  "for",
  "are",
  "가",
  "이",
  "은",
  "는",
  "을",
  "를",
  "의",
  "에",
  "와",
  "과",
  "한",
  "그리고",
  "하지만",
  "또",
  "더",
  "보다",
  "영상",
  "노래",
  "듣기",
  "보기",
]);

const SENSITIVE_KEYWORDS = [
  "정치",
  "종교",
  "성",
  "섹스",
  "건강",
  "질병",
  "병",
  "우울",
  "암",
  "임신",
  "약물",
  "도박",
  "범죄",
];

const CATEGORY_MAP: Record<string, string> = {
  "lofi": "감성",
  "힙합": "음악",
  "pop": "음악",
  "kpop": "음악",
  "ost": "음악",
  "study": "지식",
  "coding": "지식",
  "개발": "지식",
  "tutorial": "지식",
  "game": "게임",
  "gaming": "게임",
  "플레이": "게임",
  "vlog": "라이프",
  "여행": "라이프",
  "요리": "라이프",
  "요가": "라이프",
  "힐링": "감성",
  "감성": "감성",
  "다큐": "지식",
};

const DEFAULT_CATEGORIES = ["음악", "지식", "게임", "라이프", "감성", "기타"];

const normalize = (word: string) => word.toLowerCase().trim();

const tokenize = (text: string) =>
  text
    .split(/[^\p{L}\p{N}]+/gu)
    .map((word) => normalize(word))
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

const isSensitive = (word: string) =>
  SENSITIVE_KEYWORDS.some((keyword) => word.includes(keyword));

export const maskKeyword = (word: string) =>
  isSensitive(word) ? "•••" : word;

export const getMaskedKeywords = (keywords: string[], allowSensitive: boolean) =>
  allowSensitive ? keywords : keywords.map((word) => maskKeyword(word));

const buildCategories = (keywords: string[]): CategoryBreakdown[] => {
  const counts = DEFAULT_CATEGORIES.reduce<Record<string, number>>(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    {}
  );

  keywords.forEach((keyword) => {
    const key = Object.keys(CATEGORY_MAP).find((entry) =>
      keyword.includes(entry)
    );
    const category = key ? CATEGORY_MAP[key] : "기타";
    counts[category] += 1;
  });

  return DEFAULT_CATEGORIES.map((category) => ({
    name: category,
    value: counts[category],
  })).filter((item) => item.value > 0);
};

const buildSummary = (keywords: string[], categories: CategoryBreakdown[]) => {
  const primary = keywords[0] ?? "트렌드";
  const secondary = keywords[1] ?? "발견";
  const dominant = categories.sort((a, b) => b.value - a.value)[0]?.name ??
    "탐험";
  return [
    `당신의 알고리즘은 ${primary} 중심으로 빠르게 반응해요.`,
    `${secondary} 키워드를 통해 ${dominant} 영역을 깊게 파고들고 있어요.`,
    `짧은 시간에도 다양한 주제를 교차 소비하는 다이내믹한 패턴입니다.`,
  ];
};

const buildAlgoType = (keywords: string[], categories: CategoryBreakdown[]) => {
  const dominant = categories.sort((a, b) => b.value - a.value)[0]?.name ?? "X";
  const core = keywords[0]?.slice(0, 2).toUpperCase() ?? "AL";
  return `AM-${dominant.slice(0, 2)}-${core}`;
};

const buildCatchphrase = (keywords: string[]) => {
  const primary = keywords[0] ?? "탐험";
  const secondary = keywords[1] ?? "리듬";
  return `${primary}로 시작해 ${secondary}로 확장하는 알고리즘 탐험가`;
};

export const analyzeInput = (text: string, platform: Platform): AnalysisResult => {
  const tokens = tokenize(text);
  const counts = tokens.reduce<Record<string, number>>((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;
    return acc;
  }, {});

  const keywords = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  const categories = buildCategories(keywords);
  const summary = buildSummary(keywords, categories);
  const catchphrase = buildCatchphrase(keywords);
  const algoType = buildAlgoType(keywords, categories);

  return {
    platform,
    inputText: text,
    keywords,
    categories,
    summary,
    catchphrase,
    algoType,
    createdAt: new Date().toISOString(),
  };
};

export const createComparisonQuestions = (
  myKeywords: string[],
  friendKeywords: string[]
) => {
  const uniqueMine = myKeywords.filter((keyword) =>
    !friendKeywords.includes(keyword)
  );
  const uniqueFriend = friendKeywords.filter((keyword) =>
    !myKeywords.includes(keyword)
  );

  return [
    `요즘 ${uniqueMine[0] ?? "새로운"} 콘텐츠를 어떻게 발견해?`,
    `${uniqueFriend[0] ?? "특정"} 장르에 빠진 계기가 있어?`,
    `우리 공통 키워드 말고 서로 추천하고 싶은 콘텐츠 하나씩 알려줘.`,
  ];
};

export const sampleFriendProfile = {
  name: "친구 리나",
  platform: "Spotify" as Platform,
  keywords: [
    "citypop",
    "재즈",
    "night",
    "workout",
    "플레이리스트",
    "러닝",
    "감성",
    "힐링",
    "lofi",
    "vlog",
  ],
  categories: [
    { name: "음악", value: 4 },
    { name: "감성", value: 3 },
    { name: "라이프", value: 3 },
  ],
  catchphrase: "재즈와 러닝으로 하루를 리셋하는 타입",
  algoType: "AM-음악-CI",
};
