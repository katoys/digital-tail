import { useState } from "react";
import { ChevronRight, Zap } from "lucide-react";

export default function CareProposalCard({ p, forFamily = false }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
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
          <p.Icon size={15} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${p.priorityColor}`}>
              {p.priority}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {p.category}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug">{p.title}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{p.detail}</p>
        </div>
        <div className={`flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-90" : ""}`}>
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
              <p className="text-xs text-slate-600 leading-relaxed">{p.reason}</p>
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
