import { useEffect, useState, ReactNode } from 'react';
import { sql } from '@/lib/db';
import { initTables } from '@/features/pride/trackers/DbSetup';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function handshake() {
      const url = new URL(window.location.href);
      let token = url.searchParams.get('token');
      const existingUserId = sessionStorage.getItem('user_id');

      // 1. Ensure DB is ready
      try {
        await initTables();
      } catch (err) {
        console.error('Database init failed:', err);
      }

      // 2. If we have a token in the URL, validate it (takes priority)
      if (token) {
        try {
          const res = await fetch('https://api.mantracare.com/user/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token })
          });

          if (res.ok) {
            const data = await res.json();
            const userId = data.user_id;
            if (userId) {
              sessionStorage.setItem('user_id', userId);
              
              // Database Upsert
              try {
                await sql`
                  INSERT INTO users (id, updated_at) 
                  VALUES (${userId}, NOW()) 
                  ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
                `;
              } catch (dbErr) {
                console.error('User upsert failed:', dbErr);
              }

              // Clean URL
              url.searchParams.delete('token');
              window.history.replaceState({}, document.title, url.toString());

              // If we have a stored path, redirect to it
              const storedPath = sessionStorage.getItem('auth_redirect_path');
              if (storedPath && !storedPath.includes('/token')) {
                sessionStorage.removeItem('auth_redirect_path');
                window.location.href = storedPath;
                return;
              }

              setIsAuthenticated(true);
              return;
            }
          }
          throw new Error('Token validation failed');
        } catch (err) {
          console.error('Handshake error:', err);
          sessionStorage.removeItem('user_id');
          if (!window.location.pathname.includes('/token')) {
            window.location.href = '/pride/token';
          }
          return;
        }
      }

      // 2. If no token in URL, check if we already have a session
      if (existingUserId) {
        setIsAuthenticated(true);
        return;
      }

      // 3. No token in URL and no session: Save path and try "Auth API" (silent auth)
      const currentPath = window.location.pathname + window.location.search;
      if (!currentPath.includes('/token')) {
        sessionStorage.setItem('auth_redirect_path', currentPath);
      }

      try {
        const authRes = await fetch('https://api.mantracare.com/user/get-token', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });

        if (authRes.ok) {
          const authData = await authRes.json();
          const newToken = authData.token;

          if (newToken) {
            // Validate the new token
            const res = await fetch('https://api.mantracare.com/user/user-info', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ token: newToken })
            });

            if (res.ok) {
              const data = await res.json();
              const userId = data.user_id;
              if (userId) {
                sessionStorage.setItem('user_id', userId);
                
                await sql`
                  INSERT INTO users (id, updated_at) 
                  VALUES (${userId}, NOW()) 
                  ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
                `;

                // Success! Redirect to original path
                const storedPath = sessionStorage.getItem('auth_redirect_path');
                if (storedPath && !storedPath.includes('/token')) {
                  sessionStorage.removeItem('auth_redirect_path');
                  window.location.href = storedPath;
                  return;
                }
                
                setIsAuthenticated(true);
                return;
              }
            }
          }
        }
      } catch (err) {
        console.error('Silent auth failed:', err);
      }

      // 4. Everything failed: Redirect to /token
      if (!window.location.pathname.includes('/token')) {
        window.location.href = '/pride/token';
      }
    }

    handshake();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F9F6FE]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-purple-900 font-medium animate-pulse">
          Securing your session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

