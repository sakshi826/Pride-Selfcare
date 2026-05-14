import { ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    window.parent.postMessage("exit_activity", "*");
    window.location.href = "/pride/lgbtq-hub" + window.location.search;
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-md border-b border-border/10 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-foreground hover:text-purple-600 transition-all shadow-sm border border-black/5 active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-foreground tracking-tight">{t('app_title')}</h1>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
