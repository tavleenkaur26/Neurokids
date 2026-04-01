import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export function Landing() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"home" | "role">("home");
  const [selectedRole, setSelectedRole] = useState<"child" | "parent" | null>(null);

  const handleRoleSelect = (role: "child" | "parent") => {
    setSelectedRole(role);
    localStorage.setItem("role", role);
    localStorage.setItem("isLoggedIn", "true");
    setTimeout(() => {
      navigate(role === "parent" ? "/parent-dashboard" : "/social-coach");
    }, 600);
  };

  return (
    <div className="min-h-screen overflow-hidden relative" style={{ background: "linear-gradient(145deg, #faf8ff 0%, #ede9fe 40%, #fce7f3 100%)" }}>

      {/* Decorative blobs */}
      <div
        className="absolute top-[-80px] left-[-80px] w-72 h-72 opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, #c4b5fd, #a78bfa)", borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-64 h-64 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f9a8d4, #fb7185)", borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%" }}
      />
      <div
        className="absolute top-1/2 right-[-40px] w-48 h-48 opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6ee7b7, #34d399)", borderRadius: "55% 45% 60% 40% / 45% 55% 40% 60%" }}
      />

      {/* Floating stars/dots */}
      {[
        { top: "12%", left: "8%", size: 10, color: "#fde68a", delay: "0s" },
        { top: "25%", right: "12%", size: 8, color: "#f9a8d4", delay: "0.4s" },
        { top: "65%", left: "6%", size: 12, color: "#93c5fd", delay: "0.8s" },
        { top: "80%", right: "8%", size: 9, color: "#6ee7b7", delay: "0.2s" },
        { top: "45%", left: "15%", size: 6, color: "#c4b5fd", delay: "1.1s" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none nn-float"
          style={{
            top: dot.top,
            left: (dot as any).left,
            right: (dot as any).right,
            width: dot.size,
            height: dot.size,
            background: dot.color,
            animationDelay: dot.delay,
            opacity: 0.7,
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {step === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
              className="flex flex-col items-center text-center max-w-md"
            >
              {/* Logo mark */}
              <motion.div
                className="nn-float mb-6 relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl shadow-xl"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)" }}
                >
                  🪺
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white shadow"
                  style={{ background: "#fbbf24" }}
                >
                  ✨
                </div>
              </motion.div>

              {/* Brand name */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1
                  className="text-5xl font-black mb-1 tracking-tight"
                  style={{ color: "#4c1d95", fontFamily: "'Nunito', sans-serif" }}
                >
                  NeuroNest
                </h1>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: "#fde68a", color: "#92400e" }}
                >
                  A Safe Space to Learn & Grow 🌱
                </div>
              </motion.div>

              <motion.p
                className="text-base mb-8 leading-relaxed max-w-xs"
                style={{ color: "#6d28d9", fontWeight: 600 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Built for neurodivergent minds. Play, learn, and thrive — at your own pace. 💜
              </motion.p>

              <motion.button
                className="nn-btn-primary text-lg px-10 py-4"
                onClick={() => setStep("role")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Get Started! 🚀
              </motion.button>

              {/* Feature pills */}
              <motion.div
                className="flex flex-wrap gap-2 justify-center mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                {[
                  { label: "Social Coach", emoji: "💬", bg: "#ede9fe", color: "#7c3aed" },
                  { label: "Learning Engine", emoji: "📚", bg: "#d1fae5", color: "#059669" },
                  { label: "Dyslexia Games", emoji: "🎮", bg: "#fce7f3", color: "#be185d" },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{ background: pill.bg, color: pill.color }}
                  >
                    {pill.emoji} {pill.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center w-full max-w-lg"
            >
              <motion.button
                className="self-start mb-6 flex items-center gap-2 text-sm font-bold"
                style={{ color: "#7c3aed" }}
                onClick={() => setStep("home")}
                whileHover={{ x: -3 }}
              >
                ← Back
              </motion.button>

              <div className="text-3xl mb-2">👋</div>
              <h2
                className="text-3xl font-black mb-2"
                style={{ color: "#4c1d95", fontFamily: "'Nunito', sans-serif" }}
              >
                Who's visiting today?
              </h2>
              <p className="text-sm mb-8" style={{ color: "#7c6f9e", fontWeight: 600 }}>
                Pick your role to get the right experience
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                {/* Child card */}
                <motion.button
                  className="group relative overflow-hidden rounded-3xl p-7 text-left cursor-pointer border-2 transition-all"
                  style={{
                    background: selectedRole === "child"
                      ? "linear-gradient(135deg, #ede9fe, #fce7f3)"
                      : "white",
                    borderColor: selectedRole === "child" ? "#7c3aed" : "rgba(124,58,237,0.15)",
                    boxShadow: selectedRole === "child"
                      ? "0 8px 30px rgba(124,58,237,0.25)"
                      : "0 2px 16px rgba(124,58,237,0.08)",
                  }}
                  onClick={() => handleRoleSelect("child")}
                  whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(124,58,237,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Background blob */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-20"
                    style={{ background: "radial-gradient(circle, #c4b5fd, transparent)", borderRadius: "50%" }}
                  />
                  <div className="text-5xl mb-3 nn-float" style={{ animationDelay: "0.3s" }}>🧒</div>
                  <h3 className="text-xl font-black mb-1" style={{ color: "#4c1d95" }}>I'm a Kid!</h3>
                  <p className="text-sm font-semibold" style={{ color: "#7c6f9e" }}>
                    Play games, learn cool stuff & practise social skills
                  </p>
                  <div className="flex gap-1.5 mt-4 flex-wrap">
                    {["🎮 Games", "📚 Learn", "💬 Social"].map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: "#ede9fe", color: "#7c3aed" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>

                {/* Parent card */}
                <motion.button
                  className="group relative overflow-hidden rounded-3xl p-7 text-left cursor-pointer border-2 transition-all"
                  style={{
                    background: selectedRole === "parent"
                      ? "linear-gradient(135deg, #d1fae5, #dbeafe)"
                      : "white",
                    borderColor: selectedRole === "parent" ? "#059669" : "rgba(5,150,105,0.15)",
                    boxShadow: selectedRole === "parent"
                      ? "0 8px 30px rgba(5,150,105,0.25)"
                      : "0 2px 16px rgba(5,150,105,0.08)",
                  }}
                  onClick={() => handleRoleSelect("parent")}
                  whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(5,150,105,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-20"
                    style={{ background: "radial-gradient(circle, #6ee7b7, transparent)", borderRadius: "50%" }}
                  />
                  <div className="text-5xl mb-3 nn-float" style={{ animationDelay: "0.7s" }}>👨‍👩‍👧</div>
                  <h3 className="text-xl font-black mb-1" style={{ color: "#064e3b" }}>I'm a Parent</h3>
                  <p className="text-sm font-semibold" style={{ color: "#6b7280" }}>
                    Track progress, get insights & connect with your child
                  </p>
                  <div className="flex gap-1.5 mt-4 flex-wrap">
                    {["📊 Insights", "🔗 Connect", "💡 Tips"].map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: "#d1fae5", color: "#059669" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              </div>

              <p className="mt-6 text-xs font-semibold" style={{ color: "#9ca3af" }}>
                No account needed for demo — just pick and go!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}