import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import "./i18n/index";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const IdentityJourney = () => {
  const { i18n } = useTranslation();
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    // 1. i18n language handling from URL
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }

    // 2. Auth handling (simple check for user_id)
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
        // Redirection to token login if not found
        // In the main app context, this should already be handled by AuthGuard,
        // but we keep this for consistency with other modules.
        const token = params.get("token");
        if (!token) {
            window.location.href = "/pride/token";
        } else {
            // Handshake is usually handled by the main AuthGuard, 
            // but if we hit this directly, we might need it.
            // For now, let's assume the main App AuthGuard handles it.
            setIsAuthResolved(true);
        }
    } else {
        setIsAuthResolved(true);
    }
  }, [i18n]);

  if (!isAuthResolved) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-600 font-medium animate-pulse">Loading Journey...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default IdentityJourney;
