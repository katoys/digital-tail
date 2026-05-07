import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ReformProposalCard({ p }) {
  const [expanded, setExpanded] = useState(false);
  const [contacted, setContacted] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: p.cardBg,
        border: `1.5px solid ${p.cardBorder}`,
        boxShadow: "0 2px 10px rgba(0,0,0,.05)",
      }}
    >
      <button
        className="w-full px-4 py-3.5 flex items-center gap-3 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${p.iconBg}`}
        >
          <p.Icon size={18} className={p.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 mb-0.5">{p.shortReason}</p>
          <p className="text-sm font-bold text-slate-800 leading-snug">{p.title}</p>
        </div>
        <div className="flex-shrink-0 text-slate-400">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.65)",
              borderLeft: `3px solid ${p.accentColor}`,
            }}
          >
            <p
              className="text-[10px] font-bold mb-1.5"
              style={{ color: p.accentColor }}
            >
              🐾 会話より（{p.conversationDate}）
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              「{p.conversationQuote}」
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>

          <button
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              background: contacted
                ? "#94a3b8"
                : `linear-gradient(135deg,${p.accentColor},${p.accentColor}cc)`,
              boxShadow: contacted ? "none" : `0 4px 14px ${p.accentColor}44`,
            }}
            onClick={() => setContacted(true)}
            disabled={contacted}
          >
            {contacted ? "お問い合わせしました ✓" : "くわしく聞いてみる"}
          </button>
        </div>
      )}
    </div>
  );
}
