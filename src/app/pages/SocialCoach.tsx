// src/app/pages/SocialCoach.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ScenarioDropdown from "../components/social-coach/ScenarioDropdown";
import MessageInput from "../components/social-coach/MessageInput";
import ReplyCard from "../components/social-coach/ReplyCard";
import FeedbackBanner from "../components/social-coach/FeedbackBanner";
import { getMatchedScenario } from "../data/scenarios";
import type { ReplyOption } from "../data/scenarios";

type Stage = "pick" | "type" | "replies" | "feedback";

const STAGES: Stage[] = ["pick", "type", "replies", "feedback"];

const STAGE_META = {
  pick:     { label: "Pick a situation", emoji: "🎯", color: "#7c3aed", bg: "#ede9fe" },
  type:     { label: "What would you say?", emoji: "✍️", color: "#ec4899", bg: "#fce7f3" },
  replies:  { label: "Pick a reply", emoji: "💬", color: "#059669", bg: "#d1fae5" },
  feedback: { label: "Great job!", emoji: "🌟", color: "#d97706", bg: "#fef9c3" },
};

export function SocialCoach() {
  const [scenarioId, setScenarioId] = useState("");
  const [stage, setStage] = useState<Stage>("pick");
  const [selectedReply, setSelectedReply] = useState<ReplyOption | null>(null);

  const scenario = getMatchedScenario(scenarioId);

  const handleScenarioChange = (id: string) => {
    setScenarioId(id);
    setSelectedReply(null);
    setStage(id ? "type" : "pick");
  };

  const handleMessageSubmit = (_message: string) => {
    if (!scenario) return;
    setStage("replies");
  };

  const handleReplySelect = (reply: ReplyOption) => {
    setSelectedReply(reply);
    setStage("feedback");
  };

  const handleTryAgain = () => {
    setScenarioId("");
    setSelectedReply(null);
    setStage("pick");
  };

  const currentStageIndex = STAGES.indexOf(stage);
  const meta = STAGE_META[stage];

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center">

      {/* Hero header */}
      <motion.div
        className="text-center mb-8 max-w-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 text-4xl shadow-lg"
          style={{ background: "linear-gradient(135deg, #ede9fe, #fce7f3)" }}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        >
          💬
        </motion.div>
        <h1
          className="text-3xl font-black tracking-tight mb-2"
          style={{ color: "#4c1d95", fontFamily: "'Nunito', sans-serif" }}
        >
          Social Coach
        </h1>
        <p className="text-sm font-semibold" style={{ color: "#7c6f9e" }}>
          Practise tricky situations in a safe space 💜
        </p>
      </motion.div>

      {/* Step progress bar */}
      <div className="flex items-center gap-2 mb-7 w-full max-w-md">
        {STAGES.map((s, i) => {
          const m = STAGE_META[s];
          const done = currentStageIndex > i;
          const active = stage === s;
          return (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full h-2.5 rounded-full transition-all duration-400"
                style={{
                  background: done ? m.color : active ? m.color : "rgba(196,181,253,0.3)",
                  opacity: active ? 1 : done ? 0.7 : 0.5,
                }}
                layout
              />
              <span
                className="text-[10px] font-bold hidden sm:block"
                style={{ color: active ? m.color : "#c4b5fd" }}
              >
                {m.emoji}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stage label pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm mb-5"
          style={{ background: meta.bg, color: meta.color }}
          initial={{ opacity: 0, scale: 0.8, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span>{meta.emoji}</span>
          {meta.label}
        </motion.div>
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        className="w-full max-w-xl rounded-3xl p-6 flex flex-col gap-5"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(196,181,253,0.3)",
          boxShadow: "0 4px 32px rgba(124,58,237,0.1), 0 1px 8px rgba(0,0,0,0.04)",
        }}
        layout
      >
        {/* Step 1 — Scenario */}
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            1
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold mb-2" style={{ color: "#7c3aed" }}>CHOOSE A SITUATION</p>
            <ScenarioDropdown selected={scenarioId} onChange={handleScenarioChange} />
          </div>
        </div>

        {/* Divider */}
        {scenarioId && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #c4b5fd, transparent)" }} />
          </div>
        )}

        {/* Step 2 — Message input */}
        <AnimatePresence>
          {scenarioId && (stage === "type" || stage === "replies" || stage === "feedback") && (
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow"
                style={{ background: "linear-gradient(135deg, #ec4899, #f472b6)" }}
              >
                2
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold mb-2" style={{ color: "#ec4899" }}>WHAT WOULD YOU SAY?</p>
                <MessageInput
                  onSubmit={handleMessageSubmit}
                  disabled={stage === "replies" || stage === "feedback"}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        {(stage === "replies" || stage === "feedback") && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #86efac, transparent)" }} />
          </div>
        )}

        {/* Step 3 — Reply cards */}
        <AnimatePresence>
          {(stage === "replies" || stage === "feedback") && scenario && (
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow"
                  style={{ background: "linear-gradient(135deg, #059669, #34d399)" }}
                >
                  3
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "#059669" }}>PICK A REPLY STYLE</p>
                  <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>All good — just different vibes!</p>
                </div>
              </div>
              {scenario.replies.map((reply: ReplyOption, i: number) => (
                <motion.div
                  key={reply.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <ReplyCard
                    reply={reply}
                    onSelect={handleReplySelect}
                    selected={selectedReply?.id === reply.id}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4 — Feedback */}
        <AnimatePresence>
          {stage === "feedback" && selectedReply && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #fde68a, transparent)" }} />
              </div>
              <FeedbackBanner
                emoji={selectedReply.feedbackEmoji}
                message={selectedReply.feedback}
                onTryAgain={handleTryAgain}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {stage === "pick" && (
          <motion.div
            className="text-center py-4 rounded-2xl"
            style={{ background: "#faf8ff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl mb-1">👆</p>
            <p className="text-sm font-bold" style={{ color: "#c4b5fd" }}>
              Start by picking a situation above!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer note */}
      <motion.p
        className="mt-6 text-xs font-bold text-center max-w-xs"
        style={{ color: "#c4b5fd" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        This is a safe space to practise 💜 No wrong answers here!
      </motion.p>
    </div>
  );
}