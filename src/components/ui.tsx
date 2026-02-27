import { useEffect, useMemo, useRef, useState } from "react";

export function useLocalStorageState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export function useKeyCombo(combo: { key: string; metaOrCtrl?: boolean; shift?: boolean }, onFire: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const wantKey = combo.key.toLowerCase() === k;
      const wantMetaOrCtrl = combo.metaOrCtrl ? (e.metaKey || e.ctrlKey) : true;
      const wantShift = combo.shift ? e.shiftKey : true;
      if (wantKey && wantMetaOrCtrl && wantShift) {
        e.preventDefault();
        onFire();
      }
      // Escape closes by convention
      if (combo.key.toLowerCase() === "escape" && k === "escape") onFire();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [combo.key, combo.metaOrCtrl, combo.shift, onFire]);
}

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const next = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setP(Math.max(0, Math.min(1, next)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scrollbar">
      <div className="scrollbar__fill" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

type CommandItem = {
  id: string;
  title: string;
  subtitle?: string;
  keywords?: string[];
  onSelect: () => void;
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function scoreMatch(query: string, text: string) {
  // simple scoring: contiguous contains wins; otherwise subsequence-ish
  const q = normalize(query);
  const t = normalize(text);
  if (!q) return 1;
  if (t.includes(q)) return 100 - t.indexOf(q);

  // subsequence score
  let ti = 0;
  let hits = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    ti = t.indexOf(ch, ti);
    if (ti === -1) return 0;
    hits += 1;
    ti += 1;
  }
  return hits; // small, but >0 means "match"
}

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = "Search sections, projects…",
}: {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      // focus next tick
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useKeyCombo({ key: "escape" }, () => {
    if (open) onClose();
  });

  const filtered = useMemo(() => {
    const scored = items
      .map((it) => {
        const hay = [it.title, it.subtitle, ...(it.keywords ?? [])].filter(Boolean).join(" ");
        return { it, s: scoreMatch(q, hay) };
      })
      .filter((x) => (q ? x.s > 0 : true))
      .sort((a, b) => b.s - a.s);

    return scored.map((x) => x.it);
  }, [items, q]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  if (!open) return null;

  const select = (idx: number) => {
    const it = filtered[idx];
    if (!it) return;
    it.onSelect();
    onClose();
  };

  return (
    <div className="cp__backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="cp__panel"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <div className="cp__top">
          <input
            ref={inputRef}
            className="cp__input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
          />
          <div className="cp__hint">⌘K</div>
        </div>

        <div className="cp__list" role="listbox" aria-label="Results">
          {filtered.length === 0 ? (
            <div className="cp__empty">No matches.</div>
          ) : (
            filtered.map((it, idx) => (
              <button
                key={it.id}
                className={"cp__item" + (idx === active ? " is-active" : "")}
                onMouseEnter={() => setActive(idx)}
                onClick={() => select(idx)}
                role="option"
                aria-selected={idx === active}
              >
                <div className="cp__title">{it.title}</div>
                {it.subtitle ? <div className="cp__sub">{it.subtitle}</div> : null}
              </button>
            ))
          )}
        </div>

        <div className="cp__footer">
          <span>Enter to select</span>
          <span>Esc to close</span>
          <span>Tip: try “projects”, “resume”, or a tech keyword</span>
        </div>

        {/* keyboard handling */}
        <KeyNav
          enabled={open}
          max={filtered.length}
          active={active}
          setActive={setActive}
          onEnter={() => select(active)}
        />
      </div>
    </div>
  );
}

function KeyNav({
  enabled,
  max,
  active,
  setActive,
  onEnter,
}: {
  enabled: boolean;
  max: number;
  active: number;
  setActive: (n: number) => void;
  onEnter: () => void;
}) {
  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((active + 1) % Math.max(1, max));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((active - 1 + Math.max(1, max)) % Math.max(1, max));
      } else if (e.key === "Enter") {
        e.preventDefault();
        onEnter();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, max, active, setActive, onEnter]);

  return null;
}

export function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}) {
  return (
    <button
      className="themeBtn"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
      type="button"
    >
      <span className="themeBtn__dot" />
      <span className="themeBtn__text">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}