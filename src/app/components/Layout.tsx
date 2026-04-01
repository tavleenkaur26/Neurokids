// src/components/Layout.tsx
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Brain, BookOpen, Gamepad2, BarChart3, Compass, LogOut } from "lucide-react";
import { motion } from "motion/react";

interface NavItem {
  path: string;
  icon: any;
  label: string;
  emoji: string;
  accent: string;
  accentBg: string;
}

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const childItems: NavItem[] = [
    { path: "/social-coach",   icon: Brain,    label: "Social Coach",    emoji: "💬", accent: "#7c3aed", accentBg: "#ede9fe" },
    { path: "/learning",       icon: BookOpen, label: "Learning",        emoji: "📚", accent: "#059669", accentBg: "#d1fae5" },
    { path: "/dyslexia-games", icon: Gamepad2, label: "Games",           emoji: "🎮", accent: "#be185d", accentBg: "#fce7f3" },
  ];

  const parentItems: NavItem[] = [
    { path: "/parent-dashboard", icon: BarChart3, label: "Dashboard",     emoji: "📊", accent: "#2563eb", accentBg: "#dbeafe" },
    { path: "/connect-child",    icon: Compass,  label: "Connect Child",  emoji: "🔗", accent: "#059669", accentBg: "#d1fae5" },
  ];

  const navItems = role === "parent" ? parentItems : role === "child" ? childItems : [];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const isParent = role === "parent";

  return (
    <div
      className="min-h-screen"
      style={{ background: isParent
        ? "linear-gradient(160deg, #f0fdf4 0%, #eff6ff 50%, #faf8ff 100%)"
        : "linear-gradient(160deg, #faf8ff 0%, #ede9fe 40%, #fce7f3 100%)"
      }}
    >
      {!isLanding && role && (
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(16px)",
            borderColor: isParent ? "rgba(37,99,235,0.1)" : "rgba(124,58,237,0.1)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-md"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)" }}
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                🪺
              </motion.div>
              <span
                className="font-black text-xl tracking-tight"
                style={{ color: "#4c1d95", fontFamily: "'Nunito', sans-serif" }}
              >
                NeuroNest
              </span>
              {role && (
                <span
                  className="hidden sm:inline px-2 py-0.5 rounded-full text-xs font-bold"
                  style={isParent
                    ? { background: "#dbeafe", color: "#2563eb" }
                    : { background: "#ede9fe", color: "#7c3aed" }
                  }
                >
                  {isParent ? "Parent" : "Explorer 🌟"}
                </span>
              )}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all"
                      style={isActive
                        ? { background: item.accentBg, color: item.accent }
                        : { color: "#6b7280" }
                      }
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                    </motion.div>
                  </Link>
                );
              })}
              <motion.button
                onClick={handleLogout}
                className="ml-3 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold"
                style={{ color: "#ef4444" }}
                whileHover={{ scale: 1.04, background: "#fee2e2" }}
                whileTap={{ scale: 0.96 }}
              >
                <LogOut size={15} />
                Logout
              </motion.button>
            </nav>
          </div>
        </header>
      )}

      <main className="w-full pb-24 md:pb-4">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      {!isLanding && role && (
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(124,58,237,0.1)",
          }}
        >
          <div className="flex items-center justify-around py-2 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="flex-1">
                  <motion.div
                    className="flex flex-col items-center gap-0.5 py-1.5 rounded-2xl mx-1"
                    style={isActive ? { background: item.accentBg } : {}}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: isActive ? item.accent : "#9ca3af" }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex-1 flex flex-col items-center gap-0.5 py-1.5"
            >
              <span className="text-xl">👋</span>
              <span className="text-[10px] font-bold" style={{ color: "#ef4444" }}>Out</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}