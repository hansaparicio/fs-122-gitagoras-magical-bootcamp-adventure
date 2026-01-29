import { RotateCcw, X } from 'lucide-react';
import cristal from '../../assets/QuizzGame/bola de cristal.png';
import pocion from '../../assets/QuizzGame/pocion.png';
import pergamino from '../../assets/QuizzGame/pergamino.png';
import laboratorio from '../../assets/QuizzGame/laboratorio.png';
import StarField from './StarField';

const CompletionScreen = ({ score, total, wrongAnswers = 0, maxWrong = 3, stars, onReset, onExit }) => {
  const potionCount = score;
  const scrollCount = total;
  const gameOver = wrongAnswers >= maxWrong;
  const won = score >= total - maxWrong && !gameOver;

  return (
    <div className="min-h-screen text-slate-50 relative overflow-hidden font-body" style={{ backgroundImage: `url(${laboratorio})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-slate-950/80" />
      <StarField stars={stars} />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-3xl rounded-[28px] border-4 border-purple-400/70 bg-slate-950/80 backdrop-blur-sm shadow-[0_0_40px_rgba(129,69,255,0.4)] px-6 py-8 md:px-10 md:py-12 flex flex-col gap-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <img src={cristal} alt="Cristal" className="w-14 h-14 object-contain drop-shadow-[0_0_16px_rgba(167,139,250,0.7)]" />
            <h2 className="font-display text-2xl md:text-3xl text-amber-200 tracking-[0.08em] drop-shadow-[0_0_12px_rgba(234,179,8,0.35)]">
              {gameOver ? '¡Juego Terminado!' : 'Ritual completado'}
            </h2>
            <img src={cristal} alt="Cristal" className="w-14 h-14 object-contain drop-shadow-[0_0_16px_rgba(167,139,250,0.7)]" />
          </div>
          <p className="text-lg text-slate-200">Puntuación</p>
          <p className="font-display text-4xl text-amber-200 tracking-wide">{score}/{total}</p>
          <p className="text-slate-200 text-base">
            {gameOver
              ? '¡Demasiados errores! La Archimaga te invita a intentarlo de nuevo.'
              : score === total
                ? 'Dominaste cada definición.'
                : score >= Math.ceil(total * 0.7)
                  ? 'Gran trabajo, sigue puliendo tu magia.'
                  : 'Practica más hechizos para perfeccionarte.'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-purple-300/50 bg-slate-900/70 px-4 py-3 flex items-center gap-3">
              <img src={pocion} alt="Poción" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-sm text-slate-300">Pociones</p>
                <p className="font-display text-xl text-amber-200">{potionCount}</p>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-purple-300/50 bg-slate-900/70 px-4 py-3 flex items-center gap-3">
              <img src={pergamino} alt="Pergamino" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-sm text-slate-300">Pergaminos</p>
                <p className="font-display text-xl text-amber-200">{scrollCount}/{total}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onReset}
            className="mx-auto inline-flex items-center gap-2 rounded-xl border-2 border-purple-300/60 bg-gradient-to-b from-purple-500/80 to-indigo-600/80 px-5 py-3 font-display text-sm uppercase tracking-wide text-slate-50 shadow-[0_0_18px_rgba(129,69,255,0.45)] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="mx-auto inline-flex items-center gap-2 rounded-xl border-2 border-slate-300/60 bg-gradient-to-b from-slate-500/80 to-slate-600/80 px-5 py-3 font-display text-sm uppercase tracking-wide text-slate-50 shadow-[0_0_18px_rgba(100,100,100,0.45)] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              <X className="w-4 h-4" />
              Salir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
