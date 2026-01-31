import React from 'react';

const StarField = ({ stars }) => {
    return (
        <div className="star-field">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        animationDelay: `${star.delay}s`,
                        width: `${star.size}px`,
                        height: `${star.size}px`
                    }}
                />
            ))}
        </div>
    );
};

export default StarField;
