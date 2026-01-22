import React from "react";
import "./Avatar.css";

const Avatar = ({ fondo, muneco, ojos, pelo, ropa, accesorio, gorro }) => {
    return (
        <div className="avatar">
            {fondo && <img src={fondo} alt="fondo" className="avatar-layer avatar-fondo" />}
            {muneco && <img src={muneco} alt="muñeco base" />}
            {ojos && <img src={ojos} alt="ojos" />}
            {pelo && <img src={pelo} alt="pelo" />}
            {ropa && <img src={ropa} alt="ropa" />}
            {accesorio && <img src={accesorio} alt="accesorio" />}
            {gorro && <img src={gorro} alt="gorro" />}
        </div>
    );
};

export default Avatar;
