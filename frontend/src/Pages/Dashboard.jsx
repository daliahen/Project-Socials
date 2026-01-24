import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../Contexts/AuthContext.jsx";

function Dashboard(){

    const [username , setUsername] = useState("");
    const[picture , setPicture] = useState("");

    const { user } = useAuth();
    console.log("Auth user:", user);


    return(
        <div className="dashboard">
            <h2>Dashboard</h2>

        </div>
    )
}export default Dashboard;
