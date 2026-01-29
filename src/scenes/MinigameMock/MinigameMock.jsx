export default function MinigameMock({ zoneId, onExit }) {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                background: "#111",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "monospace"
            }}
        >
            <h1>MINIJUEGO MOCK</h1>
            <p>Zona: {zoneId}</p>

            <button
                onClick={onExit}
                style={{
                    marginTop: 20,
                    padding: "10px 20px",
                    fontSize: "14px",
                    border: "2px solid #fff",
                    background: "transparent",
                    color: "#fff",
                    cursor: "pointer"
                }}
            >
                VOLVER AL MAPA
            </button>
        </div>
    );
}