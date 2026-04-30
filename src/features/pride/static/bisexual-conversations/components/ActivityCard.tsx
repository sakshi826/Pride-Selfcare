import { ReactNode } from "react";

interface ActivityCardProps {
  eyebrow: string;
  title: string;
  color: "pink" | "purple" | "blue";
  children: ReactNode;
  button?: { label: string; onClick: () => void };
  notice?: string;
}

const bandColors = {
  pink: "bg-bi-pink",
  purple: "bg-bi-purple",
  blue: "bg-bi-blue",
};

const ActivityCard = ({ eyebrow, title, color, children, button, notice }: ActivityCardProps) => (
  <div className="card-glass flex flex-col w-full overflow-hidden">
    <div className={`h-1.5 w-full ${bandColors[color]}`} />
    <div className="p-6 flex flex-col gap-4 flex-1">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl leading-tight text-foreground">{title}</h2>
      <div className="flex-1 flex flex-col gap-3">{children}</div>
      {notice && (
        <div className="rounded-xl bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground leading-relaxed">
          ⚠️ {notice}
        </div>
      )}
      {button && (
        <button onClick={button.onClick} className="btn-pill w-full mt-2">
          {button.label}
        </button>
      )}
    </div>
  </div>
);

export default ActivityCard;
