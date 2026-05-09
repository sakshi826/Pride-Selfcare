import { useEffect, useState, ReactNode } from 'react';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [hasId, setHasId] = useState(!!sessionStorage.getItem('user_id'));

  useEffect(() => {
    // Poll or check for session completion from App handshake
    const interval = setInterval(() => {
      const id = sessionStorage.getItem('user_id');
      if (id) {
        setHasId(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!hasId) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F9F6FE]">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="mt-6 text-purple-900 font-medium">Loading</p>
      </div>
    );
  }

  return <>{children}</>;
}

