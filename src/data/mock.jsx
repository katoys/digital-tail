import { Users, HeartHandshake, BadgeCheck, Music } from "lucide-react";

export const timeline = [
  { time: "08:00", emoji: "🌅", text: "おはようの挨拶をしました", border: "#fbbf24" },
  { time: "10:00", emoji: "💊", text: "お薬の時間の声かけ完了", border: "#34d399" },
  { time: "12:30", emoji: "🍚", text: "お昼ごはんを食べたようです", border: "#fb923c" },
  { time: "14:00", emoji: "🗣️", text: "昔飼っていた犬の話で盛り上がりました", border: "#fb7185" },
];

export const appliances = [
  {
    id: "ac",
    label: "エアコン",
    room: "リビング",
    defaultOn: false,
    temp: 26,
    mode: "cool",
    alert: { active: true, msg: "室温29°C — まだつけていません" },
  },
  {
    id: "light",
    label: "照明",
    room: "リビング",
    defaultOn: true,
    alert: { active: false },
  },
  {
    id: "tv",
    label: "テレビ",
    room: "居間",
    defaultOn: false,
    alert: { active: false },
  },
];

export const weeklyScores = [
  { day: "月", mood: 72, activity: 68 },
  { day: "火", mood: 85, activity: 78 },
  { day: "水", mood: 70, activity: 55 },
  { day: "木", mood: 91, activity: 88 },
  { day: "金", mood: 88, activity: 82 },
  { day: "土", mood: 80, activity: 74 },
  { day: "日", mood: 76, activity: 70 },
];

export const monthlyHighlights = [
  { week: "第1週", score: 78, note: "薬の飲み忘れ2回" },
  { week: "第2週", score: 83, note: "会話量が増加" },
  { week: "第3週", score: 71, note: "室温アラート多発" },
  { week: "第4週", score: 86, note: "活動量が過去最高" },
];

export const careUsers = [
  { id: 1, name: "田中 花子", age: 82, status: "good",    mood: 88, activity: 72, medicine: true  },
  { id: 2, name: "鈴木 義雄", age: 78, status: "caution", mood: 51, activity: 38, medicine: false },
  { id: 3, name: "佐藤 ミツ", age: 75, status: "good",    mood: 94, activity: 85, medicine: true  },
  { id: 4, name: "伊藤 正夫", age: 85, status: "alert",   mood: 20, activity: 10, medicine: false },
];

export const careProposals = [
  {
    id: 1,
    category: "通いの場",
    Icon: Users,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "地域サロン「ひまわりの会」",
    reason: "会話ログより、昔の犬や近所の話題を好む傾向が判明。同世代との交流の場が気分スコア向上に有効と判断。",
    detail: "毎週火曜 10:00〜12:00 / 徒歩5分",
    tag: "週1回",
    tagColor: "bg-violet-50 text-violet-600",
    priority: "推奨",
    priorityColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 2,
    category: "介護サービス",
    Icon: HeartHandshake,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    title: "デイサービス追加（午後コース）",
    reason: "第3週の室温アラート多発・午後の活動量低下パターンから、日中の見守り強化が必要。",
    detail: "月・水 13:00〜17:00 追加利用",
    tag: "週2回",
    tagColor: "bg-rose-50 text-rose-600",
    priority: "要検討",
    priorityColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    category: "福祉用具",
    Icon: BadgeCheck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "室温自動管理センサー設置",
    reason: "今月7回の室温アラート。SwitchBot温度センサーと連携し、28度超えで自動でエアコン起動する設定を推奨。",
    detail: "レンタル月額 ¥550〜 / 設置対応可",
    tag: "環境改善",
    tagColor: "bg-blue-50 text-blue-600",
    priority: "優先",
    priorityColor: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    category: "生きがい支援",
    Icon: Music,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "懐メロ音楽サービス（ポチ連携）",
    reason: "会話分析より昭和歌謡への興味を検知。ポチを通じた音楽再生が認知機能維持と気分向上に寄与する可能性。",
    detail: "月額 ¥0（ポチ標準機能）",
    tag: "今すぐ開始",
    tagColor: "bg-amber-50 text-amber-600",
    priority: "提案",
    priorityColor: "bg-slate-100 text-slate-600",
  },
];

export const STATUS = {
  good:    { badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400", label: "良好"   },
  caution: { badge: "bg-amber-100 text-amber-700",     dot: "bg-amber-400",   label: "要確認" },
  alert:   { badge: "bg-red-100 text-red-600",         dot: "bg-red-500",     label: "緊急"   },
};
