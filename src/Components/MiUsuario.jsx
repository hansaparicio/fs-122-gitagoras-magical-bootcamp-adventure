import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import avatarCreator from '../AvatarCreator';

const MiUsuario = () => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await fetch("http://127.0.0.1:3001/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setAvatar(data.avatar);
            }
        };
        fetchMe();
    },
        []);


    return (
        <div className="mi-usuario">
            <h1>Mi Usuario</h1>
            {avatar ? (
                <div className="user-panel-avatar">
                    <Avatar {...avatar} />
                </div>
            ) : (
                <p>No hay avatar guardado</p>
            )}

        </div>
    );
}

export default MiUsuario;