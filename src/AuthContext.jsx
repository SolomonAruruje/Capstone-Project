import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const setAuthHeader = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const loadUserSession = useCallback(async () => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user'); // Also load user data from storage

        if (storedToken) {
            setAuthHeader(storedToken);
            try {
                
                const response = await axios.get(`${API_BASE_URL}/users/me`);
                const userData = response.data;
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData)); 
            } catch (error) {
                console.error('Failed to verify token or fetch user data:', error);
                
                logout();
            }
        }
        setLoading(false); 
    }, []);

    useEffect(() => {
        loadUserSession();
    }, [loadUserSession]);

    const login = async (accessToken, userData) => {
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthHeader(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setAuthHeader(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    /**
     * Updates the user data in the context and local storage.
     * Uses this when a user's profile information (like address) changes on the backend.
     * @param {object} updatedUserData - A partial user object with fields to update.
     */
    const updateUser = (updatedUserData) => {
        setUser(prevUser => {
            const newUser = { ...prevUser, ...updatedUserData };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser, 
        API_BASE_URL
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};




// // src/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios'; // Make sure you have axios installed: npm install axios

// // Create the context
// const AuthContext = createContext(null);

// // Create a custom hook to use the auth context easily
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // Base URL for your API
// const API_BASE_URL = 'http://localhost:8080/api/v1'; // Adjust if your base path is different

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true); // To indicate if initial authentication check is ongoing

//     // Function to set/remove the Authorization header for Axios
//     const setAuthHeader = (token) => {
//         if (token) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         } else {
//             delete axios.defaults.headers.common['Authorization'];
//         }
//     };

//     // Load user and token from localStorage on app start
//     const loadUserSession = useCallback(async () => {
//         const storedToken = localStorage.getItem('authToken');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken) {
//             setAuthHeader(storedToken); // Set the header immediately
//             try {
//                 // Verify token with backend or fetch fresh user data
//                 const response = await axios.get(`${API_BASE_URL}/users/me`); // Assuming this endpoint returns current user details
//                 const userData = response.data;
//                 setUser(userData);
//                 setIsAuthenticated(true);
//                 localStorage.setItem('user', JSON.stringify(userData)); // Update user data in local storage
//             } catch (error) {
//                 console.error('Failed to verify token or fetch user data:', error);
//                 // Token invalid or expired, clear session
//                 logout(); // Use the logout function to clear everything
//             }
//         }
//         setLoading(false); // Finished initial loading check
//     }, []);

//     useEffect(() => {
//         loadUserSession();
//     }, [loadUserSession]);

//     // Function to handle login
//     const login = async (accessToken, userData) => {
//         localStorage.setItem('authToken', accessToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         setAuthHeader(accessToken);
//         setUser(userData);
//         setIsAuthenticated(true);
//     };

//     // Function to handle logout
//     const logout = () => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('user');
//         setAuthHeader(null); // Clear Authorization header
//         setUser(null);
//         setIsAuthenticated(false);
//     };

//     const value = {
//         user,
//         isAuthenticated,
//         loading, // Expose loading state
//         login,
//         logout,
//         API_BASE_URL // Expose API_BASE_URL for consistent use
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
