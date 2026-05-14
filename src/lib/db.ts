import { neon } from '@neondatabase/serverless';

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;

console.log('Database URL presence check:', !!databaseUrl);

// Ensure sql is always a function that can handle template literals
const mockSql = (() => {
  const fn: any = async () => { throw new Error('Database not configured'); };
  fn.query = async () => { throw new Error('Database not configured'); };
  return fn;
})();

let sql: any = mockSql;

try {
  if (!databaseUrl) {
    console.error('VITE_NEON_DATABASE_URL is missing!');
  } else {
    const neonFn = neon(databaseUrl, {
      disableWarningInBrowsers: true,
    });
    
    // Standard Neon export
    sql = neonFn;
    sql.query = (q: string, params?: any[]) => neonFn(q, ...(params || []));
  }
} catch (err) {
  console.error('Neon initialization failed:', err);
}

export { sql };
