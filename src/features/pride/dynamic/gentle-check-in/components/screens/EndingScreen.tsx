import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";

interface Props {
  onDone: () => void;
}

const messages = [
  "You showed up for yourself today, and that takes real courage.",
  "You deserve gentleness — especially from yourself.",
  "Whatever you're carrying, you don't have to carry it perfectly.",
  "You are so much more than this moment — and this moment will pass.",
  "The fact that you paused to check in says something beautiful about you.",
];

const EndingScreen = ({ onDone }: Props) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();
  const message = useMemo(() => messages[Math.floor(Math.random() * messages.length)], []);

  return (
  <div className="premium-card p-10 md:p-12 text-center space-y-10">
    <div className="text-6xl animate-bounce">🌈</div>
    <p className="text-xl font-bold text-foreground leading-relaxed">
      {message}
    </p>
    <button
      onClick={() => setIsShareOpen(true)}
      className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
    >
      <Share2 size={16} />
      <span>Share</span>
    </button>

    <button
      onClick={() => navigate('/lgbtq-hub' + window.location.search)}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
    >
      Back to Hub
    </button>

    <ShareModal 
      isOpen={isShareOpen} 
      onClose={() => setIsShareOpen(false)} 
      title="Share This Moment"
    />
  </div>
  );
};

export default EndingScreen;
