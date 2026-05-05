import { useState, useEffect } from "react";
import Header from "../components/Header";
import CheckInCard from "../components/CheckInCard";
import WeekStrip from "../components/WeekStrip";
import DoneSection from "../components/DoneSection";
import QuoteScreen from "../components/QuoteScreen";
import { sql } from "@/lib/db";

const getDayIndex = () => {
  const day = new Date().getDay();
  // Convert Sunday=0..Saturday=6 to Mon=0..Sun=6
  return day === 0 ? 6 : day - 1;
};

const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [viewingDate, setViewingDate] = useState(new Date());
  const [loggedDays, setLoggedDays] = useState<(number | null)[]>([null, null, null, null, null, null, null]);
  const userId = sessionStorage.getItem('user_id');

  const viewingWeekStart = formatDate(getStartOfWeek(viewingDate));
  const todayWeekStart = formatDate(getStartOfWeek(new Date()));

  useEffect(() => {
    const fetchProgress = async () => {
        if (!userId) return;
        try {
            const rows = await sql`
                SELECT data FROM identity_journey_entries 
                WHERE user_id = ${userId} AND data->>'week_start' = ${viewingWeekStart}
            `;
            if (rows && rows.length > 0) {
                const weekData = rows[0].data.week_data;
                setLoggedDays(weekData);
            } else {
                setLoggedDays([null, null, null, null, null, null, null]);
            }
        } catch (error) {
            console.error("Failed to fetch journey progress:", error);
        }
    };
    fetchProgress();
  }, [userId, viewingWeekStart]);

  const handleDone = async () => {
    if (selected !== null && userId) {
      const todayIdx = getDayIndex();
      
      // Update local state if viewing current week
      let updatedToSave = [...loggedDays];
      if (viewingWeekStart === todayWeekStart) {
          updatedToSave[todayIdx] = selected;
          setLoggedDays(updatedToSave);
      } else {
          // If not viewing current week, we need to fetch it first to be sure
          try {
              const rows = await sql`
                SELECT data FROM identity_journey_entries 
                WHERE user_id = ${userId} AND data->>'week_start' = ${todayWeekStart}
              `;
              if (rows && rows.length > 0) {
                  updatedToSave = rows[0].data.week_data;
              } else {
                  updatedToSave = [null, null, null, null, null, null, null];
              }
              updatedToSave[todayIdx] = selected;
          } catch (e) {
              console.error("Failed to fetch current week for saving:", e);
              updatedToSave = [null, null, null, null, null, null, null];
              updatedToSave[todayIdx] = selected;
          }
      }

      try {
        // Upsert logic
        await sql`
            INSERT INTO identity_journey_entries (user_id, data)
            VALUES (${userId}, ${JSON.stringify({ week_start: todayWeekStart, week_data: updatedToSave })})
            ON CONFLICT (user_id, (data->>'week_start')) 
            DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
        `;
        setShowQuote(true);
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    }
  };

  const handlePrevWeek = () => {
    const prev = new Date(viewingDate);
    prev.setDate(prev.getDate() - 7);
    setViewingDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(viewingDate);
    next.setDate(next.getDate() + 7);
    setViewingDate(next);
  };

  const handleClose = () => {
    setShowQuote(false);
    setSelected(null);
  };

  if (showQuote && selected !== null) {
    return <QuoteScreen selectedIndex={selected} onClose={handleClose} />;
  }

  return (
    <div className="min-h-screen bg-transparent max-w-md mx-auto">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <CheckInCard selected={selected} onSelect={setSelected} />
        <WeekStrip
          loggedDays={loggedDays}
          viewingDate={viewingDate}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />
      </div>
      <DoneSection enabled={selected !== null} onDone={handleDone} />
    </div>
  );
};

export default Index;
