import { useState, useEffect } from "react";
import { Settings, Mic, Bell, Heart, Clock, Power } from "lucide-react";
import { Sparkles } from "lucide-react";
import PawPrint from "./ui/PawPrint.jsx";
import ApplianceCard from "./ApplianceCard.jsx";
import CareProposalCard from "./CareProposalCard.jsx";
import { timeline, appliances, careProposals, reformProposals } from "../data/mock.jsx";
import ReformProposalCard from "./ReformProposalCard.jsx";

export default function FamilyApp() {
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

      <header
        className="px-5 pt-10 pb-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg,#ff8c42 0%,#ffb347 60%,#ffd07a 100%)",
          borderRadius: "0 0 28px 28px",
          boxShadow: "0 6px 24px rgba(255,140,66,.25)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-xl">
            🐾
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">ポチ・ファミリー</h1>
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
            boxShadow: "0 4px 20px rgba(255,160,80,.15),inset 0 1px 0 rgba(255,255,255,.8)",
            border: "1.5px solid rgba(255,180,80,.3)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "rgba(255,180,80,.3)", animationDuration: "2.5s" }}
              />
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl relative z-10"
                style={{
                  background: "linear-gradient(135deg,#ffedd5,#fed7aa)",
                  boxShadow: "0 4px 16px rgba(255,140,60,.3),inset 0 2px 4px rgba(255,255,255,.6)",
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
              <span className="font-semibold text-orange-500">とっても嬉しい 😊</span>
            </div>
            <div className="h-2 rounded-full bg-orange-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "88%", background: "linear-gradient(90deg,#f97316,#fbbf24)" }}
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
            <span className="text-[10px] text-slate-400 font-medium">SwitchBot連携</span>
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
                    style={{ border: `2.5px solid ${item.border}`, boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}
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
                  <span className="text-[11px] font-bold text-orange-400 tracking-wider">{item.time}</span>
                  <p className="text-sm text-orange-900 font-medium leading-snug mt-0.5">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reform proposals from conversation */}
        <div>
          <div className="flex items-center gap-2 mb-1 px-1">
            <div className="w-5 h-5 rounded-md bg-sky-100 flex items-center justify-center">
              <Heart size={11} className="text-sky-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-700">ポチが気になっていること</h2>
            <div className="flex-1 h-px bg-slate-200/60" />
          </div>
          <p className="text-[11px] text-slate-500 px-1 mb-3">
            お話の中から、住まいについて気になることを見つけました
          </p>
          <div className="space-y-2.5">
            {reformProposals.map((p) => (
              <ReformProposalCard key={p.id} p={p} />
            ))}
          </div>
        </div>

        {/* Care proposals */}
        <div>
          <div className="flex items-center gap-2 mb-1 px-1">
            <div className="w-5 h-5 rounded-md bg-violet-100 flex items-center justify-center">
              <Sparkles size={11} className="text-violet-500" />
            </div>
            <h2 className="text-sm font-bold text-slate-700">ケアマネからの提案</h2>
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
              <Heart key={i} size={14} className="text-rose-300" fill={i < 4 ? "currentColor" : "none"} />
            ))}
          </div>
          <p className="text-xs text-rose-700 font-medium">今日も元気に過ごしています 💕</p>
        </div>
      </div>

      {/* Footer mic */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4"
        style={{ background: "linear-gradient(0deg,rgba(255,249,242,1) 60%,transparent 100%)" }}
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
          <div className={`w-8 h-8 rounded-full bg-white/25 flex items-center justify-center ${waveActive ? "animate-pulse" : ""}`}>
            <Mic size={18} />
          </div>
          <span>{waveActive ? "録音中..." : "ポチを通じてメッセージを送る"}</span>
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
