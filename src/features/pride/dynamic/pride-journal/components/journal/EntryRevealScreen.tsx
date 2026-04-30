import { Button } from "@/components/ui/button";
import JournalCard from "./JournalCard";

interface EntryRevealScreenProps {
  index: number;
  text: string;
  sticker: string | null;
  onStickerSelect: (s: string) => void;
  onContinue: () => void;
  isLast: boolean;
}

const EntryRevealScreen = ({ index, text, sticker, onStickerSelect, onContinue, isLast }: EntryRevealScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-lg text-center text-foreground">Your reflection ✨</h2>
        <JournalCard
          index={index}
          text={text}
          sticker={sticker}
          onStickerSelect={onStickerSelect}
          flipped
        />
        <Button variant="pride" size="lg" className="w-full" onClick={onContinue}>
          {isLast ? "View All Reflections" : "Next Prompt"}
        </Button>
      </div>
    </div>
  );
};

export default EntryRevealScreen;
