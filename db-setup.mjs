import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Manually parse .env file
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => {
      const [key, ...value] = line.split('=');
      return [key.trim(), value.join('=').trim().replace(/^["']|["']$/g, '')];
    })
);

const databaseUrl = envVars.VITE_NEON_DATABASE_URL;

if (!databaseUrl) {
  console.error('Error: VITE_NEON_DATABASE_URL is not defined in .env');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function initDb() {
  console.log('🚀 Starting Database Initialization...');
  try {
    // 1. Daily Care Entries
    console.log('Creating daily_care_entries...');
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
    
    // 2. Mood Entries
    console.log('Creating mood_entries...');
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
    
    // 3. Sleep Entries
    console.log('Creating sleep_entries...');
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
    
    // 4. Gratitude Entries
    console.log('Creating gratitude_entries...');
    await sql`
      CREATE TABLE IF NOT EXISTS gratitude_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        items TEXT[] NOT NULL,
        mood_emoji TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 5. Vibe Entries
    console.log('Creating vibe_entries...');
    await sql`
      CREATE TABLE IF NOT EXISTS vibe_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
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
      console.log(`Creating ${table}...`);
      await sql.query(`
        CREATE TABLE IF NOT EXISTS ${table} (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id TEXT NOT NULL,
          data JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }

    console.log('✅ All tables created successfully!');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  }
}

initDb();
