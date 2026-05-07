import { useState } from "react";
import {
  Bell,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import MiniBar from "./ui/MiniBar.jsx";
import CareProposalCard from "./CareProposalCard.jsx";
import { weeklyScores, monthlyHighlights, careUsers, careProposals, STATUS } from "../data/mock.jsx";

export default function CareDashboard({ onOpenDetail }) {
  const [period, setPeriod] = useState("weekly");
  const avgMood = Math.round(weeklyScores.reduce((a, d) => a + d.mood, 0) / weeklyScores.length);
  const avgActivity = Math.round(weeklyScores.reduce((a, d) => a + d.activity, 0) / weeklyScores.length);

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <div
        className="px-5 pt-10 pb-5"
        style={{
          background: "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#334155 100%)",
          borderRadius: "0 0 28px 28px",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Care Manager</p>
            <h1 className="text-white font-bold text-xl">AIレポート</h1>
          </div>
          <button className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Bell size={17} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-slate-800" />
          </button>
        </div>
        <div className="flex gap-1.5 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,.07)" }}>
          {[{ id: "weekly", label: "今週" }, { id: "monthly", label: "今月" }].map((t) => (
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
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "平均気分",    value: `${avgMood}%`,    delta: "+4.2%", up: true  },
            { label: "活動スコア",  value: `${avgActivity}%`, delta: "+2.1%", up: true  },
            { label: "服薬達成率",  value: "87%",            delta: "-3.0%", up: false },
          ].map((k, i) => (
            <div
              key={i}
              className="rounded-2xl p-3 bg-white text-center"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,.07)", border: "1px solid #e8ecf0" }}
            >
              <p className="text-[10px] text-slate-500 font-medium mb-1 leading-tight">{k.label}</p>
              <p className="text-lg font-bold text-slate-800 leading-tight">{k.value}</p>
              <div className={`flex items-center justify-center gap-0.5 text-[10px] font-bold mt-0.5 ${k.up ? "text-emerald-500" : "text-red-400"}`}>
                {k.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {k.delta}
              </div>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(99,102,241,.15)" }}>
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white">AI総合サマリー</span>
            <span className="ml-auto text-[10px] text-indigo-200">{period === "weekly" ? "今週" : "今月"}の分析</span>
          </div>
          <div className="p-4" style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)" }}>
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
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,.07)", border: "1px solid #e2e8f0" }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-slate-700">気分 / 活動スコア推移</p>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />気分
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />活動
                </span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-28 mt-3">
              {weeklyScores.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: "88px" }}>
                    <div
                      className="flex-1 rounded-t-md"
                      style={{ height: `${(d.mood / 100) * 88}px`, background: "linear-gradient(180deg,#818cf8,#6366f1)" }}
                    />
                    <div
                      className="flex-1 rounded-t-md"
                      style={{ height: `${(d.activity / 100) * 88}px`, background: "linear-gradient(180deg,#6ee7b7,#10b981)" }}
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
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,.07)", border: "1px solid #e2e8f0" }}
          >
            <p className="text-xs font-bold text-slate-700 mb-3">週別スコア</p>
            <div className="space-y-3">
              {monthlyHighlights.map((w, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600">{w.week}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{w.note}</span>
                      <span className={`text-xs font-bold ${w.score >= 82 ? "text-emerald-600" : w.score >= 76 ? "text-amber-500" : "text-red-400"}`}>
                        {w.score}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${w.score}%`,
                        background: w.score >= 82
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

        {/* Care proposals */}
        <div>
          <p className="text-xs font-bold text-slate-600 px-1 mb-2">AIサービス提案</p>
          <div className="space-y-2.5">
            {careProposals.map((p) => (
              <CareProposalCard key={p.id} p={p} forFamily={false} />
            ))}
          </div>
        </div>

        {/* User list */}
        <div>
          <p className="text-xs font-bold text-slate-600 px-1 mb-2">担当者サマリー</p>
          <div className="space-y-2">
            {careUsers.map((u) => {
              const s = STATUS[u.status];
              const isHanako = u.id === 1;
              return (
                <div
                  key={u.id}
                  className={`rounded-2xl p-3.5 bg-white flex items-center gap-3 ${isHanako ? "cursor-pointer hover:shadow-md transition-all" : ""}`}
                  style={{
                    border: isHanako ? "1.5px solid rgba(99,102,241,.3)" : "1px solid #e2e8f0",
                    boxShadow: "0 2px 6px rgba(0,0,0,.05)",
                  }}
                  onClick={isHanako ? onOpenDetail : undefined}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                      {u.status === "alert" ? "😰" : u.status === "caution" ? "😐" : "😊"}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${s.dot} border-2 border-white`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-bold text-slate-700">{u.name}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                        {isHanako && <ChevronRight size={14} className="text-indigo-400" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 flex-1">
                        <span>気分</span>
                        <MiniBar value={u.mood} color={u.mood > 70 ? "#10b981" : u.mood > 40 ? "#f59e0b" : "#ef4444"} />
                        <span className="font-semibold w-6 text-right">{u.mood}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px]">
                        {u.medicine ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                            <CheckCircle size={9} />服薬
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold flex items-center gap-0.5">
                            <XCircle size={9} />未確認
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
