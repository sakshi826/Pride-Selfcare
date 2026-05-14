import React from "react";
import { ChevronLeft, History } from "lucide-react";
import { cn } from "../../../lib/utils";

interface PrideActivityHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onHistory?: () => void;
  showHistory?: boolean;
  className?: string;
}

export const PrideActivityHeader: React.FC<PrideActivityHeaderProps> = ({ 
  title, 
  subtitle, 
  onBack,
  onHistory,
  showHistory = false,
  className 
}) => {
  const handleExit = () => {
    if (onBack) {
      onBack();
    } else {
      window.parent.postMessage("exit_activity", "*");
      window.location.href = "/pride/lgbtq-hub" + window.location.search;
    }
  };

  const handleHistory = () => {
    if (onHistory) {
      onHistory();
    }
  };

  return (
    <div className={cn("flex items-start justify-between mb-8 relative z-50", className)}>
      <div className="flex items-start gap-5">
        <button
          onClick={handleExit}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-foreground hover:text-pride-purple hover:scale-110 active:scale-95 transition-all shadow-xl border border-black/5 group shrink-0"
          aria-label="Exit activity"
        >
          <ChevronLeft size={24} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="space-y-1 mt-1">
          <h1 className="text-3xl font-black text-foreground tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-base text-muted-foreground font-semibold">{subtitle}</p>}
        </div>
      </div>

      {showHistory && (
        <button
          onClick={handleHistory}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-foreground hover:text-pride-blue hover:scale-110 active:scale-95 transition-all shadow-xl border border-black/5 group shrink-0"
          aria-label="View history"
        >
          <History size={24} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};
