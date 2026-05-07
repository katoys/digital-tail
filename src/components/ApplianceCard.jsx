import { useState } from "react";
import {
  AlertTriangle,
  Wind,
  Sun,
  Snowflake,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";

export default function ApplianceCard({ app }) {
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
            <Wind size={20} className={on ? "text-indigo-500" : "text-slate-400"} />
          ) : app.id === "light" ? (
            <Sun size={20} className={on ? "text-amber-400" : "text-slate-400"} />
          ) : (
            <span className="text-lg">📺</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800">{app.label}</p>
          <p className={`text-xs font-semibold ${on ? "text-indigo-500" : "text-slate-400"}`}>
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
