import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => Cookies.get("site-token"));
    const [user, setUser] = useState(null);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);

        Cookies.set("site-token", newToken, { expires: 7, secure: true, sameSite: 'Strict' });
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        Cookies.remove("site-token");
    };

    useEffect(() => {
        const storedToken = Cookies.get("site-token");
        if (!storedToken) {
            setToken(null);
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);