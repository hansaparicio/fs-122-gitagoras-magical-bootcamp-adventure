import Avatar from "./Avatar";
import './UserPanel.css'
const UserPanel = ({ user, avatar, onClose, onEditAvatar, onLogout }) => {
    if (!user) return null;

    return (
        <div className="user-panel-overlay">
            <div className="user-panel">
                <button onClick={onClose}>✕</button>

                <div className="user-panel-avatar">
                    <Avatar {...avatar} />
                </div>

                <p>{user.username}</p>

                <button onClick={onEditAvatar}>Editar avatar</button>
                <button className="logout-btn" onClick={onLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
};

export default UserPanel;
