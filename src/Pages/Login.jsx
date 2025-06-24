import React, { useState } from 'react';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import sideImage from '../assets/SideImage.svg';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const { login } = useAuth(); // <--- Get the login function from context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            // **IMPORTANT: Replace with your actual backend login API endpoint**
            const backendLoginUrl = 'http://localhost:3000/api/login';

            const response = await fetch(backendLoginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Login successful! Redirecting...');
                setMessageType('success');
                console.log('Login Success:', result);

                // **Handle successful login using AuthContext:**
                // Assuming your backend returns { token: 'jwt_token', user: { id: '...', name: '...', email: '...' } }
                login(result.token, result.user); // <--- Use AuthContext's login

                setTimeout(() => {
                    navigate('/'); // <--- Redirect using navigate
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
            const idToken = credentialResponse.credential;

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
                setMessage('Logged in with Google successfully! Redirecting...');
                setMessageType('success');
                console.log('Google Auth Success:', result);


                login(result.token, result.user); // <--- Use AuthContext's login

                setTimeout(() => {
                    navigate('/'); // <--- Redirect using navigate
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

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div>
                <NavBar />
                <div className='flex justify-around items-center my-20'>
                    <div className='mr-10'>
                        <img src={sideImage} alt="Login Illustration" className='w-[750px]' />
                    </div>
                    <div className='flex flex-col w-[370px] space-y-6'>
                        <h2 className='text-[36px]/[36px] font-medium w-full'>Log In to EasyCart</h2>
                        <h4 className='text-[16px] font-normal w-full'>Enter your details below</h4>

                        {message && (
                            <div className={`py-2 px-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message}
                            </div>
                        )}

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
                                    autoComplete='current-password'
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
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div> */}

                        {/* Google Sign-In Button */}
                        <div className='w-full flex justify-center'>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='w-full rounded py-[16px] border border-gray-300 text-[16px] font-medium text-gray-700 flex items-center justify-center disabled:bg-gray-100'>
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="mr-2" />
                                        <span>Login with Google</span> {/* Changed text for clarity */}
                                    </button>
                                )}
                            />
                        </div>

                        {/* Link to Create Account */}
                        <div className="text-center mt-4">
                            <p className="text-gray-600">Don't have an account? <Link to="/SignUp" className="text-[#DB4444] hover:underline">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
};

export default LogIn;