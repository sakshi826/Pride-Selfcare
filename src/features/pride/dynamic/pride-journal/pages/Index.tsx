import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";
import IntroScreen from "../components/journal/IntroScreen";
import PromptScreen from "../components/journal/PromptScreen";
import ReflectionScreen from "../components/journal/ReflectionScreen";
import CompletionScreen from "../components/journal/CompletionScreen";
import HistoryScreen from "../components/journal/HistoryScreen";
import { sql } from "@/lib/db";

const PROMPTS = [
  {
    prompt: "What part of your identity are you grateful for today?",
    hints: [
      "I'm grateful for the courage to come out and live as my true self.",
      "I'm thankful for my queer joy — it lights up every room I walk into.",
      "I'm proud of my identity and the love it allows me to give and receive.",
    ],
  },
  {
    prompt: "What experience on your Pride journey helped shape who you are?",
    hints: [
      "Attending my first Pride march made me feel seen and celebrated.",
      "Finding my chosen family taught me that love has no limits.",
      "Standing up for myself when it was scary made me unshakeable.",
    ],
  },
  {
    prompt: "What queer strength in yourself are you most proud of?",
    hints: [
      "My ability to love fiercely and without apology.",
      "My resilience — I've turned every struggle into power.",
      "My authenticity inspires others to embrace who they are.",
    ],
  },
];

interface Entry {
  text: string;
  sticker: string | null;
}

interface SavedJournal {
  entries: Entry[];
  date: string;
}

type Screen = "intro" | "prompt" | "reflection" | "completion" | "history";


const Index = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("intro");
  const [promptIndex, setPromptIndex] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<SavedJournal[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = sessionStorage.getItem("user_id");

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const rows = await sql`
        SELECT data FROM pride_journal_entries 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC
      `;
      const dbEntries = rows.map(r => r.data as SavedJournal);
      
      const local = JSON.parse(localStorage.getItem("journal-history") || "[]");
      const combined = [...dbEntries];
      local.forEach((le: SavedJournal) => {
        if (!combined.some(db => db.date === le.date)) combined.push(le);
      });
      
      setHistory(combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (err) {
      console.error("Failed to fetch journal history:", err);
      const saved = localStorage.getItem("journal-history");
      if (saved) setHistory(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleStart = () => setScreen("prompt");

  const handleSubmit = (text: string) => {
    setEntries((prev) => [...prev, { text, sticker: null }]);
    if (promptIndex < PROMPTS.length - 1) {
      setPromptIndex((p) => p + 1);
    } else {
      setScreen("reflection");
    }
  };

  const handleReflectionComplete = () => setScreen("completion");

  const handleSave = async () => {
    const journal: SavedJournal = {
      entries,
      date: new Date().toISOString(),
    };
    
    try {
      if (!userId) throw new Error('No user session');
      await sql`
        INSERT INTO pride_journal_entries (user_id, data)
        VALUES (${userId}, ${JSON.stringify(journal)})
      `;
      toast.success("Journal saved to cloud! 🌈");
      await fetchHistory();
    } catch (err) {
      console.error("Failed to save to cloud:", err);
      const updated = [journal, ...history];
      setHistory(updated);
      localStorage.setItem("journal-history", JSON.stringify(updated));
      toast.success("Saved locally! 🌈");
    }
  };

  const handleRestart = () => {
    setScreen("intro");
    setPromptIndex(0);
    setEntries([]);
  };

  const handleViewHistory = () => setScreen("history");
  const handleBackFromHistory = () => setScreen("intro");

  const handleBack = () => {
    if (screen === "history") {
      handleBackFromHistory();
    } else if (screen === "prompt" && promptIndex > 0) {
      setPromptIndex((p) => p - 1);
      setEntries((prev) => prev.slice(0, -1));
    } else if (screen === "prompt" && promptIndex === 0) {
      setScreen("intro");
    } else if (screen === "reflection") {
      setScreen("prompt");
    } else if (screen === "completion") {
      setScreen("reflection");
    } else if (screen === "intro") {
      navigate('/lgbtq-hub');
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "intro":
        return <IntroScreen onStart={handleStart} onViewHistory={handleViewHistory} hasHistory={history.length > 0} onBack={handleBack} />;
      case "prompt":
        return (
          <PromptScreen
            key={promptIndex}
            prompt={PROMPTS[promptIndex].prompt}
            hints={PROMPTS[promptIndex].hints}
            current={promptIndex + 1}
            total={PROMPTS.length}
            isLast={promptIndex === PROMPTS.length - 1}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case "reflection":
        return <ReflectionScreen entries={entries} onComplete={handleReflectionComplete} onBack={handleBack} />;
      case "completion":
        return <CompletionScreen entries={entries} onSave={handleSave} onRestart={handleRestart} onViewHistory={handleViewHistory} onBackToHub={() => navigate('/lgbtq-hub')} />;
      case "history":
        return <HistoryScreen journals={history} onBack={handleBackFromHistory} />;
    }
  };

  return (
    <div className="activity-root">
      <PrideFloatingOrbs />
      <div className="activity-container-sm py-8 flex flex-col min-h-screen relative z-10">
        <PrideActivityHeader 
          title="Pride Journal" 
          subtitle="Gratitude & Reflection"
          showHistory={true}
          onHistory={handleViewHistory}
          className="mb-8"
        />
        <div className="flex-1 flex flex-col">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default Index;
