import UserCard from "./UserCard.jsx";
import Buttons from "../Buttons.jsx";

function UserRow({user , myUserId , isFollowing , onFollow , onUnfollow}){

    const isMe = user.userId === myUserId;

    function handleClick(){
        if (isMe){
            return
        }
        if (isFollowing){
            onUnfollow(user.userId)
        }else{
            onFollow(user.userId)
        }
    }

    let buttonText = "Follow";
    if (isMe){
        buttonText = "You";
    }else if (isFollowing){
        buttonText = "Unfollow";
    }

    return(
        <div
            className="user-row"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
            }}
        >
            <div style={{ flex: 1 }}>
                <UserCard user={user} />
            </div>

            <Buttons
                text={buttonText}
                type={"button"}
                disabled={isMe}
                onClick={handleClick}
            />
        </div>
    );
}export default UserRow;