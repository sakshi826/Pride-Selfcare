import { useEffect, useState } from "react";
import { sql } from "@/lib/db";
import { Loader2 } from "lucide-react";
import type { HistoryEntry } from "./ExplorerFlow";

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen = ({ onBack }: HistoryScreenProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) throw new Error('No user session');

        const rows = await sql`
          SELECT data FROM pride_spectrum_entries 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `;
        
        const dbEntries = rows.map(r => r.data as HistoryEntry);
        
        const local = JSON.parse(localStorage.getItem("spectrum-history") || "[]");
        const combined = [...dbEntries];
        local.forEach((le: HistoryEntry) => {
          if (!combined.some(db => db.date === le.date)) combined.push(le);
        });

        setHistory(combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        console.error('Failed to fetch history:', err);
        const data = JSON.parse(localStorage.getItem("spectrum-history") || "[]");
        setHistory(data);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-md mx-auto px-5 py-6 flex flex-col min-h-screen">
        <h2 className="text-xl font-semibold text-foreground mb-6">Past Explorations</h2>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground" size={32} />
          </div>
        ) : history.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-center">No past explorations yet. Complete the activity to see your history here.</p>
          </div>
        ) : (
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[70vh] no-scrollbar">
            {history.map((entry, i) => (
              <div key={i} className="bg-card rounded-2xl p-5 border border-border">
                <p className="text-xs text-muted-foreground/60 mb-3">
                  {new Date(entry.date).toLocaleDateString("en-US", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric", 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </p>
                <div className="space-y-2">
                  {entry.result.map((line, j) => (
                    <p key={j} className="text-sm text-muted-foreground text-justified leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium mt-6 transition-all hover:opacity-90"
        >
          Back to Explorer
        </button>

        <div className="py-4 mt-2">
          <p className="text-xs text-muted-foreground/60 text-center">
            🔐 Your responses are private and in your control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
