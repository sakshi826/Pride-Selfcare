import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import i18n from "./i18n/index";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

const queryClient = new QueryClient();

const IdentityJourney = () => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
    setIsAuthResolved(true);
  }, []);

  if (!isAuthResolved) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};
export default IdentityJourney;
