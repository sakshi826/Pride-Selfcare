import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "../components/mirror-notes/IntroScreen";
import MirrorScreen from "../components/mirror-notes/MirrorScreen";
import ReflectionScreen from "../components/mirror-notes/ReflectionScreen";
import CompletionScreen from "../components/mirror-notes/CompletionScreen";
import SavedNotesScreen from "../components/mirror-notes/SavedNotesScreen";
import { toast } from "sonner";
import { sql } from "@/lib/db";

type Screen = "intro" | "mirror" | "reflection" | "completion" | "saved";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [notes, setNotes] = useState<string[]>([]);
  const [dbNotes, setDbNotes] = useState<string[]>([]);

  const userId = sessionStorage.getItem("user_id");

  const fetchNotes = useCallback(async () => {
    if (!userId) return;
    try {
      const rows = await sql`
        SELECT data FROM pride_mirror_moments_entries 
        WHERE user_id = ${userId}
      `;
      // Data is stored as an array of strings
      const allNotes = rows.flatMap(r => (r.data as any).notes as string[]);
      const uniqueNotes = [...new Set(allNotes)];
      setDbNotes(uniqueNotes);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      const saved = JSON.parse(localStorage.getItem("mirror-notes") || "[]");
      setDbNotes(saved);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = useCallback((text: string) => {
    setNotes((prev) => [...prev, text]);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (!userId) throw new Error('No user session');
      
      const payload = { notes, date: new Date().toISOString() };
      await sql`
        INSERT INTO pride_mirror_moments_entries (user_id, data)
        VALUES (${userId}, ${JSON.stringify(payload)})
      `;
      
      toast.success("Notes saved to cloud!");
      await fetchNotes();
      setScreen("saved");
    } catch (err) {
      console.error("Failed to save to cloud:", err);
      const existing = JSON.parse(localStorage.getItem("mirror-notes") || "[]");
      const merged = [...new Set([...existing, ...notes])];
      localStorage.setItem("mirror-notes", JSON.stringify(merged));
      toast.success("Notes saved locally!");
      setScreen("saved");
    }
  }, [notes, userId, fetchNotes]);

  const handleViewSaved = useCallback(() => {
    setNotes((prev) => {
      const merged = [...new Set([...dbNotes, ...prev])];
      return merged;
    });
    setScreen("saved");
  }, [dbNotes]);

  const handleAddMore = useCallback(() => {
    setScreen("mirror");
  }, []);

  const handleBack = useCallback(() => {
    setNotes([]);
    setScreen("intro");
  }, []);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto pride-bg relative z-0">
      <div className="relative z-10">
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <IntroScreen key="intro" onStart={() => setScreen("mirror")} onBack={handleBack} />
        )}
        {screen === "mirror" && (
          <MirrorScreen
            key="mirror"
            notes={notes}
            onAddNote={handleAddNote}
            onContinue={() => setScreen("reflection")}
          />
        )}
        {screen === "reflection" && (
          <ReflectionScreen
            key="reflection"
            notes={notes}
            onContinue={() => setScreen("completion")}
          />
        )}
        {screen === "completion" && (
          <CompletionScreen
            key="completion"
            notes={notes}
            onSave={handleSave}
            onAddMore={handleAddMore}
            onViewSaved={handleViewSaved}
          />
        )}
        {screen === "saved" && (
          <SavedNotesScreen
            key="saved"
            notes={notes}
            onAddMore={handleAddMore}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
