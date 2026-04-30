const STICKERS = ["🌈", "⭐", "💖", "🌸", "✨"];

const StickerPicker = ({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (s: string) => void;
}) => {
  return (
    <div className="flex gap-2 justify-center mt-3">
      <span className="text-xs text-muted-foreground journal-font self-center mr-1">Add sticker:</span>
      {STICKERS.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`text-xl transition-transform hover:scale-125 ${
            selected === s ? "scale-125 drop-shadow-md" : ""
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default StickerPicker;
