import caldero from '../../assets/QuizzGame/caldero_magico_pixel_art_asset.png';

const Cauldron = () => {
  return (
    <div className="relative w-full max-w-[500px] h-[40vh] max-h-[500px] flex items-center justify-center">
      <div className="absolute inset-1 rounded-full bg-gradient-to-b from-purple-500/60 via-indigo-500/45 to-slate-900/75 blur-3xl" />
      <img src={caldero} alt="Caldero" className="relative w-full h-full max-w-[460px] max-h-[460px] object-contain drop-shadow-[0_0_42px_rgba(168,85,247,0.7)] pixelated" />
    </div>
  );
};

export default Cauldron;
