import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone,
  MapPin,
  Sparkles,
  Truck,
  ShieldCheck,
  Recycle,
  Clock,
  Star,
  Check,
  ArrowRight,
  Camera,
} from "lucide-react";

/**
 * Single-file, graphics-heavy landing page for a Reno, NV junk hauling business.
 * - Animated "truck" navigation that drives to the active section
 * - Bold hero with SVG illustration + parallax-y accents
 * - Services, pricing, gallery, reviews, CTA
 *
 * Tailwind required. Framer Motion required.
 */

const NAV = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "gallery", label: "Before/After" },
  { id: "reviews", label: "Reviews" },
  { id: "book", label: "Book" },
] as const;

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function useActiveSection(ids: string[], offsetPx = 120) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const onScroll = () => {
      const y = window.scrollY + offsetPx;
      let best = els[0];
      for (const el of els) {
        if (el.offsetTop <= y) best = el;
      }
      setActive(best.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offsetPx]);

  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function AnimatedTruck({ compact = false }: { compact?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 800 280"
      className={clsx(
        "w-full",
        compact ? "h-12" : "h-48",
        "drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
      )}
      aria-label="Pickup truck hauling junk"
      role="img"
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="truckOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fb923c" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="trailerMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9ca3af" />
          <stop offset="1" stopColor="#6b7280" />
        </linearGradient>
        <filter id="drop-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.25"/>
        </filter>
      </defs>

      {/* Ground line & shadow */}
      <ellipse cx="400" cy="245" rx="320" ry="12" fill="rgba(0,0,0,0.1)" />

      {/* === FLATBED TRAILER === */}
      <g transform="translate(380, 120)">
        {/* Hitch to truck */}
        <rect x="-50" y="95" width="55" height="10" rx="5" fill="#1e293b" filter="url(#drop-shadow)" />
        
        {/* Trailer frame */}
        <g filter="url(#drop-shadow)">
          {/* Main bed */}
          <rect x="0" y="100" width="350" height="25" rx="3" fill="url(#trailerMetal)" />
          <rect x="0" y="100" width="350" height="6" fill="#c7d2e0" opacity="0.4" />
          
          {/* Side rails */}
          <rect x="-8" y="65" width="8" height="60" fill="#4b5563" />
          <rect x="350" y="65" width="8" height="60" fill="#4b5563" />
          <rect x="-8" y="125" width="366" height="4" fill="#1e293b" />
          
          {/* Junk pile - random shapes stacked */}
          {/* Wooden furniture pieces */}
          <rect x="20" y="50" width="50" height="50" rx="3" fill="#92400e" opacity="0.8" />
          <rect x="30" y="58" width="30" height="35" rx="2" fill="#a16207" opacity="0.7" />
          
          {/* Boxes */}
          <rect x="85" y="55" width="40" height="45" rx="2" fill="#7c2d12" opacity="0.85" />
          <rect x="140" y="50" width="45" height="50" rx="2" fill="#854d0e" opacity="0.75" />
          <rect x="155" y="62" width="25" height="30" fill="#d97706" opacity="0.6" />
          
          {/* Old mattress/cushion */}
          <ellipse cx="200" cy="35" rx="45" ry="18" fill="#78716c" opacity="0.7" />
          
          {/* Bags */}
          <ellipse cx="270" cy="65" rx="28" ry="35" fill="#27272a" opacity="0.8" />
          <ellipse cx="305" cy="70" rx="25" ry="32" fill="#18181b" opacity="0.75" />
          
          {/* Random clutter on top */}
          <rect x="50" y="35" width="20" height="15" fill="#78716c" opacity="0.7" transform="rotate(-15 60 42)" />
          <circle cx="120" cy="75" r="10" fill="#64748b" opacity="0.6" />
          <rect x="250" y="80" width="18" height="14" fill="#92400e" opacity="0.65" transform="rotate(20 259 87)" />
        </g>
        
        {/* Securing straps/ropes across load */}
        <path d="M -5 85 Q 175 20 355 85" stroke="#eab308" strokeWidth="3" fill="none" opacity="0.5" filter="url(#drop-shadow)" />
        <path d="M -5 92 Q 175 30 355 92" stroke="#eab308" strokeWidth="3" fill="none" opacity="0.5" filter="url(#drop-shadow)" />

        {/* Trailer wheels - dual axle */}
        <g>
          {[60, 120, 280, 340].map((x) => (
            <g key={x} transform={`translate(${x}, 130)`}>
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "0px 0px" }}
              >
                <circle r="20" fill="#1e293b" filter="url(#drop-shadow)" />
                <circle r="18" fill="#0f172a" />
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <line key={a} x1="0" y1="0" x2="0" y2="-17" stroke="#475569" strokeWidth="2" transform={`rotate(${a})`} />
                ))}
              </motion.g>
              <circle r="11" fill="#334155" />
              <circle r="3" fill="#0f172a" />
            </g>
          ))}
        </g>
      </g>

      {/* === PICKUP TRUCK (IMAGE ASSET) === */}
      <g transform="translate(18, 58)">
        <image
          href="/truck-line-art.svg"
          x="0"
          y="0"
          width="360"
          height="210"
          preserveAspectRatio="xMinYMid meet"
          style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))" }}
        />

        {/* Hitch point to trailer */}
        <circle cx="338" cy="157" r="4" fill="#64748b" />
      </g>

      {/* Exhaust puffs */}
      <motion.g
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="48" cy="158" r="3.5" fill="#a1a5b4" opacity="0.4" />
        <circle cx="38" cy="153" r="4.5" fill="#cbd5e1" opacity="0.3" />
        <circle cx="30" cy="149" r="3" fill="#e2e8f0" opacity="0.2" />
      </motion.g>
    </motion.svg>
  );
}

function TrashConfetti() {
  // A few floating "junk" chips for vibe
  const items = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 0.85 + Math.random() * 1.15,
        d: 5 + Math.random() * 7,
        r: -8 + Math.random() * 16,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: `${16 * it.s}px`,
            height: `${16 * it.s}px`,
          }}
          initial={{ y: 0, rotate: it.r, opacity: 0.35 }}
          animate={{ y: [0, -18, 0], rotate: [it.r, it.r + 10, it.r] }}
          transition={{ duration: it.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function SectionTag({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border-2 border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 px-3 py-1.5 text-xs font-bold tracking-wide text-orange-200">
      <Icon className="h-4 w-4 text-orange-400" />
      {label}
    </div>
  );
}

function PriceCard({
  title,
  price,
  note,
  bullets,
  featured,
}: {
  title: string;
  price: string;
  note: string;
  bullets: string[];
  featured?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl border-2 p-6",
        featured
          ? "border-orange-500/40 bg-gradient-to-br from-orange-500/20 via-yellow-500/10 to-slate-800/50 shadow-[0_20px_60px_rgba(251,146,60,0.25)]"
          : "border-slate-600/40 bg-gradient-to-br from-slate-800/50 to-slate-900/50"
      )}
    >
      {featured && (
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-orange-500/30">
          <Sparkles className="h-4 w-4" />
          Most Popular
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/70">{note}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-white">{price}</div>
          <div className="text-xs text-white/60">transparent estimates</div>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-2 text-sm text-white/80">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{b}</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={() => scrollToId("book")}
          className={clsx(
            "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition-all duration-200",
            featured
              ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02]"
              : "border-2 border-orange-500/30 bg-slate-700/50 text-white hover:bg-slate-600/50 hover:border-orange-500/50"
          )}
        >
          Get a quote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

function ReviewCard({
  name,
  text,
  stars = 5,
}: {
  name: string;
  text: string;
  stars?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="rounded-2xl border-2 border-slate-600/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="font-black text-orange-300">{name}</div>
        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={clsx("h-4 w-4 fill-current", i < stars ? "opacity-100" : "opacity-30")} />
          ))}
        </div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-300">{text}</div>
    </motion.div>
  );
}

function GalleryTile({ label, variant }: { label: string; variant: "before" | "after" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="relative overflow-hidden rounded-2xl border-2 border-slate-600/40 bg-slate-900/50"
    >
      <div className="absolute inset-0">
        <div
          className={clsx(
            "absolute inset-0",
            variant === "before"
              ? "bg-[radial-gradient(circle_at_30%_20%,rgba(100,116,139,0.3),transparent_45%),linear-gradient(135deg,rgba(71,85,105,0.2),rgba(51,65,85,0.1))]"
              : "bg-[radial-gradient(circle_at_70%_20%,rgba(251,146,60,0.25),transparent_50%),radial-gradient(circle_at_20%_70%,rgba(234,179,8,0.18),transparent_45%),linear-gradient(135deg,rgba(251,146,60,0.1),rgba(234,179,8,0.05))]"
          )}
        />
        <motion.div
          className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white">
          <Camera className="h-4 w-4" />
          {variant === "before" ? "BEFORE" : "AFTER"}
        </div>
        <div className="mt-4 text-lg font-extrabold text-white">{label}</div>
        <div className="mt-2 text-sm text-white/70">
          {variant === "before"
            ? "Cluttered, heavy, stressful."
            : "Clean, swept, and ready to breathe."}
        </div>
      </div>
      <div className="relative h-40">
        {/* "Pile" illustration */}
        <div className="absolute inset-0 flex items-end justify-center pb-6">
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "h-5 w-5 rounded-xl border",
                  variant === "before"
                    ? "border-white/10 bg-white/10"
                    : "border-white/10 bg-white/5"
                )}
                style={{
                  transform: `translateY(${variant === "before" ? (i % 6) * -2 : (i % 6) * 2}px) rotate(${(i % 5) * 6}deg)`,
                  opacity: variant === "before" ? 0.8 : 0.35,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Page -------------------------------------------------------------------

export default function RenoJunkHaulingSite() {
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(NAV.map((n) => n.id), 160);
  const [showLoadingTruck, setShowLoadingTruck] = useState(true);

  useEffect(() => {
    // Hide the loading truck after animation completes
    const timer = setTimeout(() => {
      setShowLoadingTruck(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [truckX, setTruckX] = useState(0);

  useLayoutEffect(() => {
    const container = document.getElementById("navRail");
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();

      const btn = navRefs.current[active];
      if (!btn) return;
      const b = btn.getBoundingClientRect();
      // center the truck under the active button
      const x = b.left - rect.left + b.width / 2;
      setTruckX(x);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const heroBadges = [
    { icon: ShieldCheck, label: "Licensed & Insured" },
    { icon: Clock, label: "Same-day available" },
    { icon: Recycle, label: "Donate + recycle first" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Loading Truck Animation */}
      <AnimatePresence>
        {showLoadingTruck && !reduceMotion && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-64"
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: [null, 0, 600], opacity: [0, 1, 1] }}
              transition={{ 
                duration: 1.8, 
                times: [0, 0.2, 1],
                ease: "easeInOut" 
              }}
            >
              <AnimatedTruck />
              <motion.div
                className="mt-4 text-center text-sm font-bold text-orange-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, times: [0, 0.3, 1] }}
              >
                Loading your junk hauling experience...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,146,60,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(234,179,8,0.12),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(251,113,133,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_25%,transparent_75%,rgba(0,0,0,0.2))]" />
      </div>

      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 border-b border-orange-500/20 bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-orange-500/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => scrollToId("top")}
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 px-3 py-2 hover:border-orange-500/50 transition-all"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg shadow-orange-500/30">
              <Truck className="h-5 w-5 text-white" />
            </span>
            <div className="text-left">
              <div className="text-sm font-black tracking-tight">Reno Haul</div>
              <div className="text-[11px] text-white/60">Junk • Cleanouts • Reno, NV</div>
            </div>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <div id="navRail" className="relative rounded-xl border-2 border-orange-500/20 bg-slate-800/50 p-1.5 shadow-inner">
              {/* truck indicator */}
              <div className="pointer-events-none absolute inset-x-1 -bottom-3 h-6">
                <motion.div
                  className="absolute -translate-x-1/2"
                  style={{ left: truckX }}
                  animate={reduceMotion ? undefined : { x: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                >
                  <motion.div
                    className="relative"
                    initial={{ y: 0 }}
                    animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="h-6 w-10 rounded-lg border-2 border-orange-500/40 bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg shadow-orange-500/40" />
                    <div className="absolute -bottom-1 left-1 h-3 w-3 rounded-full bg-slate-700 border border-orange-500/40" />
                    <div className="absolute -bottom-1 right-1 h-3 w-3 rounded-full bg-slate-700 border border-orange-500/40" />
                  </motion.div>
                </motion.div>
              </div>

              <nav className="flex items-center gap-1">
                {NAV.map((n) => {
                  const isActive = active === n.id;
                  return (
                    <button
                      key={n.id}
                      ref={(el) => {
                        navRefs.current[n.id] = el;
                      }}
                      onClick={() => scrollToId(n.id)}
                      className={clsx(
                        "rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      )}
                    >
                      {n.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("book");
              }}
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              Book pickup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:+1775-555-0199"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-orange-500/30 bg-slate-800/50 px-3 py-2 text-sm font-bold hover:bg-slate-700/50 transition-all"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("book");
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-2 text-sm font-black text-white shadow-lg shadow-orange-500/30"
            >
              Book
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="relative">
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-20 md:pt-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative">
              <TrashConfetti />

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/80">
                <MapPin className="h-4 w-4" />
                Serving Reno + Sparks + Truckee Meadows
              </div>

              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                Make the mess
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.3)]">
                  {" "}vanish.{" "}
                </span>
                <span className="block text-slate-200">We haul it like we mean it.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Fast, friendly junk hauling in Reno, NV. Garage cleanouts, furniture removal, yard debris, appliance
                haul-away — with transparent pricing and a donate/recycle-first approach.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollToId("book")}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-[length:200%_100%] px-6 py-4 text-sm font-black text-white shadow-2xl shadow-orange-500/30 hover:bg-[position:100%_0] hover:shadow-orange-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  Get a quote in 60 seconds
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="tel:+1775-555-0199"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-orange-500/30 bg-slate-800/50 px-5 py-4 text-sm font-extrabold text-white hover:bg-slate-700/50 hover:border-orange-500/50 transition-all"
                >
                  <Phone className="h-5 w-5" />
                  (775) 555‑0199
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {heroBadges.map((b) => (
                  <SectionTag key={b.label} icon={b.icon} label={b.label} />
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {["Same-day", "Upfront", "No drama"].map((w, i) => (
                  <div
                    key={w}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center"
                  >
                    <div className="text-xs font-black text-white/70">{i === 0 ? "Speed" : i === 1 ? "Pricing" : "Vibe"}</div>
                    <div className="mt-1 text-lg font-extrabold">{w}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="absolute -inset-6 rounded-[36px] border border-white/10 bg-white/5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-black text-white/80">Today's vibe</div>
                    <div className="mt-1 text-2xl font-black">Clean slate energy</div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                    <Sparkles className="h-4 w-4" />
                    Graphics-heavy
                  </div>
                </div>

                <div className="mt-5">
                  <AnimatedTruck />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Text us a photo", d: "Get an estimate fast." },
                    { t: "We show up", d: "On time, with a plan." },
                    { t: "We load it", d: "Heavy lifting = our hobby." },
                    { t: "We sweep up", d: "Leave it cleaner." },
                  ].map((s) => (
                    <div key={s.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-black">{s.t}</div>
                      <div className="mt-1 text-sm text-white/70">{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-black text-white/70">What we haul</div>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">From single items to full cleanouts</h2>
              <p className="mt-3 max-w-2xl text-white/70">
                Pick a lane (or don't). We'll handle the load, the sorting, and the responsible disposal.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/80">
              <Recycle className="h-4 w-4" />
              Donate/recycle-first
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Garage + storage cleanouts",
                desc: "Boxes, busted shelves, mystery bins — gone.",
                icon: "📦",
              },
              {
                title: "Furniture removal",
                desc: "Couches, mattresses, dressers, desks.",
                icon: "🛋️",
              },
              {
                title: "Yard debris + demo",
                desc: "Branches, fencing, sheds, small tear-outs.",
                icon: "🌿",
              },
              {
                title: "Appliances haul-away",
                desc: "Fridges, washers, dryers (we lift).",
                icon: "🧺",
              },
              {
                title: "Estate + move-out",
                desc: "Compassionate, efficient, and tidy.",
                icon: "🏡",
              },
              {
                title: "Business pickups",
                desc: "Office cleanouts, fixtures, cardboard.",
                icon: "🏢",
              },
            ].map((c, idx) => (
              <motion.div
                key={c.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <motion.div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl"
                  animate={{ x: [0, -18, 0], y: [0, 10, 0] }}
                  transition={{ duration: 7 + idx, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-black">{c.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</div>
                  </div>
                  <div className="text-2xl">{c.icon}</div>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white/80">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Truck className="h-4 w-4" />
                  </span>
                  We load • You relax
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-6 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm font-black text-white/70">Pricing</div>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Simple volume-based estimates</h2>
                <p className="mt-3 max-w-2xl text-white/70">
                  Send a photo, get a range. On site, we confirm and haul.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/80">
                <Sparkles className="h-4 w-4" />
                No hidden fees
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <PriceCard
                title="Small pickup"
                price="$99+"
                note="A few items"
                bullets={["Curbside or easy access", "Perfect for a sofa/mattress", "Fast turnaround"]}
              />
              <PriceCard
                title="Half load"
                price="$349+"
                note="Most popular"
                bullets={["Garage corner cleanout", "Furniture + boxes", "Sweep-up included"]}
                featured
              />
              <PriceCard
                title="Full cleanout"
                price="$699+"
                note="Big projects"
                bullets={["Whole garage / move-out", "Donation sorting", "Priority scheduling"]}
              />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {["Upfront estimate", "On-time arrival", "Careful loading", "Responsible disposal"].map((x) => (
                <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/80">
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-black text-white/70">Proof</div>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Before & after (the satisfying part)</h2>
              <p className="mt-3 max-w-2xl text-white/70">
                Swap these placeholders with real photos later — the layout is built for high-impact visuals.
              </p>
            </div>
            <button
              onClick={() => scrollToId("book")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white hover:bg-white/10"
            >
              Send us your "before"
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <GalleryTile label="Garage cleanout" variant="before" />
            <GalleryTile label="Garage cleanout" variant="after" />
            <GalleryTile label="Yard debris" variant="before" />
            <GalleryTile label="Yard debris" variant="after" />
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-6 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm font-black text-white/70">Reviews</div>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">People love a clean garage</h2>
                <p className="mt-3 max-w-2xl text-white/70">Swap these with real Google reviews later.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/80">
                <Star className="h-4 w-4" />
                5.0 average
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ReviewCard
                name="Jamie • Midtown"
                text="They showed up same day, quoted fairly, and somehow made my garage look bigger. Wild." 
              />
              <ReviewCard
                name="Chris • Sparks"
                text="Fast, friendly, zero judgment. They even swept where the old fridge was. 10/10." 
              />
              <ReviewCard
                name="Ava • South Reno"
                text="The truck nav on their site convinced me. The actual service was even better." 
              />
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.22),transparent_42%),radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.22),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 md:p-10">
            <motion.div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div className="text-sm font-black text-white/70">Book a pickup</div>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Tell us what you're tossing</h2>
                <p className="mt-3 max-w-xl text-white/70">
                  This form is front-end only. Wire it to your backend (or a form service) when you're ready.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Same-day (when available)", "Text photo estimates", "Friendly crew", "Reno + Sparks"].map((x) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/80">
                      {x}
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-white/80">
                    <Phone className="h-4 w-4" />
                    Prefer talking? Call (775) 555‑0199
                  </div>
                  <div className="mt-1 text-sm text-white/70">Or text us a pic: "what is this pile?" works.</div>
                </div>
              </div>

              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-[36px] border border-white/10 bg-white/5"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative rounded-[36px] border border-white/10 bg-black/30 p-6"
                >
                  <div className="grid gap-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="grid gap-1 text-sm font-bold text-white/80">
                        Name
                        <input
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                          placeholder="Mel"
                        />
                      </label>
                      <label className="grid gap-1 text-sm font-bold text-white/80">
                        Phone
                        <input
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                          placeholder="(775) 555-0199"
                        />
                      </label>
                    </div>

                    <label className="grid gap-1 text-sm font-bold text-white/80">
                      Address / Area
                      <input
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                        placeholder="Reno, Sparks, Spanish Springs…"
                      />
                    </label>

                    <label className="grid gap-1 text-sm font-bold text-white/80">
                      What are we hauling?
                      <textarea
                        className="min-h-[110px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                        placeholder="e.g., couch + mattress + a suspicious number of moving boxes"
                      />
                    </label>

                    <label className="grid gap-1 text-sm font-bold text-white/80">
                      Preferred day
                      <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25">
                        <option className="bg-[#070A10]">Today</option>
                        <option className="bg-[#070A10]">Tomorrow</option>
                        <option className="bg-[#070A10]">This week</option>
                        <option className="bg-[#070A10]">Next week</option>
                      </select>
                    </label>

                    <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-black">
                      Request quote
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <div className="text-center text-xs text-white/55">
                      By submitting, you agree we can text you about your quote. No spam. Just hauling.
                    </div>
                  </div>
                </form>

                <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-white/80">
                    <MapPin className="h-4 w-4" />
                    Based in Reno, Nevada
                  </div>
                  <div className="mt-1 text-sm text-white/70">Serving the Truckee Meadows and nearby areas.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-6 md:grid-cols-3 md:items-center">
              <div>
                <div className="text-lg font-black">Reno Haul</div>
                <div className="mt-1 text-sm text-white/70">Junk hauling • Cleanouts • Reno, NV</div>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-center">
                {NAV.slice(1).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => scrollToId(n.id)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/10"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <a
                  href="tel:+1775-555-0199"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black"
                >
                  <Phone className="h-4 w-4" />
                  (775) 555‑0199
                </a>
              </div>
            </div>

            <div className="mt-8 text-xs text-white/50">
              © {new Date().getFullYear()} Reno Haul. Replace placeholders (phone, reviews, gallery) with your real data.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
