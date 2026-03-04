import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.jsx"; // Import the hook
import "../Styles/Auth.css";

import Inputs from "../Components/Inputs.jsx";
import Buttons from "../Components/Buttons.jsx";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure the login function from Context

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        setErrorMsg("");
        if (username.trim() === "" || password.trim() === "") {
            setErrorMsg("Please fill Username and Password");
            return;
        }

        setLoading(true);

        try {
            // 1. Call the API
            const response = await fetch('http://localhost:8080/api/users/login' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.ok){
                const data = await response.json();
                login(data.token , data.user);
                navigate('/dashboard')
            }else{
                alert("Username or password incorrect");
            }

        } catch (error) {
            console.error(error);
            setErrorMsg("An error occurred. Please try again.");
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="authPage">
            <div className="authWrap">

                <form className="authCard" onSubmit={handleLogin}>
                    <div className="authBrand">
                        <div className="authLogo"></div>
                        <h1 className="authTitle">Socials</h1>
                        <p className="authSubtitle">Login to continue to your feed.</p>
                    </div>

                    {errorMsg && <div className="authError">{errorMsg}</div>}

                    <div className="authForm">
                        <Inputs
                            label={"Username"}
                            value={username}
                            onChange={(event) => setUserName(event.target.value)}
                            placeholder={"Enter username"}
                            disabled={loading}
                        />


                        <Inputs
                            label={"Password"}
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"Enter password"}
                            disabled={loading}
                        />


                        <Buttons
                            text={"Login"}
                            type={"submit"}
                            loading={loading}
                            disabled={loading}
                            variant="primary"
                        />

                        <div className="authDivider">OR</div>

                        <Buttons
                            text={"Create new account"}
                            type={"button"}
                            onClick={() => navigate("/register")}
                            disabled={loading}
                            variant="secondary"
                        />
                    </div>
                </form>

                <div className="authFooterCard">
                    No account?{" "}
                    <span
                        className="authLink"
                        onClick={() => navigate("/register")}
                    >
          Sign up
        </span>
                </div>

            </div>
        </div>

    );
}

export default Login;