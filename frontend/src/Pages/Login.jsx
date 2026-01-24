import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/api.jsx"; // Renamed to avoid conflict with context function
import { useAuth } from "../Contexts/AuthContext.jsx"; // Import the hook
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
            const response = await loginApi(username, password);
            const data = response.data;

            if (data.success) {
                login(data.token, data.user);
                // console.log("Logged in user:", data.user);
                navigate("/dashboard");
            } else {
                setErrorMsg("לא הצלחת להתחבר");
            }

        } catch (error) {
            console.error(error);
            setErrorMsg("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <Inputs
                label={"username"}
                value={username}
                onChange={(event) => setUserName(event.target.value)}
                placeholder={"enter username"}
                disabled={loading}
            />

            <Inputs
                label={"Password"}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"enter password"}
                disabled={loading}
            />

            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}

            <Buttons
                text={"Login"}
                type={"submit"}
                loading={loading}
                disabled={loading}
            />

            <Buttons
                text={"No account ? Register :)"}
                type={"button"}
                onClick={() => navigate("/register")}
                loading={loading}
                disabled={loading}
            />
        </form>
    );
}

export default Login;