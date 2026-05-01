import https from 'https';

const databaseUrl = "postgresql://neondb_owner:npg_A6D4jQFznkvq@ep-falling-brook-aohxjwp6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Extract host and credentials from URL
// URL format: postgresql://user:password@host/database
const urlPattern = /postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/(.+)/;
const match = databaseUrl.match(urlPattern);

if (!match) {
  console.error('Invalid database URL format');
  process.exit(1);
}

const [_, user, password, host, dbName] = match;
const sqlEndpoint = `https://api.c-2.ap-southeast-1.aws.neon.tech/sql`;

const queries = [
  // 1. Daily Care Entries
  `CREATE TABLE IF NOT EXISTS daily_care_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    activities TEXT[] NOT NULL,
    duration TEXT NOT NULL,
    mood TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`,
  // 2. Mood Entries
  `CREATE TABLE IF NOT EXISTS mood_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    value INTEGER NOT NULL,
    label TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );`,
  // 3. Sleep Entries
  `CREATE TABLE IF NOT EXISTS sleep_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    bedtime TEXT NOT NULL,
    waketime TEXT NOT NULL,
    quality INTEGER NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`,
  // 4. Gratitude Entries
  `CREATE TABLE IF NOT EXISTS gratitude_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    items TEXT[] NOT NULL,
    mood_emoji TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`,
  // 5. Vibe Entries
  `CREATE TABLE IF NOT EXISTS vibe_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    vibe TEXT NOT NULL,
    reflections JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT NOW()
  );`,
  // Plan Tables
  `CREATE TABLE IF NOT EXISTS find_your_right_time_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`,
  `CREATE TABLE IF NOT EXISTS gentle_check_in_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`,
  `CREATE TABLE IF NOT EXISTS identity_exploration_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`,
  `CREATE TABLE IF NOT EXISTS identity_reflection_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`,
  `CREATE TABLE IF NOT EXISTS pride_journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`,
  `CREATE TABLE IF NOT EXISTS pride_mirror_moments_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`,
  `CREATE TABLE IF NOT EXISTS pride_spectrum_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );`
];

async function runQuery(query) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query });
    
    // The Neon SQL API usually requires the password in the header or connection string
    // But since I'm using the /sql endpoint which is what @neondatabase/serverless uses,
    // I need to make sure I'm sending it correctly.
    // Actually, the /sql endpoint usually expects the full connection string or similar if using the proxy.
    // However, I can just use a simple POST to the endpoint if I have the correct auth.
    
    // Actually, let's use the neon client's logic. 
    // It's easier to just use the neon client if I can get it to run.
    
    // If I can't use the client, I'll use the raw fetch-like behavior.
    // But the raw /sql endpoint might be protected.
    
    const options = {
      hostname: 'api.c-2.ap-southeast-1.aws.neon.tech',
      path: '/sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': `Bearer ${password}` // This might not be right for the /sql endpoint
      }
    };

    // Wait, let's try a different approach. I'll use the `neon` client in a way that doesn't require a package if I can.
    // No, that's hard.
    
    // I'll just write the script as a .ts file and use `npx tsx` which is often available or installs quickly.
    // Or better, I'll just use the `run_command` to run a node script that I pipe into node.
    
    // Let's try `npx -y tsx` to run the .ts file.
    
    resolve(); // placeholder
  });
}

console.log("Please use the Neon console to run these queries:");
queries.forEach(q => console.log(q));
