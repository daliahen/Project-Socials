import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Dashboard(){

    const [username , setUsername] = useState("");
    const[picture , setPicture] = useState("");


    return(
        <h2>Dashboard</h2>
    )
}export default Dashboard;
