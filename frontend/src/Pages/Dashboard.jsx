import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Profile} from "../Components/Profile/Profile.jsx";

function Dashboard(){

    const [username , setUsername] = useState("");
    const[picture , setPicture] = useState("");


    return(
        <div className="dashboard">
            <h2>Dashboard</h2>

            <Profile
                initUsername = {username} // שם משתמש
                initImage = {picture}  // URL של תמונ
                initFollowing = {} // רשימה של נעקבים
                initFollowers = {} // רשימה של עוקבים
            />

        </div>
    )
}export default Dashboard;
