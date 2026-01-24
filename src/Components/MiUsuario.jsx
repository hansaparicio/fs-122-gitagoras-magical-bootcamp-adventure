import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import avatarCreator from '../AvatarCreator';

const MiUsuario = () => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const savedAvatar = localStorage.getItem("avatar");
        if (savedAvatar) {
            setAvatar(JSON.parse(savedAvatar));

        }
    }, []);
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