import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;

console.log('Database URL presence check:', !!databaseUrl);

let sql: any;
try {
  if (!databaseUrl) {
    console.error('VITE_NEON_DATABASE_URL is missing!');
    // Provide a mock sql that throws a better error when called
    sql = async () => { throw new Error('Database not configured'); };
  } else {
    sql = neon(databaseUrl, {
      disableWarningInBrowsers: true,
    });
  }
} catch (err) {
  console.error('Neon initialization failed:', err);
  sql = async () => { throw new Error('Database initialization error'); };
}

export { sql };
