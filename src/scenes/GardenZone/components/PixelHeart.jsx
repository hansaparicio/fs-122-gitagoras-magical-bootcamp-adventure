import React from 'react';
import './PixelHeart.css';

const PixelHeart = ({ isActive }) => {
    return (
        <div className={`pixel-heart ${isActive ? 'active' : 'lost'}`}>
            <div className="heart-pixel-art">
                <div className="heart-row heart-row-1">
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                    <span className="pixel empty"></span>
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                </div>
                <div className="heart-row heart-row-2">
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                </div>
                <div className="heart-row heart-row-3">
                    <span className="pixel empty"></span>
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                    <span className="pixel"></span>
                    <span className="pixel empty"></span>
                </div>
                <div className="heart-row heart-row-4">
                    <span className="pixel empty"></span>
                    <span className="pixel empty"></span>
                    <span className="pixel"></span>
                    <span className="pixel empty"></span>
                    <span className="pixel empty"></span>
                </div>
                <div className="heart-row heart-row-5">
                    <span className="pixel empty"></span>
                    <span className="pixel empty"></span>
                    <span className="pixel empty"></span>
                    <span className="pixel empty"></span>
                    <span className="pixel empty"></span>
                </div>
            </div>
        </div>
    );
};

export default PixelHeart;
