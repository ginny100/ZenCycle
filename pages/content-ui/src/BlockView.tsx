import lotusIcon from './public/lotus-icon.png';
import blockViewImage from './public/block-view.png';

const BlockView = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-3 bg-white px-4 py-3 shadow-md">
        <img src={lotusIcon} alt="ZenCycle Logo" className="size-10" />
        <span className="text-lg font-medium text-gray-900">This site is blocked by ZenCycle</span>
      </div>

      {/* Background */}
      <div
        className="absolute inset-0 z-10 bg-black"
        style={{
          backgroundImage: `url(${blockViewImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Text Box */}
      <div className="relative z-20 px-72 py-48 text-center">
        <div
          className="absolute inset-0 rounded-[30px] bg-[#D9D9D9]/65"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 text-black">
          <h1 className="mb-4 font-['Abril+Fatface'] text-6xl font-bold tracking-wider">REGAIN YOUR FOCUS</h1>
          <hr className="mx-auto my-4 w-1/2 border-black/50" />
          <h1 className="font-['Abril+Fatface'] text-6xl font-bold tracking-wider">REGAIN YOUR LIFE</h1>
        </div>
      </div>
    </div>
  );
};

export default BlockView;

console.log('content-ui: 🎭 BlockView component loaded');
