import { useState } from "react";
import "./OptionMenu.css";

export default function OptionMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="option-root">
                <button
                    className="option-button"
                    aria-label="Options"
                    onClick={() => setOpen(true)}
                >
                    ⚙️
                </button>
            </div>

            {open && (
                <div className="option-modal-root">
                    <div className="option-dialog-wrapper">
                        <div className="option-dialog-box">
                            <h2 className="option-dialog-title">
                                ⋆˙⟡  &nbsp;  MENÚ DE OPCIONES   &nbsp;  ˚꩜｡⋆
                            </h2>
                            <br />
                            <p className="option-dialog-text">
                                Bienvenido, joven aprendiz. Si tienes dudas de como explorar el
                                mundo, aquí te dejo indicaciones como jugar:
                            </p>
                            <br />
                            <ul className="option-dialog-list">
                                <li>
                                    Pulsa el botón <b>"Ignorar"</b> en cualquier zona para ir
                                    directo al minijuego de la misma.
                                </li>
                                <li>
                                    Al completar minijuegos, obtendrás grimorios que se guardarán
                                    en tu inventario. Mantén el cursor sobre un grimorio para ver
                                    información sobre su contenido, haz click para desplegarlo.
                                </li>
                                <li>
                                    Pulsa sobre la asistenta mágica si tienes dudas o conversa con
                                    ella sobre lo que quieras. ¡Es una gran maga con sabiduría casi
                                    infinita!
                                </li>
                                <li>
                                    Utiliza las teclas <b>WASD</b> para moverte por el mapa. Pulsa{" "}
                                    <b>"E"</b> para interactuar con una zona.
                                </li>
                                <li>
                                    Si tienes dudas de como explorar una zona ¡tranquilo! cada
                                    mapa tiene un índice con recomendaciones del orden en el que
                                    explorarlas.
                                </li>
                            </ul>

                            <div className="option-dialog-actions">
                                <button
                                    className="option-dialog-btn"
                                    onClick={() => setOpen(false)}
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
