import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a custom hook to use the auth context easily
export const useAuth = () => {
    return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // Check local storage for a token on initial load
    // In a real app, you might also verify this token with your backend
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('authToken');
        return !!token; // Returns true if token exists, false otherwise
    });

    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    // Function to handle login
    const login = (token, userData) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    // Provide the state and functions to consumers
    const value = {
        isLoggedIn,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};