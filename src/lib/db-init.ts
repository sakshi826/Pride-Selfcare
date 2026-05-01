import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const databaseUrl = process.env.VITE_NEON_DATABASE_URL;

if (!databaseUrl) {
  console.error('VITE_NEON_DATABASE_URL is missing in environment!');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function initDb() {
  console.log('Initializing database tables...');

  try {
    // 1. Daily Care Entries
    await sql`
      CREATE TABLE IF NOT EXISTS daily_care_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        activities TEXT[] NOT NULL,
        duration TEXT NOT NULL,
        mood TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Table daily_care_entries created');

    // 2. Mood Entries
    await sql`
      CREATE TABLE IF NOT EXISTS mood_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        value INTEGER NOT NULL,
        label TEXT NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Table mood_entries created');

    // 3. Sleep Entries
    await sql`
      CREATE TABLE IF NOT EXISTS sleep_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        bedtime TEXT NOT NULL,
        waketime TEXT NOT NULL,
        quality INTEGER NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Table sleep_entries created');

    // 4. Gratitude Entries
    await sql`
      CREATE TABLE IF NOT EXISTS gratitude_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        items TEXT[] NOT NULL,
        mood_emoji TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Table gratitude_entries created');

    // 5. Vibe Entries
    await sql`
      CREATE TABLE IF NOT EXISTS vibe_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        vibe TEXT NOT NULL,
        reflections JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Table vibe_entries created');

    // Also add the tables from the plan just in case
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
          user_id TEXT NOT NULL,
          data JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log(`✅ Table ${table} created`);
    }

    console.log('All tables initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initDb();
