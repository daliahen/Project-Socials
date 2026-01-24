function UserCard({user}){
    if (!user){
        return null;
    }

    return(
        <div className="user-card" style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
            <div style={{ fontWeight: "bold" }}>{user.username}</div>

            {user.imageUrl && (
                <img
                    src={user.imageUrl}
                    alt="profile"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginTop: "4px",
                    }}
                />
            )}
        </div>
    );
}export default UserCard;