import React from 'react';
import calderoImg from '../assets/caldero_magico_pixel_art_asset.png';

const Cauldron = () => {
  return (
    <div className="cauldron-container">
      <div className="cauldron-glow"></div>
      <img src={calderoImg} alt="Caldero" className="cauldron-image pixelated" />
    </div>
  );
};

export default Cauldron;
