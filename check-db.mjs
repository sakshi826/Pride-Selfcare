import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://neondb_owner:npg_A6D4jQFznkvq@ep-falling-brook-aohxjwp6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

async function check() {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Tables:', tables.map(t => t.table_name));
  } catch (e) {
    console.error(e);
  }
}

check();
