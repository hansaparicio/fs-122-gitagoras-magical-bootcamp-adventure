const FeedbackMessage = ({ isCorrect, correctAnswer }) => {
  return (
    <div className={`w-full max-w-3xl text-center font-display text-xs md:text-sm uppercase tracking-[0.08em] rounded-2xl border-2 px-4 py-3 ${
      isCorrect ? 'border-emerald-300 bg-emerald-500/20 text-emerald-50' : 'border-rose-300 bg-rose-600/30 text-rose-50'
    }`}>
      {isCorrect ? 'Hechizo correcto' : `Respuesta: ${correctAnswer}`}
    </div>
  );
};

export default FeedbackMessage;
