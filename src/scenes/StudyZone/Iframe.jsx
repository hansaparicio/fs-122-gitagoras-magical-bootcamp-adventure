import { useState } from "react";
import "./Iframe.css";
import IframeBackground from "../../assets/images/StudyRoomBackground.png";

function validateHTML(html) {
    const tagRegex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    const stack = [];
    const errors = [];
    let match;

    while ((match = tagRegex.exec(html))) {
        const fullTag = match[0];
        const tagName = match[1];
        const isClosing = fullTag.startsWith("</");

        if (!isClosing) {
            stack.push(tagName);
        } else {
            const last = stack.pop();
            if (last !== tagName) {
                errors.push(
                    `La etiqueta </${tagName}> no coincide con <${last || "ninguna"}>`
                );
            }
        }
    }

    if (stack.length) {
        stack.forEach(tag =>
            errors.push(`La etiqueta <${tag}> no está cerrada`)
        );
    }

    return errors;
}

function validateCSS(css) {
    const errors = [];

    const openBraces = (css.match(/{/g) || []).length;
    const closeBraces = (css.match(/}/g) || []).length;

    if (openBraces !== closeBraces) {
        errors.push("Las llaves { } no están bien cerradas");
    }

    const lines = css.split("\n");

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.endsWith("{") || trimmed.endsWith("}")) return;

        if (trimmed.includes(":") && !trimmed.endsWith(";")) {
            errors.push(`Falta ; al final de una propiedad `);
        }

        if (!trimmed.includes(":") && trimmed.endsWith(";")) {
            errors.push(`Propiedad sin ':' detectada `);
        }
    });

    return errors;
}

export default function Iframe({ onExit }) {
    const [html, setHtml] = useState(
        `<h1>Gitágoras dice:</h1>
<p>Bienvenido joven aprendiz. Esta es una zona de estudio con caos controlado. Siéntete libre de experimentar 
con cualquier magia que hayas desbloqueado. La pizarra mágica actualmente está encantada con HTML y CSS. ¡Te deseo un estudio enriquecedor!</p>`
    );

    const [css, setCss] = useState(
        `body {
  font-size: 18px;
}

h1 {
  color: #2d7cff;
}

p {
  color: #2fa84f;
}`
    );

    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const shouldRender = errors.length === 0;

    const srcDoc = `
<html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 16px;
        background: #1a1026;
        color: white;
        font-family: sans-serif;
      }
      ${css}
    </style>
  </head>
  <body>
    ${shouldRender ? html : ""}
  </body>
</html>
`;

    const handleOpenValidator = () => {
        const htmlErrors = validateHTML(html);
        const cssErrors = validateCSS(css);
        setErrors([...htmlErrors, ...cssErrors]);
        setShowModal(true);
    };

    return (
        <div
            className="iframe-room"
            style={{ backgroundImage: `url(${IframeBackground})` }}
        >
            <div className="iframe-layout">
                <div className="editor-panel vertical">
                    <div className="editor-block">
                        <h3>HTML</h3>
                        <textarea
                            value={html}
                            onChange={e => {
                                setHtml(e.target.value);
                                setErrors([]);
                            }}
                        />
                    </div>

                    <div className="editor-block">
                        <h3>CSS</h3>
                        <textarea
                            value={css}
                            onChange={e => {
                                setCss(e.target.value);
                                setErrors([]);
                            }}
                        />
                    </div>
                </div>

                <div className="preview-panel">
                    <iframe
                        title="preview"
                        srcDoc={srcDoc}
                        sandbox="allow-same-origin"
                    />
                </div>
            </div>

            <div className="iframe-actions">
                <button className="iframe-btn" onClick={onExit}>
                    VOLVER AL MAPA
                </button>

                <button
                    className="iframe-btn iframe-btn-danger"
                    onClick={handleOpenValidator}
                >
                    CORREGIR CÓDIGO
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3> A ver, revisemos ese hechizo...</h3>

                        {errors.length > 0 ? (
                            errors.map((err, i) => (
                                <p key={i}>!Cuidado! {err}</p>
                            ))
                        ) : (
                            <p className="no-errors">
                                El hechizo parece estable
                            </p>
                        )}

                        <button
                            className="iframe-btn"
                            onClick={() => setShowModal(false)}
                        >
                            CERRAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
