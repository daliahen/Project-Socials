import {useState} from "react";
import "../Styles/Auth.css";
import Buttons from "../Components/Buttons.jsx";
import Inputs from "../Components/Inputs.jsx";
import {useNavigate} from "react-router-dom";
import {register} from "../api/api.jsx";


function Register() {
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [loading, setLoading] = useState(false);//שומר שלא ילחצו בזמן שהשרת עובד
    const [errorMsg, setErrorMsg] = useState("");//שומר שיהיה למשתמש מה לקרוא אם משהו נכשל

    async function handleRegister(event) {
        event.preventDefault();
        setErrorMsg("");

        const cleanUsername = username.trim();
        const cleanPassword = password.trim();

        if (cleanUsername === "" || cleanPassword === "" || confirmPassword.trim() === "") {
            setErrorMsg("Please fill all fields");
            return;
        }

        if (cleanUsername.length < 3) {
            setErrorMsg("Username must be at least 3 characters");
            return;
        }

        if (cleanUsername.includes(" ")) {
            setErrorMsg("Username cannot contain spaces");
            return;
        }

        if (cleanPassword.length < 6) {
            setErrorMsg("Password must be at least 6 characters");
            return;
        }

        if (cleanPassword !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }

        setLoading(true); // המערכת עובדת עכשיו

        try {
            const response = await register(username, password);
            const data = response.data;

            if (data.success) {
                navigate("/login");
                } else {
                    setErrorMsg("הרשמה נכשלה נסו שוב");
                }
        } catch {
            setErrorMsg("בעיה בחיבור לשרת");
        } finally {
            setLoading(false);
        }
    }

    return(

        <div className="authPage">
            <div className="authWrap">

                <form className="authCard" onSubmit={handleRegister}>
                    <div className="authBrand">
                        <div className="authLogo"></div>
                        <h1 className="authTitle">Create account</h1>
                        <p className="authSubtitle">Sign up to start posting and following.</p>
                    </div>

                    {errorMsg && <div className="authError">{errorMsg}</div>}


                    <div className="authForm">
                        <Inputs
                            label={"Username"}
                            value={username}
                            onChange={(event) => setUserName(event.target.value)}
                            placeholder={"Enter username"}
                            disabled={false}
                        />

                        <Inputs
                            label={"Password"}
                            type={"password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder={"Enter password"}
                            disabled={false}
                        />

                        <Inputs
                            label={"Confirm Password"}
                            type={"password"}
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder={"Confirm password"}
                            disabled={false}
                        />

                        <Buttons
                            text={"Create account"}
                            type={"submit"}
                            loading={loading}
                            disabled={loading}
                            variant="primary"
                        />

                        <div className="authDivider">OR</div>


                        <Buttons
                            text={"Back to login"}
                            type={"button"}
                            onClick={() => navigate("/login")}
                            disabled={false}
                            variant="secondary"
                        />
                    </div>
                </form>

                <div className="authFooterCard">
                    Already have an account?{" "}
                    <span
                        className="authLink"
                        onClick={() => navigate("/login")}
                    >
          Login
        </span>
                </div>

            </div>
        </div>
    )

}export default Register;