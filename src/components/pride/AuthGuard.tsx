import { useEffect, useState, ReactNode } from 'react';
import { sql } from '@/lib/db';
import { initTables } from '@/features/pride/trackers/DbSetup';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function handshake() {
      const url = new URL(window.location.href);
      const urlToken = url.searchParams.get('token');
      const existingUserId = sessionStorage.getItem('user_id');

      // 1. Ensure DB is ready
      try {
        await initTables();
      } catch (err) {
        console.error('Database init failed:', err);
      }

      // 2. Validation Logic (Handshake Protocol)
      const validateToken = async (token: string) => {
        console.log('Validating token...');
        try {
          const res = await fetch('https://api.mantracare.com/user/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token })
          });

          if (res.ok) {
            const data = await res.json();
            const userId = data.user_id || data.userId;
            if (userId) {
              console.log('Validation success for user:', userId);
              // Resolution: Store in sessionStorage
              sessionStorage.setItem('user_id', userId.toString());
              
              // Database Initialization Upsert (BIGINT)
              try {
                await sql`
                  INSERT INTO users (id, updated_at) 
                  VALUES (${userId}, NOW()) 
                  ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
                `;
              } catch (dbErr) {
                console.error('User upsert failed:', dbErr);
              }

              // Handle Path Persistence
              const storedPath = sessionStorage.getItem('auth_redirect_path');
              if (storedPath && !storedPath.includes('/token') && storedPath !== (window.location.pathname + window.location.search)) {
                console.log('Redirecting to stored path:', storedPath);
                sessionStorage.removeItem('auth_redirect_path');
                window.location.href = storedPath;
                return true;
              }

              // Resolution: Clean URL
              const cleanUrl = new URL(window.location.href);
              if (cleanUrl.searchParams.has('token')) {
                cleanUrl.searchParams.delete('token');
                window.history.replaceState({}, document.title, cleanUrl.toString());
              }
              setIsAuthenticated(true);
              return true;
            }
          } else {
            console.warn('Validation API returned status:', res.status);
          }
        } catch (err) {
          console.error('Handshake validation failed:', err);
        }
        return false;
      };

      // 3. Extraction: Check URL for token
      if (urlToken) {
        console.log('Token found in URL, validating...');
        if (await validateToken(urlToken)) return;
      }

      // 4. Session Isolation check
      if (existingUserId) {
        console.log('Existing session found for user:', existingUserId);
        setIsAuthenticated(true);
        return;
      }

      // 5. Silent Auth (Hit the Auth API)
      console.log('Attempting silent auth via get-token...');
      try {
        const authRes = await fetch('https://api.mantracare.com/user/get-token', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        });

        if (authRes.ok) {
          const authData = await authRes.json();
          const userId = authData.user_id || authData.userId;
          const newToken = authData.token;
          
          console.log('Silent auth response:', { hasUserId: !!userId, hasToken: !!newToken });

          if (userId && newToken) {
            // Success: We got both!
            sessionStorage.setItem('user_id', userId.toString());
            try {
              await sql`
                INSERT INTO users (id, updated_at) 
                VALUES (${userId}, NOW()) 
                ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
              `;
            } catch (dbErr) {
              console.error('User upsert failed:', dbErr);
            }
            setIsAuthenticated(true);
            return;
          } else if (newToken) {
            // Only token, must validate
            if (await validateToken(newToken)) return;
          }
        } else {
          console.warn('Silent auth API returned status:', authRes.status);
        }
      } catch (err) {
        console.error('Silent auth attempt failed:', err);
      }

      // 6. Failure/Missing: Hard redirect to /token
      if (!window.location.pathname.includes('/token')) {
        console.log('All auth attempts failed, redirecting to fallback...');
        // Save current path for persistence before redirect
        sessionStorage.setItem('auth_redirect_path', window.location.pathname + window.location.search);
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

