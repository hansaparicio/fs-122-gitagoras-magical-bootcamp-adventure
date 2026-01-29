const QuestionCard = ({ questionNumber, total, questionText }) => {
  return (
    <div className="w-full text-center space-y-3">
      <p className="font-display text-xs md:text-sm tracking-[0.08em] text-purple-200">Pregunta {questionNumber} de {total}</p>
      <h2 className="text-lg md:text-xl font-display tracking-wide text-slate-50 drop-shadow-[0_0_12px_rgba(129,69,255,0.35)]">{questionText}</h2>
    </div>
  );
};

export default QuestionCard;
