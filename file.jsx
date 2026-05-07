import { useState, useEffect } from "react";
import {
  Settings,
  Mic,
  Bell,
  Heart,
  Thermometer,
  AlertTriangle,
  Clock,
  Wind,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  AlertCircle,
  Zap,
  Home,
  LayoutDashboard,
  Phone,
  Minus,
  Plus,
  Power,
  Snowflake,
  Sun,
  BarChart2,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bike,
  Music,
  BookOpen,
  Utensils,
  HeartHandshake,
  Sparkles,
  BadgeCheck,
  MessageSquare,
  ClipboardList,
  Activity,
  Calendar,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────
function PawPrint({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor">
      <ellipse cx="10" cy="10" rx="5" ry="6" opacity="0.4" />
      <ellipse cx="22" cy="8" rx="5" ry="6" opacity="0.4" />
      <ellipse cx="33" cy="13" rx="4.5" ry="5.5" opacity="0.4" />
      <ellipse cx="5" cy="22" rx="4" ry="5" opacity="0.4" />
      <ellipse cx="20" cy="28" rx="12" ry="10" />
    </svg>
  );
}
function MiniBar({ value, color }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden flex-1">
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const timeline = [
  {
    time: "08:00",
    emoji: "🌅",
    text: "おはようの挨拶をしました",
    border: "#fbbf24",
  },
  {
    time: "10:00",
    emoji: "💊",
    text: "お薬の時間の声かけ完了",
    border: "#34d399",
  },
  {
    time: "12:30",
    emoji: "🍚",
    text: "お昼ごはんを食べたようです",
    border: "#fb923c",
  },
  {
    time: "14:00",
    emoji: "🗣️",
    text: "昔飼っていた犬の話で盛り上がりました",
    border: "#fb7185",
  },
];

const appliances = [
  {
    id: "ac",
    label: "エアコン",
    room: "リビング",
    icon: "ac",
    defaultOn: false,
    temp: 26,
    mode: "cool",
    alert: { active: true, msg: "室温29°C — まだつけていません" },
  },
  {
    id: "light",
    label: "照明",
    room: "リビング",
    icon: "light",
    defaultOn: true,
    alert: { active: false },
  },
  {
    id: "tv",
    label: "テレビ",
    room: "居間",
    icon: "tv",
    defaultOn: false,
    alert: { active: false },
  },
];

const weeklyScores = [
  { day: "月", mood: 72, activity: 68 },
  { day: "火", mood: 85, activity: 78 },
  { day: "水", mood: 70, activity: 55 },
  { day: "木", mood: 91, activity: 88 },
  { day: "金", mood: 88, activity: 82 },
  { day: "土", mood: 80, activity: 74 },
  { day: "日", mood: 76, activity: 70 },
];

const monthlyHighlights = [
  { week: "第1週", score: 78, note: "薬の飲み忘れ2回" },
  { week: "第2週", score: 83, note: "会話量が増加" },
  { week: "第3週", score: 71, note: "室温アラート多発" },
  { week: "第4週", score: 86, note: "活動量が過去最高" },
];

const careUsers = [
  {
    id: 1,
    name: "田中 花子",
    age: 82,
    status: "good",
    mood: 88,
    activity: 72,
    medicine: true,
  },
  {
    id: 2,
    name: "鈴木 義雄",
    age: 78,
    status: "caution",
    mood: 51,
    activity: 38,
    medicine: false,
  },
  {
    id: 3,
    name: "佐藤 ミツ",
    age: 75,
    status: "good",
    mood: 94,
    activity: 85,
    medicine: true,
  },
  {
    id: 4,
    name: "伊藤 正夫",
    age: 85,
    status: "alert",
    mood: 20,
    activity: 10,
    medicine: false,
  },
];

// ── Shared care proposals data (shown in both care detail + family app)
const careProposals = [
  {
    id: 1,
    category: "通いの場",
    icon: <Users size={15} />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "地域サロン「ひまわりの会」",
    reason:
      "会話ログより、昔の犬や近所の話題を好む傾向が判明。同世代との交流の場が気分スコア向上に有効と判断。",
    detail: "毎週火曜 10:00〜12:00 / 徒歩5分",
    tag: "週1回",
    tagColor: "bg-violet-50 text-violet-600",
    priority: "推奨",
    priorityColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 2,
    category: "介護サービス",
    icon: <HeartHandshake size={15} />,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    title: "デイサービス追加（午後コース）",
    reason:
      "第3週の室温アラート多発・午後の活動量低下パターンから、日中の見守り強化が必要。",
    detail: "月・水 13:00〜17:00 追加利用",
    tag: "週2回",
    tagColor: "bg-rose-50 text-rose-600",
    priority: "要検討",
    priorityColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    category: "福祉用具",
    icon: <BadgeCheck size={15} />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "室温自動管理センサー設置",
    reason:
      "今月7回の室温アラート。SwitchBot温度センサーと連携し、28度超えで自動でエアコン起動する設定を推奨。",
    detail: "レンタル月額 ¥550〜 / 設置対応可",
    tag: "環境改善",
    tagColor: "bg-blue-50 text-blue-600",
    priority: "優先",
    priorityColor: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    category: "生きがい支援",
    icon: <Music size={15} />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "懐メロ音楽サービス（ポチ連携）",
    reason:
      "会話分析より昭和歌謡への興味を検知。ポチを通じた音楽再生が認知機能維持と気分向上に寄与する可能性。",
    detail: "月額 ¥0（ポチ標準機能）",
    tag: "今すぐ開始",
    tagColor: "bg-amber-50 text-amber-600",
    priority: "提案",
    priorityColor: "bg-slate-100 text-slate-600",
  },
];

const STATUS = {
  good: {
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-400",
    label: "良好",
  },
  caution: {
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-400",
    label: "要確認",
  },
  alert: { badge: "bg-red-100 text-red-600", dot: "bg-red-500", label: "緊急" },
};

// ─── ApplianceCard ─────────────────────────────────────────────────
function ApplianceCard({ app }) {
  const [on, setOn] = useState(app.defaultOn);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState(app.temp || 26);
  const [mode, setMode] = useState(app.mode || "cool");
  const [done, setDone] = useState(false);
  const isAC = app.id === "ac";

  const toggle = () => {
    if (!isAC) {
      setOn((v) => !v);
      return;
    }
    if (on) {
      setOn(false);
      setDone(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOn(true);
      setDone(true);
    }, 1500);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border:
          app.alert?.active && !on
            ? "1.5px solid rgba(251,191,36,.6)"
            : on
              ? "1.5px solid rgba(99,102,241,.3)"
              : "1.5px solid #e2e8f0",
        boxShadow:
          app.alert?.active && !on
            ? "0 3px 12px rgba(251,191,36,.12)"
            : "0 2px 8px rgba(0,0,0,.06)",
      }}
    >
      {app.alert?.active && !on && (
        <div
          className="flex items-center gap-2 px-3.5 py-2"
          style={{ background: "linear-gradient(135deg,#fffbeb,#fef9c3)" }}
        >
          <AlertTriangle size={12} className="text-amber-500 flex-shrink-0" />
          <span className="text-xs text-amber-700 font-medium">
            {app.alert.msg}
          </span>
        </div>
      )}
      <div className="px-4 py-3.5 flex items-center gap-3 bg-white">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${on ? "bg-indigo-50" : "bg-slate-100"}`}
        >
          {isAC ? (
            <Wind
              size={20}
              className={on ? "text-indigo-500" : "text-slate-400"}
            />
          ) : app.id === "light" ? (
            <Sun
              size={20}
              className={on ? "text-amber-400" : "text-slate-400"}
            />
          ) : (
            <span className="text-lg">📺</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800">{app.label}</p>
          <p
            className={`text-xs font-semibold ${on ? "text-indigo-500" : "text-slate-400"}`}
          >
            {on
              ? isAC
                ? `冷房 · ${temp}°C · 運転中`
                : "ON"
              : `${app.room} · 停止中`}
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={loading}
          className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${on ? "bg-indigo-500" : loading ? "bg-slate-300" : "bg-slate-200"}`}
          style={{ boxShadow: on ? "0 0 12px rgba(99,102,241,.4)" : "none" }}
        >
          {loading ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            </span>
          ) : (
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${on ? "left-[26px]" : "left-0.5"}`}
            />
          )}
        </button>
      </div>
      {isAC && on && (
        <div
          className="px-4 py-3 border-t border-indigo-50"
          style={{ background: "linear-gradient(135deg,#eef2ff,#f0f9ff)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {[
                { id: "cool", icon: <Snowflake size={12} />, label: "冷房" },
                { id: "warm", icon: <Sun size={12} />, label: "暖房" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${mode === m.id ? "bg-indigo-500 text-white shadow-sm" : "bg-white text-slate-500 border border-slate-200"}`}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTemp((v) => Math.max(16, v - 1))}
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500"
              >
                <Minus size={13} />
              </button>
              <span className="text-lg font-bold text-indigo-600 w-12 text-center">
                {temp}°C
              </span>
              <button
                onClick={() => setTemp((v) => Math.min(30, v + 1))}
                className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          {done && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <CheckCircle size={11} />
              遠隔操作が完了しました
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CareProposalCard ──────────────────────────────────────────────
function CareProposalCard({ p, forFamily = false }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all ${forFamily ? "" : ""}`}
      style={{
        border: "1.5px solid #e8ecf0",
        boxShadow: "0 2px 10px rgba(0,0,0,.06)",
        background: "white",
      }}
    >
      <button
        className="w-full text-left px-4 py-3.5 flex items-start gap-3"
        onClick={() => setExpanded((v) => !v)}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${p.iconBg} ${p.iconColor}`}
        >
          {p.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${p.priorityColor}`}
            >
              {p.priority}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {p.category}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug">
            {p.title}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{p.detail}</p>
        </div>
        <div
          className={`flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-90" : ""}`}
        >
          <ChevronRight size={15} className="text-slate-400" />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <div
            className="rounded-xl p-3"
            style={{
              background: "linear-gradient(135deg,#f8faff,#f0f4ff)",
              border: "1px solid rgba(99,102,241,.1)",
            }}
          >
            <div className="flex items-start gap-2">
              <Zap size={12} className="text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                {p.reason}
              </p>
            </div>
          </div>
          {!forFamily && (
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow: "0 3px 10px rgba(99,102,241,.3)",
                }}
              >
                サービス計画に追加
              </button>
              <button className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">
                次回訪問で相談
              </button>
            </div>
          )}
          {forFamily && (
            <button
              className="mt-3 w-full py-2.5 rounded-xl text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#ff8c42,#ff6b1a)",
                boxShadow: "0 3px 10px rgba(255,140,66,.3)",
              }}
            >
              ケアマネに相談する
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── UserDetailScreen ──────────────────────────────────────────────
function UserDetailScreen({ onBack }) {
  const [tab, setTab] = useState("summary");

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: "#f1f5f9" }}
    >
      {/* Header */}
      <div
        className="px-4 pt-10 pb-0"
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 70%,#312e81 100%)",
          borderRadius: "0 0 28px 28px",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex-1">
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
              利用者詳細
            </p>
            <h2 className="text-white font-bold text-lg leading-tight">
              田中 花子 さん
            </h2>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
            style={{
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            <Phone size={12} />
            家族へ連絡
          </button>
        </div>

        {/* Profile strip */}
        <div className="flex items-center gap-4 px-1 pb-4">
          <div className="relative">
            <div
              className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-200 to-amber-300 flex items-center justify-center text-3xl"
              style={{ boxShadow: "0 0 0 3px rgba(255,255,255,.2)" }}
            >
              😊
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-slate-300">82歳 · 女性</span>
              <span className="text-xs text-slate-300">·</span>
              <span className="text-xs text-slate-300">ケアレベル 2</span>
              <span className="text-xs text-slate-300">·</span>
              <span className="text-xs text-slate-300">
                担当：山田 ケアマネ
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                ● 良好
              </span>
              <span className="text-[11px] text-slate-400">ロボット：ポチ</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 -mb-px">
          {[
            {
              id: "summary",
              label: "月次サマリー",
              icon: <Activity size={12} />,
            },
            {
              id: "proposals",
              label: "サービス提案",
              icon: <Sparkles size={12} />,
            },
            {
              id: "record",
              label: "支援記録",
              icon: <ClipboardList size={12} />,
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold transition-all rounded-t-xl ${
                tab === t.id
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-8">
        {/* ── Monthly Summary Tab ── */}
        {tab === "summary" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  label: "平均気分",
                  value: "83%",
                  delta: "+5.2%",
                  up: true,
                  color: "#10b981",
                },
                {
                  label: "活動量",
                  value: "74%",
                  delta: "+2.8%",
                  up: true,
                  color: "#6366f1",
                },
                {
                  label: "服薬率",
                  value: "91%",
                  delta: "-1.0%",
                  up: false,
                  color: "#f59e0b",
                },
              ].map((k, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-3 bg-white text-center"
                  style={{
                    boxShadow: "0 2px 8px rgba(0,0,0,.07)",
                    border: "1px solid #e8ecf0",
                  }}
                >
                  <p className="text-[10px] text-slate-500 font-medium mb-1 leading-tight">
                    {k.label}
                  </p>
                  <p className="text-lg font-bold text-slate-800 leading-tight">
                    {k.value}
                  </p>
                  <div
                    className={`flex items-center justify-center gap-0.5 text-[10px] font-bold mt-0.5 ${k.up ? "text-emerald-500" : "text-red-400"}`}
                  >
                    {k.up ? (
                      <ArrowUpRight size={10} />
                    ) : (
                      <ArrowDownRight size={10} />
                    )}
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(99,102,241,.15)" }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                }}
              >
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                  <Zap size={13} className="text-white" />
                </div>
                <span className="text-xs font-bold text-white">
                  AI月次サマリー
                </span>
                <span className="ml-auto text-[10px] text-indigo-200">
                  2025年6月
                </span>
              </div>
              <div
                className="p-4"
                style={{
                  background: "linear-gradient(135deg,#eef2ff,#f5f3ff)",
                }}
              >
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  6月は第4週に
                  <span className="font-bold text-indigo-600">
                    活動量が月内最高
                  </span>
                  を記録。
                  会話ログには「昔の犬」「近所の顔見知り」など社会的な話題が増加傾向にあり、
                  <span className="font-bold text-emerald-600">
                    交流ニーズの高まり
                  </span>
                  が読み取れます。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  一方、第3週は室温アラートが
                  <span className="font-bold text-amber-600">計7回</span>
                  発生し、 睡眠の質の低下と翌日の気分スコア低下（平均
                  -12pt）との相関が確認されました。
                  環境面の改善が最優先事項です。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  服薬は月曜・水曜に未確認が集中（計4回）。声かけタイミングを
                  <span className="font-bold text-indigo-600">
                    9:30 → 10:15に変更
                  </span>
                  することで改善が見込めます。
                </p>
              </div>
            </div>

            {/* Monthly score bars */}
            <div
              className="rounded-2xl p-4 bg-white"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,.07)",
                border: "1px solid #e2e8f0",
              }}
            >
              <p className="text-xs font-bold text-slate-700 mb-3">
                週別スコア推移
              </p>
              <div className="space-y-3">
                {monthlyHighlights.map((w, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600">
                        {w.week}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">
                          {w.note}
                        </span>
                        <span
                          className={`text-xs font-bold ${w.score >= 82 ? "text-emerald-600" : w.score >= 76 ? "text-amber-500" : "text-red-400"}`}
                        >
                          {w.score}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${w.score}%`,
                          background:
                            w.score >= 82
                              ? "linear-gradient(90deg,#6366f1,#8b5cf6)"
                              : w.score >= 76
                                ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                                : "linear-gradient(90deg,#ef4444,#f97316)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk flags */}
            <div
              className="rounded-2xl overflow-hidden bg-white"
              style={{
                boxShadow: "0 2px 10px rgba(0,0,0,.06)",
                border: "1.5px solid #fca5a5",
              }}
            >
              <div
                className="px-4 py-2.5 border-b border-red-50 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#fff5f5,#ffe4e4)",
                }}
              >
                <AlertCircle size={13} className="text-red-400" />
                <p className="text-xs font-bold text-red-700">
                  今月の気になるポイント
                </p>
              </div>
              {[
                { text: "月・水の服薬未確認が4回（先月比+2回）", level: "mid" },
                { text: "室温29度超えのアラートが7回発生", level: "high" },
                { text: "午後14時以降の活動量が前月比 -18%", level: "low" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 last:border-0"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${f.level === "high" ? "bg-red-400" : f.level === "mid" ? "bg-amber-400" : "bg-slate-300"}`}
                  />
                  <p className="text-xs text-slate-700">{f.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Proposals Tab ── */}
        {tab === "proposals" && (
          <>
            {/* AI intro */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg,#0f172a,#1e293b)",
                boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-violet-300" />
                <span className="text-xs font-bold text-violet-300">
                  AIによるサービス最適化提案
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                今月の活動ログ・会話データ・アラート履歴を分析し、
                田中さんの生活の質向上に有効な社会資源・介護サービスを提案します。
              </p>
            </div>

            <div className="space-y-2.5">
              {careProposals.map((p) => (
                <CareProposalCard key={p.id} p={p} forFamily={false} />
              ))}
            </div>

            {/* Actions */}
            <div
              className="rounded-2xl p-4 bg-white"
              style={{
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
              }}
            >
              <p className="text-xs font-bold text-slate-600 mb-3">
                これらの提案を
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "サービス計画書に反映",
                  "家族へ共有する",
                  "次回訪問で説明",
                  "提案書をPDF出力",
                ].map((l, i) => (
                  <button
                    key={i}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 text-center"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Record Tab ── */}
        {tab === "record" && (
          <div className="space-y-3">
            {[
              {
                date: "6/24（月）",
                type: "訪問",
                note: "食欲良好。エアコン設定を確認。服薬ノートを更新した。",
                by: "山田 CM",
              },
              {
                date: "6/17（月）",
                type: "電話",
                note: "息子（一郎氏）より連絡。週末に帰省予定との報告を受けた。",
                by: "山田 CM",
              },
              {
                date: "6/10（月）",
                type: "訪問",
                note: "室温が高くポチのアラートを確認。ご本人にエアコン使用を促した。次回福祉用具相談を提案。",
                by: "山田 CM",
              },
              {
                date: "6/3（月）",
                type: "訪問",
                note: "気分良好。昔飼っていた犬の話で会話が弾んだ。地域サロン参加を打診したところ興味を示した。",
                by: "山田 CM",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 bg-white"
                style={{
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 6px rgba(0,0,0,.05)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.type === "訪問" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {r.type}
                  </span>
                  <span className="text-xs text-slate-500">{r.date}</span>
                  <span className="text-[10px] text-slate-400 ml-auto">
                    {r.by}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {r.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Family App ────────────────────────────────────────────────────
function FamilyApp() {
  const [pressed, setPressed] = useState(false);
  const [waveActive, setWaveActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const upd = () => {
      const n = new Date();
      setCurrentTime(
        n.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
      );
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  const handleMic = () => {
    setPressed(true);
    setWaveActive(true);
    setTimeout(() => {
      setPressed(false);
      setWaveActive(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1800);
  };

  return (
    <div
      className="flex-1 overflow-y-auto relative"
      style={{ background: "linear-gradient(180deg,#fff9f2 0%,#fef4e8 100%)" }}
    >
      <PawPrint className="absolute top-20 right-3 w-14 h-14 text-orange-200 rotate-12 pointer-events-none" />
      <PawPrint className="absolute top-96 left-1 w-9 h-9 text-amber-200 -rotate-6 pointer-events-none" />

      {/* Header */}
      <header
        className="px-5 pt-10 pb-4 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(135deg,#ff8c42 0%,#ffb347 60%,#ffd07a 100%)",
          borderRadius: "0 0 28px 28px",
          boxShadow: "0 6px 24px rgba(255,140,66,.25)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-xl">
            🐾
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              ポチ・ファミリー
            </h1>
            <p className="text-white/80 text-xs">{currentTime} 現在</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-white" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <div className="px-4 pt-5 pb-36 space-y-5">
        {/* Status */}
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#fff5e8 0%,#ffecd2 100%)",
            boxShadow:
              "0 4px 20px rgba(255,160,80,.15),inset 0 1px 0 rgba(255,255,255,.8)",
            border: "1.5px solid rgba(255,180,80,.3)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: "rgba(255,180,80,.3)",
                  animationDuration: "2.5s",
                }}
              />
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl relative z-10"
                style={{
                  background: "linear-gradient(135deg,#ffedd5,#fed7aa)",
                  boxShadow:
                    "0 4px 16px rgba(255,140,60,.3),inset 0 2px 4px rgba(255,255,255,.6)",
                  border: "3px solid rgba(255,255,255,.8)",
                }}
              >
                🐶
              </div>
              <div
                className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white z-20"
                style={{ boxShadow: "0 0 6px rgba(74,222,128,.6)" }}
              />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full">
                ● ライブ
              </span>
              <p className="text-sm font-bold text-orange-900 leading-snug mt-1.5">
                今、おばあちゃんに撫でられてご機嫌です！
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-orange-400">
                <Clock size={11} />
                <span>10分前に更新</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs text-orange-700/70">
              <span>ポチの気分</span>
              <span className="font-semibold text-orange-500">
                とっても嬉しい 😊
              </span>
            </div>
            <div className="h-2 rounded-full bg-orange-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: "88%",
                  background: "linear-gradient(90deg,#f97316,#fbbf24)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Appliances */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
              <Power size={11} className="text-indigo-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-700">お部屋の家電</h2>
            <div className="flex-1 h-px bg-slate-200/70" />
            <span className="text-[10px] text-slate-400 font-medium">
              SwitchBot連携
            </span>
          </div>
          <div className="space-y-2.5">
            {appliances.map((app) => (
              <ApplianceCard key={app.id} app={app} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <h2 className="text-sm font-bold text-orange-800">今日の出来事</h2>
            <div className="flex-1 h-px bg-orange-200/60" />
          </div>
          <div className="space-y-2.5 relative">
            <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-orange-200 via-orange-100 to-transparent" />
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="flex-shrink-0 z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-white group-hover:scale-110 transition-transform"
                    style={{
                      border: `2.5px solid ${item.border}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,.08)",
                    }}
                  >
                    {item.emoji}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-2xl px-3.5 py-2.5"
                  style={{
                    background: "#fff8f2",
                    border: "1px solid rgba(255,200,120,.3)",
                    boxShadow: "0 2px 8px rgba(0,0,0,.04)",
                  }}
                >
                  <span className="text-[11px] font-bold text-orange-400 tracking-wider">
                    {item.time}
                  </span>
                  <p className="text-sm text-orange-900 font-medium leading-snug mt-0.5">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Care Proposals for Family ── */}
        <div>
          <div className="flex items-center gap-2 mb-1 px-1">
            <div className="w-5 h-5 rounded-md bg-violet-100 flex items-center justify-center">
              <Sparkles size={11} className="text-violet-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-700">
              ケアマネからの提案
            </h2>
            <div className="flex-1 h-px bg-slate-200/60" />
          </div>
          <p className="text-[11px] text-slate-500 px-1 mb-3">
            AIが分析した今月のおすすめサービスです。タップして詳細を確認できます。
          </p>
          <div className="space-y-2.5">
            {careProposals.map((p) => (
              <CareProposalCard key={p.id} p={p} forFamily={true} />
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 text-center"
          style={{
            background: "linear-gradient(135deg,#fff0f5 0%,#ffe4ec 100%)",
            border: "1.5px solid rgba(251,113,133,.2)",
          }}
        >
          <div className="flex justify-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                size={14}
                className="text-rose-300"
                fill={i < 4 ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="text-xs text-rose-700 font-medium">
            今日も元気に過ごしています 💕
          </p>
        </div>
      </div>

      {/* Footer mic */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4"
        style={{
          background:
            "linear-gradient(0deg,rgba(255,249,242,1) 60%,transparent 100%)",
        }}
      >
        <button
          onMouseDown={handleMic}
          onTouchStart={handleMic}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base transition-all ${pressed ? "scale-95" : "scale-100"}`}
          style={{
            background: pressed
              ? "linear-gradient(135deg,#ea6a1a,#e89020)"
              : "linear-gradient(135deg,#ff8c42 0%,#ff6b1a 40%,#ffaa30 100%)",
            boxShadow: pressed
              ? "0 2px 8px rgba(255,140,66,.3)"
              : "0 6px 24px rgba(255,140,66,.45)",
          }}
        >
          <div
            className={`w-8 h-8 rounded-full bg-white/25 flex items-center justify-center ${waveActive ? "animate-pulse" : ""}`}
          >
            <Mic size={18} />
          </div>
          <span>
            {waveActive ? "録音中..." : "ポチを通じてメッセージを送る"}
          </span>
        </button>
      </div>

      {showToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50">
          <div
            className="px-5 py-3 rounded-2xl text-white text-sm font-semibold whitespace-nowrap flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              boxShadow: "0 8px 24px rgba(34,197,94,.35)",
            }}
          >
            ✅ メッセージを送りました！
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Care Dashboard ────────────────────────────────────────────────
function CareDashboard({ onOpenDetail }) {
  const [period, setPeriod] = useState("weekly");
  const avgMood = Math.round(
    weeklyScores.reduce((a, d) => a + d.mood, 0) / weeklyScores.length,
  );
  const avgActivity = Math.round(
    weeklyScores.reduce((a, d) => a + d.activity, 0) / weeklyScores.length,
  );

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: "#f1f5f9" }}
    >
      <div
        className="px-5 pt-10 pb-5"
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#334155 100%)",
          borderRadius: "0 0 28px 28px",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
              Care Manager
            </p>
            <h1 className="text-white font-bold text-xl">AIレポート</h1>
          </div>
          <button className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Bell size={17} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-slate-800" />
          </button>
        </div>
        <div
          className="flex gap-1.5 p-1 rounded-2xl"
          style={{ background: "rgba(255,255,255,.07)" }}
        >
          {[
            { id: "weekly", label: "今週" },
            { id: "monthly", label: "今月" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setPeriod(t.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${period === t.id ? "bg-white text-slate-800 shadow" : "text-slate-400"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-8">
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: "平均気分",
              value: `${avgMood}%`,
              delta: "+4.2%",
              up: true,
            },
            {
              label: "活動スコア",
              value: `${avgActivity}%`,
              delta: "+2.1%",
              up: true,
            },
            { label: "服薬達成率", value: "87%", delta: "-3.0%", up: false },
          ].map((k, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 bg-white text-center"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,.07)",
                border: "1px solid #e8ecf0",
              }}
            >
              <p className="text-[10px] text-slate-500 font-medium mb-1 leading-tight">
                {k.label}
              </p>
              <p className="text-lg font-bold text-slate-800 leading-tight">
                {k.value}
              </p>
              <div
                className={`flex items-center justify-center gap-0.5 text-[10px] font-bold mt-0.5 ${k.up ? "text-emerald-500" : "text-red-400"}`}
              >
                {k.up ? (
                  <ArrowUpRight size={10} />
                ) : (
                  <ArrowDownRight size={10} />
                )}
                {k.delta}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 4px 20px rgba(99,102,241,.15)" }}
        >
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white">AI総合サマリー</span>
            <span className="ml-auto text-[10px] text-indigo-200">
              {period === "weekly" ? "今週" : "今月"}の分析
            </span>
          </div>
          <div
            className="p-4"
            style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)" }}
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              {period === "weekly"
                ? "今週は全体的に安定した1週間でした。木曜に気分・活動量ともにピークを記録。服薬未確認が月・水に集中しており、声かけタイミングの調整を推奨します。"
                : "今月は第4週に活動量が過去最高を記録。第3週の室温アラート多発は睡眠の質に影響した可能性があり、環境改善が最優先です。"}
            </p>
          </div>
        </div>

        {/* Chart */}
        {period === "weekly" ? (
          <div
            className="rounded-2xl p-4 bg-white"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,.07)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-slate-700">
                気分 / 活動スコア推移
              </p>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                  気分
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  活動
                </span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-28 mt-3">
              {weeklyScores.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-0.5"
                >
                  <div
                    className="w-full flex gap-0.5 items-end"
                    style={{ height: "88px" }}
                  >
                    <div
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${(d.mood / 100) * 88}px`,
                        background: "linear-gradient(180deg,#818cf8,#6366f1)",
                      }}
                    />
                    <div
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${(d.activity / 100) * 88}px`,
                        background: "linear-gradient(180deg,#6ee7b7,#10b981)",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 bg-white"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,.07)",
              border: "1px solid #e2e8f0",
            }}
          >
            <p className="text-xs font-bold text-slate-700 mb-3">週別スコア</p>
            <div className="space-y-3">
              {monthlyHighlights.map((w, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600">
                      {w.week}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">
                        {w.note}
                      </span>
                      <span
                        className={`text-xs font-bold ${w.score >= 82 ? "text-emerald-600" : w.score >= 76 ? "text-amber-500" : "text-red-400"}`}
                      >
                        {w.score}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${w.score}%`,
                        background:
                          w.score >= 82
                            ? "linear-gradient(90deg,#6366f1,#8b5cf6)"
                            : w.score >= 76
                              ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                              : "linear-gradient(90deg,#ef4444,#f97316)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users with detail button for Hanako */}
        <div>
          <p className="text-xs font-bold text-slate-600 px-1 mb-2">
            担当者サマリー
          </p>
          <div className="space-y-2">
            {careUsers.map((u) => {
              const s = STATUS[u.status];
              const isHanako = u.id === 1;
              return (
                <div
                  key={u.id}
                  className={`rounded-2xl p-3.5 bg-white flex items-center gap-3 ${isHanako ? "cursor-pointer hover:shadow-md transition-all" : ""}`}
                  style={{
                    border: isHanako
                      ? "1.5px solid rgba(99,102,241,.3)"
                      : "1px solid #e2e8f0",
                    boxShadow: "0 2px 6px rgba(0,0,0,.05)",
                  }}
                  onClick={isHanako ? onOpenDetail : undefined}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                      {u.status === "alert"
                        ? "😰"
                        : u.status === "caution"
                          ? "😐"
                          : "😊"}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${s.dot} border-2 border-white`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-bold text-slate-700">
                        {u.name}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${s.badge}`}
                        >
                          {s.label}
                        </span>
                        {isHanako && (
                          <ChevronRight size={14} className="text-indigo-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 flex-1">
                        <span>気分</span>
                        <MiniBar
                          value={u.mood}
                          color={
                            u.mood > 70
                              ? "#10b981"
                              : u.mood > 40
                                ? "#f59e0b"
                                : "#ef4444"
                          }
                        />
                        <span className="font-semibold w-6 text-right">
                          {u.mood}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px]">
                        {u.medicine ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                            <CheckCircle size={9} />
                            服薬
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold flex items-center gap-0.5">
                            <XCircle size={9} />
                            未確認
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("family");
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{
        background: "#cbd5e1",
        fontFamily:
          "'Hiragino Maru Gothic ProN','M PLUS Rounded 1c',sans-serif",
      }}
    >
      <div className="w-full max-w-md mx-auto min-h-screen relative flex flex-col shadow-2xl overflow-hidden bg-white">
        {showDetail ? (
          <UserDetailScreen onBack={() => setShowDetail(false)} />
        ) : screen === "family" ? (
          <FamilyApp />
        ) : (
          <CareDashboard onOpenDetail={() => setShowDetail(true)} />
        )}

        {/* Bottom Nav — hidden on detail screen */}
        {!showDetail && (
          <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div
              className="pointer-events-auto mx-3 mb-3 rounded-2xl overflow-hidden flex"
              style={{
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 24px rgba(0,0,0,.15)",
                border: "1px solid rgba(255,255,255,.9)",
              }}
            >
              {[
                {
                  id: "family",
                  icon: <Home size={19} />,
                  label: "家族",
                  active: "#ff8c42",
                },
                {
                  id: "care",
                  icon: <BarChart2 size={19} />,
                  label: "ケアマネ",
                  active: "#6366f1",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setScreen(tab.id)}
                  className="flex-1 py-3 flex flex-col items-center gap-1 transition-all"
                  style={{ color: screen === tab.id ? tab.active : "#94a3b8" }}
                >
                  {tab.icon}
                  <span className="text-[11px] font-bold">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
