import { useState } from "react";
import { Home, BarChart2 } from "lucide-react";
import FamilyApp from "./components/FamilyApp.jsx";
import CareDashboard from "./components/CareDashboard.jsx";
import UserDetailScreen from "./components/UserDetailScreen.jsx";

export default function App() {
  const [screen, setScreen] = useState("family");
  const [showDetail, setShowDetail] = useState(false);
  const [petType, setPetType] = useState("dog");

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{
        background: "#cbd5e1",
        fontFamily: "'Hiragino Maru Gothic ProN','M PLUS Rounded 1c',sans-serif",
      }}
    >
      <div className="w-full max-w-md mx-auto min-h-screen relative flex flex-col shadow-2xl overflow-hidden bg-white">
        {showDetail ? (
          <UserDetailScreen onBack={() => setShowDetail(false)} />
        ) : screen === "family" ? (
          <FamilyApp petType={petType} setPetType={setPetType} />
        ) : (
          <CareDashboard onOpenDetail={() => setShowDetail(true)} />
        )}

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
                { id: "family", icon: <Home size={19} />,     label: "家族",    active: "#ff8c42" },
                { id: "care",   icon: <BarChart2 size={19} />, label: "ケアマネ", active: "#6366f1" },
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
