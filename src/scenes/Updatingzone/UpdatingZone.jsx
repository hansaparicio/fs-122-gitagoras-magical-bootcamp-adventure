import { useEffect, useRef, useState } from "react";
import "./UpdatingZone.css";

import UpdatingBackground from "../../assets/images/UpdatingZone.png";
import GitagorasAvatar from "../../assets/images/GitagorasAvatar.png";

const DIALOG_TEXT =
    "Cuidado, joven aprendiz… Esta zona aún está en construcción. " +
    "Los hechizos necesarios para mantenerla estable no han sido completados. " +
    "Vuelve más adelante, cuando la magia esté lista.";

export default function UpdatingZone({ onExit }) {
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
            className="updating-root"
            style={{ backgroundImage: `url(${UpdatingBackground})` }}
        >
            <div className="updating-stage">
                <div className="library-dialog-wrapper">
                    <img
                        src={GitagorasAvatar}
                        className="library-dialog-avatar"
                        alt="Gitágoras"
                    />

                    <div className="library-dialog-box">
                        <p>{typedText}</p>

                        <div className="library-dialog-actions">
                            {typedText.length === DIALOG_TEXT.length && (
                                <button
                                    className="library-dialog-btn"
                                    onClick={onExit}
                                >
                                    Volver al mapa
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
