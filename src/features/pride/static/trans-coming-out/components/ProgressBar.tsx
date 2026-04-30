interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-[440px] mx-auto px-4 pt-4 pb-2">
      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #55cdfc, #f7a8b8, #f5f5f5, #f7a8b8, #55cdfc)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground mt-1.5 font-body">
        {current + 1} of {total}
      </p>
    </div>
  );
};

export default ProgressBar;
