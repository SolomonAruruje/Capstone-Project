import React, { useState } from 'react';
import NavBar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import sideImage from '../assets/SideImage.svg';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            // Replace with your actual backend API endpoint for email/password registration
            const backendUrl = 'http://localhost:3000/api/register-email-password'; // Example endpoint

            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Account created successfully! Logging in...');
                setMessageType('success');
                console.log('Account Creation Success:', result);

                login(result.token, result.user); // <--- Use AuthContext's login

                // Clear the form data after successful registration
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });

                // Redirect the user to a dashboard or home page after a short delay
                setTimeout(() => {
                    navigate('/');
                }, 1500);

            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to create account.');
                setMessageType('error');
                console.error('Account Creation Error:', errorData);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
            console.error('Network or unexpected error during account creation:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Google Sign-Up ---
    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const idToken = credentialResponse.credential;

            const decodedToken = jwtDecode(idToken);
            console.log('Decoded Google JWT:', decodedToken);

            // Send the ID token to your backend for verification and user creation/login
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
                setMessage('Signed in with Google successfully! Logging in...');
                setMessageType('success');
                console.log('Google Auth Success:', result);

                // Assuming your backend returns { token: 'jwt_token', user: { id: '...', name: '...', email: '...' } }
                // Call the login function from AuthContext to set the user as logged in
                login(result.token, result.user); // <--- Use AuthContext's login

                // Redirect the user to a dashboard or home page after a short delay
                setTimeout(() => {
                    navigate('/'); // <--- Redirect using navigate
                }, 1500);

            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Google sign-up failed.');
                setMessageType('error');
                console.error('Google Auth Error:', errorData);
            }
        } catch (error) {
            setMessage('An error occurred during Google sign-up. Please try again.');
            setMessageType('error');
            console.error('Google Auth Network or unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setMessage('Google sign-up failed. Please try again.');
        setMessageType('error');
        console.error('Google Login Failed');
    };

    // IMPORTANT: Replace with your actual Google Client ID from Google Cloud Console
    // For production, use environment variables (e.g., process.env.REACT_APP_GOOGLE_CLIENT_ID)
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div>
                <NavBar />
                <div className='flex items-center justify-start my-20'>
                    <div className='mr-10'>
                        <img src={sideImage} alt="Illustration" className='w-[750px]' />
                    </div>
                    <div className='flex flex-col w-[370px] space-y-6'>
                        <h2 className='text-[36px]/[30px] font-medium w-full'>Create an account</h2>
                        <h4 className='text-[16px] font-normal w-full'>Enter your details below</h4>
                        {message && (
                            <div className={`py-2 px-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='space-y-7 w-full' >
                            <div className='w-full border-b'>
                                <input value={formData.name} onChange={handleChange} disabled={loading} className='focus:outline-none pb-2 w-full' type="text" name="name" placeholder="Name" autoComplete='name' required />
                            </div>
                            <div className='w-full border-b'>
                                <input value={formData.email} onChange={handleChange} disabled={loading} className='focus:outline-none pb-2 w-full' type="email" name="email" placeholder="Email or Phone Number" autoComplete='email' required />
                            </div>
                            <div className='w-full border-b'>
                                <input value={formData.password} onChange={handleChange} disabled={loading} className='focus:outline-none pb-2 w-full' type="password" name="password" placeholder="Password" autoComplete='new-password' required />
                            </div>
                            <button type="submit" className='w-full rounded py-[16px] bg-[#DB4444] text-[16px] font-medium text-white disabled:bg-gray-400 disabled:cursor-not-allowed' disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</button>
                        </form>
                        {/* <div className="relative flex items-center py-5">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div> */}
                        <div className='w-full'>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='w-full rounded py-[16px] border border-gray-300 text-[16px] font-medium text-gray-700 flex items-center justify-center disabled:bg-gray-100'> {/* Changed justify-around to justify-center for better alignment of icon+text */}
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="mr-2" /> {/* Added mr-2 for spacing */}
                                        <span>Sign up with Google</span>
                                    </button>
                                )}
                            />
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-gray-600">Already have an account? <a href="/login" className="text-[#DB4444] hover:underline">Log in</a></p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
};

export default CreateAccount;