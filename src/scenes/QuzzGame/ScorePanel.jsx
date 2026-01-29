import pocion from '../../assets/QuizzGame/pocion.png';
import pergamino from '../../assets/QuizzGame/pergamino.png';

const ScorePanel = ({ potionCount, scrollCount, total, wrongAnswers = 0, maxWrong = 3 }) => {
  const lives = maxWrong - wrongAnswers;
  const hearts = ['❤️', '❤️', '❤️'];

  return (
    <div className="rounded-2xl border-2 border-purple-400/50 bg-slate-900/70 px-4 py-3 grid grid-cols-3 gap-3 text-center text-xs md:text-sm font-display text-slate-100">
      <div className="flex items-center justify-center gap-2">
        <img src={pocion} alt="Poción" className="w-[5rem] h-[5rem] object-contain pixelated drop-shadow-[0_0_16px_rgba(236,72,153,0.55)]" />
        <span>Pociones! {potionCount}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xs text-slate-300">Vidas</span>
        <div className="flex gap-1 text-xl">
          {hearts.map((heart, i) => (
            <span key={i} style={{ opacity: i < lives ? 1 : 0.2, filter: i < lives ? 'none' : 'grayscale(100%)' }}>
              {heart}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <img src={pergamino} alt="Pergamino" className="w-[7rem] h-[7rem] object-contain pixelated drop-shadow-[0_0_16px_rgba(234,179,8,0.42)]" />
        <span>Pergamino! {scrollCount} / {total}</span>
      </div>
    </div>
  );
};

export default ScorePanel;
