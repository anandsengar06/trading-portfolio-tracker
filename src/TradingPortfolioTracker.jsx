import React, { useState, useMemo, useCallback, useRef, useEffect, createElement } from "react";
import { createRoot } from "react-dom/client";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Customized, LabelList } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, Plus, Moon, Sun, Menu, X, Activity, BookOpen, Bot, Calendar, ChevronDown, Target, Brain, Zap, Clock, Award, AlertTriangle, Filter, ArrowUpRight, ArrowDownRight, Percent, Briefcase, Bitcoin, Landmark, LineChart as LineChartIcon, Gem, Upload, Wifi, Copy, CheckCircle, FileText, Settings, RefreshCw, Crosshair, Play, Pause, SkipForward, SkipBack, RotateCcw, Eye, LogOut, User, IndianRupee, DollarSign, Home, BarChart2, Trash2, RotateCw, Cpu, Download, Code, ChevronRight, Terminal, Shield, FlaskConical, Rocket, CircleDot, Square, ToggleLeft, ToggleRight, AlertCircle, Info } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, deleteDoc, addDoc, onSnapshot } from "firebase/firestore";

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
// formatCurrency is defined inside TradingPortfolioTracker component (currency-aware)
// This stub is kept so child components that are defined outside still compile
const _defaultFormatCurrency = (val, sym = "$") => {
  if (val === undefined || val === null) return `${sym}0.00`;
  const abs = Math.abs(val);
  const str = abs >= 1000 ? `${sym}${(abs / 1000).toFixed(1)}k` : `${sym}${abs.toFixed(2)}`;
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
      background: dark ? "rgba(20,20,20,0.6)" : "#ffffff",
      backdropFilter: "blur(12px)",
      borderRadius: 16,
      padding: "20px 20px",
      border: dark ? "1px solid rgba(100,100,100,0.1)" : "1px solid #e8e8e8",
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
      <div style={{ fontSize: 11, color: dark ? "#8a8a8a" : "#6b6b6b", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: dark ? "#fafafa" : "#0a0a0a", letterSpacing: -0.8 }}>{value}</div>
      {subValue && <div style={{ fontSize: 12, color: dark ? "#6b6b6b" : "#888888" }}>{subValue}</div>}

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
// ---- MT4/MT5 CSV format detection + parsing ----
const detectAndParseCsv = (text) => {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l);
  if (lines.length < 2) return { format: null, trades: [] };

  // Try to detect delimiter
  const delim = lines[0].includes('\t') ? '\t' : ',';
  const splitLine = (l) => l.split(delim).map(v => v.replace(/^"|"$/g, '').trim());

  const rawHeaders = splitLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, '_').replace(/#/g, 'num'));

  // ---- MT4 format detection ----
  // Headers: #/ticket, open_time, type, size/volume, symbol/item, open_price, s/l, t/p, close_time, close_price, commission, taxes, swap, profit
  const isMT4 = rawHeaders.some(h => h === 'open_time') && rawHeaders.some(h => h === 'close_time') &&
                rawHeaders.some(h => h === 'profit') &&
                (rawHeaders.some(h => h === 'item') || rawHeaders.some(h => h === 'symbol'));

  // ---- MT5 format detection ----
  const isMT5 = rawHeaders.some(h => h === 'open_time') && rawHeaders.some(h => h === 'close_time') &&
                rawHeaders.some(h => h === 'profit') && rawHeaders.some(h => h === 'volume') &&
                rawHeaders.some(h => h === 'symbol') && !rawHeaders.some(h => h === 'item');

  if (isMT4 || isMT5) {
    const trades = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = splitLine(lines[i]);
      if (vals.length < 5) continue;
      const row = {};
      rawHeaders.forEach((h, idx) => { row[h] = vals[idx] || ''; });

      // Skip non-trade rows (balance, credit, empty, deposit)
      const typeVal = (row.type || '').toLowerCase();
      if (!typeVal || typeVal === 'balance' || typeVal === 'credit' || typeVal === 'deposit' || typeVal === 'withdrawal') continue;

      const symbol = (row.symbol || row.item || 'UNKNOWN').toUpperCase();
      const isBuy = typeVal.includes('buy');
      const side = isBuy ? 'Long' : 'Short';
      const openPrice = parseFloat(row.open_price || row.price || 0);
      const closePrice = parseFloat(row.close_price || 0);
      const volume = parseFloat(row.size || row.volume || 1);
      const profit = parseFloat(row.profit || 0);
      const commission = parseFloat(row.commission || 0);
      const swap = parseFloat(row.swap || 0);
      const netPnl = profit + commission + swap;

      // Parse date from "2026.04.12 09:30" or "2026-04-12 09:30"
      const parseDateTime = (dtStr) => {
        if (!dtStr) return { date: new Date().toISOString().split('T')[0], time: '09:30' };
        const clean = dtStr.replace(/\./g, '-');
        const parts = clean.split(' ');
        return { date: parts[0] || new Date().toISOString().split('T')[0], time: (parts[1] || '09:30').slice(0, 5) };
      };

      const openDT  = parseDateTime(row.open_time);
      const closeDT = parseDateTime(row.close_time);

      // Determine market from symbol
      const detectMarket = (sym) => {
        if (/USDT?$|BTC|ETH|SOL|XRP|BNB/.test(sym)) return 'Crypto';
        if (/USD|EUR|GBP|JPY|AUD|NZD|CHF|CAD/.test(sym) && sym.length <= 7) return 'Forex';
        if (/GOLD|SILVER|XAU|XAG|OIL|GAS/.test(sym)) return 'Forex';
        if (/US30|NAS|SPX|DAX|FTSE/.test(sym)) return 'Stocks';
        return 'Forex'; // default for Exness
      };

      trades.push({
        id: Date.now() + Math.random() + i,
        date: closeDT.date,
        time: closeDT.time,
        market: detectMarket(symbol),
        symbol,
        side,
        source: 'Manual',
        entryPrice: openPrice,
        exitPrice: closePrice,
        quantity: volume,
        pnl: parseFloat(profit.toFixed(2)),
        fees: parseFloat(Math.abs(commission + swap).toFixed(2)),
        netPnl: parseFloat(netPnl.toFixed(2)),
        strategy: 'Imported',
        emotion: 'Neutral',
        broker: 'Exness',
        holdTime: 0,
        rating: 3,
        discipline: 3,
        notes: `Ticket: ${row.num || row.ticket || row.position_id || ''}`,
        tags: ['imported'],
      });
    }
    return { format: isMT5 ? 'MT5' : 'MT4', trades };
  }

  // ---- Generic / custom CSV format ----
  const trades = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = splitLine(lines[i]);
    if (!vals.some(v => v)) continue;
    const row = {};
    rawHeaders.forEach((h, idx) => { row[h] = vals[idx] || ''; });
    const entry = parseFloat(row.entry_price || row.entryprice || row.open_price || 0);
    const exit  = parseFloat(row.exit_price  || row.exitprice  || row.close_price || 0);
    const qty   = parseFloat(row.quantity || row.size || row.volume || 1);
    const side  = (row.side || row.type || 'Long');
    const isBuy = side.toLowerCase().includes('buy') || side.toLowerCase() === 'long';
    const pnl   = parseFloat(((exit - entry) * qty * (isBuy ? 1 : -1)).toFixed(2));
    const fees  = parseFloat(Math.abs(pnl * 0.002).toFixed(2));
    trades.push({
      id: Date.now() + Math.random() + i,
      date: row.date || new Date().toISOString().split('T')[0],
      time: row.time || '09:30',
      market: row.market || 'Stocks',
      symbol: (row.symbol || 'UNKNOWN').toUpperCase(),
      side: isBuy ? 'Long' : 'Short',
      source: row.source || 'Manual',
      entryPrice: entry, exitPrice: exit, quantity: qty,
      pnl, fees, netPnl: pnl - fees,
      strategy: row.strategy || 'Unknown',
      emotion: 'Neutral', broker: row.broker || 'Manual',
      holdTime: 0, rating: 3, discipline: 3,
      notes: row.notes || '', tags: [],
    });
  }
  return { format: 'Generic', trades };
};

const CsvUploadModal = ({ dark, isMobile, onClose, onAdd }) => {
  const [parsed, setParsed] = useState(null); // { format, trades }
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const cardBg = dark ? "rgba(18,18,28,0.98)" : "#fff";
  const textPrimary = dark ? "#fafafa" : "#050505";
  const textSecondary = dark ? "#8a8a8a" : "#6b6b6b";
  const borderColor = dark ? "#3a3a3a" : "#d1d5db";

  const handleFileSelect = (e) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (typeof text !== 'string') return;
      try {
        const result = detectAndParseCsv(text);
        if (!result.trades.length) { setError('No trade rows found. Make sure the file has trade history rows.'); return; }
        setParsed(result);
      } catch(e) { setError('Could not parse file: ' + e.message); }
    };
    reader.readAsText(file);
  };

  const importTrades = () => {
    if (!parsed) return;
    parsed.trades.forEach(t => onAdd(t));
    onClose();
  };

  const formatBadge = parsed?.format ? (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: parsed.format === 'MT4' ? 'rgba(0,255,136,0.15)' : parsed.format === 'MT5' ? 'rgba(0,229,255,0.15)' : 'rgba(245,158,11,0.15)',
      color: parsed.format === 'MT4' ? '#00ff88' : parsed.format === 'MT5' ? '#00e5ff' : '#f59e0b',
      border: `1px solid ${parsed.format === 'MT4' ? 'rgba(0,255,136,0.3)' : parsed.format === 'MT5' ? 'rgba(0,229,255,0.3)' : 'rgba(245,158,11,0.3)'}`,
    }}>✓ {parsed.format} format detected</span>
  ) : null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
      zIndex: 1000, padding: isMobile ? 0 : 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: cardBg, backdropFilter: "blur(20px)",
        borderRadius: isMobile ? "24px 24px 0 0" : 20,
        padding: isMobile ? "24px 20px 32px" : 28,
        width: "100%", maxWidth: isMobile ? "100%" : 620,
        maxHeight: isMobile ? "90vh" : "85vh", overflowY: "auto",
        border: `1px solid ${dark ? "rgba(0,255,136,0.1)" : "#e2e8f0"}`,
        boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      }}>
        {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(150,150,150,0.3)", margin: "0 auto 20px" }} />}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: textPrimary }}>📁 Import Trades</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} color={textSecondary} /></button>
        </div>

        {/* Format support badges */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {[
            { label: "MT4 CSV", color: "#00ff88" },
            { label: "MT5 CSV", color: "#00e5ff" },
            { label: "Generic CSV", color: "#f59e0b" },
          ].map(({ label, color }) => (
            <span key={label} style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
              background: `${color}18`, color, border: `1px solid ${color}33` }}>{label}</span>
          ))}
        </div>

        {/* How to export from MT4 */}
        <details style={{ marginBottom: 16 }}>
          <summary style={{ fontSize: 12, fontWeight: 600, color: textSecondary, cursor: "pointer" }}>
            How to export from MT4 / Exness ▾
          </summary>
          <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 8, background: dark ? "rgba(0,255,136,0.05)" : "#f0fdf4",
            border: `1px solid ${dark ? "rgba(0,255,136,0.15)" : "#bbf7d0"}`, fontSize: 12, color: textSecondary, lineHeight: 1.6 }}>
            <b style={{ color: textPrimary }}>MT4:</b> Open Terminal → Account History tab → Right-click → Save as Report → Save as .csv<br/>
            <b style={{ color: textPrimary }}>MT5:</b> Toolbox → History tab → Right-click → Save as Report → .csv<br/>
            <b style={{ color: textPrimary }}>Exness portal:</b> My Account → Trade History → Export CSV
          </div>
        </details>

        <div style={{ position: "relative", marginBottom: error ? 8 : 16 }}>
          <input ref={fileInputRef} type="file" accept=".csv,.txt" onChange={handleFileSelect}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${borderColor}`,
              background: dark ? "#050505" : "#f8fafc", color: textPrimary, fontSize: 13, boxSizing: "border-box" }} />
        </div>

        {error && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 12, marginBottom: 14 }}>{error}</div>}

        {parsed && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              {formatBadge}
              <span style={{ fontSize: 12, color: textSecondary }}>{parsed.trades.length} trades ready to import</span>
            </div>
            <div style={{ overflowX: "auto", maxHeight: 240, overflowY: "auto", borderRadius: 8,
              border: `1px solid ${borderColor}`, background: dark ? "rgba(0,0,0,0.2)" : "#fafafa" }}>
              <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse", color: textPrimary }}>
                <thead>
                  <tr style={{ background: dark ? "rgba(0,255,136,0.08)" : "rgba(0,255,136,0.05)" }}>
                    {["Symbol", "Side", "Date", "Entry", "Exit", "Lots", "Net P&L"].map(h => (
                      <th key={h} style={{ padding: "7px 10px", textAlign: "left", fontWeight: 700, whiteSpace: "nowrap",
                        fontSize: 10, color: textSecondary, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.trades.slice(0, 10).map((t, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${borderColor}` }}>
                      <td style={{ padding: "6px 10px", fontWeight: 700 }}>{t.symbol}</td>
                      <td style={{ padding: "6px 10px" }}>
                        <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700,
                          background: t.side === 'Long' ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)",
                          color: t.side === 'Long' ? "#16a34a" : "#dc2626" }}>{t.side}</span>
                      </td>
                      <td style={{ padding: "6px 10px", color: textSecondary }}>{t.date}</td>
                      <td style={{ padding: "6px 10px", fontFamily: "monospace" }}>{t.entryPrice}</td>
                      <td style={{ padding: "6px 10px", fontFamily: "monospace" }}>{t.exitPrice}</td>
                      <td style={{ padding: "6px 10px" }}>{t.quantity}</td>
                      <td style={{ padding: "6px 10px", fontWeight: 700,
                        color: t.netPnl >= 0 ? "#4ade80" : "#f87171", fontFamily: "monospace" }}>
                        {t.netPnl >= 0 ? "+" : ""}{t.netPnl.toFixed(2)}</td>
                    </tr>
                  ))}
                  {parsed.trades.length > 10 && (
                    <tr><td colSpan={7} style={{ padding: "6px 10px", color: textSecondary, fontSize: 11 }}>
                      + {parsed.trades.length - 10} more trades…
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "13px", borderRadius: 12, border: `1px solid ${borderColor}`,
            background: "transparent", color: textPrimary, fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={importTrades} disabled={!parsed} style={{
            flex: 2, padding: "13px", borderRadius: 12, border: "none",
            background: parsed ? "linear-gradient(135deg, #00ff88, #00cc6a)" : "rgba(100,100,100,0.2)",
            color: parsed ? "#000" : "#8a8a8a",
            fontSize: 14, fontWeight: 700, cursor: parsed ? "pointer" : "not-allowed",
          }}>
            {parsed ? `⬆ Import ${parsed.trades.length} Trades` : "Select a file first"}
          </button>
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
  const [dark, setDark] = useState(() => {
    try { const s = localStorage.getItem("tt_dark"); return s === null ? true : s === "true"; } catch { return true; }
  });
  const [page, setPage] = useState("calendar");
  const [trades, setTrades] = useState([]);
  const [trash, setTrash] = useState([]); // { ...trade, deletedAt: timestamp (ms) }
  const [deposits, setDeposits] = useState([]);
  const [syncToken, setSyncToken] = useState(() => { try { return localStorage.getItem("ea_sync_token") || ""; } catch { return ""; } });
  const [eaSyncStatus, setEaSyncStatus] = useState(null); // null | "syncing" | { count: N }
  // Multi-account: [{ id, name, token, color, broker }]
  const ACCOUNT_COLORS = ["#00ff88","#3b82f6","#f59e0b","#a855f7","#ef4444","#06b6d4","#10b981","#f97316"];
  const [accounts, setAccounts] = useState([]);
  // Bots: [{ id, name, strategy, symbols, status, mode, params, sourceCode, sourceFileName, token, color, createdAt }]
  const BOT_STRATEGIES = ["Trend Following","Scalping","Grid","Martingale","Mean Reversion","Breakout","Arbitrage","Custom"];
  const [bots, setBots] = useState([]);
  const [botStatuses, setBotStatuses] = useState({}); // { botId: { equity, openTrades, lastPnl, updatedAt } }
  const [currency, setCurrency] = useState(() => { try { return localStorage.getItem("app_currency") || "USD"; } catch { return "USD"; } });
  const [showAddTrade, setShowAddTrade] = useState(false);
  const [showQuickPnl, setShowQuickPnl] = useState(false);
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterMarket, setFilterMarket] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [filterPeriod, setFilterPeriod] = useState("All");
  const [filterAccount, setFilterAccount] = useState("All");
  const [saveStatus, setSaveStatus] = useState(null);
  const saveTimeout = useRef(null);
  const dataLoaded = useRef(false); // tracks whether Firestore data has been fetched
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  // ---- BotsPage persistent state (lifted up to survive re-renders) ----
  const [expandedBot, setExpandedBot] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const [terminalState, setTerminalState] = useState({});
  const [optimizerLog, setOptimizerLog] = useState({});
  const [optimizerEnabled, setOptimizerEnabled] = useState({});
  const [analyticsEaOnly, setAnalyticsEaOnly] = useState({});

  // ---- BotsPage modal/form state (lifted) ----
  const [showAddBot, setShowAddBot] = useState(false);
  const [editParams, setEditParams] = useState({});
  const [newBot, setNewBot] = useState({ name: "", strategy: "Custom", symbols: "EURUSD", lotSize: 0.01, tpPips: 50, slPips: 30, maxDrawdown: 5, maxTrades: 3 });
  const [showAdvancedBot, setShowAdvancedBot] = useState(false);

  // ---- CalendarPage state (lifted) ----
  const [calMonth, setCalMonth] = useState(new Date());
  const [calFilterResult, setCalFilterResult] = useState("All");
  const [calFilterMarket, setCalFilterMarket] = useState("All");
  const [calFilterSide, setCalFilterSide] = useState("All");
  const [capForm, setCapForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: "", type: "deposit", note: "" });
  const [capShowForm, setCapShowForm] = useState(false);

  // ---- TradesPage state (lifted) ----
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showTrash, setShowTrash] = useState(false);

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
          if (snap.exists()) {
            const d = snap.data();
            if (d.trades)    setTrades(d.trades);
            if (d.deposits)  setDeposits(d.deposits);
            // Load trash, auto-purging items older than 30 days
            const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
            if (d.trash)     setTrash(d.trash.filter(t => t.deletedAt > thirtyDaysAgo));
            // Load accounts or migrate legacy single syncToken
            if (d.accounts && d.accounts.length > 0) {
              setAccounts(d.accounts);
            } else if (d.eaSyncToken) {
              setAccounts([{ id: 'acc_1', name: 'Account 1', token: d.eaSyncToken, color: '#00ff88', broker: 'Exness' }]);
            }
            // Load bots and restore sourceCode from localStorage (kept off Firestore to stay under 1MB limit)
            if (d.bots && d.bots.length > 0) {
              const botsWithSource = d.bots.map(b => {
                try {
                  const src  = localStorage.getItem(`botSource_${b.id}`) || "";
                  const name = localStorage.getItem(`botSourceName_${b.id}`) || "";
                  return src ? { ...b, sourceCode: src, sourceFileName: name } : b;
                } catch { return b; }
              });
              setBots(botsWithSource);
            }
          }
        } catch (e) { console.error("Load error:", e); }
        dataLoaded.current = true; // mark that initial load is complete — safe to auto-save now
      }
    });
    return () => unsub();
  }, []);

  // ---- Auto-save trades to Firestore on change ----
  const tradesRef = useRef(trades);
  tradesRef.current = trades;
  const trashRef = useRef(trash);
  trashRef.current = trash;
  const depositsRef = useRef(deposits);
  depositsRef.current = deposits;
  const accountsRef = useRef(accounts);
  accountsRef.current = accounts;
  const botsRef = useRef(bots);
  botsRef.current = bots;
  const userRef = useRef(user);
  userRef.current = user;

  useEffect(() => {
    if (!user || !dataLoaded.current) return; // skip save before initial Firestore load (avoids overwriting with empty)
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      try {
        setSaveStatus("saving");
        // Purge trash items older than 30 days before saving
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const cleanTrash = trashRef.current.filter(t => t.deletedAt > thirtyDaysAgo);
        // Save sourceCode to localStorage (keeps Firestore doc small; avoids 1MB limit with multiple bots)
        botsRef.current.forEach(b => {
          if (b.sourceCode) {
            try { localStorage.setItem(`botSource_${b.id}`, b.sourceCode);
                  localStorage.setItem(`botSourceName_${b.id}`, b.sourceFileName || ""); } catch {}
          }
        });
        await setDoc(doc(db, "users", userRef.current.uid), {
          trades: tradesRef.current, deposits: depositsRef.current,
          trash: cleanTrash, accounts: accountsRef.current,
          // Strip sourceCode before saving — stored in localStorage instead
          bots: botsRef.current.map(({ sourceCode, sourceFileName, ...rest }) => rest),
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (e) { console.error("Save error:", e); setSaveStatus("error"); }
    }, 1500);
  }, [trades, deposits, trash, accounts, bots, user]);

  // ---- EA Sync Token helpers ----
  const makeToken = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

  const generateToken = () => {
    const token = makeToken();
    try { localStorage.setItem("ea_sync_token", token); } catch {}
    setSyncToken(token);
    if (user) setDoc(doc(db, "users", user.uid), { eaSyncToken: token }, { merge: true }).catch(() => {});
    return token;
  };

  // ---- Multi-account management ----
  const addAccount = (name = null, broker = "Exness") => {
    const token = makeToken();
    const newAcct = {
      id: `acc_${Date.now()}`,
      name: name || `Account ${accounts.length + 1}`,
      token,
      color: ACCOUNT_COLORS[accounts.length % ACCOUNT_COLORS.length],
      broker,
      createdAt: new Date().toISOString(),
    };
    setAccounts(prev => [...prev, newAcct]);
    return newAcct;
  };

  const removeAccount = (id) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
  };

  const renameAccount = (id, newName) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, name: newName } : a));
  };

  // ---- Bot management helpers ----
  const addBot = (botData) => {
    const token = makeToken();
    const newBot = {
      id: `bot_${Date.now()}`,
      name: botData.name || "New Bot",
      strategy: botData.strategy || "Custom",
      symbols: botData.symbols || "EURUSD",
      status: "stopped",
      mode: "paper", // paper | live
      params: {
        lotSize: botData.lotSize || 0.01,
        tpPips: botData.tpPips || 50,
        slPips: botData.slPips || 30,
        maxDrawdown: botData.maxDrawdown || 5,
        maxTrades: botData.maxTrades || 3,
        tradeFreq: botData.tradeFreq || "Any",
      },
      sourceCode: botData.sourceCode || "",
      sourceFileName: botData.sourceFileName || "",
      token,
      color: ACCOUNT_COLORS[bots.length % ACCOUNT_COLORS.length],
      createdAt: new Date().toISOString(),
    };
    setBots(prev => [...prev, newBot]);
    return newBot;
  };

  const updateBot = (id, changes) => {
    setBots(prev => prev.map(b => b.id === id ? { ...b, ...changes } : b));
  };

  const deleteBot = (id) => {
    setBots(prev => prev.filter(b => b.id !== id));
  };

  // Send a command to the EA via Firestore (EA polls bot_commands subcollection)
  // NOTE: cmdError uses state (rare), cmdPending uses a ref so it never triggers a
  // parent re-render (which would unmount/remount all page components mid-click).
  const [cmdError, setCmdError] = React.useState(null);
  const cmdPendingRef = React.useRef(false);
  const sendBotCommand = async (botId, action, params = {}) => {
    if (!user || cmdPendingRef.current) return;
    cmdPendingRef.current = true;
    setCmdError(null);
    try {
      // EA matches commands by bot.token (BotID input), not bot.id — resolve token here
      const botObj = botsRef.current.find(b => b.id === botId);
      const commandBotId = botObj?.token || botId; // token = what EA's BotID input holds
      await addDoc(collection(db, "users", user.uid, "bot_commands"), {
        botId: commandBotId, action, params,
        sentAt: new Date().toISOString(),
      });
      // Optimistically update local status (use botId = internal id)
      if (action === "start") updateBot(botId, { status: "running" });
      if (action === "stop") updateBot(botId, { status: "stopped" });
      if (action === "pause") updateBot(botId, { status: "paused" });
      if (action === "setMode") updateBot(botId, { mode: params.mode });
      if (action === "updateParams") updateBot(botId, { params: { ...bots.find(b => b.id === botId)?.params, ...params } });
    } catch (e) {
      console.error("sendBotCommand error:", e);
      const isQuota = e?.message?.includes("resource-exhausted") || e?.code === "resource-exhausted";
      setCmdError(isQuota
        ? "Firestore quota exceeded — check Firebase billing or wait for quota reset."
        : (e?.message || "Command failed. Check your connection."));
      setTimeout(() => setCmdError(null), 8000);
    } finally {
      cmdPendingRef.current = false;
    }
  };

  // Poll bot_status every 15s (setInterval is safe — on quota/network error it
  // simply skips that one call and retries 15s later, unlike onSnapshot which
  // can enter a tight WebSocket reconnect loop and freeze the tab).
  // Change-detection on status+mode prevents spurious auto-saves and re-renders.
  useEffect(() => {
    if (!user) return;
    const pollBotStatus = async () => {
      try {
        const statusCol = collection(db, "users", user.uid, "bot_status");
        const snap = await getDocs(statusCol);
        if (snap.empty) return;
        const statusMap = {};
        snap.forEach(d => { statusMap[d.id] = d.data(); });
        setBotStatuses(statusMap);
        // Only update bots when status/mode actually change (avoids auto-save churn)
        setBots(prev => {
          let changed = false;
          const next = prev.map(b => {
            const s = statusMap[b.id] || statusMap[b.token];
            if (!s) return b;
            const newStatus = s.status || b.status;
            const newMode = (s.mode === "live" || s.mode === "paper") ? s.mode : b.mode;
            if (newStatus === b.status && newMode === b.mode) return b;
            changed = true;
            return { ...b, status: newStatus, mode: newMode };
          });
          return changed ? next : prev;
        });
      } catch (e) {
        console.warn("bot_status poll error:", e?.code || e?.message);
      }
    };
    pollBotStatus();
    const interval = setInterval(pollBotStatus, 15000);
    return () => clearInterval(interval);
  }, [user]); // eslint-disable-line

  // ---- Auto-optimizer: runs every 30 min for bots with optimizer enabled ----
  // Exposed via window so BotsPage can reference optimizerEnabled state
  const [optimizerEnabledGlobal, setOptimizerEnabledGlobal] = React.useState({});
  const optimizerEnabledRef = React.useRef(optimizerEnabledGlobal);
  optimizerEnabledRef.current = optimizerEnabledGlobal;
  const botsForOptimizer = React.useRef(bots);
  botsForOptimizer.current = bots;
  const tradesForOptimizer = React.useRef(trades);
  tradesForOptimizer.current = trades;

  // ---- EA sync: load token from Firestore on login + poll ea_pending ----
  useEffect(() => {
    if (!user) return;
    // Load existing token from Firestore if we don't have one locally
    if (!syncToken) {
      getDoc(doc(db, "users", user.uid)).then(snap => {
        if (snap.exists() && snap.data().eaSyncToken) {
          const t = snap.data().eaSyncToken;
          setSyncToken(t);
          try { localStorage.setItem("ea_sync_token", t); } catch {}
        } else {
          generateToken();
        }
      }).catch(() => {});
    }

    // ---- Persistent ticket tracker (survives trade deletion) ----
    // Stores every ticket the EA has ever sent, so deleting trades doesn't cause re-imports.
    const TICKET_KEY = `ea_seen_tickets_${user.uid}`;
    const getSeenTickets = () => {
      try { return new Set(JSON.parse(localStorage.getItem(TICKET_KEY) || "[]")); }
      catch { return new Set(); }
    };
    const markTicketsSeen = (tickets) => {
      try {
        const seen = getSeenTickets();
        tickets.forEach(t => seen.add(String(t)));
        // Keep only the most recent 5000 tickets to avoid unbounded localStorage growth
        const arr = [...seen];
        localStorage.setItem(TICKET_KEY, JSON.stringify(arr.slice(-5000)));
      } catch {}
    };

    // Poll ea_pending every 20s (setInterval — safe on quota errors, no tight retry loop)
    const pendingCol = collection(db, "users", user.uid, "ea_pending");
    const pollEaPending = async () => {
      try {
        const snap = await getDocs(pendingCol);
        if (snap.empty) return;
        setEaSyncStatus({ count: snap.size });

        const seenTickets = getSeenTickets();
        const imported = [];
        const newTickets = [];

        snap.forEach(d => {
          const data = d.data();
          const ticket = String(data.ticket || d.id); // use doc ID as fallback

          // Always delete the pending doc immediately so it doesn't pile up
          deleteDoc(d.ref).catch(() => {});

          // Skip if we've already imported this ticket before (even if trade was later deleted)
          if (seenTickets.has(ticket)) return;

          const isBuy = (data.type || '').toLowerCase().includes('buy');
          const profit = parseFloat(data.profit || 0);
          const commission = parseFloat(data.commission || 0);
          const swap = parseFloat(data.swap || 0);
          const netPnl = profit + commission + swap;
          const parseDateTime = (dtStr) => {
            if (!dtStr) return { date: new Date().toISOString().split('T')[0], time: '09:30' };
            const clean = String(dtStr).replace(/\./g, '-');
            const parts = clean.split(' ');
            return { date: parts[0] || new Date().toISOString().split('T')[0], time: (parts[1] || '09:30').slice(0, 5) };
          };
          const closeDT = parseDateTime(data.closeTime);
          const symbol = (data.symbol || 'UNKNOWN').toUpperCase();
          const detectMkt = (s) => {
            if (/USDT?$|BTC|ETH|SOL|XRP|BNB/.test(s)) return 'Crypto';
            if (/USD|EUR|GBP|JPY|AUD|NZD|CHF|CAD/.test(s) && s.length <= 7) return 'Forex';
            if (/GOLD|SILVER|XAU|XAG|OIL|GAS/.test(s)) return 'Forex';
            return 'Forex';
          };
          // Match accountToken field → named account
          const incomingToken = data.accountToken || data.syncToken || null;
          const matchedAcct = incomingToken
            ? accountsRef.current.find(a => a.token === incomingToken)
            : accountsRef.current[0]; // fallback: first account
          const accountName = matchedAcct?.name || 'Exness';
          const accountColor = matchedAcct?.color || '#00ff88';

          imported.push({
            id: Date.now() + Math.random(),
            date: closeDT.date, time: closeDT.time,
            market: detectMkt(symbol), symbol,
            side: isBuy ? 'Long' : 'Short',
            source: 'Bot', entryPrice: parseFloat(data.openPrice || 0),
            exitPrice: parseFloat(data.closePrice || 0),
            quantity: parseFloat(data.volume || 1),
            pnl: parseFloat(profit.toFixed(2)),
            fees: parseFloat(Math.abs(commission + swap).toFixed(2)),
            netPnl: parseFloat(netPnl.toFixed(2)),
            strategy: 'EA Auto', emotion: 'Neutral', broker: 'Exness',
            account: accountName, accountColor,
            holdTime: 0, rating: 3, discipline: 3,
            notes: `EA sync · Ticket: ${ticket}`, tags: ['ea-sync'],
          });
          newTickets.push(ticket);
        });

        if (newTickets.length > 0) markTicketsSeen(newTickets);

        if (imported.length > 0) {
          setTrades(prev => [...imported, ...prev]);
        }
        setTimeout(() => setEaSyncStatus(null), 5000);
      } catch (e) {
        console.warn("ea_pending poll error:", e?.code || e?.message);
      }
    };

    pollEaPending();
    const interval = setInterval(pollEaPending, 20000);
    return () => clearInterval(interval);
  }, [user]); // eslint-disable-line

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
    setDeposits([]);
    setPage("calendar");
  };

  // ---- Filter trades ----
  const filteredTrades = useMemo(() => {
    const now = new Date();
    const days = filterPeriod === "7d" ? 7 : filterPeriod === "30d" ? 30 : filterPeriod === "90d" ? 90 : null;
    const cutoff = days ? new Date(now.setDate(now.getDate() - days)) : null;
    return trades.filter(t => {
      if (filterMarket !== "All" && t.market !== filterMarket) return false;
      if (filterSource !== "All" && t.source !== filterSource) return false;
      if (filterAccount !== "All" && (t.account || "All") !== filterAccount) return false;
      if (cutoff && new Date(t.date) < cutoff) return false;
      return true;
    });
  }, [trades, filterMarket, filterSource, filterPeriod, filterAccount]);

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
  const bg         = dark ? "#060612"              : "#f2f2f2";
  const cardBg     = dark ? "rgba(8,14,28,0.7)"   : "#ffffff";
  const textPrimary   = dark ? "#fafafa"           : "#0a0a0a";
  const textSecondary = dark ? "#5a7a6a"           : "#6b6b6b";
  const borderColor   = dark ? "rgba(0,255,136,0.1)" : "#e0e0e0";
  // Accent: neon green in dark, solid black in light (B&W theme)
  const accentBlue    = dark ? "#00ff88"           : "#111111";
  const profitColor   = dark ? "#00ff88"           : "#111111";   // black for profit in light
  const lossColor     = dark ? "#ef4444"           : "#dc2626";

  // ---- Currency-aware formatter (USD or INR) ----
  const currSym = currency === "USD" ? "$" : "₹";
  const formatCurrency = (val) => {
    if (val === undefined || val === null) return `${currSym}0.00`;
    const abs = Math.abs(val);
    const str = abs >= 1_000_000 ? `${currSym}${(abs / 1_000_000).toFixed(2)}M`
              : abs >= 1000      ? `${currSym}${(abs / 1000).toFixed(1)}k`
              : `${currSym}${abs.toFixed(2)}`;
    return val < 0 ? `-${str}` : str;
  };
  const toggleCurrency = () => {
    const next = currency === "USD" ? "INR" : "USD";
    setCurrency(next);
    try { localStorage.setItem("app_currency", next); } catch {}
  };

  const navItems = [
    { id: "calendar", label: "P&L Calendar", icon: Calendar },
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "liveprices", label: "Live Prices", icon: Activity },
    { id: "trades", label: "Trades", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "botvsmanual", label: "Bot vs Manual", icon: Bot },
    { id: "bots", label: "Bot Control", icon: Cpu },
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

  // ---- MT5 Direct Deploy State ----
  const [mt5FolderHandle, setMt5FolderHandle]   = useState(null);
  const [mt5DeployStatus, setMt5DeployStatus]   = useState(null); // { type:'success'|'error', msg }
  const [mt5Deploying,    setMt5Deploying]       = useState(false);

  // IndexedDB helpers for persisting FileSystemDirectoryHandle across sessions
  const IDB_NAME = 'TradeTrackerDB', IDB_STORE = 'settings';
  const idbGet = (key) => new Promise(res => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = e => {
      const r = e.target.result.transaction(IDB_STORE,'readonly').objectStore(IDB_STORE).get(key);
      r.onsuccess = () => res(r.result ?? null);
      r.onerror   = () => res(null);
    };
    req.onerror = () => res(null);
  });
  const idbSet = (key, val) => new Promise(res => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = e => {
      const tx = e.target.result.transaction(IDB_STORE,'readwrite');
      tx.objectStore(IDB_STORE).put(val, key);
      tx.oncomplete = () => res(); tx.onerror = () => res();
    };
    req.onerror = () => res();
  });

  // On mount: restore MT5 folder handle if permission is already granted
  useEffect(() => {
    (async () => {
      try {
        const handle = await idbGet('mt5FolderHandle');
        if (!handle) return;
        const perm = await handle.queryPermission({ mode: 'readwrite' });
        if (perm === 'granted') setMt5FolderHandle(handle);
      } catch (_) { /* IndexedDB / File API not available */ }
    })();
  }, []);

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

  // Auto-fetch prices on mount and every 60s
  useEffect(() => {
    if (!user) return;
    fetchLivePrices();
    fetchPriceHistory();
    const interval = setInterval(fetchLivePrices, 60000);
    return () => clearInterval(interval);
  }, [user, fetchLivePrices, fetchPriceHistory]);

  // ---- Filter Bar ----
  const FilterBar = () => {
    const btnStyle = (active) => ({
      padding: isMobile ? "5px 12px" : "7px 16px",
      borderRadius: 20,
      border: `1px solid ${active ? accentBlue : "rgba(100,100,100,0.2)"}`,
      background: active ? (dark ? "rgba(0,255,136,0.15)" : "rgba(0,255,136,0.08)") : "transparent",
      color: active ? accentBlue : textSecondary,
      fontSize: isMobile ? 11 : 12,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
      flexShrink: 0,
      transition: "all 0.2s",
    });
    const scrollRowStyle = {
      display: "flex", gap: 6, overflowX: "auto", alignItems: "center",
      scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch",
    };
    const multiAccount = accounts.length > 1;
    if (isMobile) {
      return (
        <div style={{ marginBottom: 16 }}>
          <style>{`.fbar-scroll::-webkit-scrollbar{display:none}`}</style>
          {/* Row 1: Market */}
          <div className="fbar-scroll" style={{ ...scrollRowStyle, marginBottom: 6 }}>
            <Filter size={13} color={textSecondary} style={{ flexShrink: 0 }} />
            {["All", "Stocks", "Crypto", "Forex", "Options"].map(m => (
              <button key={m} onClick={() => setFilterMarket(m)} style={btnStyle(filterMarket === m)}>{m}</button>
            ))}
          </div>
          {/* Row 2: Source + divider + Period */}
          <div className="fbar-scroll" style={{ ...scrollRowStyle, marginBottom: multiAccount ? 6 : 0 }}>
            {["All", "Manual", "Bot"].map(s => (
              <button key={s} onClick={() => setFilterSource(s)} style={btnStyle(filterSource === s)}>
                {s === "Bot" ? "🤖 Bot" : s === "Manual" ? "✋ Manual" : s}
              </button>
            ))}
            <span style={{ width: 1, height: 18, background: borderColor, flexShrink: 0, margin: "0 2px" }} />
            {["7d", "30d", "90d", "All"].map(p => (
              <button key={p} onClick={() => setFilterPeriod(p)} style={btnStyle(filterPeriod === p)}>{p}</button>
            ))}
          </div>
          {/* Row 3: Accounts (only when multiple) */}
          {multiAccount && (
            <div className="fbar-scroll" style={scrollRowStyle}>
              <button onClick={() => setFilterAccount("All")} style={btnStyle(filterAccount === "All")}>All Accounts</button>
              {accounts.map(a => (
                <button key={a.id} onClick={() => setFilterAccount(a.name)} style={{
                  ...btnStyle(filterAccount === a.name),
                  borderColor: filterAccount === a.name ? a.color : "rgba(100,100,100,0.2)",
                  color: filterAccount === a.name ? a.color : textSecondary,
                  background: filterAccount === a.name ? `${a.color}22` : "transparent",
                }}>
                  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: a.color, marginRight: 5, verticalAlign: "middle" }} />
                  {a.name}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        <div className="fbar-scroll" style={{ display: "flex", gap: 8, alignItems: "center", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
          <Filter size={14} color={textSecondary} style={{ flexShrink: 0 }} />
          {["All", "Stocks", "Crypto", "Forex", "Options"].map(m => (
            <button key={m} onClick={() => setFilterMarket(m)} style={btnStyle(filterMarket === m)}>{m}</button>
          ))}
          <span style={{ width: 1, height: 20, background: borderColor, flexShrink: 0 }} />
          {["All", "Manual", "Bot"].map(s => (
            <button key={s} onClick={() => setFilterSource(s)} style={btnStyle(filterSource === s)}>
              {s === "Bot" ? "🤖 Bot" : s === "Manual" ? "✋ Manual" : s}
            </button>
          ))}
          <span style={{ width: 1, height: 20, background: borderColor, flexShrink: 0 }} />
          {["7d", "30d", "90d", "All"].map(p => (
            <button key={p} onClick={() => setFilterPeriod(p)} style={btnStyle(filterPeriod === p)}>{p}</button>
          ))}
        </div>
        {/* Account row (only when multiple accounts) */}
        {multiAccount && (
          <div className="fbar-scroll" style={{ display: "flex", gap: 8, alignItems: "center", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            <button onClick={() => setFilterAccount("All")} style={btnStyle(filterAccount === "All")}>All Accounts</button>
            {accounts.map(a => (
              <button key={a.id} onClick={() => setFilterAccount(a.name)} style={{
                ...btnStyle(filterAccount === a.name),
                borderColor: filterAccount === a.name ? a.color : "rgba(100,100,100,0.2)",
                color: filterAccount === a.name ? a.color : textSecondary,
                background: filterAccount === a.name ? `${a.color}22` : "transparent",
              }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: a.color, marginRight: 5, verticalAlign: "middle" }} />
                {a.name}
              </button>
            ))}
          </div>
        )}
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

  // ---- Move trade(s) to trash (30-day recovery window) ----
  const moveToTrash = useCallback((ids) => {
    const idSet = new Set(Array.isArray(ids) ? ids : [ids]);
    const now = Date.now();
    setTrades(prev => {
      const toTrash = prev.filter(t => idSet.has(t.id)).map(t => ({ ...t, deletedAt: now }));
      setTrash(tr => [...toTrash, ...tr]);
      return prev.filter(t => !idSet.has(t.id));
    });
  }, []);

  const restoreFromTrash = useCallback((tradeId) => {
    setTrash(prev => {
      const item = prev.find(t => t.id === tradeId);
      if (!item) return prev;
      const { deletedAt, ...trade } = item; // eslint-disable-line no-unused-vars
      setTrades(p => [trade, ...p]);
      return prev.filter(t => t.id !== tradeId);
    });
  }, []);

  const permanentDelete = useCallback((ids) => {
    const idSet = new Set(Array.isArray(ids) ? ids : [ids]);
    setTrash(prev => prev.filter(t => !idSet.has(t.id)));
  }, []);

  // ---- Delete Trade handler (now sends to trash) ----
  const deleteTrade = useCallback((tradeId) => {
    moveToTrash(tradeId);
  }, [moveToTrash]);

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
        <div style={{ marginBottom: 24, padding: "20px 24px", borderRadius: 16, background: dark ? "linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(6,6,18,0) 60%)" : "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(255,255,255,0) 60%)", border: `1px solid ${dark ? "rgba(0,255,136,0.12)" : "#e8e8e8"}`, position: "relative", overflow: "hidden" }}>
          {/* Subtle star dots in background */}
          {dark && [...Array(12)].map((_, i) => (
            <div key={i} style={{ position: "absolute", width: 2, height: 2, borderRadius: "50%", background: "#00ff88", opacity: 0.3 + (i % 3) * 0.2, top: `${10 + (i * 37) % 80}%`, left: `${5 + (i * 53) % 90}%`, animation: `fadeIn ${1 + i * 0.2}s ease both` }}/>
          ))}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 0.3; }
            }
          `}</style>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: isMobile ? 20 : 28, fontWeight: 800, color: textPrimary }}>
                Welcome back, {user?.displayName?.split(" ")[0] || "Trader"} 🚀
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: textSecondary }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              {metrics.streak > 1 ? ` · 🔥 ${metrics.streak}-trade win streak` : metrics.streak < -1 ? ` · ${Math.abs(metrics.streak)}-trade losing streak` : ""}
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          <div style={{
            background: cardBg, backdropFilter: "blur(12px)",
            borderRadius: 12, padding: 16, border: `1px solid rgba(100,100,100,0.1)`,
            textAlign: "center",
            boxShadow: "0 0 20px rgba(0,255,136,0.1)",
          }}>
            <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 6 }}>📊 Total Trades</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#00ff88" }}>{metrics.totalTrades}</div>
          </div>
          <div style={{
            background: cardBg, backdropFilter: "blur(12px)",
            borderRadius: 12, padding: 16,
            border: metrics.streak > 0 ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(239,68,68,0.3)",
            textAlign: "center",
            boxShadow: metrics.streak > 0 ? "0 0 20px rgba(0,255,136,0.1)" : "0 0 20px rgba(239,68,68,0.1)",
          }}>
            <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 6 }}>Active Streak</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: metrics.streak > 0 ? "#4ade80" : "#f87171" }}>
              {metrics.streak > 0 ? "🔥" : "❄️"} {Math.abs(metrics.streak)} {metrics.streak > 0 ? "W" : "L"}
            </div>
          </div>
          <div style={{
            background: cardBg, backdropFilter: "blur(12px)",
            borderRadius: 12, padding: 16, border: `1px solid rgba(100,100,100,0.1)`,
            textAlign: "center",
            gridColumn: isMobile ? "1 / -1" : "auto",
            boxShadow: bestDay > 0 ? "0 0 20px rgba(0,255,136,0.1)" : "none",
          }}>
            <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, marginBottom: 6 }}>💰 Best Day</div>
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
          <MetricCard dark={dark} icon={currency === "USD" ? DollarSign : IndianRupee} label="Net P&L" value={formatCurrency(metrics.netPnl)} subValue={`Gross: ${formatCurrency(metrics.totalPnl)} | Fees: ${formatCurrency(metrics.fees)}`} trend={metrics.netPnl > 0 ? 12.5 : -8.3} accent={metrics.netPnl >= 0 ? "#16a34a" : "#dc2626"} />
          <MetricCard dark={dark} icon={Target} label="Win Rate" value={`${metrics.winRate.toFixed(1)}%`} subValue={`${metrics.winners}W / ${metrics.losers}L of ${metrics.totalTrades}`} accent="#00ff88" />
          <MetricCard dark={dark} icon={Zap} label="Profit Factor" value={metrics.profitFactor.toFixed(2)} subValue={`Avg Win: ${formatCurrency(metrics.avgWin)} | Avg Loss: ${formatCurrency(metrics.avgLoss)}`} accent="#f59e0b" />
          <MetricCard dark={dark} icon={AlertTriangle} label="Max Drawdown" value={formatCurrency(metrics.maxDrawdown)} subValue={`Sharpe: ${metrics.sharpe.toFixed(2)} | Expectancy: ${formatCurrency(metrics.expectancy)}`} accent="#ef4444" />
        </div>

        {/* Equity Curve */}
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>Equity Curve</h3>
          <style>{`
            @keyframes rocketPulse {
              0%,100% { filter: drop-shadow(0 0 3px #00ff88); }
              50% { filter: drop-shadow(0 0 10px #00ff88); }
            }
          `}</style>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={equityCurve}>
              <defs>
                <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accentBlue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={accentBlue} stopOpacity={0} />
                </linearGradient>
                <filter id="equityCurveGlow" x="-5%" y="-50%" width="110%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1a1a1a" : "#fafafa"} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: textSecondary }} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} />
              <Area type="monotone" dataKey="equity" stroke={accentBlue} fill="url(#eqGrad)" strokeWidth={2.5} filter="url(#equityCurveGlow)"
                dot={(() => {
                  const dotPositions = {};
                  return (dotProps) => {
                    const { cx, cy, index } = dotProps;
                    dotPositions[index] = { x: cx, y: cy };
                    if (index !== equityCurve.length - 1) return <circle key={index} cx={cx} cy={cy} r={0} fill="none"/>;
                    const prev = dotPositions[index - 1];
                    if (!prev) return <circle key={index} cx={cx} cy={cy} r={3} fill={accentBlue}/>;
                    const dx = cx - prev.x;
                    const dy = cy - prev.y;
                    const slope = Math.atan2(dy, dx) * 180 / Math.PI;
                    const rs = 1.1;
                    const glowC = "#00ff88";
                    return (
                      <g key={index} transform={`translate(${cx}, ${cy}) rotate(${slope})`} style={{ animation: "rocketPulse 2s ease-in-out infinite" }}>
                        <ellipse cx={2*rs} cy={0} rx={12*rs} ry={6*rs} fill="#ff6b35"/>
                        <polygon points={`${14*rs},0 ${8*rs},${-5*rs} ${8*rs},${5*rs}`} fill="#ffd700"/>
                        <polygon points={`${-8*rs},${-6*rs} ${-12*rs},${-12*rs} ${-2*rs},${-6*rs}`} fill="#cc4400"/>
                        <polygon points={`${-8*rs},${6*rs} ${-12*rs},${12*rs} ${-2*rs},${6*rs}`} fill="#cc4400"/>
                        <ellipse cx={-14*rs} cy={0} rx={5*rs} ry={3*rs} fill={glowC} opacity="0.9"/>
                        <ellipse cx={-17*rs} cy={0} rx={3*rs} ry={1.5*rs} fill="#fff" opacity="0.6"/>
                        <circle cx={4*rs} cy={0} r={2.5*rs} fill="#87ceeb" stroke="#fff" strokeWidth={0.5*rs}/>
                      </g>
                    );
                  };
                })()}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily P&L Chart */}
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid rgba(100,100,100,0.1)`, marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: textPrimary }}>Daily P&L</h3>
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: textSecondary }}>
              <span>🚀 Profit day</span>
              <span>☄️ Loss day</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailyPnlData}>
              <defs>
                <linearGradient id="profitBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ff88" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#16a34a" stopOpacity="0.7"/>
                </linearGradient>
                <linearGradient id="lossBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.7"/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1a1a1a" : "#fafafa"} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: textSecondary }} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} formatter={(v) => [formatCurrency(v), "P&L"]} />
              <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                {dailyPnlData.map((entry, i) => <Cell key={i} fill={entry.pnl >= 0 ? "url(#profitBar)" : "url(#lossBar)"} />)}
                <LabelList dataKey="pnl" content={(props) => {
                  const { x, y, width, height, value } = props;
                  if (!width || Math.abs(width) < 5) return null;
                  const isProfit = value >= 0;
                  return (
                    <text x={x + width / 2} y={isProfit ? y - 6 : y + height + 16}
                      textAnchor="middle" fontSize={16} dominantBaseline="middle">
                      {isProfit ? "🚀" : "☄️"}
                    </text>
                  );
                }}/>
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
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: textPrimary }}>🛸 Market Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={marketDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4}>
                  {marketDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, fontSize: 13 }} formatter={(v, name) => [`${v} trades`, name]} />
                <Legend wrapperStyle={{ fontSize: 12, color: textSecondary }} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill={dark ? "#00ff88" : "#111"}>
                  {marketDist[0]?.name || ""}
                </text>
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
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: pnlColor(t.netPnl, dark) }}>{formatCurrency(t.netPnl)}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                      background: t.side === "Long" ? "rgba(0,255,136,0.15)" : "rgba(239,68,68,0.15)",
                      color: t.side === "Long" ? "#00ff88" : "#ef4444",
                      display: "inline-block"
                    }}>
                      {t.side}
                    </div>
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
  const TradesPage = () => {
    const visibleTrades = filteredTrades.slice(0, 200);
    const allSelected = visibleTrades.length > 0 && visibleTrades.every(t => selectedIds.has(t.id));
    const someSelected = selectedIds.size > 0;

    // Sort trash newest-deleted first
    const sortedTrash = [...trash].sort((a, b) => b.deletedAt - a.deletedAt);
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

    const toggleOne = (id) => setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    const toggleAll = () => {
      if (allSelected) {
        setSelectedIds(new Set());
      } else {
        setSelectedIds(new Set(visibleTrades.map(t => t.id)));
      }
    };

    const bulkDelete = () => {
      if (!window.confirm(`Move ${selectedIds.size} trade${selectedIds.size > 1 ? "s" : ""} to Trash? You can restore them within 30 days.`)) return;
      moveToTrash([...selectedIds]);
      setSelectedIds(new Set());
    };

    const cbStyle = (checked) => ({
      width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? "#00ff88" : "rgba(100,100,100,0.4)"}`,
      background: checked ? "#00ff88" : "transparent",
      cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.15s",
    });

    const daysLeft = (deletedAt) => {
      const remaining = Math.ceil((deletedAt + THIRTY_DAYS_MS - Date.now()) / (24 * 60 * 60 * 1000));
      return Math.max(0, remaining);
    };

    return (
      <div style={{ position: "relative" }}>
        {/* ── Header row ── */}
        <div style={{ marginBottom: 8 }}>
          {isMobile
            ? <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  {/* Trades / Trash toggle */}
                  <div style={{ display: "flex", background: "rgba(30,30,30,0.8)", borderRadius: 10, padding: 3, gap: 2 }}>
                    <button onClick={() => setShowTrash(false)} style={{
                      padding: "6px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                      background: !showTrash ? (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)") : "transparent",
                      color: !showTrash ? textPrimary : textSecondary, transition: "all 0.2s",
                    }}>Trades</button>
                    <button onClick={() => setShowTrash(true)} style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "6px 12px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                      background: showTrash ? "rgba(239,68,68,0.15)" : "transparent",
                      color: showTrash ? "#ef4444" : textSecondary, transition: "all 0.2s",
                    }}>
                      <Trash2 size={13} />
                      Trash
                      {trash.length > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 900 }}>{trash.length}</span>}
                    </button>
                  </div>
                  {!showTrash && (
                    <button onClick={() => setShowAddTrade(true)} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: "none",
                      background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}><Plus size={14} /> Add Trade</button>
                  )}
                </div>
                {!showTrash && <FilterBar />}
              </>
            : <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {!showTrash && <FilterBar />}
                  {/* Trades / Trash toggle */}
                  <div style={{ display: "flex", background: "rgba(30,30,30,0.8)", borderRadius: 10, padding: 3, gap: 2, flexShrink: 0 }}>
                    <button onClick={() => setShowTrash(false)} style={{
                      padding: "7px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
                      background: !showTrash ? (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)") : "transparent",
                      color: !showTrash ? textPrimary : textSecondary, transition: "all 0.2s",
                    }}>Trades</button>
                    <button onClick={() => setShowTrash(true)} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "7px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer",
                      background: showTrash ? "rgba(239,68,68,0.15)" : "transparent",
                      color: showTrash ? "#ef4444" : textSecondary, transition: "all 0.2s",
                    }}>
                      <Trash2 size={14} />
                      Trash
                      {trash.length > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 900 }}>{trash.length}</span>}
                    </button>
                  </div>
                </div>
                {!showTrash && (
                  <button onClick={() => setShowAddTrade(true)} style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 12, border: "none",
                    background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer", marginLeft: 12, flexShrink: 0,
                  }}><Plus size={16} /> Add Trade</button>
                )}
              </div>
          }
        </div>

        {/* ── TRASH VIEW ── */}
        {showTrash ? (
          <div>
            {/* Trash header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>
                  {sortedTrash.length} item{sortedTrash.length !== 1 ? "s" : ""} in Trash
                </span>
                <span style={{ fontSize: 12, color: textSecondary, marginLeft: 10 }}>Auto-deleted after 30 days</span>
              </div>
              {sortedTrash.length > 0 && (
                <button onClick={() => {
                  if (window.confirm(`Permanently delete all ${sortedTrash.length} items in Trash? This cannot be undone.`)) {
                    permanentDelete(sortedTrash.map(t => t.id));
                  }
                }} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10,
                  border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)",
                  color: "#ef4444", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}><Trash2 size={13} /> Empty Trash</button>
              )}
            </div>

            {sortedTrash.length === 0 ? (
              <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(100,100,100,0.1)`, padding: 60, textAlign: "center", backdropFilter: "blur(12px)" }}>
                <Trash2 size={40} color={textSecondary} style={{ opacity: 0.4, marginBottom: 12 }} />
                <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary, marginBottom: 6 }}>Trash is empty</div>
                <div style={{ fontSize: 13, color: textSecondary }}>Deleted trades appear here for 30 days before being permanently removed.</div>
              </div>
            ) : (
              <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(100,100,100,0.1)`, overflow: "hidden", backdropFilter: "blur(12px)" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "rgba(10,10,10,0.5)" }}>
                        {["Date", "Symbol", "Market", "Side", "P&L", "Net P&L", "Days Left", ""].map(h => (
                          <th key={h || "actions"} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: textSecondary, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTrash.map((t, i) => {
                        const dl = daysLeft(t.deletedAt);
                        const urgentColor = dl <= 3 ? "#ef4444" : dl <= 7 ? "#f59e0b" : textSecondary;
                        return (
                          <tr key={t.id} style={{ borderTop: `1px solid rgba(100,100,100,0.1)`, background: i % 2 === 0 ? "transparent" : "rgba(10,10,10,0.3)", opacity: 0.85 }}>
                            <td style={{ padding: "10px 14px", color: textPrimary, whiteSpace: "nowrap" }}>{t.date}<br /><span style={{ fontSize: 11, color: textSecondary }}>{t.time}</span></td>
                            <td style={{ padding: "10px 14px", fontWeight: 700, color: textPrimary }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><MarketIcon market={t.market} size={14} /> {t.symbol}</div></td>
                            <td style={{ padding: "10px 14px", color: textSecondary }}>{t.market}</td>
                            <td style={{ padding: "10px 14px" }}><span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: t.side === "Long" ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)", color: t.side === "Long" ? "#16a34a" : "#dc2626" }}>{t.side}</span></td>
                            <td style={{ padding: "10px 14px", fontWeight: 700, color: pnlColor(t.pnl, dark), fontFamily: "monospace" }}>{formatCurrency(t.pnl)}</td>
                            <td style={{ padding: "10px 14px", fontWeight: 700, fontFamily: "monospace" }}><span style={{ padding: "2px 8px", borderRadius: 6, background: pnlBg(t.netPnl, dark), color: pnlColor(t.netPnl, dark) }}>{formatCurrency(t.netPnl)}</span></td>
                            <td style={{ padding: "10px 14px" }}>
                              <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: dl <= 3 ? "rgba(239,68,68,0.15)" : dl <= 7 ? "rgba(245,158,11,0.15)" : "rgba(100,100,100,0.15)", color: urgentColor }}>
                                {dl}d left
                              </span>
                            </td>
                            <td style={{ padding: "10px 14px" }}>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => restoreFromTrash(t.id)} title="Restore trade" style={{
                                  background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", borderRadius: 8,
                                  cursor: "pointer", padding: "5px 10px", color: "#00ff88", fontSize: 12, fontWeight: 600,
                                  display: "flex", alignItems: "center", gap: 4,
                                }}><RotateCw size={12} /> Restore</button>
                                <button onClick={() => {
                                  if (window.confirm("Permanently delete this trade? This cannot be undone.")) permanentDelete(t.id);
                                }} title="Delete permanently" style={{
                                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8,
                                  cursor: "pointer", padding: "5px 8px", color: "#ef4444", fontSize: 12, fontWeight: 600,
                                  display: "flex", alignItems: "center", gap: 4,
                                }}><X size={12} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ── Bulk-action bar (slides in when rows selected) ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: someSelected ? "10px 16px" : "0 16px",
              maxHeight: someSelected ? 56 : 0,
              overflow: "hidden",
              marginBottom: someSelected ? 10 : 0,
              borderRadius: 12,
              background: "rgba(239,68,68,0.1)",
              border: someSelected ? "1px solid rgba(239,68,68,0.3)" : "none",
              transition: "all 0.25s ease",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", flex: 1 }}>
                {selectedIds.size} trade{selectedIds.size !== 1 ? "s" : ""} selected
              </span>
              <button onClick={() => setSelectedIds(new Set())} style={{
                padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(100,100,100,0.3)",
                background: "transparent", color: textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Deselect all</button>
              <button onClick={bulkDelete} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 16px", borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 2px 10px rgba(239,68,68,0.4)",
              }}>
                <Trash2 size={14} /> Move to Trash ({selectedIds.size})
              </button>
            </div>

            {/* ── Table ── */}
            <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(100,100,100,0.1)`, overflow: "hidden", backdropFilter: "blur(12px)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "rgba(10,10,10,0.5)" }}>
                      {/* Select-all checkbox */}
                      <th style={{ padding: "12px 10px 12px 16px", width: 36 }}>
                        <div onClick={toggleAll} style={cbStyle(allSelected)}>
                          {allSelected && <span style={{ color: "#000", fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                          {!allSelected && someSelected && visibleTrades.some(t => selectedIds.has(t.id)) && (
                            <span style={{ color: "#00ff88", fontSize: 10, fontWeight: 900, lineHeight: 1 }}>–</span>
                          )}
                        </div>
                      </th>
                      {["Date", "Symbol", "Market", "Side", "Source", "Entry", "Exit", "P&L", "Net P&L", "Strategy", "Emotion", "Rating", ""].map(h => (
                        <th key={h || "actions"} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: textSecondary, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTrades.map((t, i) => {
                      const checked = selectedIds.has(t.id);
                      return (
                        <tr key={t.id} style={{
                          borderTop: `1px solid rgba(100,100,100,0.1)`,
                          background: checked
                            ? "rgba(239,68,68,0.06)"
                            : i % 2 === 0 ? "transparent" : "rgba(10,10,10,0.3)",
                          transition: "background 0.15s",
                        }}>
                          {/* Row checkbox */}
                          <td style={{ padding: "10px 10px 10px 16px" }}>
                            <div onClick={() => toggleOne(t.id)} style={cbStyle(checked)}>
                              {checked && <span style={{ color: "#000", fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                            </div>
                          </td>
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
                            <button onClick={() => deleteTrade(t.id)} title="Move to Trash" style={{
                              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8,
                              cursor: "pointer", padding: "4px 8px", color: "#ef4444", fontSize: 12, fontWeight: 600,
                              display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s",
                            }}><Trash2 size={12} /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredTrades.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", color: textSecondary, fontSize: 14 }}>No trades match the current filters.</div>
              )}
              {filteredTrades.length > 200 && (
                <div style={{ padding: 16, textAlign: "center", color: textSecondary, fontSize: 13 }}>Showing 200 of {filteredTrades.length} trades</div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  // ============================================================
  // PAGE: JOURNAL
  // ============================================================

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
    const today0 = new Date().toISOString().slice(0, 10);

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
            background: dark
              ? "linear-gradient(135deg, rgba(0,229,255,0.10), rgba(0,255,136,0.07))"
              : "#ffffff",
            border: `1px solid ${isManualBalance
              ? (dark ? "rgba(245,158,11,0.3)" : "rgba(245,158,11,0.5)")
              : (dark ? "rgba(0,229,255,0.22)" : "#d0d0d0")}`,
            borderRadius: 10,
            padding: isMobile ? "6px 10px" : "8px 14px",
            flex: isMobile ? "0 0 auto" : undefined,
            minWidth: isMobile ? 0 : 120,
          }}>
            {/* Label row: "Balance" + auto/manual badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
              <span style={{ fontSize: 8, color: textSecondary, letterSpacing: 1.2, textTransform: "uppercase" }}>Balance</span>
              {isManualBalance ? (
                <button onClick={() => { saveBalance(""); }} title="Reset to auto P&L" style={{
                  fontSize: 7, padding: "1px 4px", borderRadius: 3,
                  background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)",
                  color: "#d97706", cursor: "pointer", fontWeight: 700, lineHeight: 1.4,
                }}>MANUAL ✕</button>
              ) : (
                <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 3,
                  background: dark ? "rgba(0,255,136,0.1)" : "rgba(0,0,0,0.07)",
                  border: dark ? "1px solid rgba(0,255,136,0.2)" : "1px solid rgba(0,0,0,0.15)",
                  color: accentBlue, fontWeight: 700, lineHeight: 1.4,
                }}>AUTO</span>
              )}
            </div>
            <input
              value={isManualBalance ? portfolioBalance : (balNum !== 0 ? Math.abs(balNum).toLocaleString("en-IN") : "")}
              onChange={e => saveBalance(e.target.value)}
              placeholder={balNum === 0 ? "No trades yet" : ""}
              style={{
                background: "transparent", border: "none", outline: "none",
                color: balIsNeg ? (dark ? "#f87171" : "#dc2626") : (dark ? "#00ff88" : "#111111"),
                fontSize: isMobile ? 12 : 15, fontWeight: 700,
                width: isMobile ? 80 : "100%", padding: 0,
              }}
            />
            {balNum !== 0 && (
              <div style={{ fontSize: 9, color: textSecondary, marginTop: 1, whiteSpace: "nowrap" }}>
                {balIsNeg ? "-" : "≈ "}${balUsd} USD
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 36, background: dark ? "rgba(255,255,255,0.08)" : "#e0e0e0", flexShrink: 0 }} />

          {/* Converter — takes remaining space */}
          <div style={{
            background: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
            border: dark ? "1px solid rgba(255,255,255,0.09)" : "1px solid #d0d0d0",
            borderRadius: 10,
            padding: isMobile ? "6px 8px" : "8px 12px",
            flex: 1,
            minWidth: 0,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 8, color: textSecondary, letterSpacing: 1.2, textTransform: "uppercase" }}>INR ⇄ USD</span>
              <span style={{
                fontSize: 8,
                background: inrRate
                  ? (dark ? "rgba(0,255,136,0.1)" : "rgba(0,0,0,0.06)")
                  : (dark ? "rgba(255,165,0,0.1)" : "rgba(245,158,11,0.1)"),
                color: inrRate ? accentBlue : "#d97706",
                padding: "1px 5px", borderRadius: 4, whiteSpace: "nowrap",
                border: inrRate
                  ? (dark ? "none" : "1px solid rgba(0,0,0,0.1)")
                  : "none",
              }}>
                {inrRate ? `1 USD = ₹${inrRate.toFixed(2)}` : "Loading…"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                <span style={{ position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: dark ? "rgba(255,200,100,0.85)" : "#888", pointerEvents: "none" }}>₹</span>
                <input
                  value={converterInr}
                  onChange={e => handleConverterInr(e.target.value)}
                  placeholder="INR"
                  style={{
                    width: "100%",
                    background: converterActive === "inr"
                      ? (dark ? "rgba(255,200,100,0.09)" : "rgba(0,0,0,0.04)")
                      : (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"),
                    border: `1px solid ${converterActive === "inr"
                      ? (dark ? "rgba(255,200,100,0.4)" : "rgba(0,0,0,0.3)")
                      : (dark ? "rgba(255,255,255,0.1)" : "#d0d0d0")}`,
                    borderRadius: 6,
                    color: textPrimary,
                    fontSize: isMobile ? 11 : 12,
                    fontWeight: 600,
                    padding: isMobile ? "4px 4px 4px 16px" : "5px 8px 5px 20px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <span style={{ color: textSecondary, fontSize: 12, flexShrink: 0 }}>⇄</span>
              <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                <span style={{ position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: dark ? "rgba(100,200,255,0.85)" : "#888", pointerEvents: "none" }}>$</span>
                <input
                  value={converterUsd}
                  onChange={e => handleConverterUsd(e.target.value)}
                  placeholder="USD"
                  style={{
                    width: "100%",
                    background: converterActive === "usd"
                      ? (dark ? "rgba(100,200,255,0.09)" : "rgba(0,0,0,0.04)")
                      : (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"),
                    border: `1px solid ${converterActive === "usd"
                      ? (dark ? "rgba(100,200,255,0.4)" : "rgba(0,0,0,0.3)")
                      : (dark ? "rgba(255,255,255,0.1)" : "#d0d0d0")}`,
                    borderRadius: 6,
                    color: textPrimary,
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
              background: active
                ? (dark ? "rgba(0,255,136,0.12)" : "rgba(0,0,0,0.07)")
                : (dark ? "rgba(255,255,255,0.05)" : "#ffffff"),
              border: `1px solid ${active
                ? (dark ? "rgba(0,255,136,0.5)" : "rgba(0,0,0,0.4)")
                : (dark ? "rgba(255,255,255,0.1)" : "#d0d0d0")}`,
              borderRadius: 8,
              color: active ? accentBlue : textSecondary,
              fontSize: isMobile ? 11 : 12,
              fontWeight: active ? 700 : 500,
              padding: isMobile ? "5px 22px 5px 8px" : "6px 24px 6px 10px",
              cursor: "pointer",
              outline: "none",
              flex: 1,
              minWidth: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='${active ? (dark ? "%2300ff88" : "%23111") : "%23888"}'/%3E%3C/svg%3E")`,
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
                    <span style={{ fontSize: 11, fontWeight: 700, color: filteredTotalPnl >= 0 ? profitColor : lossColor }}>
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

              // Heat-map intensity based on P&L magnitude
              const monthBestPnl = Math.max(...allDayData.filter(d => d.pnl !== undefined).map(d => Math.abs(d.pnl)), 1);
              const intensity = Math.min(hasTrades && pnl ? Math.abs(pnl) / monthBestPnl : 0, 1);

              // ── Dynamic circle size: profit grows, loss shrinks ──
              const baseSize  = isMobile ? 28 : 32;
              const maxGrow   = isMobile ? 8 : 10;  // subtle: px added at full profit
              const maxShrink = isMobile ? 6 : 7;   // subtle: px removed at full loss
              let circleSize  = baseSize;
              if (hasTrades && pnl > 0) circleSize = baseSize + Math.round(ratio * maxGrow);
              if (hasTrades && pnl < 0) circleSize = baseSize - Math.round(ratio * maxShrink);
              if (isWeekend) circleSize = isMobile ? 22 : 24;

              // ── Circle colours (dark = neon green glow, light = clean B&W) ──
              let circleBg, circleBorder, circleColor, circleGlow = "none";
              if (isToday) {
                if (dark) {
                  circleBg = "rgba(0,255,136,0.15)"; circleBorder = "2.5px solid #00ff88";
                  circleColor = "#00ff88"; circleGlow = "0 0 14px rgba(0,255,136,0.6)";
                } else {
                  circleBg = "#111111"; circleBorder = "2.5px solid #111111";
                  circleColor = "#ffffff"; circleGlow = "0 4px 14px rgba(0,0,0,0.28)";
                }
              } else if (hasTrades && pnl > 0) {
                if (dark) {
                  const a = 0.15 + ratio * 0.25;
                  circleBg = `rgba(22,163,74,${a})`; circleColor = ratio > 0.5 ? "#00ff88" : "#4ade80";
                  circleBorder = `${1.5 + ratio}px solid rgba(0,255,136,${0.3 + ratio * 0.5})`;
                  circleGlow = `0 0 ${6 + Math.round(ratio * 16)}px rgba(0,255,136,${0.2 + ratio * 0.4})`;
                } else {
                  const a = 0.07 + ratio * 0.18;
                  circleBg = `rgba(0,0,0,${a})`; circleColor = "#111111";
                  circleBorder = `${1 + ratio}px solid rgba(0,0,0,${0.25 + ratio * 0.45})`;
                  circleGlow = `0 2px ${4 + Math.round(ratio * 8)}px rgba(0,0,0,${0.08 + ratio * 0.1})`;
                }
              } else if (hasTrades && pnl < 0) {
                circleBg = `rgba(220,38,38,${0.12 + ratio * 0.15})`;
                circleColor = dark ? "#f87171" : "#dc2626";
                circleBorder = `1px solid rgba(220,38,38,${0.3 + ratio * 0.35})`;
                circleGlow = `0 0 ${4 + Math.round(ratio * 8)}px rgba(220,38,38,${dark ? 0.2 : 0.12})`;
              } else if (isWeekend) {
                if (dark) {
                  circleBg = "rgba(239,68,68,0.08)"; circleBorder = "1px solid rgba(239,68,68,0.18)";
                  circleColor = "rgba(239,68,68,0.65)";
                } else {
                  circleBg = "transparent"; circleBorder = "1px solid rgba(0,0,0,0.12)";
                  circleColor = "rgba(0,0,0,0.3)";
                }
              } else {
                if (dark) {
                  circleBg = "rgba(255,255,255,0.05)"; circleBorder = "1px solid rgba(255,255,255,0.08)";
                  circleColor = "rgba(255,255,255,0.45)";
                } else {
                  circleBg = "transparent"; circleBorder = "1px solid rgba(0,0,0,0.1)";
                  circleColor = "rgba(0,0,0,0.45)";
                }
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
                  background: hasTrades && pnl > 0
                    ? `rgba(0,255,136,${0.04 + intensity * 0.12})`
                    : hasTrades && pnl < 0
                    ? `rgba(239,68,68,${0.04 + intensity * 0.12})`
                    : "transparent",
                  border: "none",
                  position: "relative",
                  borderRadius: 8,
                }}>
                  <style>{`
                    @keyframes todayPulse {
                      0%,100% { box-shadow: ${dark ? "0 0 14px rgba(0,255,136,0.55)" : "0 4px 14px rgba(0,0,0,0.22)"}; }
                      50%     { box-shadow: ${dark ? "0 0 26px rgba(0,255,136,0.85)" : "0 6px 22px rgba(0,0,0,0.38)"}; }
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
                    <div style={{ fontSize: isMobile ? 7 : 8, fontWeight: 800, color: accentBlue, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 3 }}>TODAY</div>
                  )}
                  {isWeekend && !isToday && (
                    <div style={{ fontSize: isMobile ? 7 : 8, color: dark ? "rgba(239,68,68,0.5)" : "rgba(0,0,0,0.3)", marginTop: 3 }}>Closed</div>
                  )}
                  {hasTrades && (
                    <div style={{
                      fontSize: isMobile ? 8 : 9, fontWeight: 700,
                      color: pnl > 0
                        ? (dark ? (ratio > 0.6 ? "#00ff88" : "#4ade80") : "#111111")
                        : (dark ? "#f87171" : "#dc2626"),
                      marginTop: 3, whiteSpace: "nowrap",
                    }}>
                      {pnl > 0 ? "+" : ""}{formatCurrency(pnl)}
                      {isVeryProfitable ? " 🚀" : ""}
                      {pnl === Math.max(...allDayData.filter(d => d.pnl !== undefined).map(d => d.pnl), 0) && pnl > 0 ? " 🏆" : ""}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend — circles now (theme-aware) */}
          <div style={{ display: "flex", gap: isMobile ? 12 : 20, justifyContent: "center", flexWrap: "wrap", paddingTop: 14, borderTop: `1px solid rgba(100,100,100,0.08)` }}>
            {(dark ? [
              { size: 18, bg: "rgba(0,255,136,0.15)", border: "2.5px solid #00ff88", glow: "0 0 10px rgba(0,255,136,0.5)", label: "Today" },
              { size: 20, bg: "rgba(22,163,74,0.3)", border: "2px solid rgba(0,255,136,0.6)", glow: "0 0 10px rgba(0,255,136,0.3)", label: "Profit ↑" },
              { size: 12, bg: "rgba(220,38,38,0.18)", border: "1px solid rgba(239,68,68,0.35)", glow: "none", label: "Loss ↓" },
              { size: 12, bg: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", glow: "none", label: "Weekend" },
              { size: 14, bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", glow: "none", label: "No Trades" },
            ] : [
              { size: 18, bg: "#111111", border: "2.5px solid #111111", glow: "0 3px 10px rgba(0,0,0,0.25)", label: "Today" },
              { size: 20, bg: "rgba(0,0,0,0.18)", border: "2px solid rgba(0,0,0,0.55)", glow: "0 2px 8px rgba(0,0,0,0.12)", label: "Profit ↑" },
              { size: 12, bg: "rgba(220,38,38,0.18)", border: "1px solid rgba(220,38,38,0.45)", glow: "none", label: "Loss ↓" },
              { size: 12, bg: "transparent", border: "1px solid rgba(0,0,0,0.15)", glow: "none", label: "Weekend" },
              { size: 14, bg: "transparent", border: "1px solid rgba(0,0,0,0.1)", glow: "none", label: "No Trades" },
            ]).map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: item.size, height: item.size, borderRadius: "50%", background: item.bg, border: item.border, boxShadow: item.glow, flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: textSecondary }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROCKET P&L LINE GRAPH ── */}
        {(() => {
          // Build per-trade series for current visible month
          const monthStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth()+1).padStart(2,'0')}`;
          const monthTrades = [...trades]
            .filter(t => t.date && t.date.startsWith(monthStr))
            .sort((a, b) => a.date.localeCompare(b.date) || (a.time||"").localeCompare(b.time||""));

          if (monthTrades.length < 1) return null; // need at least 1 trade

          // Build cumulative per-trade series — starts at 0, one point per trade after that
          let cum = 0;
          const points = [
            { idx: -1, date: "", time: "", cum: 0, pnl: 0 }, // baseline start
            ...monthTrades.map((t, i) => {
              cum += (parseFloat(t.netPnl) || 0);
              return { idx: i, date: t.date, time: t.time || "", cum: parseFloat(cum.toFixed(2)), pnl: parseFloat(t.netPnl) || 0 };
            }),
          ];
          const totalPnl = cum;
          const bestTrade  = monthTrades.reduce((a,b) => b.netPnl > a.netPnl ? b : a);
          const worstTrade = monthTrades.reduce((a,b) => b.netPnl < a.netPnl ? b : a);

          // SVG dimensions — extra top for milestone labels, extra bottom for timeline
          const W = 600, H = isMobile ? 166 : 200;
          const PAD = { top: 36, right: 28, bottom: 52, left: isMobile ? 38 : 48 };
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
          const lineColor = totalPnl >= 0
            ? (dark ? "#00ff88" : "#111111")
            : (dark ? "#ef4444" : "#dc2626");
          const glowColor = totalPnl >= 0
            ? (dark ? "rgba(0,255,136,0.4)" : "rgba(0,0,0,0.18)")
            : (dark ? "rgba(239,68,68,0.4)" : "rgba(220,38,38,0.3)");
          const fmtK = v => { const a = Math.abs(v); return (v < 0 ? "-" : "+") + (a >= 1000 ? "₹" + (a/1000).toFixed(1) + "K" : "₹" + a); };

          // Y-axis ticks
          const yTicks = [minCum, (minCum+maxCum)/2, maxCum].map(v => ({
            y: yScale(v),
            label: fmtK(v),
          }));

          // Smooth bezier path via Catmull-Rom → Cubic Bezier conversion
          const smoothPathD = (() => {
            if (points.length < 2) return `M${xScale(0).toFixed(1)},${yScale(0).toFixed(1)}`;
            const xs = points.map((_, i) => xScale(i));
            const ys = points.map(p => yScale(p.cum));
            let d = `M${xs[0].toFixed(1)},${ys[0].toFixed(1)}`;
            for (let i = 0; i < xs.length - 1; i++) {
              const x0 = i > 0 ? xs[i-1] : xs[i];
              const y0 = i > 0 ? ys[i-1] : ys[i];
              const x1 = xs[i], y1 = ys[i];
              const x2 = xs[i+1], y2 = ys[i+1];
              const x3 = i+2 < xs.length ? xs[i+2] : x2;
              const y3 = i+2 < ys.length ? ys[i+2] : y2;
              const cp1x = (x1 + (x2-x0)/6).toFixed(1);
              const cp1y = (y1 + (y2-y0)/6).toFixed(1);
              const cp2x = (x2 - (x3-x1)/6).toFixed(1);
              const cp2y = (y2 - (y3-y1)/6).toFixed(1);
              d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2.toFixed(1)},${y2.toFixed(1)}`;
            }
            return d;
          })();

          const monthName = calMonth.toLocaleDateString('en-US', { month: 'short' });

          // Build date groups for timeline below chart
          const dateGroups = {};
          monthTrades.forEach((t, idx) => {
            if (!dateGroups[t.date]) dateGroups[t.date] = [];
            dateGroups[t.date].push(idx + 1); // +1 offset for baseline point at idx 0
          });
          const timelineDates = Object.keys(dateGroups).sort().map(date => {
            const idxs = dateGroups[date];
            const centerIdx = (idxs[0] + idxs[idxs.length-1]) / 2;
            const day = parseInt(date.slice(8));
            return { date, label: `${monthName} ${day}`, centerIdx, firstIdx: idxs[0] };
          });

          // ── Milestone badge pins (Option B) ──
          const MILESTONES_DEF = [
            { value:    25000, icon: "🌍", name: "Low Orbit",       color: "#22d3ee" },
            { value:    50000, icon: "⚡",  name: "Escape Velocity", color: "#00e5ff" },
            { value:   100000, icon: "🌙", name: "Moon Landing",    color: "#a78bfa" },
            { value:   200000, icon: "🔴", name: "Mars Mission",    color: "#f87171" },
            { value:   500000, icon: "🪐", name: "Saturn Ring",     color: "#fbbf24" },
            { value:  1000000, icon: "🌌", name: "Deep Space",      color: "#c0c0ff" },
            { value:  5000000, icon: "🌟", name: "Interstellar",    color: "#ffffff" },
          ];
          const milestoneCrossings = [];
          for (const m of MILESTONES_DEF) {
            if (m.value > maxCum * 1.05) break; // only show milestones the equity reached
            for (let i = 1; i < points.length; i++) {
              if (points[i-1].cum < m.value && points[i].cum >= m.value) {
                const t = (m.value - points[i-1].cum) / (points[i].cum - points[i-1].cum);
                const cx = xScale(i-1) + t * (xScale(i) - xScale(i-1));
                const cy = yScale(m.value);
                milestoneCrossings.push({ ...m, cx, cy });
                break;
              }
            }
          }
          // Next target: first milestone not yet crossed
          const nextMilestoneTarget = MILESTONES_DEF.find(m => m.value > Math.max(totalPnl, 0));

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
                    <div style={{ fontSize: 10, color: textSecondary, marginTop: 2 }}>{points.length - 1} trades · rocket follows your equity</div>
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

                    {/* ── DATE TIMELINE ── */}
                    {/* Axis baseline */}
                    <line
                      x1={PAD.left} y1={PAD.top+gH+8}
                      x2={PAD.left+gW} y2={PAD.top+gH+8}
                      stroke="rgba(255,255,255,0.12)" strokeWidth="1"
                    />
                    {timelineDates.map((td, i) => {
                      const tx = xScale(td.centerIdx);
                      const fx = xScale(td.firstIdx);
                      // Hide label if it would overlap the previous one (min 40px apart)
                      const prevTx = i > 0 ? xScale(timelineDates[i-1].centerIdx) : -999;
                      const tooClose = Math.abs(tx - prevTx) < 42;
                      return (
                        <g key={td.date}>
                          {/* Vertical day divider line */}
                          <line
                            x1={fx} y1={PAD.top+2}
                            x2={fx} y2={PAD.top+gH+8}
                            stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 4"
                          />
                          {/* Tick dot on timeline */}
                          <circle cx={fx} cy={PAD.top+gH+8} r="2.5"
                            fill={lineColor} opacity="0.5"
                          />
                          {/* Date label */}
                          {!tooClose && (
                            <text
                              x={tx} y={PAD.top+gH+22}
                              fill="rgba(255,255,255,0.45)"
                              fontSize={isMobile ? 7.5 : 8.5}
                              textAnchor="middle"
                              fontWeight="600"
                            >{td.label}</text>
                          )}
                          {/* Trade count badge */}
                          {!tooClose && (
                            <text
                              x={tx} y={PAD.top+gH+34}
                              fill="rgba(255,255,255,0.22)"
                              fontSize={isMobile ? 6.5 : 7.5}
                              textAnchor="middle"
                            >{dateGroups[td.date].length} trade{dateGroups[td.date].length > 1 ? "s" : ""}</text>
                          )}
                        </g>
                      );
                    })}

                    {/* Area fill — fades in after line draws */}
                    <path
                      d={`${smoothPathD} L${xScale(points.length-1).toFixed(1)},${yScale(minCum).toFixed(1)} L${xScale(0).toFixed(1)},${yScale(minCum).toFixed(1)} Z`}
                      fill="url(#equityGrad)"
                      style={{ animation: "fadeIn 0.8s ease 1.8s both" }}
                    />

                    {/* Equity line — draws itself (smooth bezier) */}
                    <path
                      d={smoothPathD}
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

                    {/* ── Next milestone ghost target line ── */}
                    {nextMilestoneTarget && (() => {
                      const ny = yScale(nextMilestoneTarget.value);
                      if (ny < PAD.top || ny > PAD.top + gH) return null;
                      return (
                        <g opacity="0.38">
                          <line x1={PAD.left} y1={ny} x2={PAD.left+gW} y2={ny}
                            stroke={nextMilestoneTarget.color} strokeWidth="1" strokeDasharray="5 4"/>
                          <rect x={PAD.left + gW - 96} y={ny - 9} width={94} height={16} rx={8}
                            fill={dark ? "rgba(0,0,20,0.88)" : "rgba(245,245,245,0.95)"}
                            stroke={`${nextMilestoneTarget.color}55`} strokeWidth="1"/>
                          <text x={PAD.left + gW - 49} y={ny + 2}
                            fontSize={7} fontWeight="700" fill={nextMilestoneTarget.color} textAnchor="middle">
                            {nextMilestoneTarget.icon} {nextMilestoneTarget.name} →
                          </text>
                        </g>
                      );
                    })()}

                    {/* ── Milestone achievement badge pins ── */}
                    {milestoneCrossings.map((m, mi) => {
                      const R = isMobile ? 9 : 12;
                      const pinLen = isMobile ? 22 : 28;
                      const goDown = m.cy - (R + pinLen + 14) < PAD.top;
                      const dir = goDown ? 1 : -1;
                      const lx = m.cx;
                      const ly = m.cy + dir * (R + pinLen);
                      const fmtVal = m.value >= 1000000
                        ? `₹${(m.value/1000000).toFixed(0)}M`
                        : `₹${(m.value/1000).toFixed(0)}K`;
                      return (
                        <g key={m.value} style={{ animation: `fadeIn 0.5s ease ${1.5 + mi * 0.18}s both` }}>
                          {/* Outer glow ring */}
                          <circle cx={m.cx} cy={m.cy} r={R + 4}
                            fill="none" stroke={m.color} strokeWidth="0.5" opacity="0.2"/>
                          {/* Pin line */}
                          <line x1={m.cx} y1={m.cy + dir * R} x2={lx} y2={ly}
                            stroke={`${m.color}77`} strokeWidth="1" strokeDasharray="3 2"/>
                          {/* Badge circle */}
                          <circle cx={m.cx} cy={m.cy} r={R}
                            fill={dark ? `${m.color}1a` : `${m.color}22`}
                            stroke={m.color} strokeWidth="1.5"/>
                          <text x={m.cx} y={m.cy - (isMobile ? 1 : 2)}
                            fontSize={isMobile ? 7 : 9} textAnchor="middle">{m.icon}</text>
                          <text x={m.cx} y={m.cy + (isMobile ? 6 : 8)}
                            fontSize={isMobile ? 4.5 : 6} fontWeight="700"
                            fill={m.color} textAnchor="middle">{fmtVal}</text>
                          {/* Floating name label */}
                          {(() => {
                            const lw = isMobile ? 58 : 88;
                            const lh = isMobile ? 11 : 14;
                            const lfs = isMobile ? 5.5 : 7.5;
                            const lrx = Math.max(PAD.left, Math.min(lx, PAD.left + gW - lw / 2));
                            return (
                              <>
                                <rect x={lrx - lw / 2} y={ly + (goDown ? 0 : -lh)} width={lw} height={lh} rx={isMobile ? 5 : 7}
                                  fill={dark ? "rgba(3,3,18,0.92)" : "rgba(255,255,255,0.95)"}
                                  stroke={`${m.color}55`} strokeWidth="1"/>
                                <text x={lrx} y={ly + (goDown ? lh - 2.5 : -2.5)}
                                  fontSize={lfs} fontWeight="700" fill={m.color} textAnchor="middle">
                                  {m.name}
                                </text>
                              </>
                            );
                          })()}
                        </g>
                      );
                    })}

                    {/* 🚀 Rocket — SVG path, nose points RIGHT (+X), rotated by lastSlope */}
                    {(() => {
                      const rs = isMobile ? 0.55 : 0.7; // scale
                      return (
                        <g
                          transform={`translate(${lastX}, ${lastY}) rotate(${lastSlope})`}
                          style={{ animation: `fadeIn 0.4s ease 1.8s both, rocketPulse 2s ease-in-out 2s infinite` }}
                        >
                          {/* Body — nose points RIGHT */}
                          <ellipse cx={2*rs} cy={0} rx={12*rs} ry={6*rs} fill="#ff6b35"/>
                          {/* Nose cone */}
                          <polygon points={`${14*rs},0 ${8*rs},${-5*rs} ${8*rs},${5*rs}`} fill="#ffd700"/>
                          {/* Top fin */}
                          <polygon points={`${-8*rs},${-6*rs} ${-12*rs},${-12*rs} ${-2*rs},${-6*rs}`} fill="#cc4400"/>
                          {/* Bottom fin */}
                          <polygon points={`${-8*rs},${6*rs} ${-12*rs},${12*rs} ${-2*rs},${6*rs}`} fill="#cc4400"/>
                          {/* Exhaust flame */}
                          <ellipse cx={-14*rs} cy={0} rx={5*rs} ry={3*rs} fill={glowColor} opacity="0.9"/>
                          <ellipse cx={-17*rs} cy={0} rx={3*rs} ry={1.5*rs} fill="#fff" opacity="0.6"/>
                          {/* Window */}
                          <circle cx={4*rs} cy={0} r={2.5*rs} fill="#87ceeb" stroke="#fff" strokeWidth={0.5*rs}/>
                        </g>
                      );
                    })()}

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
                    { label: "Best Trade",  value: `+${formatCurrency(bestTrade.netPnl)}`,  color: "#00ff88", sub: bestTrade.date ? bestTrade.date.slice(5) : "" },
                    { label: "Worst Trade", value: formatCurrency(worstTrade.netPnl),        color: "#ef4444", sub: worstTrade.date ? worstTrade.date.slice(5) : "" },
                    { label: "Avg/Trade",   value: formatCurrency(Math.round(totalPnl/(points.length-1))), color: lineColor, sub: "" },
                    { label: "Win Trades",  value: `${points.slice(1).filter(p=>p.pnl>0).length}/${points.length-1}`, color: textPrimary, sub: "" },
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

        {/* ── Capital Tracker ── */}
        {(() => {
          const totalDeposited = deposits.filter(d => d.type === "deposit").reduce((s, d) => s + d.amount, 0);
          const totalWithdrawn = deposits.filter(d => d.type === "withdrawal").reduce((s, d) => s + d.amount, 0);
          const netCapital = totalDeposited - totalWithdrawn;
          const allPnl = trades.reduce((s, t) => s + (parseFloat(t.netPnl) || 0), 0);
          const netAccountValue = netCapital + allPnl;
          const roi = netCapital > 0 ? (allPnl / netCapital) * 100 : null;

          const addEntry = () => {
            const amt = parseFloat(capForm.amount);
            if (!amt || amt <= 0 || !capForm.date) return;
            const entry = { id: Date.now().toString(), date: capForm.date, amount: amt, type: capForm.type, note: capForm.note.trim() };
            setDeposits(prev => [entry, ...prev]);
            setCapForm(f => ({ ...f, amount: "", note: "" }));
            setCapShowForm(false);
          };

          const removeEntry = (id) => setDeposits(prev => prev.filter(d => d.id !== id));

          const inputStyle = {
            background: dark ? "rgba(255,255,255,0.06)" : "#f5f5f5",
            border: `1px solid ${borderColor}`,
            borderRadius: 8, color: textPrimary, fontSize: 13,
            padding: "7px 10px", outline: "none", width: "100%",
          };

          const metrics = [
            { label: "Deposited",      value: formatCurrency(totalDeposited),   color: "#00ff88" },
            { label: "Withdrawn",      value: formatCurrency(totalWithdrawn),    color: "#ef4444" },
            { label: "Net Capital",    value: formatCurrency(netCapital),        color: textPrimary },
            { label: "Total P&L",      value: formatCurrency(allPnl),           color: allPnl >= 0 ? profitColor : lossColor },
            { label: "ROI",            value: roi !== null ? `${roi >= 0 ? "+" : ""}${roi.toFixed(2)}%` : "—", color: roi === null ? textSecondary : roi >= 0 ? profitColor : lossColor },
            { label: "Account Value",  value: formatCurrency(netAccountValue),   color: accentBlue, bold: true },
          ];

          return (
            <div style={{ background: cardBg, borderRadius: 16, padding: isMobile ? 16 : 22, border: `1px solid ${borderColor}`, marginBottom: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: textPrimary }}>💰 Capital Tracker</div>
                  <div style={{ fontSize: 11, color: textSecondary, marginTop: 2 }}>Track deposits, withdrawals & real ROI</div>
                </div>
                <button
                  onClick={() => setCapShowForm(f => !f)}
                  style={{ background: accentBlue, color: dark ? "#000" : "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >{capShowForm ? "Cancel" : "+ Add Entry"}</button>
              </div>

              {/* Add form */}
              {capShowForm && (
                <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderRadius: 10, padding: "14px 14px 10px", marginBottom: 16, border: `1px solid ${borderColor}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 2fr", gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Date</div>
                      <input type="date" value={capForm.date} onChange={e => setCapForm(f => ({ ...f, date: e.target.value }))} style={inputStyle}/>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Amount (₹)</div>
                      <input type="number" placeholder="0.00" value={capForm.amount} onChange={e => setCapForm(f => ({ ...f, amount: e.target.value }))} style={inputStyle} min="0"/>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Type</div>
                      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${borderColor}` }}>
                        {["deposit","withdrawal"].map(t => (
                          <button key={t} onClick={() => setCapForm(f => ({ ...f, type: t }))} style={{
                            flex: 1, padding: "7px 0", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                            background: capForm.type === t ? (t === "deposit" ? "#00ff88" : "#ef4444") : "transparent",
                            color: capForm.type === t ? (t === "deposit" ? "#000" : "#fff") : textSecondary,
                          }}>{t === "deposit" ? "↓ Deposit" : "↑ Withdraw"}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 }}>Note (optional)</div>
                      <input type="text" placeholder="e.g. Monthly top-up" value={capForm.note} onChange={e => setCapForm(f => ({ ...f, note: e.target.value }))} style={inputStyle}/>
                    </div>
                  </div>
                  <button onClick={addEntry} style={{ background: accentBlue, color: dark ? "#000" : "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                    Add {capForm.type === "deposit" ? "Deposit" : "Withdrawal"}
                  </button>
                </div>
              )}

              {/* Summary metrics */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(6,1fr)", gap: isMobile ? 10 : 12, marginBottom: deposits.length > 0 ? 16 : 0 }}>
                {metrics.map(m => (
                  <div key={m.label} style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderRadius: 10, padding: "12px 14px", border: `1px solid ${borderColor}` }}>
                    <div style={{ fontSize: 10, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 6 }}>{m.label}</div>
                    <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: m.bold ? 800 : 700, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Entry history */}
              {deposits.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: textSecondary, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>History</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
                    {deposits.map(d => (
                      <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: `1px solid ${borderColor}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 16 }}>{d.type === "deposit" ? "🟢" : "🔴"}</span>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: d.type === "deposit" ? profitColor : lossColor }}>
                              {d.type === "deposit" ? "+" : "-"}{formatCurrency(d.amount)}
                            </div>
                            <div style={{ fontSize: 10, color: textSecondary }}>{d.date}{d.note ? ` · ${d.note}` : ""}</div>
                          </div>
                        </div>
                        <button onClick={() => removeEntry(d.id)} style={{ background: "none", border: "none", cursor: "pointer", color: textSecondary, fontSize: 16, lineHeight: 1, padding: 4 }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {deposits.length === 0 && !capShowForm && (
                <div style={{ textAlign: "center", padding: "20px 0 4px", color: textSecondary, fontSize: 13 }}>
                  No entries yet — add your first deposit to start tracking ROI
                </div>
              )}
            </div>
          );
        })()}

        {/* Market Session Timers */}
        <MarketSessionTimers />
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
  // PAGE: BOT CONTROL CENTER
  // ============================================================
  const BotsPage = () => {
    const [copiedKey, setCopiedKey] = useState(null);
    const copyText = (text, key) => { navigator.clipboard.writeText(text).then(() => { setCopiedKey(key); setTimeout(() => setCopiedKey(null), 2000); }); };
    const setTerminal = (botId, key, val) => setTerminalState(p => ({ ...p, [botId]: { ...(p[botId] || {}), [key]: val } }));
    const getTerminal = (botId) => terminalState[botId] || { symbol: "EURUSD", lots: 0.01 };
    const COMMON_PAIRS = ["EURUSD","GBPUSD","USDJPY","USDCHF","AUDUSD","USDCAD","NZDUSD","XAUUSD","XAGUSD","BTCUSD","ETHUSD","US30","NAS100","SPX500"];

    const botTab = (id) => activeTab[id] || "overview";
    const addOptimizerLog = (botId, action, reason) => {
      const entry = { ts: new Date().toLocaleString(), action, reason };
      setOptimizerLog(p => ({ ...p, [botId]: [entry, ...(p[botId]||[])].slice(0,50) }));
    };

    // ── Shared trade filter: EA-only or all bot-tagged trades ──
    const getBotTrades = (bot, eaOnly = false) => trades.filter(t => {
      const matchesBot = (t.account === bot.name) ||
        (t.notes && t.notes.includes(bot.token ? bot.token.slice(0, 8) : "NOPE"));
      if (!matchesBot) return false;
      if (eaOnly) return t.source === "Bot"; // only EA-synced trades
      return true;
    });

    // Per-bot stats from trades
    const getBotStats = (bot) => {
      const botTrades = getBotTrades(bot, false); // overview shows all
      const totalPnl = botTrades.reduce((s, t) => s + (t.netPnl || 0), 0);
      const wins = botTrades.filter(t => (t.netPnl || 0) > 0).length;
      const losses = botTrades.filter(t => (t.netPnl || 0) <= 0).length;
      const winRate = botTrades.length ? (wins / botTrades.length * 100).toFixed(1) : 0;
      // Max drawdown
      let peak = 0, maxDd = 0, running = 0;
      botTrades.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(t => {
        running += t.netPnl || 0;
        if (running > peak) peak = running;
        const dd = peak > 0 ? ((peak - running) / peak * 100) : 0;
        if (dd > maxDd) maxDd = dd;
      });
      // Equity curve
      let eq = 0;
      const equityCurve = botTrades.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).map((t, i) => {
        eq += t.netPnl || 0;
        return { i, pnl: parseFloat(eq.toFixed(2)), date: t.date };
      });
      return { count: botTrades.length, totalPnl, wins, losses, winRate, maxDd: maxDd.toFixed(1), equityCurve, botTrades };
    };

    // ── Deep analytics engine ──
    const getDeepAnalytics = (bot, eaOnly = true) => {
      const botTrades = getBotTrades(bot, eaOnly).sort((a, b) => new Date(a.date) - new Date(b.date));
      const manualCount = eaOnly ? getBotTrades(bot, false).length - botTrades.length : 0;

      if (!botTrades.length) return null;

      // By symbol
      const bySymbol = {};
      botTrades.forEach(t => {
        const s = t.symbol || "UNKNOWN";
        if (!bySymbol[s]) bySymbol[s] = { trades:0, wins:0, pnl:0, losses:0 };
        bySymbol[s].trades++;
        bySymbol[s].pnl += t.netPnl || 0;
        if ((t.netPnl||0) > 0) bySymbol[s].wins++; else bySymbol[s].losses++;
      });
      const symbolStats = Object.entries(bySymbol).map(([sym, d]) => ({
        sym, ...d, winRate: (d.wins/d.trades*100).toFixed(1), pnl: parseFloat(d.pnl.toFixed(2))
      })).sort((a,b) => b.pnl - a.pnl);

      // By hour of day
      const byHour = Array(24).fill(null).map((_,h) => ({ h, trades:0, wins:0, pnl:0 }));
      botTrades.forEach(t => {
        const h = t.openTime ? new Date(t.openTime).getHours() : (t.date ? new Date(t.date).getHours() : null);
        if (h == null || isNaN(h)) return;
        byHour[h].trades++;
        byHour[h].pnl += t.netPnl||0;
        if ((t.netPnl||0)>0) byHour[h].wins++;
      });
      const hourStats = byHour.filter(h => h.trades > 0).map(h => ({
        ...h, winRate: (h.wins/h.trades*100).toFixed(1), pnl: parseFloat(h.pnl.toFixed(2))
      }));

      // By day of week
      const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const byDay = days.map(d => ({ d, trades:0, wins:0, pnl:0 }));
      botTrades.forEach(t => {
        const d = t.date ? new Date(t.date).getDay() : null;
        if (d == null || isNaN(d)) return;
        byDay[d].trades++;
        byDay[d].pnl += t.netPnl||0;
        if ((t.netPnl||0)>0) byDay[d].wins++;
      });
      const dayStats = byDay.filter(d => d.trades > 0).map(d => ({
        ...d, winRate: (d.wins/d.trades*100).toFixed(1), pnl: parseFloat(d.pnl.toFixed(2))
      }));

      // Risk-reward ratio
      const winTrades = botTrades.filter(t => (t.netPnl||0)>0);
      const lossTrades = botTrades.filter(t => (t.netPnl||0)<=0);
      const avgWin  = winTrades.length  ? winTrades.reduce((s,t)=>s+(t.netPnl||0),0)/winTrades.length   : 0;
      const avgLoss = lossTrades.length ? Math.abs(lossTrades.reduce((s,t)=>s+(t.netPnl||0),0)/lossTrades.length) : 0;
      const rr = avgLoss > 0 ? (avgWin/avgLoss).toFixed(2) : "∞";

      // Sharpe ratio (simplified, daily returns)
      const dailyPnl = {};
      botTrades.forEach(t => { const d = t.date||""; dailyPnl[d] = (dailyPnl[d]||0)+(t.netPnl||0); });
      const dailyArr = Object.values(dailyPnl);
      const meanR = dailyArr.reduce((s,v)=>s+v,0)/Math.max(dailyArr.length,1);
      const stdR  = Math.sqrt(dailyArr.reduce((s,v)=>s+Math.pow(v-meanR,2),0)/Math.max(dailyArr.length,1));
      const sharpe = stdR > 0 ? (meanR/stdR * Math.sqrt(252)).toFixed(2) : "—";

      // Profit factor
      const grossWin  = winTrades.reduce((s,t)=>s+(t.netPnl||0),0);
      const grossLoss = Math.abs(lossTrades.reduce((s,t)=>s+(t.netPnl||0),0));
      const pf = grossLoss > 0 ? (grossWin/grossLoss).toFixed(2) : "∞";

      // Consecutive losses streak (current)
      let curLossStreak = 0, maxLossStreak = 0, streak = 0;
      [...botTrades].reverse().forEach((t,i) => {
        if (i === 0) { if ((t.netPnl||0) <= 0) curLossStreak = 1; }
        if ((t.netPnl||0) <= 0) { streak++; maxLossStreak = Math.max(maxLossStreak, streak); }
        else streak = 0;
      });

      // Recent trend: last 10 vs previous 10 win rates
      const last10   = botTrades.slice(-10);
      const prev10   = botTrades.slice(-20, -10);
      const wr_last  = last10.length  ? (last10.filter(t=>(t.netPnl||0)>0).length/last10.length*100).toFixed(1) : null;
      const wr_prev  = prev10.length  ? (prev10.filter(t=>(t.netPnl||0)>0).length/prev10.length*100).toFixed(1) : null;
      const trendDir = wr_last && wr_prev ? (parseFloat(wr_last) >= parseFloat(wr_prev) ? "up" : "down") : null;

      return { symbolStats, hourStats, dayStats, rr, sharpe, pf, avgWin: avgWin.toFixed(2), manualCount,
        avgLoss: avgLoss.toFixed(2), curLossStreak, maxLossStreak, wr_last, wr_prev, trendDir, totalTrades: botTrades.length };
    };

    // ── Auto-optimizer engine ──
    const runOptimizer = React.useCallback((bot) => {
      const da = getDeepAnalytics(bot);
      if (!da || da.totalTrades < 10) return; // need enough data
      const p = bot.params || {};
      const actions = [];

      // Rule 1: Win rate < 40% over last 10 trades → reduce lot size 20%
      if (da.wr_last !== null && parseFloat(da.wr_last) < 40) {
        const newLot = parseFloat((p.lotSize * 0.8).toFixed(3));
        if (newLot >= 0.01) {
          actions.push({ param: "lotSize", val: newLot, reason: `Win rate dropped to ${da.wr_last}% (last 10 trades) — reducing lot size` });
        }
      }

      // Rule 2: Win rate > 65% consistently → increase lot size 10% (up to 2x original)
      if (da.wr_last !== null && da.wr_prev !== null &&
          parseFloat(da.wr_last) > 65 && parseFloat(da.wr_prev) > 65) {
        const newLot = parseFloat(Math.min(p.lotSize * 1.1, (p.lotSize||0.01) * 2).toFixed(3));
        actions.push({ param: "lotSize", val: newLot, reason: `Consistent win rate ${da.wr_last}%/${da.wr_prev}% — scaling up lot size` });
      }

      // Rule 3: RR < 1.0 → increase TP by 20%
      if (parseFloat(da.rr) < 1.0 && da.rr !== "∞") {
        const newTp = Math.round(p.tpPips * 1.2);
        actions.push({ param: "tpPips", val: newTp, reason: `Risk/Reward ratio ${da.rr} is below 1.0 — widening TP` });
      }

      // Rule 4: Consecutive losses >= 4 → pause bot
      if (da.curLossStreak >= 4) {
        sendBotCommand(bot.id, "pause", {});
        addOptimizerLog(bot.id, "⏸ Bot PAUSED", `${da.curLossStreak} consecutive losses detected — auto-paused to protect capital`);
        return;
      }

      // Rule 5: Worst symbol losing > 70% of trades → flag it
      const worstSym = da.symbolStats.filter(s => s.trades >= 5 && parseFloat(s.winRate) < 30);
      worstSym.forEach(s => {
        addOptimizerLog(bot.id, `⚠ Poor pair: ${s.sym}`, `${s.sym} win rate is ${s.winRate}% over ${s.trades} trades — consider removing from symbols`);
      });

      // Apply parameter changes
      if (actions.length > 0) {
        const paramUpdate = {};
        actions.forEach(a => { paramUpdate[a.param] = a.val; });
        sendBotCommand(bot.id, "updateParams", paramUpdate);
        actions.forEach(a => addOptimizerLog(bot.id, `🔧 ${a.param} → ${a.val}`, a.reason));
      } else {
        addOptimizerLog(bot.id, "✅ No changes needed", `Performance within acceptable range (WR: ${da.wr_last}%, RR: ${da.rr})`);
      }
    }, [trades, bots]);

    // MQL5 source code: inject credentials + bot token
    const injectCredentials = (sourceCode, userId, syncToken) => {
      let code = sourceCode;
      code = code.replace(/input string UserID\s*=\s*"[^"]*"/g, `input string UserID    = "${userId}"`);
      code = code.replace(/input string SyncToken\s*=\s*"[^"]*"/g, `input string SyncToken = "${syncToken}"`);
      code = code.replace(/input string BotID\s*=\s*"[^"]*"/g, `input string BotID     = "${syncToken}"`);
      return code;
    };

    const downloadModifiedEA = (bot) => {
      if (!bot.sourceCode) return;
      const modified = injectCredentials(bot.sourceCode, user?.uid || "", bot.token);
      const blob = new Blob([modified], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = bot.sourceFileName || `${bot.name.replace(/\s+/g, "_")}.mq5`;
      a.click(); URL.revokeObjectURL(url);
    };

    // ─── Bot Builder: merge user strategy EA with Firestore sync layer ──────────
    const mergeEAWithSync = (sourceCode, userId, syncToken, botName) => {
      // Extract a named MQ5 function + body using brace-counting
      const extractFn = (code, name) => {
        const re = new RegExp(
          `((?:int|void|bool|double|string)\\s+${name}\\s*\\([^)]*\\)\\s*)\\{`
        );
        const m = re.exec(code);
        if (!m) return { body: null, sig: null, start: -1, end: -1 };
        const openPos = m.index + m[0].length - 1; // index of '{'
        let depth = 1, i = openPos + 1;
        while (i < code.length && depth > 0) {
          if (code[i] === '{') depth++;
          else if (code[i] === '}') depth--;
          i++;
        }
        return { body: code.slice(openPos + 1, i - 1), sig: m[1].trim(), start: m.index, end: i };
      };

      const onInit     = extractFn(sourceCode, 'OnInit');
      const onDeinit   = extractFn(sourceCode, 'OnDeinit');
      const onTimer    = extractFn(sourceCode, 'OnTimer');
      const onTick     = extractFn(sourceCode, 'OnTick');
      const onChartEvt = extractFn(sourceCode, 'OnChartEvent');
      const onTrade    = extractFn(sourceCode, 'OnTrade');

      // Strip all On* handlers from user code (in reverse order to preserve positions)
      let baseCode = sourceCode;
      const toStrip = [onInit, onDeinit, onTimer, onTick, onChartEvt, onTrade]
        .filter(h => h.start >= 0)
        .sort((a, b) => b.start - a.start);
      for (const h of toStrip) {
        baseCode = baseCode.slice(0, h.start) + baseCode.slice(h.end);
      }
      baseCode = baseCode.replace(/\n{3,}/g, '\n\n').trim();

      // Insert sync credentials inputs after the last #property / #include line
      const blines = baseCode.split('\n');
      let lastHdrIdx = 0;
      for (let i = 0; i < blines.length; i++) {
        const l = blines[i];
        if (l.startsWith('#property') || l.startsWith('#include') || l.startsWith('#define')) lastHdrIdx = i;
      }
      const credLines = [
        '',
        '// ─── Firestore Sync Credentials (auto-injected by Trading Portfolio Tracker) ─',
        `input string UserID    = "${userId}";    // Your Firebase User ID`,
        `input string SyncToken = "${syncToken}"; // Bot sync token`,
        `input string BotID     = "${syncToken}"; // Bot identifier`,
        `input bool   PaperMode = true;           // true=paper, false=live trading`,
        '// ─────────────────────────────────────────────────────────────────────────────',
        '',
      ];
      blines.splice(lastHdrIdx + 1, 0, ...credLines);
      baseCode = blines.join('\n');

      // ── Static sync layer (String.raw preserves MQ5 backslashes exactly) ──
      const syncLayer = String.raw`

//+------------------------------------------------------------------+
//| FIRESTORE SYNC LAYER — Trading Portfolio Tracker Bot Builder     |
//| Do not edit manually — regenerate from the app if needed        |
//+------------------------------------------------------------------+

string PROJECT_ID = "trading-portfolio-tracke-fe53a";
string API_KEY    = "AIzaSyB-Eptx_RSKdnRHoORppt9pM-uEiSSXHZM";
string BASE_URL;

bool   g_tradingEnabled = false;
bool   g_isPaper        = true;
ulong  g_synced_deals[];
int    g_synced_count   = 0;

//--- HTTP helpers (prefixed Sync_ to avoid collisions with user functions) ---
bool Sync_HttpPost(string url, string body) {
   char post[], result[];
   string rh = "Content-Type: application/json\r\n";
   StringToCharArray(body, post, 0, StringLen(body));
   ArrayResize(post, StringLen(body));
   int code = WebRequest("POST", url, rh, 5000, post, result, rh);
   return (code == 200 || code == 201);
}
bool Sync_HttpPatch(string url, string body) {
   char post[], result[];
   string rh = "Content-Type: application/json\r\n";
   StringToCharArray(body, post, 0, StringLen(body));
   ArrayResize(post, StringLen(body));
   int code = WebRequest("PATCH", url, rh, 5000, post, result, rh);
   return (code == 200 || code == 201);
}
string Sync_HttpGet(string url) {
   char post[], result[];
   string rh = "Accept: application/json\r\n";
   ArrayResize(post, 0);
   WebRequest("GET", url, rh, 5000, post, result, rh);
   return CharArrayToString(result);
}
void Sync_HttpDelete(string url) {
   char post[], result[];
   string rh = "Content-Type: application/json\r\n";
   ArrayResize(post, 0);
   WebRequest("DELETE", url, rh, 5000, post, result, rh);
}

string Sync_EscapeJson(string s) {
   string out = "";
   for(int i = 0; i < StringLen(s); i++) {
      ushort c = StringGetCharacter(s, i);
      if(c == '"')       out += "\"";
      else if(c == '\\') out += "\\";
      else               out += ShortToString(c);
   }
   return out;
}
bool Sync_IsDealSynced(ulong deal) {
   for(int i = 0; i < g_synced_count; i++)
      if(g_synced_deals[i] == deal) return true;
   return false;
}
void Sync_MarkDeal(ulong deal) {
   ArrayResize(g_synced_deals, g_synced_count + 1);
   g_synced_deals[g_synced_count++] = deal;
}
// Extract a stringValue from a Firestore REST JSON response.
// Firestore format: "key": { "stringValue": "actual-value" }
// Strategy: find key → find "stringValue" → walk 3 quotes: q1=closing" of key name,
//           q2=opening" of value, q3=closing" of value → return content between q2+1 and q3.
string Sync_ExtractStr(string resp, string key, int from) {
   int kp = StringFind(resp, "\"" + key + "\"", from); if(kp < 0) return "";
   int sv = StringFind(resp, "stringValue", kp);        if(sv < 0) return "";
   int q1 = StringFind(resp, "\"", sv + 11);            if(q1 < 0) return ""; // closing " of "stringValue" key
   int q2 = StringFind(resp, "\"", q1 + 1);             if(q2 < 0) return ""; // opening " of actual value
   int q3 = StringFind(resp, "\"", q2 + 1);             if(q3 < 0) return ""; // closing " of actual value
   return StringSubstr(resp, q2 + 1, q3 - q2 - 1);
}
string Sync_ExtractBotId(string resp, int from) {
   int kp = StringFind(resp, "\"botId\"", from); if(kp < 0) return "";
   int sv = StringFind(resp, "stringValue", kp); if(sv < 0) return "";
   int q1 = StringFind(resp, "\"", sv + 11);     if(q1 < 0) return "";
   int q2 = StringFind(resp, "\"", q1 + 1);      if(q2 < 0) return "";
   int q3 = StringFind(resp, "\"", q2 + 1);      if(q3 < 0) return "";
   return StringSubstr(resp, q2 + 1, q3 - q2 - 1);
}

//--- Write bot status & open positions to Firestore ---
void WriteStatus() {
   double bal  = AccountInfoDouble(ACCOUNT_BALANCE);
   double eq   = AccountInfoDouble(ACCOUNT_EQUITY);
   double marg = AccountInfoDouble(ACCOUNT_MARGIN);
   double free = AccountInfoDouble(ACCOUNT_MARGIN_FREE);
   double mlvl = (marg > 0) ? (eq / marg * 100.0) : 0;
   string sts  = g_tradingEnabled ? "running" : "stopped";
   string mode = g_isPaper ? "paper" : "live";

   string posArr = "[";
   for(int i = 0; i < PositionsTotal(); i++) {
      ulong tkt = PositionGetTicket(i); if(tkt == 0) continue;
      string sym = PositionGetString(POSITION_SYMBOL);
      string pt  = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY) ? "buy" : "sell";
      if(i > 0) posArr += ",";
      posArr += "{\"ticket\":" + (string)tkt
              + ",\"symbol\":\"" + sym + "\",\"type\":\"" + pt
              + "\",\"volume\":"  + DoubleToString(PositionGetDouble(POSITION_VOLUME),2)
              + ",\"profit\":"    + DoubleToString(PositionGetDouble(POSITION_PROFIT),2)
              + ",\"openPrice\":" + DoubleToString(PositionGetDouble(POSITION_PRICE_OPEN),5) + "}";
   }
   posArr += "]";

   string url = BASE_URL + "/users/" + UserID + "/bot_status/" + BotID + "?key=" + API_KEY;
   string body = "{\"fields\":{"
      + "\"status\":{\"stringValue\":\"" + sts + "\"},"
      + "\"mode\":{\"stringValue\":\"" + mode + "\"},"
      + "\"openTrades\":{\"integerValue\":\"" + (string)PositionsTotal() + "\"},"
      + "\"balance\":{\"doubleValue\":" + DoubleToString(bal,2) + "},"
      + "\"equity\":{\"doubleValue\":" + DoubleToString(eq,2) + "},"
      + "\"margin\":{\"doubleValue\":" + DoubleToString(marg,2) + "},"
      + "\"freeMargin\":{\"doubleValue\":" + DoubleToString(free,2) + "},"
      + "\"marginLevel\":{\"doubleValue\":" + DoubleToString(mlvl,2) + "},"
      + "\"positions\":{\"stringValue\":\"" + Sync_EscapeJson(posArr) + "\"},"
      + "\"updatedAt\":{\"stringValue\":\"" + TimeToString(TimeCurrent(),TIME_DATE|TIME_MINUTES) + "\"}"
      + "}}";
   Sync_HttpPatch(url, body);
}

//--- Helper: get document name (full path) for the document whose fields start before pos ---
string Sync_GetDocName(string resp, int beforePos) {
   int np = 0, lastNp = -1;
   while(true) {
      int fn = StringFind(resp, "\"name\":\"", np);
      if(fn < 0 || fn >= beforePos) break;
      lastNp = fn; np = fn + 1;
   }
   if(lastNp < 0) return "";
   int ns = lastNp + 8, ne = StringFind(resp, "\"", ns);
   return (ne > ns) ? StringSubstr(resp, ns, ne - ns) : "";
}

//--- Poll & process bot commands from Firestore ---
void PollCommands() {
   string url  = BASE_URL + "/users/" + UserID + "/bot_commands?key=" + API_KEY;
   string resp = Sync_HttpGet(url);
   PrintFormat("[SYNC] PollCommands resp len=%d", StringLen(resp));
   // Debug: if response is short or has no botId field, dump the first 300 chars
   if(StringLen(resp) < 300 || StringFind(resp, "\"botId\"", 0) < 0) {
      string preview = StringLen(resp) > 300 ? StringSubstr(resp, 0, 300) : resp;
      PrintFormat("[SYNC] Resp preview: %s", preview);
      PrintFormat("[SYNC] UserID=%s BotID=%s", UserID, BotID);
   }
   if(StringLen(resp) < 10) return;
   int pos = 0;
   while(true) {
      int bp = StringFind(resp, "\"botId\"", pos); if(bp < 0) break;
      string foundId = Sync_ExtractBotId(resp, bp);
      string docName = Sync_GetDocName(resp, bp);
      PrintFormat("[SYNC] cmd botId=%s (want %s)", foundId, BotID);

      if(foundId != BotID) {
         // Delete stale commands that belong to other bots (cleans up accumulated docs)
         if(StringLen(docName) > 0 && StringLen(foundId) > 0)
            Sync_HttpDelete("https://firestore.googleapis.com/v1/" + docName + "?key=" + API_KEY);
         pos = bp + 1; continue;
      }

      string action = Sync_ExtractStr(resp, "action", bp);
      PrintFormat("[SYNC] action=%s", action);
      if(action == "start")  { g_tradingEnabled = true;  Print("[SYNC] >>> Bot STARTED — trading enabled"); }
      if(action == "stop")   { g_tradingEnabled = false; Print("[SYNC] >>> Bot STOPPED"); }
      if(action == "pause")  { g_tradingEnabled = false; Print("[SYNC] >>> Bot PAUSED"); }
      if(action == "setMode") {
         string newMode = Sync_ExtractStr(resp, "mode", bp);
         g_isPaper = (newMode == "paper");
         PrintFormat("[SYNC] Mode set to: %s", newMode);
      }
      if(StringLen(docName) > 0)
         Sync_HttpDelete("https://firestore.googleapis.com/v1/" + docName + "?key=" + API_KEY);
      WriteStatus();
      pos = bp + 1;
   }
}

//--- Sync closed trades to ea_pending in Firestore ---
void SyncClosedTrades() {
   HistorySelect(0, TimeCurrent());
   int total = HistoryDealsTotal();
   for(int i = 0; i < total; i++) {
      ulong tkt = HistoryDealGetTicket(i);
      if(tkt == 0 || Sync_IsDealSynced(tkt)) continue;
      long entry = HistoryDealGetInteger(tkt, DEAL_ENTRY);
      if(entry != DEAL_ENTRY_OUT) continue;
      long dtype = HistoryDealGetInteger(tkt, DEAL_TYPE);
      if(dtype != DEAL_TYPE_BUY && dtype != DEAL_TYPE_SELL) continue;
      string sym   = HistoryDealGetString(tkt, DEAL_SYMBOL);
      double vol   = HistoryDealGetDouble(tkt, DEAL_VOLUME);
      double px    = HistoryDealGetDouble(tkt, DEAL_PRICE);
      double pnl   = HistoryDealGetDouble(tkt, DEAL_PROFIT);
      double comm  = HistoryDealGetDouble(tkt, DEAL_COMMISSION);
      double swap  = HistoryDealGetDouble(tkt, DEAL_SWAP);
      string cTime = TimeToString((datetime)HistoryDealGetInteger(tkt,DEAL_TIME),TIME_DATE|TIME_MINUTES);
      ulong posId  = HistoryDealGetInteger(tkt, DEAL_POSITION_ID);
      double opx   = 0; string oTime = cTime;
      for(int j = 0; j < total; j++) {
         ulong t2 = HistoryDealGetTicket(j); if(t2==0) continue;
         if((ulong)HistoryDealGetInteger(t2,DEAL_POSITION_ID) != posId) continue;
         if(HistoryDealGetInteger(t2,DEAL_ENTRY) != DEAL_ENTRY_IN) continue;
         opx = HistoryDealGetDouble(t2,DEAL_PRICE);
         oTime = TimeToString((datetime)HistoryDealGetInteger(t2,DEAL_TIME),TIME_DATE|TIME_MINUTES);
         break;
      }
      string ttype = (dtype==DEAL_TYPE_BUY) ? "buy" : "sell";
      string url   = BASE_URL + "/users/" + UserID + "/ea_pending?key=" + API_KEY;
      string body  = "{\"fields\":{"
         + "\"ticket\":{\"integerValue\":\"" + (string)tkt + "\"},"
         + "\"symbol\":{\"stringValue\":\"" + sym + "\"},"
         + "\"type\":{\"stringValue\":\"" + ttype + "\"},"
         + "\"volume\":{\"doubleValue\":" + DoubleToString(vol,2) + "},"
         + "\"openTime\":{\"stringValue\":\"" + oTime + "\"},"
         + "\"openPrice\":{\"doubleValue\":" + DoubleToString(opx,5) + "},"
         + "\"closeTime\":{\"stringValue\":\"" + cTime + "\"},"
         + "\"closePrice\":{\"doubleValue\":" + DoubleToString(px,5) + "},"
         + "\"profit\":{\"doubleValue\":" + DoubleToString(pnl,2) + "},"
         + "\"commission\":{\"doubleValue\":" + DoubleToString(comm,2) + "},"
         + "\"swap\":{\"doubleValue\":" + DoubleToString(swap,2) + "},"
         + "\"syncToken\":{\"stringValue\":\"" + SyncToken + "\"},"
         + "\"botID\":{\"stringValue\":\"" + BotID + "\"},"
         + "\"paperMode\":{\"booleanValue\":" + (g_isPaper ? "true" : "false") + "}"
         + "}}";
      if(Sync_HttpPost(url, body)) Sync_MarkDeal(tkt);
   }
}
`;

      // ── Build merged On* handlers combining user code + sync ──
      const ind = body => (body || '').split('\n').map(l => '   ' + l).join('\n');

      // Strip any early return from the user's OnInit so sync startup code always runs
      const cleanInitBody = (onInit.body || '')
        .replace(/\breturn\s*\(?\s*INIT_SUCCEEDED\s*\)?\s*;/g, '// (merged: return moved to end)')
        .replace(/\breturn\s*\(?\s*INIT_FAILED\s*\)?\s*;/g, '// (merged: INIT_FAILED suppressed — check logic)');

      const mergedHandlers = `
int OnInit() {
   BASE_URL = "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents";
   g_isPaper = PaperMode;
   g_tradingEnabled = false;

   //--- User EA initialization ---
${ind(cleanInitBody || '   // (none)')}

   //--- Sync startup ---
   PollCommands();
   SyncClosedTrades();
   WriteStatus();
   EventSetTimer(10);
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason) {
   EventKillTimer();
   g_tradingEnabled = false;
   WriteStatus();
   //--- User EA cleanup ---
${ind(onDeinit.body || '   // (none)')}
}

void OnTimer() {
   //--- User timer logic (e.g. dashboard update) ---
${ind(onTimer.body || '   // (none)')}
   //--- Sync heartbeat (every 10 s) ---
   PollCommands();
   SyncClosedTrades();
   WriteStatus();
}

void OnTick() {
   //--- Sync gate: strategy only runs when bot is Started in the app ---
   if(!g_tradingEnabled) return;
   //--- User strategy logic ---
${ind(onTick.body || '   // (none)')}
}

void OnTrade() {
   SyncClosedTrades();
   WriteStatus();
}
${onChartEvt.body ? `\n${onChartEvt.sig} {\n${onChartEvt.body}\n}` : ''}
`;

      // ── Assemble final file ──
      const fileHeader = `//+------------------------------------------------------------------+
//| ${botName} — Merged EA with Firestore Sync
//| Generated by Trading Portfolio Tracker Bot Builder
//| ─────────────────────────────────────────────────
//| SETUP:
//|  1. Open in MetaEditor and press F7 to compile
//|  2. Tools → Options → Expert Advisors → Allow WebRequest
//|     Add URL: https://firestore.googleapis.com
//|  3. Attach to any chart — then press Start in the app
//+------------------------------------------------------------------+
`;
      return fileHeader + '\n' + baseCode + '\n' + syncLayer + mergedHandlers;
    };

    // Open system folder picker and persist handle in IndexedDB
    const pickMt5Folder = async () => {
      if (!('showDirectoryPicker' in window)) {
        setMt5DeployStatus({ type: 'error', msg: 'Directory picker requires Chrome or Edge on desktop.' });
        setTimeout(() => setMt5DeployStatus(null), 5000);
        return;
      }
      try {
        const handle = await window.showDirectoryPicker({ mode: 'readwrite', startIn: 'documents' });
        await idbSet('mt5FolderHandle', handle);
        setMt5FolderHandle(handle);
        setMt5DeployStatus({ type: 'success', msg: `✓ MT5 folder linked: ${handle.name}` });
        setTimeout(() => setMt5DeployStatus(null), 4000);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setMt5DeployStatus({ type: 'error', msg: `Could not access folder: ${e.message}` });
          setTimeout(() => setMt5DeployStatus(null), 5000);
        }
      }
    };

    const clearMt5Folder = async () => {
      await idbSet('mt5FolderHandle', null);
      setMt5FolderHandle(null);
    };

    // Build merged EA and write directly to MT5 Experts folder (or download as fallback)
    const buildAndDeployEA = async (bot) => {
      if (!bot.sourceCode || mt5Deploying) return;
      setMt5Deploying(true);
      const merged   = mergeEAWithSync(bot.sourceCode, user?.uid || "", bot.token, bot.name);
      const fileName = `${bot.name.replace(/\s+/g, "_")}_SyncReady.mq5`;

      if (mt5FolderHandle) {
        try {
          const perm = await mt5FolderHandle.requestPermission({ mode: 'readwrite' });
          if (perm !== 'granted') throw new Error('Permission denied — please re-link the folder.');
          const fh  = await mt5FolderHandle.getFileHandle(fileName, { create: true });
          const w   = await fh.createWritable();
          await w.write(merged);
          await w.close();
          setMt5DeployStatus({ type: 'success', msg: `✓ ${fileName} saved to "${mt5FolderHandle.name}" — open MetaEditor and press F7 to compile, then attach to chart.` });
          setTimeout(() => setMt5DeployStatus(null), 8000);
        } catch (e) {
          // Permission expired or error — fall back to download + show error
          setMt5DeployStatus({ type: 'error', msg: `Write failed: ${e.message}. File downloaded instead — re-link folder if needed.` });
          setTimeout(() => setMt5DeployStatus(null), 8000);
          const blob = new Blob([merged], { type: 'text/plain' });
          const url  = URL.createObjectURL(blob);
          const a    = document.createElement('a');
          a.href = url; a.download = fileName; a.click(); URL.revokeObjectURL(url);
        }
      } else {
        // No folder linked — regular download
        const blob = new Blob([merged], { type: 'text/plain' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url; a.download = fileName; a.click(); URL.revokeObjectURL(url);
      }
      setMt5Deploying(false);
    };

    // Legacy: download with credentials only (no merge)
    const downloadMergedEA = (bot) => buildAndDeployEA(bot);

    const handleSourceUpload = (botId, file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        // Persist to localStorage immediately so it survives page refresh
        // (sourceCode is kept out of Firestore to avoid the 1MB doc size limit)
        try {
          localStorage.setItem(`botSource_${botId}`, src);
          localStorage.setItem(`botSourceName_${botId}`, file.name);
        } catch {}
        updateBot(botId, { sourceCode: src, sourceFileName: file.name });
      };
      reader.readAsText(file);
    };

    const StatusBadge = ({ status }) => {
      const cfg = {
        running: { color: "#00ff88", bg: "rgba(0,255,136,0.12)", label: "Running", pulse: true },
        paused:  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Paused", pulse: false },
        stopped: { color: "#6b7280", bg: "rgba(107,114,128,0.12)", label: "Stopped", pulse: false },
      }[status] || { color: "#6b7280", bg: "rgba(107,114,128,0.12)", label: status, pulse: false };
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px",
          borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.color}44`,
          fontSize: 11, fontWeight: 700, color: cfg.color }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: cfg.color,
            animation: cfg.pulse ? "botPulse 1.5s ease-in-out infinite" : "none",
          }} />
          {cfg.label}
        </span>
      );
    };

    const ModeBadge = ({ mode }) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px",
        borderRadius: 10, fontSize: 10, fontWeight: 700,
        background: mode === "live" ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.12)",
        color: mode === "live" ? "#ef4444" : "#3b82f6",
        border: `1px solid ${mode === "live" ? "#ef444440" : "#3b82f640"}` }}>
        {mode === "live" ? <Rocket size={9} /> : <FlaskConical size={9} />}
        {mode === "live" ? "LIVE" : "PAPER"}
      </span>
    );

    // Summary stats across all bots
    const allBotTrades = trades.filter(t => t.source === "Bot");
    const totalBotPnl = allBotTrades.reduce((s, t) => s + (t.netPnl || 0), 0);
    const runningCount = bots.filter(b => b.status === "running").length;

    return (
      <div>
        <style>{`
          @keyframes botPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        `}</style>

        {/* ── Page header ── */}
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row", justifyContent: "space-between",
          gap: 12, marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
              <Cpu size={22} color="#00ff88" /> Bot Control Center
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: textSecondary }}>Deploy, test, and monitor all your trading bots from one place.</p>
          </div>
          <button onClick={() => setShowAddBot(true)} style={{
            display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,255,136,0.3)", flexShrink: 0,
          }}><Plus size={16} /> Add Bot</button>
        </div>

        {/* ── Command error toast ── */}
        {cmdError && (
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", borderRadius:10, marginBottom:16,
            background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.35)", color:"#ef4444", fontSize:12, fontWeight:600 }}>
            <AlertTriangle size={14} style={{ flexShrink:0 }} />
            {cmdError}
            <button onClick={() => setCmdError(null)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#ef4444", cursor:"pointer", fontSize:16, lineHeight:1 }}>×</button>
          </div>
        )}

        {/* ── Summary bar ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total Bots", value: bots.length, icon: <Cpu size={16} color="#00ff88" />, color: "#00ff88" },
            { label: "Running", value: runningCount, icon: <CircleDot size={16} color="#00ff88" />, color: "#00ff88" },
            { label: "Paused / Stopped", value: bots.length - runningCount, icon: <Square size={16} color="#f59e0b" />, color: "#f59e0b" },
            { label: "All-Bot P&L", value: formatCurrency(totalBotPnl), icon: totalBotPnl >= 0 ? <TrendingUp size={16} color="#00ff88" /> : <TrendingDown size={16} color="#ef4444" />, color: totalBotPnl >= 0 ? "#00ff88" : "#ef4444" },
          ].map(s => (
            <div key={s.label} style={{ background: cardBg, borderRadius: 12, padding: "14px 16px", border: `1px solid rgba(100,100,100,0.1)`, backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>{s.icon}<span style={{ fontSize: 11, fontWeight: 600, color: textSecondary, textTransform: "uppercase" }}>{s.label}</span></div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── Bot cards ── */}
        {bots.length === 0 ? (
          <div style={{ background: cardBg, borderRadius: 16, padding: "60px 40px", textAlign: "center",
            border: `1px dashed rgba(100,100,100,0.3)`, backdropFilter: "blur(12px)" }}>
            <Cpu size={48} color={textSecondary} style={{ opacity: 0.3, marginBottom: 16 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: textPrimary, marginBottom: 8 }}>No bots yet</div>
            <div style={{ fontSize: 13, color: textSecondary, marginBottom: 24 }}>Add a bot to start managing your automated trading strategies from here.</div>
            <button onClick={() => setShowAddBot(true)} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", fontWeight: 700, cursor: "pointer",
            }}><Plus size={15} /> Add Your First Bot</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {bots.map(bot => {
              const stats = getBotStats(bot);
              const isExpanded = expandedBot === bot.id;
              const liveStatus = botStatuses[bot.id] || botStatuses[bot.token];
              const tab = botTab(bot.id);
              const p = editParams[bot.id] || bot.params;

              return (
                <div key={bot.id} style={{
                  background: cardBg, borderRadius: 16, border: `1px solid ${isExpanded ? bot.color + "55" : "rgba(100,100,100,0.15)"}`,
                  backdropFilter: "blur(12px)", overflow: "hidden", transition: "border-color 0.2s",
                }}>
                  {/* ── Card header ── */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", cursor: "pointer" }}
                    onClick={() => setExpandedBot(isExpanded ? null : bot.id)}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: bot.color, flexShrink: 0,
                      boxShadow: bot.status === "running" ? `0 0 8px ${bot.color}` : "none",
                      animation: bot.status === "running" ? "botPulse 1.5s ease-in-out infinite" : "none" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 800, fontSize: 15, color: textPrimary }}>{bot.name}</span>
                        <StatusBadge status={bot.status} />
                        <ModeBadge mode={bot.mode} />
                        <span style={{ fontSize: 11, color: textSecondary, background: "rgba(100,100,100,0.1)", padding: "2px 7px", borderRadius: 6 }}>{bot.strategy}</span>
                        <span style={{ fontSize: 11, color: textSecondary }}>{bot.symbols}</span>
                      </div>
                    </div>
                    {/* Quick stats */}
                    <div style={{ display: isMobile ? "none" : "flex", gap: 20, alignItems: "center" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: textSecondary, textTransform: "uppercase", fontWeight: 600 }}>P&L</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: stats.totalPnl >= 0 ? "#00ff88" : "#ef4444" }}>{stats.totalPnl >= 0 ? "+" : ""}{formatCurrency(stats.totalPnl)}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: textSecondary, textTransform: "uppercase", fontWeight: 600 }}>Trades</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: textPrimary }}>{stats.count}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: textSecondary, textTransform: "uppercase", fontWeight: 600 }}>Win %</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: textPrimary }}>{stats.winRate}%</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: textSecondary, textTransform: "uppercase", fontWeight: 600 }}>Max DD</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#ef4444" }}>{stats.maxDd}%</div>
                      </div>
                    </div>
                    {/* Control buttons */}
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                      {bot.status !== "running" && (
                        <button onClick={() => sendBotCommand(bot.id, "start")} title="Start" style={{
                          padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                          background: "rgba(0,255,136,0.15)", color: "#00ff88",
                          display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700,
                        }}><Play size={13} /> Start</button>
                      )}
                      {bot.status === "running" && (
                        <button onClick={() => sendBotCommand(bot.id, "pause")} title="Pause" style={{
                          padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                          background: "rgba(245,158,11,0.15)", color: "#f59e0b",
                          display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700,
                        }}><Pause size={13} /> Pause</button>
                      )}
                      {bot.status !== "stopped" && (
                        <button onClick={() => sendBotCommand(bot.id, "stop")} title="Stop" style={{
                          padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                          background: "rgba(239,68,68,0.12)", color: "#ef4444",
                          display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700,
                        }}><Square size={12} /> Stop</button>
                      )}
                      <button onClick={() => deleteBot(bot.id)} title="Remove bot" style={{
                        padding: "6px 8px", borderRadius: 8, border: "1px solid rgba(100,100,100,0.2)",
                        background: "transparent", cursor: "pointer", color: textSecondary,
                        display: "flex", alignItems: "center",
                      }}><X size={13} /></button>
                    </div>
                    <ChevronDown size={15} color={textSecondary} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                  </div>

                  {/* ── Expanded panel ── */}
                  {isExpanded && (
                    <div style={{ borderTop: `1px solid rgba(100,100,100,0.1)` }}>
                      {/* Tabs */}
                      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid rgba(100,100,100,0.1)`, overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {[["overview","Overview",<BarChart3 size={13}/>],["terminal","Terminal",<Terminal size={13}/>],["analytics","Analytics",<TrendingUp size={13}/>],["optimizer","Optimizer",<Cpu size={13}/>],["params","Parameters",<Settings size={13}/>],["source","Source Code",<Code size={13}/>]].map(([tid, tlabel, ticon]) => (
                          <button key={tid} onClick={() => setActiveTab(p => ({ ...p, [bot.id]: tid }))} style={{
                            display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", border: "none",
                            borderBottom: tab === tid ? `2px solid ${bot.color}` : "2px solid transparent",
                            background: "transparent", color: tab === tid ? bot.color : textSecondary,
                            fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
                          }}>{ticon}{tlabel}</button>
                        ))}
                        {/* Mode toggle */}
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, padding: "0 18px" }}>
                          <span style={{ fontSize: 11, color: textSecondary, fontWeight: 600 }}>Mode:</span>
                          <button onClick={() => sendBotCommand(bot.id, "setMode", { mode: bot.mode === "live" ? "paper" : "live" })} style={{
                            display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8, border: "none",
                            cursor: "pointer",
                            background: bot.mode === "live" ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.12)",
                            color: bot.mode === "live" ? "#ef4444" : "#3b82f6",
                            fontSize: 12, fontWeight: 700,
                          }}>
                            {bot.mode === "live" ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                            {bot.mode === "live" ? "Switch to Paper" : "Switch to Live"}
                          </button>
                        </div>
                      </div>

                      <div style={{ padding: "18px 18px" }}>

                        {/* ── OVERVIEW TAB ── */}
                        {tab === "overview" && (
                          <div>
                            {/* ── Sync Token (always visible) ── */}
                            <div style={{ marginBottom: 16, padding: "12px 14px", borderRadius: 12,
                              background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                                🔑 Sync Token — paste this into your EA
                              </div>
                              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                <code style={{ flex: 1, padding: "7px 10px", borderRadius: 8,
                                  background: dark ? "rgba(0,0,0,0.4)" : "#f1f5f9",
                                  border: `1px solid ${borderColor}`, fontSize: 11, color: textPrimary,
                                  wordBreak: "break-all", fontFamily: "monospace", lineHeight: 1.4 }}>
                                  {bot.token}
                                </code>
                                <button onClick={() => copyText(bot.token, `tok_${bot.id}`)} style={{
                                  padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer", flexShrink: 0,
                                  background: copiedKey === `tok_${bot.id}` ? "rgba(0,255,136,0.3)" : "rgba(0,255,136,0.12)",
                                  color: "#00ff88", fontSize: 12, fontWeight: 700, transition: "all 0.2s",
                                }}>{copiedKey === `tok_${bot.id}` ? "✓ Copied!" : "Copy"}</button>
                              </div>
                              <div style={{ fontSize: 10, color: textSecondary, marginTop: 5 }}>
                                Also need your User ID: <code style={{ fontSize: 10, color: textPrimary, background: "rgba(0,0,0,0.3)", padding: "1px 5px", borderRadius: 4 }}>{user?.uid}</code>
                                <button onClick={() => copyText(user?.uid, `uid_${bot.id}`)} style={{
                                  marginLeft: 6, padding: "2px 8px", borderRadius: 5, border: "none", cursor: "pointer",
                                  background: "rgba(100,100,100,0.15)", color: textSecondary, fontSize: 10, fontWeight: 600,
                                }}>{copiedKey === `uid_${bot.id}` ? "✓" : "Copy UID"}</button>
                              </div>
                            </div>

                            {/* Mobile stats row */}
                            <div style={{ display: isMobile ? "grid" : "none", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                              {[
                                ["P&L", stats.totalPnl >= 0 ? `+${formatCurrency(stats.totalPnl)}` : formatCurrency(stats.totalPnl), stats.totalPnl >= 0 ? "#00ff88" : "#ef4444"],
                                ["Trades", stats.count, textPrimary],
                                ["Win Rate", `${stats.winRate}%`, textPrimary],
                                ["Max DD", `${stats.maxDd}%`, "#ef4444"],
                              ].map(([lbl, val, col]) => (
                                <div key={lbl} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "10px 12px" }}>
                                  <div style={{ fontSize: 10, color: textSecondary, fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>{lbl}</div>
                                  <div style={{ fontSize: 15, fontWeight: 800, color: col }}>{val}</div>
                                </div>
                              ))}
                            </div>

                            {/* Equity curve */}
                            {stats.equityCurve.length >= 2 ? (
                              <div style={{ marginBottom: 16 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: textSecondary, marginBottom: 8 }}>Equity Curve</div>
                                <ResponsiveContainer width="100%" height={140}>
                                  <AreaChart data={stats.equityCurve} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                    <defs>
                                      <linearGradient id={`grad_${bot.id}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={bot.color} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={bot.color} stopOpacity={0} />
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" />
                                    <XAxis dataKey="date" hide />
                                    <YAxis width={45} tick={{ fontSize: 10, fill: textSecondary }} />
                                    <Tooltip formatter={v => [formatCurrency(v), "Equity"]} contentStyle={{ background: dark ? "#1a1a1a" : "#fff", border: "1px solid rgba(100,100,100,0.2)", borderRadius: 8, fontSize: 12 }} />
                                    <Area type="monotone" dataKey="pnl" stroke={bot.color} strokeWidth={2} fill={`url(#grad_${bot.id})`} dot={false} />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            ) : (
                              <div style={{ padding: "24px", textAlign: "center", color: textSecondary, fontSize: 13,
                                background: "rgba(0,0,0,0.15)", borderRadius: 10, marginBottom: 16 }}>
                                No trades linked to this bot yet. Start the bot or import trades with this bot's account name.
                              </div>
                            )}

                            {/* Recent trades */}
                            {stats.botTrades.length > 0 && (
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: textSecondary, marginBottom: 8 }}>Recent Trades</div>
                                <div style={{ overflowX: "auto" }}>
                                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                    <thead>
                                      <tr style={{ background: "rgba(0,0,0,0.2)" }}>
                                        {["Date","Symbol","Side","Net P&L","Strategy"].map(h => (
                                          <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: textSecondary, fontSize: 10, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {stats.botTrades.slice(0, 10).map(t => (
                                        <tr key={t.id} style={{ borderTop: "1px solid rgba(100,100,100,0.08)" }}>
                                          <td style={{ padding: "7px 10px", color: textSecondary, whiteSpace: "nowrap" }}>{t.date}</td>
                                          <td style={{ padding: "7px 10px", fontWeight: 700, color: textPrimary }}>{t.symbol}</td>
                                          <td style={{ padding: "7px 10px" }}>
                                            <span style={{ padding: "2px 6px", borderRadius: 5, fontSize: 10, fontWeight: 700,
                                              background: t.side === "Long" ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)",
                                              color: t.side === "Long" ? "#16a34a" : "#dc2626" }}>{t.side}</span>
                                          </td>
                                          <td style={{ padding: "7px 10px", fontWeight: 700, fontFamily: "monospace",
                                            color: (t.netPnl || 0) >= 0 ? "#00ff88" : "#ef4444" }}>{formatCurrency(t.netPnl)}</td>
                                          <td style={{ padding: "7px 10px", color: textSecondary }}>{t.strategy}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Live status from EA */}
                            {liveStatus && (
                              <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10,
                                background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)",
                                display: "flex", gap: 20, flexWrap: "wrap" }}>
                                <div style={{ fontSize: 11, color: textSecondary }}>🟢 EA Live: <b style={{ color: textPrimary }}>Open trades: {liveStatus.openTrades || 0}</b></div>
                                <div style={{ fontSize: 11, color: textSecondary }}>Last sync: <b style={{ color: textPrimary }}>{liveStatus.updatedAt ? new Date(liveStatus.updatedAt).toLocaleTimeString() : "—"}</b></div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* ── TERMINAL TAB ── */}
                        {tab === "terminal" && (() => {
                          const ts = getTerminal(bot.id);
                          const ls = botStatuses[bot.id] || botStatuses[bot.token] || {};
                          // Parse positions JSON string from EA
                          let positions = [];
                          try { if(ls.positions) positions = JSON.parse(ls.positions); } catch(e) {}
                          const totalFloating = positions.reduce((s,p) => s + (p.profit||0) + (p.swap||0), 0);
                          const isLive = bot.mode === "live";
                          return (
                            <div>
                              {/* Live / Paper banner */}
                              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16,
                                padding:"8px 14px", borderRadius:10,
                                background: isLive ? "rgba(239,68,68,0.08)" : "rgba(59,130,246,0.08)",
                                border:`1px solid ${isLive ? "rgba(239,68,68,0.3)" : "rgba(59,130,246,0.3)"}` }}>
                                <span style={{ fontSize:11, fontWeight:700, color: isLive ? "#ef4444" : "#3b82f6" }}>
                                  {isLive ? "🔴 LIVE TRADING" : "🔵 PAPER MODE"}
                                </span>
                                <span style={{ fontSize:11, color:textSecondary }}>
                                  {isLive ? "Real orders will be sent to your broker." : "Orders are simulated — no real money at risk."}
                                </span>
                                {!isLive && (
                                  <button onClick={() => sendBotCommand(bot.id, "setMode", { mode:"live" })}
                                    style={{ marginLeft:"auto", padding:"4px 10px", borderRadius:6, border:"none",
                                      background:"rgba(239,68,68,0.15)", color:"#ef4444",
                                      fontSize:11, fontWeight:700, cursor:"pointer" }}>
                                    Switch to Live
                                  </button>
                                )}
                              </div>

                              {/* Account stats */}
                              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
                                {[
                                  { label:"Balance",      value: ls.balance    != null ? `$${Number(ls.balance).toLocaleString("en",{minimumFractionDigits:2})}` : "—", color:"#00ff88" },
                                  { label:"Equity",       value: ls.equity     != null ? `$${Number(ls.equity).toLocaleString("en",{minimumFractionDigits:2})}` : "—",  color: ls.equity >= ls.balance ? "#00ff88" : "#ef4444" },
                                  { label:"Free Margin",  value: ls.freeMargin != null ? `$${Number(ls.freeMargin).toLocaleString("en",{minimumFractionDigits:2})}` : "—", color:textPrimary },
                                  { label:"Margin Level", value: ls.marginLevel != null ? `${Number(ls.marginLevel).toFixed(1)}%` : "—",
                                    color: ls.marginLevel > 200 ? "#00ff88" : ls.marginLevel > 100 ? "#f59e0b" : "#ef4444" },
                                ].map(s => (
                                  <div key={s.label} style={{ background:"rgba(0,0,0,0.25)", borderRadius:10, padding:"10px 12px", border:`1px solid rgba(100,100,100,0.12)` }}>
                                    <div style={{ fontSize:10, fontWeight:600, color:textSecondary, textTransform:"uppercase", marginBottom:4 }}>{s.label}</div>
                                    <div style={{ fontSize:15, fontWeight:800, color:s.color, fontFamily:"monospace" }}>{s.value}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Quick trade panel */}
                              <div style={{ background:"rgba(0,0,0,0.2)", borderRadius:12, padding:"16px", marginBottom:18,
                                border:`1px solid ${bot.color}33` }}>
                                <div style={{ fontSize:12, fontWeight:700, color:bot.color, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                                  <Zap size={13}/> Quick Trade
                                </div>
                                <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
                                  {/* Symbol picker */}
                                  <div style={{ flex:"1 1 130px" }}>
                                    <label style={{ fontSize:10, fontWeight:600, color:textSecondary, display:"block", marginBottom:4 }}>SYMBOL</label>
                                    <select value={ts.symbol || "EURUSD"}
                                      onChange={e => setTerminal(bot.id, "symbol", e.target.value)}
                                      style={{ width:"100%", padding:"9px 10px", borderRadius:8, border:`1px solid ${borderColor}`,
                                        background: dark ? "rgba(0,0,0,0.5)" : "#f8fafc", color:textPrimary, fontSize:13, fontWeight:700, outline:"none" }}>
                                      {COMMON_PAIRS.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                  </div>
                                  {/* Lot size */}
                                  <div style={{ flex:"0 0 90px" }}>
                                    <label style={{ fontSize:10, fontWeight:600, color:textSecondary, display:"block", marginBottom:4 }}>LOT SIZE</label>
                                    <input type="number" step="0.01" min="0.01"
                                      value={ts.lots || bot.params?.lotSize || 0.01}
                                      onChange={e => setTerminal(bot.id, "lots", parseFloat(e.target.value)||0.01)}
                                      style={{ width:"100%", padding:"9px 10px", borderRadius:8, border:`1px solid ${borderColor}`,
                                        background: dark ? "rgba(0,0,0,0.5)" : "#f8fafc", color:textPrimary,
                                        fontSize:13, fontWeight:700, fontFamily:"monospace", outline:"none", boxSizing:"border-box" }}/>
                                  </div>
                                  {/* TP pips */}
                                  <div style={{ flex:"0 0 80px" }}>
                                    <label style={{ fontSize:10, fontWeight:600, color:textSecondary, display:"block", marginBottom:4 }}>TP (pips)</label>
                                    <input type="number" step="1" min="0"
                                      value={ts.tp || bot.params?.tpPips || 50}
                                      onChange={e => setTerminal(bot.id, "tp", parseInt(e.target.value)||0)}
                                      style={{ width:"100%", padding:"9px 10px", borderRadius:8, border:`1px solid ${borderColor}`,
                                        background: dark ? "rgba(0,0,0,0.5)" : "#f8fafc", color:textPrimary,
                                        fontSize:13, fontWeight:700, fontFamily:"monospace", outline:"none", boxSizing:"border-box" }}/>
                                  </div>
                                  {/* SL pips */}
                                  <div style={{ flex:"0 0 80px" }}>
                                    <label style={{ fontSize:10, fontWeight:600, color:textSecondary, display:"block", marginBottom:4 }}>SL (pips)</label>
                                    <input type="number" step="1" min="0"
                                      value={ts.sl || bot.params?.slPips || 30}
                                      onChange={e => setTerminal(bot.id, "sl", parseInt(e.target.value)||0)}
                                      style={{ width:"100%", padding:"9px 10px", borderRadius:8, border:`1px solid ${borderColor}`,
                                        background: dark ? "rgba(0,0,0,0.5)" : "#f8fafc", color:textPrimary,
                                        fontSize:13, fontWeight:700, fontFamily:"monospace", outline:"none", boxSizing:"border-box" }}/>
                                  </div>
                                  {/* BUY */}
                                  <button onClick={() => sendBotCommand(bot.id, "buy", {
                                      symbol: ts.symbol||"EURUSD",
                                      lots: ts.lots||bot.params?.lotSize||0.01,
                                      tp: ts.tp||bot.params?.tpPips||50,
                                      sl: ts.sl||bot.params?.slPips||30
                                    })} style={{ flex:"0 0 auto", padding:"9px 22px", borderRadius:9, border:"none",
                                      background:"linear-gradient(135deg,#16a34a,#15803d)",
                                      color:"#fff", fontSize:13, fontWeight:800,
                                      cursor:"pointer", letterSpacing:1 }}>
                                    ▲ BUY
                                  </button>
                                  {/* SELL */}
                                  <button onClick={() => sendBotCommand(bot.id, "sell", {
                                      symbol: ts.symbol||"EURUSD",
                                      lots: ts.lots||bot.params?.lotSize||0.01,
                                      tp: ts.tp||bot.params?.tpPips||50,
                                      sl: ts.sl||bot.params?.slPips||30
                                    })} style={{ flex:"0 0 auto", padding:"9px 22px", borderRadius:9, border:"none",
                                      background:"linear-gradient(135deg,#dc2626,#b91c1c)",
                                      color:"#fff", fontSize:13, fontWeight:800,
                                      cursor:"pointer", letterSpacing:1 }}>
                                    ▼ SELL
                                  </button>
                                  {/* Close All */}
                                  <button onClick={() => {
                                      if(window.confirm(`Close ALL open positions on ${bot.name}?`))
                                        sendBotCommand(bot.id, "closeAll", {});
                                    }} style={{ flex:"0 0 auto", padding:"9px 14px", borderRadius:9,
                                      border:`1px solid rgba(239,68,68,0.3)`, background:"rgba(239,68,68,0.08)",
                                      color:"#ef4444", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                                    Close All
                                  </button>
                                </div>
                              </div>

                              {/* Open positions */}
                              <div>
                                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:textSecondary }}>
                                    Open Positions ({positions.length})
                                  </div>
                                  {positions.length > 0 && (
                                    <div style={{ fontSize:12, fontWeight:700,
                                      color: totalFloating >= 0 ? "#00ff88" : "#ef4444" }}>
                                      Floating: {totalFloating >= 0 ? "+" : ""}${totalFloating.toFixed(2)}
                                    </div>
                                  )}
                                </div>
                                {positions.length === 0 ? (
                                  <div style={{ padding:"24px", textAlign:"center", color:textSecondary, fontSize:13,
                                    background:"rgba(0,0,0,0.15)", borderRadius:10,
                                    border:`1px dashed rgba(100,100,100,0.2)` }}>
                                    {ls.updatedAt ? "No open positions right now." : "EA not connected — start the bot and attach EA to a chart."}
                                  </div>
                                ) : (
                                  <div style={{ overflowX:"auto" }}>
                                    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                                      <thead>
                                        <tr style={{ background:"rgba(0,0,0,0.3)" }}>
                                          {["Ticket","Symbol","Type","Lots","Open","Current","P&L","Swap","SL","TP","Opened",""].map(h => (
                                            <th key={h} style={{ padding:"7px 8px", textAlign:"left", fontWeight:700,
                                              color:textSecondary, fontSize:10, textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {positions.map(pos => (
                                          <tr key={pos.ticket} style={{ borderTop:"1px solid rgba(100,100,100,0.1)", transition:"background 0.15s" }}
                                            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                                            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontSize:10, color:textSecondary }}>{pos.ticket}</td>
                                            <td style={{ padding:"7px 8px", fontWeight:800, color:textPrimary }}>{pos.symbol}</td>
                                            <td style={{ padding:"7px 8px" }}>
                                              <span style={{ padding:"2px 7px", borderRadius:5, fontSize:10, fontWeight:700,
                                                background: pos.type==="buy" ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)",
                                                color: pos.type==="buy" ? "#16a34a" : "#dc2626" }}>
                                                {pos.type?.toUpperCase()}
                                              </span>
                                            </td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace" }}>{pos.volume}</td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontSize:11 }}>{pos.openPrice?.toFixed(5)}</td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontSize:11 }}>{pos.currentPrice?.toFixed(5)}</td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontWeight:700,
                                              color:(pos.profit||0)>=0?"#00ff88":"#ef4444" }}>
                                              {(pos.profit||0)>=0?"+":""}{(pos.profit||0).toFixed(2)}
                                            </td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontSize:11, color:textSecondary }}>{(pos.swap||0).toFixed(2)}</td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontSize:11, color:"#ef4444" }}>{pos.sl?.toFixed(5)||"—"}</td>
                                            <td style={{ padding:"7px 8px", fontFamily:"monospace", fontSize:11, color:"#00ff88" }}>{pos.tp?.toFixed(5)||"—"}</td>
                                            <td style={{ padding:"7px 8px", fontSize:11, color:textSecondary, whiteSpace:"nowrap" }}>{pos.openTime}</td>
                                            <td style={{ padding:"7px 8px" }}>
                                              <button onClick={() => sendBotCommand(bot.id, "close", { ticket: pos.ticket })}
                                                style={{ padding:"3px 8px", borderRadius:5, border:`1px solid rgba(239,68,68,0.3)`,
                                                  background:"rgba(239,68,68,0.08)", color:"#ef4444",
                                                  fontSize:10, fontWeight:700, cursor:"pointer" }}>
                                                ✕ Close
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                                {ls.updatedAt && (
                                  <div style={{ marginTop:8, fontSize:10, color:textSecondary, textAlign:"right" }}>
                                    Last sync from EA: {ls.updatedAt}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* ── ANALYTICS TAB ── */}
                        {tab === "analytics" && (() => {
                          const eaOnly = analyticsEaOnly[bot.id] !== false; // default true
                          const da = getDeepAnalytics(bot, eaOnly);
                          const allDa = getDeepAnalytics(bot, false);
                          const filteredOut = allDa ? (getBotTrades(bot, false).length - getBotTrades(bot, true).length) : 0;
                          if (!da) return (
                            <div style={{ padding:"40px", textAlign:"center", color:textSecondary, fontSize:13,
                              background:"rgba(0,0,0,0.1)", borderRadius:12 }}>
                              Not enough trade data yet. The bot needs at least a few synced trades to run analytics.
                            </div>
                          );
                          const statCard = (label, value, color, sub) => (
                            <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:10, padding:"12px 14px", border:"1px solid rgba(100,100,100,0.12)" }}>
                              <div style={{ fontSize:10, fontWeight:600, color:textSecondary, textTransform:"uppercase", marginBottom:4 }}>{label}</div>
                              <div style={{ fontSize:18, fontWeight:800, color:color||textPrimary, fontFamily:"monospace" }}>{value}</div>
                              {sub && <div style={{ fontSize:10, color:textSecondary, marginTop:3 }}>{sub}</div>}
                            </div>
                          );
                          const barColor = (v, max) => {
                            const pct = Math.min(Math.abs(v)/max, 1);
                            return v >= 0 ? `rgba(0,255,136,${0.15+pct*0.6})` : `rgba(239,68,68,${0.15+pct*0.6})`;
                          };
                          return (
                            <div>
                              {/* EA-only filter toggle */}
                              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                                padding:"10px 14px", borderRadius:10, marginBottom:16,
                                background:"rgba(0,0,0,0.2)", border:"1px solid rgba(100,100,100,0.15)" }}>
                                <div>
                                  <span style={{ fontSize:12, fontWeight:700, color:textPrimary }}>
                                    {eaOnly ? "🤖 EA trades only" : "📊 All trades (EA + Manual)"}
                                  </span>
                                  {eaOnly && filteredOut > 0 && (
                                    <span style={{ fontSize:11, color:"#f59e0b", marginLeft:8 }}>
                                      {filteredOut} manual trade{filteredOut!==1?"s":""} excluded
                                    </span>
                                  )}
                                  {!eaOnly && filteredOut > 0 && (
                                    <span style={{ fontSize:11, color:textSecondary, marginLeft:8 }}>
                                      includes {filteredOut} manual trade{filteredOut!==1?"s":""}
                                    </span>
                                  )}
                                </div>
                                <button onClick={() => setAnalyticsEaOnly(p => ({ ...p, [bot.id]: !eaOnly }))}
                                  style={{ padding:"5px 12px", borderRadius:7, border:`1px solid ${eaOnly?"rgba(0,255,136,0.3)":"rgba(100,100,100,0.3)"}`,
                                    background: eaOnly ? "rgba(0,255,136,0.1)" : "rgba(100,100,100,0.1)",
                                    color: eaOnly ? "#00ff88" : textSecondary,
                                    fontSize:11, fontWeight:700, cursor:"pointer" }}>
                                  {eaOnly ? "Show all trades" : "EA trades only"}
                                </button>
                              </div>

                              {/* Key metrics */}
                              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
                                {statCard("Profit Factor", da.pf, parseFloat(da.pf)>=1?"#00ff88":"#ef4444", "Gross win / gross loss")}
                                {statCard("Risk/Reward", da.rr, parseFloat(da.rr)>=1?"#00ff88":"#f59e0b", `Avg win $${da.avgWin} / avg loss $${da.avgLoss}`)}
                                {statCard("Sharpe Ratio", da.sharpe, parseFloat(da.sharpe)>1?"#00ff88":parseFloat(da.sharpe)>0?"#f59e0b":"#ef4444", "Annualized")}
                                {statCard("Max Loss Streak", da.maxLossStreak, da.maxLossStreak>=5?"#ef4444":da.maxLossStreak>=3?"#f59e0b":textPrimary, `Current: ${da.curLossStreak} in a row`)}
                              </div>

                              {/* Recent trend */}
                              {da.wr_last && (
                                <div style={{ padding:"10px 14px", borderRadius:10, marginBottom:20,
                                  background: da.trendDir==="up" ? "rgba(0,255,136,0.06)" : "rgba(239,68,68,0.06)",
                                  border:`1px solid ${da.trendDir==="up" ? "rgba(0,255,136,0.25)" : "rgba(239,68,68,0.25)"}` }}>
                                  <span style={{ fontSize:12, fontWeight:700, color: da.trendDir==="up"?"#00ff88":"#ef4444" }}>
                                    {da.trendDir==="up" ? "📈" : "📉"} Recent trend: {da.trendDir==="up" ? "Improving" : "Declining"}
                                  </span>
                                  <span style={{ fontSize:12, color:textSecondary, marginLeft:10 }}>
                                    Last 10 trades: <b style={{color:textPrimary}}>{da.wr_last}%</b> win rate vs previous 10: <b style={{color:textPrimary}}>{da.wr_prev||"—"}%</b>
                                  </span>
                                </div>
                              )}

                              {/* By symbol */}
                              <div style={{ marginBottom:20 }}>
                                <div style={{ fontSize:12, fontWeight:700, color:textSecondary, marginBottom:10 }}>Performance by Symbol</div>
                                <div style={{ overflowX:"auto" }}>
                                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                                    <thead>
                                      <tr style={{ background:"rgba(0,0,0,0.3)" }}>
                                        {["Symbol","Trades","Win Rate","P&L","Verdict"].map(h=>(
                                          <th key={h} style={{ padding:"7px 10px", textAlign:"left", fontWeight:700, color:textSecondary, fontSize:10, textTransform:"uppercase" }}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {da.symbolStats.map(s => {
                                        const wr = parseFloat(s.winRate);
                                        const verdict = wr >= 60 ? { t:"✅ Strong", c:"#00ff88" } : wr >= 45 ? { t:"⚠ Marginal", c:"#f59e0b" } : { t:"❌ Weak", c:"#ef4444" };
                                        return (
                                          <tr key={s.sym} style={{ borderTop:"1px solid rgba(100,100,100,0.08)" }}>
                                            <td style={{ padding:"8px 10px", fontWeight:800, color:textPrimary }}>{s.sym}</td>
                                            <td style={{ padding:"8px 10px", color:textSecondary }}>{s.trades}</td>
                                            <td style={{ padding:"8px 10px" }}>
                                              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                                <div style={{ flex:1, height:6, borderRadius:3, background:"rgba(100,100,100,0.2)" }}>
                                                  <div style={{ width:`${wr}%`, height:"100%", borderRadius:3, background: wr>=50?"#00ff88":"#ef4444" }}/>
                                                </div>
                                                <span style={{ fontFamily:"monospace", fontWeight:700, color:wr>=50?"#00ff88":"#ef4444", minWidth:36 }}>{s.winRate}%</span>
                                              </div>
                                            </td>
                                            <td style={{ padding:"8px 10px", fontFamily:"monospace", fontWeight:700, color:s.pnl>=0?"#00ff88":"#ef4444" }}>
                                              {s.pnl>=0?"+":""}{s.pnl.toFixed(2)}
                                            </td>
                                            <td style={{ padding:"8px 10px", fontWeight:700, color:verdict.c, fontSize:11 }}>{verdict.t}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* By hour heatmap */}
                              {da.hourStats.length > 0 && (
                                <div style={{ marginBottom:20 }}>
                                  <div style={{ fontSize:12, fontWeight:700, color:textSecondary, marginBottom:10 }}>P&L by Hour of Day</div>
                                  <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
                                    {da.hourStats.map(h => (
                                      <div key={h.h} title={`${h.h}:00 — ${h.trades} trades, WR ${h.winRate}%, P&L $${h.pnl}`}
                                        style={{ width:38, borderRadius:6, padding:"6px 4px", textAlign:"center",
                                          background: barColor(h.pnl, Math.max(...da.hourStats.map(x=>Math.abs(x.pnl)),1)),
                                          border:"1px solid rgba(100,100,100,0.15)", cursor:"default" }}>
                                        <div style={{ fontSize:9, color:textSecondary, fontWeight:600 }}>{h.h}h</div>
                                        <div style={{ fontSize:10, fontWeight:700, color:h.pnl>=0?"#00ff88":"#ef4444", fontFamily:"monospace" }}>
                                          {h.pnl>=0?"+":""}{h.pnl.toFixed(0)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div style={{ fontSize:10, color:textSecondary, marginTop:6 }}>Hover over a cell for details. Green = profitable hour, Red = losing hour.</div>
                                </div>
                              )}

                              {/* By day of week */}
                              {da.dayStats.length > 0 && (
                                <div>
                                  <div style={{ fontSize:12, fontWeight:700, color:textSecondary, marginBottom:10 }}>P&L by Day of Week</div>
                                  <div style={{ display:"flex", gap:6 }}>
                                    {da.dayStats.map(d => (
                                      <div key={d.d} style={{ flex:1, borderRadius:8, padding:"10px 6px", textAlign:"center",
                                        background: barColor(d.pnl, Math.max(...da.dayStats.map(x=>Math.abs(x.pnl)),1)),
                                        border:"1px solid rgba(100,100,100,0.15)" }}>
                                        <div style={{ fontSize:10, fontWeight:700, color:textSecondary }}>{d.d}</div>
                                        <div style={{ fontSize:11, fontWeight:800, color:d.pnl>=0?"#00ff88":"#ef4444", fontFamily:"monospace", marginTop:4 }}>
                                          {d.pnl>=0?"+":""}{d.pnl.toFixed(0)}
                                        </div>
                                        <div style={{ fontSize:9, color:textSecondary }}>{d.winRate}%</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* ── OPTIMIZER TAB ── */}
                        {tab === "optimizer" && (() => {
                          const da = getDeepAnalytics(bot);
                          const isOn = optimizerEnabled[bot.id] || false;
                          const log = optimizerLog[bot.id] || [];
                          return (
                            <div>
                              {/* Header */}
                              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20,
                                padding:"14px 16px", borderRadius:12,
                                background: isOn ? "rgba(0,255,136,0.06)" : "rgba(100,100,100,0.06)",
                                border:`1px solid ${isOn ? "rgba(0,255,136,0.25)" : "rgba(100,100,100,0.2)"}` }}>
                                <div>
                                  <div style={{ fontSize:14, fontWeight:800, color:isOn?"#00ff88":textPrimary }}>
                                    🤖 Auto-Optimizer {isOn ? "— ACTIVE" : "— OFF"}
                                  </div>
                                  <div style={{ fontSize:11, color:textSecondary, marginTop:3 }}>
                                    Monitors performance and automatically tunes TP, SL, lot size. Pauses the bot if consecutive losses detected.
                                  </div>
                                </div>
                                <button onClick={() => setOptimizerEnabled(p => ({ ...p, [bot.id]: !isOn }))}
                                  style={{ padding:"8px 18px", borderRadius:9, border:"none", cursor:"pointer", fontWeight:800, fontSize:13,
                                    background: isOn ? "rgba(239,68,68,0.15)" : "linear-gradient(135deg,#00ff88,#00cc6a)",
                                    color: isOn ? "#ef4444" : "#000" }}>
                                  {isOn ? "Turn Off" : "Turn On"}
                                </button>
                              </div>

                              {/* Optimizer Rules */}
                              <div style={{ marginBottom:20 }}>
                                <div style={{ fontSize:12, fontWeight:700, color:textSecondary, marginBottom:10 }}>Active Rules</div>
                                {[
                                  { icon:"📉", rule:"Win rate < 40% (last 10 trades)", action:"Reduce lot size by 20%", trigger:"Protects capital during losing streaks" },
                                  { icon:"📈", rule:"Win rate > 65% (last 20 trades)", action:"Increase lot size by 10%", trigger:"Scales up during winning runs" },
                                  { icon:"⚖", rule:"Risk/Reward ratio < 1.0", action:"Widen TP by 20%", trigger:"Improves trade profitability" },
                                  { icon:"🚨", rule:"4+ consecutive losses", action:"Auto-pause bot", trigger:"Emergency capital protection" },
                                  { icon:"⚠", rule:"Symbol win rate < 30% (5+ trades)", action:"Flag weak pair", trigger:"Identifies underperforming instruments" },
                                ].map((r,i) => (
                                  <div key={i} style={{ display:"flex", gap:12, padding:"10px 12px", borderRadius:9,
                                    marginBottom:6, background:"rgba(0,0,0,0.2)", border:"1px solid rgba(100,100,100,0.1)" }}>
                                    <span style={{ fontSize:16 }}>{r.icon}</span>
                                    <div style={{ flex:1 }}>
                                      <div style={{ fontSize:12, fontWeight:700, color:textPrimary }}>{r.rule}</div>
                                      <div style={{ fontSize:11, color:"#00ff88", marginTop:1 }}>→ {r.action}</div>
                                      <div style={{ fontSize:10, color:textSecondary, marginTop:1 }}>{r.trigger}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Current snapshot */}
                              {da && (
                                <div style={{ marginBottom:20, padding:"12px 14px", borderRadius:10,
                                  background:"rgba(0,0,0,0.2)", border:"1px solid rgba(100,100,100,0.15)" }}>
                                  <div style={{ fontSize:11, fontWeight:700, color:textSecondary, marginBottom:8 }}>CURRENT SNAPSHOT</div>
                                  <div style={{ display:"flex", gap:20, flexWrap:"wrap", fontSize:12 }}>
                                    <span>WR last 10: <b style={{color:textPrimary}}>{da.wr_last||"—"}%</b></span>
                                    <span>WR prev 10: <b style={{color:textPrimary}}>{da.wr_prev||"—"}%</b></span>
                                    <span>R/R: <b style={{color:textPrimary}}>{da.rr}</b></span>
                                    <span>PF: <b style={{color:textPrimary}}>{da.pf}</b></span>
                                    <span>Loss streak: <b style={{color:da.curLossStreak>=4?"#ef4444":textPrimary}}>{da.curLossStreak}</b></span>
                                  </div>
                                </div>
                              )}

                              {/* Manual run */}
                              <button onClick={() => runOptimizer(bot)}
                                style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:9,
                                  border:"none", background:"rgba(0,255,136,0.12)", color:"#00ff88",
                                  fontSize:13, fontWeight:700, cursor:"pointer", marginBottom:20 }}>
                                <RefreshCw size={14}/> Run Optimizer Now
                              </button>

                              {/* Log */}
                              <div>
                                <div style={{ fontSize:12, fontWeight:700, color:textSecondary, marginBottom:10 }}>
                                  Optimizer Log {log.length>0 && <span style={{fontSize:10,color:textSecondary}}>({log.length} entries)</span>}
                                </div>
                                {log.length === 0 ? (
                                  <div style={{ padding:"20px", textAlign:"center", color:textSecondary, fontSize:12,
                                    background:"rgba(0,0,0,0.1)", borderRadius:10 }}>
                                    No optimizer actions yet. Click "Run Optimizer Now" or turn on auto-mode.
                                  </div>
                                ) : (
                                  <div style={{ maxHeight:280, overflowY:"auto" }}>
                                    {log.map((entry, i) => (
                                      <div key={i} style={{ display:"flex", gap:12, padding:"8px 12px", borderRadius:8,
                                        marginBottom:4, background:"rgba(0,0,0,0.15)", border:"1px solid rgba(100,100,100,0.1)" }}>
                                        <div style={{ fontSize:10, color:textSecondary, whiteSpace:"nowrap", minWidth:110 }}>{entry.ts}</div>
                                        <div>
                                          <div style={{ fontSize:12, fontWeight:700, color:textPrimary }}>{entry.action}</div>
                                          <div style={{ fontSize:11, color:textSecondary }}>{entry.reason}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* ── PARAMS TAB ── */}
                        {tab === "params" && (
                          <div>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
                              {[
                                { key: "lotSize", label: "Lot Size", step: 0.01, min: 0.001 },
                                { key: "tpPips", label: "Take Profit (pips)", step: 1, min: 1 },
                                { key: "slPips", label: "Stop Loss (pips)", step: 1, min: 1 },
                                { key: "maxDrawdown", label: "Max Drawdown %", step: 0.1, min: 0.1 },
                                { key: "maxTrades", label: "Max Open Trades", step: 1, min: 1 },
                              ].map(({ key, label, step, min }) => (
                                <div key={key}>
                                  <label style={{ fontSize: 11, fontWeight: 600, color: textSecondary, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{label}</label>
                                  <input
                                    type="number" step={step} min={min}
                                    value={p[key] ?? bot.params[key]}
                                    onChange={e => setEditParams(prev => ({ ...prev, [bot.id]: { ...(prev[bot.id] || bot.params), [key]: parseFloat(e.target.value) || 0 } }))}
                                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${borderColor}`,
                                      background: dark ? "rgba(0,0,0,0.4)" : "#f8fafc", color: textPrimary,
                                      fontSize: 14, fontWeight: 700, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
                                  />
                                </div>
                              ))}
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 600, color: textSecondary, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Trade Frequency</label>
                                <select value={p.tradeFreq || "Any"} onChange={e => setEditParams(prev => ({ ...prev, [bot.id]: { ...(prev[bot.id] || bot.params), tradeFreq: e.target.value } }))}
                                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${borderColor}`,
                                    background: dark ? "rgba(0,0,0,0.4)" : "#f8fafc", color: textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                                  {["Any","M1","M5","M15","M30","H1","H4","D1"].map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                              </div>
                            </div>
                            <button onClick={() => {
                              const updated = editParams[bot.id];
                              if (updated) {
                                sendBotCommand(bot.id, "updateParams", updated);
                                setEditParams(prev => { const n = { ...prev }; delete n[bot.id]; return n; });
                              }
                            }} style={{
                              padding: "9px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                              background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000",
                              fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6,
                            }}><RefreshCw size={14} /> Apply Parameters</button>
                            <div style={{ marginTop: 10, fontSize: 11, color: textSecondary }}>
                              Applying sends a command to the EA. Changes take effect on the next EA poll cycle (within 20s).
                            </div>
                          </div>
                        )}

                        {/* ── SOURCE CODE TAB ── */}
                        {tab === "source" && (
                          <div>
                            {/* Upload zone */}
                            <div style={{ marginBottom: 14 }}>
                              <label style={{
                                display: "flex", alignItems: "center", gap: 10, padding: "14px 18px",
                                borderRadius: 10, border: `2px dashed ${bot.sourceCode ? "rgba(0,255,136,0.4)" : borderColor}`,
                                cursor: "pointer", background: "rgba(0,0,0,0.15)", transition: "all 0.2s",
                              }}>
                                <Upload size={18} color={bot.sourceCode ? "#00ff88" : textSecondary} />
                                <div>
                                  <div style={{ fontWeight: 700, fontSize: 13, color: bot.sourceCode ? "#00ff88" : textPrimary }}>
                                    {bot.sourceCode ? `✓ ${bot.sourceFileName}` : "Upload .mq4 / .mq5 source file"}
                                  </div>
                                  <div style={{ fontSize: 11, color: textSecondary }}>
                                    {bot.sourceCode ? "Click to replace" : "The app will inject your credentials automatically"}
                                  </div>
                                </div>
                                <input type="file" accept=".mq4,.mq5,.mql4,.mql5" style={{ display: "none" }}
                                  onChange={e => handleSourceUpload(bot.id, e.target.files[0])} />
                              </label>
                            </div>

                            {bot.sourceCode ? (
                              <>
                                {/* ── MT5 Folder Link Widget ── */}
                                <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10,
                                  background: mt5FolderHandle ? "rgba(0,255,136,0.07)" : "rgba(59,130,246,0.07)",
                                  border: `1px solid ${mt5FolderHandle ? "rgba(0,255,136,0.25)" : "rgba(59,130,246,0.25)"}` }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <span style={{ fontSize: 16 }}>📂</span>
                                      <div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: mt5FolderHandle ? "#00ff88" : textPrimary }}>
                                          {mt5FolderHandle ? `MT5 Folder: ${mt5FolderHandle.name}` : "Link your MT5 Experts folder"}
                                        </div>
                                        <div style={{ fontSize: 11, color: textSecondary }}>
                                          {mt5FolderHandle
                                            ? "Build will write directly to MetaTrader — just press F7 to compile"
                                            : "One-time setup · Chrome/Edge desktop only · app remembers it"}
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", gap: 6 }}>
                                      <button onClick={pickMt5Folder} style={{
                                        padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                                        background: mt5FolderHandle ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#3b82f6,#2563eb)",
                                        color: mt5FolderHandle ? textSecondary : "#fff",
                                      }}>{mt5FolderHandle ? "Change" : "Link Folder"}</button>
                                      {mt5FolderHandle && (
                                        <button onClick={clearMt5Folder} style={{
                                          padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11,
                                          background: "rgba(239,68,68,0.12)", color: "#ef4444", fontWeight: 700,
                                        }}>✕</button>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Deploy status toast */}
                                {mt5DeployStatus && (
                                  <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 8,
                                    background: mt5DeployStatus.type === 'success' ? "rgba(0,255,136,0.1)" : "rgba(239,68,68,0.1)",
                                    border: `1px solid ${mt5DeployStatus.type === 'success' ? "rgba(0,255,136,0.3)" : "rgba(239,68,68,0.3)"}`,
                                    color: mt5DeployStatus.type === 'success' ? "#00ff88" : "#ef4444", fontSize: 12, fontWeight: 600 }}>
                                    <span style={{ flexShrink: 0 }}>{mt5DeployStatus.type === 'success' ? '✓' : '⚠'}</span>
                                    <span>{mt5DeployStatus.msg}</span>
                                  </div>
                                )}

                                {/* Action buttons */}
                                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                                  <button onClick={() => buildAndDeployEA(bot)} disabled={mt5Deploying} style={{
                                    display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9,
                                    border: "none", cursor: mt5Deploying ? "wait" : "pointer", fontWeight: 700, fontSize: 12,
                                    opacity: mt5Deploying ? 0.7 : 1,
                                    background: mt5FolderHandle
                                      ? "linear-gradient(135deg, #00ff88, #00cc6a)"
                                      : "linear-gradient(135deg, #f59e0b, #d97706)",
                                    color: "#000",
                                    boxShadow: mt5FolderHandle
                                      ? "0 4px 12px rgba(0,255,136,0.35)"
                                      : "0 4px 12px rgba(245,158,11,0.35)",
                                  }}>
                                    {mt5Deploying ? "⏳ Building…" : mt5FolderHandle ? "⚡ Build & Deploy to MT5" : "⚡ Build & Download"}
                                  </button>
                                  <button onClick={() => downloadModifiedEA(bot)} style={{
                                    display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9,
                                    border: `1px solid ${borderColor}`, background: "rgba(255,255,255,0.04)",
                                    color: textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                  }}><Download size={13} /> Original (credentials only)</button>
                                </div>

                                {/* Credentials injected preview */}
                                <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(0,255,136,0.06)",
                                  border: "1px solid rgba(0,255,136,0.2)", marginBottom: 12, fontSize: 11, color: textSecondary }}>
                                  <b style={{ color: "#00ff88" }}>Injected values:</b>{" "}
                                  UserID = <code style={{ color: textPrimary }}>{user?.uid?.slice(0, 10)}...</code> &nbsp;
                                  SyncToken = <code style={{ color: textPrimary }}>{bot.token?.slice(0, 12)}...</code>
                                </div>

                                {/* Source code viewer */}
                                <div style={{ position: "relative" }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "8px 12px", background: "rgba(0,0,0,0.5)", borderRadius: "8px 8px 0 0",
                                    border: `1px solid ${borderColor}`, borderBottom: "none" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: textSecondary }}>
                                      <Terminal size={12} /> {bot.sourceFileName}
                                    </div>
                                    <span style={{ fontSize: 10, color: textSecondary }}>{bot.sourceCode.split("\n").length} lines</span>
                                  </div>
                                  <pre style={{
                                    margin: 0, padding: "14px", fontSize: 11, fontFamily: "monospace",
                                    background: "rgba(0,0,0,0.6)", color: "#e2e8f0", lineHeight: 1.6,
                                    border: `1px solid ${borderColor}`, borderRadius: "0 0 8px 8px",
                                    overflowX: "auto", overflowY: "auto", maxHeight: 320,
                                    whiteSpace: "pre",
                                  }}>
                                    {injectCredentials(bot.sourceCode, user?.uid || "", bot.token)}
                                  </pre>
                                </div>
                              </>
                            ) : (
                              <div style={{ padding: "20px", textAlign: "center", color: textSecondary, fontSize: 13,
                                background: "rgba(0,0,0,0.1)", borderRadius: 10 }}>
                                Upload your .mq5 file above. The app will automatically inject your User ID and Sync Token before download.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Add Bot Modal ── */}
        {showAddBot && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
            onClick={() => { setShowAddBot(false); setShowAdvancedBot(false); }}>
            <div style={{ background: dark ? "#141414" : "#fff", borderRadius: 20, padding: 28, width: "100%",
              maxWidth: 460, maxHeight: "90vh", overflowY: "auto",
              border: "1px solid rgba(100,100,100,0.2)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}
              onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: textPrimary, display: "flex", alignItems: "center", gap: 8 }}>
                  <Cpu size={18} color="#00ff88" /> Add New Bot
                </h3>
                <button onClick={() => { setShowAddBot(false); setShowAdvancedBot(false); }}
                  style={{ background: "none", border: "none", color: textSecondary, cursor: "pointer" }}><X size={20} /></button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* ── Bot Name (only required field) ── */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                    Bot Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. EURUSD Scalper, Gold Bot, My EA..."
                    value={newBot.name}
                    onChange={e => setNewBot(p => ({ ...p, name: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10,
                      border: `1.5px solid ${newBot.name.trim() ? "rgba(0,255,136,0.5)" : borderColor}`,
                      background: dark ? "rgba(0,0,0,0.4)" : "#f8fafc", color: textPrimary,
                      fontSize: 15, fontWeight: 600, outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s" }} />
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: textSecondary }}>
                    This is just a label. Your EA connects via its unique sync token — generated automatically.
                  </p>
                </div>

                {/* ── EA File Upload (prominent) ── */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: textSecondary, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>
                    Attach EA File <span style={{ color: textSecondary, fontWeight: 400, textTransform: "none" }}>(optional — .mq4 / .mq5)</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 10,
                    border: `1.5px dashed ${newBot.sourceFileName ? "rgba(0,255,136,0.5)" : borderColor}`,
                    cursor: "pointer", background: newBot.sourceFileName ? "rgba(0,255,136,0.06)" : "rgba(0,0,0,0.1)",
                    transition: "all 0.2s" }}>
                    <Upload size={18} color={newBot.sourceFileName ? "#00ff88" : textSecondary} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: newBot.sourceFileName ? "#00ff88" : textPrimary }}>
                        {newBot.sourceFileName || "Drop your EA source file here"}
                      </div>
                      {!newBot.sourceFileName && (
                        <div style={{ fontSize: 11, color: textSecondary, marginTop: 2 }}>
                          Strategy logic stays in your EA — we just store it for reference
                        </div>
                      )}
                    </div>
                    <input type="file" accept=".mq4,.mq5,.mql4,.mql5" style={{ display: "none" }}
                      onChange={e => {
                        const f = e.target.files[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = ev => setNewBot(p => ({ ...p, sourceCode: ev.target.result, sourceFileName: f.name }));
                        reader.readAsText(f);
                      }} />
                  </label>
                </div>

                {/* ── Advanced Settings (collapsible) ── */}
                <div style={{ borderRadius: 10, border: `1px solid ${borderColor}`, overflow: "hidden" }}>
                  <button
                    onClick={() => setShowAdvancedBot(v => !v)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "11px 14px", background: "transparent", border: "none", cursor: "pointer",
                      color: textSecondary, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 14 }}>⚙️</span> Advanced Settings <span style={{ color: "#6b7280", fontWeight: 400 }}>(optional)</span>
                    </span>
                    <span style={{ fontSize: 16, transform: showAdvancedBot ? "rotate(180deg)" : "none", transition: "0.2s", display: "inline-block" }}>⌄</span>
                  </button>

                  {showAdvancedBot && (
                    <div style={{ padding: "4px 14px 16px", display: "flex", flexDirection: "column", gap: 14,
                      borderTop: `1px solid ${borderColor}`, background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)" }}>

                      {/* Symbol(s) */}
                      <div style={{ marginTop: 10 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: textSecondary, textTransform: "uppercase", display: "block", marginBottom: 5 }}>Symbol(s)</label>
                        <input type="text" placeholder="e.g. EURUSD, GBPUSD" value={newBot.symbols || ""}
                          onChange={e => setNewBot(p => ({ ...p, symbols: e.target.value }))}
                          style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${borderColor}`,
                            background: dark ? "rgba(0,0,0,0.4)" : "#f8fafc", color: textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                        <p style={{ margin: "4px 0 0", fontSize: 10, color: textSecondary }}>Display only — doesn't configure your EA</p>
                      </div>

                      {/* Strategy Type */}
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: textSecondary, textTransform: "uppercase", display: "block", marginBottom: 5 }}>Strategy Type</label>
                        <select value={newBot.strategy} onChange={e => setNewBot(p => ({ ...p, strategy: e.target.value }))}
                          style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${borderColor}`,
                            background: dark ? "rgba(0,0,0,0.4)" : "#f8fafc", color: textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                          {BOT_STRATEGIES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <p style={{ margin: "4px 0 0", fontSize: 10, color: textSecondary }}>Display label — strategy logic is in your EA</p>
                      </div>

                      {/* Numeric params */}
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: textSecondary, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                          Default Parameters <span style={{ color: "#6b7280", fontWeight: 400, textTransform: "none" }}>(used by "Apply Params" command)</span>
                        </label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          {[
                            { key: "lotSize", label: "Lot Size", step: 0.01, min: 0.001 },
                            { key: "tpPips", label: "TP (pips)", step: 1, min: 1 },
                            { key: "slPips", label: "SL (pips)", step: 1, min: 1 },
                            { key: "maxDrawdown", label: "Max DD %", step: 0.5, min: 0.1 },
                            { key: "maxTrades", label: "Max Trades", step: 1, min: 1 },
                          ].map(({ key, label, step, min }) => (
                            <div key={key}>
                              <label style={{ fontSize: 10, fontWeight: 600, color: textSecondary, textTransform: "uppercase", display: "block", marginBottom: 3 }}>{label}</label>
                              <input type="number" step={step} min={min} value={newBot[key] || ""}
                                onChange={e => setNewBot(p => ({ ...p, [key]: parseFloat(e.target.value) || 0 }))}
                                style={{ width: "100%", padding: "8px 10px", borderRadius: 7, border: `1px solid ${borderColor}`,
                                  background: dark ? "rgba(0,0,0,0.4)" : "#f8fafc", color: textPrimary, fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Create Button ── */}
                <button onClick={() => {
                  if (!newBot.name.trim()) return;
                  const bot = addBot(newBot);
                  setExpandedBot(bot.id);
                  setShowAddBot(false);
                  setShowAdvancedBot(false);
                  setNewBot({ name: "", strategy: "Custom", symbols: "EURUSD", lotSize: 0.01, tpPips: 50, slPips: 30, maxDrawdown: 5, maxTrades: 3 });
                }} style={{
                  width: "100%", padding: "14px", borderRadius: 12, border: "none",
                  cursor: newBot.name.trim() ? "pointer" : "not-allowed",
                  background: newBot.name.trim() ? "linear-gradient(135deg, #00ff88, #00cc6a)" : "rgba(100,100,100,0.15)",
                  color: newBot.name.trim() ? "#000" : textSecondary, fontSize: 15, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.2s",
                }}>
                  <Cpu size={16} /> {newBot.name.trim() ? `Create "${newBot.name}"` : "Enter a bot name to continue"}
                </button>

              </div>
            </div>
          </div>
        )}
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

  const ExnessPage = () => {
    const [copied, setCopied] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const copy = (text, key) => { navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(null), 2000); }); };
    const uid = user?.uid || "Sign in first";

    // Per-account P&L summary
    const acctStats = (acctName) => {
      const acctTrades = trades.filter(t => (t.account || accounts[0]?.name || "Account 1") === acctName);
      const totalPnl = acctTrades.reduce((s, t) => s + (t.netPnl || 0), 0);
      const wins = acctTrades.filter(t => (t.netPnl || 0) > 0).length;
      return { count: acctTrades.length, totalPnl, winRate: acctTrades.length ? Math.round(wins / acctTrades.length * 100) : 0 };
    };

    const Step = ({ num, title, children }) => (
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(0,255,136,0.15)",
          border: "1px solid rgba(0,255,136,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 800, color: "#00ff88", flexShrink: 0, marginTop: 2 }}>{num}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: textPrimary, marginBottom: 3, fontSize: 13 }}>{title}</div>
          <div style={{ fontSize: 12, color: textSecondary, lineHeight: 1.65 }}>{children}</div>
        </div>
      </div>
    );

    const CopyBox = ({ label, value, copyKey, small }) => (
      <div style={{ marginBottom: small ? 6 : 10 }}>
        {label && <div style={{ fontSize: 10, fontWeight: 600, color: textSecondary, textTransform: "uppercase", marginBottom: 3 }}>{label}</div>}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <code style={{ flex: 1, padding: small ? "6px 10px" : "8px 12px", borderRadius: 8, background: dark ? "rgba(0,0,0,0.4)" : "#f1f5f9",
            border: `1px solid ${borderColor}`, fontSize: small ? 11 : 12, color: textPrimary, wordBreak: "break-all",
            fontFamily: "monospace", lineHeight: 1.4 }}>{value}</code>
          <button onClick={() => copy(value, copyKey)} style={{
            padding: small ? "6px 10px" : "8px 12px", borderRadius: 8, border: "none", cursor: "pointer", flexShrink: 0,
            background: copied === copyKey ? "rgba(0,255,136,0.2)" : "rgba(0,255,136,0.1)",
            color: "#00ff88", fontSize: 12, fontWeight: 700, transition: "all 0.2s",
          }}>{copied === copyKey ? "✓" : "Copy"}</button>
        </div>
      </div>
    );

    return (
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: textPrimary }}>⚡ Exness Auto-Sync</h2>
          <p style={{ margin: 0, fontSize: 13, color: textSecondary }}>Connect one or more MT4/MT5 accounts to auto-import closed trades.</p>
        </div>

        {/* EA Sync Status */}
        {eaSyncStatus && (
          <div style={{ padding: "12px 16px", borderRadius: 12, marginBottom: 20, display: "flex", alignItems: "center", gap: 10,
            background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#00ff88" }}>
              {eaSyncStatus.count} new trade{eaSyncStatus.count > 1 ? "s" : ""} synced!
            </span>
          </div>
        )}

        {/* ═══ ACCOUNT MANAGER ═══ */}
        <div style={{ background: cardBg, borderRadius: 16, padding: 20, border: `1px solid rgba(0,255,136,0.2)`,
          marginBottom: 20, boxShadow: "0 4px 20px rgba(0,255,136,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🔗</span>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: textPrimary }}>Connected Accounts</h3>
              <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 700,
                background: "rgba(0,255,136,0.12)", color: "#00ff88" }}>{accounts.length}</span>
            </div>
            <button onClick={() => { const a = addAccount(); setExpandedId(a.id); }} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}><Plus size={14} /> Add Account</button>
          </div>

          {accounts.length === 0 ? (
            <div style={{ padding: "30px 0", textAlign: "center", color: textSecondary, fontSize: 13 }}>
              No accounts yet — click <b style={{ color: "#00ff88" }}>Add Account</b> to get started.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {accounts.map((acct) => {
                const stats = acctStats(acct.name);
                const isExpanded = expandedId === acct.id;
                return (
                  <div key={acct.id} style={{ borderRadius: 12, border: `1px solid ${isExpanded ? acct.color + "55" : borderColor}`,
                    background: isExpanded ? (dark ? "rgba(0,0,0,0.3)" : "#f8fafc") : "transparent",
                    overflow: "hidden", transition: "all 0.2s" }}>
                    {/* Account header row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" }}
                         onClick={() => setExpandedId(isExpanded ? null : acct.id)}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: acct.color, flexShrink: 0 }} />
                      {editingId === acct.id ? (
                        <input value={editName} onChange={e => setEditName(e.target.value)}
                          onBlur={() => { renameAccount(acct.id, editName || acct.name); setEditingId(null); }}
                          onKeyDown={e => { if (e.key === "Enter") { renameAccount(acct.id, editName || acct.name); setEditingId(null); } }}
                          autoFocus onClick={e => e.stopPropagation()}
                          style={{ flex: 1, background: "transparent", border: `1px solid ${acct.color}`, borderRadius: 6,
                            padding: "3px 8px", color: textPrimary, fontSize: 14, fontWeight: 700, outline: "none" }} />
                      ) : (
                        <span style={{ flex: 1, fontWeight: 700, color: textPrimary, fontSize: 14 }}>{acct.name}</span>
                      )}
                      <span style={{ fontSize: 12, color: textSecondary }}>{stats.count} trades</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: stats.totalPnl >= 0 ? "#00ff88" : "#ef4444" }}>
                        {stats.totalPnl >= 0 ? "+" : ""}{formatCurrency(stats.totalPnl)}
                      </span>
                      <span style={{ fontSize: 11, color: textSecondary }}>{stats.winRate}% WR</span>
                      {/* Edit / Delete */}
                      <button onClick={e => { e.stopPropagation(); setEditName(acct.name); setEditingId(acct.id); }} style={{
                        background: "transparent", border: "none", cursor: "pointer", color: textSecondary, padding: "2px 6px", borderRadius: 6,
                        fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 3,
                      }}><Settings size={13} /></button>
                      <button onClick={e => { e.stopPropagation(); if (window.confirm(`Remove "${acct.name}"? Its trades will remain but won't be linked to this account.`)) removeAccount(acct.id); }} style={{
                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", color: "#ef4444",
                        padding: "3px 7px", borderRadius: 6, fontSize: 12, display: "flex", alignItems: "center",
                      }}><X size={12} /></button>
                      <ChevronDown size={14} color={textSecondary} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </div>

                    {/* Expanded: credentials + EA setup */}
                    {isExpanded && (
                      <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${borderColor}`, paddingTop: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: textSecondary, textTransform: "uppercase", marginBottom: 8 }}>EA Credentials for {acct.name}</div>
                        <CopyBox label="User ID" value={uid} copyKey={`uid_${acct.id}`} small />
                        <CopyBox label="Sync Token (unique per account)" value={acct.token} copyKey={`tok_${acct.id}`} small />
                        <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700, color: textSecondary, marginBottom: 8 }}>Quick EA Setup (MT5):</div>
                        {[
                          { n: 1, t: "Download ExnessSync.mq5", c: "Get the EA file from your workspace folder (ExnessSync.mq5)." },
                          { n: 2, t: "Open MetaEditor (F4)", c: <>Set <b>UserID</b> = the User ID above, <b>SyncToken</b> = the Sync Token above. Each account needs its own EA with its own token.</> },
                          { n: 3, t: "Whitelist URL", c: <>Tools → Options → Expert Advisors → Allow WebRequest → add <code style={{ fontSize: 11 }}>https://firestore.googleapis.com</code></> },
                          { n: 4, t: "Attach to chart", c: "Drag ExnessSync from Navigator onto any chart. Trades will sync within 20 seconds of closing." },
                        ].map(s => <Step key={s.n} num={s.n} title={s.t}>{s.c}</Step>)}
                        <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", fontSize: 12, color: textSecondary }}>
                          <b style={{ color: "#3b82f6" }}>💡 Tip:</b> Run a separate MT5 terminal for each Exness account, each with its own EA file configured with that account's unique Sync Token.
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Method 2 — CSV Import */}
        <div style={{ background: cardBg, borderRadius: 16, padding: 20, border: `1px solid ${borderColor}`, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>📁</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: textPrimary }}>CSV Import</h3>
            <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700,
              background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>QUICKEST</span>
          </div>
          <p style={{ fontSize: 13, color: textSecondary, marginBottom: 12 }}>
            Export trade history from MT4/MT5 as CSV and import it — the app auto-detects the format and maps all fields.
          </p>
          <div style={{ fontSize: 12, color: textSecondary, lineHeight: 1.7, padding: "10px 12px",
            borderRadius: 8, background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `1px solid ${borderColor}` }}>
            <b style={{ color: textPrimary }}>MT4:</b> Terminal → Account History → Right-click → Save as Report → .csv<br/>
            <b style={{ color: textPrimary }}>MT5:</b> Toolbox → History → Right-click → Save as Report → .csv<br/>
            <b style={{ color: textPrimary }}>Exness portal:</b> My Account → Trade History → Export CSV
          </div>
          <button onClick={() => setShowCsvUpload(true)} style={{ marginTop: 14, padding: "10px 20px",
            borderRadius: 10, border: "none", background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Open CSV Importer →
          </button>
        </div>

        {/* Firestore rules note */}
        <div style={{ padding: "12px 16px", borderRadius: 10, background: dark ? "rgba(239,68,68,0.07)" : "#fff7ed",
          border: "1px solid rgba(239,68,68,0.2)", fontSize: 12, color: textSecondary, lineHeight: 1.7 }}>
          <b style={{ color: "#ef4444" }}>⚠ One-time Firebase setup for EA sync:</b><br/>
          In Firebase Console → Firestore → Rules, add this rule to allow the EA to write pending trades:
          <code style={{ display: "block", marginTop: 6, padding: "8px 10px", borderRadius: 6,
            background: dark ? "rgba(0,0,0,0.4)" : "#fff", fontSize: 11, fontFamily: "monospace", color: textPrimary, whiteSpace: "pre" }}>
{`match /users/{uid}/ea_pending/{id} {
  allow create: if true;
  allow read, delete: if request.auth.uid == uid;
}`}
          </code>
        </div>
      </div>
    );
  };
  const XMPage = () => <BrokerConnectPage brokerName="XM" brokerColor="#e11d48" />;

  // ============================================================
  // RENDER ACTIVE PAGE
  // ============================================================
  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage />;
      case "liveprices": return <LivePricesPage />;
      case "trades": return <TradesPage />;
      case "analytics": return <AnalyticsPage />;
      case "botvsmanual": return <BotVsManualPage />;
      case "bots": return <BotsPage />;
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
            { section: "TRADING", items: [{ id: "trades", label: "Trades", icon: TrendingUp }] },
            { section: "ANALYTICS", items: [{ id: "analytics", label: "Analytics", icon: BarChart3 }, { id: "botvsmanual", label: "Bot vs Manual", icon: Bot }, { id: "markets", label: "Markets", icon: Gem }] },
            { section: "BOTS", items: [{ id: "bots", label: "Bot Control Center", icon: Cpu }] },
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
          <button onClick={() => setDark(d => { try { localStorage.setItem("tt_dark", String(!d)); } catch {} return !d; })} style={{
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
                {/* Currency toggle — desktop header */}
                <button onClick={toggleCurrency} title="Switch currency" style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 10,
                  border: `1px solid ${currency === "USD" ? "rgba(59,130,246,0.4)" : "rgba(245,158,11,0.4)"}`,
                  background: currency === "USD" ? "rgba(59,130,246,0.1)" : "rgba(245,158,11,0.08)",
                  color: currency === "USD" ? "#60a5fa" : "#f59e0b",
                  fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                }}>
                  {currency === "USD" ? "$ USD" : "₹ INR"}
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
            {/* Mobile: save status indicator + currency toggle */}
            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {saveStatus === "saving" && <span style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700 }}>Saving…</span>}
                {saveStatus === "saved" && <span style={{ fontSize: 10, color: "#00ff88", fontWeight: 700 }}>✓ Saved</span>}
                <button onClick={toggleCurrency} style={{
                  padding: "4px 10px", borderRadius: 8, border: `1px solid ${currency === "USD" ? "rgba(59,130,246,0.4)" : "rgba(245,158,11,0.4)"}`,
                  background: currency === "USD" ? "rgba(59,130,246,0.12)" : "rgba(245,158,11,0.1)",
                  color: currency === "USD" ? "#60a5fa" : "#f59e0b",
                  fontSize: 11, fontWeight: 800, cursor: "pointer",
                }}>{currency}</button>
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
              { id: "bots", icon: Cpu, label: "Bots" },
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
