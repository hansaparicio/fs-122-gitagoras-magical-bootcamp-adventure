import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';


const MiUsuario = () => {
    const [avatar, setAvatar] = useState(null);

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
                setAvatar(data.avatar);
            } catch (err) {
                console.error("Error cargando mi usuario", err);
            }

        };

        fetchMe();
    }, []);


    return (
        <div className="mi-usuario">
            <h1>Mi Usuario</h1>
            {avatar ? (
                <div className="user-panel-avatar">
                    <div className="avatar-mask">
                        <Avatar {...avatar} />
                    </div>
                </div>
            ) : (
                <p>No hay avatar guardado</p>
            )}

        </div>
    );
}

export default MiUsuario;