import laboratorio from '../../assets/QuizzGame/laboratorio.png';
import StarField from './StarField';

const GameContainer = ({ stars, children }) => {
  return (
    <div className="min-h-screen text-slate-50 relative overflow-hidden font-body" style={{ backgroundImage: `url(${laboratorio})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1e293b' }}>
      <div className="absolute inset-0 bg-slate-800/60" />
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)', opacity: 0.05 }} />
      <StarField stars={stars} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-3 md:py-4 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export default GameContainer;
