import React from 'react';
import StarField from './StarField';
import cristalImg from '../assets/bola de cristal.png';
import laboratorioImg from '../assets/laboratorio.png';

const LoadingScreen = ({ stars }) => {
    return (
        <div className="loading-screen" style={{ backgroundImage: `url(${laboratorioImg})` }}>
            <div className="loading-overlay"></div>
            <StarField stars={stars} />

            <div className="loading-content">
                <img src={cristalImg} alt="Cristal" className="loading-crystal pixelated" />
                <h2 className="loading-title">Preparando preguntas mágicas...</h2>
                <div className="loading-spinner">
                    <div className="spinner-dot"></div>
                    <div className="spinner-dot"></div>
                    <div className="spinner-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
