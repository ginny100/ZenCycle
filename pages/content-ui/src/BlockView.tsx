const BlockView = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(block-view.png)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay',
      }}>
      <div className="relative px-16 py-12 text-center">
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 rounded-2xl bg-black/40 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="mb-2 text-4xl font-light tracking-wide">REGAIN YOUR FOCUS,</h1>
          <h1 className="text-4xl font-light tracking-wide">REGAIN YOUR LIFE</h1>
        </div>
      </div>
    </div>
  );
};

export default BlockView;

console.log('content-ui: 🎭 BlockView component loaded');
