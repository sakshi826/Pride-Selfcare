import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "../components/constellation/WelcomeScreen";
import StarSelectionScreen from "../components/constellation/StarSelectionScreen";
import ReflectionScreen from "../components/constellation/ReflectionScreen";
import HistoryScreen from "../components/constellation/HistoryScreen";
import type { SavedConstellation } from "../components/constellation/HistoryScreen";
import BackgroundStars from "../components/constellation/BackgroundStars";
import { sql } from "@/lib/db";
import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";

export interface StarData {
  id: number;
  x: number;
  y: number;
  label: string;
}

const Index = () => {
  const [screen, setScreen] = useState<"welcome" | "selection" | "reflection" | "history">("welcome");
  const [stars, setStars] = useState<StarData[]>([]);
  const [savedConstellations, setSavedConstellations] = useState<SavedConstellation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = sessionStorage.getItem("user_id");

  const fetchConstellations = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const rows = await sql`
        SELECT id, data FROM identity_reflection_entries 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC
      `;
      const data = rows.map(r => ({
        id: r.id,
        stars: (r.data as any).stars,
        date: (r.data as any).date
      }));
      setSavedConstellations(data as any);
    } catch (error) {
      console.error("Failed to fetch constellations:", error);
      // Fallback to local
      const local = JSON.parse(localStorage.getItem("constellations") || "[]");
      setSavedConstellations(local);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchConstellations();
  }, [fetchConstellations]);

  const handleStart = useCallback(() => setScreen("selection"), []);
  const handleHistory = useCallback(() => setScreen("history"), []);

  const handleComplete = useCallback((completedStars: StarData[]) => {
    setStars(completedStars);
    setScreen("reflection");
  }, []);

  const handleSave = useCallback(async () => {
    if (!userId) {
      alert("No user session found.");
      return;
    }

    const newConstellation = {
      stars,
      date: new Date().toISOString()
    };
    
    try {
      await sql`
        INSERT INTO identity_reflection_entries (user_id, data)
        VALUES (${userId}, ${JSON.stringify(newConstellation)})
      `;
      await fetchConstellations();
      setScreen("welcome");
    } catch (error) {
      console.error("Failed to save:", error);
      const local = JSON.parse(localStorage.getItem("constellations") || "[]");
      local.push({ id: crypto.randomUUID(), ...newConstellation });
      localStorage.setItem("constellations", JSON.stringify(local));
      setScreen("welcome");
    }
  }, [stars, userId, fetchConstellations]);

  const handleDelete = useCallback(async (id: string) => {
    if (!userId) return;
    try {
      if (typeof id === 'number' || id.length < 30) {
         await sql`DELETE FROM identity_reflection_entries WHERE id = ${id} AND user_id = ${userId}`;
      } else {
         const local = JSON.parse(localStorage.getItem("constellations") || "[]");
         localStorage.setItem("constellations", JSON.stringify(local.filter((c: any) => c.id !== id)));
      }
      fetchConstellations();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }, [userId, fetchConstellations]);

  const handleViewSaved = useCallback((c: SavedConstellation) => {
    setStars(c.stars);
    setScreen("reflection");
  }, []);

  const handleReset = useCallback(() => {
    setStars([]);
    setScreen("welcome");
  }, []);

  const handleBack = useCallback(() => setScreen("welcome"), []);

  return (
    <div className="activity-root">
      <PrideFloatingOrbs />
      <BackgroundStars />
      
      <div className="activity-container-sm py-8 flex flex-col min-h-screen relative z-10">
        <PrideActivityHeader 
          title="Identity Reflection" 
          subtitle="Map your inner constellation"
          showHistory={true}
          onHistory={handleHistory}
          className="mb-8"
        />

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {screen === "welcome" && (
              <WelcomeScreen key="welcome" onStart={handleStart} onHistory={handleHistory} hasHistory={savedConstellations.length > 0} />
            )}
            {screen === "selection" && (
              <StarSelectionScreen key="selection" onComplete={handleComplete} onBack={handleBack} />
            )}
            {screen === "reflection" && (
              <ReflectionScreen
                key="reflection"
                stars={stars}
                onSave={handleSave}
                onCreateAnother={handleReset}
              />
            )}
            {screen === "history" && (
              <HistoryScreen
                key="history"
                constellations={savedConstellations}
                onBack={handleBack}
                onDelete={handleDelete}
                onView={handleViewSaved}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
