interface CardEyeProps {
  eye: string;
  title: string;
}

const CardEye = ({ eye, title }: CardEyeProps) => (
  <div className="mb-5">
    <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(0,0%,0%)] mb-1.5 font-body">
      {eye}
    </p>
    <h2 className="font-display text-2xl leading-tight text-foreground">{title}</h2>
  </div>
);

export default CardEye;
