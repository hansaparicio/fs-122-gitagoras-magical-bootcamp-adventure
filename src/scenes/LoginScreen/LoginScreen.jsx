import { useState } from "react";
import "./LoginScreen.css";
import LoginBackground from "../../assets/images/LoginScreenImage.png";
import Player from "../../components/mp3Player/mp3Player";
import ChatBot from "../../components/ChatBot/ChatBot";

const LoginScreen = ({ loggedIn, onLogin, onStartGame, onLogout }) => {
    const [mode, setMode] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg);

            localStorage.setItem("token", data.access_token);
            localStorage.removeItem("scrollSigned");

            setMode(null);
            onLogin();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg);

            localStorage.setItem("token", data.access_token);

            setMode(null);
            onLogin();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div
            className="login-screen"
            style={{ backgroundImage: `url(${LoginBackground})` }}
        >
            <div className="overlay">
                <h1 className="title">Magic Coding Adventure</h1>

                {!loggedIn && (
                    <>
                        <div className="main-buttons">
                            <button onClick={() => setMode("register")}>Crear usuario</button>
                            <button onClick={() => setMode("login")}>Iniciar sesión</button>
                        </div>

                        {mode === "register" && (
                            <form className="panel" onSubmit={handleRegister}>
                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setMode(null)}
                                >
                                    ✕
                                </button>
                                <h2>Crear usuario</h2>
                                <input
                                    name="username"
                                    placeholder="Nombre de usuario"
                                    onChange={handleChange}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                />
                                <input
                                    name="repeatPassword"
                                    type="password"
                                    placeholder="Repetir contraseña"
                                    onChange={handleChange}
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    onChange={handleChange}
                                />
                                <button type="submit">Registrar</button>
                            </form>
                        )}

                        {mode === "login" && (
                            <form className="panel" onSubmit={handleLogin}>
                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setMode(null)}
                                >
                                    ✕
                                </button>
                                <h2>Iniciar sesión</h2>
                                <input
                                    name="username"
                                    placeholder="Nombre de usuario"
                                    onChange={handleChange}
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                />
                                <button type="submit">Iniciar sesión</button>
                            </form>
                        )}
                    </>
                )}

                {loggedIn && (
                    <div
                        className="panel"
                        style={{ marginTop: "50px", width: "500px", textAlign: "center" }}
                    >
                        <h2>Bienvenido a la aventura</h2>
                        <p>Pulsa "Entrar al mundo" si quieres iniciar el juego.</p>
                        <button
                            onClick={onStartGame}
                            style={{ background: "#5458a3" }}
                        >
                            Entrar al mundo
                        </button>
                        <button
                            onClick={onLogout}
                            style={{ marginTop: "20px", background: "#ff5c5c" }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}

                <div className="footer-buttons-container">
                    <button>About us</button>
                    <div className="player-container">
                        <div className="player-hover">
                            <button className="music-button"> AUDIO </button>
                            <div className="player">
                                <Player />
                            </div>
                        </div>
                    </div>
                    <ChatBot />
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
