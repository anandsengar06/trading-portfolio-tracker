import React, { useState, useMemo, useCallback, useRef, useEffect, createElement } from "react";
import { createRoot } from "react-dom/client";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, Plus, Moon, Sun, Menu, X, Activity, BookOpen, Bot, Calendar, ChevronDown, Target, Brain, Zap, Clock, Award, AlertTriangle, Filter, ArrowUpRight, ArrowDownRight, Percent, Briefcase, Bitcoin, Landmark, LineChart as LineChartIcon, Gem, Upload, Wifi, Copy, CheckCircle, FileText, Settings, RefreshCw, Crosshair, Play, Pause, SkipForward, SkipBack, RotateCcw, Eye, LogOut, User, IndianRupee, Home, BarChart2 } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ============================================================
// FIREBASE CONFIG
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyB-Eptx_RSKdnRHoORppt9pM-uEiSSXHZM",
  authDomain: "trading-portfolio-tracke-fe53a.web.app",
  projectId: "trading-portfolio-tracke-fe53a",
  storageBucket: "trading-portfolio-tracke-fe53a.firebasestorage.app",
  messagingSenderId: "952250050109",
  appId: "1:952250050109:web:965ecdc3bdf6c879b4ac54"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// ============================================================
// GOOGLE SIGN-IN PAGE
// ============================================================
const SignInPage = ({ onSignIn, loading }) => (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #050505 0%, #0d0d0d 50%, #050505 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative", overflow: "hidden",
  }}>
    {/* Animated particles background */}
    {[...Array(20)].map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        borderRadius: "50%",
        background: `rgba(0, 255, 136,${Math.random() * 0.1})`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${Math.random() * 20 + 20}s infinite`,
      }} />
    ))}

    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); opacity: 0.3; }
        50% { transform: translateY(-30px); opacity: 0.6; }
      }
    `}</style>

    <div style={{
      background: "rgba(20,20,20,0.6)",
      backdropFilter: "blur(20px)",
      borderRadius: 24,
      padding: "48px 40px",
      width: "100%",
      maxWidth: 420,
      border: "1px solid rgba(100,100,100,0.2)",
      boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)",
      textAlign: "center",
      zIndex: 10,
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        background: "linear-gradient(135deg, #00ff88, #00cc6a)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px",
        boxShadow: "0 8px 32px rgba(0,255,136,0.3)",
      }}>
        <Activity size={36} color="#fff" />
      </div>
      <h1 style={{ color: "#fafafa", fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>TradeTracker</h1>
      <p style={{ color: "#8a8a8a", fontSize: 15, margin: "0 0 36px", lineHeight: 1.5 }}>
        Portfolio & Analytics Dashboard
      </p>
      <button
        onClick={onSignIn}
        disabled={loading}
        style={{
          width: "100%", padding: "14px 24px", borderRadius: 14,
          border: "1px solid rgba(100,100,100,0.2)",
          background: loading ? "rgba(52,57,70,0.5)" : "#fff",
          color: loading ? "#8a8a8a" : "#0a0a0a",
          fontSize: 15, fontWeight: 700, cursor: loading ? "wait" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          transition: "all 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        onMouseOver={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {loading ? (
          <span>Signing in...</span>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </>
        )}
      </button>
      <p style={{ color: "#6b6b6b", fontSize: 12, marginTop: 24, lineHeight: 1.5 }}>
        Your trades are securely saved to the cloud and synced across all devices.
      </p>
    </div>
  </div>
);

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
const formatCurrency = (val) => {
  if (val === undefined || val === null) return "₹0.00";
  const abs = Math.abs(val);
  const str = abs >= 1000 ? `₹${(abs / 1000).toFixed(1)}k` : `₹${abs.toFixed(2)}`;
  return val < 0 ? `-${str}` : str;
};
const formatPercent = (val) => `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`;
const pnlColor = (val, dark) => val >= 0 ? (dark ? "#4ade80" : "#16a34a") : (dark ? "#f87171" : "#dc2626");
const pnlBg = (val, dark) => val >= 0 ? (dark ? "rgba(74,222,128,0.1)" : "rgba(22,163,74,0.08)") : (dark ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.08)");

// ============================================================
// METRIC CARD COMPONENT (GLASSMORPHISM)
// ============================================================
const MetricCard = ({ icon: Icon, label, value, subValue, trend, dark, accent }) => {
  const accentColor = accent || "#00ff88";

  // Generate mini sparkline data
  const sparklineData = useMemo(() => {
    const baseValue = parseFloat(value.toString().replace(/[^0-9.-]/g, '')) || 0;
    const variance = Math.abs(baseValue) * 0.15;
    return [...Array(8)].map((_, i) => ({
      value: baseValue - variance + Math.random() * variance * 2
    }));
  }, [value]);

  return (
    <div style={{
      background: "rgba(20,20,20,0.6)",
      backdropFilter: "blur(12px)",
      borderRadius: 16,
      padding: "20px 20px",
      border: "1px solid rgba(100,100,100,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0,
      boxShadow: `0 8px 32px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.05), 0 0 20px ${accentColor}22`,
      borderLeft: `3px solid ${accentColor}`,
      transition: "all 0.3s ease",
      _hover: { transform: "translateY(-2px)", boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 30px ${accentColor}33` },
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 16px ${accentColor}30`,
        }}>
          <Icon size={22} color={accentColor} strokeWidth={1.5} />
        </div>
        {trend !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 600, color: trend >= 0 ? "#4ade80" : "#f87171" }}>
            {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: 11, color: "#8a8a8a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#fafafa", letterSpacing: -0.8 }}>{value}</div>
      {subValue && <div style={{ fontSize: 12, color: "#6b6b6b" }}>{subValue}</div>}

      {/* Mini Sparkline */}
      <div style={{ marginTop: 8, height: 32 }}>
        <ResponsiveContainer width="100%" height={32}>
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={accentColor} fill={`url(#spark-${label})`} strokeWidth={1.5} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================================================
// EMOTION BADGE
// ============================================================
const emotionColors = {
  Confident: { bg: "#dcfce7", color: "#166534", darkBg: "#14532d", darkColor: "#86efac" },
  Disciplined: { bg: "#dbeafe", color: "#1e40af", darkBg: "#1e3a5f", darkColor: "#93c5fd" },
  Calm: { bg: "#e0e7ff", color: "#3730a3", darkBg: "#312e81", darkColor: "#a5b4fc" },
  Neutral: { bg: "#fafafa", color: "#3a3a3a", darkBg: "#2a2a2a", darkColor: "#8a8a8a" },
  Anxious: { bg: "#fef3c7", color: "#92400e", darkBg: "#78350f", darkColor: "#fcd34d" },
  Fearful: { bg: "#fee2e2", color: "#991b1b", darkBg: "#7f1d1d", darkColor: "#fca5a5" },
  Greedy: { bg: "#fce7f3", color: "#9d174d", darkBg: "#831843", darkColor: "#f9a8d4" },
};
const EmotionBadge = ({ emotion, dark }) => {
  const c = emotionColors[emotion] || emotionColors.Neutral;
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
      background: dark ? c.darkBg : c.bg, color: dark ? c.darkColor : c.color,
    }}>{emotion}</span>
  );
};

// ============================================================
// STAR RATING
// ============================================================
const StarRating = ({ value, onChange, size = 16 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map(s => (
      <span key={s} onClick={() => onChange && onChange(s)} style={{ cursor: onChange ? "pointer" : "default", fontSize: size, color: s <= value ? "#f59e0b" : "#8a8a8a" }}>★</span>
    ))}
  </div>
);

// ============================================================
// MARKET ICON
// ============================================================
const MarketIcon = ({ market, size = 16 }) => {
  const icons = { Stocks: Briefcase, Crypto: Bitcoin, Forex: Landmark, Options: LineChartIcon };
  const Icon = icons[market] || Activity;
  const colors = { Stocks: "#00ff88", Crypto: "#00e5ff", Forex: "#00cc6a", Options: "#00ff88" };
  return <Icon size={size} color={colors[market] || "#6b6b6b"} />;
};

// ============================================================
// QUICK P&L MODAL
// ============================================================
const QuickPnlModal = ({ dark, isMobile, onClose, onAdd }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    pnl: "",
    market: "Stocks",
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const submit = () => {
    if (!form.pnl || form.pnl === "") return;
    const amount = parseFloat(form.pnl);
    onAdd({
      id: Date.now(),
      date: form.date,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      market: form.market,
      symbol: "Daily P&L",
      side: "Long",
      source: "Manual",
      entryPrice: 0,
      exitPrice: amount > 0 ? amount : 0,
      quantity: 1,
      pnl: amount,
      fees: 0,
      netPnl: amount,
      strategy: "Daily P&L",
      emotion: "Neutral",
      broker: "Manual",
      holdTime: 0,
      rating: 3,
      discipline: 3,
      notes: "Quick daily P&L entry",
      tags: [],
    });
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 14, border: `1px solid ${dark ? "#3a3a3a" : "#d1d5db"}`,
    background: dark ? "#050505" : "#f8fafc", color: dark ? "#fafafa" : "#050505", outline: "none", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: dark ? "#8a8a8a" : "#6b6b6b", marginBottom: 4 };
  const selectStyle = { ...inputStyle, appearance: "none", cursor: "pointer" };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
      zIndex: 1000, padding: isMobile ? 0 : 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: dark ? "rgba(18,18,28,0.98)" : "#fff",
        backdropFilter: "blur(20px)",
        borderRadius: isMobile ? "24px 24px 0 0" : 20,
        padding: isMobile ? "24px 20px 32px" : 28,
        width: "100%",
        maxWidth: isMobile ? "100%" : 420,
        border: `1px solid ${dark ? "rgba(0,255,136,0.1)" : "#e2e8f0"}`,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      }}>
        {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(150,150,150,0.3)", margin: "0 auto 20px" }} />}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: dark ? "#fafafa" : "#050505" }}>⚡ Quick P&L Entry</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} color={dark ? "#8a8a8a" : "#6b6b6b"} /></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          <div><div style={labelStyle}>Date</div><input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={inputStyle} /></div>
          <div>
            <div style={labelStyle}>Market</div>
            <select value={form.market} onChange={e => set("market", e.target.value)} style={selectStyle}>
              {["Stocks", "Crypto", "Forex", "Options"].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div><div style={labelStyle}>P&L Amount (₹)</div><input type="number" step="any" placeholder="e.g. 5000 or -2500" value={form.pnl} onChange={e => set("pnl", e.target.value)} style={inputStyle} /></div>
        </div>

        <button onClick={submit} style={{
          width: "100%", marginTop: 20, padding: "14px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
        }}>Add P&L Entry</button>
      </div>
    </div>
  );
};

// ============================================================
// CSV UPLOAD MODAL
// ============================================================
const CsvUploadModal = ({ dark, isMobile, onClose, onAdd }) => {
  const [csvData, setCsvData] = useState(null);
  const [preview, setPreview] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (typeof text !== 'string') return;
      const lines = text.trim().split('\n');
      if (lines.length < 2) return;
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const trades = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length < headers.length || !values.some(v => v)) continue;
        const row = {};
        headers.forEach((h, idx) => { row[h] = values[idx]; });
        trades.push(row);
      }
      setCsvData(trades);
      setPreview(trades.slice(0, 5));
    };
    reader.readAsText(file);
  };

  const importTrades = () => {
    if (!csvData) return;
    csvData.forEach(row => {
      const entry = parseFloat(row.entry_price || row.entryPrice || 0);
      const exit = parseFloat(row.exit_price || row.exitPrice || 0);
      const qty = parseFloat(row.quantity || 1);
      const pnl = parseFloat(((exit - entry) * qty * (row.side === "Short" ? -1 : 1)).toFixed(2));
      const fees = parseFloat((Math.abs(pnl) * 0.02).toFixed(2));
      onAdd({
        id: Date.now() + Math.random(),
        date: row.date || new Date().toISOString().split("T")[0],
        time: row.time || "09:30",
        market: row.market || "Stocks",
        symbol: (row.symbol || "UNKNOWN").toUpperCase(),
        side: row.side || "Long",
        source: row.source || "Manual",
        entryPrice: entry,
        exitPrice: exit,
        quantity: qty,
        pnl,
        fees,
        netPnl: pnl - fees,
        strategy: row.strategy || "Unknown",
        emotion: "Neutral",
        broker: row.broker || "Manual",
        holdTime: 0,
        rating: 3,
        discipline: 3,
        notes: row.notes || "",
        tags: [],
      });
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
      zIndex: 1000, padding: isMobile ? 0 : 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: dark ? "rgba(18,18,28,0.98)" : "#fff",
        backdropFilter: "blur(20px)",
        borderRadius: isMobile ? "24px 24px 0 0" : 20,
        padding: isMobile ? "24px 20px 32px" : 28,
        width: "100%",
        maxWidth: isMobile ? "100%" : 600,
        maxHeight: isMobile ? "88vh" : "80vh",
        overflowY: "auto",
        border: `1px solid ${dark ? "rgba(0,255,136,0.1)" : "#e2e8f0"}`,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      }}>
        {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(150,150,150,0.3)", margin: "0 auto 20px" }} />}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: dark ? "#fafafa" : "#050505" }}>📁 Import Trades from CSV</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} color={dark ? "#8a8a8a" : "#6b6b6b"} /></button>
        </div>

        <p style={{ fontSize: 13, color: dark ? "#8a8a8a" : "#6b6b6b", marginBottom: 16 }}>
          Expected columns: date, symbol, market, side, entry_price, exit_price, quantity, strategy, broker, source, notes
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          style={{
            width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${dark ? "#3a3a3a" : "#d1d5db"}`,
            background: dark ? "#050505" : "#f8fafc", color: dark ? "#fafafa" : "#050505", fontSize: 14,
          }}
        />

        {preview.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: dark ? "#fafafa" : "#050505" }}>Preview ({csvData?.length} trades)</h3>
            <div style={{ overflowX: "auto", maxHeight: 300, overflowY: "auto" }}>
              <table style={{
                width: "100%", fontSize: 12, borderCollapse: "collapse",
                color: dark ? "#fafafa" : "#050505",
              }}>
                <thead>
                  <tr style={{ background: dark ? "rgba(0,255,136,0.1)" : "rgba(0,255,136,0.05)", borderBottom: `1px solid ${dark ? "#3a3a3a" : "#d1d5db"}` }}>
                    {["Symbol", "Market", "Side", "Entry", "Exit", "Qty", "Strategy"].map(h => (
                      <th key={h} style={{ padding: "8px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${dark ? "#2a2a2a" : "#e2e8f0"}` }}>
                      <td style={{ padding: "8px" }}>{row.symbol || row.Symbol || "—"}</td>
                      <td style={{ padding: "8px" }}>{row.market || row.Market || "—"}</td>
                      <td style={{ padding: "8px" }}>{row.side || row.Side || "—"}</td>
                      <td style={{ padding: "8px" }}>{row.entry_price || row.entryPrice || row.Entry || "—"}</td>
                      <td style={{ padding: "8px" }}>{row.exit_price || row.exitPrice || row.Exit || "—"}</td>
                      <td style={{ padding: "8px" }}>{row.quantity || row.Qty || "—"}</td>
                      <td style={{ padding: "8px" }}>{row.strategy || row.Strategy || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "14px", borderRadius: 12, border: `1px solid ${dark ? "#3a3a3a" : "#d1d5db"}`,
            background: "transparent", color: dark ? "#fafafa" : "#050505",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={importTrades} disabled={!csvData} style={{
            flex: 1, padding: "14px", borderRadius: 12, border: "none",
            background: csvData ? "linear-gradient(135deg, #00ff88, #00cc6a)" : "rgba(100,100,100,0.2)",
            color: csvData ? "#000" : "#8a8a8a",
            fontSize: 15, fontWeight: 700, cursor: csvData ? "pointer" : "not-allowed",
          }}>Import All {csvData ? `(${csvData.length})` : ""}</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ADD TRADE MODAL
// ============================================================
const AddTradeModal = ({ dark, isMobile, onClose, onAdd }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0], time: "09:30", market: "Stocks",
    symbol: "", side: "Long", entryPrice: "", exitPrice: "", quantity: "",
    strategy: "Breakout", emotion: "Neutral", broker: "Zerodha",
    source: "Manual", notes: "", rating: 3, discipline: 3,
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const submit = () => {
    if (!form.symbol || !form.entryPrice || !form.exitPrice) return;
    const entry = parseFloat(form.entryPrice);
    const exit = parseFloat(form.exitPrice);
    const qty = parseFloat(form.quantity) || 1;
    const pnl = parseFloat(((exit - entry) * qty * (form.side === "Short" ? -1 : 1)).toFixed(2));
    const fees = parseFloat((Math.abs(pnl) * 0.02).toFixed(2));
    onAdd({
      ...form, id: Date.now(), entryPrice: entry, exitPrice: exit, quantity: qty,
      pnl, fees, netPnl: parseFloat((pnl - fees).toFixed(2)),
      holdTime: Math.floor(Math.random() * 120) + 5, tags: [],
    });
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 14, border: `1px solid ${dark ? "#3a3a3a" : "#d1d5db"}`,
    background: dark ? "#050505" : "#f8fafc", color: dark ? "#fafafa" : "#050505", outline: "none", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: dark ? "#8a8a8a" : "#6b6b6b", marginBottom: 4 };
  const selectStyle = { ...inputStyle, appearance: "none", cursor: "pointer" };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
      zIndex: 1000, padding: isMobile ? 0 : 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: dark ? "rgba(18,18,28,0.98)" : "#fff",
        backdropFilter: "blur(20px)",
        borderRadius: isMobile ? "24px 24px 0 0" : 20,
        padding: isMobile ? "24px 20px 32px" : 28,
        width: "100%",
        maxWidth: isMobile ? "100%" : 520,
        maxHeight: isMobile ? "92vh" : "90vh",
        overflowY: "auto",
        border: `1px solid ${dark ? "rgba(0,255,136,0.1)" : "#e2e8f0"}`,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      }}>
        {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(150,150,150,0.3)", margin: "0 auto 20px" }} />}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: dark ? "#fafafa" : "#050505" }}>Add New Trade</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} color={dark ? "#8a8a8a" : "#6b6b6b"} /></button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><div style={labelStyle}>Date</div><input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={inputStyle} /></div>
          <div><div style={labelStyle}>Time</div><input type="time" value={form.time} onChange={e => set("time", e.target.value)} style={inputStyle} /></div>
          <div>
            <div style={labelStyle}>Market</div>
            <select value={form.market} onChange={e => set("market", e.target.value)} style={selectStyle}>
              {["Stocks", "Crypto", "Forex", "Options"].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div><div style={labelStyle}>Symbol</div><input placeholder="e.g. AAPL, BTC/USDT" value={form.symbol} onChange={e => set("symbol", e.target.value.toUpperCase())} style={inputStyle} /></div>
          <div>
            <div style={labelStyle}>Side</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Long", "Short"].map(s => (
                <button key={s} onClick={() => set("side", s)} style={{
                  flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${form.side === s ? (s === "Long" ? "#16a34a" : "#dc2626") : (dark ? "#3a3a3a" : "#d1d5db")}`,
                  background: form.side === s ? (s === "Long" ? (dark ? "rgba(22,163,74,0.15)" : "rgba(22,163,74,0.08)") : (dark ? "rgba(220,38,38,0.15)" : "rgba(220,38,38,0.08)")) : "transparent",
                  color: form.side === s ? (s === "Long" ? "#16a34a" : "#dc2626") : (dark ? "#8a8a8a" : "#6b6b6b"),
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={labelStyle}>Source</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Manual", "Bot"].map(s => (
                <button key={s} onClick={() => set("source", s)} style={{
                  flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${form.source === s ? "#00ff88" : (dark ? "#3a3a3a" : "#d1d5db")}`,
                  background: form.source === s ? (dark ? "rgba(0,255,136,0.15)" : "rgba(0,255,136,0.08)") : "transparent",
                  color: form.source === s ? "#00ff88" : (dark ? "#8a8a8a" : "#6b6b6b"),
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                }}>{s === "Bot" ? "🤖 Bot" : "✋ Manual"}</button>
              ))}
            </div>
          </div>
          <div><div style={labelStyle}>Entry Price</div><input type="number" step="any" placeholder="0.00" value={form.entryPrice} onChange={e => set("entryPrice", e.target.value)} style={inputStyle} /></div>
          <div><div style={labelStyle}>Exit Price</div><input type="number" step="any" placeholder="0.00" value={form.exitPrice} onChange={e => set("exitPrice", e.target.value)} style={inputStyle} /></div>
          <div><div style={labelStyle}>Quantity</div><input type="number" step="any" placeholder="1" value={form.quantity} onChange={e => set("quantity", e.target.value)} style={inputStyle} /></div>
          <div>
            <div style={labelStyle}>Broker</div>
            <select value={form.broker} onChange={e => set("broker", e.target.value)} style={selectStyle}>
              {["Zerodha", "Exness", "XM", "Binance", "Bybit"].map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <div style={labelStyle}>Strategy</div>
            <select value={form.strategy} onChange={e => set("strategy", e.target.value)} style={selectStyle}>
              {["Breakout", "Scalp", "Swing", "Mean Reversion", "Momentum", "News Play"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <div style={labelStyle}>Emotion</div>
            <select value={form.emotion} onChange={e => set("emotion", e.target.value)} style={selectStyle}>
              {["Confident", "Neutral", "Fearful", "Greedy", "Disciplined", "Anxious", "Calm"].map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <div style={labelStyle}>Trade Rating</div>
            <div style={{ paddingTop: 8 }}><StarRating value={form.rating} onChange={v => set("rating", v)} size={22} /></div>
          </div>
          <div>
            <div style={labelStyle}>Discipline</div>
            <div style={{ paddingTop: 8 }}><StarRating value={form.discipline} onChange={v => set("discipline", v)} size={22} /></div>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={labelStyle}>Notes</div>
          <textarea value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="What was your reasoning? What did you learn?" rows={3} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
        </div>

        <button onClick={submit} style={{
          width: "100%", marginTop: 20, padding: "14px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
        }}>Add Trade</button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function TradingPortfolioTracker() {
  // ---- Auth State ----
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signInLoading, setSignInLoading] = useState(false);

  // ---- Responsive ----
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---- App State ----
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("calendar");
  const [trades, setTrades] = useState([]);
  const [showAddTrade, setShowAddTrade] = useState(false);
  const [showQuickPnl, setShowQuickPnl] = useState(false);
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterMarket, setFilterMarket] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [filterPeriod, setFilterPeriod] = useState("90d");
  const [journalTradeId, setJournalTradeId] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const saveTimeout = useRef(null);
  const dataLoaded = useRef(false); // tracks whether Firestore data has been fetched
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  // ---- Firebase Auth listener ----
  useEffect(() => {
    let redirectHandled = false;
    getRedirectResult(auth).then((result) => {
      redirectHandled = true;
    }).catch(e => {
      redirectHandled = true;
      if (e.code !== "auth/null-user") console.error("Redirect result error:", e);
    });

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          if (snap.exists() && snap.data().trades) {
            setTrades(snap.data().trades);
          }
        } catch (e) { console.error("Load trades error:", e); }
        dataLoaded.current = true; // mark that initial load is complete — safe to auto-save now
      }
    });
    return () => unsub();
  }, []);

  // ---- Auto-save trades to Firestore on change ----
  const tradesRef = useRef(trades);
  tradesRef.current = trades;
  const userRef = useRef(user);
  userRef.current = user;

  useEffect(() => {
    if (!user || !dataLoaded.current) return; // skip save before initial Firestore load (avoids overwriting with empty)
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      try {
        setSaveStatus("saving");
        await setDoc(doc(db, "users", userRef.current.uid), { trades: tradesRef.current, updatedAt: new Date().toISOString() }, { merge: true });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (e) { console.error("Save error:", e); setSaveStatus("error"); }
    }, 1500);
  }, [trades, user]);

  // ---- Auth handlers ----
  const handleSignIn = async () => {
    setSignInLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.warn("Popup sign-in failed, trying redirect:", e.code);
      if (e.code === "auth/popup-blocked" || e.code === "auth/popup-closed-by-user" || e.code === "auth/cancelled-popup-request" || e.code === "auth/internal-error") {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          console.error("Redirect sign-in error:", redirectErr);
        }
      } else {
        console.error("Sign-in error:", e);
      }
    }
    setSignInLoading(false);
  };
  const handleSignOut = async () => {
    await signOut(auth);
    setTrades([]);
    setPage("calendar");
  };

  // ---- Filter trades ----
  const filteredTrades = useMemo(() => {
    const now = new Date();
    const days = filterPeriod === "7d" ? 7 : filterPeriod === "30d" ? 30 : filterPeriod === "90d" ? 90 : 365;
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    return trades.filter(t => {
      if (filterMarket !== "All" && t.market !== filterMarket) return false;
      if (filterSource !== "All" && t.source !== filterSource) return false;
      if (new Date(t.date) < cutoff) return false;
      return true;
    });
  }, [trades, filterMarket, filterSource, filterPeriod]);

  // ---- Computed metrics ----
  const metrics = useMemo(() => {
    const ft = filteredTrades;
    if (!ft.length) return { totalPnl: 0, netPnl: 0, winRate: 0, profitFactor: 0, avgWin: 0, avgLoss: 0, totalTrades: 0, winners: 0, losers: 0, maxDrawdown: 0, sharpe: 0, expectancy: 0, avgHold: 0, bestTrade: 0, worstTrade: 0, streak: 0, fees: 0 };
    const winners = ft.filter(t => t.netPnl > 0);
    const losers = ft.filter(t => t.netPnl <= 0);
    const totalPnl = ft.reduce((s, t) => s + t.pnl, 0);
    const netPnl = ft.reduce((s, t) => s + t.netPnl, 0);
    const fees = ft.reduce((s, t) => s + t.fees, 0);
    const grossProfit = winners.reduce((s, t) => s + t.netPnl, 0);
    const grossLoss = Math.abs(losers.reduce((s, t) => s + t.netPnl, 0));
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 999 : 0;
    const avgWin = winners.length ? grossProfit / winners.length : 0;
    const avgLoss = losers.length ? grossLoss / losers.length : 0;

    let peak = 0, dd = 0, maxDd = 0, equity = 0;
    const sorted = [...ft].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    sorted.forEach(t => { equity += t.netPnl; if (equity > peak) peak = equity; dd = peak - equity; if (dd > maxDd) maxDd = dd; });

    const dailyPnl = {};
    ft.forEach(t => { dailyPnl[t.date] = (dailyPnl[t.date] || 0) + t.netPnl; });
    const dailyVals = Object.values(dailyPnl);
    const meanDaily = dailyVals.reduce((s, v) => s + v, 0) / (dailyVals.length || 1);
    const stdDaily = Math.sqrt(dailyVals.reduce((s, v) => s + (v - meanDaily) ** 2, 0) / (dailyVals.length || 1));
    const sharpe = stdDaily > 0 ? (meanDaily / stdDaily) * Math.sqrt(252) : 0;

    const expectancy = ft.length ? netPnl / ft.length : 0;
    const avgHold = ft.reduce((s, t) => s + t.holdTime, 0) / ft.length;

    let streak = 0;
    const recent = [...ft].sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
    if (recent.length) {
      const dir = recent[0].netPnl >= 0 ? 1 : -1;
      for (const t of recent) { if ((t.netPnl >= 0 ? 1 : -1) === dir) streak++; else break; }
      streak *= dir;
    }

    return {
      totalPnl, netPnl, fees, winRate: (winners.length / ft.length) * 100, profitFactor,
      avgWin, avgLoss, totalTrades: ft.length, winners: winners.length, losers: losers.length,
      maxDrawdown: maxDd, sharpe, expectancy, avgHold,
      bestTrade: Math.max(...ft.map(t => t.netPnl)),
      worstTrade: Math.min(...ft.map(t => t.netPnl)),
      streak,
    };
  }, [filteredTrades]);

  // ---- Equity curve data ----
  const equityCurve = useMemo(() => {
    const sorted = [...filteredTrades].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    let equity = 10000;
    const data = [{ date: "Start", equity: 10000 }];
    const daily = {};
    sorted.forEach(t => {
      if (!daily[t.date]) daily[t.date] = 0;
      daily[t.date] += t.netPnl;
    });
    Object.entries(daily).sort(([a], [b]) => a.localeCompare(b)).forEach(([date, pnl]) => {
      equity += pnl;
      data.push({ date: date.slice(5), equity: parseFloat(equity.toFixed(2)), pnl });
    });
    return data;
  }, [filteredTrades]);

  // ---- Daily P&L data ----
  const dailyPnlData = useMemo(() => {
    const daily = {};
    filteredTrades.forEach(t => {
      daily[t.date] = (daily[t.date] || 0) + t.netPnl;
    });
    return Object.entries(daily).sort(([a], [b]) => a.localeCompare(b)).map(([date, pnl]) => ({
      date: date.slice(5),
      pnl: parseFloat(pnl.toFixed(2))
    }));
  }, [filteredTrades]);

  // ---- Time of day data ----
  const timeData = useMemo(() => {
    const hours = {};
    for (let h = 9; h <= 17; h++) hours[h] = { hour: `${h}:00`, pnl: 0, trades: 0, wins: 0 };
    filteredTrades.forEach(t => {
      const h = parseInt(t.time.split(":")[0]);
      if (hours[h]) { hours[h].pnl += t.netPnl; hours[h].trades++; if (t.netPnl > 0) hours[h].wins++; }
    });
    return Object.values(hours).map(h => ({ ...h, pnl: parseFloat(h.pnl.toFixed(2)), winRate: h.trades ? ((h.wins / h.trades) * 100).toFixed(0) : 0 }));
  }, [filteredTrades]);

  // ---- Strategy performance ----
  const strategyData = useMemo(() => {
    const strats = {};
    filteredTrades.forEach(t => {
      if (!strats[t.strategy]) strats[t.strategy] = { name: t.strategy, pnl: 0, trades: 0, wins: 0 };
      strats[t.strategy].pnl += t.netPnl;
      strats[t.strategy].trades++;
      if (t.netPnl > 0) strats[t.strategy].wins++;
    });
    return Object.values(strats).map(s => ({
      ...s,
      winRate: s.trades ? ((s.wins / s.trades) * 100).toFixed(1) : 0,
      avgPnl: (s.pnl / s.trades).toFixed(2),
    })).sort((a, b) => b.pnl - a.pnl);
  }, [filteredTrades]);

  // ---- Emotion performance ----
  const emotionData = useMemo(() => {
    const emot = {};
    filteredTrades.forEach(t => {
      if (!emot[t.emotion]) emot[t.emotion] = { name: t.emotion, pnl: 0, trades: 0, wins: 0 };
      emot[t.emotion].pnl += t.netPnl;
      emot[t.emotion].trades++;
      if (t.netPnl > 0) emot[t.emotion].wins++;
    });
    return Object.values(emot).map(e => ({
      ...e,
      winRate: e.trades ? ((e.wins / e.trades) * 100).toFixed(1) : 0,
      avgPnl: (e.pnl / e.trades).toFixed(2),
    })).sort((a, b) => b.pnl - a.pnl);
  }, [filteredTrades]);

  // ---- Market Distribution ----
  const marketDist = useMemo(() => {
    const mkts = {};
    filteredTrades.forEach(t => {
      mkts[t.market] = (mkts[t.market] || 0) + 1;
    });
    return Object.entries(mkts).map(([name, value]) => ({ name, value }));
  }, [filteredTrades]);

  // ---- Day of Week Performance ----
  const dayOfWeekData = useMemo(() => {
    const days = { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };
    const dayData = {};
    for (let i = 0; i < 7; i++) dayData[i] = { day: days[i], pnl: 0, trades: 0 };
    filteredTrades.forEach(t => {
      const d = new Date(t.date).getDay();
      dayData[d].pnl += t.netPnl;
      dayData[d].trades++;
    });
    return Object.values(dayData);
  }, [filteredTrades]);

  // ---- Bot vs Manual ----
  const botVsManual = useMemo(() => {
    const bot = filteredTrades.filter(t => t.source === "Bot");
    const manual = filteredTrades.filter(t => t.source === "Manual");
    const calcStats = (trades) => {
      if (!trades.length) return { totalTrades: 0, netPnl: 0, winRate: 0, profitFactor: 1, sharpe: 0, avgPnl: 0, maxDd: 0 };
      const w = trades.filter(t => t.netPnl > 0).length;
      const gross = trades.filter(t => t.netPnl > 0).reduce((s, t) => s + t.netPnl, 0);
      const loss = Math.abs(trades.filter(t => t.netPnl <= 0).reduce((s, t) => s + t.netPnl, 0));
      const pnl = trades.reduce((s, t) => s + t.netPnl, 0);
      return {
        totalTrades: trades.length, netPnl: pnl, winRate: (w / trades.length * 100).toFixed(1),
        profitFactor: loss > 0 ? (gross / loss).toFixed(2) : 99, sharpe: 0.5, avgPnl: (pnl / trades.length).toFixed(2), maxDd: 0
      };
    };
    return { bot: calcStats(bot), manual: calcStats(manual) };
  }, [filteredTrades]);

  const PIE_COLORS = ["#00ff88", "#00e5ff", "#00cc6a", "#00ff88", "#ef4444"];

  // ---- Color scheme ----
  const bg = dark ? "#060612" : "#f8fafc";
  const cardBg = dark ? "rgba(8,14,28,0.7)" : "rgba(241,245,249,0.4)";
  const textPrimary = dark ? "#fafafa" : "#050505";
  const textSecondary = dark ? "#5a7a6a" : "#6b6b6b";
  const borderColor = dark ? "rgba(0,255,136,0.1)" : "#e2e8f0";
  const accentBlue = "#00ff88";

  const navItems = [
    { id: "calendar", label: "P&L Calendar", icon: Calendar },
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "liveprices", label: "Live Prices", icon: Activity },
    { id: "trades", label: "Trades", icon: TrendingUp },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "botvsmanual", label: "Bot vs Manual", icon: Bot },
    { id: "markets", label: "Markets", icon: Gem },
    { id: "simulator", label: "Simulator", icon: Crosshair },
    { id: "exness", label: "Exness Connect", icon: Wifi },
    { id: "xm", label: "XM Connect", icon: Wifi },
    { id: "tips", label: "Tips & Tricks", icon: Brain },
  ];

  // ---- Live Prices State ----
  const [livePrices, setLivePrices] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [pricesLoading, setPricesLoading] = useState(false);
  const [lastPriceUpdate, setLastPriceUpdate] = useState(null);

  // ---- AI Watchlist State ----
  const [watchlistData, setWatchlistData] = useState({});
  const [aiRefreshing, setAiRefreshing] = useState(false);

  // ---- INR/USD Converter + Balance Widget State ----
  const [converterInr, setConverterInr] = useState("");
  const [converterUsd, setConverterUsd] = useState("");
  const [converterActive, setConverterActive] = useState("inr");
  const [portfolioBalance, setPortfolioBalance] = useState(() => {
    try { return localStorage.getItem("portfolioBalance") || ""; } catch { return ""; }
  });

  const WATCHLIST = {
    crypto: [
      { symbol: "BTC/USDT", id: "bitcoin", display: "Bitcoin" },
      { symbol: "ETH/USDT", id: "ethereum", display: "Ethereum" },
      { symbol: "SOL/USDT", id: "solana", display: "Solana" },
      { symbol: "XRP/USDT", id: "ripple", display: "XRP" },
      { symbol: "BNB/USDT", id: "binancecoin", display: "BNB" },
    ],
    forex: [
      { symbol: "EUR/USD", from: "eur", display: "Euro / USD" },
      { symbol: "GBP/USD", from: "gbp", display: "Pound / USD" },
      { symbol: "USD/JPY", from: "jpy", display: "USD / Yen", invert: true },
      { symbol: "AUD/USD", from: "aud", display: "AUD / USD" },
      { symbol: "USD/INR", from: "inr", display: "USD / INR", invert: true },
    ],
  };

  const fetchLivePrices = useCallback(async () => {
    setPricesLoading(true);
    try {
      // Crypto from CoinGecko
      const cryptoIds = WATCHLIST.crypto.map(c => c.id).join(",");
      const cryptoResp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`);
      const cryptoData = await cryptoResp.json();

      // Forex from Frankfurter
      const forexResp = await fetch(`https://api.frankfurter.dev/v1/latest?base=USD`);
      const forexData = await forexResp.json();

      const prices = {};
      WATCHLIST.crypto.forEach(c => {
        const d = cryptoData[c.id];
        if (d) {
          prices[c.symbol] = {
            price: d.usd,
            change24h: d.usd_24h_change || 0,
            volume: d.usd_24h_vol || 0,
            marketCap: d.usd_market_cap || 0,
            type: "crypto",
          };
        }
      });
      WATCHLIST.forex.forEach(f => {
        if (forexData.rates && forexData.rates[f.from.toUpperCase()]) {
          const rate = forexData.rates[f.from.toUpperCase()];
          prices[f.symbol] = {
            price: f.invert ? rate : parseFloat((1 / rate).toFixed(5)),
            change24h: 0,
            type: "forex",
          };
        }
      });

      setLivePrices(prices);
      setLastPriceUpdate(new Date());
    } catch (e) { console.error("Price fetch error:", e); }
    setPricesLoading(false);
  }, []);

  const fetchPriceHistory = useCallback(async () => {
    try {
      const history = {};
      // Crypto 7-day history from CoinGecko
      for (const c of WATCHLIST.crypto) {
        try {
          const resp = await fetch(`https://api.coingecko.com/api/v3/coins/${c.id}/market_chart?vs_currency=usd&days=7`);
          const data = await resp.json();
          if (data.prices) {
            history[c.symbol] = data.prices.filter((_, i) => i % 4 === 0).map(([ts, price]) => ({
              time: new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              price: parseFloat(price.toFixed(2)),
            }));
          }
          await new Promise(r => setTimeout(r, 250)); // rate limit
        } catch (e) { /* skip */ }
      }
      // Forex history from Frankfurter
      const end = new Date().toISOString().split("T")[0];
      const start = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
      for (const f of WATCHLIST.forex) {
        try {
          const resp = await fetch(`https://api.frankfurter.dev/v1/${start}..${end}?base=USD&symbols=${f.from.toUpperCase()}`);
          const data = await resp.json();
          if (data.rates) {
            history[f.symbol] = Object.entries(data.rates).map(([date, rates]) => ({
              time: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              price: f.invert ? rates[f.from.toUpperCase()] : parseFloat((1 / rates[f.from.toUpperCase()]).toFixed(5)),
            }));
          }
        } catch (e) { /* skip */ }
      }
      setPriceHistory(history);
    } catch (e) { console.error("History fetch error:", e); }
  }, []);

  // ---- AI Watchlist Fetch ----
  const fetchWatchlist = useCallback(async () => {
    setAiRefreshing(true);
    try {
      // BTC + ETH from CoinGecko markets endpoint (includes 7d change)
      const cgResp = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=2&page=1&sparkline=true&price_change_percentage=24h,7d'
      );
      const cgData = await cgResp.json();
      const btc = cgData.find(c => c.id === 'bitcoin') || {};
      const eth = cgData.find(c => c.id === 'ethereum') || {};

      // Gold + Silver from metals.live (free, no key)
      let goldPrice = null, silverPrice = null;
      let goldChange24h = 0, silverChange24h = 0;
      try {
        const metalsResp = await fetch('https://api.metals.live/v1/spot');
        const metalsArr = await metalsResp.json();
        metalsArr.forEach(item => {
          if (item.gold !== undefined) goldPrice = parseFloat(item.gold);
          if (item.silver !== undefined) silverPrice = parseFloat(item.silver);
        });
      } catch (_) { /* metals API unavailable — prices stay null */ }

      setWatchlistData({
        BTCUSD: {
          label: "Bitcoin", emoji: "₿",
          price: btc.current_price || null,
          change24h: btc.price_change_percentage_24h || 0,
          change7d: btc.price_change_percentage_7d_in_currency || 0,
          volume: btc.total_volume || 0,
          sparkline: btc.sparkline_in_7d?.price || [],
          marketCap: btc.market_cap || 0,
          category: "Crypto",
        },
        ETHUSD: {
          label: "Ethereum", emoji: "Ξ",
          price: eth.current_price || null,
          change24h: eth.price_change_percentage_24h || 0,
          change7d: eth.price_change_percentage_7d_in_currency || 0,
          volume: eth.total_volume || 0,
          sparkline: eth.sparkline_in_7d?.price || [],
          marketCap: eth.market_cap || 0,
          category: "Crypto",
        },
        XAUUSD: {
          label: "Gold", emoji: "🥇",
          price: goldPrice,
          change24h: goldChange24h,
          change7d: 0,
          volume: 0,
          sparkline: [],
          category: "Commodity",
        },
        XAGUSD: {
          label: "Silver", emoji: "🥈",
          price: silverPrice,
          change24h: silverChange24h,
          change7d: 0,
          volume: 0,
          sparkline: [],
          category: "Commodity",
        },
      });
    } catch (e) { console.error('Watchlist fetch error:', e); }
    setAiRefreshing(false);
  }, []);

  // Auto-fetch prices on mount and every 60s
  useEffect(() => {
    if (!user) return;
    fetchLivePrices();
    fetchPriceHistory();
    fetchWatchlist();
    const interval = setInterval(fetchLivePrices, 60000);
    const wInterval = setInterval(fetchWatchlist, 5 * 60000); // refresh watchlist every 5 min
    return () => { clearInterval(interval); clearInterval(wInterval); };
  }, [user, fetchLivePrices, fetchPriceHistory, fetchWatchlist]);

  // ---- Filter Bar ----
  const FilterBar = () => {
    const btnStyle = (active) => ({
      padding: "8px 16px", borderRadius: 20, border: `1px solid ${active ? accentBlue : "rgba(100,100,100,0.2)"}`,
      background: active ? (dark ? "rgba(0,255,136,0.15)" : "rgba(0,255,136,0.08)") : "transparent",
      color: active ? accentBlue : textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
      transition: "all 0.2s",
    });
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 20, overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 8 : 0 }}>
        <Filter size={14} color={textSecondary} />
        {["All", "Stocks", "Crypto", "Forex", "Options"].map(m => (
          <button key={m} onClick={() => setFilterMarket(m)} style={btnStyle(filterMarket === m)}>{m}</button>
        ))}
        <span style={{ width: 1, height: 20, background: borderColor, display: isMobile ? "none" : "block" }} />
        {["All", "Manual", "Bot"].map(s => (
          <button key={s} onClick={() => setFilterSource(s)} style={btnStyle(filterSource === s)}>{s === "Bot" ? "🤖 Bot" : s === "Manual" ? "✋ Manual" : s}</button>
        ))}
        <span style={{ width: 1, height: 20, background: borderColor, display: isMobile ? "none" : "block" }} />
        {["7d", "30d", "90d"].map(p => (
          <button key={p} onClick={() => setFilterPeriod(p)} style={btnStyle(filterPeriod === p)}>{p}</button>
        ))}
      </div>
    );
  };

  // ---- Add Trade handler ----
  const addTrade = (trade) => {
    setTrades(p => [trade, ...p]);
  };

  // ---- Update Trade Notes ----
  const updateTradeNotes = (tradeId, notes) => {
    setTrades(p => p.map(t => t.id === tradeId ? { ...t, notes } : t));
  };

  // ---- Delete Trade handler ----
  const deleteTrade = useCallback((tradeId) => {
    if (window.confirm("Are you sure you want to delete this trade? This cannot be undone.")) {
      setTrades(p => p.filter(t => t.id !== tradeId));
    }
  }, []);

  // ============================================================
  // PAGE: DASHBOARD
  // ============================================================
  const DashboardPage = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayPnl = filteredTrades.filter(t => t.date === today).reduce((s, t) => s + t.netPnl, 0);
    const recentDayPnl = [...filteredTrades].sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)).slice(0, 1);
    const bestDay = dailyPnlData.length > 0 ? Math.max(...dailyPnlData.map(d => d.pnl)) : 0;

    return (
      <div>
        {/* Welcome Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 800, color: textPrimary }}>
            Welcome back, {user?.displayName?.split(" ")[0] || "Trader"}
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: textSecondary }}>
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Quick Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          <div style={{
            background: "rgba(20,20,20,0.6)", backdropFilter: "blur(12px)",
            borderRadius: 12, padding: 16, border: "1px solid rgba(100,100,100,0.1)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 6 }}>Total Trades</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#00ff88" }}>{metrics.totalTrades}</div>
          </div>
          <div style={{
            background: "rgba(20,20,20,0.6)", backdropFilter: "blur(12px)",
            borderRadius: 12, padding: 16, border: "1px solid rgba(100,100,100,0.1)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 6 }}>Active Streak</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: metrics.streak > 0 ? "#4ade80" : "#f87171" }}>
              {Math.abs(metrics.streak)} {metrics.streak > 0 ? "W" : "L"}
            </div>
          </div>
          <div style={{
            background: "rgba(20,20,20,0.6)", backdropFilter: "blur(12px)",
            borderRadius: 12, padding: 16, border: "1px solid rgba(100,100,100,0.1)",
            textAlign: "center",
            gridColumn: isMobile ? "1 / -1" : "auto",
          }}>
            <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 6 }}>Best Day</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: bestDay > 0 ? "#4ade80" : textPrimary }}>
              {formatCurrency(bestDay)}
            </div>
          </div>
        </div>

        <FilterBar />

        {/* Metric Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 16,
          marginBottom: 24
        }}>
          <MetricCard dark={dark} icon={IndianRupee} label="Net P&L" value={formatCurrency(metrics.netPnl)} subValue={`Gross: ${formatCurrency(metrics.totalPnl)} | Fees: ${formatCurrency(metrics.fees)}`} trend={metrics.netPnl > 0 ? 12.5 : -8.3} accent={metrics.netPnl >= 0 ? "#16a34a" : "#dc2626"} />
          <MetricCard dark={dark} icon={Target} label="Win Rate" value={`${metrics.winRate.toFixed(1)}%`} subValue={`${metrics.winners}W / ${metrics.losers}L of ${metrics.totalTrades}`} accent="#00ff88" />
          <MetricCard dark={dark} icon={Zap} label="Profit Factor" value={metrics.profitFactor.toFixed(2)} subValue={`Avg Win: ${formatCurrency(metrics.avgWin)} | Avg Loss: ${formatCurrency(metrics.avgLoss)}`} accent="#f59e0b" />
          <MetricCard dark={dark} icon={AlertTriangle} label="Max Drawdown" value={formatCurrency(metrics.maxDrawdown)} subValue={`Sharpe: ${metrics.sharpe.toFixed(2)} | Expectancy: ${formatCurrency(metrics.expectancy)}`} accent="#ef4444" />
        </div>

        {/* Equity Curve */}
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Equity Curve</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={equityCurve}>
              <defs>
                <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentBlue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accentBlue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1a1a1a" : "#fafafa"} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: textSecondary }} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} />
              <Area type="monotone" dataKey="equity" stroke={accentBlue} fill="url(#eqGrad)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily P&L Chart */}
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Daily P&L</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailyPnlData}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1a1a1a" : "#fafafa"} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: textSecondary }} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} formatter={(v) => [formatCurrency(v), "P&L"]} />
              <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                {dailyPnlData.map((entry, i) => <Cell key={i} fill={entry.pnl >= 0 ? "#16a34a" : "#dc2626"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Live Watchlist Widget */}
        {Object.keys(livePrices).length > 0 && (
          <div style={{ background: cardBg, borderRadius: 16, padding: isMobile ? 14 : 20, border: `1px solid rgba(100,100,100,0.1)`, marginBottom: 24, backdropFilter: "blur(12px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: textPrimary }}>Live Watchlist</h3>
              <button onClick={() => setPage("liveprices")} style={{
                background: "none", border: "none", cursor: "pointer", color: accentBlue,
                fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4,
              }}>View All <ArrowUpRight size={12} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {[...WATCHLIST.crypto.slice(0, 3), ...WATCHLIST.forex.slice(0, 2)].map(item => {
                const symbol = item.symbol;
                const pd = livePrices[symbol];
                if (!pd) return null;
                const isUp = (pd.change24h || 0) >= 0;
                const priceStr = pd.type === "forex" ? pd.price.toFixed(4) : pd.price >= 1000 ? `$${pd.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : `$${pd.price.toFixed(2)}`;
                return (
                  <div key={symbol} onClick={() => setPage("liveprices")} style={{
                    padding: "10px 12px", borderRadius: 10, background: "rgba(10,10,10,0.4)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: textSecondary, marginBottom: 2 }}>{symbol}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>{priceStr}</div>
                    {pd.type === "crypto" && pd.change24h !== 0 && (
                      <div style={{ fontSize: 10, fontWeight: 700, color: isUp ? "#4ade80" : "#f87171", marginTop: 2 }}>
                        {isUp ? "▲" : "▼"} {Math.abs(pd.change24h).toFixed(1)}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
          {/* Market Distribution */}
          <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Market Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={marketDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4}>
                  {marketDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} formatter={(v, name) => [`${v} trades`, name]} />
                <Legend wrapperStyle={{ fontSize: 12, color: textSecondary }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Trades */}
          <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Recent Trades</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredTrades.slice(0, 7).map(t => (
                <div key={t.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px",
                  borderRadius: 10, background: "rgba(10,10,10,0.4)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <MarketIcon market={t.market} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{t.symbol}</div>
                      <div style={{ fontSize: 11, color: textSecondary }}>{t.date} {t.source === "Bot" ? "🤖" : ""}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: pnlColor(t.netPnl, dark) }}>{formatCurrency(t.netPnl)}</div>
                    <div style={{ fontSize: 11, color: textSecondary }}>{t.side}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: TRADES
  // ============================================================
  const TradesPage = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <FilterBar />
        <button onClick={() => setShowAddTrade(true)} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer",
        }}><Plus size={16} /> Add Trade</button>
      </div>
      <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(100,100,100,0.1)`, overflow: "hidden", backdropFilter: "blur(12px)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(10,10,10,0.5)" }}>
                {["Date", "Symbol", "Market", "Side", "Source", "Entry", "Exit", "P&L", "Net P&L", "Strategy", "Emotion", "Rating", ""].map(h => (
                  <th key={h || "actions"} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: textSecondary, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTrades.slice(0, 50).map((t, i) => (
                <tr key={t.id} style={{ borderTop: `1px solid rgba(100,100,100,0.1)`, background: i % 2 === 0 ? "transparent" : "rgba(10,10,10,0.3)" }}>
                  <td style={{ padding: "10px 14px", color: textPrimary, whiteSpace: "nowrap" }}>{t.date}<br /><span style={{ fontSize: 11, color: textSecondary }}>{t.time}</span></td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: textPrimary }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><MarketIcon market={t.market} size={14} /> {t.symbol}</div></td>
                  <td style={{ padding: "10px 14px", color: textSecondary }}>{t.market}</td>
                  <td style={{ padding: "10px 14px" }}><span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: t.side === "Long" ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)", color: t.side === "Long" ? "#16a34a" : "#dc2626" }}>{t.side}</span></td>
                  <td style={{ padding: "10px 14px", color: textSecondary }}>{t.source === "Bot" ? "🤖" : "✋"} {t.source}</td>
                  <td style={{ padding: "10px 14px", color: textSecondary, fontFamily: "monospace" }}>{t.entryPrice}</td>
                  <td style={{ padding: "10px 14px", color: textSecondary, fontFamily: "monospace" }}>{t.exitPrice}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: pnlColor(t.pnl, dark), fontFamily: "monospace" }}>{formatCurrency(t.pnl)}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, fontFamily: "monospace" }}><span style={{ padding: "2px 8px", borderRadius: 6, background: pnlBg(t.netPnl, dark), color: pnlColor(t.netPnl, dark) }}>{formatCurrency(t.netPnl)}</span></td>
                  <td style={{ padding: "10px 14px", color: textSecondary }}>{t.strategy}</td>
                  <td style={{ padding: "10px 14px" }}><EmotionBadge emotion={t.emotion} dark={dark} /></td>
                  <td style={{ padding: "10px 14px" }}><StarRating value={t.rating} size={12} /></td>
                  <td style={{ padding: "10px 14px" }}>
                    <button onClick={() => deleteTrade(t.id)} title="Delete trade" style={{
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8,
                      cursor: "pointer", padding: "4px 8px", color: "#ef4444", fontSize: 12, fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s",
                    }}><X size={12} /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTrades.length > 50 && <div style={{ padding: 16, textAlign: "center", color: textSecondary, fontSize: 13 }}>Showing 50 of {filteredTrades.length} trades</div>}
      </div>
    </div>
  );

  // ============================================================
  // PAGE: JOURNAL
  // ============================================================
  const JournalPage = () => {
    const journalTrades = filteredTrades.slice(0, 30);
    const selectedTrade = journalTradeId ? trades.find(t => t.id === journalTradeId) : journalTrades[0];

    return (
      <div>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary }}>Trade Journal</h2>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: textSecondary }}>Review your trades, add notes, and track your emotional patterns to improve discipline.</p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "340px 1fr", gap: 20, minHeight: 500 }}>
          <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(100,100,100,0.1)`, overflow: "hidden", backdropFilter: "blur(12px)" }}>
            <div style={{ padding: "16px", borderBottom: `1px solid rgba(100,100,100,0.1)` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>Recent Trades</div>
            </div>
            <div style={{ overflowY: "auto", maxHeight: 500 }}>
              {journalTrades.map(t => (
                <div key={t.id} onClick={() => setJournalTradeId(t.id)} style={{
                  padding: "14px 16px", cursor: "pointer", borderBottom: `1px solid rgba(100,100,100,0.1)`,
                  background: selectedTrade?.id === t.id ? "rgba(0,255,136,0.1)" : "transparent",
                  borderLeft: selectedTrade?.id === t.id ? `3px solid ${accentBlue}` : "3px solid transparent",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MarketIcon market={t.market} size={14} />
                      <span style={{ fontWeight: 700, fontSize: 13, color: textPrimary }}>{t.symbol}</span>
                      {t.source === "Bot" && <span style={{ fontSize: 10 }}>🤖</span>}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: pnlColor(t.netPnl, dark) }}>{formatCurrency(t.netPnl)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: textSecondary }}>{t.date} | {t.strategy}</span>
                    <EmotionBadge emotion={t.emotion} dark={dark} />
                  </div>
                  {t.notes && <div style={{ fontSize: 11, color: textSecondary, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>📝 {t.notes}</div>}
                </div>
              ))}
            </div>
          </div>

          {selectedTrade && (
            <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(100,100,100,0.1)`, padding: 24, backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <MarketIcon market={selectedTrade.market} size={20} />
                    <span style={{ fontSize: 22, fontWeight: 800, color: textPrimary }}>{selectedTrade.symbol}</span>
                    <span style={{ padding: "3px 10px", borderRadius: 8, fontSize: 12, fontWeight: 700, background: selectedTrade.side === "Long" ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)", color: selectedTrade.side === "Long" ? "#16a34a" : "#dc2626" }}>{selectedTrade.side}</span>
                    <span style={{ padding: "3px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "rgba(100,100,100,0.1)", color: textSecondary }}>{selectedTrade.source === "Bot" ? "🤖 Bot" : "✋ Manual"}</span>
                  </div>
                  <div style={{ fontSize: 13, color: textSecondary }}>{selectedTrade.date} at {selectedTrade.time} | {selectedTrade.broker} | Hold: {selectedTrade.holdTime}min</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: pnlColor(selectedTrade.netPnl, dark) }}>{formatCurrency(selectedTrade.netPnl)}</div>
                  <div style={{ fontSize: 12, color: textSecondary }}>Fees: {formatCurrency(selectedTrade.fees)}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 24 }}>
                {[
                  { label: "Entry", value: selectedTrade.entryPrice },
                  { label: "Exit", value: selectedTrade.exitPrice },
                  { label: "Quantity", value: selectedTrade.quantity },
                  { label: "Strategy", value: selectedTrade.strategy },
                ].map(({ label, value }) => (
                  <div key={label} style={{ padding: 14, borderRadius: 12, background: "rgba(10,10,10,0.4)" }}>
                    <div style={{ fontSize: 11, color: textSecondary, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginBottom: 8 }}>Emotional State</div>
                  <EmotionBadge emotion={selectedTrade.emotion} dark={dark} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginBottom: 8 }}>Trade Quality</div>
                  <StarRating value={selectedTrade.rating} size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginBottom: 8 }}>Discipline Score</div>
                  <StarRating value={selectedTrade.discipline} size={18} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginBottom: 8 }}>Trade Notes</div>
                <textarea
                  value={selectedTrade.notes || ""}
                  onChange={e => updateTradeNotes(selectedTrade.id, e.target.value)}
                  placeholder="What was your thesis? Did you follow your plan? What would you do differently? What did you learn from this trade?"
                  rows={5}
                  style={{
                    width: "100%", padding: 14, borderRadius: 12, fontSize: 14, border: `1px solid rgba(100,100,100,0.1)`,
                    background: "rgba(10,10,10,0.4)", color: textPrimary, resize: "vertical",
                    fontFamily: "inherit", outline: "none", boxSizing: "border-box", lineHeight: 1.6,
                  }}
                />
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid rgba(100,100,100,0.1)` }}>
                <button onClick={() => { deleteTrade(selectedTrade.id); setJournalTradeId(null); }} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10,
                  border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)",
                  color: "#ef4444", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
                }}>
                  <X size={14} /> Delete This Trade
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: ANALYTICS
  // ============================================================
  const AnalyticsPage = () => (
    <div>
      <FilterBar />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 24 }}>
        <MetricCard dark={dark} icon={Target} label="Win Rate" value={`${metrics.winRate.toFixed(1)}%`} subValue={`${metrics.winners}W / ${metrics.losers}L`} accent="#00ff88" />
        <MetricCard dark={dark} icon={Zap} label="Profit Factor" value={metrics.profitFactor.toFixed(2)} accent="#00e5ff" />
        <MetricCard dark={dark} icon={Activity} label="Sharpe Ratio" value={metrics.sharpe.toFixed(2)} accent="#00cc6a" />
        <MetricCard dark={dark} icon={AlertTriangle} label="Max Drawdown" value={formatCurrency(metrics.maxDrawdown)} accent="#ef4444" />
        <MetricCard dark={dark} icon={Clock} label="Avg Hold Time" value={`${Math.round(metrics.avgHold)}m`} accent="#00ff88" />
        <MetricCard dark={dark} icon={Award} label="Best Trade" value={formatCurrency(metrics.bestTrade)} accent="#4ade80" />
        <MetricCard dark={dark} icon={TrendingDown} label="Worst Trade" value={formatCurrency(metrics.worstTrade)} accent="#f87171" />
        <MetricCard dark={dark} icon={TrendingUp} label="Streak" value={`${metrics.streak > 0 ? "+" : ""}${metrics.streak}`} subValue={metrics.streak > 0 ? "Winning" : metrics.streak < 0 ? "Losing" : "Even"} accent={metrics.streak > 0 ? "#4ade80" : "#f87171"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(380px, 1fr))", gap: 20, marginBottom: 24 }}>
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Performance by Hour</h3>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: textSecondary }}>Find your golden trading hours</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1a1a1a" : "#fafafa"} />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: textSecondary }} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} formatter={(v, name) => [name === "pnl" ? formatCurrency(v) : v, name === "pnl" ? "P&L" : name]} />
              <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                {timeData.map((entry, i) => <Cell key={i} fill={entry.pnl >= 0 ? "#16a34a" : "#dc2626"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Performance by Day</h3>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: textSecondary }}>Which days work best for you?</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1a1a1a" : "#fafafa"} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: textSecondary }} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} formatter={(v) => [formatCurrency(v), "P&L"]} />
              <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                {dayOfWeekData.map((entry, i) => <Cell key={i} fill={entry.pnl >= 0 ? "#16a34a" : "#dc2626"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(380px, 1fr))", gap: 20 }}>
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Strategy Performance</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {strategyData.map(s => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, background: "rgba(10,10,10,0.4)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: textSecondary }}>{s.trades} trades | WR: {s.winRate}% | Avg: {formatCurrency(s.avgPnl)}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: pnlColor(s.pnl, dark) }}>{formatCurrency(s.pnl)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Emotion Impact on P&L</h3>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: textSecondary }}>How your mental state affects trading outcomes</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {emotionData.map(e => (
              <div key={e.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, background: "rgba(10,10,10,0.4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <EmotionBadge emotion={e.name} dark={dark} />
                  <span style={{ fontSize: 12, color: textSecondary }}>{e.trades} trades | WR: {e.winRate}%</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: pnlColor(e.pnl, dark) }}>{formatCurrency(e.pnl)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================================
  // PAGE: BOT VS MANUAL
  // ============================================================
  const BotVsManualPage = () => {
    const CompareRow = ({ label, botVal, manualVal, format = "currency", highlight = false }) => {
      const fmt = (v) => format === "currency" ? formatCurrency(v) : format === "percent" ? `${v}%` : format === "number" ? v : v;
      const botWins = format === "currency" ? botVal > manualVal : format === "percent" ? botVal > manualVal : botVal > manualVal;
      return (
        <tr style={{ borderTop: `1px solid rgba(100,100,100,0.1)` }}>
          <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: highlight ? 700 : 500, color: textPrimary }}>{label}</td>
          <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: highlight ? pnlColor(botVal, dark) : textPrimary, textAlign: "center", background: botWins && highlight ? pnlBg(1, dark) : "transparent" }}>
            {fmt(botVal)} {botWins && highlight ? " ✓" : ""}
          </td>
          <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: highlight ? pnlColor(manualVal, dark) : textPrimary, textAlign: "center", background: !botWins && highlight ? pnlBg(1, dark) : "transparent" }}>
            {fmt(manualVal)} {!botWins && highlight ? " ✓" : ""}
          </td>
        </tr>
      );
    };

    const radarData = [
      { metric: "Win Rate", bot: botVsManual.bot.winRate, manual: botVsManual.manual.winRate },
      { metric: "Profit Factor", bot: Math.min(botVsManual.bot.profitFactor * 20, 100), manual: Math.min(botVsManual.manual.profitFactor * 20, 100) },
      { metric: "Sharpe", bot: Math.max(0, (botVsManual.bot.sharpe + 2) * 20), manual: Math.max(0, (botVsManual.manual.sharpe + 2) * 20) },
      { metric: "Avg P&L", bot: Math.max(0, (botVsManual.bot.avgPnl + 100) / 2), manual: Math.max(0, (botVsManual.manual.avgPnl + 100) / 2) },
      { metric: "Consistency", bot: botVsManual.bot.maxDd > 0 ? Math.max(0, 100 - botVsManual.bot.maxDd / 10) : 80, manual: botVsManual.manual.maxDd > 0 ? Math.max(0, 100 - botVsManual.manual.maxDd / 10) : 80 },
    ];

    return (
      <div>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary }}>Bot vs Manual Performance</h2>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: textSecondary }}>Compare your automated bot trades against manual entries to optimize your strategy mix.</p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20, marginBottom: 24 }}>
          <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Comparison</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "rgba(10,10,10,0.4)" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: textSecondary }}>Metric</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: textSecondary }}>🤖 Bot</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: textSecondary }}>✋ Manual</th>
                  </tr>
                </thead>
                <tbody>
                  <CompareRow label="Total Trades" botVal={botVsManual.bot.totalTrades} manualVal={botVsManual.manual.totalTrades} format="number" />
                  <CompareRow label="Net P&L" botVal={botVsManual.bot.netPnl} manualVal={botVsManual.manual.netPnl} format="currency" highlight={true} />
                  <CompareRow label="Win Rate" botVal={botVsManual.bot.winRate} manualVal={botVsManual.manual.winRate} format="percent" highlight={true} />
                  <CompareRow label="Profit Factor" botVal={botVsManual.bot.profitFactor} manualVal={botVsManual.manual.profitFactor} format="number" highlight={true} />
                  <CompareRow label="Avg P&L per Trade" botVal={botVsManual.bot.avgPnl} manualVal={botVsManual.manual.avgPnl} format="currency" />
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Radar Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={dark ? "#1a1a1a" : "#fafafa"} />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: textSecondary }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11, fill: textSecondary }} />
                <Radar name="Bot" dataKey="bot" stroke="#00ff88" fill="#00ff88" fillOpacity={0.25} />
                <Radar name="Manual" dataKey="manual" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                <Legend />
                <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: CALENDAR
  // ============================================================
  // ============================================================
  // MARKET SESSION TIMERS
  // ============================================================
  const MarketSessionTimers = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
      const timer = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    // All times in UTC hours
    const sessions = [
      { name: "Asian Session",   emoji: "🌏", city: "Tokyo",    openUTC: 0,           closeUTC: 9,           color: "#00cc6a" },
      { name: "Indian Session",  emoji: "🇮🇳", city: "NSE/BSE", openUTC: 3,           closeUTC: 10,          color: "#f97316", openMin: 3*60+45, closeMin: 10*60 },
      { name: "Europe Session",  emoji: "🌍", city: "London",   openUTC: 7,           closeUTC: 16,          color: "#00ff88" },
      { name: "New York Session",emoji: "🌎", city: "New York", openUTC: 13,          closeUTC: 22,          color: "#00e5ff" },
    ];

    const utcH = now.getUTCHours();
    const utcM = now.getUTCMinutes();
    const utcS = now.getUTCSeconds();
    const utcDay = now.getUTCDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
    const nowMinutes = utcH * 60 + utcM;

    // Forex/major markets are closed on weekends:
    // Closes Friday 21:00 UTC, reopens Sunday 22:00 UTC
    const isWeekendClose =
      utcDay === 6 || // all day Saturday
      (utcDay === 0 && nowMinutes < 22 * 60) || // Sunday before 22:00 UTC
      (utcDay === 5 && nowMinutes >= 21 * 60);   // Friday after 21:00 UTC

    // Minutes until Sunday 22:00 UTC market open
    const minsToWeekendOpen = () => {
      const totalNowMins = utcDay * 24 * 60 + nowMinutes;
      const openMins = 0 * 24 * 60 + 22 * 60; // Sunday 22:00
      let diff = openMins - totalNowMins;
      if (diff <= 0) diff += 7 * 24 * 60; // wrap to next Sunday
      return diff;
    };

    const formatCountdown = (totalSeconds) => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // Weekend banner
    const weekendBannerEl = isWeekendClose ? (
      <div style={{
        background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: 12, padding: "12px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔴</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>Markets Closed — Weekend</span>
        </div>
        <div style={{ fontSize: 12, color: textSecondary }}>
          Opens in <span style={{ color: "#00ff88", fontWeight: 700, fontFamily: "monospace" }}>
            {formatCountdown(minsToWeekendOpen() * 60 - utcS)}
          </span>
        </div>
      </div>
    ) : null;

    return (
      <div style={{ marginTop: 20 }}>
        {weekendBannerEl}
        {/* 2×2 grid on mobile, 4-col on desktop — NO horizontal scroll so vertical scroll never gets trapped */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: isMobile ? 8 : 12,
        }}>
        {sessions.map(sess => {
          const openMin  = sess.openMin  !== undefined ? sess.openMin  : sess.openUTC  * 60;
          const closeMin = sess.closeMin !== undefined ? sess.closeMin : sess.closeUTC * 60;
          const isLive = !isWeekendClose && nowMinutes >= openMin && nowMinutes < closeMin;

          let countdownSec;
          if (isWeekendClose) {
            countdownSec = minsToWeekendOpen() * 60 - utcS;
          } else if (isLive) {
            countdownSec = (closeMin - nowMinutes) * 60 - utcS;
          } else {
            let minsUntilOpen = openMin - nowMinutes;
            if (minsUntilOpen <= 0) minsUntilOpen += 24 * 60;
            countdownSec = minsUntilOpen * 60 - utcS;
          }
          if (countdownSec < 0) countdownSec += 24 * 3600;

          const sessionDuration = closeMin - openMin;
          const elapsed = isLive ? nowMinutes - openMin : 0;
          const progress = isLive ? Math.min((elapsed / sessionDuration) * 100, 100) : 0;

          const statusLabel = isWeekendClose ? "WEEKEND" : isLive ? "● LIVE" : "CLOSED";
          const statusBg    = isWeekendClose ? "rgba(239,68,68,0.1)"  : isLive ? sess.color + "20" : "rgba(100,100,100,0.1)";
          const statusColor = isWeekendClose ? "#ef4444"              : isLive ? sess.color        : textSecondary;
          const statusBorder= isWeekendClose ? "rgba(239,68,68,0.3)"  : isLive ? sess.color + "40" : "transparent";

          const IST_OFFSET = 330;
          const fmtIST = (utcMins) => {
            const ist = (utcMins + IST_OFFSET) % (24 * 60);
            const h = Math.floor(ist / 60);
            const m = ist % 60;
            const ampm = h >= 12 ? "PM" : "AM";
            const h12 = h % 12 || 12;
            return `${h12}:${String(m).padStart(2,'0')} ${ampm} IST`;
          };
          const fmtUTC = (mins) => `${String(Math.floor(mins/60)).padStart(2,'0')}:${String(mins%60).padStart(2,'0')}`;

          const opensAtIST  = fmtIST(openMin);
          const closesAtIST = fmtIST(closeMin);

          let countdownLabel, clockLabel;
          if (isLive) {
            countdownLabel = "Closes in";
            clockLabel = `Closes at ${closesAtIST}`;
          } else if (isWeekendClose) {
            countdownLabel = "Opens at";
            clockLabel = opensAtIST;
          } else {
            countdownLabel = "Opens in";
            clockLabel = `Opens at ${opensAtIST}`;
          }

          return (
            <div key={sess.name} style={{
              background: cardBg,
              borderRadius: isMobile ? 12 : 14,
              padding: isMobile ? "10px 10px" : 16,
              border: `1px solid ${isLive ? sess.color + "40" : "rgba(100,100,100,0.1)"}`,
              backdropFilter: "blur(12px)",
              boxShadow: isLive ? `0 0 20px ${sess.color}15` : "none",
              transition: "all 0.3s",
            }}>
              {/* Header row: emoji + name + status badge */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: isMobile ? 6 : 10, gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 5 : 8, minWidth: 0 }}>
                  <span style={{ fontSize: isMobile ? 16 : 20, flexShrink: 0 }}>{sess.emoji}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sess.name.replace(" Session", "")}</div>
                    <div style={{ fontSize: isMobile ? 9 : 10, color: textSecondary }}>{sess.city}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: isMobile ? 8 : 10, fontWeight: 700,
                  padding: isMobile ? "2px 6px" : "3px 10px",
                  borderRadius: 20, flexShrink: 0,
                  background: statusBg, color: statusColor, border: `1px solid ${statusBorder}`,
                }}>
                  {statusLabel}
                </div>
              </div>

              {/* Clock time */}
              <div style={{ textAlign: "center", marginBottom: isMobile ? 4 : 6 }}>
                <div style={{
                  fontSize: isMobile ? 11 : 15, fontWeight: 800,
                  color: isLive ? sess.color : isWeekendClose ? sess.color : textPrimary,
                  letterSpacing: 0.3,
                }}>{clockLabel}</div>
              </div>

              {/* Countdown */}
              <div style={{ textAlign: "center", margin: isMobile ? "2px 0 6px" : "4px 0 8px" }}>
                <div style={{ fontSize: isMobile ? 8 : 10, color: textSecondary, marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {isWeekendClose ? "Global open in" : countdownLabel}
                </div>
                <div style={{
                  fontSize: isMobile ? 16 : (isWeekendClose ? 20 : 24),
                  fontWeight: 800, letterSpacing: isMobile ? 1 : 2,
                  color: isLive ? sess.color : isWeekendClose ? "#ef4444" : textPrimary,
                  fontFamily: "'Courier New', monospace",
                }}>
                  {formatCountdown(countdownSec)}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 3, borderRadius: 2, background: "rgba(100,100,100,0.15)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  width: `${progress}%`,
                  background: isLive ? `linear-gradient(90deg, ${sess.color}, ${sess.color}cc)` : "transparent",
                  transition: "width 1s linear",
                }} />
              </div>
            </div>
          );
        })}
        </div>
      </div>
    );
  };

  const CalendarPage = () => {
    const [calMonth, setCalMonth] = useState(new Date());
    const [calFilterResult, setCalFilterResult] = useState("All");
    const [calFilterMarket, setCalFilterMarket] = useState("All");
    const [calFilterSide, setCalFilterSide]     = useState("All");

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(calMonth);
    const firstDay = getFirstDayOfMonth(calMonth);

    const today = new Date();
    const isCurrentMonth = calMonth.getFullYear() === today.getFullYear() && calMonth.getMonth() === today.getMonth();

    const isFiltered = calFilterResult !== "All" || calFilterMarket !== "All" || calFilterSide !== "All";
    const clearFilters = () => { setCalFilterResult("All"); setCalFilterMarket("All"); setCalFilterSide("All"); };

    const getDayData = (day) => {
      const dateStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      let dayTrades = trades.filter(t => t.date === dateStr);
      if (calFilterMarket !== "All") dayTrades = dayTrades.filter(t => t.market === calFilterMarket);
      if (calFilterSide   !== "All") dayTrades = dayTrades.filter(t => t.side   === calFilterSide);
      const pnl = dayTrades.reduce((s, t) => s + t.netPnl, 0);
      const hasTrades = dayTrades.length > 0;
      // Result filter: hide day that doesn't match
      const passesResult =
        calFilterResult === "All"       ? true :
        calFilterResult === "Profit"    ? (hasTrades && pnl > 0) :
        calFilterResult === "Loss"      ? (hasTrades && pnl < 0) :
        calFilterResult === "Breakeven" ? (hasTrades && pnl === 0) : true;
      return { pnl, hasTrades: hasTrades && passesResult, tradeCount: dayTrades.length };
    };
    const allDayData = [...Array(daysInMonth)].map((_, i) => getDayData(i + 1));
    const maxAbsPnl = Math.max(...allDayData.filter(d => d.hasTrades).map(d => Math.abs(d.pnl)), 1);
    const pnlIntensity = (pnl) => { const ratio = Math.min(Math.abs(pnl) / maxAbsPnl, 1); return 0.08 + ratio * 0.42; };
    const pnlFontSize = (pnl, mobile) => { const base = mobile ? 8 : 10; const extra = mobile ? 4 : 5; const ratio = Math.min(Math.abs(pnl) / maxAbsPnl, 1); return base + Math.round(ratio * extra); };
    const profitableDays = allDayData.filter((d, i) => d.hasTrades && d.pnl > 0);
    const topProfitThreshold = profitableDays.length > 0 ? Math.max(...profitableDays.map(d => d.pnl)) * 0.8 : 0;

    // Filtered summary stats
    const filteredTradeDays = allDayData.filter(d => d.hasTrades);
    const filteredTotalPnl  = filteredTradeDays.reduce((s, d) => s + d.pnl, 0);
    const filteredTotalTrades = filteredTradeDays.reduce((s, d) => s + d.tradeCount, 0);

    // INR rate: reuse live prices already fetched by fetchLivePrices (USD/INR = INR per 1 USD)
    const inrRate = livePrices["USD/INR"]?.price || null;

    const handleConverterInr = (val) => {
      setConverterActive("inr");
      setConverterInr(val);
      const n = parseFloat(val.replace(/,/g, ""));
      if (!isNaN(n) && inrRate) setConverterUsd((n / inrRate).toFixed(2));
      else setConverterUsd("");
    };
    const handleConverterUsd = (val) => {
      setConverterActive("usd");
      setConverterUsd(val);
      const n = parseFloat(val.replace(/,/g, ""));
      if (!isNaN(n) && inrRate) setConverterInr((n * inrRate).toFixed(0));
      else setConverterInr("");
    };
    const saveBalance = (val) => {
      setPortfolioBalance(val);
      try { localStorage.setItem("portfolioBalance", val); } catch {}
    };
    // Auto-balance: use manual entry if set, otherwise fall back to portfolio net P&L
    const isManualBalance = portfolioBalance.trim() !== "";
    const autoBalance = metrics.netPnl; // live from all trades
    const balNum = isManualBalance
      ? (parseFloat(portfolioBalance.replace(/,/g, "")) || 0)
      : autoBalance;
    const balUsd = inrRate ? Math.round(Math.abs(balNum) / inrRate).toLocaleString() : "—";
    const balIsNeg = balNum < 0;

    return (
      <div>
        {/* Calendar Header: title */}
        <div style={{ marginBottom: isMobile ? 10 : 16 }}>
          <h2 style={{ margin: "0 0 2px", fontSize: isMobile ? 18 : 22, fontWeight: 800, color: textPrimary }}>P&L Calendar</h2>
          <p style={{ margin: 0, fontSize: 13, color: textSecondary }}>Track your daily performance at a glance.</p>
        </div>

        {/* INR/USD Widget — full-width compact strip on mobile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 6 : 10,
          marginBottom: isMobile ? 12 : 20,
          flexWrap: "nowrap",
          overflow: "hidden",
        }}>
          {/* Balance card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0,229,255,0.10), rgba(0,255,136,0.07))",
            border: `1px solid ${isManualBalance ? "rgba(245,158,11,0.3)" : "rgba(0,229,255,0.22)"}`,
            borderRadius: 10,
            padding: isMobile ? "6px 10px" : "8px 14px",
            flex: isMobile ? "0 0 auto" : undefined,
            minWidth: isMobile ? 0 : 120,
          }}>
            {/* Label row: "Balance" + auto/manual badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", letterSpacing: 1.2, textTransform: "uppercase" }}>Balance</span>
              {isManualBalance ? (
                <button onClick={() => { saveBalance(""); }} title="Reset to auto P&L" style={{
                  fontSize: 7, padding: "1px 4px", borderRadius: 3,
                  background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)",
                  color: "#f59e0b", cursor: "pointer", fontWeight: 700, lineHeight: 1.4,
                }}>MANUAL ✕</button>
              ) : (
                <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 3,
                  background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)",
                  color: "#00ff88", fontWeight: 700, lineHeight: 1.4,
                }}>AUTO</span>
              )}
            </div>
            <input
              value={isManualBalance ? portfolioBalance : (balNum !== 0 ? Math.abs(balNum).toLocaleString("en-IN") : "")}
              onChange={e => saveBalance(e.target.value)}
              placeholder={balNum === 0 ? "No trades yet" : ""}
              style={{
                background: "transparent", border: "none", outline: "none",
                color: balIsNeg ? "#f87171" : "#00ff88",
                fontSize: isMobile ? 12 : 15, fontWeight: 700,
                width: isMobile ? 80 : "100%", padding: 0,
              }}
            />
            {balNum !== 0 && (
              <div style={{ fontSize: 9, color: "rgba(0,229,255,0.75)", marginTop: 1, whiteSpace: "nowrap" }}>
                {balIsNeg ? "-" : "≈ "}${balUsd} USD
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />

          {/* Converter — takes remaining space */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 10,
            padding: isMobile ? "6px 8px" : "8px 12px",
            flex: 1,
            minWidth: 0,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", letterSpacing: 1.2, textTransform: "uppercase" }}>INR ⇄ USD</span>
              <span style={{
                fontSize: 8,
                background: inrRate ? "rgba(0,255,136,0.1)" : "rgba(255,165,0,0.1)",
                color: inrRate ? "#00ff88" : "#ffa500",
                padding: "1px 5px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}>
                {inrRate ? `1 USD = ₹${inrRate.toFixed(2)}` : "Loading…"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                <span style={{ position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: "rgba(255,200,100,0.85)", pointerEvents: "none" }}>₹</span>
                <input
                  value={converterInr}
                  onChange={e => handleConverterInr(e.target.value)}
                  placeholder="INR"
                  style={{
                    width: "100%",
                    background: converterActive === "inr" ? "rgba(255,200,100,0.09)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${converterActive === "inr" ? "rgba(255,200,100,0.4)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: isMobile ? 11 : 12,
                    fontWeight: 600,
                    padding: isMobile ? "4px 4px 4px 16px" : "5px 8px 5px 20px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, flexShrink: 0 }}>⇄</span>
              <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                <span style={{ position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: "rgba(100,200,255,0.85)", pointerEvents: "none" }}>$</span>
                <input
                  value={converterUsd}
                  onChange={e => handleConverterUsd(e.target.value)}
                  placeholder="USD"
                  style={{
                    width: "100%",
                    background: converterActive === "usd" ? "rgba(100,200,255,0.09)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${converterActive === "usd" ? "rgba(100,200,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: isMobile ? 11 : 12,
                    fontWeight: 600,
                    padding: isMobile ? "4px 4px 4px 16px" : "5px 8px 5px 20px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: cardBg, borderRadius: isMobile ? 12 : 16, padding: isMobile ? 10 : 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)", overflow: "hidden" }}>
          {/* Month nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 10 : 16 }}>
            <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: textPrimary, padding: 8 }}>←</button>
            <h3 style={{ margin: 0, fontSize: isMobile ? 15 : 18, fontWeight: 700, color: textPrimary }}>{calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: textPrimary, padding: 8 }}>→</button>
          </div>

          {/* ── FILTER BAR: single row of 3 compact dropdowns ── */}
          {(() => {
            const selStyle = (active) => ({
              appearance: "none", WebkitAppearance: "none",
              background: active ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${active ? "rgba(0,255,136,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 8,
              color: active ? "#00ff88" : textSecondary,
              fontSize: isMobile ? 11 : 12,
              fontWeight: active ? 700 : 500,
              padding: isMobile ? "5px 22px 5px 8px" : "6px 24px 6px 10px",
              cursor: "pointer",
              outline: "none",
              flex: 1,
              minWidth: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='${active ? "%2300ff88" : "%23888"}'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 7px center",
            });
            return (
              <div style={{ marginBottom: isMobile ? 10 : 14 }}>
                {/* Single row: 3 dropdowns + optional clear */}
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <select value={calFilterResult} onChange={e => setCalFilterResult(e.target.value)} style={selStyle(calFilterResult !== "All")}>
                    {["All","Profit","Loss","Breakeven"].map(v => <option key={v} value={v}>{calFilterResult === v && v !== "All" ? "📊 " : ""}{v === "All" ? "Result" : v}</option>)}
                  </select>
                  <select value={calFilterMarket} onChange={e => setCalFilterMarket(e.target.value)} style={selStyle(calFilterMarket !== "All")}>
                    {["All","Stocks","Crypto","Forex","Options"].map(v => <option key={v} value={v}>{v === "All" ? "Market" : v}</option>)}
                  </select>
                  <select value={calFilterSide} onChange={e => setCalFilterSide(e.target.value)} style={selStyle(calFilterSide !== "All")}>
                    {["All","Long","Short"].map(v => <option key={v} value={v}>{v === "All" ? "Side" : v}</option>)}
                  </select>
                  {isFiltered && (
                    <button onClick={clearFilters} style={{
                      padding: "5px 10px", borderRadius: 8, flexShrink: 0,
                      border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.1)",
                      color: "#ef4444", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    }}>✕</button>
                  )}
                </div>

                {/* Summary — single compact line, only when there are filtered trades */}
                {filteredTradeDays.length > 0 && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 7, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: textSecondary }}>
                      <strong style={{ color: textPrimary }}>{filteredTradeDays.length}</strong> day{filteredTradeDays.length !== 1 ? "s" : ""} · <strong style={{ color: textPrimary }}>{filteredTotalTrades}</strong> trade{filteredTotalTrades !== 1 ? "s" : ""}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: filteredTotalPnl >= 0 ? "#00ff88" : "#ef4444" }}>
                      {filteredTotalPnl >= 0 ? "+" : ""}{formatCurrency(filteredTotalPnl)}
                    </span>
                    {isFiltered && <span style={{ fontSize: 9, color: "#f59e0b", marginLeft: "auto" }}>● FILTERED</span>}
                  </div>
                )}
              </div>
            );
          })()}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: isMobile ? 4 : 8, marginBottom: 16 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => {
              const isWknd = idx === 0 || idx === 6;
              return (
                <div key={day} style={{
                  textAlign: "center", fontSize: isMobile ? 10 : 12, fontWeight: 700,
                  color: isWknd ? "#ef4444" : textSecondary,
                  padding: isMobile ? "4px 2px" : "8px",
                  opacity: isWknd ? 0.8 : 1,
                }}>{isMobile ? day.charAt(0) : day}</div>
              );
            })}
            {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
            {allDayData.map((dd, i) => {
              const day = i + 1;
              const { pnl, hasTrades } = dd;
              const dayOfWeek = (firstDay + i) % 7;
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
              const isToday = isCurrentMonth && day === today.getDate();
              const ratio = hasTrades ? Math.min(Math.abs(pnl) / maxAbsPnl, 1) : 0;
              const isVeryProfitable = pnl > topProfitThreshold;

              // ── Dynamic circle size: profit grows, loss shrinks ──
              const baseSize  = isMobile ? 28 : 32;
              const maxGrow   = isMobile ? 8 : 10;  // subtle: px added at full profit
              const maxShrink = isMobile ? 6 : 7;   // subtle: px removed at full loss
              let circleSize  = baseSize;
              if (hasTrades && pnl > 0) circleSize = baseSize + Math.round(ratio * maxGrow);
              if (hasTrades && pnl < 0) circleSize = baseSize - Math.round(ratio * maxShrink);
              if (isWeekend) circleSize = isMobile ? 22 : 24;

              // ── Circle colours ──
              let circleBg, circleBorder, circleColor, circleGlow = "none";
              if (isToday) {
                circleBg = "rgba(0,255,136,0.15)"; circleBorder = "2.5px solid #00ff88";
                circleColor = "#00ff88"; circleGlow = "0 0 14px rgba(0,255,136,0.6)";
              } else if (hasTrades && pnl > 0) {
                const a = 0.15 + ratio * 0.25;
                circleBg = `rgba(22,163,74,${a})`; circleColor = ratio > 0.5 ? "#00ff88" : "#4ade80";
                circleBorder = `${1.5 + ratio}px solid rgba(0,255,136,${0.3 + ratio * 0.5})`;
                circleGlow = `0 0 ${6 + Math.round(ratio * 16)}px rgba(0,255,136,${0.2 + ratio * 0.4})`;
              } else if (hasTrades && pnl < 0) {
                circleBg = `rgba(220,38,38,${0.12 + ratio * 0.15})`; circleColor = "#f87171";
                circleBorder = `1px solid rgba(239,68,68,${0.25 + ratio * 0.3})`;
                circleGlow = `0 0 ${4 + Math.round(ratio * 8)}px rgba(239,68,68,0.2)`;
              } else if (isWeekend) {
                circleBg = "rgba(239,68,68,0.08)"; circleBorder = "1px solid rgba(239,68,68,0.18)";
                circleColor = "rgba(239,68,68,0.65)";
              } else {
                circleBg = "rgba(255,255,255,0.05)"; circleBorder = "1px solid rgba(255,255,255,0.08)";
                circleColor = "rgba(255,255,255,0.45)";
              }

              const fontSize = isMobile
                ? (circleSize >= 40 ? 13 : circleSize >= 34 ? 12 : 10)
                : (circleSize >= 44 ? 15 : circleSize >= 38 ? 13 : 11);

              return (
                <div key={day} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "flex-start", paddingTop: isMobile ? 4 : 6,
                  paddingBottom: isMobile ? 4 : 8,
                  minHeight: isMobile ? 58 : 72,
                  background: "transparent", border: "none",
                  position: "relative",
                }}>
                  <style>{`
                    @keyframes todayPulse {
                      0%,100% { box-shadow: 0 0 14px rgba(0,255,136,0.55); }
                      50%     { box-shadow: 0 0 26px rgba(0,255,136,0.85); }
                    }
                  `}</style>

                  {/* Dynamic circle */}
                  <div style={{
                    width: circleSize, height: circleSize,
                    borderRadius: "50%",
                    background: circleBg,
                    border: circleBorder,
                    boxShadow: circleGlow,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize, fontWeight: 800,
                    color: circleColor,
                    flexShrink: 0,
                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    animation: isToday ? "todayPulse 2s ease-in-out infinite" : "none",
                  }}>{day}</div>

                  {/* Label below circle */}
                  {isToday && (
                    <div style={{ fontSize: isMobile ? 7 : 8, fontWeight: 800, color: "#00ff88", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 3 }}>TODAY</div>
                  )}
                  {isWeekend && !isToday && (
                    <div style={{ fontSize: isMobile ? 7 : 8, color: "rgba(239,68,68,0.5)", marginTop: 3 }}>Closed</div>
                  )}
                  {hasTrades && (
                    <div style={{
                      fontSize: isMobile ? 8 : 9, fontWeight: 700,
                      color: pnl > 0 ? (ratio > 0.6 ? "#00ff88" : "#4ade80") : "#f87171",
                      marginTop: 3, whiteSpace: "nowrap",
                    }}>
                      {pnl > 0 ? "+" : ""}{formatCurrency(pnl)}
                      {isVeryProfitable ? " 🚀" : ""}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend — circles now */}
          <div style={{ display: "flex", gap: isMobile ? 12 : 20, justifyContent: "center", flexWrap: "wrap", paddingTop: 14, borderTop: `1px solid rgba(100,100,100,0.08)` }}>
            {[
              { size: 18, bg: "rgba(0,255,136,0.15)", border: "2.5px solid #00ff88", glow: "0 0 10px rgba(0,255,136,0.5)", label: "Today" },
              { size: 20, bg: "rgba(22,163,74,0.3)", border: "2px solid rgba(0,255,136,0.6)", glow: "0 0 10px rgba(0,255,136,0.3)", label: "Profit ↑" },
              { size: 12, bg: "rgba(220,38,38,0.18)", border: "1px solid rgba(239,68,68,0.35)", glow: "none", label: "Loss ↓" },
              { size: 12, bg: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", glow: "none", label: "Weekend" },
              { size: 14, bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", glow: "none", label: "No Trades" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: item.size, height: item.size, borderRadius: "50%", background: item.bg, border: item.border, boxShadow: item.glow, flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: textSecondary }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROCKET P&L LINE GRAPH ── */}
        {(() => {
          // Build daily P&L series for current visible month
          const days = [...Array(daysInMonth)].map((_, i) => {
            const d = i + 1;
            const dateStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const dayTrades = trades.filter(t => t.date === dateStr);
            const pnl = dayTrades.reduce((s,t) => s + t.netPnl, 0);
            return { day: d, pnl, hasTrades: dayTrades.length > 0 };
          }).filter(d => d.hasTrades);

          if (days.length < 2) return null; // need at least 2 points

          // Build cumulative series
          let cum = 0;
          const points = days.map(d => { cum += d.pnl; return { day: d.day, cum, pnl: d.pnl }; });
          const totalPnl = cum;
          const bestDay = days.reduce((a,b) => b.pnl > a.pnl ? b : a);
          const worstDay = days.reduce((a,b) => b.pnl < a.pnl ? b : a);

          // SVG dimensions
          const W = 600, H = isMobile ? 110 : 140;
          const PAD = { top: 18, right: 28, bottom: 28, left: isMobile ? 38 : 48 };
          const gW = W - PAD.left - PAD.right;
          const gH = H - PAD.top - PAD.bottom;

          const maxCum = Math.max(...points.map(p => p.cum), 0);
          const minCum = Math.min(...points.map(p => p.cum), 0);
          const range = maxCum - minCum || 1;

          const xScale = (i) => PAD.left + (i / (points.length - 1)) * gW;
          const yScale = (v) => PAD.top + gH - ((v - minCum) / range) * gH;

          const polyline = points.map((p, i) => `${xScale(i)},${yScale(p.cum)}`).join(" ");
          const areaPath = `M${xScale(0)},${yScale(minCum)} ` +
            points.map((p,i) => `L${xScale(i)},${yScale(p.cum)}`).join(" ") +
            ` L${xScale(points.length-1)},${yScale(minCum)} Z`;

          const lastX = xScale(points.length - 1);
          const lastY = yScale(points[points.length - 1].cum);
          const zeroY = yScale(0);
          const lineColor = totalPnl >= 0 ? "#00ff88" : "#ef4444";
          const glowColor = totalPnl >= 0 ? "rgba(0,255,136,0.4)" : "rgba(239,68,68,0.4)";
          const fmtK = v => { const a = Math.abs(v); return (v < 0 ? "-" : "+") + (a >= 1000 ? "₹" + (a/1000).toFixed(1) + "K" : "₹" + a); };

          // Y-axis ticks
          const yTicks = [minCum, (minCum+maxCum)/2, maxCum].map(v => ({
            y: yScale(v),
            label: fmtK(v),
          }));

          // SVG path d string (used for both the line and animateMotion mpath)
          const pathD = points.map((p,i) => `${i===0?"M":"L"}${xScale(i)},${yScale(p.cum)}`).join(" ");
          // Approximate total path length for stroke-dasharray
          let pathLen = 0;
          for (let i = 1; i < points.length; i++) {
            const dx = xScale(i) - xScale(i-1);
            const dy = yScale(points[i].cum) - yScale(points[i-1].cum);
            pathLen += Math.sqrt(dx*dx + dy*dy);
          }
          pathLen = Math.ceil(pathLen) + 10;

          // Last slope angle (degrees) so static rocket stays oriented correctly after animation
          const lastSlope = (() => {
            if (points.length < 2) return 0;
            const dx = xScale(points.length-1) - xScale(points.length-2);
            const dy = yScale(points[points.length-1].cum) - yScale(points[points.length-2].cum);
            return Math.atan2(dy, dx) * (180/Math.PI);
          })();

          const monthName = calMonth.toLocaleDateString('en-US', { month: 'short' });

          return (
            <div style={{ marginTop: 20, marginBottom: 4 }}>
              <style>{`
                @keyframes drawEquity {
                  from { stroke-dashoffset: ${pathLen}; }
                  to   { stroke-dashoffset: 0; }
                }
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to   { opacity: 1; }
                }
                @keyframes rocketPulse {
                  0%,100% { filter: drop-shadow(0 0 3px ${glowColor}); }
                  50%     { filter: drop-shadow(0 0 10px ${glowColor}); }
                }
              `}</style>

              <div style={{ background: cardBg, borderRadius: isMobile ? 12 : 16, padding: isMobile ? "14px 12px" : "18px 20px", border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, color: textPrimary }}>
                      🚀 Equity Curve — {calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <div style={{ fontSize: 10, color: textSecondary, marginTop: 2 }}>{points.length} trading days · rocket follows your equity</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 800, color: lineColor }}>
                      {totalPnl >= 0 ? "+" : ""}{formatCurrency(totalPnl)}
                    </div>
                    <div style={{ fontSize: 10, color: textSecondary, marginTop: 1 }}>Net this month</div>
                  </div>
                </div>

                {/* SVG Chart */}
                <div style={{ position: "relative", width: "100%", overflow: "visible" }}>
                  <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
                    <defs>
                      <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity="0.28"/>
                        <stop offset="100%" stopColor={lineColor} stopOpacity="0.01"/>
                      </linearGradient>
                      <filter id="equityGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                      {/* Hidden path used by animateMotion */}
                      <path id="equityMotionPath" d={pathD} fill="none"/>
                    </defs>

                    {/* Zero baseline */}
                    {minCum < 0 && maxCum > 0 && (
                      <line x1={PAD.left} y1={zeroY} x2={PAD.left+gW} y2={zeroY}
                        stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3"/>
                    )}

                    {/* Y-axis */}
                    {yTicks.map((t, i) => (
                      <g key={i}>
                        <line x1={PAD.left-4} y1={t.y} x2={PAD.left} y2={t.y} stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                        <text x={PAD.left-6} y={t.y+4} fill="rgba(255,255,255,0.3)" fontSize={isMobile?7:8} textAnchor="end">{t.label}</text>
                      </g>
                    ))}

                    {/* X-axis day labels */}
                    {points.map((p, i) => {
                      if (i !== 0 && i !== points.length-1 && !(points.length > 5 && i === Math.floor(points.length/2))) return null;
                      return (
                        <text key={p.day} x={xScale(i)} y={H-4} fill="rgba(255,255,255,0.25)" fontSize={isMobile?7:8} textAnchor="middle">
                          {monthName} {p.day}
                        </text>
                      );
                    })}

                    {/* Area fill — fades in after line draws */}
                    <path
                      d={`${pathD} L${xScale(points.length-1)},${yScale(minCum)} L${xScale(0)},${yScale(minCum)} Z`}
                      fill="url(#equityGrad)"
                      style={{ animation: "fadeIn 0.8s ease 1.8s both" }}
                    />

                    {/* Equity line — draws itself */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={lineColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#equityGlow)"
                      strokeDasharray={pathLen}
                      strokeDashoffset={pathLen}
                      style={{ animation: `drawEquity 1.8s ease-out forwards` }}
                    />

                    {/* Data dots — appear after line */}
                    {points.map((p, i) => (
                      <circle key={i}
                        cx={xScale(i)} cy={yScale(p.cum)}
                        r={isMobile ? 2.5 : 3}
                        fill={p.cum >= 0 ? lineColor : "#ef4444"}
                        stroke={cardBg} strokeWidth="1.5"
                        style={{ animation: `fadeIn 0.3s ease ${1.2 + i * 0.06}s both` }}
                      />
                    ))}

                    {/* 🚀 Rocket — rides the equity path via animateMotion, rotate="auto" tilts it */}
                    <g style={{ animation: "rocketPulse 2s ease-in-out 2s infinite" }}>
                      {/* rotate(-90) pre-aligns rocket so it points along the path direction */}
                      <text
                        fontSize={isMobile ? 15 : 20}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform="rotate(-90)"
                      >🚀</text>
                      <animateMotion
                        dur="1.8s"
                        fill="freeze"
                        rotate="auto"
                        calcMode="linear"
                      >
                        <mpath href="#equityMotionPath"/>
                      </animateMotion>
                    </g>

                    {/* End-point value label */}
                    <text
                      x={lastX} y={lastY + (isMobile ? 16 : 20)}
                      fill={lineColor} fontSize={isMobile ? 8 : 9} fontWeight="700" textAnchor="middle"
                      style={{ animation: "fadeIn 0.4s ease 2s both" }}
                    >{fmtK(totalPnl)}</text>
                  </svg>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: isMobile ? 10 : 20, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, marginTop: 4 }}>
                  {[
                    { label: "Best Day",  value: `+${formatCurrency(bestDay.pnl)}`,  color: "#00ff88", sub: `${monthName} ${bestDay.day}` },
                    { label: "Worst Day", value: formatCurrency(worstDay.pnl),        color: "#ef4444", sub: `${monthName} ${worstDay.day}` },
                    { label: "Avg/Day",   value: formatCurrency(Math.round(totalPnl/points.length)), color: lineColor, sub: "" },
                    { label: "Win Days",  value: `${days.filter(d=>d.pnl>0).length}/${days.length}`, color: textPrimary, sub: "" },
                  ].map(s => (
                    <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontSize: 9, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</span>
                      <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: s.color }}>{s.value}</span>
                      {s.sub && <span style={{ fontSize: 9, color: textSecondary }}>{s.sub}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Market Session Timers */}
        <MarketSessionTimers />

        {/* ── AI WATCHLIST ── */}
        {(() => {
          // ── Signal Engine ──────────────────────────────────────────
          const generateSignal = (symbol, data) => {
            if (!data || data.price === null) return null;
            const { change24h, change7d, volume, sparkline, category } = data;
            let score = 0;
            const reasons = [];
            const risks = [];

            // 1. 24h momentum (weight ±30)
            if (change24h > 5)       { score += 30; reasons.push(`🚀 Strong 24h surge +${change24h.toFixed(1)}%`); }
            else if (change24h > 2)  { score += 18; reasons.push(`📈 Positive 24h momentum +${change24h.toFixed(1)}%`); }
            else if (change24h > 0.5){ score += 8;  reasons.push(`↗ Slight 24h gain +${change24h.toFixed(1)}%`); }
            else if (change24h < -5) { score -= 30; reasons.push(`🔻 Sharp 24h sell-off ${change24h.toFixed(1)}%`); }
            else if (change24h < -2) { score -= 18; reasons.push(`📉 Bearish 24h pressure ${change24h.toFixed(1)}%`); }
            else if (change24h < -0.5){ score -= 8; reasons.push(`↘ Slight 24h dip ${change24h.toFixed(1)}%`); }
            else                     { reasons.push(`➡ Flat 24h: ${change24h.toFixed(2)}%`); }

            // 2. 7-day trend (weight ±40)
            if (change7d > 15)       { score += 40; reasons.push(`🌊 Strong weekly uptrend +${change7d.toFixed(1)}%`); }
            else if (change7d > 5)   { score += 24; reasons.push(`📊 Bullish weekly trend +${change7d.toFixed(1)}%`); }
            else if (change7d > 1)   { score += 10; reasons.push(`↗ Weekly upward bias +${change7d.toFixed(1)}%`); }
            else if (change7d < -15) { score -= 40; reasons.push(`⛈ Heavy weekly sell-off ${change7d.toFixed(1)}%`); }
            else if (change7d < -5)  { score -= 24; reasons.push(`📊 Bearish weekly trend ${change7d.toFixed(1)}%`); }
            else if (change7d < -1)  { score -= 10; reasons.push(`↘ Slight weekly weakness ${change7d.toFixed(1)}%`); }
            else if (change7d !== 0) { reasons.push(`↔ Range-bound week ${change7d.toFixed(1)}%`); }

            // 3. Sparkline — recent 24h vs 72h average (trend acceleration)
            if (sparkline.length > 48) {
              const last24 = sparkline.slice(-24);
              const prev48 = sparkline.slice(-72, -24);
              const avg24 = last24.reduce((s,v)=>s+v,0)/last24.length;
              const avg48 = prev48.reduce((s,v)=>s+v,0)/prev48.length;
              const accel = ((avg24 - avg48) / avg48) * 100;
              if (accel > 2)  { score += 15; reasons.push(`⚡ Price accelerating above 72h avg`); }
              else if (accel < -2) { score -= 15; risks.push(`Price decelerating below 72h avg`); }
            }

            // 4. User's past win rate in this market (weight ±20)
            const mktName = category === "Crypto" ? "Crypto" : "Forex";
            const mktTrades = trades.filter(t =>
              t.market === mktName ||
              (symbol === "XAUUSD" || symbol === "XAGUSD") && t.symbol && (t.symbol.toUpperCase().includes("XAU") || t.symbol.toUpperCase().includes("GOLD") || t.symbol.toUpperCase().includes("XAG") || t.symbol.toUpperCase().includes("SILVER"))
            );
            if (mktTrades.length >= 5) {
              const wr = mktTrades.filter(t => t.netPnl > 0).length / mktTrades.length;
              if (wr >= 0.65)      { score += 20; reasons.push(`💪 Your ${(wr*100).toFixed(0)}% win rate in this market`); }
              else if (wr <= 0.35) { score -= 20; risks.push(`⚠ Only ${(wr*100).toFixed(0)}% win rate in this market — caution`); }
              else                 { reasons.push(`📋 ${mktTrades.length} trades in ${mktName}, ${(wr*100).toFixed(0)}% WR`); }
            } else {
              reasons.push(`🆕 No personal history — signal based on market data only`);
            }

            // 5. Volume (crypto only) — high volume confirms moves
            if (category === "Crypto" && volume > 0) {
              const volB = volume / 1e9;
              if (volB > 30 && change24h > 0)  { score += 10; reasons.push(`💰 High volume ($${volB.toFixed(0)}B) confirms bullish move`); }
              else if (volB > 30 && change24h < 0) { score -= 10; risks.push(`High volume ($${volB.toFixed(0)}B) confirms selling pressure`); }
            }

            // ── Map score → signal ──
            const absScore = Math.abs(score);
            const confidence = Math.min(Math.round((absScore / 100) * 100), 97);
            let signal, signalColor, signalBg, signalEmoji;
            if      (score >= 55)  { signal = "STRONG BUY";  signalColor = "#00ff88"; signalBg = "rgba(0,255,136,0.12)"; signalEmoji = "🚀"; }
            else if (score >= 20)  { signal = "BUY";          signalColor = "#4ade80"; signalBg = "rgba(74,222,128,0.1)";  signalEmoji = "📈"; }
            else if (score <= -55) { signal = "STRONG SELL"; signalColor = "#ef4444"; signalBg = "rgba(239,68,68,0.12)"; signalEmoji = "🔻"; }
            else if (score <= -20) { signal = "SELL";         signalColor = "#f87171"; signalBg = "rgba(248,113,113,0.1)"; signalEmoji = "📉"; }
            else                   { signal = "NEUTRAL";      signalColor = "#f59e0b"; signalBg = "rgba(245,158,11,0.1)";  signalEmoji = "⚖"; }

            // ── Price targets ──
            const isBullish = score > 0;
            const pct = category === "Crypto" ? 0.025 : 0.008; // crypto 2.5%, metals 0.8% per ATR unit
            const atr = data.price * pct;
            const entry = isBullish ? [data.price * 0.998, data.price * 1.002] : [data.price * 0.998, data.price * 1.002];
            const sl    = isBullish ? data.price - atr * 2   : data.price + atr * 2;
            const tp    = isBullish ? data.price + atr * 3.5 : data.price - atr * 3.5;
            const rr    = "1:1.75";

            return { signal, signalColor, signalBg, signalEmoji, confidence, score, entry, sl, tp, rr, reasons: reasons.slice(0, 4), risks: risks.slice(0, 2) };
          };

          const symbols = ["BTCUSD", "ETHUSD", "XAUUSD", "XAGUSD"];
          const fmtPrice = (price, sym) => {
            if (price === null || price === undefined) return "—";
            if (sym === "XAUUSD" || sym === "XAGUSD") return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
            if (price >= 1) return `$${price.toFixed(2)}`;
            return `$${price.toFixed(6)}`;
          };

          return (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: textPrimary }}>🤖 AI Trade Suggestions</h3>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: textSecondary }}>Real-time signals for your watchlist · Updates every 5 min</p>
                </div>
                <button onClick={() => fetchWatchlist()} disabled={aiRefreshing} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10,
                  border: `1px solid rgba(0,255,136,0.3)`, background: "transparent", color: "#00ff88",
                  fontSize: 12, fontWeight: 700, cursor: aiRefreshing ? "wait" : "pointer", opacity: aiRefreshing ? 0.6 : 1,
                }}>
                  <RefreshCw size={13} style={{ animation: aiRefreshing ? "spin 1s linear infinite" : "none" }} />
                  {aiRefreshing ? "Refreshing…" : "Refresh"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
                {symbols.map(sym => {
                  const data = watchlistData[sym];
                  const signal = data ? generateSignal(sym, data) : null;
                  const isLoading = aiRefreshing || !data;

                  return (
                    <div key={sym} style={{
                      background: signal ? signal.signalBg : cardBg,
                      backdropFilter: "blur(12px)",
                      borderRadius: 16,
                      border: `1px solid ${signal ? signal.signalColor + "30" : "rgba(100,100,100,0.1)"}`,
                      padding: 18,
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      {/* Top row: symbol + price + signal badge */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 22 }}>{data?.emoji || "•"}</span>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 800, color: textPrimary }}>{sym.replace("USD", "/USD")}</div>
                              <div style={{ fontSize: 11, color: textSecondary }}>{data?.label || "Loading…"} · {data?.category || ""}</div>
                            </div>
                          </div>
                          {data?.price != null ? (
                            <div style={{ fontSize: 22, fontWeight: 800, color: textPrimary, fontFamily: "monospace" }}>
                              {fmtPrice(data.price, sym)}
                            </div>
                          ) : (
                            <div style={{ fontSize: 14, color: textSecondary }}>Fetching price…</div>
                          )}
                          {/* 24h & 7d change pills */}
                          {data && (
                            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                              {data.change24h !== 0 && (
                                <span style={{
                                  fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                                  background: data.change24h > 0 ? "rgba(0,255,136,0.15)" : "rgba(239,68,68,0.15)",
                                  color: data.change24h > 0 ? "#00ff88" : "#ef4444",
                                }}>24h {data.change24h > 0 ? "+" : ""}{data.change24h.toFixed(2)}%</span>
                              )}
                              {data.change7d !== 0 && (
                                <span style={{
                                  fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                                  background: data.change7d > 0 ? "rgba(0,229,255,0.12)" : "rgba(239,68,68,0.12)",
                                  color: data.change7d > 0 ? "#00e5ff" : "#ef4444",
                                }}>7d {data.change7d > 0 ? "+" : ""}{data.change7d.toFixed(2)}%</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Signal badge */}
                        {signal ? (
                          <div style={{ textAlign: "right" }}>
                            <div style={{
                              fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20,
                              background: signal.signalColor + "20",
                              color: signal.signalColor,
                              border: `1px solid ${signal.signalColor}50`,
                              whiteSpace: "nowrap", marginBottom: 6,
                            }}>
                              {signal.signalEmoji} {signal.signal}
                            </div>
                            {/* Confidence bar */}
                            <div style={{ fontSize: 10, color: textSecondary, marginBottom: 4, textAlign: "right" }}>
                              Confidence {signal.confidence}%
                            </div>
                            <div style={{ width: 80, height: 5, borderRadius: 3, background: "rgba(100,100,100,0.2)", marginLeft: "auto" }}>
                              <div style={{ height: "100%", borderRadius: 3, width: `${signal.confidence}%`, background: `linear-gradient(90deg, ${signal.signalColor}, ${signal.signalColor}cc)`, transition: "width 0.8s ease" }} />
                            </div>
                          </div>
                        ) : (
                          <div style={{ fontSize: 11, color: textSecondary, padding: "5px 10px", borderRadius: 10, background: "rgba(100,100,100,0.1)" }}>
                            {isLoading ? "Analyzing…" : "No data"}
                          </div>
                        )}
                      </div>

                      {/* Mini sparkline (if available) */}
                      {data?.sparkline?.length > 10 && (() => {
                        const sp = data.sparkline.filter((_, i) => i % 6 === 0);
                        const min = Math.min(...sp); const max = Math.max(...sp);
                        const range = max - min || 1;
                        const pts = sp.map((v, i) => {
                          const x = (i / (sp.length - 1)) * 100;
                          const y = 28 - ((v - min) / range) * 24;
                          return `${x},${y}`;
                        }).join(" ");
                        const isUp = sp[sp.length - 1] >= sp[0];
                        return (
                          <svg viewBox="0 0 100 30" style={{ width: "100%", height: 36, marginBottom: 10 }}>
                            <polyline points={pts} fill="none" stroke={isUp ? "#00ff88" : "#ef4444"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                          </svg>
                        );
                      })()}

                      {/* AI Reasoning */}
                      {signal && (
                        <>
                          <div style={{ borderTop: `1px solid rgba(100,100,100,0.1)`, paddingTop: 10, marginBottom: 10 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: textSecondary, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>AI Analysis</div>
                            {signal.reasons.map((r, i) => (
                              <div key={i} style={{ fontSize: 12, color: textPrimary, marginBottom: 4, display: "flex", gap: 6, alignItems: "flex-start" }}>
                                <span style={{ flexShrink: 0 }}>•</span><span>{r}</span>
                              </div>
                            ))}
                            {signal.risks.map((r, i) => (
                              <div key={i} style={{ fontSize: 12, color: "#f59e0b", marginBottom: 4, display: "flex", gap: 6, alignItems: "flex-start" }}>
                                <span style={{ flexShrink: 0 }}>⚠</span><span>{r}</span>
                              </div>
                            ))}
                          </div>

                          {/* Price Targets */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
                            {[
                              { label: "Entry Zone", value: `${fmtPrice(signal.entry[0], sym)} – ${fmtPrice(signal.entry[1], sym)}`, color: "#00e5ff" },
                              { label: "Stop Loss", value: fmtPrice(signal.sl, sym), color: "#ef4444" },
                              { label: "Take Profit", value: fmtPrice(signal.tp, sym), color: "#00ff88" },
                            ].map(t => (
                              <div key={t.label} style={{
                                background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "8px 6px", textAlign: "center",
                              }}>
                                <div style={{ fontSize: 9, color: textSecondary, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.4 }}>{t.label}</div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: t.color, fontFamily: "monospace", wordBreak: "break-all" }}>{t.value}</div>
                              </div>
                            ))}
                          </div>

                          <div style={{ fontSize: 10, color: textSecondary, textAlign: "center" }}>
                            R:R ≈ {signal.rr} · Signal score: {signal.score > 0 ? "+" : ""}{signal.score}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <p style={{ margin: "10px 0 0", fontSize: 11, color: textSecondary, textAlign: "center" }}>
                ⚠ AI signals are for informational purposes only — not financial advice. Always do your own research.
              </p>
            </div>
          );
        })()}
      </div>
    );
  };

  // ============================================================
  // PAGE: MARKETS
  // ============================================================
  const MarketsPage = () => {
    const marketStats = useMemo(() => {
      const stats = {};
      filteredTrades.forEach(t => {
        if (!stats[t.market]) stats[t.market] = { name: t.market, pnl: 0, trades: 0, wins: 0 };
        stats[t.market].pnl += t.netPnl;
        stats[t.market].trades++;
        if (t.netPnl > 0) stats[t.market].wins++;
      });
      return Object.values(stats).sort((a, b) => b.pnl - a.pnl).map(s => ({
        ...s,
        winRate: (s.wins / s.trades * 100).toFixed(1),
        avgPnl: (s.pnl / s.trades).toFixed(2)
      }));
    }, [filteredTrades]);

    return (
      <div>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary }}>Markets Performance</h2>
        <p style={{ margin: "0 0 20px", fontSize: 14, color: textSecondary }}>See which markets are working best for you.</p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {marketStats.map(m => (
            <div key={m.name} style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <MarketIcon market={m.name} size={24} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: textPrimary }}>{m.name}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: textSecondary, marginBottom: 4 }}>Total P&L</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: pnlColor(m.pnl, dark) }}>{formatCurrency(m.pnl)}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: textSecondary, marginBottom: 4 }}>Trades</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: textPrimary }}>{m.trades}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: textSecondary, marginBottom: 4 }}>Win Rate</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: textPrimary }}>{m.winRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE: SIMULATOR
  // ============================================================
  const SimulatorPage = () => (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: textPrimary, margin: "0 0 12px" }}>Bot Simulator</h2>
      <p style={{ color: textSecondary, fontSize: 14, marginBottom: 20 }}>Paper trading simulator coming soon...</p>
      <div style={{ background: cardBg, borderRadius: 16, padding: 40, border: `1px solid rgba(100,100,100,0.1)` }}>
        <Bot size={48} color={textSecondary} style={{ margin: "0 auto 16px" }} />
        <p style={{ color: textSecondary }}>Configure and backtest your trading rules in a safe sandbox environment.</p>
      </div>
    </div>
  );

  // ============================================================
  // PAGE: TIPS
  // ============================================================
  const TipsPage = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary }}>Trading Tips & Tricks</h2>
      <p style={{ margin: "0 0 20px", fontSize: 14, color: textSecondary }}>Learn proven strategies to improve your trading performance.</p>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {[
          { title: "Manage Your Emotions", desc: "Keep a trading journal to track emotional patterns. Your biggest enemy in trading is yourself." },
          { title: "Follow Your Rules", desc: "Stick to your trading plan. Deviation usually leads to losses. Discipline beats luck." },
          { title: "Risk Management First", desc: "Never risk more than 2% of your account per trade. Preserve capital above all else." },
          { title: "Backtest Your Strategy", desc: "Use historical data to validate your strategy. Don't risk real money on untested ideas." },
          { title: "Know Your Best Hours", desc: "Track when you trade best. Some traders profit in early morning, others in evening." },
          { title: "Review Your Trades", desc: "Spend time analyzing both winners and losers. The greatest edge comes from self-awareness." },
        ].map((tip, i) => (
          <div key={i} style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: textPrimary }}>{tip.title}</h3>
            <p style={{ margin: 0, fontSize: 14, color: textSecondary, lineHeight: 1.6 }}>{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================================
  // PAGE: LIVE PRICES
  // ============================================================
  const LivePricesPage = () => {
    const formatPrice = (price, type) => {
      if (!price) return "—";
      if (type === "forex") return price.toFixed(4);
      if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (price >= 1) return `$${price.toFixed(2)}`;
      return `$${price.toFixed(4)}`;
    };

    const PriceCard = ({ symbol, display, priceData, history, type }) => {
      const change = priceData?.change24h || 0;
      const isUp = change >= 0;
      const sparkData = history || [];
      const minP = sparkData.length ? Math.min(...sparkData.map(d => d.price)) : 0;
      const maxP = sparkData.length ? Math.max(...sparkData.map(d => d.price)) : 1;
      const range = maxP - minP || 1;

      return (
        <div style={{
          background: "rgba(20,20,20,0.6)", backdropFilter: "blur(12px)",
          borderRadius: 16, padding: isMobile ? 16 : 20,
          border: `1px solid rgba(100,100,100,0.1)`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{display}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: accentBlue }}>{symbol}</div>
            </div>
            {type === "crypto" && change !== 0 && (
              <div style={{
                display: "flex", alignItems: "center", gap: 3,
                padding: "4px 8px", borderRadius: 8,
                background: isUp ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)",
                color: isUp ? "#4ade80" : "#f87171",
                fontSize: 12, fontWeight: 700,
              }}>
                {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
          </div>

          <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: textPrimary, marginBottom: 12 }}>
            {priceData ? formatPrice(priceData.price, type) : <span style={{ color: textSecondary }}>Loading...</span>}
          </div>

          {/* Sparkline Chart */}
          {sparkData.length > 2 && (
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id={`sparkGrad-${symbol.replace(/\//g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isUp ? "#4ade80" : "#f87171"} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={isUp ? "#4ade80" : "#f87171"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="price" stroke={isUp ? "#4ade80" : "#f87171"} fill={`url(#sparkGrad-${symbol.replace(/\//g, '')})`} strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ background: "rgba(20,20,20,0.9)", border: "1px solid rgba(100,100,100,0.2)", borderRadius: 8, fontSize: 11, backdropFilter: "blur(8px)" }} formatter={(v) => [formatPrice(v, type), "Price"]} labelStyle={{ color: textSecondary, fontSize: 10 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {type === "crypto" && priceData?.volume && (
            <div style={{ fontSize: 11, color: textSecondary, marginTop: 8 }}>
              Vol 24h: ${(priceData.volume / 1e9).toFixed(2)}B
              {priceData.marketCap ? ` · MCap: $${(priceData.marketCap / 1e9).toFixed(1)}B` : ""}
            </div>
          )}
        </div>
      );
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary }}>Live Prices</h2>
            <p style={{ margin: 0, fontSize: 13, color: textSecondary }}>
              {lastPriceUpdate ? `Last updated: ${lastPriceUpdate.toLocaleTimeString()}` : "Fetching prices..."}
              {pricesLoading && " · Refreshing..."}
            </p>
          </div>
          <button onClick={() => { fetchLivePrices(); fetchPriceHistory(); }} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10,
            border: "1px solid rgba(100,100,100,0.2)", background: "rgba(20,20,20,0.6)",
            color: textSecondary, fontWeight: 600, fontSize: 12, cursor: "pointer", backdropFilter: "blur(8px)",
          }}>
            <RefreshCw size={14} style={{ animation: pricesLoading ? "spin 1s linear infinite" : "none" }} /> Refresh
          </button>
        </div>

        {/* Crypto Section */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Bitcoin size={18} color="#f59e0b" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: textPrimary }}>Crypto</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {WATCHLIST.crypto.map(c => (
              <PriceCard key={c.symbol} symbol={c.symbol} display={c.display} priceData={livePrices[c.symbol]} history={priceHistory[c.symbol]} type="crypto" />
            ))}
          </div>
        </div>

        {/* Forex Section */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Landmark size={18} color="#10b981" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: textPrimary }}>Forex</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {WATCHLIST.forex.map(f => (
              <PriceCard key={f.symbol} symbol={f.symbol} display={f.display} priceData={livePrices[f.symbol]} history={priceHistory[f.symbol]} type="forex" />
            ))}
          </div>
        </div>

        <div style={{ padding: 16, borderRadius: 12, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", fontSize: 12, color: textSecondary }}>
          Crypto prices via CoinGecko (updates every 60s). Forex rates via Frankfurter (ECB daily rates). Stock prices coming soon via Alpha Vantage integration.
        </div>
      </div>
    );
  };

  // ============================================================
  // BROKER CONNECT PAGE
  // ============================================================
  const BrokerConnectPage = ({ brokerName, brokerColor }) => (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: textPrimary, margin: "0 0 12px" }}>{brokerName} Connect</h2>
      <p style={{ color: textSecondary, fontSize: 14, marginBottom: 20 }}>Live trading integration coming soon...</p>
      <div style={{ background: cardBg, borderRadius: 16, padding: 40, border: `1px solid rgba(100,100,100,0.1)` }}>
        <Wifi size={48} color={brokerColor} style={{ margin: "0 auto 16px" }} />
        <p style={{ color: textSecondary }}>Connect your {brokerName} account for live trade execution and real-time updates.</p>
      </div>
    </div>
  );

  const ExnessPage = () => <BrokerConnectPage brokerName="Exness" brokerColor="#f59e0b" />;
  const XMPage = () => <BrokerConnectPage brokerName="XM" brokerColor="#e11d48" />;

  // ============================================================
  // RENDER ACTIVE PAGE
  // ============================================================
  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage />;
      case "liveprices": return <LivePricesPage />;
      case "trades": return <TradesPage />;
      case "journal": return <JournalPage />;
      case "analytics": return <AnalyticsPage />;
      case "botvsmanual": return <BotVsManualPage />;
      case "calendar": return <CalendarPage />;
      case "markets": return <MarketsPage />;
      case "simulator": return <SimulatorPage />;
      case "exness": return <ExnessPage />;
      case "xm": return <XMPage />;
      case "tips": return <TipsPage />;
      default: return <DashboardPage />;
    }
  };

  // ============================================================
  // MAIN LAYOUT
  // ============================================================
  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: textSecondary, fontSize: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: `3px solid ${dark ? "rgba(100,100,100,0.2)" : "#e2e8f0"}`,
          borderTop: `3px solid #00ff88`,
          animation: "spin 1s linear infinite",
        }} />
        <span>Loading your portfolio...</span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
  if (!user) return <SignInPage onSignIn={handleSignIn} loading={signInLoading} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: textPrimary, position: "relative" }}>

      {/* Starfield background */}
      {[...Array(45)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        return (
          <div key={`star-${i}`} style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            background: "#00ff88",
            opacity: Math.random() * 0.6 + 0.2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${duration}s ease-in-out infinite`,
            pointerEvents: "none",
          }} />
        );
      })}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} />}

      {/* Sidebar */}
      <aside style={{
        width: 240, position: "fixed", top: 0, bottom: 0, left: sidebarOpen ? 0 : -240,
        background: dark ? "rgba(20,20,20,0.6)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        borderRight: `1px solid rgba(100,100,100,0.1)`,
        zIndex: 50, transition: "left 0.3s ease", display: "flex", flexDirection: "column",
        ...(!isMobile ? { left: 0, position: "relative" } : {}),
      }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid rgba(100,100,100,0.1)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #00ff88, #00cc6a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,255,136,0.3)" }}>
              <TrendingUp size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>TradeTracker</div>
              <div style={{ fontSize: 10, color: textSecondary }}>Portfolio & Analytics</div>
            </div>
          </div>
        </div>

        {/* Nav Groups */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {[
            { section: "OVERVIEW", items: [{ id: "calendar", label: "P&L Calendar", icon: Calendar }, { id: "dashboard", label: "Dashboard", icon: Home }, { id: "liveprices", label: "Live Prices", icon: Activity }] },
            { section: "TRADING", items: [{ id: "trades", label: "Trades", icon: TrendingUp }, { id: "journal", label: "Journal", icon: BookOpen }] },
            { section: "ANALYTICS", items: [{ id: "analytics", label: "Analytics", icon: BarChart3 }, { id: "botvsmanual", label: "Bot vs Manual", icon: Bot }, { id: "markets", label: "Markets", icon: Gem }] },
            { section: "TOOLS", items: [{ id: "simulator", label: "Simulator", icon: Crosshair }, { id: "exness", label: "Exness", icon: Wifi }, { id: "xm", label: "XM", icon: Wifi }, { id: "tips", label: "Tips & Tricks", icon: Brain }] },
          ].map(group => (
            <div key={group.section} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.5, paddingLeft: 14, marginBottom: 8 }}>{group.section}</div>
              {group.items.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => { setPage(id); setSidebarOpen(false); }} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  borderRadius: 12, border: "none", cursor: "pointer", marginBottom: 4, fontSize: 14, fontWeight: 600,
                  background: page === id ? (dark ? "rgba(0,255,136,0.15)" : "rgba(0,255,136,0.08)") : "transparent",
                  color: page === id ? accentBlue : textSecondary,
                  textAlign: "left",
                  borderLeft: page === id ? `3px solid ${accentBlue}` : "3px solid transparent",
                  transition: "all 0.2s",
                  paddingLeft: page === id ? 11 : 14,
                }}>
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: "12px 10px", borderTop: `1px solid rgba(100,100,100,0.1)`, display: "flex", flexDirection: "column", gap: 6 }}>
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(10,10,10,0.4)" }}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} referrerPolicy="no-referrer" />
              ) : (
                <User size={16} color={textSecondary} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.displayName || "User"}</div>
                <div style={{ fontSize: 10, color: textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
              </div>
              {saveStatus === "saving" && <div style={{ fontSize: 9, color: "#f59e0b", fontWeight: 600 }}>...</div>}
              {saveStatus === "saved" && <div style={{ fontSize: 9, color: "#4ade80", fontWeight: 600 }}>✓</div>}
            </div>
          )}
          <button onClick={() => setDark(d => !d)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
            borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: "rgba(10,10,10,0.4)", color: textSecondary, textAlign: "left",
            transition: "all 0.2s",
          }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button onClick={handleSignOut} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
            borderRadius: 12, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: "rgba(239,68,68,0.1)", color: "#ef4444", textAlign: "left",
            transition: "all 0.2s",
          }}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100vh", WebkitOverflowScrolling: "touch" }}>
        {/* Top Bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: dark ? "rgba(6,6,18,0.92)" : "rgba(248,250,252,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid rgba(0,255,136,0.08)`,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}>
          {/* Main header row */}
          <div style={{ padding: isMobile ? "10px 14px" : "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #00ff88, #00cc6a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <TrendingUp size={14} color="#000" />
                  </div>
                </div>
              )}
              <h1 style={{ margin: 0, fontSize: isMobile ? 17 : 20, fontWeight: 800, color: textPrimary }}>
                {navItems.find(n => n.id === page)?.label || "Dashboard"}
              </h1>
            </div>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setPage("calendar")} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
                  border: `1px solid ${page === "calendar" ? accentBlue : "rgba(100,100,100,0.2)"}`,
                  background: page === "calendar" ? (dark ? "rgba(0,255,136,0.15)" : "rgba(0,255,136,0.08)") : "transparent",
                  color: page === "calendar" ? accentBlue : textSecondary, fontWeight: 700, fontSize: 13, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  <Calendar size={15} /> Calendar
                </button>
                <button onClick={() => setShowQuickPnl(true)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
                  border: `1px solid rgba(0,255,136,0.4)`,
                  background: "transparent",
                  color: "#00ff88", fontWeight: 600, fontSize: 12, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  ⚡ Quick P&L
                </button>
                <button onClick={() => setShowCsvUpload(true)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
                  border: `1px solid rgba(0,255,136,0.4)`,
                  background: "transparent",
                  color: "#00ff88", fontWeight: 600, fontSize: 12, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  📁 Import CSV
                </button>
                <button onClick={() => setShowAddTrade(true)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10,
                  border: "none", background: "linear-gradient(135deg, #00ff88, #00cc6a)",
                  color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,255,136,0.3)",
                  transition: "all 0.2s",
                }}>
                  <Plus size={15} /> New Trade
                </button>
              </div>
            )}
            {/* Mobile: save status indicator */}
            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {saveStatus === "saving" && <span style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700 }}>Saving…</span>}
                {saveStatus === "saved" && <span style={{ fontSize: 10, color: "#00ff88", fontWeight: 700 }}>✓ Saved</span>}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: isMobile ? "12px 10px 90px" : 24, maxWidth: 1400, margin: "0 auto" }}>
          {renderPage()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <>
          {/* Speed dial backdrop */}
          {showSpeedDial && (
            <div onClick={() => setShowSpeedDial(false)} style={{ position: "fixed", inset: 0, zIndex: 38, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }} />
          )}

          {/* Speed dial actions */}
          {showSpeedDial && (
            <div style={{ position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)", zIndex: 45, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              {[
                { label: "New Trade", action: () => { setShowAddTrade(true); setShowSpeedDial(false); }, icon: Plus, bg: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000" },
                { label: "⚡ Quick P&L", action: () => { setShowQuickPnl(true); setShowSpeedDial(false); }, icon: Zap, bg: "linear-gradient(135deg, #00e5ff, #0099cc)", color: "#000" },
                { label: "📁 Import CSV", action: () => { setShowCsvUpload(true); setShowSpeedDial(false); }, icon: Upload, bg: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#fff" },
              ].reverse().map((item, i) => (
                <button key={i} onClick={item.action} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 20px", borderRadius: 50, border: "none",
                  background: item.bg, color: item.color,
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  whiteSpace: "nowrap",
                  animation: `speedDialIn 0.2s ease ${i * 0.05}s both`,
                }}>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <style>{`
            @keyframes speedDialIn {
              from { opacity: 0; transform: translateY(20px) scale(0.8); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          <nav style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
            background: dark ? "rgba(8,8,20,0.95)" : "rgba(248,250,252,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: `1px solid rgba(0,255,136,0.1)`,
            display: "flex", justifyContent: "space-around", alignItems: "center", height: 70,
          }}>
            {[
              { id: "calendar", icon: Calendar, label: "Calendar" },
              { id: "trades", icon: TrendingUp, label: "Trades" },
              { id: "add", icon: showSpeedDial ? X : Plus, label: "Actions", isFab: true },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "menu", icon: Menu, label: "More", isMenu: true },
            ].map(item => (
              item.isFab ? (
                <button key="fab" onClick={() => setShowSpeedDial(s => !s)} style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: showSpeedDial ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #00ff88, #00cc6a)",
                  border: "none", cursor: "pointer", color: "#000",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: showSpeedDial ? "0 8px 24px rgba(239,68,68,0.5)" : "0 8px 24px rgba(0,255,136,0.4)",
                  transform: "translateY(-10px)",
                  transition: "all 0.3s",
                }}>
                  {showSpeedDial ? <X size={24} color="#fff" /> : <Plus size={24} />}
                </button>
              ) : item.isMenu ? (
                <button key="menu" onClick={() => setSidebarOpen(true)} style={{
                  flex: 1, height: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                  color: textSecondary, transition: "all 0.2s",
                }}>
                  <Menu size={20} />
                  <span style={{ fontSize: 10, fontWeight: 600 }}>More</span>
                </button>
              ) : (
                <button key={item.id} onClick={() => setPage(item.id)} style={{
                  flex: 1, height: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                  color: page === item.id ? "#00ff88" : textSecondary,
                  transition: "all 0.2s",
                }}>
                  <item.icon size={20} />
                  <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
                </button>
              )
            ))}
          </nav>
        </>
      )}

      {/* Modals */}
      {showAddTrade && <AddTradeModal dark={dark} isMobile={isMobile} onClose={() => setShowAddTrade(false)} onAdd={addTrade} />}
      {showQuickPnl && <QuickPnlModal dark={dark} isMobile={isMobile} onClose={() => setShowQuickPnl(false)} onAdd={addTrade} />}
      {showCsvUpload && <CsvUploadModal dark={dark} isMobile={isMobile} onClose={() => setShowCsvUpload(false)} onAdd={addTrade} />}
    </div>
  );
}

// Mount the app
createRoot(document.getElementById("root")).render(createElement(TradingPortfolioTracker));
