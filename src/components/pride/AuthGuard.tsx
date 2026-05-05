import { useEffect, useState, ReactNode } from 'react';
import { sql } from '@/lib/db';
import { initTables } from '@/features/pride/trackers/DbSetup';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function handshake() {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const existingUserId = sessionStorage.getItem('user_id');

      // 1. Ensure DB is ready
      try {
        await initTables();
      } catch (err) {
        console.error('Database init failed:', err);
      }

      // 2. Capture current path for persistence (if not already in token flow)
      const currentPath = window.location.pathname + window.location.search;
      if (!token && !currentPath.includes('/token') && !existingUserId) {
        sessionStorage.setItem('auth_redirect_path', currentPath);
      }

      // 3. Handle Token in URL (Priority Flow)
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

              // Clean URL and handle persistence
              const storedPath = sessionStorage.getItem('auth_redirect_path');
              if (storedPath && !storedPath.includes('/token')) {
                sessionStorage.removeItem('auth_redirect_path');
                // Construct clean URL at the original path
                window.location.href = storedPath;
                return;
              }

              // If no stored path, just clean the current URL
              url.searchParams.delete('token');
              window.history.replaceState({}, document.title, url.toString());
              setIsAuthenticated(true);
              return;
            }
          }
        } catch (err) {
          console.error('Handshake error:', err);
        }
      }

      // 4. Use Existing Session if available
      if (existingUserId) {
        setIsAuthenticated(true);
        return;
      }

      // 5. Try Silent Auth (hit Auth API)
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
                
                setIsAuthenticated(true);
                return;
              }
            }
          }
        }
      } catch (err) {
        console.error('Silent auth failed:', err);
      }

      // 6. Everything failed: Automatic Redirect to Login (Maintain Path)
      const platformOrigin = window.location.origin;
      const finalStoredPath = sessionStorage.getItem('auth_redirect_path') || '/pride';
      const redirectUrl = encodeURIComponent(`${platformOrigin}${finalStoredPath}`);
      window.location.href = `${platformOrigin}/login?redirect_url=${redirectUrl}`;
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

