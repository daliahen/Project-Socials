import {useEffect, useState} from "react";
import "../../Styles/Profile.css";
import Inputs from "../Inputs.jsx";
import {updateProfileImage} from "../../api/api.jsx";
import {useAuth} from "../../Contexts/AuthContext.jsx";
import Buttons from "../Buttons.jsx";

export const Profile = ({ initUsername = "User",
                            initImage = "",
                            initFollowing = [],
                            initFollowers = [] }) => {

    const [userImage, setUserImage] = useState(initImage);

    const [show, setShow] = useState(null);

    const [isUpdating, setIsUpdating] = useState(false);

    const { user, updateUser } = useAuth();

    const handleSaveImage = async () => {
        if (!user || !user.userId){
            return;
        }
        setIsUpdating(true);
        try {
            await updateProfileImage(user.userId, userImage);
            if (updateUser) {
                updateUser({ imageUrl: userImage });
            }alert("Profile image updated!");
        } catch (error) {
            console.error("Failed to update image", error);
            alert("Error updating image");
        } finally {
            setIsUpdating(false);
        }
    }


    const handleToggle = (type) => {
        if (show === type) {
            setShow(null);
        } else {
            setShow(type);
        }
    };

    return (
        <div className="Profile">
            <span className="ProfileTitle">
                <h4>{initUsername}</h4>
                {userImage && <img className="ProfileImg" src={userImage} alt="profile" />}
            </span>

            <Inputs
                value={userImage || ""}
                onChange={(e) => setUserImage(e.target.value)}
                placeholder="Image URL"
            />

            <Buttons
                text={isUpdating ? "Saving..." : "Save"}
                onClick={handleSaveImage}
                disabled={isUpdating}
                style={{ padding: "8px 12px", cursor: "pointer" }}
            >
            </Buttons>

            <div className="stats-container">
                <span
                    className={`stat-item ${show === 'following' ? 'active' : ''}`}
                    onClick={() => handleToggle('following')}
                    style={{ cursor: "pointer", marginRight: "10px", fontWeight: "bold" }}
                >
                    Following: {initFollowing.length}
                </span>

                <span
                    className={`stat-item ${show === 'followers' ? 'active' : ''}`}
                    onClick={() => handleToggle('followers')}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                    Followers: {initFollowers.length}
                </span>
            </div>

            {show !== null && (
                <div className="users-list">
                    <h5>Showing: {show}</h5>
                    <ul>

                        {(show === 'following' ? initFollowing : initFollowers).map((user, index) => (
                            <li key={user.id || index}>
                                {user.username || "Unknown User"}
                            </li>
                        ))}

                        {(show === 'following' ? initFollowing : initFollowers).length === 0 && (
                            <li>No users found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}