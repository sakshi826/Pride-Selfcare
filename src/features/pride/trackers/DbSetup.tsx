import { useState } from "react";
import { sql } from "@/lib/db";
import { PrideActivityHeader } from "../components/PrideActivityHeader";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";

export default function DbSetup() {
  const [status, setStatus] = useState<string>("Ready to initialize tables...");
  const [loading, setLoading] = useState(false);

  const initDb = async () => {
    setLoading(true);
    setStatus("Initializing...");
    try {
      // 0. Users Table (Identity source of truth)
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id BIGINT PRIMARY KEY,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // 1. Daily Care Entries
      await sql`
        CREATE TABLE IF NOT EXISTS daily_care_entries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id BIGINT NOT NULL,
          activities TEXT[] NOT NULL,
          duration TEXT NOT NULL,
          mood TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;
      
      // 2. Mood Entries
      await sql`
        CREATE TABLE IF NOT EXISTS mood_entries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id BIGINT NOT NULL,
          value INTEGER NOT NULL,
          label TEXT NOT NULL,
          note TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;
      
      // 3. Sleep Entries
      await sql`
        CREATE TABLE IF NOT EXISTS sleep_entries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id BIGINT NOT NULL,
          bedtime TEXT NOT NULL,
          waketime TEXT NOT NULL,
          quality INTEGER NOT NULL,
          date DATE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;
      
      // 4. Gratitude Entries
      await sql`
        CREATE TABLE IF NOT EXISTS gratitude_entries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id BIGINT NOT NULL,
          items TEXT[] NOT NULL,
          mood_emoji TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;
      
      // 5. Vibe Entries
      await sql`
        CREATE TABLE IF NOT EXISTS vibe_entries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id BIGINT NOT NULL,
          vibe TEXT NOT NULL,
          reflections JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Execution Plan Tables
      const planTables = [
        'find_your_right_time_entries',
        'gentle_check_in_entries',
        'identity_exploration_entries',
        'identity_reflection_entries',
        'pride_journal_entries',
        'pride_mirror_moments_entries',
        'pride_spectrum_entries'
      ];

      for (const table of planTables) {
        await sql(`
          CREATE TABLE IF NOT EXISTS ${table} (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id BIGINT NOT NULL,
            data JSONB NOT NULL DEFAULT '{}'::jsonb,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
        `);
      }

      setStatus("✅ All tables created successfully (including Users table)!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-root bg-[#FDFCFE] py-8">
      <PrideFloatingOrbs />
      <div className="activity-container-sm">
        <PrideActivityHeader title="Database Setup" subtitle="Initialize Neon tables" />
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white space-y-6">
          <p className="text-gray-600 leading-relaxed">
            This tool will create all necessary tables in your Neon database for the Pride trackers and activities.
          </p>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-mono text-sm break-all">
            {status}
          </div>
          <button
            onClick={initDb}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Run Initialization"}
          </button>
        </div>
      </div>
    </div>
  );
}
