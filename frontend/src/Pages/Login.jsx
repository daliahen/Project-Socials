import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../api/api.jsx";
import Cookies from "js-cookie";
import Inputs from "../Components/Inputs.jsx";
import Buttons from "../Components/Buttons.jsx";


function Login(){

    const navigate = useNavigate();
    const [username , setuserName] = useState("");
    const [password , setPassword] = useState("");

    const [errorMsg , setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);//שומר שלא ילחצו בזמן שהשרת עובד


    async function handleLogin(event){
        event.preventDefault();

        setErrorMsg("");
        if (username.trim() === "" || password.trim() === ""){
            setErrorMsg("Please fill Username and Password");
            return;
        }

        setLoading(true);

        try {
            const response = await login(username , password);
                const data = response.data;
                if (data.success){
                    Cookies.set("token" ,data.token);
                    navigate("/dashboard");
                }else {
                    setErrorMsg("לא הצלחת להתחבר");
                }

        }catch {
            setErrorMsg("error");
        }finally {
            setLoading(false);
        }
    }

    return(
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <Inputs
                label={"username"}
                value={username}
                onChange={(event) => setuserName(event.target.value)}
                placeholder={"enter username"}
                disabled={loading}/>


            <Inputs label={"Password"}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"enter password"}
                    disabled={loading}/>

            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}

            <Buttons text={"Login"} type={"submit"} loading={loading}
            disabled={loading}/>

            <Buttons text={"No account ? Register :)"}
                     type={"button"} onClick={()=>navigate("/register")}
                     loading={loading}
            disabled={loading}/>
        </form>
    )
}export default Login;