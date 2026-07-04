"use client";

import { useEffect, useRef, useState } from "react";

// pixel art cat — symmetric, face centered, each char = CAT_PX × CAT_PX
// 11 columns wide: center col = 5, eyes at cols 3 & 7, nose at col 5
const CAT_ART = [
  "..B.....B..",  // ear tips
  ".BGB...BGB.",  // ear inner
  ".BGGGGGGGB.",  // head top
  ".BGGGGGGGB.",  // head
  ".BGGGPGGGB.",  // nose at center col 5
  ".BGGGGGGGB.",  // face
  ".BGBGGGBGB.",  // eyes at cols 3 & 7
  "..BGGGGGB..",  // chin
  "..BBBBBBB..",  // neck / bottom
  "B..........",  // tail
  "B..........",
  ".B.........",  // tail curl
];
const CAT_COLORS: Record<string, string> = {
  B: "#1c1c26",
  G: "#606070",
  P: "#ff9fb2",
};
const CAT_PX = 5; // px per pixel cell — larger cat

export default function WorkspaceIllustration() {
  const DESK = 442;
  const SHELF1 = 208;
  const SHELF2 = 348;

  const LX = 355;
  const LAMP_BOTTOM = 72;

  // pull-cord drag state
  const CORD_X = LX + 52;        // hangs from right side of shade
  const CORD_BASE = LAMP_BOTTOM + 2; // attachment point on shade rim
  const CORD_LEN  = 44;           // natural cord length
  const MAX_PULL  = 72;           // max stretch in SVG units

  const [stretch, setStretch] = useState(0);
  const isDragging = useRef(false);
  const startY    = useRef(0);

  // oscilloscope wave helpers
  const waveRef = useRef<SVGGElement>(null);
  const waveId  = useRef(0);

  function startWave(duration?: number) {
    cancelAnimationFrame(waveId.current);
    const wave = waveRef.current;
    if (!wave) return;
    const PERIOD = 28;
    const MS     = 1800;
    let start: number | null = null;
    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      if (duration !== undefined && elapsed >= duration) {
        wave?.setAttribute("transform", "translate(0,0)");
        return;
      }
      const x = -(((elapsed % MS) / MS) * PERIOD);
      wave?.setAttribute("transform", `translate(${x.toFixed(3)},0)`);
      waveId.current = requestAnimationFrame(tick);
    }
    waveId.current = requestAnimationFrame(tick);
  }

  function stopWave() {
    cancelAnimationFrame(waveId.current);
    waveRef.current?.setAttribute("transform", "translate(0,0)");
  }

  useEffect(() => {
    startWave(5000); // auto-play for 5 s on page load
    return () => cancelAnimationFrame(waveId.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // terminal animation
  const COMMAND = "echo hello world";
  const OUTPUT  = "hello world";
  const [cmdText,      setCmdText]      = useState("");
  const [showOutput,   setShowOutput]   = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [cursor,       setCursor]       = useState(true);

  // mouse cursor that opens the terminal
  const [curX,         setCurX]         = useState(108);
  const [curY,         setCurY]         = useState(55);
  const [curMoving,    setCurMoving]    = useState(false);
  const [curClick,     setCurClick]     = useState(false);
  const [curVisible,   setCurVisible]   = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530);

    // 400ms: cursor starts sliding toward the terminal icon in the taskbar
    const tm1 = setTimeout(() => {
      setCurMoving(true);
      setCurX(20); setCurY(85);
    }, 400);

    // 1100ms: click (shrink)
    const tm2 = setTimeout(() => setCurClick(true),   1100);

    // 1220ms: release + terminal opens
    const tm3 = setTimeout(() => {
      setCurClick(false);
      setShowTerminal(true);
    }, 1220);

    // 1450ms: cursor fades out
    const tm4 = setTimeout(() => setCurVisible(false), 1450);

    // 1700ms: start typing
    let charIdx = 0;
    const t2 = setTimeout(() => {
      const type = setInterval(() => {
        charIdx++;
        setCmdText(COMMAND.slice(0, charIdx));
        if (charIdx >= COMMAND.length) {
          clearInterval(type);
          setTimeout(() => setShowOutput(true), 350);
        }
      }, 90);
    }, 1700);

    return () => {
      clearInterval(blink);
      clearTimeout(tm1); clearTimeout(tm2);
      clearTimeout(tm3); clearTimeout(tm4);
      clearTimeout(t2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // refs for imperative arm animation driven by the navbar toggle
  const lowerArmRef    = useRef<SVGGElement>(null);
  const upperArmRef    = useRef<SVGGElement>(null);
  const clawRef        = useRef<SVGGElement>(null);
  const armAnimating   = useRef(false);

  function waveArm() {
    if (armAnimating.current) return;
    armAnimating.current = true;

    const lower = lowerArmRef.current;
    const upper = upperArmRef.current;
    const claw  = clawRef.current;
    if (!lower || !upper || !claw) { armAnimating.current = false; return; }

    const theme = document.documentElement.dataset.theme ?? "dark";
    const restLower = theme === "light" ? "rotate(22deg)"  : "rotate(-10deg)";
    const restUpper = theme === "light" ? "rotate(-18deg)" : "rotate(18deg)";
    const restClaw  = theme === "light" ? "rotate(8deg)"   : "rotate(-6deg)";

    // 1. raise arm
    lower.style.transition = "transform 0.28s ease-out";
    upper.style.transition = "transform 0.28s ease-out 0.04s";
    claw.style.transition  = "transform 0.2s ease-out";
    lower.style.transform  = "rotate(-22deg)";
    upper.style.transform  = "rotate(-20deg)";
    claw.style.transform   = "rotate(0deg)";

    // 2. wave claw back and forth (3 swings)
    const swings = [25, -22, 25, -22, 10];
    swings.forEach((deg, i) => {
      setTimeout(() => {
        claw.style.transition = "transform 0.11s ease-in-out";
        claw.style.transform  = `rotate(${deg}deg)`;
      }, 290 + i * 120);
    });

    // 3. settle back to rest
    setTimeout(() => {
      lower.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
      upper.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.05s";
      claw.style.transition  = "transform 0.4s ease-out";
      lower.style.transform  = restLower;
      upper.style.transform  = restUpper;
      claw.style.transform   = restClaw;
    }, 920);

    // 4. hand back to CSS
    setTimeout(() => {
      lower.style.transform = upper.style.transform = claw.style.transform = "";
      lower.style.transition = upper.style.transition = claw.style.transition = "";
      armAnimating.current = false;
    }, 1550);
  }

  useEffect(() => {
    function onArmPull(e: Event) {
      if (armAnimating.current) return; // don't interrupt a wave
      armAnimating.current = true;
      const next  = (e as CustomEvent<string>).detail;
      const lower = lowerArmRef.current;
      const upper = upperArmRef.current;
      const claw  = clawRef.current;
      if (!lower || !upper || !claw) return;

      const out  = (d: string, delay = "0s") => `transform ${d} ease-out ${delay}`;
      const inE  = (d: string)              => `transform ${d} ease-in`;
      const spr  = (d: string, delay = "0s") =>
        `transform ${d} cubic-bezier(0.34,1.56,0.64,1) ${delay}`;

      // ── Phase 1: unfold arm and reach toward the cord (0–380ms) ──
      lower.style.transition = out("0.38s");
      upper.style.transition = out("0.38s", "0.06s");
      claw.style.transition  = out("0.25s", "0.12s");
      lower.style.transform  = "rotate(52deg)";
      upper.style.transform  = "rotate(8deg)";   // upper arm unfolds outward
      claw.style.transform   = "rotate(-14deg)"; // angle fingers toward cord

      // ── Phase 2: final approach — extend fully to cord handle (380ms) ──
      setTimeout(() => {
        lower.style.transition = out("0.14s");
        upper.style.transition = out("0.14s");
        claw.style.transition  = out("0.14s");
        lower.style.transform  = "rotate(60deg)";
        upper.style.transform  = "rotate(5deg)";
        claw.style.transform   = "rotate(-12deg)";
      }, 380);

      // ── Phase 3: clasp — fingers close around cord (520ms) ──
      setTimeout(() => {
        claw.style.transition = "transform 0.16s ease-in-out";
        claw.style.transform  = "rotate(-12deg) scaleX(0.12)"; // fingers pinch
      }, 520);

      // ── Phase 4: PULL — arm yanks cord downward (680ms) ──
      setTimeout(() => {
        lower.style.transition = inE("0.1s");
        upper.style.transition = inE("0.1s");
        lower.style.transform  = "rotate(64deg)";
        upper.style.transform  = "rotate(10deg)";
        claw.style.transform   = "rotate(-12deg) scaleX(0.12)";
        // also stretch the cord visually
        setStretch(28);
      }, 680);

      // ── Phase 5: release cord and open claw (850ms) ──
      setTimeout(() => {
        setStretch(0); // cord springs back
        claw.style.transition = out("0.18s");
        claw.style.transform  = "rotate(0deg) scaleX(1)"; // fingers open
      }, 850);

      // ── Phase 6: retract to new theme rest position (950ms) ──
      setTimeout(() => {
        lower.style.transition = spr("0.55s");
        upper.style.transition = spr("0.55s", "0.06s");
        lower.style.transform  = next === "light" ? "rotate(22deg)"  : "rotate(-10deg)";
        upper.style.transform  = next === "light" ? "rotate(-18deg)" : "rotate(18deg)";
      }, 950);

      // ── Phase 7: hand back to CSS rules (1550ms) ──
      setTimeout(() => {
        lower.style.transform  = upper.style.transform  = claw.style.transform  = "";
        lower.style.transition = upper.style.transition = claw.style.transition = "";
        armAnimating.current = false;
      }, 1550);
    }

    window.addEventListener("armPullCord", onArmPull);
    return () => window.removeEventListener("armPullCord", onArmPull);
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme ?? "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }

  function onPointerDown(e: React.PointerEvent<SVGGElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    startY.current = e.clientY;
  }

  function onPointerMove(e: React.PointerEvent<SVGGElement>) {
    if (!isDragging.current) return;
    const svgEl = e.currentTarget.closest("svg");
    const scale = svgEl ? svgEl.getBoundingClientRect().height / 580 : 1;
    const delta = Math.max(0, Math.min(MAX_PULL, (e.clientY - startY.current) / scale));
    setStretch(delta);
  }

  function onPointerUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const triggered = stretch > 16;
    setStretch(0);
    if (triggered) toggleTheme();
  }

  const keyRows = [13, 13, 11] as const;

  return (
    <svg
      className="workspace-illustration"
      viewBox="0 0 540 580"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustrated engineering workspace"
    >
      <defs>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c49060" />
          <stop offset="100%" stopColor="#8f5f38" />
        </linearGradient>
        <linearGradient id="shelfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c49060" />
          <stop offset="100%" stopColor="#a06b3a" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--highlight)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="deskGlow" cx="65%" cy="20%" r="70%">
          <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--highlight)" stopOpacity="0" />
        </radialGradient>
      </defs>


      {/* ── LAMP LIGHT CONE ── */}
      <path
        className="lamp-glow"
        d={`M${LX} ${LAMP_BOTTOM} L${LX - 145} 430 L${LX + 145} 430 Z`}
        fill="url(#lampGlow)"
      />

      {/* ── HANGING LAMP ── */}
      <g className="lamp">
        {/* ceiling mount plate */}
        <rect x={LX - 10} y="0" width="20" height="5" rx="2" fill="#3a3a46" />
        {/* cord with cable texture */}
        <line x1={LX} y1="5" x2={LX} y2="34" stroke="#2a2a32" strokeWidth="4" strokeLinecap="round" />
        <line x1={LX} y1="5" x2={LX} y2="34" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
        {/* cord cap */}
        <circle cx={LX} cy="34" r="4" fill="#3a3a46" />
        {/* shade outer body */}
        <path
          d={`M${LX - 34} 36 Q${LX} 18 ${LX + 34} 36 L${LX + 48} ${LAMP_BOTTOM} Q${LX} ${LAMP_BOTTOM - 14} ${LX - 48} ${LAMP_BOTTOM} Z`}
          fill="var(--accent)"
        />
        {/* shade inner shadow */}
        <path
          d={`M${LX - 30} 38 Q${LX} 22 ${LX + 30} 38 L${LX + 42} ${LAMP_BOTTOM - 2} Q${LX} ${LAMP_BOTTOM - 14} ${LX - 42} ${LAMP_BOTTOM - 2} Z`}
          fill="rgba(0,0,0,0.18)"
        />
        {/* shade left highlight */}
        <path d={`M${LX - 34} 36 Q${LX - 42} 52 ${LX - 48} ${LAMP_BOTTOM}`}
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        {/* shade rim */}
        <path
          d={`M${LX - 48} ${LAMP_BOTTOM} Q${LX} ${LAMP_BOTTOM - 10} ${LX + 48} ${LAMP_BOTTOM}`}
          fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeLinecap="round"
        />
        {/* shade rim underside */}
        <path
          d={`M${LX - 48} ${LAMP_BOTTOM} Q${LX} ${LAMP_BOTTOM + 6} ${LX + 48} ${LAMP_BOTTOM}`}
          fill="rgba(0,0,0,0.15)"
        />
        {/* bulb glow */}
        <ellipse className="lamp__bulb" cx={LX} cy={LAMP_BOTTOM} rx="26" ry="8"
          fill="var(--highlight)" opacity="0.9"
          style={{ transition: "opacity 0.4s ease, fill 0.4s ease" }} />
        {/* bulb center hot-spot */}
        <ellipse className="lamp__bulb" cx={LX} cy={LAMP_BOTTOM} rx="10" ry="3.5"
          fill="white" opacity="0.6"
          style={{ transition: "opacity 0.4s ease" }} />

        {/* ── PULL CORD (draggable) ── */}
        <g
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{ cursor: isDragging.current ? "grabbing" : "grab", touchAction: "none" }}
          role="button"
          aria-label="Pull to toggle light / dark mode"
        >
          {/* wide invisible hit area */}
          <rect x={CORD_X - 14} y={CORD_BASE} width="28" height={CORD_LEN + MAX_PULL + 14} fill="transparent" />

          {/* cord string — stretches with drag */}
          <path
            d={`M${CORD_X},${CORD_BASE} Q${CORD_X + stretch * 0.25},${CORD_BASE + (CORD_LEN + stretch) * 0.5} ${CORD_X},${CORD_BASE + CORD_LEN + stretch}`}
            fill="none"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* handle circle — springs back via CSS transition */}
          <circle
            cx={CORD_X}
            cy={CORD_BASE + CORD_LEN}
            r="7"
            fill="var(--accent)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            style={{
              transform: `translateY(${stretch}px)`,
              transformBox: "fill-box",
              transformOrigin: "center top",
              transition: isDragging.current
                ? "none"
                : "transform 0.55s cubic-bezier(0.34, 1.8, 0.64, 1)",
            }}
          />
        </g>
      </g>

      {/* ── SHELF BRACKETS ── */}
      {[SHELF1, SHELF2].map((sy) => (
        <g key={sy}>
          <rect x="16" y={sy} width="8" height="18" rx="2" fill="rgba(255,255,255,0.1)" />
          <rect x="300" y={sy} width="8" height="18" rx="2" fill="rgba(255,255,255,0.1)" />
          <path d={`M16 ${sy} l12 14`} stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <path d={`M308 ${sy} l-12 14`} stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        </g>
      ))}

      {/* ── SHELF 1 BOARD ── */}
      <rect x="14" y={SHELF1} width="310" height="11" rx="3" fill="url(#shelfGrad)" />
      <rect x="14" y={SHELF1} width="310" height="3" rx="2" fill="rgba(255,255,255,0.18)" />
      <rect x="14" y={SHELF1 + 11} width="310" height="4" fill="rgba(0,0,0,0.18)" />

      {/* TOP SHELF: Books */}
      <g transform={`translate(22, ${SHELF1 - 68})`}>

        {/* Book 1 — purple / EMBEDDED */}
        <rect x="0" y="0" width="20" height="68" rx="2" fill="var(--accent)" />
        {/* spine left-edge highlight */}
        <rect x="0" y="0" width="3" height="68" rx="2" fill="rgba(255,255,255,0.14)" />
        {/* page top */}
        <rect x="2" y="0" width="16" height="3" rx="1" fill="rgba(245,240,228,0.75)" />
        {/* title band */}
        <rect x="0" y="50" width="20" height="14" fill="rgba(0,0,0,0.22)" />
        {/* embossed circle */}
        <circle cx="10" cy="26" r="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* yellow bookmark */}
        <rect x="14" y="0" width="4" height="14" rx="1" fill="#ffd23f" />
        <path d="M14 14 l2 3 l2 -3" fill="#ffd23f" />

        {/* Book 2 — blue / SIGNALS */}
        <rect x="22" y="5" width="20" height="63" rx="2" fill="var(--accent-2)" />
        <rect x="22" y="5" width="3" height="63" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="24" y="5" width="16" height="3" rx="1" fill="rgba(245,240,228,0.75)" />
        <rect x="22" y="54" width="20" height="10" fill="rgba(0,0,0,0.2)" />
        {/* sine-wave deco line */}
        <path d="M26 30 q3 -6 6 0 t6 0" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Book 3 — teal / ROBOTICS */}
        <rect x="44" y="2" width="20" height="66" rx="2" fill="var(--highlight)" />
        <rect x="44" y="2" width="3" height="66" rx="2" fill="rgba(255,255,255,0.14)" />
        <rect x="46" y="2" width="16" height="3" rx="1" fill="rgba(245,240,228,0.75)" />
        <rect x="44" y="54" width="20" height="12" fill="rgba(0,0,0,0.18)" />
        {/* robot icon deco */}
        <rect x="50" y="14" width="8" height="8" rx="1.5" fill="rgba(0,0,0,0.18)" />
        <circle cx="52" cy="16" r="1" fill="rgba(0,0,0,0.3)" />
        <circle cx="56" cy="16" r="1" fill="rgba(0,0,0,0.3)" />
        <rect x="51" y="20" width="6" height="1" rx="0.5" fill="rgba(0,0,0,0.3)" />

        {/* Book 4 — gray / AI/ML */}
        <rect x="66" y="6" width="18" height="62" rx="2" fill="#8c8c98" />
        <rect x="66" y="6" width="3" height="62" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="68" y="6" width="14" height="3" rx="1" fill="rgba(245,240,228,0.7)" />
        <rect x="66" y="54" width="18" height="10" fill="rgba(0,0,0,0.2)" />
        {/* neural net dots deco */}
        {[18, 26, 34].map((y) => (
          <circle key={y} cx="72" cy={y} r="1.2" fill="rgba(255,255,255,0.35)" />
        ))}
        {[22, 30].map((y) => (
          <circle key={y} cx="78" cy={y} r="1.2" fill="rgba(255,255,255,0.25)" />
        ))}
        <line x1="72" y1="18" x2="78" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        <line x1="72" y1="26" x2="78" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        <line x1="72" y1="26" x2="78" y2="30" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        <line x1="72" y1="34" x2="78" y2="30" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />

        {/* Orange book leaning */}
        <g transform="rotate(-30, 117, 68)">
          <rect x="117" y="4" width="19" height="64" rx="2" fill="#c47a3f" />
          <rect x="117" y="4" width="3" height="64" rx="2" fill="rgba(255,255,255,0.12)" />
          <rect x="119" y="4" width="15" height="3" rx="1" fill="rgba(245,240,228,0.7)" />
          <rect x="117" y="53" width="19" height="12" fill="rgba(0,0,0,0.2)" />
        </g>
      </g>

      {/* TOP SHELF: Plant */}
      <g transform={`translate(165, ${SHELF1 - 64})`}>
        {/* back leaves (darker, behind) */}
        <path d="M15 46 Q-10 24 2 -4 Q14 20 15 46" fill="#2e7d32" opacity="0.75" />
        <path d="M15 46 Q40 18 30 -8 Q18 18 15 46" fill="#337a3a" opacity="0.75" />
        {/* mid leaves */}
        <path d="M15 46 Q-4 22 8 0 Q16 24 15 46" fill="#4ca86a" />
        <path d="M15 46 Q34 20 24 -2 Q15 22 15 46" fill="var(--highlight)" opacity="0.85" />
        {/* small front leaf */}
        <path d="M15 46 Q4 36 8 24 Q16 36 15 46" fill="#56c278" />
        {/* leaf veins */}
        <path d="M13 44 Q6 28 9 4" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        <path d="M15 44 Q22 26 22 0" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
        {/* side vein details */}
        <path d="M10 24 Q6 22 4 18" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />
        <path d="M21 22 Q25 20 27 16" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.6" />
        {/* stem */}
        <line x1="15" y1="46" x2="15" y2="28" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" />
        {/* pot */}
        <path d="M4 46 h24 l-3 18 h-18 z" fill="#b8804f" />
        {/* pot shading */}
        <path d="M24 46 l-2 18" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
        {/* pot rim */}
        <rect x="2" y="43" width="28" height="5" rx="2" fill="#caa07a" />
        {/* soil */}
        <ellipse cx="16" cy="46" rx="12" ry="3" fill="#3e2006" />
        <ellipse cx="16" cy="46" rx="8" ry="1.8" fill="#5d3a1a" opacity="0.7" />
        {/* pot highlight stripe */}
        <path d="M6 52 q2 -1 4 0" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* TOP SHELF: Robotic Arm */}
      <g
        className="robotic-arm"
        transform={`translate(245, ${SHELF1})`}
        onMouseEnter={waveArm}
        style={{ cursor: "pointer" }}
      >
        {/* base mount plate with bolts */}
        <rect x="-22" y="-10" width="44" height="10" rx="3" fill="#3a3a46" />
        <rect x="-22" y="-10" width="44" height="4" rx="3" fill="rgba(255,255,255,0.08)" />
        <circle cx="-14" cy="-5" r="2" fill="#2a2a32" />
        <circle cx="14" cy="-5" r="2" fill="#2a2a32" />

        {/* shoulder housing */}
        <circle cx="0" cy="-10" r="12" fill="#38383f" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <circle cx="0" cy="-10" r="7" fill="#46464f" />
        <circle cx="0" cy="-10" r="3" fill="#2a2a32" />
        {/* shoulder accent ring */}
        <circle cx="0" cy="-10" r="10" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />

        <g ref={lowerArmRef} className="robotic-arm__lower" style={{ transformOrigin: "0px -10px" }}>
          {/* lower arm — dual-rail design */}
          <rect x="-7" y="-92" width="5" height="82" rx="3" fill="#46464f" />
          <rect x="2" y="-92" width="5" height="82" rx="3" fill="#46464f" />
          {/* cross braces */}
          <rect x="-7" y="-70" width="14" height="3" rx="1" fill="#38383f" />
          <rect x="-7" y="-50" width="14" height="3" rx="1" fill="#38383f" />
          <rect x="-7" y="-30" width="14" height="3" rx="1" fill="#38383f" />
          {/* edge highlights */}
          <rect x="-7" y="-92" width="2" height="82" rx="1" fill="rgba(255,255,255,0.1)" />
          <rect x="2" y="-92" width="2" height="82" rx="1" fill="rgba(255,255,255,0.1)" />

          {/* elbow housing */}
          <circle cx="0" cy="-92" r="9" fill="#38383f" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <circle cx="0" cy="-92" r="5" fill="#46464f" />
          <circle cx="0" cy="-92" r="2" fill="#2a2a32" />
          <circle cx="0" cy="-92" r="7.5" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />

          <g ref={upperArmRef} className="robotic-arm__upper" style={{ transformOrigin: "0px -92px" }}>
            {/* upper arm — single tapered rail */}
            <rect x="-5" y="-155" width="10" height="63" rx="4" fill="#54545f" />
            <rect x="-5" y="-155" width="3" height="63" rx="2" fill="rgba(255,255,255,0.1)" />
            {/* upper arm banding */}
            <rect x="-5" y="-132" width="10" height="2.5" rx="1" fill="#3a3a46" />
            <rect x="-5" y="-112" width="10" height="2.5" rx="1" fill="#3a3a46" />

            {/* wrist housing */}
            <circle cx="0" cy="-155" r="7.5" fill="#38383f" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <circle cx="0" cy="-155" r="4" fill="#46464f" />
            <circle cx="0" cy="-155" r="1.5" fill="#2a2a32" />
            <circle cx="0" cy="-155" r="6" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />

            <g ref={clawRef} className="robotic-arm__claw" style={{ transformOrigin: "0px -155px" }}>
              {/* claw arms with taper */}
              <path d="M0 -155 L-13 -176" stroke="#46464f" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M0 -155 L13 -176"  stroke="#46464f" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M0 -155 L-13 -176" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M0 -155 L13 -176"  stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* fingertip pads */}
              <circle cx="-13" cy="-176" r="4" fill="#38383f" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="13"  cy="-176" r="4" fill="#38383f" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="-13" cy="-176" r="1.5" fill="var(--accent)" />
              <circle cx="13"  cy="-176" r="1.5" fill="var(--accent)" />
            </g>
          </g>
        </g>
      </g>

      {/* ── SHELF 2 BOARD ── */}
      <rect x="14" y={SHELF2} width="310" height="11" rx="3" fill="url(#shelfGrad)" />
      <rect x="14" y={SHELF2} width="310" height="3" rx="2" fill="rgba(255,255,255,0.18)" />
      <rect x="14" y={SHELF2 + 11} width="310" height="4" fill="rgba(0,0,0,0.18)" />

      {/* BOTTOM SHELF: Oscilloscope */}
      <g
        transform={`translate(22, ${SHELF2 - 70})`}
        onMouseEnter={() => startWave()}
        onMouseLeave={() => stopWave()}
        style={{ cursor: "crosshair" }}
      >
        {/* body */}
        <rect width="116" height="70" rx="7" fill="#252530" />
        <rect width="116" height="4" rx="7" fill="rgba(255,255,255,0.06)" />
        {/* screen background */}
        <rect x="8" y="8" width="82" height="48" rx="3" fill="#0b1018" />
        {/*
          Nested <svg> at the screen position — its viewport clips content
          automatically (overflow hidden by default on SVG viewports).
          Coords inside are relative to screen top-left: (0,0)→(82,48).
          Wave midline at y=24 (half of 48).
        */}
        <svg x="8" y="8" width="82" height="48">
          {/* grid */}
          <line x1="0" y1="24" x2="82" y2="24" stroke="rgba(110,231,216,0.15)" strokeWidth="1" />
          <line x1="41" y1="0" x2="41" y2="48" stroke="rgba(110,231,216,0.15)" strokeWidth="1" />
          {/* wave — starts one period left of screen so scroll always fills */}
          <g ref={waveRef}>
            <path
              d="M-28 24 q7 -16 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0"
              fill="none"
              stroke="var(--highlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
        {/* screen border */}
        <rect x="8" y="8" width="82" height="48" rx="3" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        {/* knobs */}
        <circle cx="100" cy="16" r="5" fill="#3a3a46" stroke="rgba(255,255,255,0.1)" />
        <circle cx="100" cy="32" r="5" fill="#3a3a46" stroke="rgba(255,255,255,0.1)" />
        <circle cx="100" cy="48" r="5" fill="#3a3a46" stroke="rgba(255,255,255,0.1)" />
        {/* BNC connectors */}
        <circle cx="14" cy="62" r="3.5" fill="#555560" stroke="rgba(255,255,255,0.12)" />
        <circle cx="27" cy="62" r="3.5" fill="#555560" stroke="rgba(255,255,255,0.12)" />
      </g>

      {/* BOTTOM SHELF: Power Supply */}
      <g transform={`translate(152, ${SHELF2 - 64})`}>
        <rect width="82" height="64" rx="7" fill="#252530" />
        <rect width="82" height="4" rx="7" fill="rgba(255,255,255,0.06)" />
        <rect x="7" y="8" width="68" height="22" rx="3" fill="#0a1510" />
        <text x="11" y="16" fontSize="7.5" fill="var(--highlight)" fontFamily="monospace" fontWeight="bold">12.00 V</text>
        <text x="11" y="27" fontSize="7.5" fill="var(--accent-2)" fontFamily="monospace">0.200 A</text>
        <circle cx="20" cy="46" r="8" fill="#3a3a46" stroke="rgba(255,255,255,0.1)" />
        <line x1="20" y1="38" x2="20" y2="42" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="42" cy="46" r="8" fill="#3a3a46" stroke="rgba(255,255,255,0.1)" />
        <line x1="42" y1="38" x2="44" y2="42" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="62" cy="40" r="4" fill="#c23b3b" stroke="rgba(255,255,255,0.12)" />
        <circle cx="74" cy="40" r="4" fill="#3b3b3b" stroke="rgba(255,255,255,0.12)" />
        <path d="M62 44 q0 12 -8 16" fill="none" stroke="#c23b3b" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M74 44 q0 12 8 16" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── DESK ── */}
      <ellipse cx={LX} cy={DESK} rx="200" ry="14" fill="url(#deskGlow)" />
      <rect x="12" y={DESK} width="516" height="16" rx="3" fill="url(#deskGrad)" />
      <rect x="12" y={DESK} width="516" height="3" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="12" y={DESK + 16} width="516" height="10" fill="#6e4020" />

      {/* ── DESK LEFT: Rubik's cube ── */}
      <g transform={`translate(22, ${DESK - 34})`}>
        {/* body */}
        <rect width="34" height="34" rx="4" fill="#f0f0f0" />
        {/* stickers */}
        {[0,1,2].map((row) =>
          [0,1,2].map((col) => {
            const colors = [
              ["#ff5a5f","#ffd23f","#4cd964"],
              ["#5fa8ff","#ffffff","#ff5a5f"],
              ["#ffd23f","#5fa8ff","#4cd964"],
            ] as const;
            return (
              <rect key={`c-${row}-${col}`}
                x={2.5 + col * 10} y={2.5 + row * 10}
                width="8.5" height="8.5" rx="2"
                fill={colors[row][col]}
              />
            );
          })
        )}
        {/* subtle gloss on top-left */}
        <rect width="34" height="34" rx="4" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
        <path d="M2 2 Q17 0 32 2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── DESK LEFT: ESP32 ── */}
      <g transform={`translate(70, ${DESK - 14})`}>
        <rect width="64" height="14" rx="3" fill="#1b3b2c" />
        <rect x="6" y="3" width="24" height="8" rx="1" fill="#0a0e12" />
        <circle className="led-blink" cx="38" cy="7" r="2.8" fill="var(--highlight)" />
        <circle className="led-blink led-blink--delay" cx="48" cy="7" r="2.8" fill="var(--accent-2)" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={`pt-${i}`} x={1 + i * 8} y={-4} width="2.5" height="4" rx="0.5" fill="#9a9a9a" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={`pb-${i}`} x={1 + i * 8} y={14} width="2.5" height="4" rx="0.5" fill="#9a9a9a" />
        ))}
      </g>

      {/* connecting wire ESP32 → breadboard */}
      <path d={`M134 ${DESK - 7} q8 -3 14 -5`} fill="none" stroke="var(--highlight)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d={`M134 ${DESK - 10} q8 -2 14 -2`} fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* ── DESK LEFT: Breadboard ── */}
      <g transform={`translate(148, ${DESK - 22})`}>
        {/* body */}
        <rect width="104" height="22" rx="3" fill="#e8e4d8" />
        {/* power rail strips */}
        <rect x="2" y="2"   width="100" height="3" rx="1" fill="#cc4444" opacity="0.6" />
        <rect x="2" y="17"  width="100" height="3" rx="1" fill="#4455cc" opacity="0.6" />
        {/* center divider */}
        <rect x="2" y="10" width="100" height="2" rx="1" fill="#c8c4b8" />
        {/* hole grid - top half */}
        {Array.from({ length: 12 }).map((_, col) =>
          [6].map((row) => (
            <circle key={`th-${col}`} cx={6 + col * 8} cy={row} r="1.2" fill="#b8b4a8" />
          ))
        )}
        {/* hole grid - bottom half */}
        {Array.from({ length: 12 }).map((_, col) =>
          [14].map((row) => (
            <circle key={`bh-${col}`} cx={6 + col * 8} cy={row} r="1.2" fill="#b8b4a8" />
          ))
        )}
        {/* a few jumper wires */}
        <path d="M14 6 q10 -6 22 0" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M54 14 q12 5 20 0" fill="none" stroke="var(--highlight)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M30 6 q6 -4 14 8" fill="none" stroke="#ffd23f" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* ── DESK RIGHT: Monitor ── */}
      {/* stand base */}
      <rect x="345" y={DESK - 6} width="96" height="6" rx="3" fill="#3a3a46" />
      {/* stand neck */}
      <rect x="389" y={DESK - 58} width="13" height="52" rx="4" fill="#46464f" />
      {/* screen back panel */}
      <rect x="300" y={DESK - 172} width="186" height="116" rx="8" fill="#252530" />
      <rect x="300" y={DESK - 172} width="186" height="5" rx="8" fill="rgba(255,255,255,0.05)" />
      {/* screen bezel */}
      <rect x="306" y={DESK - 166} width="174" height="104" rx="4" fill="#0d0e14" />
      {/* screen content — nested svg clips automatically */}
      <svg x="312" y={DESK - 160} width="162" height="92" overflow="hidden">

        {/* ── DESKTOP ── dark blue-grey, complements terminal */}
        <rect width="162" height="92" fill="#1c2235" />

        {/* pixel cat — 5 px per cell, face horizontally centered
            cat body cols 1-9 → 9 cols × 5 = 45 px
            center offset: (162 - 45) / 2 - 5 (col-1 offset) = 53 */}
        {CAT_ART.map((row, r) =>
          [...row].map((ch, c) => {
            const fill = CAT_COLORS[ch];
            if (!fill) return null;
            return (
              <rect
                key={`cat-${r}-${c}`}
                x={53 + c * CAT_PX} y={14 + r * CAT_PX}
                width={CAT_PX} height={CAT_PX}
                fill={fill}
              />
            );
          })
        )}

        {/* right-side desktop icons */}
        <rect x="147" y="7"  width="10" height="10" rx="2" fill="#8b6fb8" opacity="0.75" />
        <rect x="147" y="21" width="10" height="10" rx="2" fill="#5fa8ff" opacity="0.7" />
        <rect x="147" y="35" width="10" height="10" rx="2" fill="#6ee7d8" opacity="0.65" />

        {/* taskbar */}
        <rect x="0" y="82" width="162" height="10" fill="rgba(0,0,0,0.6)" />
        {/* start button */}
        <rect x="2" y="83.5" width="8" height="7" rx="1.5" fill="rgba(255,255,255,0.18)" />
        {/* terminal icon — this is what the cursor clicks */}
        <rect x="14" y="83.5" width="10" height="7" rx="1.5" fill="#252340" stroke="rgba(110,231,216,0.5)" strokeWidth="0.8" />
        <text x="19" y="89" fontSize="4.5" fontFamily="monospace" fill="#6ee7d8" textAnchor="middle">$_</text>

        {/* ── TERMINAL WINDOW ── */}
        {showTerminal && (
          <g>
            {/* drop shadow */}
            <rect x="22" y="12" width="108" height="64" rx="4" fill="rgba(0,0,0,0.35)" />
            {/* window body — semi-transparent so cat shows through */}
            <rect x="20" y="10" width="108" height="62" rx="4" fill="rgba(18,16,40,0.88)" />
            {/* title bar */}
            <rect x="20" y="10" width="108" height="12" rx="4" fill="#1e1c38" />
            <rect x="20" y="17" width="108" height="5"  fill="#1e1c38" />
            {/* traffic-light buttons */}
            <circle cx="28"  cy="16" r="2.8" fill="#ff5f56" />
            <circle cx="36"  cy="16" r="2.8" fill="#febc2e" />
            <circle cx="44"  cy="16" r="2.8" fill="#27c93f" />
            {/* title */}
            <text x="74" y="18.5" fontSize="4.5" fontFamily="sans-serif"
              fill="rgba(255,255,255,0.4)" textAnchor="middle">bash</text>
            {/* prompt + command */}
            <text x="26" y="34" fontSize="7" fontFamily="monospace" fill="#6ee7d8">
              {"$ "}
              <tspan fill="#f0f0f0">{cmdText}</tspan>
              {!showOutput && cursor ? <tspan fill="#f0f0f0">▋</tspan> : null}
            </text>
            {/* output */}
            {showOutput && (
              <text x="26" y="46" fontSize="7" fontFamily="monospace" fill="#f0f0f0">
                {OUTPUT}
                {cursor ? <tspan fill="#6ee7d8">▋</tspan> : null}
              </text>
            )}
          </g>
        )}

        {/* ── MOUSE CURSOR ── slides to terminal icon and clicks */}
        {curVisible && (
          <g
            style={{
              transform: `translate(${curX}px, ${curY}px) scale(${curClick ? 0.78 : 1})`,
              transition: curMoving
                ? `transform 0.62s cubic-bezier(0.4,0,0.2,1)`
                : "transform 0.08s ease",
              transformOrigin: "0 0",
              transformBox: "fill-box",
            }}
          >
            <path
              d="M0 0 L0 13 L3.5 10.5 L5.5 15.5 L7.5 14.5 L5.5 9.5 L10 9.5 Z"
              fill="white"
              stroke="rgba(0,0,0,0.45)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
      {/* power LED */}
      <circle cx="308" cy={DESK - 59} r="1.4" fill="var(--highlight)" opacity="0.9" />
      {/* cable */}
      <path d={`M395 ${DESK - 58} q0 20 -4 34 q-3 9 2 16`} fill="none" stroke="#3a3a46" strokeWidth="3" strokeLinecap="round" />

      {/* ── DESK RIGHT: Keyboard (flat/top-down) ── */}
      <g transform={`translate(310, ${DESK - 17})`}>
        <rect width="158" height="17" rx="4" fill="#2a2a32" />
        <rect width="158" height="3" rx="4" fill="rgba(255,255,255,0.06)" />
        {/* row 1 */}
        {Array.from({ length: 14 }).map((_, col) => (
          <rect key={`r0-${col}`} x={3 + col * 11} y={3} width="9" height="4" rx="1"
            fill={col === 13 ? "#ffd23f" : "#3d3d48"} opacity="0.9" />
        ))}
        {/* row 2 */}
        {Array.from({ length: 13 }).map((_, col) => (
          <rect key={`r1-${col}`} x={3 + col * 11} y={10} width={col === 12 ? 15 : 9} height="4" rx="1"
            fill={col === 8 ? "var(--highlight)" : col === 12 ? "var(--accent)" : "#3d3d48"} opacity="0.9" />
        ))}
      </g>

      {/* ── DESK RIGHT: Mouse ── */}
      <g transform={`translate(496, ${DESK - 22})`}>
        {/* body — top-down oval */}
        <rect width="28" height="22" rx="10" fill="#2a2a32" />
        <rect width="28" height="3" rx="10" fill="rgba(255,255,255,0.07)" />
        {/* button divider */}
        <line x1="14" y1="0" x2="14" y2="13" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* scroll wheel */}
        <rect x="11" y="4" width="6" height="8" rx="2" fill="#46464f" />
        <rect x="12" y="5" width="4" height="6" rx="1.5" fill="rgba(255,255,255,0.15)" />
      </g>
    </svg>
  );
}
