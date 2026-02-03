import { useState, useEffect, useRef } from "react";
import "./LoginScreen.css";
import LoginBackground from "../../assets/images/LoginScreenImage.png";
import Avatar from "../../components/Avatar";
import AvatarCreator from "../../components/AvatarCreator";
import muneco from "../../assets/images/Avatar/Avatar/Muneco.png";
import fondo1 from "../../assets/images/Avatar/Fondos/Fondo-1.png";
import { useIdle } from "../../context/IdleContext";
import idleSound from "../../assets/sounds/mensaje-carol.mp3"
import ChatBot from "../../Components/ChatBot/ChatBot.jsx";
import { TimeProvider } from "../../context/TimeContext.jsx"




const LoginScreen = ({ onLogin, loggedIn, onStartGame, onLogout, onAbout }) => {

    const [mode, setMode] = useState(null);

    const [showUserPanel, setShowUserPanel] = useState(false);
    const [showAvatarCreator, setShowAvatarCreator] = useState(false);

    const IDLE_MENSAJES = ["¿Estas ahí o llevas capa de invisibilidad?", "¿Sigues ahí, pequeño mago?🪄", "El hechizo del ratón petrificado ha sido detectado🧙‍♂️", "Creo que la magia se quedó en pausa...", "¿Te has dormido o estás canalizando energía arcana?"]
    const [idleMensaje, setIdleMensaje] = useState(null);


    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);



    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
    });

    const { isIdle } = useIdle();
    const idleAudioRef = useRef(null);
    useEffect(() => {
        idleAudioRef.current = new Audio(idleSound);
        idleAudioRef.current.volume = 0.5;
    }, [])

    useEffect(() => {
        if (isIdle) {
            const random = IDLE_MENSAJES[Math.floor(Math.random() * IDLE_MENSAJES.length)];
            setIdleMensaje(random)
            idleAudioRef.current?.play();
        } else {
            setIdleMensaje(null)
            idleAudioRef.current?.pause();
            idleAudioRef.current.currentTime = 0;
        }

    }, [isIdle])

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
                onLogin?.(data.username);

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
            const res = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            const data = await res.json();


            localStorage.setItem("token", data.access_token);


            setUser(data.user);
            setAvatar({
                muneco,
                fondo: fondo1,
                ...data.user.avatar,
            });

            onLogin?.(data.user.username);
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
                    className="user-badge" onClick={() => setShowUserPanel(true)}>
                    {avatar ? <Avatar {...avatar} /> : <div className="user-avatar placeholder" />}
                    <span>{user?.username}</span>
                </div>

                {showUserPanel && (
                    <div className="user-panel-overlay">
                        <div className="user-panel">
                            <button className="boton-mu" onClick={() => setShowUserPanel(false)}>X</button>
                            {avatar ? <Avatar {...avatar} /> : <div className="user-avatar-placeholder" />}
                            <p>{user?.username}</p>
                            <button
                                disabled={!user}
                                onClick={() => {
                                    if (!user) return;
                                    setShowUserPanel(false);
                                    setShowAvatarCreator(true);
                                }}
                            >
                                Editar Avatar
<<<<<<< new-eva

                            </button>
                            <button
                                className="logout-btn"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setShowUserPanel(false);
                                    onLogout();
                                }}
                            >
                                Cerrar sesión
=======
>>>>>>> Main-Branch
                            </button>




                        </div>
                    </div>
                )}
                {showAvatarCreator && user && (
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
                </div>

                <TimeProvider>
                    <ChatBot insideShell={false} />
                </TimeProvider>

            </div>

        </div>

    );
};


export default LoginScreen;



