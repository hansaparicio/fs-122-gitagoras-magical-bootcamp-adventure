import cristal from '../../assets/QuizzGame/bola de cristal.png';

const GameHeader = ({ title = 'Laboratorio de Definiciones' }) => {
  return (
    <div className="flex items-center justify-between">
      <img src={cristal} alt="Cristal" className="w-[7rem] h-[7rem] object-contain drop-shadow-[0_0_18px_rgba(167,139,250,0.8)] pixelated" />
      <h1 className="font-display text-xl md:text-2xl text-amber-200 tracking-[0.08em] drop-shadow-[0_0_12px_rgba(234,179,8,0.35)] text-center">{title}</h1>
      <img src={cristal} alt="Cristal" className="w-[7rem] h-[7rem] object-contain drop-shadow-[0_0_18px_rgba(167,139,250,0.8)] pixelated" />
    </div>
  );
};

export default GameHeader;
