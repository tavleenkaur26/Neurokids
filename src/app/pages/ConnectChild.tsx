import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ConnectChild() {
  const [childEmail, setChildEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOTP = () => {
    if (!childEmail.includes("@")) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      return;
    }
    const otp = generateOTP();
    setGeneratedOtp(otp);
    localStorage.setItem("childConnection", JSON.stringify({ childEmail, otp, verified: false }));
    setOtpSent(true);
    setMessage("");
    setIsError(false);
  };

  const handleVerifyOTP = () => {
    const stored = localStorage.getItem("childConnection");
    if (!stored) return;
    const data = JSON.parse(stored);
    if (otpInput === data.otp) {
      data.verified = true;
      localStorage.setItem("childConnection", JSON.stringify(data));
      const children = JSON.parse(localStorage.getItem("parentChildren") || "[]");
      if (!children.includes(data.childEmail)) children.push(data.childEmail);
      localStorage.setItem("parentChildren", JSON.stringify(children));
      setConnected(true);
      setMessage("");
      setIsError(false);
    } else {
      setMessage("That OTP doesn't match — try again!");
      setIsError(true);
    }
  };

  const steps = [
    { label: "Enter Email", done: otpSent || connected },
    { label: "Enter OTP",   done: connected },
    { label: "Connected!",  done: connected },
  ];

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center justify-center">

      {/* Background deco */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[-60px] w-56 h-56 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #93c5fd, transparent)" }} />
        <div className="absolute bottom-20 right-[-40px] w-48 h-48 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #6ee7b7, transparent)" }} />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Header */}
        <motion.div
          className="text-center mb-7"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-18 h-18 rounded-2xl text-4xl mb-4 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #dbeafe, #d1fae5)",
              width: 72, height: 72,
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
          >
            🔗
          </motion.div>
          <h1 className="text-3xl font-black mb-1" style={{ color: "#1e1532", fontFamily: "'Nunito', sans-serif" }}>
            Connect Your Child
          </h1>
          <p className="text-sm font-semibold" style={{ color: "#6b7280" }}>
            Link your child's account to start tracking their progress
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-7">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                  style={{
                    background: step.done ? "linear-gradient(135deg, #059669, #34d399)" : i === steps.filter(s => s.done).length ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#e5e7eb",
                    color: (step.done || i === steps.filter(s => s.done).length) ? "white" : "#9ca3af",
                  }}
                >
                  {step.done ? "✓" : i + 1}
                </div>
                <span className="text-xs font-bold hidden sm:block" style={{ color: step.done ? "#059669" : "#9ca3af" }}>
                  {step.label}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="w-5 h-px mx-1" style={{ background: steps[i].done ? "#059669" : "#e5e7eb" }} />
              )}
            </div>
          ))}
        </div>

        {/* Main card */}
        <motion.div
          className="rounded-3xl p-7"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            border: "1.5px solid rgba(37,99,235,0.12)",
            boxShadow: "0 4px 32px rgba(37,99,235,0.08)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          layout
        >
          <AnimatePresence mode="wait">

            {/* Step 1: Email input */}
            {!otpSent && !connected && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-2">
                  <span className="text-2xl">📧</span>
                </div>
                <h2 className="font-black text-lg mb-1" style={{ color: "#1e1532" }}>
                  Child's Email Address
                </h2>
                <p className="text-sm font-semibold mb-5" style={{ color: "#9ca3af" }}>
                  We'll send a one-time code for verification
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-black mb-2 uppercase tracking-wide" style={{ color: "#6b7280" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="child@email.com"
                    value={childEmail}
                    onChange={(e) => { setChildEmail(e.target.value); setMessage(""); setIsError(false); }}
                    className="w-full px-4 py-3 rounded-2xl font-semibold text-sm transition-all outline-none"
                    style={{
                      background: "#f5f3ff",
                      border: `2px solid ${isError ? "#ef4444" : childEmail ? "#7c3aed" : "transparent"}`,
                      color: "#1e1532",
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                  />
                </div>

                {message && (
                  <motion.p
                    className="text-xs font-bold mb-4 px-3 py-2 rounded-xl"
                    style={{ background: "#fee2e2", color: "#dc2626" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ⚠️ {message}
                  </motion.p>
                )}

                <motion.button
                  onClick={handleSendOTP}
                  className="w-full py-3.5 rounded-2xl font-black text-white text-base shadow-lg"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(37,99,235,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Verification Code →
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: OTP entry */}
            {otpSent && !connected && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-2">
                  <span className="text-2xl">🔐</span>
                </div>
                <h2 className="font-black text-lg mb-1" style={{ color: "#1e1532" }}>
                  Enter the Code
                </h2>
                <p className="text-sm font-semibold mb-1" style={{ color: "#9ca3af" }}>
                  Sent to <span className="font-black" style={{ color: "#7c3aed" }}>{childEmail}</span>
                </p>

                {/* Demo OTP display */}
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5 mt-4"
                  style={{ background: "#fef3c7", border: "2px solid #fde68a" }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-xs font-black" style={{ color: "#92400e" }}>DEMO MODE — Your OTP:</p>
                    <p className="text-2xl font-black tracking-[0.3em]" style={{ color: "#d97706" }}>{generatedOtp}</p>
                  </div>
                </motion.div>

                <div className="mb-4">
                  <label className="block text-xs font-black mb-2 uppercase tracking-wide" style={{ color: "#6b7280" }}>
                    6-Digit Code
                  </label>
                  <input
                    type="text"
                    placeholder="______"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, "")); setMessage(""); setIsError(false); }}
                    className="w-full px-4 py-3 rounded-2xl font-black text-xl text-center tracking-[0.4em] transition-all outline-none"
                    style={{
                      background: "#f5f3ff",
                      border: `2px solid ${isError ? "#ef4444" : otpInput.length === 6 ? "#059669" : otpInput ? "#7c3aed" : "transparent"}`,
                      color: "#1e1532",
                    }}
                    onKeyDown={(e) => e.key === "Enter" && otpInput.length === 6 && handleVerifyOTP()}
                  />
                </div>

                {message && (
                  <motion.p
                    className="text-xs font-bold mb-4 px-3 py-2 rounded-xl"
                    style={{ background: "#fee2e2", color: "#dc2626" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ⚠️ {message}
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => { setOtpSent(false); setOtpInput(""); setMessage(""); }}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm"
                    style={{ background: "#f5f3ff", color: "#7c3aed" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    onClick={handleVerifyOTP}
                    disabled={otpInput.length !== 6}
                    className="flex-[2] py-3 rounded-2xl font-black text-white text-sm shadow-lg"
                    style={{
                      background: otpInput.length === 6
                        ? "linear-gradient(135deg, #059669, #10b981)"
                        : "#d1d5db",
                    }}
                    whileHover={otpInput.length === 6 ? { scale: 1.02, boxShadow: "0 8px 24px rgba(5,150,105,0.35)" } : {}}
                    whileTap={otpInput.length === 6 ? { scale: 0.97 } : {}}
                  >
                    Verify & Connect ✓
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {connected && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center py-4"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  🎉
                </motion.div>
                <h2 className="font-black text-2xl mb-2" style={{ color: "#059669", fontFamily: "'Nunito', sans-serif" }}>
                  All Connected!
                </h2>
                <p className="text-sm font-semibold mb-5" style={{ color: "#6b7280" }}>
                  <span className="font-black" style={{ color: "#1e1532" }}>{childEmail}</span> is now linked to your account
                </p>

                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
                  style={{ background: "#d1fae5", border: "2px solid #6ee7b7" }}
                >
                  <span className="text-xl">✅</span>
                  <p className="text-sm font-bold" style={{ color: "#065f46" }}>
                    You can now track your child's progress from the Parent Dashboard
                  </p>
                </div>

                <a href="/parent-dashboard">
                  <motion.button
                    className="w-full py-3.5 rounded-2xl font-black text-white shadow-lg"
                    style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Go to Dashboard →
                  </motion.button>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust note */}
        <motion.p
          className="text-center text-xs font-semibold mt-5"
          style={{ color: "#c4b5fd" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🔒 Safe & private — no real emails are sent in demo mode
        </motion.p>
      </div>
    </div>
  );
}