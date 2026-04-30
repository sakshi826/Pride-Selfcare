import { useEffect, useState, ReactNode } from 'react';
import { sql } from '@/lib/db';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function handshake() {
      // 1. Check existing session
      const existingUserId = sessionStorage.getItem('user_id');
      if (existingUserId) {
        setIsAuthenticated(true);
        return;
      }

      // 2. Check URL for token
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');

      if (!token) {
        window.location.href = '/pride/token'; // Hard redirect
        return;
      }

      try {
        // 3. Validation
        const res = await fetch('https://api.mantracare.com/user/user-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (!res.ok) {
          throw new Error('Handshake failed');
        }

        const data = await res.json();
        const userId = data.user_id;

        if (!userId) {
          throw new Error('No user_id in response');
        }

        // 4. Store in sessionStorage
        sessionStorage.setItem('user_id', userId);

        // 5. Database Upsert
        await sql`
          INSERT INTO users (id) 
          VALUES (${userId}) 
          ON CONFLICT (id) DO NOTHING
        `;

        // 6. Clean URL
        url.searchParams.delete('token');
        window.history.replaceState({}, document.title, url.toString());

        setIsAuthenticated(true);
      } catch (err) {
        console.error('AuthGuard Error:', err);
        window.location.href = '/pride/token';
      }
    }

    handshake();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="text-lg animate-pulse">Authenticating...</div>
      </div>
    );
  }

  return <>{children}</>;
}
