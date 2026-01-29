import React, { useState } from 'react';
import Avatar from './Avatar';

import muneco from "../assets/images/Avatar/Avatar/Muneco.png";

import ojos1 from "../assets/images/Avatar/Ojos/Ojos-1.png";
import ojos2 from "../assets/images/Avatar/Ojos/Ojos-2.png";
import ojos3 from "../assets/images/Avatar/Ojos/Ojos-3.png";
import ojos4 from "../assets/images/Avatar/Ojos/Ojos-4.png";
import ojos5 from "../assets/images/Avatar/Ojos/Ojos-5.png";
import ojos6 from "../assets/images/Avatar/Ojos/Ojos-6.png";
import ojos7 from "../assets/images/Avatar/Ojos/Ojos-7.png";



import pelo1 from "../assets/images/Avatar/Pelo/Pelo-1.png";
import pelo2 from "../assets/images/Avatar/Pelo/Pelo-2.png";
import pelo3 from "../assets/images/Avatar/Pelo/Pelo-3.png";
import pelo4 from "../assets/images/Avatar/Pelo/Pelo-4.png";
import pelo5 from "../assets/images/Avatar/Pelo/Pelo-5.png";
import pelo6 from "../assets/images/Avatar/Pelo/Pelo-6.png";
import pelo7 from "../assets/images/Avatar/Pelo/Pelo-7.png";
import pelo8 from "../assets/images/Avatar/Pelo/Pelo-8.png";

import ropa1 from "../assets/images/Avatar/Ropa/ropa-1.png";
import ropa2 from "../assets/images/Avatar/Ropa/ropa-2.png";
import ropa3 from "../assets/images/Avatar/Ropa/ropa-3.png";
import ropa4 from "../assets/images/Avatar/Ropa/ropa-4.png";
import ropa5 from "../assets/images/Avatar/Ropa/ropa-5.png";
import ropa6 from "../assets/images/Avatar/Ropa/ropa-6.png";
import ropa7 from "../assets/images/Avatar/Ropa/ropa-7.png";
import ropa8 from "../assets/images/Avatar/Ropa/ropa-8.png";

import accesorio1 from "../assets/images/Avatar/Accesorios/Accesorio-1.png";
import accesorio2 from "../assets/images/Avatar/Accesorios/Accesorio-2.png";
import accesorio3 from "../assets/images/Avatar/Accesorios/Accesorio-3.png";
import accesorio4 from "../assets/images/Avatar/Accesorios/Accesorio-4.png";
import accesorio5 from "../assets/images/Avatar/Accesorios/Accesorio-5.png";
import accesorio6 from "../assets/images/Avatar/Accesorios/Accesorio-6.png";
import accesorio7 from "../assets/images/Avatar/Accesorios/Accesorio-7.png";
import accesorio8 from "../assets/images/Avatar/Accesorios/Accesorio-8.png";

import gorro1 from "../assets/images/Avatar/Gorros/Gorro-1.png";
import gorro2 from "../assets/images/Avatar/Gorros/Gorro-2.png";
import gorro3 from "../assets/images/Avatar/Gorros/Gorro-3.png";
import gorro4 from "../assets/images/Avatar/Gorros/Gorro-4.png";

import fondo1 from "../assets/images/Avatar/Fondos/Fondo-1.png";
import fondo2 from "../assets/images/Avatar/Fondos/Fondo-2.png";
import fondo3 from "../assets/images/Avatar/Fondos/Fondo-3.png";
import fondo4 from "../assets/images/Avatar/Fondos/Fondo-4.png";




const ojosOptions = [ojos1, ojos2, ojos3, ojos4, ojos5, ojos6, ojos7];
const peloOptions = [pelo1, pelo2, pelo3, pelo4, pelo5, pelo6, pelo7, pelo8];
const ropaOptions = [ropa1, ropa2, ropa3, ropa4, ropa5, ropa6, ropa7, ropa8];
const accesorioOptions = [accesorio1, accesorio2, accesorio3, accesorio4, accesorio5, accesorio6, accesorio7, accesorio8];
const gorroOptions = [gorro1, gorro2, gorro3, gorro4];
const fondoOptions = [fondo1, fondo2, fondo3, fondo4];


const AvatarCreator = ({ onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('ojos')
    const [avatar, setAvatar] = useState({
        muneco: muneco,
        ojos: ojos1,
        pelo: pelo1,
        ropa: ropa1,
        accesorio: null,
        gorro: null,
        fondo: fondo1
    });


    {/*const saveAvatar = () => {
        localStorage.setItem("avatar", JSON.stringify(avatar));
        if (onSave) {
            onSave(avatar);
        }
        onClose();
    };
*/}
    // cuando esté el backend listo, descomentar este código y borrar el de arriba 
    const changeOjos = (ojos) => {
        setAvatar((prev) => ({ ...prev, ojos }));
    };
    const changePelo = (pelo) => {
        setAvatar((prev) => ({ ...prev, pelo }));
    };
    const changeRopa = (ropa) => {
        setAvatar((prev) => ({ ...prev, ropa }));
    };

    const changeAccesorio = (accesorio) => {
        setAvatar((prev) => ({ ...prev, accesorio }));
    }

    const changeGorro = (gorro) => {
        setAvatar((prev) => ({ ...prev, gorro }));
    }
    const changeFondo = (fondo) => {
        setAvatar((prev) => ({ ...prev, fondo }));
    }





    const saveAvatar = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://127.0.0.1:3001/api/avatar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(avatar)
            });
            if (!res.ok) throw new error("Error al guardar avatar");

            onSave(avatar);
            onClose();
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div className="avatar-editor-layout">
            <div className="avatar-preview">
                <Avatar {...avatar} />
            </div>


            <div className="avatar-options">
                <div className="tabs">
                    <button className={`tab ${activeTab === "ojos" ? "active" : ""}`} onClick={() => setActiveTab("ojos")}>Ojos</button>
                    <button className={`tab ${activeTab === "pelo" ? "active" : ""}`} onClick={() => setActiveTab("pelo")}>Pelo</button>
                    <button className={`tab ${activeTab === "ropa" ? "active" : ""}`} onClick={() => setActiveTab("ropa")} >Ropa</button>
                    <button className={`tab ${activeTab === "accesorio" ? "active" : ""}`} onClick={() => setActiveTab("accesorio")}>Accesorios</button>
                    <button className={`tab ${activeTab === "gorro" ? "active" : ""}`} onClick={() => setActiveTab("gorro")}>Gorro</button>
                    <button className={`tab ${activeTab === "fondo" ? "active" : ""}`} onClick={() => setActiveTab("fondo")}>Fondo</button>

                </div>


                <div className="options-content">

                    {activeTab === "ojos" && (
                        <section className="options-section">
                            <h2>Ojos</h2>
                            <div className="options-grid">
                                {ojosOptions.map((ojo, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.ojos === ojo ? "active" : ""}`}
                                        onClick={() => changeOjos(ojo)}
                                    >
                                        <img src={ojo} alt="" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === "pelo" && (
                        <section className="options-section">
                            <h2>Pelo</h2>
                            <div className="options-grid">
                                <button
                                    className={`option-button empty ${avatar.pelo === null ? "active" : ""
                                        }`}
                                    onClick={() => changePelo(null)}
                                >
                                    <span>🚫</span>
                                </button>
                                {peloOptions.map((pelo, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.pelo === pelo ? "active" : ""}`}
                                        onClick={() => changePelo(pelo)}
                                    >
                                        <img src={pelo} alt="" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === "ropa" && (
                        <section className="options-section">
                            <h2>Ropa</h2>
                            <div className="options-grid">
                                {ropaOptions.map((ropa, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.ropa === ropa ? "active" : ""}`}
                                        onClick={() => changeRopa(ropa)}
                                    >
                                        <img src={ropa} alt="" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === "accesorio" && (
                        <section className="options-section">
                            <h2>Accesorios</h2>
                            <div className="options-grid">
                                <button
                                    className={`option-button empty ${avatar.accesorio === null ? "active" : ""
                                        }`}
                                    onClick={() => changeAccesorio(null)}
                                >
                                    <span>🚫</span>
                                </button>
                                {accesorioOptions.map((acc, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.accesorio === acc ? "active" : ""}`}
                                        onClick={() => changeAccesorio(acc)}
                                    >
                                        <img src={acc} alt="" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === "gorro" && (
                        <section className="options-section">
                            <h2>Gorros</h2>
                            <div className="options-grid">
                                <button
                                    className={`option-button empty ${avatar.gorro === null ? "active" : ""
                                        }`}
                                    onClick={() => changeGorro(null)}
                                >
                                    <span>🚫</span>
                                </button>
                                {gorroOptions.map((gorro, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.gorro === gorro ? "active" : ""}`}
                                        onClick={() => changeGorro(gorro)}
                                    >

                                        <img src={gorro} alt="" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}
                    {activeTab === "fondo" && (
                        <section className="options-section">
                            <h2>Fondos</h2>
                            <div className="options-grid">
                                {fondoOptions.map((fondo, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.fondo === fondo ? "active" : ""}`}
                                        onClick={() => changeFondo(fondo)}
                                    >
                                        <img src={fondo} alt="" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                </div>


                {/* Guardar*/}
                <button className="guardar" onClick={saveAvatar}>
                    Guardar Avatar
                </button>

            </div>
        </div>
    )
}


export default AvatarCreator;
