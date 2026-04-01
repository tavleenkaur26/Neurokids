import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { InterestSelector } from "../components/learning/InterestSelector";
import { LessonCard } from "../components/learning/LessonCard";
import contentData from "../data/learningContent.json";

type Lesson = {
  id: string;
  title: string;
  readingLevel: string;
  content: string;
  funFact: string;
  wordCount: number;
  imageEmoji: string;
};

type LessonsMap = Record<string, Lesson[]>;

export default function LearningEnginePage() {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const interest = selectedInterest
    ? contentData.interests.find((i) => i.id === selectedInterest)
    : null;

  const lessons: Lesson[] = selectedInterest
    ? ((contentData.lessons as LessonsMap)[selectedInterest] ?? [])
    : [];

  const currentLesson = lessons[lessonIndex] ?? null;

  function handleInterestSelect(id: string) {
    setSelectedInterest(id);
    setLessonIndex(0);
  }

  function handleLessonComplete() {
    if (currentLesson) {
      setCompletedLessons((prev) => new Set([...prev, currentLesson.id]));
    }
  }

  function clearInterest() {
    setSelectedInterest(null);
    setLessonIndex(0);
  }

  const completionPct = lessons.length > 0 ? Math.round((completedLessons.size / lessons.length) * 100) : 0;

  return (
    <div className="min-h-screen px-4 py-6">

      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 mb-4 rounded-2xl mx-auto max-w-lg"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(99,102,241,0.12)",
          boxShadow: "0 2px 16px rgba(99,102,241,0.08)",
        }}
      >
        <motion.button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
          style={{ background: "#ede9fe", color: "#7c3aed" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          ←
        </motion.button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xl">📚</span>
          <h1 className="text-base font-black" style={{ color: "#1e1532" }}>Learning Engine</h1>
        </div>
        {selectedInterest && (
          <motion.button
            onClick={clearInterest}
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: "#ede9fe", color: "#7c3aed" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Change topic ✏️
          </motion.button>
        )}
      </div>

      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!selectedInterest ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-3 shadow-md"
                  style={{ background: "linear-gradient(135deg, #ede9fe, #dbeafe)" }}
                  animate={{ rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                >
                  🤔
                </motion.div>
                <h2 className="text-2xl font-black mb-1" style={{ color: "#1e1532" }}>
                  What do you want to explore?
                </h2>
                <p className="text-sm font-semibold" style={{ color: "#7c6f9e" }}>
                  Pick a topic you love and we'll make it fun 🌈
                </p>
              </div>
              <InterestSelector
                selected={selectedInterest}
                onSelect={handleInterestSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Topic + progress header */}
              <div
                className="rounded-2xl p-4 mb-4 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(196,181,253,0.25)", boxShadow: "0 2px 12px rgba(124,58,237,0.07)" }}
              >
                <span className="text-3xl">{interest?.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm" style={{ color: "#1e1532" }}>{interest?.label}</p>
                  <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
                    Lesson {lessonIndex + 1} of {lessons.length}
                  </p>
                  {/* Progress bar */}
                  <div className="mt-1.5 h-2 rounded-full overflow-hidden" style={{ background: "#e5e7eb" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: interest?.color ?? "#6366f1" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <span
                  className="text-xs font-black px-2 py-1 rounded-full"
                  style={{ background: "#d1fae5", color: "#059669" }}
                >
                  {completionPct}%
                </span>
              </div>

              {/* Lesson dots */}
              <div className="flex gap-1.5 mb-5">
                {lessons.map((l, i) => (
                  <motion.button
                    key={l.id}
                    onClick={() => setLessonIndex(i)}
                    className="flex-1 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: completedLessons.has(l.id)
                        ? "#10b981"
                        : i === lessonIndex
                        ? interest?.color ?? "#6366f1"
                        : "#e5e7eb",
                    }}
                    whileHover={{ scaleY: 1.4 }}
                    title={l.title}
                  />
                ))}
              </div>

              {/* Lesson card */}
              {currentLesson && (
                <LessonCard
                  key={currentLesson.id}
                  lesson={currentLesson}
                  interestColor={interest?.color ?? "#6366f1"}
                  interestBgColor={interest?.bgColor ?? "#eef2ff"}
                  onComplete={handleLessonComplete}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-4 gap-3">
                <motion.button
                  onClick={() => setLessonIndex((i) => Math.max(0, i - 1))}
                  disabled={lessonIndex === 0}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-sm"
                  style={{
                    background: lessonIndex === 0 ? "#f3f4f6" : "#ede9fe",
                    color: lessonIndex === 0 ? "#d1d5db" : "#7c3aed",
                  }}
                  whileHover={lessonIndex !== 0 ? { scale: 1.04 } : {}}
                  whileTap={lessonIndex !== 0 ? { scale: 0.96 } : {}}
                >
                  <ChevronLeft size={16} /> Previous
                </motion.button>
                <motion.button
                  onClick={() => setLessonIndex((i) => Math.min(lessons.length - 1, i + 1))}
                  disabled={lessonIndex === lessons.length - 1}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-sm text-white shadow-md"
                  style={{
                    background: lessonIndex === lessons.length - 1
                      ? "#d1d5db"
                      : `linear-gradient(135deg, ${interest?.color ?? "#6366f1"}, ${interest?.color ?? "#6366f1"}cc)`,
                  }}
                  whileHover={lessonIndex !== lessons.length - 1 ? { scale: 1.04 } : {}}
                  whileTap={lessonIndex !== lessons.length - 1 ? { scale: 0.96 } : {}}
                >
                  Next <ChevronRight size={16} />
                </motion.button>
              </div>

              {/* All done */}
              {completedLessons.size === lessons.length && lessons.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="mt-5 rounded-3xl p-5 text-center"
                  style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: "2px solid #6ee7b7" }}
                >
                  <p className="text-3xl mb-2">🏆</p>
                  <h4 className="font-black text-lg mb-1" style={{ color: "#065f46" }}>
                    All lessons done! Amazing!
                  </h4>
                  <p className="text-sm font-semibold mb-3" style={{ color: "#059669" }}>
                    You crushed {interest?.label}! Pick a new topic to keep going.
                  </p>
                  <motion.button
                    onClick={clearInterest}
                    className="px-6 py-2.5 rounded-full font-bold text-white text-sm shadow-md"
                    style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Choose another topic 🚀
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}