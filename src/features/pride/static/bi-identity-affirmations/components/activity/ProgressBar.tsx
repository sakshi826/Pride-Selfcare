interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="w-full h-1.5 rounded-full bg-foreground/5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, hsl(var(--bi-pink)), hsl(var(--bi-purple)), hsl(var(--bi-blue)))',
        }}
      />
    </div>
  );
};

export default ProgressBar;
