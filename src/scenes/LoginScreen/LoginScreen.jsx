import { useState, useEffect } from "react";
import "./LoginScreen.css";
import LoginBackground from "../../assets/images/LoginScreenImage.png";
import Avatar from "../../Components/Avatar";
import AvatarCreator from "../../Components/AvatarCreator";
import Player from "../../components/mp3Player/mp3Player";
import ChatBot from "../../components/ChatBot/ChatBot";
import muneco from "../../assets/images/Avatar/Avatar/Muneco.png";
import fondo1 from "../../assets/images/Avatar/Fondos/Fondo-1.png";
import { useIdle } from "../../context/IdleContext";

const LoginScreen = ({ onLogin, loggedIn, onStartGame, onLogout, onAbout }) => {

    const [mode, setMode] = useState(null);
    const [showUserPanel, setShowUserPanel] = useState(false);
    const [showAvatarCreator, setShowAvatarCreator] = useState(false);


    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);


    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
    });
    const { isIdle } = useIdle();
    useEffect(() => {
        if (isIdle) {
            alert("usuario idle");
        }
    }, [isIdle]);


    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch("http://127.0.0.1:5000/api/me", {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) return;

                const data = await res.json();
                setAvatar({
                    muneco,
                    fondo: fondo1,
                    ...data.avatar
                });
                setUser(data);
                onLogin?.(me.username);

            } catch (err) {
                console.error("error cargando usuario", err);
            }
        }

        fetchMe();
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            setUser(null);
            setAvatar(null);
            setShowUserPanel(false)
            setShowAvatarCreator(false);
            setMode(null)
        }
    }, [loggedIn])


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
            const res = await fetch("http://127.0.0.1:5000/api/register", {
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


            const meRes = await fetch("http://127.0.0.1:5000/api/me", {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                }
            });
            const me = await meRes.json();
            setUser(me);
            setAvatar(me.avatar);
            onLogin?.(me.username);
            setMode(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg);

            localStorage.setItem("token", data.access_token);
            // onLogin(formData.username);

            const meRes = await fetch("http://127.0.0.1:5000/api/me", {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            })
            const me = await meRes.json();
            setAvatar(me.avatar)
            setUser(me);
            onLogin?.(me.username);
            setMode(null);

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="login-screen" style={{ backgroundImage: `url(${LoginBackground})` }}>
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
                                <button type="button" className="close-btn" onClick={() => setMode(null)}>✕</button>
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
                <div
                    className="user-badge" onClick={() => user && setShowUserPanel(true)}>
                    {avatar ? <Avatar {...avatar} /> : <div className="user-avatar placeholder" />}
                    <span>{user?.username}</span>
                </div>

                {showUserPanel && (
                    <div className="user-panel-overlay">
                        <div className="user-panel">
                            <button className="boton-mu" onClick={() => setShowUserPanel(false)}>X</button>
                            {avatar ? <Avatar {...avatar} /> : <div className="user-avatar-placeholder" />}
                            <p>{user.username}</p>
                            <button onClick={() => {
                                setShowUserPanel(false);
                                setShowAvatarCreator(true);
                            }}
                            >Editar Avatar</button>
                        </div>
                    </div>
                )}
                {showAvatarCreator && (
                    <div className="avatar-editor-overlay">
                        <div className="avatar-creator-modal">
                            <AvatarCreator
                                initialAvatar={avatar}
                                onSave={async (newAvatar) => {
                                    setAvatar({
                                        muneco,
                                        fondo: fondo1,
                                        ...newAvatar,
                                    });


                                    setShowAvatarCreator(false);
                                }}
                                onClose={() => setShowAvatarCreator(false)}
                            />
                        </div>
                    </div>
                )}

                <div className="footer-buttons-container">
                    <button onClick={onAbout}>About us</button>

                    <div className="player-container">
                        <div className="player-hover">
                            <button className="music-button"> 🎵 </button>
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



