import { useState, useEffect } from "react";
import "./LoginScreen.css";
import LoginBackground from "../../assets/images/LoginScreenImage.png";
import Avatar from "../../components/Avatar";
import AvatarCreator from "../../components/AvatarCreator";
import Player from "../../components/mp3Player/mp3Player";




const LoginScreen = ({ onLogin, loggedIn, onStartGame, onLogout, onAbout, onQuizz }) => {
    const [mode, setMode] = useState(null);
    const [muted, setMuted] = useState(false);
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
            const res = await fetch("http://127.0.0.1:3001/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Error al registrar");
            localStorage.setItem("token", data.access_token);
            onLogin(formData.username);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Error al loguear");
            localStorage.setItem("token", data.access_token);
            onLogin(formData.username);
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
                            <button onClick={onQuizz} style={{ background: "#9333ea" }}>Jugar Quiz (Demo)</button>
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
                                    type="text"
                                    name="username"
                                    placeholder="Nombre de usuario"
                                    maxLength={15}
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="repeatPassword"
                                    placeholder="Repetir contraseña"
                                    value={formData.repeatPassword}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
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
                                    type="text"
                                    name="username"
                                    placeholder="Nombre de usuario"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button type="submit">Entrar al juego</button>
                            </form>
                        )}
                    </>
                )}

                {loggedIn && (
                    <div
                        className="panel"
                        style={{
                            marginTop: "50px",
                            width: "500px",
                            textAlign: "center",
                        }}
                    >
                        <h2>Bienvenido a la aventura</h2>
                        <p>Pulsa "Entrar al mundo" si quieres iniciar el juego.</p>
                        <button
                            type="button"
                            onClick={onStartGame}
                            style={{ background: "#5458a3" }}
                        >
                            Entrar al mundo
                        </button>
                        <button
                            type="button"
                            onClick={onQuizz}
                            style={{
                                marginTop: "20px",
                                background: "#9333ea",
                            }}
                        >
                            Jugar Quiz
                        </button>
                        <button
                            type="button"
                            onClick={onLogout}
                            style={{
                                marginTop: "20px",
                                background: "#ff5c5c",
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
                {/* y de aqui */}
                {/* <div
                    className="user-badge"
                    onClick={() => {
                        if (!user) return;
                        setShowUserPanel(true);
                    }}
                >
                    {savedAvatar ? (
                        <div className="user-avatar">
                            <Avatar {...savedAvatar} />
                        </div>
                    ) : (
                        <div className="user-avatar placeholder" />
                    )}

                    <span className="username">
                        {user ? user.username : ""}
                    </span>

                </div>
                {showUserPanel && user && (
                    <div className="user-panel-overlay">
                        <div className="user-panel">
                            <button
                                className="close-user-panel"
                                onClick={() => setShowUserPanel(false)}
                            >
                                ✕
                            </button>

                            <h2>Mi usuario</h2>

                            <div className="user-panel-avatar">
                                {savedAvatar ? (
                                    <Avatar {...savedAvatar} />
                                ) : (
                                    <div className="user-avatar placeholder" />
                                )}
                            </div>

                            <p className="user-panel-name">{user?.username}</p>

                            <button
                                className="edit-avatar-btn"
                                onClick={() => setShowAvatarCreator(true)}
                            >
                                Editar avatar
                            </button>

                            {showAvatarCreator && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <button onClick={() => setShowAvatarCreator(false)}>x</button>
                                        <AvatarCreator
                                            onClose={() => setShowAvatarCreator(false)}
                                            onSave={(avatar) => {
                                                setSavedAvatar(avatar);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                 aqui */}

                <div className="footer-buttons-container">
                    <button onClick={onAbout}>About us</button>

                    <div className="player-container">
                        <div className="player-hover">
                            <button className="music-button"> AUDIO </button>
                            <div className="player">
                                <div className="player-inner">
                                    <Player />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default LoginScreen;
