import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sql } from "@/lib/db";

interface PrideTrackerHistoryProps {
  tableName: string;
  renderEntry: (entry: any) => React.ReactNode;
  emptyMessage?: string;
}

export const PrideTrackerHistory: React.FC<PrideTrackerHistoryProps> = ({
  tableName,
  renderEntry,
  emptyMessage
}) => {
  const { t, i18n } = useTranslation("hub");
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const displayEmptyMessage = emptyMessage || t("No entries yet. Start tracking today!");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = sessionStorage.getItem('user_id') || 'anonymous';
        const rows = await sql.query(`
          SELECT * FROM ${tableName} 
          WHERE user_id = $1 
          ORDER BY created_at DESC
        `, [userId]);
        
        setEntries(rows);
      } catch (err) {
        console.error(`Failed to fetch history for ${tableName}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [tableName]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-pride-purple" size={40} />
        <p className="text-muted-foreground font-medium animate-pulse">{t("Retrieving your history...")}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="premium-card p-12 text-center space-y-4">
        <div className="text-4xl">🗒️</div>
        <p className="text-lg text-muted-foreground font-medium italic">
          {displayEmptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {entries.map((entry, idx) => (
        <motion.div
          key={entry.id || idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="premium-card overflow-hidden border-l-4 border-l-pride-purple"
        >
          <div className="bg-black/5 px-6 py-2 flex justify-between items-center border-b border-black/5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <Calendar size={12} />
              {new Date(entry.created_at).toLocaleDateString(i18n.language, { 
                month: "short", 
                day: "numeric", 
                year: "numeric" 
              })}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <Clock size={12} />
              {new Date(entry.created_at).toLocaleTimeString(i18n.language, { 
                hour: "2-digit", 
                minute: "2-digit" 
              })}
            </div>
          </div>
          <div className="p-6">
            {renderEntry(entry)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
