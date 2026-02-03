import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import './AvatarCreator.css'
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

const defaultAvatar = {
    muneco,
    ojos: ojos1,
    pelo: null,
    ropa: null,
    accesorio: null,
    gorro: null,
    fondo: fondo1,

};


const AvatarCreator = ({ initialAvatar, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('ojos')
    const [avatar, setAvatar] = useState(defaultAvatar);


    useEffect(() => {
        if (initialAvatar) {
            setAvatar({
                ...defaultAvatar,
                ...initialAvatar,
            });
        }
    }, [initialAvatar]);


    const updateAvatar = (key, value) => {
        setAvatar((prev) => ({
            ...prev, [key]: value,
        }));
    };










    const saveAvatar = async () => {

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://127.0.0.1:5000/api/avatar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(avatar),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }


            onSave(avatar);


            onClose();

        } catch (err) {
            console.error("Error guardando avatar:", err);
            alert("No se pudo guardar el avatar");
        }
    };



    return (
        <div className="avatar-editor-layout">
            <div className="avatar-preview">
                <div className="avatar-preview-viewport">
                    <Avatar {...avatar} />
                </div>
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
                    {{
                        ojos: (
                            <div className="options-grid">
                                {ojosOptions.map((ojo, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.ojos === ojo ? "active" : ""}`}
                                        onClick={() => updateAvatar("ojos", ojo)}
                                    >
                                        <img src={ojo} alt="" />
                                    </button>
                                ))}
                            </div>
                        ),

                        pelo: (
                            <div className="options-grid">
                                <button
                                    className={`option-button ${avatar.pelo === null ? "active" : ""}`}
                                    onClick={() => updateAvatar("pelo", null)}
                                >
                                    🚫
                                </button>
                                {peloOptions.map((pelo, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.pelo === pelo ? "active" : ""}`}
                                        onClick={() => updateAvatar("pelo", pelo)}
                                    >
                                        <img src={pelo} alt="" />
                                    </button>
                                ))}
                            </div>
                        ),

                        ropa: (
                            <div className="options-grid">
                                {ropaOptions.map((ropa, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.ropa === ropa ? "active" : ""}`}
                                        onClick={() => updateAvatar("ropa", ropa)}
                                    >
                                        <img src={ropa} alt="" />
                                    </button>
                                ))}
                            </div>
                        ),

                        accesorio: (
                            <div className="options-grid">
                                <button
                                    className={`option-button ${avatar.accesorio === null ? "active" : ""}`}
                                    onClick={() => updateAvatar("accesorio", null)}
                                >
                                    🚫
                                </button>
                                {accesorioOptions.map((acc, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.accesorio === acc ? "active" : ""}`}
                                        onClick={() => updateAvatar("accesorio", acc)}
                                    >
                                        <img src={acc} alt="" />
                                    </button>
                                ))}
                            </div>
                        ),

                        gorro: (
                            <div className="options-grid">
                                <button
                                    className={`option-button ${avatar.gorro === null ? "active" : ""}`}
                                    onClick={() => updateAvatar("gorro", null)}
                                >
                                    🚫
                                </button>
                                {gorroOptions.map((gorro, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.gorro === gorro ? "active" : ""}`}
                                        onClick={() => updateAvatar("gorro", gorro)}
                                    >
                                        <img src={gorro} alt="" />
                                    </button>
                                ))}
                            </div>
                        ),

                        fondo: (
                            <div className="options-grid">
                                {fondoOptions.map((fondo, index) => (
                                    <button
                                        key={index}
                                        className={`option-button ${avatar.fondo === fondo ? "active" : ""}`}
                                        onClick={() => updateAvatar("fondo", fondo)}
                                    >
                                        <img src={fondo} alt="" />
                                    </button>
                                ))}
                            </div>
                        ),
                    }[activeTab]}
                </div>



                {/* Guardar*/}
                <button className="guardar" onClick={saveAvatar}>
                    Guardar Avatar
                </button>

            </div>
        </div >
    )
}


export default AvatarCreator;
