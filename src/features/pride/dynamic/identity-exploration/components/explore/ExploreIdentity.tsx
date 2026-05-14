import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, History, Loader2, ChevronLeft, Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";
import { useNavigate } from "react-router-dom";
import { sql } from "@/lib/db";
import { toast } from "sonner";
import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";
import { cn } from "@/lib/utils";

/* ─── Shared Animation Config ─── */
const ease = [0.32, 0.72, 0, 1] as [number, number, number, number];
const t = { type: "tween" as const, ease, duration: 0.45 };
const pageV = { enter: { opacity: 0, y: 20 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

/* ─── Small reusable pieces ─── */
const Dots = ({ total, current }: { total: number; current: number }) => (
  <div className="flex items-center justify-center gap-3 py-4">
    {Array.from({ length: total }).map((_, i) => (
      <div 
        key={i} 
        className={`h-2 rounded-full transition-all duration-500 ${
          i < current 
            ? "w-8 bg-pride-purple shadow-[0_0_10px_rgba(168,85,247,0.4)]" 
            : "w-2 bg-pride-purple/10"
        }`} 
      />
    ))}
  </div>
);

const Bubble = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay }}
    className="premium-card px-8 py-6 shadow-xl border-l-4 border-l-pride-blue">
    <p className="justified-text text-foreground/90 text-lg font-medium leading-relaxed">{children}</p>
  </motion.div>
);

const QuestionBubble = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay }}
    className="premium-card px-8 py-6 border-pride-purple/20 bg-pride-purple/5 shadow-inner">
    <p className="justified-text text-foreground font-bold text-xl leading-tight">{children}</p>
  </motion.div>
);

const Btn = ({ children, onClick, variant = "primary", disabled = false }: { children: React.ReactNode; onClick: () => void; variant?: "primary" | "secondary" | "ghost"; disabled?: boolean }) => {
  const variants = {
    primary: "btn-primary h-14 text-lg font-bold shadow-lg",
    secondary: "btn-secondary h-14 text-lg font-bold",
    ghost: "btn-ghost h-12 text-base font-bold",
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full ${variants[variant]}`}>
      {children}
    </button>
  );
};

const Opt = ({ label, selected, onClick, delay = 0, multi }: {
  label: string; selected?: boolean; onClick: () => void; delay?: number; multi?: boolean;
}) => (
  <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay }}
    whileTap={{ scale: 0.98 }} onClick={onClick}
    className={cn(
      "w-full py-5 px-8 text-left font-bold transition-all duration-300 rounded-2xl",
      selected
        ? "premium-card border-pride-purple/40 ring-2 ring-pride-purple/20 text-pride-purple bg-pride-purple/5 shadow-lg"
        : "premium-card-interactive text-foreground/80 hover:text-foreground"
    )}
  >
    <div className="flex items-center justify-between w-full">
      <span className="text-lg">
        {multi && (
          <span className={`mr-4 inline-flex h-6 w-6 items-center justify-center rounded-lg align-middle transition-all ${
            selected ? "bg-pride-purple text-white shadow-md scale-110" : "border-2 border-border"
          }`}>
            {selected ? "✓" : ""}
          </span>
        )}
        {label}
      </span>
      {selected && !multi && (
        <div className="w-6 h-6 rounded-full bg-pride-purple flex items-center justify-center shadow-md animate-in zoom-in duration-300">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  </motion.button>
);

/* ─── Types ─── */
interface Answers { [k: string]: string | string[] | number }
interface ScreenProps { answers: Answers; setAnswer: (k: string, v: string | number) => void; revealStep: number; onNext: () => void }
interface MultiProps extends ScreenProps { toggleMulti: (k: string, v: string) => void }

const ExploreIdentity = () => { 
  const { t } = useTranslation("hub");
  const navigate = useNavigate();
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [revealStep, setRevealStep] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const next = useCallback(() => { setScreen(s => s + 1); setRevealStep(0); }, []);
  const prev = useCallback(() => { 
    if (screen > 0) {
      setScreen(s => s - 1);
      setRevealStep(0);
    } else {
      window.parent.postMessage("exit_activity", "*");
      window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
    }
  }, [screen]);

  const setAnswer = useCallback((k: string, v: string | number) => {
    setAnswers(a => ({ ...a, [k]: v }));
    setTimeout(() => setRevealStep(s => s + 1), 400);
  }, []);
  const toggleMulti = useCallback((k: string, v: string) => {
    setAnswers(a => {
      const c = (a[k] as string[]) || [];
      return { ...a, [k]: c.includes(v) ? c.filter(x => x !== v) : [...c, v] };
    });
  }, []);

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      const userId = sessionStorage.getItem('user_id');
      if (!userId) throw new Error('No user session');

      await sql`
        INSERT INTO identity_exploration_entries (user_id, data)
        VALUES (${userId}, ${JSON.stringify(answers)})
      `;
      toast.success('Profile saved to your journey!');
    } catch (err) {
      console.error('Failed to save profile:', err);
      const history = JSON.parse(localStorage.getItem("identity_exploration_history") || "[]");
      history.push({ date: new Date().toISOString(), answers });
      localStorage.setItem("identity_exploration_history", JSON.stringify(history));
      toast.success('Saved locally. Connect to sync.');
    } finally {
      setIsSaving(false);
    }
  };

  if (showHistory) {
    return (
      <div className="activity-root">
        <PrideFloatingOrbs />
        <div className="activity-container-sm py-8 relative z-10">
          <PrideActivityHeader title={t("Exploration History")} onBack={() => setShowHistory(false)} className="mb-8" />
          <HistoryScreen onBack={() => setShowHistory(false)} />
        </div>
      </div>
    );
  }

  const screens = [
    <S0 key={0} onNext={next} onHistory={() => setShowHistory(true)} onBack={() => {
      window.parent.postMessage("exit_activity", "*");
      window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
    }} />,
    <S1 key={1} onNext={next} />,
    <S2 key={2} {...{ answers, setAnswer, revealStep, onNext: next }} />,
    <S3 key={3} {...{ answers, setAnswer, revealStep, onNext: next, toggleMulti }} />,
    <S4 key={4} {...{ answers, setAnswer, revealStep, onNext: next }} />,
    <S5 key={5} {...{ answers, setAnswer, revealStep, onNext: next }} />,
    <S6 key={6} {...{ answers, setAnswer, revealStep, onNext: next }} />,
    <S7 key={7} onNext={next} />,
    <S8 key={8} onNext={next} />,
    <S9 key={9} {...{ answers, setAnswer, revealStep, onNext: next }} />,
    <S10 key={10} onHistory={() => setShowHistory(true)} onSave={saveProfile} isSaving={isSaving} onBackToHub={() => {
      window.parent.postMessage("exit_activity", "*");
      window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
    }} onShare={() => setIsShareOpen(true)} />,
  ];

  return (
    <div className="activity-root">
      <PrideFloatingOrbs />
      <div className="activity-container-sm py-8 flex flex-col min-h-screen relative z-10">
        <PrideActivityHeader 
          title={t("Identity Exploration")} 
          subtitle={t("Reflect on your journey")}
          onBack={screen > 0 ? prev : undefined}
          className="mb-8"
        />
        <AnimatePresence mode="wait">
          <motion.div key={screen} variants={pageV} initial="enter" animate="center" exit="exit" transition={t} className="flex flex-1 flex-col">
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title={t("Share My Identity Profile")}
        />
      </div>
    </div>
  );
};

/* ─── History Screen ─── */
const HistoryScreen = ({ onBack }: { onBack: () => void }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) throw new Error('No user session');

        const rows = await sql`
          SELECT data, created_at FROM identity_exploration_entries 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `;
        setHistory(rows.map(r => ({ answers: r.data, date: r.created_at })));
      } catch (err) {
        console.error('Failed to fetch history:', err);
        const local = JSON.parse(localStorage.getItem("identity_exploration_history") || "[]");
        setHistory(local.reverse());
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const fields = [
    { key: "id_feel", label: t("How you feel about your gender") },
    { key: "id_conn", label: t("Connection to assigned gender") },
    { key: "expr_slider", label: t("Expression spectrum"), format: (v: number) => v <= 33 ? "Feminine" : v <= 66 ? "Androgynous" : "Masculine" },
    { key: "expr_explore", label: t("Curious to explore"), format: (v: string[]) => v.join(", ") },
    { key: "soc_where", label: t("Feel most like yourself") },
    { key: "soc_pretend", label: t("Feel like pretending") },
    { key: "dys_feel", label: t("Experience discomfort") },
    { key: "dys_when", label: t("When discomfort happens") },
    { key: "euph", label: t("Affirming moments") },
    { key: "step", label: t("Chosen small step") },
  ];

  return (
    <div className="flex flex-1 flex-col px-5 py-6 gap-8 overflow-y-auto">
      {loading ? (
        <div className="flex flex-1 items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>
      ) : history.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground text-center">No responses yet. Complete the activity to see your history here.</p>
        </div>
      ) : (
        history.map((entry, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-bold text-primary">{new Date(entry.date).toLocaleDateString()}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-black">Entry #{history.length - idx}</p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-6 space-y-5"
            >
              {fields.filter(f => entry.answers[f.key] !== undefined).map((f) => {
                const raw = entry.answers[f.key];
                const display = f.format
                  ? (f.format as (v: any) => string)(raw)
                  : Array.isArray(raw) ? raw.join(", ") : String(raw);
                return (
                  <div key={f.key} className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{f.label}</p>
                    <p className="text-foreground text-base font-medium leading-tight">{display}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ))
      )}
    </div>
  );
};

/* ─── SCREEN 0: Welcome ─── */
const S0 = ({ onNext, onHistory, onBack }: { onNext: () => void; onHistory: () => void; onBack: () => void }) => (
  <div className="flex flex-1 flex-col px-6 py-12"
    style={{ background: "radial-gradient(circle at 30% 20%, hsl(0 75% 65% / 0.08), transparent 50%), radial-gradient(circle at 70% 30%, hsl(30 85% 60% / 0.08), transparent 50%), radial-gradient(circle at 50% 60%, hsl(210 70% 55% / 0.06), transparent 50%), radial-gradient(circle at 80% 80%, hsl(275 60% 60% / 0.08), transparent 50%), hsl(30 20% 98%)" }}>
    <div className="flex items-center justify-end">
      <button onClick={onHistory} className="flex h-10 w-10 items-center justify-center rounded-full bg-card/80 cloud-shadow">
        <History className="h-5 w-5 text-foreground" />
      </button>
    </div>
    <div className="flex flex-1 flex-col items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={t} className="w-full">
        <p className="text-5xl mb-4 text-center">{t("🌱")}</p>
        <h1 className="text-2xl font-semibold text-foreground mb-4 text-center" style={{ letterSpacing: "-0.02em" }}>{t("Explore Your Identity")}</h1>
        <p className="justified-text text-foreground/80 text-base mb-2 px-2">{t("A gentle space to reflect on how you experience your gender. No pressure. No labels. Just you.")}</p>
        <p className="text-sm text-muted-foreground mt-3 justified-text px-2">{t("⏱ Takes about 3–5 minutes")}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.3 }} className="mt-10 w-full">
        <Btn onClick={onNext}>{t("Start")}</Btn>
      </motion.div>
    </div>
  </div>
);

/* ─── SCREEN 1: Comfort Note ─── */
const S1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 py-12"
    style={{ background: "radial-gradient(circle at 40% 30%, hsl(330 50% 90% / 0.3), transparent 50%), radial-gradient(circle at 60% 70%, hsl(240 60% 85% / 0.25), transparent 50%)" }}>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t}
      className="cloud-shadow rounded-3xl bg-card/80 p-8 backdrop-blur-sm w-full">
      <p className="justified-text text-foreground text-base leading-relaxed">{t("You can skip anything. Take your time—this is for you.")}</p>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.4 }} className="mt-8 w-full">
      <Btn onClick={onNext}>{t("Continue")}</Btn>
    </motion.div>
  </div>
);

/* ─── SCREEN 2: Identity ─── */
const S2 = ({ answers, setAnswer, revealStep, onNext }: ScreenProps) => { 
  const { t } = useTranslation("hub");
  const q1 = [t("Comfortable"), t("Unsure / questioning"), t("Disconnected"), t("Exploring"), t("Something else")];
  const q2 = ["Yes,  mostly", t("Sometimes"), t("Not really"), t("Not at all"), t("I'm not sure")];
  return (
    <div className="flex flex-1 flex-col px-5 py-8 overflow-y-auto">
      <Dots total={5} current={1} />
      <div className="mt-6 flex flex-col gap-4">
        <Bubble>{t("Let&apos;s start with how you feel inside.")}</Bubble>
        <QuestionBubble delay={0.15}>{t("How do you currently feel about your gender?")}</QuestionBubble>
        <div className="mt-2 flex flex-col gap-2.5">
          {q1.map((o, i) => <Opt key={o} label={o} delay={0.2 + i * 0.04} selected={answers.id_feel === o} onClick={() => setAnswer("id_feel", o)} />)}
        </div>
        {answers.id_feel && revealStep >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t} className="mt-4 flex flex-col gap-4">
            <QuestionBubble>{t("Do you feel connected to the gender you were assigned at birth?")}</QuestionBubble>
            <div className="mt-2 flex flex-col gap-2.5">
              {q2.map((o, i) => <Opt key={o} label={o} delay={0.05 + i * 0.04} selected={answers.id_conn === o} onClick={() => setAnswer("id_conn", o)} />)}
            </div>
          </motion.div>
        )}
        {answers.id_conn && revealStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.2 }} className="mt-6">
            <Btn onClick={onNext}>{t("Continue")}</Btn>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ─── SCREEN 3: Expression ─── */
const S3 = ({ answers, setAnswer, toggleMulti, revealStep, onNext }: MultiProps) => { 
  const { t } = useTranslation("hub");
  const val = (answers.expr_slider as number) ?? 50;
  const opts = [t("Clothing"), t("Name"), t("Pronouns"), t("Appearance"), t("Not sure yet"), t("Other")];
  const selected = ((answers.expr_explore as string[]) || []);
  return (
    <div className="flex flex-1 flex-col px-5 py-8 overflow-y-auto">
      <Dots total={5} current={2} />
      <div className="mt-6 flex flex-col gap-4">
        <Bubble>{t("Now, let&apos;s look at how you express yourself.")}</Bubble>
        <QuestionBubble delay={0.15}>{t("What kind of expression feels most like you?")}</QuestionBubble>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t, delay: 0.25 }}
          className="premium-card mt-2 p-8">
          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">
            <span className="text-pride-purple">Feminine</span>
            <span className="text-pride-green">Androgynous</span>
            <span className="text-pride-orange">Masculine</span>
          </div>
          <div className="relative h-4 w-full rounded-full bg-black/5 p-1 mb-2">
            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-pride-purple via-pride-green to-pride-orange opacity-30" />
            <input type="range" min="0" max="100" value={val}
              onChange={e => setAnswer("expr_slider", Number(e.target.value))}
              className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pride-purple" />
          </div>
        </motion.div>
        {answers.expr_slider !== undefined && revealStep >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t} className="mt-4 flex flex-col gap-4">
            <QuestionBubble>{t("What are you curious to explore?")}</QuestionBubble>
            <p className="text-xs text-muted-foreground px-1">{t("Select all that apply")}</p>
            <div className="flex flex-col gap-2.5">
              {opts.map((o, i) => <Opt key={o} label={o} delay={0.05 + i * 0.04} multi selected={selected.includes(o)} onClick={() => toggleMulti("expr_explore", o)} />)}
            </div>
          </motion.div>
        )}
        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.2 }} className="mt-6">
            <Btn onClick={onNext}>{t("Continue")}</Btn>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ─── SCREEN 4: Social ─── */
const S4 = ({ answers, setAnswer, revealStep, onNext }: ScreenProps) => { 
  const { t } = useTranslation("hub");
  const q1 = [t("Alone"), t("With close friends"), t("With family"), t("Online"), t("Public spaces")];
  const q2 = [t("Often"), t("Sometimes"), t("Rarely"), t("Never")];
  return (
    <div className="flex flex-1 flex-col px-5 py-8 overflow-y-auto">
      <Dots total={5} current={3} />
      <div className="mt-6 flex flex-col gap-4">
        <Bubble>{t("Different spaces can feel different.")}</Bubble>
        <QuestionBubble delay={0.15}>{t("Where do you feel most like yourself?")}</QuestionBubble>
        <div className="mt-2 flex flex-col gap-2.5">
          {q1.map((o, i) => <Opt key={o} label={o} delay={0.2 + i * 0.04} selected={answers.soc_where === o} onClick={() => setAnswer("soc_where", o)} />)}
        </div>
        {answers.soc_where && revealStep >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t} className="mt-4 flex flex-col gap-4">
            <QuestionBubble>{t("Do you ever feel like you&apos;re &ldquo;pretending&rdquo;?")}</QuestionBubble>
            <div className="flex flex-col gap-2.5">
              {q2.map((o, i) => <Opt key={o} label={o} delay={0.05 + i * 0.04} selected={answers.soc_pretend === o} onClick={() => setAnswer("soc_pretend", o)} />)}
            </div>
          </motion.div>
        )}
        {answers.soc_pretend && revealStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.2 }} className="mt-6">
            <Btn onClick={onNext}>{t("Continue")}</Btn>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ─── SCREEN 5: Dysphoria ─── */
const S5 = ({ answers, setAnswer, revealStep, onNext }: ScreenProps) => { 
  const { t } = useTranslation("hub");
  const q1 = [t("Often"), t("Sometimes"), t("Rarely"), t("Never"), t("Not sure")];
  const q2 = [t("Mirror / appearance"), t("Being addressed a certain way"), t("Social situations"), t("Body-related changes"), t("Not sure"), t("Other")];
  const [pauseDone, setPauseDone] = useState(false);
  return (
    <div className="flex flex-1 flex-col px-5 py-8 overflow-y-auto">
      <Dots total={5} current={4} />
      <div className="mt-6 flex flex-col gap-4">
        <Bubble>{t("Some people experience moments of discomfort around their body or how others see them. You can skip this if it doesn&apos;t feel right.")}</Bubble>
        <QuestionBubble delay={0.15}>{t("Do you experience this kind of discomfort?")}</QuestionBubble>
        <div className="mt-2 flex flex-col gap-2.5">
          {q1.map((o, i) => <Opt key={o} label={o} delay={0.2 + i * 0.04} selected={answers.dys_feel === o} onClick={() => setAnswer("dys_feel", o)} />)}
        </div>
        {answers.dys_feel && revealStep >= 1 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t} className="mt-4 flex flex-col gap-4">
            <QuestionBubble>{t("When does this usually happen?")}</QuestionBubble>
            <div className="flex flex-col gap-2.5">
              {q2.map((o, i) => <Opt key={o} label={o} delay={0.05 + i * 0.04} selected={answers.dys_when === o} onClick={() => setAnswer("dys_when", o)} />)}
            </div>
          </motion.div>
        )}
        {answers.dys_when && revealStep >= 2 && !pauseDone && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t}
            className="mt-6 cloud-shadow rounded-3xl bg-card/80 p-6">
            <p className="justified-text text-foreground mb-4">{t("Thanks for sharing that. Take a moment if you need.")}</p>
            <Btn onClick={() => { setPauseDone(true); onNext(); }}>{t("Continue")}</Btn>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ─── SCREEN 6: Euphoria ─── */
const S6 = ({ answers, setAnswer, onNext }: ScreenProps) => { 
  const { t } = useTranslation("hub");
  const opts = [t("Expressing myself freely"), t("When others see me how I feel"), t("In certain clothes/styles"), t("When I'm alone"), t("Still figuring it out"), t("Other")];
  return (
    <div className="flex flex-1 flex-col px-5 py-8 overflow-y-auto">
      <Dots total={5} current={5} />
      <div className="mt-6 flex flex-col gap-4">
        <Bubble>{t("Let&apos;s also notice the moments that feel right.")}</Bubble>
        <QuestionBubble delay={0.15}>{t("When do you feel most like yourself?")}</QuestionBubble>
        <div className="mt-2 flex flex-col gap-2.5">
          {opts.map((o, i) => <Opt key={o} label={o} delay={0.2 + i * 0.04} selected={answers.euph === o} onClick={() => setAnswer("euph", o)} />)}
        </div>
        {answers.euph && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.3 }} className="mt-6">
            <Btn onClick={onNext}>{t("Continue")}</Btn>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ─── SCREEN 7: Reflection Pause ─── */
const S7 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={t} className="w-full text-center">
      <div className="mx-auto mb-6 h-20 w-20 rounded-full animate-breathe" style={{ background: "linear-gradient(135deg, hsl(0 75% 65% / 0.4), hsl(30 85% 60% / 0.4), hsl(50 90% 65% / 0.4), hsl(140 55% 50% / 0.3), hsl(210 70% 55% / 0.4), hsl(275 60% 60% / 0.4))" }} />
      <p className="justified-text text-foreground text-base px-2">{t("Thank you for sharing all of this. Let&apos;s reflect on what this might mean for you.")}</p>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.6 }} className="mt-10 w-full">
      <Btn onClick={onNext}>{t("Continue")}</Btn>
    </motion.div>
  </div>
);

/* ─── SCREEN 8: Results ─── */
const S8 = ({ onNext }: { onNext: () => void }) => {
  const cards = [
    { icon: "🌈", title: t("Identity"), text: t("You may be exploring your gender and what feels right for you.") },
    { icon: "🎨", title: t("Expression"), text: t("You seem drawn to expressions that help you feel more like yourself.") },
    { icon: "💭", title: t("Comfort"), text: t("You feel most at ease in spaces where you feel safe and accepted.") },
    { icon: "⚖️", title: t("Discomfort"), text: t("Some situations may bring moments of unease or disconnection.") },
    { icon: "💖", title: t("Affirming Moments"), text: t("You feel most aligned when you can express yourself freely.") },
  ];
  return (
    <div className="flex flex-1 flex-col py-8 overflow-y-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t} className="text-center mb-6 px-5">
        <p className="text-3xl mb-2">{t("✨")}</p>
        <h2 className="text-xl font-semibold text-foreground tracking-tight">{t("Your Gender Expression Profile")}</h2>
        <p className="text-sm text-muted-foreground mt-1 px-2 text-center">{t("This isn&apos;t a label—just a reflection of what you shared.")}</p>
      </motion.div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-5 no-scrollbar">
        {cards.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...t, delay: 0.1 + i * 0.08 }}
            className="premium-card w-[280px] sm:w-[320px] snap-center p-8 flex-shrink-0 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pride-purple/10 rounded-full flex items-center justify-center text-3xl mb-4">
              {c.icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{c.title}</h3>
            <p className="text-foreground/80 text-sm leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.6 }} className="mt-6 px-5">
        <Btn onClick={onNext}>{t("Continue")}</Btn>
      </motion.div>
    </div>
  );
};

/* ─── SCREEN 9: Suggestions ─── */
const S9 = ({ onNext }: { answers: Answers; setAnswer: (k: string, v: string | number) => void; revealStep: number; onNext: () => void }) => {
  const tips = [t("Trying small changes in safe spaces"), t("Journaling your feelings"), t("Experimenting privately with expression"), t("Talking to someone you trust")];
  return (
    <div className="flex flex-1 flex-col px-5 py-8 overflow-y-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t}>
        <p className="text-2xl mb-2">{t("💡")}</p>
        <h2 className="text-lg font-semibold text-foreground mb-4">{t("You might explore")}</h2>
        <ul className="flex flex-col gap-2.5 mb-8">
          {tips.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...t, delay: 0.1 + i * 0.06 }}
              className="cloud-shadow rounded-2xl bg-card/80 px-5 py-3.5">
              <p className="text-foreground text-sm">{s}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...t, delay: 0.4 }} className="mt-auto">
        <Btn onClick={onNext}>{t("Continue")}</Btn>
      </motion.div>
    </div>
  );
};

/* ─── SCREEN 10: Closing ─── */
const S10 = ({ onHistory, onSave, isSaving, onBackToHub, onShare }: { onHistory: () => void; onSave: () => void; isSaving: boolean; onBackToHub: () => void; onShare: () => void }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t}
      className="cloud-shadow rounded-3xl bg-card/80 p-8 w-full mb-8">
      <p className="text-foreground text-base leading-relaxed text-center">{t("You don&apos;t have to figure everything out right now. Give yourself permission to explore at your own pace.")}</p>
    </motion.div>
    <div className="w-full flex flex-col gap-3">
      <button
        onClick={onShare}
        className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
      >
        <Share2 size={16} />
        <span>{t("Share")}</span>
      </button>
      <Btn onClick={onSave} disabled={isSaving}>{isSaving ? t("Saving...") : t("Save my profile")}</Btn>
      <Btn onClick={onHistory} variant="secondary">{t("View history")}</Btn>
      <Btn onClick={onBackToHub} variant="ghost">{t("Back to Hub")}</Btn>
    </div>
  </div>
);

export default ExploreIdentity;
