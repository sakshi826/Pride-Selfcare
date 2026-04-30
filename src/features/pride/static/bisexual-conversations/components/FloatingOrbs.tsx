const FloatingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div
      className="absolute w-72 h-72 rounded-full blur-[100px] opacity-25 animate-[drift1_20s_ease-in-out_infinite]"
      style={{ background: "hsl(var(--bi-pink))", top: "10%", left: "-5%" }}
    />
    <div
      className="absolute w-80 h-80 rounded-full blur-[120px] opacity-20 animate-[drift2_25s_ease-in-out_infinite]"
      style={{ background: "hsl(var(--bi-purple))", top: "50%", right: "-10%" }}
    />
    <div
      className="absolute w-64 h-64 rounded-full blur-[100px] opacity-20 animate-[drift3_22s_ease-in-out_infinite]"
      style={{ background: "hsl(var(--bi-blue))", bottom: "5%", left: "20%" }}
    />
    <style>{`
      @keyframes drift1 {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(60px, 40px); }
        66% { transform: translate(-30px, 80px); }
      }
      @keyframes drift2 {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(-50px, -60px); }
        66% { transform: translate(40px, -30px); }
      }
      @keyframes drift3 {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(70px, -40px); }
        66% { transform: translate(-40px, 50px); }
      }
    `}</style>
  </div>
);

export default FloatingOrbs;
