import { useEffect, useRef, useState } from "react";
import "./ChaosOffice.css";

import ChaosOfficeBackground from "../../assets/images/ChaosOffice.png";
import MagicianAvatar from "../../assets/images/GitagorasAvatar.png";

const DIALOG_TEXT =
    "Ugh… no deberías estar aquí ahora mismo. " +
    "Mi oficina es un desastre arcano total. " +
    "Libros discutiendo entre sí, hechizos sin archivar… " +
    "y yo claramente indispuesto por una poción experimental. " +
    "Será mejor que regreses más tarde, antes de que algo explote.";

export default function ChaosOffice({ onExit }) {
    const [typedText, setTypedText] = useState("");
    const typingRef = useRef(null);

    useEffect(() => {
        let i = 0;
        setTypedText("");

        typingRef.current = setInterval(() => {
            i++;
            setTypedText(DIALOG_TEXT.slice(0, i));
            if (i >= DIALOG_TEXT.length) {
                clearInterval(typingRef.current);
                typingRef.current = null;
            }
        }, 25);

        return () => {
            if (typingRef.current) {
                clearInterval(typingRef.current);
                typingRef.current = null;
            }
        };
    }, []);

    return (
        <div
            className="chaos-office-root"
            style={{ backgroundImage: `url(${ChaosOfficeBackground})` }}
        >
            <div className="chaos-office-stage">
                <div className="library-dialog-wrapper">
                    <img
                        src={MagicianAvatar}
                        className="library-dialog-avatar"
                        alt="Mago indispuesto"
                    />

                    <div className="library-dialog-box">
                        <p>{typedText}</p>

                        <div className="library-dialog-actions">
                            {typedText.length === DIALOG_TEXT.length && (
                                <button
                                    className="library-dialog-btn"
                                    onClick={onExit}
                                >
                                    Salir de la oficina
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
