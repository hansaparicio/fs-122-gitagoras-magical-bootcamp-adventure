const StarField = ({ stars }) => {
  return (
    <div className="absolute inset-0 opacity-65">
      {stars.map(star => (
        <span
          key={star.id}
          className="absolute rounded-full bg-amber-100 animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
