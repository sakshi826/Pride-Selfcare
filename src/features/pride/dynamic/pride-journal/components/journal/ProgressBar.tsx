const COLORS = [
  "bg-pastel-red",
  "bg-pastel-orange",
  "bg-pastel-yellow",
  "bg-pastel-green",
  "bg-pastel-blue",
  "bg-pastel-purple",
];

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  return (
    <div className="w-full text-center">
      <p className="text-sm text-muted-foreground journal-font mb-2">
        Your Gratitude Rainbow • {current} / {total} colors
      </p>
      <div className="flex gap-1.5 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i < current ? COLORS[i % COLORS.length] + " w-10" : "bg-border w-6"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
