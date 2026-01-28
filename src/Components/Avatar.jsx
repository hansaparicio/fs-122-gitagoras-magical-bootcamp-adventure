import React from "react";
import "./Avatar.css";

const Avatar = ({ fondo, muneco, ojos, pelo, ropa, accesorio, gorro }) => {
    return (
        <div className="avatar">
            {fondo && <img src={fondo} className="avatar-fondo" alt="" />}
            {muneco && <img src={muneco} alt="" />}
            {ojos && <img src={ojos} alt="" />}
            {pelo && <img src={pelo} alt="" />}
            {ropa && <img src={ropa} alt="" />}
            {accesorio && <img src={accesorio} alt="" />}
            {gorro && <img src={gorro} alt="" />}
        </div>
    );
};


export default Avatar;
