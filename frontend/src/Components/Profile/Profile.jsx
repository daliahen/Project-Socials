import { useState } from "react";
import "./Profile.css";
import Inputs from "../Inputs.jsx";

// // For tests...
// export const Profile = ({ initUsername = "User",
//                             initImage = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
//                             initFollowing = [
//                                 {id: 1, username: "A"},
//                                 {id: 2, username: "B"},
//                                 {id: 3, username: "C"},
//                                 {id: 4, username: "D"},
//                             ],
//                             initFollowers = [
//                                 {id: 5, username: "E"},
//                                 {id: 6, username: "F"},
//                                 {id: 7, username: "G"},
//                                 {id: 8, username: "H"},
//                             ] }) => {
export const Profile = ({ initUsername = "User",
                            initImage = "",
                            initFollowing = [],
                            initFollowers = [] }) => {

    const [username, setUsername] = useState(initUsername);
    const [userImage, setUserImage] = useState(initImage);

    const [following, setFollowing] = useState(initFollowing);
    const [followers, setFollowers] = useState(initFollowers);

    const [show, setShow] = useState(null);

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
                <h4>{username}</h4>
                {userImage && <img className="ProfileImg" src={userImage} alt="profile" />}
            </span>

            <Inputs
                value={userImage || ""}
                onChange={(e) => setUserImage(e.target.value)}
                placeholder="Image URL"
            />

            <div className="stats-container">
                <span
                    className={`stat-item ${show === 'following' ? 'active' : ''}`}
                    onClick={() => handleToggle('following')}
                    style={{ cursor: "pointer", marginRight: "10px", fontWeight: "bold" }}
                >
                    Following: {following.length}
                </span>

                <span
                    className={`stat-item ${show === 'followers' ? 'active' : ''}`}
                    onClick={() => handleToggle('followers')}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                    Followers: {followers.length}
                </span>
            </div>

            {show !== null && (
                <div className="users-list">
                    <h5>Showing: {show}</h5>
                    <ul>
                        {/* Dynamically choose which array to map over */}
                        {(show === 'following' ? following : followers).map((user, index) => (
                            <li key={user.id || index}>
                                {user.username || "Unknown User"}
                            </li>
                        ))}

                        {/* Empty state handling */}
                        {(show === 'following' ? following : followers).length === 0 && (
                            <li>No users found.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}