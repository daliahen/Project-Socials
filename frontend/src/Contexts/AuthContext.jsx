import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(() => Cookies.get('token'));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

    const login = (authToken, userData) => {
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);

        Cookies.set('token', authToken, { expires: 7 });
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        Cookies.remove('token');
        localStorage.removeItem('user');

        navigate('/login');
    };

    const updateUser = (updatedUserData) => {
        const newUserData = { ...user, ...updatedUserData };
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
    };

    const value = {
        token,
        user,
        isAuthenticated,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
};

export default AuthContext;
