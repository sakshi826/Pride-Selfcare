const FloatingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div
      className="orb-pink absolute w-[340px] h-[340px] rounded-full blur-[100px] opacity-20"
      style={{ background: 'hsl(var(--orb-pink))', top: '10%', left: '-5%' }}
    />
    <div
      className="orb-purple absolute w-[280px] h-[280px] rounded-full blur-[100px] opacity-15"
      style={{ background: 'hsl(var(--orb-purple))', top: '50%', right: '-8%' }}
    />
    <div
      className="orb-blue absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-18"
      style={{ background: 'hsl(var(--orb-blue))', bottom: '5%', left: '20%' }}
    />
  </div>
);

export default FloatingOrbs;
