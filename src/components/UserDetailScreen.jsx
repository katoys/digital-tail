import { useState } from "react";
import {
  ChevronLeft,
  Phone,
  Activity,
  Sparkles,
  ClipboardList,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react";
import CareProposalCard from "./CareProposalCard.jsx";
import { monthlyHighlights, careProposals } from "../data/mock.jsx";

export default function UserDetailScreen({ onBack }) {
  const [tab, setTab] = useState("summary");

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      {/* Header */}
      <div
        className="px-4 pt-10 pb-0"
        style={{
          background: "linear-gradient(135deg,#0f172a 0%,#1e293b 70%,#312e81 100%)",
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
            <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">利用者詳細</p>
            <h2 className="text-white font-bold text-lg leading-tight">田中 花子 さん</h2>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
            style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.15)" }}
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
              <span className="text-xs text-slate-300">担当：山田 ケアマネ</span>
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
            { id: "summary",   label: "月次サマリー",  icon: <Activity size={12} />     },
            { id: "proposals", label: "サービス提案",  icon: <Sparkles size={12} />     },
            { id: "record",    label: "支援記録",      icon: <ClipboardList size={12} /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold transition-all rounded-t-xl ${
                tab === t.id ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-8">
        {/* Monthly Summary Tab */}
        {tab === "summary" && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "平均気分", value: "83%", delta: "+5.2%", up: true,  color: "#10b981" },
                { label: "活動量",   value: "74%", delta: "+2.8%", up: true,  color: "#6366f1" },
                { label: "服薬率",   value: "91%", delta: "-1.0%", up: false, color: "#f59e0b" },
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
                <span className="text-xs font-bold text-white">AI月次サマリー</span>
                <span className="ml-auto text-[10px] text-indigo-200">2025年6月</span>
              </div>
              <div className="p-4" style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)" }}>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  6月は第4週に<span className="font-bold text-indigo-600">活動量が月内最高</span>を記録。
                  会話ログには「昔の犬」「近所の顔見知り」など社会的な話題が増加傾向にあり、
                  <span className="font-bold text-emerald-600">交流ニーズの高まり</span>が読み取れます。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  一方、第3週は室温アラートが<span className="font-bold text-amber-600">計7回</span>発生し、
                  睡眠の質の低下と翌日の気分スコア低下（平均 -12pt）との相関が確認されました。
                  環境面の改善が最優先事項です。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  服薬は月曜・水曜に未確認が集中（計4回）。声かけタイミングを
                  <span className="font-bold text-indigo-600">9:30 → 10:15に変更</span>することで改善が見込めます。
                </p>
              </div>
            </div>

            {/* Monthly score bars */}
            <div
              className="rounded-2xl p-4 bg-white"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,.07)", border: "1px solid #e2e8f0" }}
            >
              <p className="text-xs font-bold text-slate-700 mb-3">週別スコア推移</p>
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

            {/* Risk flags */}
            <div
              className="rounded-2xl overflow-hidden bg-white"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,.06)", border: "1.5px solid #fca5a5" }}
            >
              <div
                className="px-4 py-2.5 border-b border-red-50 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,#fff5f5,#ffe4e4)" }}
              >
                <AlertCircle size={13} className="text-red-400" />
                <p className="text-xs font-bold text-red-700">今月の気になるポイント</p>
              </div>
              {[
                { text: "月・水の服薬未確認が4回（先月比+2回）", level: "mid"  },
                { text: "室温29度超えのアラートが7回発生",        level: "high" },
                { text: "午後14時以降の活動量が前月比 -18%",      level: "low"  },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 last:border-0">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${f.level === "high" ? "bg-red-400" : f.level === "mid" ? "bg-amber-400" : "bg-slate-300"}`} />
                  <p className="text-xs text-slate-700">{f.text}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Proposals Tab */}
        {tab === "proposals" && (
          <>
            <div
              className="rounded-2xl p-4"
              style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", boxShadow: "0 4px 16px rgba(0,0,0,.15)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-violet-300" />
                <span className="text-xs font-bold text-violet-300">AIによるサービス最適化提案</span>
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
            <div
              className="rounded-2xl p-4 bg-white"
              style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}
            >
              <p className="text-xs font-bold text-slate-600 mb-3">これらの提案を</p>
              <div className="grid grid-cols-2 gap-2">
                {["サービス計画書に反映", "家族へ共有する", "次回訪問で説明", "提案書をPDF出力"].map((l, i) => (
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

        {/* Record Tab */}
        {tab === "record" && (
          <div className="space-y-3">
            {[
              { date: "6/24（月）", type: "訪問", note: "食欲良好。エアコン設定を確認。服薬ノートを更新した。",                                                      by: "山田 CM" },
              { date: "6/17（月）", type: "電話", note: "息子（一郎氏）より連絡。週末に帰省予定との報告を受けた。",                                                   by: "山田 CM" },
              { date: "6/10（月）", type: "訪問", note: "室温が高くポチのアラートを確認。ご本人にエアコン使用を促した。次回福祉用具相談を提案。",                    by: "山田 CM" },
              { date: "6/3（月）",  type: "訪問", note: "気分良好。昔飼っていた犬の話で会話が弾んだ。地域サロン参加を打診したところ興味を示した。",                 by: "山田 CM" },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 bg-white"
                style={{ border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(0,0,0,.05)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.type === "訪問" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                    {r.type}
                  </span>
                  <span className="text-xs text-slate-500">{r.date}</span>
                  <span className="text-[10px] text-slate-400 ml-auto">{r.by}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
