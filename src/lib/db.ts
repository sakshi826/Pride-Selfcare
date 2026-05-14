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
    
    // Wrap to ensure it always has a .query method for compatibility
    sql = async (strings: any, ...values: any[]) => {
      return neonFn(strings, ...values);
    };
    sql.query = async (q: string, params?: any[]) => {
      // Basic implementation if needed, though neon() usually handles it
      return neonFn(q, ...(params || []));
    };
  }
} catch (err) {
  console.error('Neon initialization failed:', err);
}

export { sql };
