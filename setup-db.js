import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_A6D4jQFznkvq@ep-falling-brook-aohxjwp6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" });

async function setup() {
  console.log("Creating tables...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("Created users table");

  const tables = [
    'find_your_right_time_entries',
    'gentle_check_in_entries',
    'identity_exploration_entries',
    'identity_reflection_entries',
    'pride_journal_entries',
    'pride_mirror_moments_entries',
    'pride_spectrum_entries'
  ];

  for (const table of tables) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id BIGINT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log(`Created ${table} table`);
  }
  
  console.log("Database setup complete.");
}

setup().catch(console.error);
