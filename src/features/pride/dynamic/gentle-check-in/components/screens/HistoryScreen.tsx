import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { sql } from "@/lib/db";
import type { CheckinEntry } from "../ComfortCheckin";

interface Props {
  onBack: () => void;
}

const STORAGE_KEY = "rightnow-checkin-entries";

const HistoryScreen = ({ onBack }: Props) => {
  const [entries, setEntries] = useState<CheckinEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) throw new Error('No user session');

        const rows = await sql`
          SELECT data FROM gentle_check_in_entries 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `;
        
        const dbEntries = rows.map(r => r.data as CheckinEntry);
        
        // Merge with local storage for transition
        const localEntries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        
        const combined = [...dbEntries];
        localEntries.forEach((le: CheckinEntry) => {
          if (!combined.some(db => db.id === le.id || db.date === le.date)) {
            combined.push(le);
          }
        });

        setEntries(combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        console.error('Failed to fetch from DB, using localStorage:', err);
        const localEntries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        setEntries(localEntries);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Your History</h1>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      ) : entries.length === 0 ? (
        <div className="py-12 text-muted-foreground">
          No check-ins yet. Take a moment for yourself!
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/50 backdrop-blur-sm border border-black/5 p-4 rounded-2xl text-left space-y-2"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-primary">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {entry.intensity}/10
                </span>
              </div>
              <p className="text-sm font-medium">{entry.type} Check-in</p>
              {entry.note && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  "{entry.note}"
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
