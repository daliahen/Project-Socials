import {useState} from "react";
import Buttons from "../Components/Buttons.jsx";
import Inputs from "../Components/Inputs.jsx";
import {useNavigate} from "react-router-dom";
import {register} from "../api/api.jsx";


function Register() {
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);//שומר שלא ילחצו בזמן שהשרת עובד
    const [errorMsg, setErrorMsg] = useState("");//שומר שיהיה למשתמש מה לקרוא אם משהו נכשל

    async function handleRegister() {
        setErrorMsg("");


    if (username.trim() === "" || password.trim() === "") {
        setErrorMsg("Please fill Username and Password");
        return;
    }

    setLoading(true); // המערכת עובדת עכשיו


        try {
            const response = await register(username, password);
            const data = response.data;

            if (data.success) {
                navigate("/login");
            } else {
                setErrorMsg("הרשמה נכשלה");
            }
        } catch {
            setErrorMsg("בעיה בחיבור לשרת");
        } finally {
            setLoading(false);
        }
    }

    return(

        <div>
            <h1>Register</h1>

            <Inputs
                label={"Username"}
                value={username}
                onChange={(event) => setUserName(event.target.value)}
                placeholder={"enter username"}
                disabled={loading}
            />

            <Inputs
                label={"Password"}
                type={"password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={"enter password"}
                disabled={loading}
            />

            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}

            <Buttons text={"Register"}
                     onClick={handleRegister}
                     loading={loading}/>

            <Buttons text={"Already have an account ?  Login"}
            onClick={() =>navigate("/login")}
            disabled={loading}/>
        </div>
    )

}export default Register;