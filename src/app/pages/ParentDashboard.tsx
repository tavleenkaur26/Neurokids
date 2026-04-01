import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { TrendingUp, AlertCircle, Lightbulb, Activity, Clock, Users, Plus } from "lucide-react";

interface ActivityLog {
  id: string;
  module: string;
  activity: string;
  timestamp: Date;
  duration: number;
  performance: number;
}

const TAB_META = {
  insights:   { label: "Insights",    emoji: "💡", color: "#7c3aed", bg: "#ede9fe" },
  activity:   { label: "Activity",    emoji: "⚡", color: "#2563eb", bg: "#dbeafe" },
  strategies: { label: "Strategies",  emoji: "🧩", color: "#059669", bg: "#d1fae5" },
  patterns:   { label: "Patterns",    emoji: "🔍", color: "#d97706", bg: "#fef3c7" },
};

type TabKey = keyof typeof TAB_META;

export function ParentDashboard() {
  const [children, setChildren] = useState<string[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("insights");

  useEffect(() => {
    const storedChildren = JSON.parse(localStorage.getItem("parentChildren") || "[]");
    setChildren(storedChildren);
    if (storedChildren.length > 0) setSelectedChild(storedChildren[0]);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { gameId, score, total, completedAt } = (e as CustomEvent).detail;
      console.log("Game completed:", { gameId, score, total, completedAt });
    };
    window.addEventListener("neurokids:gameComplete", handler);
    return () => window.removeEventListener("neurokids:gameComplete", handler);
  }, []);

  const [activityLogs] = useState<ActivityLog[]>([
    { id: "1", module: "Social Coach",   activity: "Completed 3 scenarios", timestamp: new Date(Date.now() - 2 * 3600000),  duration: 15, performance: 85 },
    { id: "2", module: "Learning Engine",activity: "Solved 5 math problems", timestamp: new Date(Date.now() - 5 * 3600000),  duration: 20, performance: 80 },
    { id: "3", module: "Dyslexia Games", activity: "Word scramble practice", timestamp: new Date(Date.now() - 24 * 3600000), duration: 12, performance: 90 },
  ]);

  const stats = [
    { label: "Total Sessions",   value: "12",    icon: Activity,   color: "#7c3aed", bg: "#ede9fe",  suffix: "" },
    { label: "Avg Session",      value: "18",    icon: Clock,      color: "#2563eb", bg: "#dbeafe",  suffix: "m" },
    { label: "Weekly Progress",  value: "75",    icon: TrendingUp, color: "#059669", bg: "#d1fae5",  suffix: "%", bar: 75 },
    { label: "Fav Module",       value: "Learn", icon: Lightbulb,  color: "#d97706", bg: "#fef3c7",  suffix: "" },
  ];

  const insights = [
    { title: "Great Progress in Learning!", message: "80% of math problems correct this week.", icon: TrendingUp, color: "#059669", bg: "#d1fae5" },
    { title: "Social Practice Needed",       message: "2 days since last Social Coach session.",   icon: AlertCircle, color: "#d97706", bg: "#fef3c7" },
    { title: "Reading Improvement Tip",      message: "Strong phonetic matching progress detected.", icon: Lightbulb, color: "#7c3aed", bg: "#ede9fe" },
  ];

  const communicationStrategies = [
    { strategy: "Visual Schedules",     description: "Use visual timers & schedules to help transitions.",  impact: "High",   color: "#7c3aed" },
    { strategy: "Clear Instructions",   description: "Break instructions into smaller, manageable steps.", impact: "High",   color: "#2563eb" },
    { strategy: "Positive Reinforcement",description: "Celebrate small wins and effort consistently.",     impact: "Medium", color: "#059669" },
    { strategy: "Sensory Breaks",        description: "Allow movement breaks every 20–30 minutes.",        impact: "Medium", color: "#d97706" },
  ];

  const learningPatterns = [
    { pattern: "Best Learning Time", value: "Morning (9AM – 11AM)",        insight: "Focus levels highest in morning sessions.", emoji: "🌅" },
    { pattern: "Strongest Skill",    value: "Visual Pattern Recognition",  insight: "Shape-based tasks show high accuracy.",      emoji: "🧩" },
    { pattern: "Challenge Area",     value: "Social Cue Interpretation",   insight: "More Social Coach practice recommended.",    emoji: "💬" },
    { pattern: "Preferred Style",    value: "Interactive Games",           insight: "Game-based sessions have highest engagement.", emoji: "🎮" },
  ];

  const moduleColors: Record<string, { color: string; bg: string; emoji: string }> = {
    "Social Coach":    { color: "#7c3aed", bg: "#ede9fe", emoji: "💬" },
    "Learning Engine": { color: "#2563eb", bg: "#dbeafe", emoji: "📚" },
    "Dyslexia Games":  { color: "#be185d", bg: "#fce7f3", emoji: "🎮" },
  };

  const formatTimeAgo = (date: Date) => {
    const s = Math.floor((Date.now() - date.getTime()) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
          >
            📊
          </div>
          <div>
            <h1 className="text-2xl font-black" style={{ color: "#1e1532" }}>Parent Dashboard</h1>
            <p className="text-sm font-semibold" style={{ color: "#6b7280" }}>
              Track progress & get actionable insights
            </p>
          </div>
        </motion.div>

        {/* Connected Children */}
        <motion.div
          className="rounded-3xl p-5 mb-5"
          style={{
            background: "rgba(255,255,255,0.88)",
            border: "1.5px solid rgba(37,99,235,0.12)",
            boxShadow: "0 2px 20px rgba(37,99,235,0.07)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} style={{ color: "#2563eb" }} />
              <h2 className="font-black text-base" style={{ color: "#1e1532" }}>Connected Children</h2>
            </div>
            <Link to="/connect-child">
              <motion.button
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-sm text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Plus size={14} /> Connect Child
              </motion.button>
            </Link>
          </div>

          {children.length === 0 ? (
            <div className="text-center py-6 rounded-2xl" style={{ background: "#f8fafc" }}>
              <p className="text-2xl mb-2">👨‍👧</p>
              <p className="text-sm font-bold" style={{ color: "#9ca3af" }}>No children connected yet</p>
              <p className="text-xs font-semibold mt-1" style={{ color: "#c4b5fd" }}>
                Use the button above to link your child's account
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {children.map((child, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedChild(child)}
                  className="p-3.5 rounded-2xl text-left transition-all font-bold"
                  style={{
                    background: selectedChild === child
                      ? "linear-gradient(135deg, #ede9fe, #dbeafe)"
                      : "rgba(248,250,252,1)",
                    border: `2px solid ${selectedChild === child ? "#7c3aed" : "#e5e7eb"}`,
                    boxShadow: selectedChild === child ? "0 4px 16px rgba(124,58,237,0.15)" : "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-black text-sm" style={{ color: "#1e1532" }}>👤 {child}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "#9ca3af" }}>Child Account</p>
                </motion.button>
              ))}
            </div>
          )}

          {selectedChild && (
            <motion.div
              className="mt-3 px-4 py-2.5 rounded-2xl flex items-center gap-2"
              style={{ background: "#dbeafe", border: "1.5px solid #93c5fd" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>📍</span>
              <p className="text-sm font-bold" style={{ color: "#1d4ed8" }}>
                Viewing analytics for <span className="font-black">{selectedChild}</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.88)",
                  border: `1.5px solid ${stat.bg}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-2 shadow-sm"
                  style={{ background: stat.bg }}
                >
                  <Icon size={16} style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-black" style={{ color: "#1e1532" }}>
                  {stat.value}<span className="text-base">{stat.suffix}</span>
                </p>
                <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>{stat.label}</p>
                {stat.bar !== undefined && (
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#e5e7eb" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: stat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.bar}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.88)",
            border: "1.5px solid rgba(196,181,253,0.2)",
            boxShadow: "0 2px 20px rgba(124,58,237,0.06)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {/* Tab bar */}
          <div
            className="flex overflow-x-auto no-scrollbar px-3 pt-3 pb-0 gap-1 border-b"
            style={{ borderColor: "rgba(196,181,253,0.15)" }}
          >
            {(Object.keys(TAB_META) as TabKey[]).map((tab) => {
              const m = TAB_META[tab];
              const isActive = activeTab === tab;
              return (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-t-2xl font-bold text-sm transition-all"
                  style={{
                    background: isActive ? m.bg : "transparent",
                    color: isActive ? m.color : "#9ca3af",
                    borderBottom: isActive ? `2.5px solid ${m.color}` : "2.5px solid transparent",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {m.emoji} {m.label}
                </motion.button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-5">

            {/* Insights */}
            {activeTab === "insights" && (
              <div className="flex flex-col gap-3">
                {insights.map((insight, i) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl"
                      style={{ background: insight.bg, border: `1.5px solid ${insight.color}22` }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "white" }}
                      >
                        <Icon size={18} style={{ color: insight.color }} />
                      </div>
                      <div>
                        <h3 className="font-black text-sm mb-0.5" style={{ color: "#1e1532" }}>{insight.title}</h3>
                        <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>{insight.message}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Activity */}
            {activeTab === "activity" && (
              <div className="flex flex-col gap-3">
                {activityLogs.map((log, i) => {
                  const meta = moduleColors[log.module] ?? { color: "#6b7280", bg: "#f3f4f6", emoji: "📌" };
                  return (
                    <motion.div
                      key={log.id}
                      className="flex items-center gap-3 p-4 rounded-2xl"
                      style={{ background: meta.bg, border: `1.5px solid ${meta.color}22` }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <span className="text-2xl">{meta.emoji}</span>
                      <div className="flex-1">
                        <p className="font-black text-sm" style={{ color: "#1e1532" }}>{log.module}</p>
                        <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>{log.activity}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: "#9ca3af" }}>{formatTimeAgo(log.timestamp)} · {log.duration} min</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full font-black text-sm"
                        style={{
                          background: log.performance >= 85 ? "#d1fae5" : log.performance >= 65 ? "#fef3c7" : "#fee2e2",
                          color: log.performance >= 85 ? "#059669" : log.performance >= 65 ? "#d97706" : "#dc2626",
                        }}
                      >
                        {log.performance}%
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Strategies */}
            {activeTab === "strategies" && (
              <div className="flex flex-col gap-3">
                {communicationStrategies.map((s, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start justify-between p-4 rounded-2xl"
                    style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="flex-1 pr-3">
                      <p className="font-black text-sm mb-0.5" style={{ color: "#1e1532" }}>{s.strategy}</p>
                      <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>{s.description}</p>
                    </div>
                    <span
                      className="shrink-0 px-2.5 py-1 rounded-full font-bold text-xs"
                      style={{
                        background: s.impact === "High" ? "#d1fae5" : "#fef3c7",
                        color: s.impact === "High" ? "#059669" : "#d97706",
                        border: `1.5px solid ${s.impact === "High" ? "#6ee7b7" : "#fde68a"}`,
                      }}
                    >
                      {s.impact}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Patterns */}
            {activeTab === "patterns" && (
              <div className="grid sm:grid-cols-2 gap-3">
                {learningPatterns.map((p, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-2xl"
                    style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <p className="text-xs font-bold uppercase tracking-wide mt-2 mb-0.5" style={{ color: "#9ca3af" }}>{p.pattern}</p>
                    <p className="font-black text-sm mb-1" style={{ color: "#7c3aed" }}>{p.value}</p>
                    <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>{p.insight}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}