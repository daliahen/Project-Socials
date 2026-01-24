import UserCard from "./UserCard.jsx";

function UsersList({title , users = []}){

    return(
        <div className="users-list">
            <h3>{title}</h3>

            {users.length === 0 ? (
                <div style={{ opacity: 0.7 }}>no users to display..</div>
            ) : (
                users.map((user) => (
                    <UserCard key={user.userId} user={user} />
                ))
            )}
        </div>
    );
}export default UsersList;