import Avatar from "./Avatar.jsx";

const UserBadge = ({ user, avatar, onClick }) => {
    if (!user) return null;

    return (
        <div className="user-badge" onClick={onClick}>
            {avatar ? <Avatar {...avatar} /> : <div className="user-avatar placeholder" />}
            <span>{user.username}</span>
        </div>
    );
};

export default UserBadge;

