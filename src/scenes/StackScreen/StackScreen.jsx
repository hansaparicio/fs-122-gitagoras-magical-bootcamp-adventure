import "./StackScreen.css";
import StackBg from "../../assets/images/StackScreen/StackSelectionBackground.png";

import HtmlStack from "../../assets/images/StackScreen/HtmlStack.png";
import CssStack from "../../assets/images/StackScreen/CssStack.png";
import JsStack from "../../assets/images/StackScreen/JavascriptStack.png";
import HttpStack from "../../assets/images/StackScreen/HTTPStack.png";
import GitStack from "../../assets/images/StackScreen/GitStack.png";
import ReactStack from "../../assets/images/StackScreen/ReactStack.png";

const STACKS = [
    { id: "html", title: "La academia del código", image: HtmlStack, unlocked: true },
    { id: "css", title: "El bosque de las ilusiones", image: CssStack, unlocked: false },
    { id: "js", title: "Las ruinas del caos viviente", image: JsStack, unlocked: false },
    { id: "http", title: "La cueva del eco", image: HttpStack, unlocked: false },
    { id: "git", title: "El códice del tiempo", image: GitStack, unlocked: false },
    { id: "react", title: "El castillo cambiante", image: ReactStack, unlocked: false }
];

export default function StackScreen({ onBackToMenu, onStart }) {
    const handleStart = (stackId) => {
        if (stackId === "html") {
            onStart();
        }
    };

    return (
        <div
            className="stack-screen"
            style={{ backgroundImage: `url(${StackBg})` }}
        >
            <h1 className="stack-title">ESCOGE LA MAGIA QUE DESEES APRENDER</h1>

            <div className="stack-grid">
                {STACKS.map(stack => (
                    <div
                        key={stack.id}
                        className={`stack-card ${!stack.unlocked ? "locked" : ""}`}
                    >
                        <img src={stack.image} alt={stack.title} />
                        <h3>{stack.title}</h3>

                        {stack.unlocked ? (
                            <button onClick={() => handleStart(stack.id)}>
                                Comenzar
                            </button>
                        ) : (
                            <button className="locked-btn">🔒</button>
                        )}
                    </div>
                ))}
            </div>

            <footer className="stack-footer">
                * Puedes desbloquear magias más avanzadas a medida que completes las anteriores
            </footer>

            <button
                className="BackToMenuButton"
                onClick={onBackToMenu}
            >
                VOLVER <br />
                AL INICIO
            </button>
        </div>
    );
}