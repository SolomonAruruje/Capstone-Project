import React, { useState } from 'react';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import sideImage from '../assets/SideImage.svg';

// For Google Login
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Ensure you have jwt-decode installed: npm install jwt-decode

const LogIn = () => {
    // State for traditional login form (only email and password needed for login)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    // Update form data on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // --- Traditional Email/Password Login ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission

        setLoading(true);
        setMessage(''); // Clear previous messages
        setMessageType('');

        try {
            // **IMPORTANT: Replace with your actual backend login API endpoint**
            const backendLoginUrl = 'http://localhost:3000/api/login';

            const response = await fetch(backendLoginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers like CSRF tokens if needed for security
                },
                body: JSON.stringify(formData) // Send email and password
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Login successful! Redirecting...');
                setMessageType('success');
                console.log('Login Success:', result);

                // **Handle successful login:**
                // 1. Store the authentication token (JWT, session ID) received from backend.
                //    This token is crucial for authenticating future requests.
                //    Example: localStorage.setItem('authToken', result.token);
                // 2. Redirect the user to a dashboard or home page.
                //    Example: window.location.href = '/dashboard'; or use React Router's navigate
                setTimeout(() => {
                    // Example: history.push('/dashboard'); // If using react-router-dom
                    // For a simple redirect:
                    alert("Login successful! Welcome back.");
                    // window.location.href = '/'; // Or your dashboard page
                }, 1500);

            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Login failed. Please check your credentials.');
                setMessageType('error');
                console.error('Login Error:', errorData);
            }
        } catch (error) {
            setMessage('A network error occurred. Please try again.');
            setMessageType('error');
            console.error('Network or unexpected error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Google Sign-In Logic ---
    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const idToken = credentialResponse.credential; // Google's JWT token

            // Optional: Decode on frontend for immediate display or debugging
            const decodedToken = jwtDecode(idToken);
            console.log('Decoded Google JWT:', decodedToken);

            // **IMPORTANT: Send the Google ID token to your backend for verification and login**
            const backendGoogleAuthUrl = 'http://localhost:3000/api/auth/google'; // Your backend endpoint for Google auth

            const response = await fetch(backendGoogleAuthUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idToken })
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Logged in with Google successfully!');
                setMessageType('success');
                console.log('Google Auth Success:', result);
                // **Handle successful Google login:**
                // 1. Store your application's authentication token (returned from backend).
                //    Example: localStorage.setItem('authToken', result.token);
                // 2. Redirect the user.
                setTimeout(() => {
                    alert("Logged in with Google! Welcome back.");
                    // window.location.href = '/'; // Or your dashboard page
                }, 1500);

            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Google login failed.');
                setMessageType('error');
                console.error('Google Auth Error:', errorData);
            }
        } catch (error) {
            setMessage('An error occurred during Google login. Please try again.');
            setMessageType('error');
            console.error('Google Auth Network or unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setMessage('Google login failed. Please try again.');
        setMessageType('error');
        console.error('Google Login Failed');
    };

    // **IMPORTANT: Replace with your actual Google Client ID from Google Cloud Console**
    // For production, use environment variables (e.g., process.env.REACT_APP_GOOGLE_CLIENT_ID)
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

    return (
        // Wrap your component with GoogleOAuthProvider for Google Login to work
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div>
                <NavBar />
                <div className='flex justify-around items-center my-20'>
                    <div className='mr-10'>
                        <img src={sideImage} alt="" className='w-[750px]' />
                    </div>
                    <div className='flex flex-col w-[370px] space-y-6'>
                        <h2 className='text-[36px]/[36px] font-medium w-full'>Log In to EasyCart</h2>
                        <h4 className='text-[16px] font-normal w-full'>Enter your details below</h4>

                        {/* Display success/error messages */}
                        {message && (
                            <div className={`py-2 px-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message}
                            </div>
                        )}

                        {/* Traditional Login Form */}
                        <form onSubmit={handleLoginSubmit} className='space-y-7 w-full'>
                            <div className='w-full border-b'>
                                <input
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className='focus:outline-none pb-2 w-full'
                                    type="email"
                                    name="email"
                                    placeholder="Email or Phone Number"
                                    autoComplete='email'
                                    required
                                />
                            </div>
                            <div className='w-full border-b'>
                                <input
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className='focus:outline-none pb-2 w-full'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete='current-password' // Use 'current-password' for login
                                    required
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <button
                                    type="submit"
                                    className='w-[143px] rounded py-[16px] bg-[#DB4444] text-[16px] font-medium text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                                    disabled={loading}
                                >
                                    {loading ? 'Logging In...' : 'Log In'}
                                </button>
                                <a href="/forgot-password" className='text-[#DB4444] hover:underline text-[16px]'>Forgot Password?</a>
                            </div>
                        </form>

                        {/* <div className="relative flex items-center py-5">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div> */}
                        
                        {/* Google Sign-In Button */}
                        <div className='w-full flex justify-center'>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            />
                        </div>

                        {/* Link to Create Account */}
                        <div className="text-center mt-4">
                            <p className="text-gray-600">Don't have an account? <a href="/SignUp" className="text-[#DB4444] hover:underline">Sign Up</a></p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
};

export default LogIn;