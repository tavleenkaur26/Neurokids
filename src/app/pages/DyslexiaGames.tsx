import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { WordMatchGame } from "../components/learning/WordMatchGame";
import { LetterSoundGame } from "../components/learning/LetterSoundGame";
import { SyllableGame } from "../components/learning/SyllableGame";
import { GameCard } from "../components/learning/GameCard";
import { ScoreBadge } from "../components/learning/ScoreBadge";
import { useGameProgress } from "../hooks/useGameProgress";

type GameId = "word-match" | "letter-sound" | "syllable";

const GAMES: {
  id: GameId;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  gradient: string;
}[] = [
  {
    id: "word-match",
    title: "Word Match",
    description: "Match words to pictures",
    emoji: "🃏",
    color: "#6366f1",
    bgColor: "#eef2ff",
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
  },
  {
    id: "letter-sound",
    title: "Letter Sounds",
    description: "Which word starts with this letter?",
    emoji: "🔤",
    color: "#ec4899",
    bgColor: "#fdf2f8",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
  },
  {
    id: "syllable",
    title: "Syllable Tap",
    description: "Tap out the syllables",
    emoji: "👋",
    color: "#d97706",
    bgColor: "#fffbeb",
    gradient: "linear-gradient(135deg, #d97706, #f59e0b)",
  },
];

export default function DyslexiaGamesPage() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<GameId>("word-match");
  const { sessions, recordSession } = useGameProgress();

  const activeGameMeta = GAMES.find((g) => g.id === activeGame)!;
  const lastSession = [...sessions].reverse().find((s) => s.gameId === activeGame);

  return (
    <div className="min-h-screen px-4 py-6">

      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 mb-4 rounded-2xl mx-auto max-w-lg"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(236,72,153,0.12)",
          boxShadow: "0 2px 16px rgba(236,72,153,0.07)",
        }}
      >
        <motion.button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
          style={{ background: "#fce7f3", color: "#be185d" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          ←
        </motion.button>
        <span className="text-xl">🎮</span>
        <h1 className="text-base font-black flex-1" style={{ color: "#1e1532" }}>Dyslexia Games</h1>
        {sessions.length > 0 && (
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "#fce7f3", color: "#be185d" }}
          >
            {sessions.length} played 🔥
          </span>
        )}
      </div>

      <div className="max-w-lg mx-auto">

        {/* Page hero */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-3 shadow-md"
            style={{ background: "linear-gradient(135deg, #fce7f3, #fffbeb)" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          >
            📚
          </motion.div>
          <h2 className="text-2xl font-black mb-1" style={{ color: "#1e1532" }}>Reading Games</h2>
          <p className="text-sm font-semibold" style={{ color: "#9ca3af" }}>
            Fun ways to practise reading, letters & sounds!
          </p>
        </motion.div>

        {/* Game selector tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
          {GAMES.map((game, i) => {
            const isActive = activeGame === game.id;
            return (
              <motion.button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all"
                style={{
                  background: isActive ? game.gradient : "rgba(255,255,255,0.8)",
                  color: isActive ? "#ffffff" : "#6b7280",
                  border: `2px solid ${isActive ? "transparent" : "#e5e7eb"}`,
                  boxShadow: isActive ? `0 4px 16px ${game.color}40` : "none",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-base">{game.emoji}</span>
                {game.title}
              </motion.button>
            );
          })}
        </div>

        {/* Last score badge */}
        {lastSession && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ScoreBadge
              score={lastSession.score}
              total={lastSession.total}
              gameLabel={`Last ${activeGameMeta.title} session`}
            />
          </motion.div>
        )}

        {/* Active game */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                border: `2px solid ${activeGameMeta.bgColor}`,
                boxShadow: `0 4px 24px ${activeGameMeta.color}20`,
              }}
            >
              {/* Game header strip */}
              <div
                className="px-5 py-3 flex items-center gap-3"
                style={{ background: activeGameMeta.gradient }}
              >
                <span className="text-2xl">{activeGameMeta.emoji}</span>
                <div>
                  <p className="font-black text-white text-base leading-tight">{activeGameMeta.title}</p>
                  <p className="text-white/80 text-xs font-semibold">{activeGameMeta.description}</p>
                </div>
              </div>

              {/* Game body */}
              <div
                className="p-4"
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                <GameCard
                  title={activeGameMeta.title}
                  description={activeGameMeta.description}
                  emoji={activeGameMeta.emoji}
                  color={activeGameMeta.color}
                  bgColor={activeGameMeta.bgColor}
                >
                  {activeGame === "word-match" && (
                    <WordMatchGame
                      onSessionComplete={(score, total) => recordSession("word-match", score, total)}
                    />
                  )}
                  {activeGame === "letter-sound" && (
                    <LetterSoundGame
                      onSessionComplete={(score, total) => recordSession("letter-sound", score, total)}
                    />
                  )}
                  {activeGame === "syllable" && (
                    <SyllableGame
                      onSessionComplete={(score, total) => recordSession("syllable", score, total)}
                    />
                  )}
                </GameCard>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Session history */}
        {sessions.length > 0 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#9ca3af" }}>
              Today's Sessions
            </p>
            <div className="flex flex-col gap-2">
              {[...sessions]
                .reverse()
                .slice(0, 5)
                .map((s, i) => {
                  const game = GAMES.find((g) => g.id === s.gameId);
                  const pct = s.total > 0 ? (s.score / s.total) * 100 : 0;
                  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
                  return (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.85)",
                        border: "1.5px solid rgba(229,231,235,1)",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                      }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <span className="text-xl">{game?.emoji ?? "🎮"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: "#1e1532" }}>
                          {game?.title}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                          {s.score}/{s.total} ·{" "}
                          {s.completedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((star) => (
                          <span key={star} style={{ opacity: star <= stars ? 1 : 0.2, fontSize: "14px" }}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}