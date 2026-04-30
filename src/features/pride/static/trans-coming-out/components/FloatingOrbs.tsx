const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'hsl(193, 96%, 66%)',
          top: '10%',
          left: '15%',
          animation: 'float-orb 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'hsl(350, 80%, 82%)',
          top: '50%',
          right: '10%',
          animation: 'float-orb 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'hsl(0, 0%, 96%)',
          bottom: '20%',
          left: '40%',
          animation: 'float-orb 18s ease-in-out infinite 3s',
        }}
      />
      <div
        className="absolute w-52 h-52 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'hsl(193, 96%, 66%)',
          bottom: '10%',
          right: '30%',
          animation: 'float-orb 22s ease-in-out infinite 5s',
        }}
      />
    </div>
  );
};

export default FloatingOrbs;
